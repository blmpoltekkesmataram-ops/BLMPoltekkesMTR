import React from 'react';
import SectionWrapper from './SectionWrapper';

const Profile: React.FC = () => {
  return (
    <SectionWrapper id="profil" title="Profil Organisasi">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg md:text-xl leading-relaxed text-slate-700">
          BLM (Badan Legislatif Mahasiswa) Poltekkes Kemenkes Mataram merupakan lembaga legislatif tertinggi di tatanan organisasi mahasiswa Poltekkes Kemenkes Mataram.
        </p>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-slate-700">
          BLM sama seperti DPR (Dewan Perwakilan Rakyat) yang memiliki tiga fungsi utama yaitu legislatif, anggaran, serta pengawasan. Menjadi lembaga yang mampu menyalurkan aspirasi mahasiswa kepada lembaga eksekutif maupun pimpinan kampus.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default Profile;
