import React, { useState, useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import { logoBase64 } from './Logo';

interface LogoPhilosophyProps {
  isEditMode: boolean;
  showToast: (message: string) => void;
}

const initialPhilosophyData = {
  blm: {
    title: 'Filosofi Logo BLM',
    imageUrl: logoBase64,
    details: [
      'Tiga Bintang: Melambangkan Tri Dharma Perguruan Tinggi (Pendidikan, Penelitian, dan Pengabdian).',
      'Padi dan Kapas: Simbol kesejahteraan dan keadilan sosial bagi seluruh mahasiswa.',
      'Tugu Legislasi: Pilar utama demokrasi, hukum, dan konstitusi organisasi.',
      'Lingkaran Merah Putih: Semangat nasionalisme dan persatuan dalam bingkai NKRI.',
    ],
  },
  kabinet: {
    title: 'Filosofi Kabinet Sinergi Inovasi',
    imageUrl: 'https://via.placeholder.com/200x200.png?text=Logo+Kabinet',
    details: [
        'Roda Gigi: Sinergi dan kolaborasi antar komisi dan dengan lembaga lain.',
        'Api Obor: Semangat yang menyala untuk terus berinovasi dan memberikan pencerahan.',
        'Perisai: Fungsi pengawasan sebagai pelindung konstitusi dan penjaga aspirasi mahasiswa.',
        'Warna Emas: Melambangkan kejayaan, prestasi, dan harapan untuk masa depan gemilang.',
    ],
  },
};

const FlipCard: React.FC<{
  title: string;
  imageUrl: string;
  details: string[];
  isEditMode: boolean;
  tempTitle: string;
  onTempTitleChange: (value: string) => void;
  tempDetails: string;
  onTempDetailsChange: (value: string) => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ title, imageUrl, details, isEditMode, tempTitle, onTempTitleChange, tempDetails, onTempDetailsChange, onImageChange }) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const triggerImageInput = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card from flipping when in edit mode
        if (isEditMode) {
            imageInputRef.current?.click();
        }
    };
  
  return (
    <div className="relative group [perspective:1000px] w-full max-w-sm mx-auto h-96">
      <input type="file" accept="image/*" ref={imageInputRef} onChange={onImageChange} className="hidden" />
      <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out ${!isEditMode && 'group-hover:[transform:rotateY(180deg)]'}`}>
        {/* Front Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-white text-center p-6 rounded-lg shadow-xl flex flex-col items-center justify-center border-t-4 border-brand-gold">
          <div className="relative w-40 h-40 mx-auto mb-4">
            <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
             {isEditMode && (
                <button 
                    onClick={triggerImageInput}
                    className="absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-10"
                    aria-label={`Ubah ${title}`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg>
                </button>
            )}
          </div>
          {isEditMode ? (
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => {
                e.stopPropagation();
                onTempTitleChange(e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              className="text-2xl font-bold text-brand-blue text-center bg-slate-100 border border-slate-300 rounded-md w-full p-2"
              aria-label="Ubah Judul"
            />
          ) : (
             <h4 className="text-2xl font-bold text-brand-blue">{title}</h4>
          )}
        </div>
        {/* Back Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-brand-blue text-white p-6 rounded-lg shadow-xl flex flex-col justify-center">
           <h4 className="font-bold text-brand-gold text-xl mb-4 border-b border-brand-gold/50 pb-2">{isEditMode ? tempTitle : title}</h4>
          {isEditMode ? (
             <textarea
              value={tempDetails}
              onChange={(e) => onTempDetailsChange(e.target.value)}
              className="w-full h-full bg-white/10 text-white p-2 rounded-md text-sm"
              placeholder="Satu poin per baris"
            />
          ) : (
            <ul className="text-sm space-y-3 text-left list-disc list-inside">
              {details.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const LogoPhilosophy: React.FC<LogoPhilosophyProps> = ({ isEditMode, showToast }) => {
  const [philosophyData, setPhilosophyData] = useState(initialPhilosophyData);
  const [tempBlmTitle, setTempBlmTitle] = useState(initialPhilosophyData.blm.title);
  const [tempKabinetTitle, setTempKabinetTitle] = useState(initialPhilosophyData.kabinet.title);
  const [tempBlmDetails, setTempBlmDetails] = useState(initialPhilosophyData.blm.details.join('\n'));
  const [tempKabinetDetails, setTempKabinetDetails] = useState(initialPhilosophyData.kabinet.details.join('\n'));

  const handleSaveChanges = () => {
    setPhilosophyData(prev => ({
      blm: { 
        ...prev.blm, 
        title: tempBlmTitle,
        details: tempBlmDetails.split('\n').filter(line => line.trim() !== '') 
      },
      kabinet: { 
        ...prev.kabinet, 
        title: tempKabinetTitle,
        details: tempKabinetDetails.split('\n').filter(line => line.trim() !== '') 
      }
    }));
    showToast("Filosofi Logo berhasil diperbarui!");
  };

   const handleImageChange = (type: 'blm' | 'kabinet') => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newImageUrl = URL.createObjectURL(event.target.files[0]);
      setPhilosophyData(prev => ({
        ...prev,
        [type]: { ...prev[type], imageUrl: newImageUrl }
      }));
      showToast(`Logo ${type === 'blm' ? 'BLM' : 'Kabinet'} berhasil diubah!`);
    }
  };


  const EditWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!isEditMode) return <>{children}</>;
    return (
      <div className="relative border-2 border-dashed border-blue-400 p-4 rounded-lg">
        {children}
         <div className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full p-1 shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg>
        </div>
      </div>
    );
  };


  return (
    <SectionWrapper id="logo-philosophy" title="Filosofi Logo" bgClass="bg-white">
      <EditWrapper>
        <div className="grid md:grid-cols-2 gap-12">
          <FlipCard
            title={philosophyData.blm.title}
            imageUrl={philosophyData.blm.imageUrl}
            details={philosophyData.blm.details}
            isEditMode={isEditMode}
            tempTitle={tempBlmTitle}
            onTempTitleChange={setTempBlmTitle}
            tempDetails={tempBlmDetails}
            onTempDetailsChange={setTempBlmDetails}
            onImageChange={handleImageChange('blm')}
          />
          <FlipCard
            title={philosophyData.kabinet.title}
            imageUrl={philosophyData.kabinet.imageUrl}
            details={philosophyData.kabinet.details}
            isEditMode={isEditMode}
            tempTitle={tempKabinetTitle}
            onTempTitleChange={setTempKabinetTitle}
            tempDetails={tempKabinetDetails}
            onTempDetailsChange={setTempKabinetDetails}
            onImageChange={handleImageChange('kabinet')}
          />
        </div>
      </EditWrapper>
      {isEditMode && (
        <div className="text-center mt-8">
          <button onClick={handleSaveChanges} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
            Simpan Perubahan Filosofi
          </button>
        </div>
      )}
    </SectionWrapper>
  );
};

export default LogoPhilosophy;
