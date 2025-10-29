import React from 'react';
import Hero from './Hero';
import SectionWrapper from './SectionWrapper';
import { useData } from '../contexts/DataContext';
import { NewsItem, ImageItem } from '../data/initialData';
import Spinner from './Spinner';

const functions = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6M7 8h6" /></svg>,
        title: 'Legislasi',
        description: 'Menyusun dan menetapkan peraturan dan perundang-undangan organisasi mahasiswa.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h4m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        title: 'Anggaran',
        description: 'Mengawasi dan mengelola alokasi serta penggunaan anggaran kegiatan mahasiswa.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
        title: 'Pengawasan',
        description: 'Mengevaluasi kinerja lembaga eksekutif dan memastikan program berjalan sesuai rencana.'
    }
];

interface HomeProps {
    setPage: (page: string) => void;
    isEditMode: boolean;
    showToast: (message: string) => void;
}

const Home: React.FC<HomeProps> = ({ setPage, isEditMode, showToast }) => {
    const { data, loading, error } = useData();

    const latestNews = data ? [...data.news].sort((a, b) => b.id - a.id).slice(0, 6) : [];
    const latestImages = data ? [...data.gallery].sort((a, b) => b.id - a.id).slice(0, 6) : [];

    const getTypeClass = (type: NewsItem['type']) => {
        switch (type) {
            case 'Berita': return 'bg-blue-100 text-blue-800';
            case 'Pengumuman': return 'bg-yellow-100 text-yellow-800';
            case 'Agenda': return 'bg-green-100 text-green-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };
    
    const renderLatestItems = (items: any[], type: 'news' | 'gallery') => {
        if (loading) return <div className="w-full h-40 flex justify-center items-center"><Spinner /></div>;
        if (error) return <p className="text-red-500 text-center">Gagal memuat data.</p>;
        if (items.length === 0) return <p className="text-slate-500 text-center">Belum ada konten.</p>;

        if (type === 'news') {
             return items.map(item => (
                <div key={item.id} className="flex-shrink-0 w-80 bg-slate-50 rounded-lg shadow-md p-6 border-l-4 border-brand-gold transform hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-between items-center mb-2">
                        <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getTypeClass(item.type)}`}>
                            {item.type}
                        </span>
                        <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                    <h3 className="font-bold text-brand-blue">{item.title}</h3>
                </div>
            ));
        }

        if (type === 'gallery') {
            return (
                <>
                 {items.map((image) => (
                    <div key={image.id} className="flex-shrink-0 w-80 h-56 rounded-lg shadow-lg overflow-hidden group">
                        <img 
                          src={image.src} 
                          alt={image.description} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                        />
                    </div>
                ))}
                <div 
                    onClick={() => setPage('Galeri')}
                    className="flex-shrink-0 w-80 h-56 rounded-lg shadow-lg bg-brand-gold/20 hover:bg-brand-gold/40 flex flex-col items-center justify-center text-center text-brand-blue cursor-pointer transition-colors duration-300 p-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    <h3 className="text-xl font-bold">Lihat Galeri Lengkap</h3>
                    <p className="text-sm">Jelajahi semua dokumentasi kegiatan kami.</p>
                </div>
                </>
            );
        }
    };

    return (
        <>
            <Hero isEditMode={isEditMode} showToast={showToast} />

            {/* Welcome Section */}
             <section className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">Selamat Datang di Website Resmi BLM</h2>
                            <p className="mt-4 max-w-xl mx-auto md:mx-0 text-lg text-slate-600">
                                Badan Legislatif Mahasiswa (BLM) adalah pilar demokrasi di tingkat mahasiswa Poltekkes Kemenkes Mataram, berfungsi sebagai jembatan aspirasi dan pengawas jalannya organisasi.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" alt="Campus Life" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Main Functions Section */}
            <SectionWrapper id="home-fungsi" title="Tiga Fungsi Utama">
                 <div className="grid md:grid-cols-3 gap-8 text-center">
                    {functions.map(func => (
                        <div key={func.title} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out">
                            <div className="flex justify-center items-center h-20 w-20 mx-auto bg-brand-gold/20 text-brand-gold rounded-full mb-6">
                                {func.icon}
                            </div>
                            <h3 className="text-xl font-bold text-brand-blue mb-2">{func.title}</h3>
                            <p className="text-slate-600">{func.description}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Latest News Section */}
            <SectionWrapper id="home-berita" title="Berita & Agenda Terkini" bgClass="bg-white">
                <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    {renderLatestItems(latestNews, 'news')}
                </div>
                <div className="text-center mt-12">
                    <button onClick={() => setPage('Berita')} className="bg-brand-blue text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-900 transition-colors">
                        Lihat Semua Berita
                    </button>
                </div>
            </SectionWrapper>

            {/* Latest Gallery Section */}
            <SectionWrapper id="home-galeri" title="Galeri Terkini">
                <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                   {renderLatestItems(latestImages, 'gallery')}
                </div>
            </SectionWrapper>

            {/* Aspiration CTA Section */}
            <section className="py-16 sm:py-20 bg-brand-blue">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h2 className="text-3xl font-extrabold text-brand-gold">Punya Suara? Kami Mendengar.</h2>
                    <p className="mt-4 text-lg text-slate-300">
                        Aspirasi Anda adalah bahan bakar perubahan. Jangan ragu untuk menyampaikannya melalui kanal yang telah kami sediakan.
                    </p>
                    <div className="mt-8">
                        <button onClick={() => setPage('Aspirasi')} className="bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg">
                            Sampaikan Aspirasi Anda
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;