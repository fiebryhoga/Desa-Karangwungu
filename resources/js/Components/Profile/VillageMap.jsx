import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    MapPin,
    Layers,
    Navigation,
    Compass,
    Building2,
    Shield,
    Wheat,
    Fish,
    Home,
    Sparkles,
    Maximize2,
    Eye,
} from 'lucide-react';

export default function VillageMap() {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersLayerRef = useRef(null);
    const boundaryLayerRef = useRef(null);

    const [activeLayer, setActiveLayer] = useState('voyager'); // 'voyager' | 'satellite' | 'dark'
    const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'gov' | 'dusun' | 'potensi'
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Center Coordinate of Desa Karangwungu, Karanggeneng, Lamongan
    const centerCoords = [-7.0425, 112.3855];

    // Key points of interest in Desa Karangwungu
    const locations = [
        {
            id: 'balai-desa',
            name: 'Balai Desa Karangwungu',
            category: 'gov',
            categoryLabel: 'Pusat Pemerintahan',
            coords: [-7.0422, 112.3852],
            iconBg: 'bg-red-600',
            desc: 'Kantor Kepala Desa & Pusat Pelayanan Administrasi Warga.',
        },
        {
            id: 'dusun-1',
            name: 'Dusun Karangwungu',
            category: 'dusun',
            categoryLabel: 'Wilayah Dusun',
            coords: [-7.0405, 112.3835],
            iconBg: 'bg-amber-500',
            desc: 'Kawasan pemukiman warga barat & pusat kegiatan sosial.',
        },
        {
            id: 'dusun-2',
            name: 'Dusun Bunder',
            category: 'dusun',
            categoryLabel: 'Wilayah Dusun',
            coords: [-7.0442, 112.3882],
            iconBg: 'bg-amber-500',
            desc: 'Kawasan pemukiman timur berbatasan dengan sentra tambak.',
        },
        {
            id: 'dusun-3',
            name: 'Dusun Geneng',
            category: 'dusun',
            categoryLabel: 'Wilayah Dusun',
            coords: [-7.0458, 112.3842],
            iconBg: 'bg-amber-500',
            desc: 'Kawasan pemukiman selatan menuju poros jalan kecamatan.',
        },
        {
            id: 'dusun-4',
            name: 'Dusun Tambak Rejo',
            category: 'dusun',
            categoryLabel: 'Wilayah Dusun',
            coords: [-7.0392, 112.3895],
            iconBg: 'bg-amber-500',
            desc: 'Kawasan dusun utara berbatasan dengan persawahan subur.',
        },
        {
            id: 'tambak-area',
            name: 'Sentra Tambak Ikan & Udang',
            category: 'potensi',
            categoryLabel: 'Kawasan Ekonomi',
            coords: [-7.0465, 112.3925],
            iconBg: 'bg-blue-600',
            desc: 'Sentra budidaya perikanan air tawar & payau (Bandeng & Vaname).',
        },
        {
            id: 'sawah-area',
            name: 'Kawasan Persawahan Padi',
            category: 'potensi',
            categoryLabel: 'Kawasan Pertanian',
            coords: [-7.0375, 112.3820],
            iconBg: 'bg-emerald-600',
            desc: 'Hamparan lahan hijau beririgasi teknis produktif penghasil gabah.',
        },
    ];

    // Stylized boundary polygon of Desa Karangwungu
    const villagePolygonCoords = [
        [-7.0360, 112.3800],
        [-7.0355, 112.3870],
        [-7.0380, 112.3940],
        [-7.0440, 112.3965],
        [-7.0490, 112.3930],
        [-7.0485, 112.3840],
        [-7.0450, 112.3785],
        [-7.0395, 112.3780],
        [-7.0360, 112.3800],
    ];

    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Initialize Map Instance
        if (!mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: centerCoords,
                zoom: 14,
                zoomControl: false,
                scrollWheelZoom: false,
            });

            // Add Zoom Control to Bottom Right
            L.control.zoom({ position: 'bottomright' }).addTo(map);

            mapInstanceRef.current = map;
            markersLayerRef.current = L.layerGroup().addTo(map);
            boundaryLayerRef.current = L.layerGroup().addTo(map);
        }

        const map = mapInstanceRef.current;

        // Base Tile Layers
        // 1. CartoDB Voyager (Crisp & Clean)
        const voyagerTile = L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
                attribution: '&copy; OpenStreetMap &copy; CARTO',
                maxZoom: 19,
                subdomains: 'abcd',
            }
        );

        // 2. Esri World Imagery (High-Res Real Satellite)
        const satelliteTile = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
                maxZoom: 19,
            }
        );

        // 3. CartoDB Dark Matter
        const darkTile = L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            {
                attribution: '&copy; OpenStreetMap &copy; CARTO',
                maxZoom: 19,
                subdomains: 'abcd',
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
        } else if (activeLayer === 'dark') {
            darkTile.addTo(map);
        } else {
            voyagerTile.addTo(map);
        }

        // Draw Village Boundary Polygon
        boundaryLayerRef.current.clearLayers();
        const polygon = L.polygon(villagePolygonCoords, {
            color: '#dc2626',
            weight: 2.5,
            dashArray: '5, 5',
            fillColor: '#ef4444',
            fillOpacity: activeLayer === 'satellite' ? 0.15 : 0.08,
        }).addTo(boundaryLayerRef.current);

        polygon.bindTooltip('Batas Wilayah Desa Karangwungu', {
            sticky: true,
            className: 'text-xs font-bold text-red-700 bg-white px-2 py-1 rounded shadow-md',
        });

        // Render Markers based on Active Filter
        markersLayerRef.current.clearLayers();
        const filteredLocations =
            activeFilter === 'all'
                ? locations
                : locations.filter((loc) => loc.category === activeFilter);

        filteredLocations.forEach((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            
            // Custom HTML Pin Marker
            const customIcon = L.divIcon({
                className: 'custom-map-pin',
                html: `
                    <div class="relative flex items-center justify-center cursor-pointer group">
                        <div class="absolute -inset-1 rounded-full ${isSelected ? 'bg-amber-400 animate-ping opacity-75' : 'bg-red-500/40 opacity-0 group-hover:opacity-100'} transition-opacity"></div>
                        <div class="h-8 w-8 rounded-full ${loc.iconBg} text-white border-2 border-white shadow-xl flex items-center justify-center transform transition-transform group-hover:scale-110">
                            <span class="text-[10px] font-black">${loc.category === 'gov' ? '🏛️' : loc.category === 'potensi' ? '🌾' : '🏡'}</span>
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
            // cleanup if needed
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
        if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo(centerCoords, 14, { duration: 1 });
        }
    };

    return (
        <div className="rounded-2xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl flex flex-col">
            {/* 1. Header Bar */}
            <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-black/30 border border-white/15 text-amber-300 flex items-center justify-center shrink-0">
                        <Compass className="h-4 w-4" />
                    </div>
                    <div>
                        <h3 className="font-black text-sm sm:text-base text-white">
                            Peta Spasial & Titik Strategis Desa
                        </h3>
                        <span className="text-[11px] text-red-200 block font-medium">
                            Visualisasi Geografis Interaktif Wilayah Karangwungu
                        </span>
                    </div>
                </div>

                {/* Layer Selector Pills */}
                <div className="flex items-center gap-1.5 bg-black/35 p-1 rounded-xl border border-white/15 backdrop-blur-md self-start sm:self-auto">
                    <button
                        onClick={() => setActiveLayer('voyager')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            activeLayer === 'voyager'
                                ? 'bg-amber-400 text-zinc-950 shadow-xs'
                                : 'text-white hover:text-amber-300'
                        }`}
                    >
                        Peta Standar
                    </button>
                    <button
                        onClick={() => setActiveLayer('satellite')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            activeLayer === 'satellite'
                                ? 'bg-amber-400 text-zinc-950 shadow-xs'
                                : 'text-white hover:text-amber-300'
                        }`}
                    >
                        Foto Satelit
                    </button>
                </div>
            </div>

            {/* 2. Interactive Category Filter Bar */}
            <div className="px-4 sm:px-6 py-2.5 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-semibold mr-1">
                        Filter Titik:
                    </span>
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                            activeFilter === 'all'
                                ? 'bg-red-600 text-white shadow-xs'
                                : 'bg-zinc-200/70 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300'
                        }`}
                    >
                        Semua ({locations.length})
                    </button>
                    <button
                        onClick={() => setActiveFilter('gov')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                            activeFilter === 'gov'
                                ? 'bg-red-600 text-white shadow-xs'
                                : 'bg-zinc-200/70 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300'
                        }`}
                    >
                        Pemerintahan
                    </button>
                    <button
                        onClick={() => setActiveFilter('dusun')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                            activeFilter === 'dusun'
                                ? 'bg-red-600 text-white shadow-xs'
                                : 'bg-zinc-200/70 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300'
                        }`}
                    >
                        Dusun (4)
                    </button>
                    <button
                        onClick={() => setActiveFilter('potensi')}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                            activeFilter === 'potensi'
                                ? 'bg-red-600 text-white shadow-xs'
                                : 'bg-zinc-200/70 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300'
                        }`}
                    >
                        Sentra Pertanian & Tambak
                    </button>
                </div>

                <button
                    onClick={handleResetView}
                    className="text-[11px] font-bold text-red-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                    <Maximize2 className="h-3 w-3" />
                    <span>Reset Sudut Pandang</span>
                </button>
            </div>

            {/* 3. Map Viewport Container + Floating Quick Card */}
            <div className="relative w-full h-[360px] sm:h-[440px] z-0">
                <div ref={mapContainerRef} className="w-full h-full" />

                {/* Floating Detail Card for Selected Location */}
                {selectedLocation && (
                    <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs z-[1000] p-3.5 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-amber-400 border border-red-200 dark:border-red-900/50">
                                {selectedLocation.categoryLabel}
                            </span>
                            <button
                                onClick={() => setSelectedLocation(null)}
                                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs font-bold p-1"
                            >
                                ✕
                            </button>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                            {selectedLocation.name}
                        </h4>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">
                            {selectedLocation.desc}
                        </p>
                    </div>
                )}
            </div>

            {/* 4. Quick Jump Chips Strip below Map */}
            <div className="p-3 sm:p-4 bg-zinc-50 dark:bg-zinc-800/40 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center gap-2 overflow-x-auto">
                <span className="text-[11px] text-zinc-400 font-bold whitespace-nowrap pl-1">
                    Lompat ke:
                </span>
                {locations.map((loc) => (
                    <button
                        key={loc.id}
                        onClick={() => handleFocusLocation(loc)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 ${
                            selectedLocation?.id === loc.id
                                ? 'bg-red-600 text-white border-red-700 shadow-xs'
                                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-red-400 dark:hover:border-amber-400'
                        }`}
                    >
                        <MapPin className="h-3 w-3 text-red-500 dark:text-amber-400" />
                        <span>{loc.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
