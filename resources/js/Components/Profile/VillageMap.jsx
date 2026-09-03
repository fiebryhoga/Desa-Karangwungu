import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    MapPin,
    Layers,
    Compass,
    Building2,
    Shield,
    Wheat,
    Fish,
    Home,
    ShoppingBag,
    Store,
    Maximize2,
    ArrowUp,
    ArrowDown,
    ArrowRight,
    ArrowLeft,
    ExternalLink,
    Landmark,
    HeartHandshake,
} from 'lucide-react';

export default function VillageMap() {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersLayerRef = useRef(null);
    const boundaryLayerRef = useRef(null);

    const [activeLayer, setActiveLayer] = useState('osm'); // 'osm' | 'satellite' | 'hot'
    const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'gov' | 'pemukiman' | 'umkm' | 'fasum'
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDark = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };
        checkDark();

        const observer = new MutationObserver(() => {
            checkDark();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    // Exact Center Coordinate from Google Maps: https://maps.app.goo.gl/ZcjXAFWJqSwTSRmA7
    const centerCoords = [-7.000918814280267, 112.3597668783957];

    const cardinalDirections = [
        {
            direction: 'Sebelah Utara',
            borderWith: 'Desa Guci & Desa Sumberwudi',
            IconComp: ArrowUp,
            desc: 'Batas area pertanian utara & bantaran sungai Bengawan Solo',
            color: 'border-red-500/40 bg-gradient-to-b from-red-700 via-red-800 to-red-950',
        },
        {
            direction: 'Sebelah Selatan',
            borderWith: 'Desa Karanggeneng',
            IconComp: ArrowDown,
            desc: 'Pusat kecamatan, SPBU Pertamina & jalan poros kabupaten',
            color: 'border-red-500/40 bg-gradient-to-b from-red-700 via-red-800 to-red-950',
        },
        {
            direction: 'Sebelah Timur',
            borderWith: 'Desa Sungelebak',
            IconComp: ArrowRight,
            desc: 'Kawasan perikanan air payau & sentra tambak produktif',
            color: 'border-red-500/40 bg-gradient-to-b from-red-700 via-red-800 to-red-950',
        },
        {
            direction: 'Sebelah Barat',
            borderWith: 'Desa Kalanganyar',
            IconComp: ArrowLeft,
            desc: 'Akses perniagaan warga & hamparan persawahan barat',
            color: 'border-red-500/40 bg-gradient-to-b from-red-700 via-red-800 to-red-950',
        },
    ];

    // Structured points of interest with formal categories
    const locations = [
        // 1. PEMERINTAHAN
        {
            id: 'balai-desa',
            name: 'Balai Desa Karangwungu',
            category: 'gov',
            categoryLabel: 'Pemerintahan',
            coords: [-7.0009188, 112.3597668],
            iconBg: 'bg-red-600 ring-red-400',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M13 10v11M17 10v11M12 3l8 7H4z"/></svg>`,
            desc: 'Kantor Balai Desa Karangwungu & Pusat Pelayanan Administrasi Publik Warga.',
        },
        {
            id: 'kantor-bpd',
            name: 'Sekretariat BPD & Lembaga Desa',
            category: 'gov',
            categoryLabel: 'Pemerintahan',
            coords: [-7.0013, 112.3601],
            iconBg: 'bg-red-600 ring-red-400',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
            desc: 'Badan Permusyawaratan Desa & ruang koordinasi kelembagaan masyarakat desa.',
        },

        // 2. PEMUKIMAN
        {
            id: 'pemukiman-pusat',
            name: 'Kawasan Pemukiman Karangwungu',
            category: 'pemukiman',
            categoryLabel: 'Pemukiman',
            coords: [-6.9985, 112.3595],
            iconBg: 'bg-amber-500 ring-amber-300',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
            desc: 'Pusat kawasan pemukiman warga dan permukiman rukun tetangga.',
        },
        {
            id: 'pemukiman-timur',
            name: 'Kawasan Pemukiman Karangwungu Timur',
            category: 'pemukiman',
            categoryLabel: 'Pemukiman',
            coords: [-7.0028, 112.3615],
            iconBg: 'bg-amber-500 ring-amber-300',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
            desc: 'Pemukiman warga timur dekat jalur akses persawahan dan tambak.',
        },
        {
            id: 'jalan-sumberwudi',
            name: 'Akses Jalan Poros Desa',
            category: 'pemukiman',
            categoryLabel: 'Pemukiman',
            coords: [-7.0035, 112.3598],
            iconBg: 'bg-amber-500 ring-amber-300',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
            desc: 'Poros jalan utama desa penghubung antar-wilayah.',
        },

        // 3. UMKM
        {
            id: 'umkm-sentra',
            name: 'Sentra UMKM & Niaga Jl. Sumberwudi',
            category: 'umkm',
            categoryLabel: 'UMKM',
            coords: [-7.0045, 112.3598],
            iconBg: 'bg-violet-600 ring-violet-400',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
            desc: 'Koridor perniagaan wirausaha warga, warung kuliner, dan perdagangan lokal.',
        },
        {
            id: 'tambak-area',
            name: 'Sentra Budidaya Tambak Bandeng & Udang',
            category: 'umkm',
            categoryLabel: 'UMKM',
            coords: [-7.0135, 112.3575],
            iconBg: 'bg-violet-600 ring-violet-400',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/></svg>`,
            desc: 'Sentra perikanan air tawar & payau penghasil bandeng dan udang vaname unggulan.',
        },
        {
            id: 'sawah-area',
            name: 'Hamparan Persawahan Padi Subur',
            category: 'umkm',
            categoryLabel: 'UMKM',
            coords: [-7.0085, 112.3585],
            iconBg: 'bg-violet-600 ring-violet-400',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22 12 2l10 20"/><path d="M6 14h12"/></svg>`,
            desc: 'Hamparan lahan hijau persawahan padi beririgasi teknis mandiri hasil panen melimpah.',
        },
        {
            id: 'kios-tani',
            name: 'Kios Sarana Produksi Tani & Pakan Tambak',
            category: 'umkm',
            categoryLabel: 'UMKM',
            coords: [-7.0052, 112.3590],
            iconBg: 'bg-violet-600 ring-violet-400',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></svg>`,
            desc: 'Penyedia bibit padi, pupuk pertanian, dan pakan budidaya perikanan warga.',
        },

        // 4. FASILITAS UMUM
        {
            id: 'masjid-jami',
            name: 'Masjid Jami\' Desa Karangwungu',
            category: 'fasum',
            categoryLabel: 'Fasilitas Umum',
            coords: [-6.9998, 112.3592],
            iconBg: 'bg-sky-600 ring-sky-400',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Z"/><path d="M12 18v-4"/></svg>`,
            desc: 'Pusat peribadatan umat Islam dan kegiatan keagamaan masyarakat desa.',
        },
        {
            id: 'bengawan-solo',
            name: 'Bantaran Aliran Bengawan Solo',
            category: 'fasum',
            categoryLabel: 'Fasilitas Umum',
            coords: [-6.9910, 112.3590],
            iconBg: 'bg-sky-600 ring-sky-400',
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/></svg>`,
            desc: 'Kawasan bantaran sungai di batas utara sebagai sumber irigasi pertanian.',
        },
    ];

    // Filter configuration (Concise as requested)
    const filterCategories = [
        { key: 'all', label: 'Semua' },
        { key: 'gov', label: 'Pemerintahan' },
        { key: 'pemukiman', label: 'Pemukiman' },
        { key: 'umkm', label: 'UMKM' },
        { key: 'fasum', label: 'Fasilitas Umum' },
    ];

    // Exact 100% Precise Boundary Polygon of Desa Karangwungu from GeoJSON data
    const villagePolygonCoords = [
        [-6.9888165, 112.3605222],
        [-6.9892692, 112.359729],
        [-6.9894266, 112.3592134],
        [-6.9896432, 112.3588961],
        [-6.9898597, 112.3583607],
        [-6.9903037, 112.3578974],
        [-6.9908438, 112.3575873],
        [-6.991513, 112.3573295],
        [-6.9920681, 112.3570471],
        [-6.9927531, 112.3568337],
        [-6.9929302, 112.3570717],
        [-6.9932296, 112.3569377],
        [-6.9934813, 112.3567544],
        [-6.9938356, 112.3565958],
        [-6.9939056, 112.3565813],
        [-6.9941702, 112.3565561],
        [-6.9943671, 112.3568932],
        [-6.9948198, 112.3565958],
        [-6.9953118, 112.356338],
        [-6.9956858, 112.3564371],
        [-6.9963353, 112.3562983],
        [-6.9968077, 112.3562388],
        [-6.9972801, 112.3562388],
        [-6.9972408, 112.3574088],
        [-6.9972862, 112.3576398],
        [-6.9977447, 112.3576398],
        [-6.9982542, 112.3575628],
        [-6.9985853, 112.3575371],
        [-6.99884, 112.3575115],
        [-6.9990183, 112.3575628],
        [-6.9991711, 112.3576398],
        [-6.9993749, 112.3577681],
        [-6.9996806, 112.3577424],
        [-6.9998589, 112.3577681],
        [-7.0001136, 112.3577168],
        [-7.0003174, 112.3576141],
        [-7.0005975, 112.3574858],
        [-7.0012853, 112.3573575],
        [-7.001973, 112.3573062],
        [-7.0026353, 112.3573575],
        [-7.0033481, 112.3573277],
        [-7.0044689, 112.3572507],
        [-7.0048509, 112.3574047],
        [-7.0061754, 112.3570197],
        [-7.006099, 112.3564551],
        [-7.0067103, 112.3563268],
        [-7.0067358, 112.3555313],
        [-7.0078565, 112.3553516],
        [-7.0087225, 112.3552233],
        [-7.0099494, 112.3550385],
        [-7.0101281, 112.3556865],
        [-7.0110214, 112.3555065],
        [-7.0111286, 112.3560105],
        [-7.0123077, 112.3558305],
        [-7.0124863, 112.3570185],
        [-7.0144158, 112.3567665],
        [-7.0144873, 112.3574865],
        [-7.0144873, 112.3580625],
        [-7.0130938, 112.3584945],
        [-7.0124506, 112.3585665],
        [-7.0112357, 112.3591425],
        [-7.0094492, 112.3595745],
        [-7.0086988, 112.3597905],
        [-7.0089489, 112.3600425],
        [-7.0075912, 112.3604025],
        [-7.0066621, 112.3606905],
        [-7.0056974, 112.3608705],
        [-7.0058761, 112.3616265],
        [-7.0060904, 112.3621305],
        [-7.0061619, 112.3625625],
        [-7.0052686, 112.3628505],
        [-7.0052686, 112.3631745],
        [-7.0049113, 112.3632105],
        [-7.004947, 112.3635705],
        [-7.0038378, 112.3635493],
        [-7.0035529, 112.3636218],
        [-7.0031612, 112.3635149],
        [-7.0026623, 112.3636597],
        [-7.0016284, 112.3633023],
        [-7.0012359, 112.3629794],
        [-7.0001649, 112.3630894],
        [-6.9995933, 112.3632705],
        [-6.9986997, 112.3632363],
        [-6.9976621, 112.3634546],
        [-6.9972325, 112.363023],
        [-6.9969818, 112.3624829],
        [-6.9964445, 112.3623036],
        [-6.9961578, 112.3619436],
        [-6.9954049, 112.3616201],
        [-6.9946156, 112.3614407],
        [-6.993754, 112.3613696],
        [-6.9928198, 112.3612624],
        [-6.9921007, 112.3613355],
        [-6.9909852, 112.3611923],
        [-6.9901929, 112.3610124],
        [-6.989364, 112.3607602],
        [-6.9888151, 112.3605255],
    ];

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Initialize Map Instance
        if (!mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: centerCoords,
                zoom: 15,
                zoomControl: false,
                scrollWheelZoom: true,
                doubleClickZoom: true,
                touchZoom: true,
                boxZoom: true,
                dragging: true,
            });

            // Add Zoom Control to Bottom Right
            L.control.zoom({ position: 'bottomright' }).addTo(map);

            mapInstanceRef.current = map;
            markersLayerRef.current = L.layerGroup().addTo(map);
            boundaryLayerRef.current = L.layerGroup().addTo(map);
        }

        const map = mapInstanceRef.current;

        // Free Watermark-Free Base Tile Layers
        const osmTile = L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 19,
            }
        );

        const satelliteTile = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: '&copy; Esri World Imagery',
                maxZoom: 19,
            }
        );

        const hotTile = L.tileLayer(
            'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            {
                attribution: '&copy; OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team',
                maxZoom: 19,
            }
        );

        // Remove existing tile layers
        map.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
                map.removeLayer(layer);
            }
        });

        if (activeLayer === 'satellite') {
            satelliteTile.addTo(map);
        } else if (activeLayer === 'hot') {
            hotTile.addTo(map);
        } else {
            osmTile.addTo(map);
        }

        // Draw Village Boundary Polygon
        boundaryLayerRef.current.clearLayers();
        const polygon = L.polygon(villagePolygonCoords, {
            color: '#dc2626',
            weight: 3,
            dashArray: '6, 6',
            fillColor: '#ef4444',
            fillOpacity: activeLayer === 'satellite' ? 0.22 : 0.12,
        }).addTo(boundaryLayerRef.current);

        polygon.bindTooltip('Batas Wilayah Desa Karangwungu', {
            sticky: true,
            className: 'text-xs font-bold text-red-700 bg-white px-2.5 py-1 rounded-md shadow-md border border-red-200',
        });

        // Fit map bounds to exact polygon on initial load
        if (!selectedLocation) {
            map.fitBounds(polygon.getBounds(), { padding: [30, 30] });
        }

        // Render Markers based on Active Filter
        markersLayerRef.current.clearLayers();
        const filteredLocations =
            activeFilter === 'all'
                ? locations
                : locations.filter((loc) => loc.category === activeFilter);

        filteredLocations.forEach((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            
            // Pure SVG Vector Pin Marker (No Emojis)
            const customIcon = L.divIcon({
                className: 'custom-map-pin',
                html: `
                    <div class="relative flex items-center justify-center cursor-pointer group">
                        <div class="absolute -inset-1 rounded-full ${isSelected ? 'bg-amber-400 animate-ping opacity-90' : 'bg-red-500/30 opacity-0 group-hover:opacity-100'} transition-opacity"></div>
                        <div class="h-8 w-8 rounded-full ${loc.iconBg} text-white ring-2 shadow-xl flex items-center justify-center transform transition-transform duration-200 group-hover:scale-110">
                            ${loc.iconSvg}
                        </div>
                    </div>
                `,
                iconSize: [32, 32],
                iconAnchor: [16, 16],
            });

            const marker = L.marker(loc.coords, { icon: customIcon }).addTo(
                markersLayerRef.current
            );

            marker.on('click', () => {
                setSelectedLocation(loc);
                map.flyTo(loc.coords, 16, { duration: 1 });
            });
        });

        return () => {
            // cleanup
        };
    }, [activeLayer, activeFilter, selectedLocation]);

    const handleFocusLocation = (loc) => {
        setSelectedLocation(loc);
        if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo(loc.coords, 16, { duration: 1.2 });
        }
    };

    const handleResetView = () => {
        setSelectedLocation(null);
        if (mapInstanceRef.current && boundaryLayerRef.current) {
            const bounds = L.polygon(villagePolygonCoords).getBounds();
            mapInstanceRef.current.fitBounds(bounds, { padding: [30, 30], duration: 1 });
        }
    };

    return (
        <div className="w-full rounded-lg overflow-hidden border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl flex flex-col space-y-0">
            {/* 1. Unified Master Header Bar */}
            <div className="px-5 sm:px-7 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white shadow-xs">
                <div className="flex items-center gap-3.5">
                    <div className="h-9 w-9 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                        <Compass className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-black text-base sm:text-lg text-white">
                            Batas Wilayah Administratif & Peta Spasial Desa
                        </h3>
                        <span className="text-xs text-red-200 block font-medium">
                            Kecamatan Karanggeneng &bull; Orientasi 4 Penjuru Mata Angin & Peta Interaktif
                        </span>
                    </div>
                </div>

                {/* Layer Selector Pills + Google Maps CTA */}
                <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
                    <div className="flex items-center gap-1 bg-black/35 p-1 rounded-lg border border-white/15 backdrop-blur-md">
                        <button
                            onClick={() => setActiveLayer('osm')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeLayer === 'osm'
                                ? 'bg-amber-400 text-zinc-950 shadow-xs'
                                : 'text-white hover:text-amber-300'
                            }`}
                        >
                            Peta Standar
                        </button>
                        <button
                            onClick={() => setActiveLayer('satellite')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeLayer === 'satellite'
                                ? 'bg-amber-400 text-zinc-950 shadow-xs'
                                : 'text-white hover:text-amber-300'
                            }`}
                        >
                            Foto Satelit
                        </button>
                        <button
                            onClick={() => setActiveLayer('hot')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                activeLayer === 'hot'
                                ? 'bg-amber-400 text-zinc-950 shadow-xs'
                                : 'text-white hover:text-amber-300'
                            }`}
                        >
                            Topografi
                        </button>
                    </div>

                    <a
                        href="https://maps.app.goo.gl/ZcjXAFWJqSwTSRmA7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-black/35 hover:bg-black/55 text-white text-xs font-bold border border-white/20 hover:border-amber-300 transition-all inline-flex items-center gap-1.5 shrink-0"
                    >
                        <span>Google Maps</span>
                        <ExternalLink className="h-3 w-3 text-amber-300" />
                    </a>
                </div>
            </div>

            {/* 2. Seamless Unified Content: 4 Cardinal Directions Bar + Interactive Map */}
            <div className="p-5 sm:p-7 space-y-6">
                {/* 4 Cardinal Directions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    {cardinalDirections.map((item, idx) => {
                        const DirectionIcon = item.IconComp;
                        return (
                            <div
                                key={idx}
                                className={`p-4 rounded-lg border ${item.color} text-white shadow-md shadow-red-950/20 hover:border-amber-400 hover:shadow-xl hover:shadow-red-950/30 transition-all duration-300 flex items-start justify-between gap-2.5 group`}
                            >
                                <div className="space-y-1 min-w-0 flex-1">
                                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 block">
                                        {item.direction}
                                    </span>
                                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                                        {item.borderWith}
                                    </h4>
                                    <p className="text-[11px] text-red-200/80 leading-snug line-clamp-2">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="h-7 w-7 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-zinc-950 transition-all">
                                    <DirectionIcon className="h-3.5 w-3.5" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 3. Concise Category Filter Bar */}
                <div className="rounded-lg px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-bold mr-1 flex items-center gap-1">
                            <Layers className="h-3 w-3 text-red-600 dark:text-amber-400" />
                            <span>Kategori:</span>
                        </span>

                        {filterCategories.map((cat) => {
                            const isActive = activeFilter === cat.key;

                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setActiveFilter(cat.key)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border border-red-500/50 shadow-md shadow-red-950/30'
                                            : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-red-400 dark:hover:border-amber-400 hover:text-red-700 dark:hover:text-amber-300'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleResetView}
                        className="text-[11px] font-bold text-red-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                        <Maximize2 className="h-3 w-3" />
                        <span>Reset Sudut Pandang</span>
                    </button>
                </div>

                {/* 4. Map Viewport Container + Floating Quick Card */}
                <div className={`relative w-full h-[420px] sm:h-[500px] rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-inner z-0 ${isDarkMode && activeLayer !== 'satellite' ? 'dark-map-tiles' : ''}`}>
                    <style>{`
                        .dark-map-tiles .leaflet-tile-pane {
                            filter: invert(100%) hue-rotate(180deg) brightness(85%) contrast(90%);
                        }
                        .dark-map-tiles .leaflet-container {
                            background: #18181b;
                        }
                    `}</style>
                    <div ref={mapContainerRef} className="w-full h-full" />

                    {/* Floating Detail Card for Selected Location */}
                    {selectedLocation && (
                        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-[1000] p-3.5 rounded-lg bg-gradient-to-b from-red-700 via-red-800 to-red-950 text-white border border-red-500/40 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 space-y-1.5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                                    {selectedLocation.categoryLabel}
                                </span>
                                <button
                                    onClick={() => setSelectedLocation(null)}
                                    className="text-white/70 hover:text-white text-xs font-bold p-1 cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-white">
                                {selectedLocation.name}
                            </h4>
                            <p className="text-[11px] text-red-200/90 leading-snug">
                                {selectedLocation.desc}
                            </p>
                        </div>
                    )}
                </div>

                {/* 5. Quick Jump Chips Strip below Map */}
                <div className="p-3 sm:p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 flex items-center gap-2 overflow-x-auto">
                    <span className="text-[11px] text-zinc-400 font-bold whitespace-nowrap pl-1">
                        Lompat ke Titik:
                    </span>
                    {locations.map((loc) => {
                        const isSelected = selectedLocation?.id === loc.id;
                        return (
                            <button
                                key={loc.id}
                                onClick={() => handleFocusLocation(loc)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                                    isSelected
                                        ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-amber-300 border-red-500/60 shadow-md shadow-red-950/25 font-bold'
                                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-red-400 dark:hover:border-amber-400 hover:text-red-700 dark:hover:text-amber-300'
                                }`}
                            >
                                <MapPin className={`h-3 w-3 ${isSelected ? 'text-amber-300' : 'text-red-500 dark:text-amber-400'}`} />
                                <span>{loc.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
