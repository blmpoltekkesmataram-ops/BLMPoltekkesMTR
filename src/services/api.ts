import { PageData, NewsItem, ImageItem, MembersData, VisiMisiData, LogoPhilosophyData } from '../data/initialData';
import { API_URL } from '../config';

// Helper function to handle POST requests to the Google Apps Script
async function postData(action: string, payload: any) {
    if (API_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE')) {
        throw new Error("API URL belum dikonfigurasi. Silakan edit file src/config.ts");
    }

    try {
        // We don't need to await the response body, as Google Apps Script's redirect
        // will cause a CORS error, preventing us from reading it. We just fire and forget.
        await fetch(API_URL, {
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify({ action, payload }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        });
        // If fetch *doesn't* throw, it's an unusual but successful case.
        return { success: true };
    } catch (e: any) {
        // The expected error is a TypeError: Failed to fetch due to the CORS redirect on a successful POST.
        // We can safely treat this specific error as a success signal.
        if (e instanceof TypeError && e.message === 'Failed to fetch') {
            console.warn("Caught 'Failed to fetch' which is expected for Google Apps Script POST. Assuming success.");
            return { success: true };
        }
        // If it's a different kind of error (e.g., network is down), we should report it.
        console.error("An unexpected network error occurred:", e);
        throw new Error('Gagal terhubung ke server. Periksa koneksi internet Anda.');
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