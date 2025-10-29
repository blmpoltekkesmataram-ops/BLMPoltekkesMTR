import React from 'react';
import SectionWrapper from './SectionWrapper';
import { useData } from '../contexts/DataContext';
import Spinner from './Spinner';

interface VisiMisiProps {
  isEditMode: boolean;
}

const VisiMisi: React.FC<VisiMisiProps> = ({ isEditMode }) => {
  const { data, editedData, loading, error, setEditedVisiMisi } = useData();

  const handleVisiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!editedData) return;
    setEditedVisiMisi({ ...editedData.visiMisi, visi: e.target.value });
  };
  
  const handleMisiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
     if (!editedData) return;
     const newMisi = e.target.value.split('\n').filter(line => line.trim() !== '');
     setEditedVisiMisi({ ...editedData.visiMisi, misi: newMisi });
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
      <SectionWrapper id="visi-misi" title="Visi & Misi" bgClass="bg-white">
        <div className="h-64 flex justify-center items-center">
          <Spinner />
        </div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper id="visi-misi" title="Visi & Misi" bgClass="bg-white">
        <p className="text-center text-red-500">{error}</p>
      </SectionWrapper>
    );
  }

  const displayData = isEditMode ? editedData : data;
  
  return (
    <SectionWrapper id="visi-misi" title="Visi & Misi" bgClass="bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <EditWrapper>
          <div className="bg-brand-blue text-white p-8 rounded-lg shadow-xl h-full">
            <h3 className="text-3xl font-bold text-brand-gold mb-4 text-center">Visi</h3>
            {isEditMode ? (
              <textarea 
                value={displayData?.visiMisi.visi || ''}
                onChange={handleVisiChange}
                className="w-full h-40 bg-white/10 text-white p-2 rounded-md text-lg leading-relaxed text-center italic"
              />
            ) : (
              <p className="text-lg leading-relaxed text-center italic">{displayData?.visiMisi.visi}</p>
            )}
          </div>
        </EditWrapper>
        <EditWrapper>
          <div className="bg-slate-50 p-8 rounded-lg shadow-xl h-full">
            <h3 className="text-3xl font-bold text-brand-blue mb-6 text-center">Misi</h3>
            {isEditMode ? (
              <textarea 
                value={displayData?.visiMisi.misi.join('\n') || ''}
                onChange={handleMisiChange}
                className="w-full h-48 bg-white text-slate-700 p-2 rounded-md"
                placeholder="Satu misi per baris"
              />
            ) : (
              <ul className="space-y-4">
                {displayData?.visiMisi.misi.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </EditWrapper>
      </div>
    </SectionWrapper>
  );
};

export default VisiMisi;