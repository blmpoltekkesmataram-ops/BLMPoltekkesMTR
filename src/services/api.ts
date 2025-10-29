import { PageData } from '../data/initialData';
import { API_URL } from '../config';

async function postData(action: string, payload: any) {
    if (API_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE')) {
        throw new Error("API URL belum dikonfigurasi. Silakan edit file src/config.ts");
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action, payload }),
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'An unknown server error occurred');
        }

        return result;

    } catch (e: any) {
        console.error("An unexpected network error occurred:", e);
        throw new Error('Gagal terhubung ke server. Periksa koneksi internet Anda atau konfigurasi CORS pada script.');
    }
}


async function updateAllData(data: PageData): Promise<any> {
    return postData('UPDATE_ALL_DATA', data);
}

export const api = {
    async getData(): Promise<PageData> {
        if (API_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE')) {
            throw new Error("API URL belum dikonfigurasi. Silakan edit file src/config.ts");
        }
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Gagal mengambil data dari server. Periksa kembali URL API dan pastikan Apps Script sudah di-deploy dengan benar.");
        }
        return response.json();
    },
    updateAllData,
};
