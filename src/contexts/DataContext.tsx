import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api } from '../services/api';
import { PageData, VisiMisiData, ImageItem, NewsItem, MembersData, LogoPhilosophyData } from '../data/initialData';

interface DataContextType {
    data: PageData | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
    // Update functions now trigger refetch instead of optimistically updating
    updateHeroBackground: (base64: string) => Promise<void>;
    updateVisiMisi: (data: VisiMisiData) => Promise<void>;
    addGalleryImage: (item: Omit<ImageItem, 'id'>) => Promise<void>;
    updateGalleryImage: (item: ImageItem) => Promise<void>;
    deleteGalleryImage: (id: number) => Promise<void>;
    addNewsItem: (item: Omit<NewsItem, 'id' | 'date'>) => Promise<void>;
    updateNewsItem: (item: NewsItem) => Promise<void>;
    deleteNewsItem: (id: number) => Promise<void>;
    updateLeadership: (data: MembersData) => Promise<void>;
    updateLogoPhilosophy: (data: LogoPhilosophyData) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await api.getData();
            setData(result);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
            // Clear data on error to prevent showing stale info
            setData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- WRAPPER FUNCTIONS ---
    // Each function now calls the API and then refetches all data for consistency.

    const updateHeroBackground = async (base64: string) => {
        await api.updateHeroBackground(base64);
        await fetchData();
    };

    const updateVisiMisi = async (newData: VisiMisiData) => {
        await api.updateVisiMisi(newData);
        await fetchData();
    };
    
    const addGalleryImage = async (item: Omit<ImageItem, 'id'>) => {
        if (!data) throw new Error("Data not loaded");
        const newItem: ImageItem = { ...item, id: Date.now() };
        const newGallery = [newItem, ...data.gallery];
        await api.updateGallery(newGallery);
        await fetchData();
    };

    const updateGalleryImage = async (item: ImageItem) => {
        if (!data) throw new Error("Data not loaded");
        const newGallery = data.gallery.map(i => i.id === item.id ? item : i);
        await api.updateGallery(newGallery);
        await fetchData();
    };

    const deleteGalleryImage = async (id: number) => {
        if (!data) throw new Error("Data not loaded");
        const newGallery = data.gallery.filter(i => i.id !== id);
        await api.updateGallery(newGallery);
        await fetchData();
    };
    
    const addNewsItem = async (item: Omit<NewsItem, 'id' | 'date'>) => {
        if (!data) throw new Error("Data not loaded");
        const newItem: NewsItem = { 
            ...item, 
            id: Date.now(),
            date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
        };
        const newNews = [newItem, ...data.news];
        await api.updateNews(newNews);
        await fetchData();
    };

    const updateNewsItem = async (item: NewsItem) => {
        if (!data) throw new Error("Data not loaded");
        const newNews = data.news.map(i => i.id === item.id ? {
            ...item,
            date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
        } : i);
        await api.updateNews(newNews);
        await fetchData();
    };
    
    const deleteNewsItem = async (id: number) => {
        if (!data) throw new Error("Data not loaded");
        const newNews = data.news.filter(i => i.id !== id);
        await api.updateNews(newNews);
        await fetchData();
    };
    
    const updateLeadership = async (newData: MembersData) => {
        await api.updateLeadership(newData);
        await fetchData();
    };
    
    const updateLogoPhilosophy = async (newData: LogoPhilosophyData) => {
        await api.updateLogoPhilosophy(newData);
        await fetchData();
    };


    const value = {
        data,
        loading,
        error,
        refetch: fetchData,
        updateHeroBackground,
        updateVisiMisi,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        addNewsItem,
        updateNewsItem,
        deleteNewsItem,
        updateLeadership,
        updateLogoPhilosophy,
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
