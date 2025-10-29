// FIX: Defined data structure interfaces directly in this file to resolve circular import errors.
export interface VisiMisiData {
    visi: string;
    misi: string[];
}

export interface ImageItem {
  id: number;
  src: string;
  description: string;
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  type: 'Berita' | 'Pengumuman' | 'Agenda';
  date: string;
}

export interface Member {
    id: string;
    role: string;
    name: string;
    imageUrl: string;
    members?: Member[];
    tupoksi?: string[];
    skills?: string[];
}

export interface MembersData {
    top: Member[];
    mid: Member[];
    commissions: Member[];
}

export interface LogoPhilosophyItem {
  title: string;
  imageUrl: string;
  details: string[];
}

export interface LogoPhilosophyData {
  blm: LogoPhilosophyItem;
  kabinet: LogoPhilosophyItem;
}

export interface PageData {
    hero: {
        backgroundImage: string;
    };
    visiMisi: VisiMisiData;
    gallery: ImageItem[];
    news: NewsItem[];
    leadership: MembersData;
    logoPhilosophy: LogoPhilosophyData;
}

export const initialData: PageData = {
    hero: {
        backgroundImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop"
    },
    visiMisi: {
        visi: "Mengembangkan Badan Legislatif Mahasiswa sebagai organisasi pionir yang bersinergi menciptakan inovasi, dan menginspirasi melalui peningkatan kerja sama dan kekeluargaan.",
        misi: [
            "Menjalankan setiap tugas dan tanggung jawab BLM berlandaskan iman dan taqwa.",
            "Menjadikan BLM sebagai mediator dalam berkomunikasi, berdiskusI, serta menampung dan menyalurkan aspirasi.",
            "Mengembangkan BLM agar dapat menciptakan inovasi, menginspirasi, serta pelayanan terbaik secara konsisten memberikan keberkahan.",
            "Bersinergi bersama untuk mewujudkan aspirasi demi kemajuan Poltekkes Kemenkes Mataram.",
        ]
    },
    gallery: [
        { id: 1, src: 'https://picsum.photos/seed/event1/600/400', description: 'Pelatihan Kelegislatifan untuk anggota baru periode 2024.' },
        { id: 2, src: 'https://picsum.photos/seed/meeting2/600/400', description: 'Rapat Dengar Pendapat bersama pimpinan kampus.' },
        { id: 3, src: 'https://picsum.photos/seed/campus3/600/400', description: 'Suasana kampus Poltekkes Kemenkes Mataram.' },
        { id: 4, src: 'https://picsum.photos/seed/team4/600/400', description: 'Foto bersama seluruh anggota BLM periode 2024/2025.' },
        { id: 5, src: 'https://picsum.photos/seed/activity5/600/400', description: 'Kegiatan studi banding ke universitas lain.' },
        { id: 6, src: 'https://picsum.photos/seed/official6/600/400', description: 'Momen pelantikan pengurus baru oleh Direktur.' },
    ],
    news: [
        { id: 1661430000000, title: 'Pelatihan Kelegislatifan 2024', content: 'Pelatihan dasar mengenai fungsi dan tugas legislatif bagi seluruh anggota baru untuk meningkatkan pemahaman dan kinerja.', type: 'Agenda', date: '25 Agu 2024' },
        { id: 1660825200000, title: 'Hasil Kongres Mahasiswa', content: 'Telah ditetapkan Anggaran Dasar/Anggaran Rumah Tangga (AD/ART) dan Garis Besar Haluan Kerja (GBHK) baru untuk periode 2024/2025.', type: 'Berita', date: '18 Agu 2024' },
        { id: 1660566000000, title: 'Jadwal Ujian Akhir Semester Ganjil', content: 'Diberitahukan kepada seluruh mahasiswa bahwa Ujian Akhir Semester (UAS) akan dilaksanakan mulai tanggal 10 September 2024.', type: 'Pengumuman', date: '15 Agu 2024' },
        { id: 1659356400000, title: 'Studi Banding Antar Lembaga', content: 'Kegiatan studi banding dengan lembaga legislatif universitas lain untuk bertukar pikiran dan inovasi.', type: 'Agenda', date: '01 Agu 2024' },
    ],
    leadership: {
        top: [
            { id: "ketua", role: "Ketua Umum", name: "Aulia Dini Mardiati", imageUrl: "https://i.pravatar.cc/150?u=ketua_aulia", tupoksi: ["Memimpin & mengkoordinir", "Bertanggung jawab umum", "Mewakili organisasi"] },
            { id: "wakil", role: "Wakil Ketua Umum", name: "Dina Aulia Febrianti", imageUrl: "https://i.pravatar.cc/150?u=wakil_dina", tupoksi: ["Membantu Ketua Umum", "Menggantikan tugas Ketua", "Koordinasi internal"] }
        ],
        mid: [
            { id: "sekum", role: "Sekretaris Umum", name: "Bq. Amalia Ariska", imageUrl: "https://i.pravatar.cc/150?u=sekretaris_amalia", tupoksi: ["Administrasi & surat-menyurat", "Notulensi rapat", "Pengarsipan dokumen"] },
            { id: "bendum", role: "Bendahara Umum", name: "Rizki Lailatul Fajri", imageUrl: "https://i.pravatar.cc/150?u=bendahara_rizki", tupoksi: ["Manajemen keuangan", "Membuat laporan keuangan", "Verifikasi anggaran"] }
        ],
        commissions: [
            { 
                id: "kom1", role: "Koordinator Komisi I", name: "Asadilla Al Riski", imageUrl: "https://i.pravatar.cc/150?u=asadilla", skills: ["Analisis Kebijakan", "Monitoring", "Evaluasi Program"],
                members: [
                    { id: "kom1-1", role: "Anggota", name: "Reni Nurnaningsi", imageUrl: "https://i.pravatar.cc/100?u=reni", skills: ["Riset", "Observasi"] },
                    { id: "kom1-2", role: "Anggota", name: "M. Chandra Egi Junanda", imageUrl: "https://i.pravatar.cc/100?u=chandra", skills: ["Wawancara", "Kritis"] },
                ]
            },
            { 
                id: "kom2", role: "Koordinator Komisi II", name: "(Belum Terisi)", imageUrl: "https://i.pravatar.cc/150?u=kosong", skills: ["Manajemen Anggaran", "Audit", "Akuntansi"],
                members: [
                    { id: "kom2-1", role: "Anggota", name: "Wiwin Hastika Septiana", imageUrl: "https://i.pravatar.cc/100?u=wiwinh", skills: ["Akuntansi Dasar", "Teliti"] },
                ]
            },
            { 
                id: "kom3", role: "Koordinator Komisi III", name: "Nela Deswinta", imageUrl: "https://i.pravatar.cc/150?u=nela", skills: ["Legal Drafting", "Perancangan UU", "Arsip"],
                members: [
                     { id: "kom3-1", role: "Anggota", name: "Wiwin Atqiya", imageUrl: "https://i.pravatar.cc/100?u=wiwina", skills: ["Riset Hukum", "Menulis"] },
                ]
            },
            { 
                id: "kom4", role: "Koordinator Komisi IV", name: "Melita Khairunnisa", imageUrl: "https://i.pravatar.cc/150?u=melita", skills: ["Public Speaking", "Media Sosial", "Networking"],
                members: [
                     { id: "kom4-1", role: "Anggota", name: "Arifiani Rastim", imageUrl: "https://i.pravatar.cc/100?u=arifiani", skills: ["Desain Grafis", "Humas"] },
                ]
            }
        ]
    },
    logoPhilosophy: {
        blm: {
          title: 'Filosofi Logo BLM',
          imageUrl: '/BLMPoltekkesMTR/logo.jpg',
          details: [
            'Tiga Bintang: Melambangkan Tri Dharma Perguruan Tinggi (Pendidikan, Penelitian, dan Pengabdian).',
            'Padi dan Kapas: Simbol kesejahteraan dan keadilan sosial bagi seluruh mahasiswa.',
            'Tugu Legislasi: Pilar utama demokrasi, hukum, dan konstitusi organisasi.',
            'Lingkaran Merah Putih: Semangat nasionalisme dan persatuan dalam bingkai NKRI.',
          ],
        },
        kabinet: {
          title: 'Filosofi Kabinet Sinergi Inovasi',
          imageUrl: 'https://via.placeholder.com/200x200.png?text=Logo+Kabinet',
          details: [
              'Roda Gigi: Sinergi dan kolaborasi antar komisi dan dengan lembaga lain.',
              'Api Obor: Semangat yang menyala untuk terus berinovasi dan memberikan pencerahan.',
              'Perisai: Fungsi pengawasan sebagai pelindung konstitusi dan penjaga aspirasi mahasiswa.',
              'Warna Emas: Melambangkan kejayaan, prestasi, dan harapan untuk masa depan gemilang.',
          ],
        },
      }
};