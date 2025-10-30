import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../contexts/DataContext';
import { fileToBase64 } from '../utils/fileUtils';

interface HeroProps {
  isEditMode: boolean;
  showToast: (message: string) => void;
}

const Hero: React.FC<HeroProps> = ({ isEditMode, showToast }) => {
  const { data, updateHeroBackground } = useData();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data?.hero.backgroundImage) {
      setBackgroundImage(data.hero.backgroundImage);
    }
  }, [data]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      try {
        setIsSaving(true);
        const base64 = await fileToBase64(file);
        // Optimistic update for immediate visual feedback
        setBackgroundImage(base64); 
        await updateHeroBackground(base64);
        showToast('Gambar latar belakang berhasil diperbarui!');
      } catch (error) {
        console.error("Error updating hero background:", error);
        showToast('Gagal memperbarui gambar. Coba lagi.');
        // Revert on error
        if (data?.hero.backgroundImage) {
          setBackgroundImage(data.hero.backgroundImage);
        }
      } finally {
        setIsSaving(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="beranda" className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: `url('${backgroundImage}')` }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
      <div className="absolute inset-0 bg-brand-blue/75"></div>
      <div className="relative z-10 p-4 overflow-hidden">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 font-serif uppercase tracking-wider animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
          Badan Legislatif Mahasiswa
        </h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-brand-gold font-serif animate-fade-in-down" style={{ animationDelay: '0.5s' }}>
          Poltekkes Kemenkes Mataram
        </h2>
      </div>
      {isEditMode && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={triggerFileInput}
            className="bg-white/80 hover:bg-white text-brand-blue font-bold py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </>
            ) : (
               <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg>
                Ganti Latar Belakang
               </>
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default Hero;