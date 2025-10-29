import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';

const FormField: React.FC<{ id: string, label: string, required?: boolean, children: React.ReactNode }> = ({ id, label, required, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
    </div>
);


const Aspirasi: React.FC = () => {
    const [formData, setFormData] = useState({
        nama: '',
        nim: '',
        departemen: '',
        aspirasi: '',
        kontak: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nama || !formData.nim || !formData.departemen || !formData.aspirasi) {
            setError('Mohon lengkapi semua field yang wajib diisi (bertanda *).');
            return;
        }
        
        setIsLoading(true);
        setError(null);

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzKI2eQXIfcdmJM4T43FFAYOiR2z_fOlU8Jop2UZM1kAoJf_JTl8ymZMbKrgIhr19I/exec';
        
        const payload = new FormData();
        payload.append('nama', formData.nama);
        payload.append('nim', formData.nim);
        payload.append('departemen', formData.departemen);
        payload.append('aspirasi', formData.aspirasi);
        payload.append('kontak', formData.kontak);
        if (file) {
           payload.append('lampiran', file.name); 
        }

        try {
            await fetch(scriptURL, {
                method: 'POST',
                body: payload,
                mode: 'no-cors',
            });

            setIsSubmitted(true);

        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Terjadi kesalahan. Silakan periksa koneksi internet Anda dan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const resetForm = () => {
        setIsSubmitted(false);
        setFormData({ nama: '', nim: '', departemen: '', aspirasi: '', kontak: '' });
        setFile(null);
        setError(null);
        setIsLoading(false);
    }

    if (isSubmitted) {
        return (
            <SectionWrapper id="aspirasi" title="Aspirasi KBM (Keluarga Besar Mahasiswa)" bgClass="bg-white">
                <div className="max-w-2xl mx-auto text-center bg-green-50 border-l-4 border-green-500 p-10 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">Terima Kasih!</h3>
                    <p className="text-slate-700 mb-6">Aspirasi Anda telah berhasil kami terima. Kami akan menindaklanjutinya sesegera mungkin.</p>
                    <button
                        onClick={resetForm}
                        className="bg-brand-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-900 transition-colors duration-300"
                    >
                        Kirim Aspirasi Lain
                    </button>
                </div>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper id="aspirasi" title="Aspirasi KBM (Keluarga Besar Mahasiswa)" bgClass="bg-white">
            <div className="max-w-2xl mx-auto bg-slate-50 p-8 rounded-lg shadow-xl border-t-4 border-brand-gold">
                <p className="text-center text-slate-600 mb-8">Kami mendengar Anda. Sampaikan ide, saran, atau keluhan Anda melalui formulir di bawah ini. Identitas Anda akan kami jaga kerahasiaannya.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormField id="nama" label="Nama Lengkap" required>
                        <input type="text" name="nama" id="nama" value={formData.nama} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                    </FormField>
                    <FormField id="nim" label="NIM (Nomor Induk Mahasiswa)" required>
                        <input type="text" name="nim" id="nim" value={formData.nim} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                    </FormField>
                    <FormField id="departemen" label="Jurusan / Program Studi" required>
                         <input type="text" name="departemen" id="departemen" value={formData.departemen} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required />
                    </FormField>
                    <FormField id="aspirasi" label="Isi Aspirasi" required>
                        <textarea name="aspirasi" id="aspirasi" rows={5} value={formData.aspirasi} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" required></textarea>
                    </FormField>
                    <FormField id="lampiran" label="Unggah File Lampiran (Opsional)">
                       <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-slate-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-blue hover:text-brand-gold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-blue">
                                    <span>Pilih file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                </label>
                                <p className="pl-1">atau seret dan lepas</p>
                                </div>
                                {file ? (
                                    <p className="text-xs text-green-600 font-semibold pt-2">{file.name}</p>
                                ) : (
                                    <p className="text-xs text-slate-500">PNG, JPG, PDF hingga 10MB</p>
                                )}
                            </div>
                        </div>
                    </FormField>
                     <FormField id="kontak" label="Kontak (Email/No. HP - Opsional)">
                        <input type="text" name="kontak" id="kontak" value={formData.kontak} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-blue focus:border-brand-blue" />
                    </FormField>
                    <div className="text-right pt-4">
                        <button 
                            type="submit" 
                            className="w-full sm:w-auto bg-brand-blue text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-slate-400 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Mengirim...' : 'Kirim Aspirasi'}
                        </button>
                    </div>
                    {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}
                </form>
            </div>
        </SectionWrapper>
    );
};

export default Aspirasi;
