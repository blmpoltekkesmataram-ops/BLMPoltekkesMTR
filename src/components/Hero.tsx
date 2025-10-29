import React, { useRef } from 'react';
import { useData } from '../contexts/DataContext';
import Spinner from './Spinner';

interface HeroProps {
  isEditMode: boolean;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Hero: React.FC<HeroProps> = ({ isEditMode }) => {
  const { data, editedData, loading, setEditedHeroBackground } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      try {
        const base64Image = await fileToBase64(event.target.files[0]);
        setEditedHeroBackground(base64Image);
      } catch (error) {
        console.error("Error processing image:", error);
        alert('Gagal memproses gambar.');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const displayData = isEditMode ? editedData : data;
  const backgroundImage = displayData?.hero.backgroundImage || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop";

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
        {loading && !data ? <Spinner size="lg" /> : (
            <>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 font-serif uppercase tracking-wider animate-fade-in-down" style={{ animationDelay: '0.2s' }}>
                  Badan Legislatif Mahasiswa
                </h1>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-brand-gold font-serif animate-fade-in-down" style={{ animationDelay: '0.5s' }}>
                  Poltekkes Kemenkes Mataram
                </h2>
            </>
        )}
      </div>
      {isEditMode && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={triggerFileInput}
            className="bg-white/80 hover:bg-white text-brand-blue font-bold py-2 px-4 rounded-lg shadow-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg>
            Ganti Latar Belakang
          </button>
        </div>
      )}
    </section>
  );
};

export default Hero;