import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { useData } from '../contexts/DataContext';
import { ImageItem } from '../data/initialData';

interface GalleryProps {
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
    if (!image?.id && !imageFile) {
        alert("Mohon pilih file gambar untuk item baru.");
        return;
    }
    const dataToSave: Partial<ImageItem> = { id: image?.id, description };
    onSave(dataToSave, imageFile || undefined);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[101] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg relative animate-fade-in-down" style={{animationDuration: '0.3s'}}>
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-slate-500 hover:text-slate-800">&times;</button>
        <h3 className="text-2xl font-bold text-brand-blue mb-6">{image?.id ? 'Edit Foto & Keterangan' : 'Tambah Foto Baru'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Pratinjau Gambar</label>
            <img src={previewUrl} alt="Preview" className="mt-1 w-full h-48 object-cover rounded-md bg-slate-100"/>
            <label htmlFor="imageFile" className="cursor-pointer mt-2 inline-block text-sm font-medium text-brand-blue hover:text-brand-gold">
                {image?.id ? 'Ganti Gambar' : 'Pilih Gambar'}
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
              {image?.id ? 'Terapkan Perubahan' : 'Tambahkan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const Gallery: React.FC<GalleryProps> = ({ isEditMode, showToast }) => {
  const { editedData, setEditedGallery } = useData();
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

  const handleSaveImage = async (imageData: Partial<ImageItem>, file?: File) => {
    if (!editedData) return;
    
    if (editingImage) { // Editing existing image
        let imageUrl = editingImage.src;
        if (file) {
            imageUrl = await fileToBase64(file);
        }
        const newGallery = editedData.gallery.map(img => 
            img.id === editingImage.id 
                ? { ...img, src: imageUrl, description: imageData.description || '' } 
                : img
        );
        setEditedGallery(newGallery);
        showToast("Perubahan foto disimpan sementara.");
    } else { // Adding new image
        if (!file) return;
        const newImage: ImageItem = {
            id: Date.now(),
            src: await fileToBase64(file),
            description: imageData.description || ''
        };
        const newGallery = [newImage, ...editedData.gallery];
        setEditedGallery(newGallery);
        showToast("Foto baru ditambahkan sementara.");
    }
    handleCloseModal();
  };
  
  const handleDeleteImage = (id: number) => {
    if (!editedData) return;
    if (window.confirm('Apakah Anda yakin ingin menghapus foto ini? Perubahan akan disimpan saat Anda menekan "Simpan Semua".')) {
        const newGallery = editedData.gallery.filter(img => img.id !== id);
        setEditedGallery(newGallery);
        showToast("Foto ditandai untuk dihapus.");
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
          {editedData?.gallery.map((image) => (
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
