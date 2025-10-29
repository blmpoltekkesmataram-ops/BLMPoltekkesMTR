import React, { useState, useRef } from 'react';

interface HeroProps {
  isEditMode: boolean;
  showToast: (message: string) => void;
}

const Hero: React.FC<HeroProps> = ({ isEditMode, showToast }) => {
  const [backgroundImage, setBackgroundImage] = useState("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newImageUrl = URL.createObjectURL(event.target.files[0]);
      setBackgroundImage(newImageUrl);
      showToast('Gambar latar belakang berhasil diubah!');
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
