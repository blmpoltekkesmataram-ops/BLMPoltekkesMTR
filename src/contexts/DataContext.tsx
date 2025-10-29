import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api } from '../services/api';
import { PageData, VisiMisiData, ImageItem, NewsItem, MembersData, LogoPhilosophyData } from '../data/initialData';

interface DataContextType {
    data: PageData | null;
    editedData: PageData | null;
    loading: boolean;
    isSaving: boolean;
    error: string | null;
    refetch: () => void;
    saveAllChanges: () => Promise<void>;
    setEditedHeroBackground: (base64: string) => void;
    setEditedVisiMisi: (data: VisiMisiData) => void;
    setEditedGallery: (gallery: ImageItem[]) => void;
    setEditedNews: (news: NewsItem[]) => void;
    setEditedLeadership: (data: MembersData) => void;
    setEditedLogoPhilosophy: (data: LogoPhilosophyData) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<PageData | null>(null);
    const [editedData, setEditedData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.getData();
            setData(result);
            setEditedData(JSON.parse(JSON.stringify(result))); // Deep copy for safe editing
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
            setData(null);
            setEditedData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const saveAllChanges = async () => {
        if (!editedData) {
            throw new Error("Tidak ada data untuk disimpan.");
        }
        setIsSaving(true);
        try {
            await api.updateAllData(editedData);
            await fetchData(); // Refetch to sync state with the server
        } catch (e) {
            console.error("Gagal menyimpan semua perubahan:", e);
            throw e; 
        } finally {
            setIsSaving(false);
        }
    };
    
    const setEditedHeroBackground = (backgroundImage: string) => {
        setEditedData(prev => prev ? { ...prev, hero: { ...prev.hero, backgroundImage } } : null);
    };

    const setEditedVisiMisi = (visiMisi: VisiMisiData) => {
        setEditedData(prev => prev ? { ...prev, visiMisi } : null);
    };
    
    const setEditedGallery = (gallery: ImageItem[]) => {
        setEditedData(prev => prev ? { ...prev, gallery } : null);
    };

    const setEditedNews = (news: NewsItem[]) => {
        setEditedData(prev => prev ? { ...prev, news } : null);
    };

    const setEditedLeadership = (leadership: MembersData) => {
        setEditedData(prev => prev ? { ...prev, leadership } : null);
    };

    const setEditedLogoPhilosophy = (logoPhilosophy: LogoPhilosophyData) => {
        setEditedData(prev => prev ? { ...prev, logoPhilosophy } : null);
    };

    const value = {
        data,
        editedData,
        loading,
        isSaving,
        error,
        refetch: fetchData,
        saveAllChanges,
        setEditedHeroBackground,
        setEditedVisiMisi,
        setEditedGallery,
        setEditedNews,
        setEditedLeadership,
        setEditedLogoPhilosophy
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};