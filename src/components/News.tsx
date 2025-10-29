import React, { useState, useMemo } from 'react';
import SectionWrapper from './SectionWrapper';
import { useData } from '../contexts/DataContext';
import Spinner from './Spinner';
import { NewsItem } from '../data/initialData';

interface NewsProps {
  isLoggedIn: boolean;
  isEditMode: boolean;
  showToast: (message: string) => void;
}

const getTypeClass = (type: NewsItem['type']) => {
    switch (type) {
        case 'Berita': return 'bg-blue-100 text-blue-800';
        case 'Pengumuman': return 'bg-yellow-100 text-yellow-800';
        case 'Agenda': return 'bg-green-100 text-green-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const News: React.FC<NewsProps> = ({ isLoggedIn, isEditMode, showToast }) => {
    const { data, editedData, loading, error, setEditedNews } = useData();
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
    const [formData, setFormData] = useState({ title: '', content: '', type: 'Berita' as NewsItem['type'] });
    
    const [sortOption, setSortOption] = useState('newest');
    const [filterCategory, setFilterCategory] = useState('Semua');

    const displayData = isEditMode ? editedData : data;
    const newsItems = displayData?.news || [];

    const filteredAndSortedItems = useMemo(() => {
        let items = [...newsItems];
        if (filterCategory !== 'Semua') {
            items = items.filter(item => item.type === filterCategory);
        }
        switch (sortOption) {
            case 'newest': items.sort((a, b) => b.id - a.id); break;
            case 'oldest': items.sort((a, b) => a.id - b.id); break;
            case 'a-z': items.sort((a, b) => a.title.localeCompare(b.title)); break;
            case 'z-a': items.sort((a, b) => b.title.localeCompare(a.title)); break;
        }
        return items;
    }, [newsItems, sortOption, filterCategory]);


    const handleOpenModal = (item: NewsItem | null) => {
        if (item) {
            setEditingItem(item);
            setFormData({ title: item.title, content: item.content, type: item.type });
        } else {
            setEditingItem(null);
            setFormData({ title: '', content: '', type: 'Berita' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setFormData({ title: '', content: '', type: 'Berita' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editedData) return;

        if (editingItem) {
            const updatedItems = editedData.news.map(item => 
                item.id === editingItem.id ? { ...item, ...formData, date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) } : item
            );
            setEditedNews(updatedItems);
            showToast("Perubahan item disimpan sementara!");
        } else {
            const newItem: NewsItem = { 
                id: Date.now(), 
                ...formData, 
                date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
            };
            setEditedNews([newItem, ...editedData.news]);
            showToast("Item baru ditambahkan sementara!");
        }
        handleCloseModal();
    };

    const handleDelete = (id: number) => {
        if (!editedData) return;
        if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            setEditedNews(editedData.news.filter(item => item.id !== id));
            showToast("Item ditandai untuk dihapus.");
        }
    };

    const categories: ('Semua' | NewsItem['type'])[] = ['Semua', 'Berita', 'Pengumuman', 'Agenda'];
    
    const EditWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
        if (!isEditMode) return <>{children}</>;
        return (
          <div className={`relative border-2 border-dashed border-blue-400 p-1 rounded-lg ${className}`}>
            {children}
          </div>
        );
    };

    const renderContent = () => {
        if (loading) {
          return (
            <div className="h-96 flex justify-center items-center">
              <Spinner />
            </div>
          );
        }
    
        if (error) {
          return <p className="text-center text-red-500">{error}</p>;
        }
    
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedItems.map(item => (
                    <div key={item.id} className="relative">
                      <EditWrapper>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getTypeClass(item.type)}`}>
                                        {item.type}
                                    </span>
                                    <p className="text-sm text-slate-500">{item.date}</p>
                                </div>
                                <h3 className="text-xl font-bold text-brand-blue mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.content}</p>
                            </div>
                            {isEditMode && isLoggedIn && (
                                <div className="bg-slate-50 p-3 flex justify-end gap-2 border-t">
                                    <button onClick={() => handleOpenModal(item)} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors">Hapus</button>
                                </div>
                            )}
                        </div>
                      </EditWrapper>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <SectionWrapper id="berita" title="Berita & Pengumuman">
            {isEditMode && isLoggedIn && (
                <div className="text-center mb-8">
                  <EditWrapper className="inline-block">
                    <button onClick={() => handleOpenModal(null)} className="bg-brand-gold text-brand-blue font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-300 shadow-md">
                        + Tambah Baru
                    </button>
                  </EditWrapper>
                </div>
            )}
            
            <div className="mb-12 bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                             <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filterCategory === cat ? 'bg-brand-blue text-white shadow' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-sm font-medium text-slate-600">Urutkan:</label>
                        <select id="sort" value={sortOption} onChange={e => setSortOption(e.target.value)} className="bg-white border border-slate-300 rounded-md shadow-sm text-sm p-2 focus:outline-none focus:ring-1 focus:ring-brand-blue">
                            <option value="newest">Terbaru</option>
                            <option value="oldest">Terlama</option>
                            <option value="a-z">Judul (A-Z)</option>
                            <option value="z-a">Judul (Z-A)</option>
                        </select>
                    </div>
                </div>
            </div>

            {renderContent()}

            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-[101] flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative animate-fade-in-down" style={{animationDuration: '0.3s'}}>
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-2xl text-slate-500 hover:text-slate-800">&times;</button>
                        <h3 className="text-2xl font-bold text-brand-blue mb-6">{editingItem ? 'Edit Berita/Pengumuman' : 'Tambah Baru'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Judul</label>
                                <input type="text" id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                            </div>
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-slate-700">Konten</label>
                                <textarea id="content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} rows={4} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required></textarea>
                            </div>
                             <div>
                                <label htmlFor="type" className="block text-sm font-medium text-slate-700">Tipe</label>
                                <select id="type" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value as NewsItem['type']})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue bg-white">
                                    <option>Berita</option>
                                    <option>Pengumuman</option>
                                    <option>Agenda</option>
                                </select>
                            </div>
                            <div className="text-right pt-4">
                                <button type="submit" className="bg-brand-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-900 transition-colors duration-300">
                                    {editingItem ? 'Terapkan Perubahan' : 'Tambahkan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SectionWrapper>
    );
};

export default News;