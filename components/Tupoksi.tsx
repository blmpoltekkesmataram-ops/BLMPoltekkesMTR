import React from 'react';
import SectionWrapper from './SectionWrapper';

const TupoksiCard: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out">
    <h3 className="text-xl font-bold text-brand-blue mb-4 border-b-2 border-brand-gold pb-2">{title}</h3>
    <ul className="space-y-3 text-slate-600 list-disc list-inside">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

const Tupoksi: React.FC = () => {
  const tupoksiItems = [
    "Mewujudkan mahasiswa yang bertaqwa kepada Tuhan Yang Maha Esa sebagai insan akademis, pelopor, dan bertanggung jawab.",
    "Mengembangkan wawasan keilmuan mahasiswa khususnya dalam hal legislasi.",
    "Melatih jiwa kepemimpinan dan jiwa demokratis bagi mahasiswa.",
    "Menampung, menyalurkan, dan menindaklanjuti aspirasi mahasiswa.",
    "Mendorong mahasiswa untuk bersikap aktif, partisipatif, analitis, kritis, dan solutif.",
    "Menjaga keharmonisan dan sinergitas antar organisasi.",
  ];

  const wewenangItems = [
    "Membuat dan menetapkan AD/ART, GBHO, GBHK, dan PPOM.",
    "Menyelenggarakan pemilu raya (PEMIRA).",
    "Mengetahui SK pengesahan keanggotaan BEM, HMJ, dan HIMA.",
    "Meminta LPJ dari BEM, HMJ, dan HIMA.",
    "Mengevaluasi kinerja seluruh lembaga kemahasiswaan.",
    "Mengesahkan program kerja setiap periode.",
    "Mengawasi kebijakan dan kinerja BEM, HMJ, HIMA, dan institusi.",
    "Menampung, menyalurkan, dan menindaklanjuti aspirasi mahasiswa.",
  ];

  return (
    <SectionWrapper id="tupoksi" title="Peran & Tanggung Jawab">
      <div className="max-w-4xl mx-auto text-center mb-12 bg-slate-100 p-8 rounded-lg">
        <h3 className="text-3xl font-bold text-brand-blue mb-4">Fungsi Utama</h3>
        <p className="text-lg text-slate-700">
          Mengawasi, mengevaluasi, dan memberikan solusi atas jalannya pemerintahan yang sedang dan telah berlangsung di organisasi mahasiswa Poltekkes Kemenkes Mataram, serta menyalurkan aspirasi dari dan kepada pihak yang terkait.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <TupoksiCard title="Tugas Pokok & Fungsi" items={tupoksiItems} />
        <TupoksiCard title="Tugas & Wewenang" items={wewenangItems} />
      </div>
    </SectionWrapper>
  );
};

export default Tupoksi;