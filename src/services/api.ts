import { PageData, NewsItem, ImageItem, MembersData, VisiMisiData, LogoPhilosophyData } from '../data/initialData';
import { API_URL } from '../config';

// Helper function to handle POST requests to the Google Apps Script
async function postData(action: string, payload: any) {
    // FIX: Using .includes() to check for the placeholder string. This avoids a TypeScript error
    // that occurs when comparing two different known string literals with ===.
    if (API_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE')) {
        throw new Error("API URL belum dikonfigurasi. Silakan edit file src/config.ts");
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors', // mode cors diperlukan untuk menangani error
        redirect: 'follow', // Penting untuk menangani redirect dari Apps Script
        headers: {
            "Content-Type": "text/plain;charset=utf-8", // Sesuai rekomendasi Apps Script
        },
        body: JSON.stringify({ action, payload }),
    });

    if (response.ok) {
        const result = await response.json();
        if (!result.success) {
            console.error("API Error:", result.error);
            throw new Error(result.error || 'Terjadi kesalahan pada server.');
        }
        return result;
    } else {
        throw new Error(`Gagal terhubung ke server: ${response.statusText}`);
    }
}

// --- Live API Service ---
export const api = {
    async getData(): Promise<PageData> {
        // FIX: Using .includes() to check for the placeholder string. This avoids a TypeScript error
        // that occurs when comparing two different known string literals with ===.
        if (API_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE')) {
            console.warn("API URL not configured. Serving empty data. Please edit src/config.ts");
            throw new Error("API URL belum dikonfigurasi. Silakan edit file src/config.ts");
        }
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Gagal mengambil data dari server. Periksa kembali URL API dan pastikan Apps Script sudah di-deploy dengan benar.");
        }
        return response.json();
    },
    
    // --- Update Functions ---
    async updateHeroBackground(base64: string): Promise<any> {
        return postData('UPDATE_HERO', { backgroundImage: base64 });
    },

    async updateVisiMisi(data: VisiMisiData): Promise<any> {
        return postData('UPDATE_VISIMISI', data);
    },

    async updateGallery(data: ImageItem[]): Promise<any> {
        return postData('UPDATE_COLLECTION', { sheetName: 'gallery', data });
    },

    async updateNews(data: NewsItem[]): Promise<any> {
        return postData('UPDATE_COLLECTION', { sheetName: 'news', data });
    },
    
    async updateLeadership(data: MembersData): Promise<any> {
        return postData('UPDATE_LEADERSHIP', data);
    },

    async updateLogoPhilosophy(data: LogoPhilosophyData): Promise<any> {
        return postData('UPDATE_LOGOPHILOSOPHY', data);
    }
};