import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';

interface GalleryProps {
  isEditMode: boolean;
  showToast: (message: string) => void;
}

interface ImageItem {
  id: number;
  src: string;
  description: string;
}

const initialImages: ImageItem[] = [
  { id: 1, src: 'https://picsum.photos/seed/event1/600/400', description: 'Pelatihan Kelegislatifan untuk anggota baru periode 2024.' },
  { id: 2, src: 'https://picsum.photos/seed/meeting2/600/400', description: 'Rapat Dengar Pendapat bersama pimpinan kampus.' },
  { id: 3, src: 'https://picsum.photos/seed/campus3/600/400', description: 'Suasana kampus Poltekkes Kemenkes Mataram.' },
  { id: 4, src: 'https://picsum.photos/seed/team4/600/400', description: 'Foto bersama seluruh anggota BLM periode 2024/2025.' },
  { id: 5, src: 'https://picsum.photos/seed/activity5/600/400', description: 'Kegiatan studi banding ke universitas lain.' },
  { id: 6, src: 'https://picsum.photos/seed/official6/600/400', description: 'Momen pelantikan pengurus baru oleh Direktur.' },
];

const ImageModal: React.FC<{
  image: Partial<ImageItem> | null;
  onSave: (data: Partial<ImageItem>, file?: File) => void;
  onClose: () => void;
}> = ({ image, onSave, onClose }) => {
  const [description, setDescription] = useState(image?.description || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(image?.src || 'https://via.placeholder.com/600x400.png?text=Pilih+Gambar');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !imageFile) {
        alert("Mohon pilih file gambar.");
        return;
    }
    onSave({ id: image?.id, description }, imageFile || undefined);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[101] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative animate-fade-in-down" style={{animationDuration: '0.3s'}}>
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-slate-500 hover:text-slate-800">&times;</button>
        <h3 className="text-2xl font-bold text-brand-blue mb-6">{image ? 'Edit Foto & Keterangan' : 'Tambah Foto Baru'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Pratinjau Gambar</label>
            <img src={previewUrl} alt="Preview" className="mt-1 w-full h-48 object-cover rounded-md bg-slate-100"/>
            <label htmlFor="imageFile" className="cursor-pointer mt-2 inline-block text-sm font-medium text-brand-blue hover:text-brand-gold">
                {image ? 'Ganti Gambar' : 'Pilih Gambar'}
            </label>
            <input type="file" id="imageFile" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Keterangan Foto</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
              required
            ></textarea>
          </div>
          <div className="text-right pt-4">
            <button type="submit" className="bg-brand-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-900 transition-colors duration-300">
              {image ? 'Simpan Perubahan' : 'Tambahkan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const Gallery: React.FC<GalleryProps> = ({ isEditMode, showToast }) => {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  
  const handleOpenModal = (image: ImageItem | null) => {
    setEditingImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingImage(null);
  };

  const handleSaveImage = (data: Partial<ImageItem>, file?: File) => {
    const imageUrl = file ? URL.createObjectURL(file) : data.src;

    if (editingImage) {
        setImages(prev => prev.map(img => 
            img.id === editingImage.id 
                ? { ...img, src: imageUrl || img.src, description: data.description || '' } 
                : img
        ));
        showToast("Foto berhasil diperbarui!");
    } else {
        const newImage: ImageItem = {
            id: Date.now(),
            src: imageUrl || '',
            description: data.description || ''
        };
        setImages(prev => [newImage, ...prev]);
        showToast("Foto berhasil ditambahkan!");
    }
    handleCloseModal();
  };
  
  const handleDeleteImage = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
      setImages(prev => prev.filter(img => img.id !== id));
      showToast("Foto berhasil dihapus!");
    }
  };

  const EditWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    if (!isEditMode) return <>{children}</>;
    return (
      <div className={`relative border-2 border-dashed border-blue-400 p-1 rounded-lg ${className}`}>
        {children}
      </div>
    );
  };

  return (
    <>
      <SectionWrapper id="galeri" title="Galeri Kegiatan" bgClass="bg-white">
        {isEditMode && (
           <div className="text-center mb-10">
              <EditWrapper className="inline-block">
                <button onClick={() => handleOpenModal(null)} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors shadow-md">
                    + Tambah Foto Dokumentasi
                </button>
              </EditWrapper>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <EditWrapper>
                <div className="overflow-hidden rounded-lg shadow-lg bg-white flex flex-col h-full">
                  <div className="h-56">
                    <img 
                      src={image.src} 
                      alt={image.description}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                   <div className="p-4 flex-grow">
                    <p className="text-sm text-slate-700 leading-relaxed">{image.description}</p>
                  </div>
                </div>
              </EditWrapper>
               {isEditMode && (
                  <div className="absolute top-2 right-2 flex gap-2">
                      <button onClick={() => handleOpenModal(image)} className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z"></path></svg>
                      </button>
                      <button onClick={() => handleDeleteImage(image.id)} className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                  </div>
              )}
            </div>
          ))}
        </div>
      </SectionWrapper>
       {showModal && (
        <ImageModal 
            image={editingImage}
            onClose={handleCloseModal}
            onSave={handleSaveImage}
        />
      )}
    </>
  );
};

export default Gallery;
