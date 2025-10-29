import React, { useState, useRef } from 'react';
import SectionWrapper from './SectionWrapper';
import { useData } from '../contexts/DataContext';
import Spinner from './Spinner';
import { LogoPhilosophyData, LogoPhilosophyItem } from '../data/initialData';

interface LogoPhilosophyProps {
  isEditMode: boolean;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const FlipCard: React.FC<{
  cardData: LogoPhilosophyItem;
  isEditMode: boolean;
  onTitleChange: (value: string) => void;
  onDetailsChange: (value: string) => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ cardData, isEditMode, onTitleChange, onDetailsChange, onImageChange }) => {
    const { title, imageUrl, details } = cardData;
    const imageInputRef = useRef<HTMLInputElement>(null);

    const triggerImageInput = (e: React.MouseEvent) => {
        e.stopPropagation();
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
              value={title}
              onChange={(e) => {
                e.stopPropagation();
                onTitleChange(e.target.value);
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
           <h4 className="font-bold text-brand-gold text-xl mb-4 border-b border-brand-gold/50 pb-2">{title}</h4>
          {isEditMode ? (
             <textarea
              value={details.join('\n')}
              onChange={(e) => onDetailsChange(e.target.value)}
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

const LogoPhilosophy: React.FC<LogoPhilosophyProps> = ({ isEditMode }) => {
  const { data, editedData, loading, error, setEditedLogoPhilosophy } = useData();

  const handleUpdate = (type: 'blm' | 'kabinet', field: keyof LogoPhilosophyItem, value: string | string[]) => {
    if (!editedData) return;
    const newData: LogoPhilosophyData = {
        ...editedData.logoPhilosophy,
        [type]: { ...editedData.logoPhilosophy[type], [field]: value }
    };
    setEditedLogoPhilosophy(newData);
  };

  const handleImageChange = (type: 'blm' | 'kabinet') => async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      try {
        const newImageUrl = await fileToBase64(event.target.files[0]);
        handleUpdate(type, 'imageUrl', newImageUrl);
      } catch (error) {
        alert('Gagal memproses gambar.');
      }
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
  
  if (loading) {
    return (
      <SectionWrapper id="logo-philosophy" title="Filosofi Logo" bgClass="bg-white">
        <div className="h-96 flex justify-center items-center">
          <Spinner />
        </div>
      </SectionWrapper>
    );
  }

  if (error || !data || !editedData) {
    return (
      <SectionWrapper id="logo-philosophy" title="Filosofi Logo" bgClass="bg-white">
        <p className="text-center text-red-500">{error || "Data tidak tersedia."}</p>
      </SectionWrapper>
    );
  }

  const displayData = isEditMode ? editedData : data;

  return (
    <SectionWrapper id="logo-philosophy" title="Filosofi Logo" bgClass="bg-white">
      <EditWrapper>
        <div className="grid md:grid-cols-2 gap-12">
          <FlipCard
            cardData={displayData.logoPhilosophy.blm}
            isEditMode={isEditMode}
            onTitleChange={(value) => handleUpdate('blm', 'title', value)}
            onDetailsChange={(value) => handleUpdate('blm', 'details', value.split('\n'))}
            onImageChange={handleImageChange('blm')}
          />
          <FlipCard
            cardData={displayData.logoPhilosophy.kabinet}
            isEditMode={isEditMode}
            onTitleChange={(value) => handleUpdate('kabinet', 'title', value)}
            onDetailsChange={(value) => handleUpdate('kabinet', 'details', value.split('\n'))}
            onImageChange={handleImageChange('kabinet')}
          />
        </div>
      </EditWrapper>
    </SectionWrapper>
  );
};

export default LogoPhilosophy;