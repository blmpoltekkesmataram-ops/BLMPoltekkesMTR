import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';

interface VisiMisiProps {
  isEditMode: boolean;
  showToast: (message: string) => void;
}

const VisiMisi: React.FC<VisiMisiProps> = ({ isEditMode, showToast }) => {
  const initialData = {
    visi: "Mengembangkan Badan Legislatif Mahasiswa sebagai organisasi pionir yang bersinergi menciptakan inovasi, dan menginspirasi melalui peningkatan kerja sama dan kekeluargaan.",
    misi: [
      "Menjalankan setiap tugas dan tanggung jawab BLM berlandaskan iman dan taqwa.",
      "Menjadikan BLM sebagai mediator dalam berkomunikasi, berdiskusi, serta menampung dan menyalurkan aspirasi.",
      "Mengembangkan BLM agar dapat menciptakan inovasi, menginspirasi, serta pelayanan terbaik secara konsisten memberikan keberkahan.",
      "Bersinergi bersama untuk mewujudkan aspirasi demi kemajuan Poltekkes Kemenkes Mataram.",
    ]
  };

  const [visi, setVisi] = useState(initialData.visi);
  const [misi, setMisi] = useState(initialData.misi);
  const [tempVisi, setTempVisi] = useState(visi);
  const [tempMisi, setTempMisi] = useState(misi.join('\n'));

  const handleSaveChanges = () => {
    setVisi(tempVisi);
    setMisi(tempMisi.split('\n').filter(line => line.trim() !== ''));
    showToast("Visi & Misi berhasil diperbarui!");
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
    <SectionWrapper id="visi-misi" title="Visi & Misi" bgClass="bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <EditWrapper>
          <div className="bg-brand-blue text-white p-8 rounded-lg shadow-xl h-full">
            <h3 className="text-3xl font-bold text-brand-gold mb-4 text-center">Visi</h3>
            {isEditMode ? (
              <textarea 
                value={tempVisi}
                onChange={(e) => setTempVisi(e.target.value)}
                className="w-full h-40 bg-white/10 text-white p-2 rounded-md text-lg leading-relaxed text-center italic"
              />
            ) : (
              <p className="text-lg leading-relaxed text-center italic">{visi}</p>
            )}
          </div>
        </EditWrapper>
        <EditWrapper>
          <div className="bg-slate-50 p-8 rounded-lg shadow-xl h-full">
            <h3 className="text-3xl font-bold text-brand-blue mb-6 text-center">Misi</h3>
            {isEditMode ? (
              <textarea 
                value={tempMisi}
                onChange={(e) => setTempMisi(e.target.value)}
                className="w-full h-48 bg-white text-slate-700 p-2 rounded-md"
                placeholder="Satu misi per baris"
              />
            ) : (
              <ul className="space-y-4">
                {misi.map((item, index) => (
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
      {isEditMode && (
        <div className="text-center mt-8">
          <button onClick={handleSaveChanges} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">
            Simpan Perubahan Visi & Misi
          </button>
        </div>
      )}
    </SectionWrapper>
  );
};

export default VisiMisi;