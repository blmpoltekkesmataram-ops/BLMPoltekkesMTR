import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api } from '../services/api';
import { PageData, VisiMisiData, ImageItem, NewsItem, MembersData, LogoPhilosophyData, initialData } from '../data/initialData';

interface DataContextType {
    data: PageData;
    editedData: PageData;
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
    // Initialize with default data to prevent flicker. API fetch will hydrate this.
    const [data, setData] = useState<PageData>(initialData);
    const [editedData, setEditedData] = useState<PageData>(JSON.parse(JSON.stringify(initialData)));
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        // This is now a background hydration, so we don't set loading to true at the start
        setError(null);
        try {
            const result = await api.getData();
            // Ensure result is a valid object before setting
            if (result && typeof result === 'object' && Object.keys(result).length > 0) {
              setData(result);
              setEditedData(JSON.parse(JSON.stringify(result))); // Deep copy for safe editing
            } else {
              // If API returns empty or invalid data, stick with initialData
              console.warn("API returned empty or invalid data. Using initialData as fallback.");
              setData(initialData);
              setEditedData(JSON.parse(JSON.stringify(initialData)));
            }
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
            // On error, revert to initial data instead of showing a blank page
            setData(initialData);
            setEditedData(JSON.parse(JSON.stringify(initialData)));
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
            // After saving, the new data is the source of truth
            setData(JSON.parse(JSON.stringify(editedData))); 
        } catch (e) {
            console.error("Gagal menyimpan semua perubahan:", e);
            throw e; 
        } finally {
            setIsSaving(false);
        }
    };
    
    const setEditedHeroBackground = (backgroundImage: string) => {
        setEditedData(prev => ({ ...prev, hero: { ...prev.hero, backgroundImage } }));
    };

    const setEditedVisiMisi = (visiMisi: VisiMisiData) => {
        setEditedData(prev => ({ ...prev, visiMisi }));
    };
    
    const setEditedGallery = (gallery: ImageItem[]) => {
        setEditedData(prev => ({ ...prev, gallery }));
    };

    const setEditedNews = (news: NewsItem[]) => {
        setEditedData(prev => ({ ...prev, news }));
    };

    const setEditedLeadership = (leadership: MembersData) => {
        setEditedData(prev => ({ ...prev, leadership }));
    };

    const setEditedLogoPhilosophy = (logoPhilosophy: LogoPhilosophyData) => {
        setEditedData(prev => ({ ...prev, logoPhilosophy }));
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
