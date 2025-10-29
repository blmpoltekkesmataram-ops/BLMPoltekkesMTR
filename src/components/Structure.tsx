import React from 'react';
import SectionWrapper from './SectionWrapper';

interface Commission {
  id: number;
  name: string;
  title: string;
  tasks: string[];
  program: string;
  icon: React.ReactNode;
}

const commissions: Commission[] = [
  {
    id: 1,
    name: 'Komisi 1',
    title: 'Pengawasan Organisasi',
    tasks: [
      'Mengawasi kebijakan dan kinerja eksekutif.',
      'Monitoring dan evaluasi laporan kegiatan.',
      'Melaporkan hasil kerja kepada Ketua Umum BLM.',
    ],
    program: 'Triwulan',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>,
  },
  {
    id: 2,
    name: 'Komisi 2',
    title: 'Anggaran',
    tasks: [
      'Memeriksa laporan keuangan & rencana anggaran.',
      'Mengawasi pengelolaan dan pengendalian keuangan KBM.',
      'Melaporkan hasil kerja kepada Ketua Umum BLM.',
    ],
    program: 'IOM',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h4m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
  {
    id: 3,
    name: 'Komisi 3',
    title: 'Legislasi',
    tasks: [
      'Mengarsipkan seluruh AD/ART dan aturan.',
      'Menyusun hukum dan perundang-undangan (PPOM, AD/ART, dll).',
    ],
    program: 'Kongres dan PEMIRA',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6M7 8h6" /></svg>,
  },
  {
    id: 4,
    name: 'Komisi 4',
    title: 'Komunikasi',
    tasks: [
      'Menerima dan menyaring aspirasi mahasiswa.',
      'Mengelola media sosial dan publikasi BLM.',
      'Menjalin hubungan antar lembaga eksternal.',
    ],
    program: 'Pelatihan, Studi Banding, Diskusi',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V10a2 2 0 012-2h8z" /></svg>,
  },
];

const CommissionCard: React.FC<{ commission: Commission }> = ({ commission }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col hover:scale-105 transform transition-transform duration-300 ease-in-out border-t-4 border-brand-gold">
        <div className="flex items-center mb-4 text-brand-blue">
            <div className="p-3 bg-brand-gold/20 rounded-full mr-4 text-brand-gold">{commission.icon}</div>
            <div>
                <h3 className="text-xl font-bold">{commission.name}</h3>
                <p className="text-slate-600 font-semibold">{commission.title}</p>
            </div>
        </div>
        <div className="flex-grow">
            <h4 className="font-semibold text-slate-800 mb-2">Tugas & Wewenang:</h4>
            <ul className="space-y-2 text-slate-600 list-disc list-inside text-sm">
                {commission.tasks.map((task, index) => <li key={index}>{task}</li>)}
            </ul>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-200">
            <h4 className="font-semibold text-slate-800">Program Kerja Utama:</h4>
            <p className="text-brand-blue font-medium">{commission.program}</p>
        </div>
    </div>
);


const Structure: React.FC = () => {
  return (
    <SectionWrapper id="struktur" title="Struktur Komisi" bgClass="bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {commissions.map(commission => <CommissionCard key={commission.id} commission={commission} />)}
      </div>
    </SectionWrapper>
  );
};

export default Structure;
