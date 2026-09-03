import {
    Wheat,
    Sprout,
    Leaf,
    TreePine,
    Sun,
    Fish,
    Waves,
    Anchor,
    Droplets,
    Store,
    ShoppingBag,
    Coins,
    TrendingUp,
    Briefcase,
    Factory,
    HeartHandshake,
    Users,
    Heart,
    Shield,
    Award,
    Smile,
    Home,
    Landmark,
    Building2,
    Scale,
    CheckCircle2,
    Truck,
    Bike,
    Navigation,
    Route,
    School,
    GraduationCap,
    Lightbulb,
    Moon,
    Star,
    Bell,
    Church,
    MapPin,
    Compass,
    Target,
    HeartPulse,
    ShieldCheck,
    UserCheck,
    BookOpen,
    BookMarked,
    Flag,
    Crown,
} from 'lucide-react';

export const ICON_REGISTRY = {
    // Visi & Misi Khusus
    Target: { icon: Target, label: 'Sasaran / Target / Visi', category: 'Visi & Kebijakan' },
    Flag: { icon: Flag, label: 'Bendera / Haluan Pembangunan', category: 'Visi & Kebijakan' },
    Crown: { icon: Crown, label: 'Kepemimpinan / Pimpinan Luhur', category: 'Visi & Kebijakan' },
    BookMarked: { icon: BookMarked, label: 'Berakhlak / Nilai Luhur', category: 'Visi & Kebijakan' },
    HeartPulse: { icon: HeartPulse, label: 'Kesehatan / Sehat & Bugar', category: 'Visi & Kebijakan' },
    ShieldCheck: { icon: ShieldCheck, label: 'Perlindungan / Sejahtera Aman', category: 'Visi & Kebijakan' },
    UserCheck: { icon: UserCheck, label: 'Amanah / Warga Terpercaya', category: 'Visi & Kebijakan' },
    BookOpen: { icon: BookOpen, label: 'Ilmu / Pendidikan & Wawasan', category: 'Pendidikan & Edukasi' },
    // Pertanian & Alam
    Wheat: { icon: Wheat, label: 'Gandum / Padi / Pertanian', category: 'Pertanian & Alam' },
    Sprout: { icon: Sprout, label: 'Tunas / Bibit Tumbuh', category: 'Pertanian & Alam' },
    Leaf: { icon: Leaf, label: 'Daun / Tanaman Hijau', category: 'Pertanian & Alam' },
    TreePine: { icon: TreePine, label: 'Pohon / Kehutanan', category: 'Pertanian & Alam' },
    Sun: { icon: Sun, label: 'Matahari / Cuaca Tropis', category: 'Pertanian & Alam' },

    // Perikanan & Kelautan
    Fish: { icon: Fish, label: 'Ikan / Tambak Budidaya', category: 'Perikanan & Perairan' },
    Waves: { icon: Waves, label: 'Ombak / Aliran Sungai / Perairan', category: 'Perikanan & Perairan' },
    Anchor: { icon: Anchor, label: 'Jangkar / Maritim / Dermaga', category: 'Perikanan & Perairan' },
    Droplets: { icon: Droplets, label: 'Air / Sumber Mata Air / Irigasi', category: 'Perikanan & Perairan' },

    // UMKM & Ekonomi
    Store: { icon: Store, label: 'Toko / Warung / Sentra UMKM', category: 'Ekonomi & Wirausaha' },
    ShoppingBag: { icon: ShoppingBag, label: 'Belanja / Perdagangan Warga', category: 'Ekonomi & Wirausaha' },
    Coins: { icon: Coins, label: 'Koin / Finansial / Pendapatan', category: 'Ekonomi & Wirausaha' },
    TrendingUp: { icon: TrendingUp, label: 'Pertumbuhan / Tren Ekonomi', category: 'Ekonomi & Wirausaha' },
    Briefcase: { icon: Briefcase, label: 'Karier / Usaha / Profesi', category: 'Ekonomi & Wirausaha' },
    Factory: { icon: Factory, label: 'Pabrik / Pengolahan Produksi', category: 'Ekonomi & Wirausaha' },

    // Masyarakat & Sosial
    HeartHandshake: { icon: HeartHandshake, label: 'Gotong Royong / Kemitraan', category: 'Sosial & Masyarakat' },
    Users: { icon: Users, label: 'Warga / Kelompok Masyarakat', category: 'Sosial & Masyarakat' },
    Heart: { icon: Heart, label: 'Kepedulian / Kesejahteraan', category: 'Sosial & Masyarakat' },
    Shield: { icon: Shield, label: 'Keamanan / Perlindungan Warga', category: 'Sosial & Masyarakat' },
    Award: { icon: Award, label: 'Penghargaan / Prestasi Desa', category: 'Sosial & Masyarakat' },
    Smile: { icon: Smile, label: 'Keramahan / Harmoni Warga', category: 'Sosial & Masyarakat' },
    Home: { icon: Home, label: 'Pemukiman / Rumah Warga', category: 'Sosial & Masyarakat' },

    // Lembaga & Pemerintahan
    Landmark: { icon: Landmark, label: 'Balai Desa / Gedung Publik', category: 'Pemerintahan & Hukum' },
    Building2: { icon: Building2, label: 'Kantor Kedinasan / Instansi', category: 'Pemerintahan & Hukum' },
    Scale: { icon: Scale, label: 'Keadilan / Musyawarah Desa', category: 'Pemerintahan & Hukum' },
    CheckCircle2: { icon: CheckCircle2, label: 'Pelayanan Publik Prima', category: 'Pemerintahan & Hukum' },

    // Mobilitas & Pendidikan
    MapPin: { icon: MapPin, label: 'Lokasi Strategis / Titik Peta', category: 'Infrastruktur & Sarana' },
    Compass: { icon: Compass, label: 'Arah Penunjuk / Geografis', category: 'Infrastruktur & Sarana' },
    Navigation: { icon: Navigation, label: 'Navigasi Wilayah', category: 'Infrastruktur & Sarana' },
    Route: { icon: Route, label: 'Jalan Poros / Rute Transportasi', category: 'Infrastruktur & Sarana' },
    Truck: { icon: Truck, label: 'Distribusi Logistik Hasil Panen', category: 'Infrastruktur & Sarana' },
    Bike: { icon: Bike, label: 'Transportasi Lokal Warga', category: 'Infrastruktur & Sarana' },
    School: { icon: School, label: 'Sekolah / Madrasah', category: 'Pendidikan & Edukasi' },
    GraduationCap: { icon: GraduationCap, label: 'Pendidikan Sarjana / SDM Unggul', category: 'Pendidikan & Edukasi' },
    Lightbulb: { icon: Lightbulb, label: 'Inovasi / Daya Pikir Kreatif', category: 'Pendidikan & Edukasi' },

    // Religi & Budaya
    Moon: { icon: Moon, label: 'Kegiatan Keagamaan / Religi', category: 'Keagamaan & Budaya' },
    Star: { icon: Star, label: 'Nilai Luhur / Keunggulan', category: 'Keagamaan & Budaya' },
    Bell: { icon: Bell, label: 'Informasi Penting / Pengumuman', category: 'Keagamaan & Budaya' },
    Church: { icon: Church, label: 'Kerukunan Umat Beragama', category: 'Keagamaan & Budaya' },
};

export function getIconComponent(iconName, fallback = Wheat) {
    if (!iconName) return fallback;
    return ICON_REGISTRY[iconName]?.icon || fallback;
}
