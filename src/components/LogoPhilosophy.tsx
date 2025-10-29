import React, { useState, useRef, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { useData } from '../contexts/DataContext';
import Spinner from './Spinner';

interface LogoPhilosophyProps {
  isEditMode: boolean;
  showToast: (message: string) => void;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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
  const { data, loading, error, updateLogoPhilosophy } = useData();

  const [isSaving, setIsSaving] = useState(false);
  const [tempBlmTitle, setTempBlmTitle] = useState('');
  const [tempKabinetTitle, setTempKabinetTitle] = useState('');
  const [tempBlmDetails, setTempBlmDetails] = useState('');
  const [tempKabinetDetails, setTempKabinetDetails] = useState('');
  
  useEffect(() => {
    if (data?.logoPhilosophy) {
      setTempBlmTitle(data.logoPhilosophy.blm.title);
      setTempKabinetTitle(data.logoPhilosophy.kabinet.title);
      setTempBlmDetails(data.logoPhilosophy.blm.details.join('\n'));
      setTempKabinetDetails(data.logoPhilosophy.kabinet.details.join('\n'));
    }
  }, [isEditMode, data]);

  const handleSaveChanges = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
        const newData = {
            ...data.logoPhilosophy,
            blm: { 
                ...data.logoPhilosophy.blm, 
                title: tempBlmTitle,
                details: tempBlmDetails.split('\n').filter(line => line.trim() !== '') 
            },
            kabinet: { 
                ...data.logoPhilosophy.kabinet, 
                title: tempKabinetTitle,
                details: tempKabinetDetails.split('\n').filter(line => line.trim() !== '') 
            }
        };
        await updateLogoPhilosophy(newData);
        showToast("Filosofi Logo berhasil diperbarui!");
    } catch(e) {
        console.error(e);
        showToast("Gagal menyimpan perubahan.");
    } finally {
        setIsSaving(false);
    }
  };

   const handleImageChange = (type: 'blm' | 'kabinet') => async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && data?.logoPhilosophy) {
      setIsSaving(true);
      try {
        const newImageUrl = await fileToBase64(event.target.files[0]);
        const newData = {
            ...data.logoPhilosophy,
            [type]: { ...data.logoPhilosophy[type], imageUrl: newImageUrl }
        };
        await updateLogoPhilosophy(newData);
        showToast(`Logo ${type === 'blm' ? 'BLM' : 'Kabinet'} berhasil diubah!`);
      } catch (error) {
        showToast('Gagal memproses gambar.');
      } finally {
        setIsSaving(false);
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

  if (error || !data) {
    return (
      <SectionWrapper id="logo-philosophy" title="Filosofi Logo" bgClass="bg-white">
        <p className="text-center text-red-500">{error || "Data tidak tersedia."}</p>
      </SectionWrapper>
    );
  }


  return (
    <SectionWrapper id="logo-philosophy" title="Filosofi Logo" bgClass="bg-white">
      <EditWrapper>
        <div className="grid md:grid-cols-2 gap-12">
          <FlipCard
            title={data.logoPhilosophy.blm.title}
            imageUrl={data.logoPhilosophy.blm.imageUrl}
            details={data.logoPhilosophy.blm.details}
            isEditMode={isEditMode}
            tempTitle={tempBlmTitle}
            onTempTitleChange={setTempBlmTitle}
            tempDetails={tempBlmDetails}
            onTempDetailsChange={setTempBlmDetails}
            onImageChange={handleImageChange('blm')}
          />
          <FlipCard
            title={data.logoPhilosophy.kabinet.title}
            imageUrl={data.logoPhilosophy.kabinet.imageUrl}
            details={data.logoPhilosophy.kabinet.details}
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
          <button 
            onClick={handleSaveChanges} 
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-400"
            disabled={isSaving}
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan Teks Filosofi'}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
};

export default LogoPhilosophy;