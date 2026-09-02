import React from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Badge from '../../Components/UI/Badge';
import Button from '../../Components/UI/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../Components/UI/Card';
import { Sparkles, Phone, MapPin, Tag, ShoppingBag } from 'lucide-react';

export default function PotentialsIndex({
    potentials = [],
    selectedCategory = 'Semua',
    categories = [],
}) {
    const handleCategoryFilter = (cat) => {
        router.get('/potensi', { category: cat === 'Semua' ? '' : cat });
    };

    return (
        <AppLayout>
            <SeoHead
                title="Potensi Desa & Produk UMKM Unggulan"
                description="Katalog Potensi Komoditas dan Produk UMKM Desa Karangwungu, Kecamatan Karanggeneng, Lamongan. Budidaya ikan bandeng, udang vaname, beras organik, kerupuk ikan, dan kerajinan anyaman mendong."
                keywords="Potensi Desa Karangwungu, Bandeng Karangwungu Lamongan, UMKM Karangwungu, Kerajinan Mendong Lamongan"
                breadcrumbs={[{ label: 'Potensi & UMKM', url: '/potensi' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Title */}
                <div className="my-6">
                    <Badge variant="warning">Ekonomi Desa</Badge>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 mt-2">
                        Potensi Unggulan & Direktori UMKM Desa
                    </h1>
                    <p className="text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                        Mendukung pertumbuhan ekonomi mandiri warga Desa Karangwungu melalui hilirisasi komoditas tambak, pertanian, dan industri kreatif lokal.
                    </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 my-6">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryFilter(cat)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                selectedCategory === cat || (cat === 'Semua' && !selectedCategory)
                                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Potentials Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
                    {potentials.map((item) => (
                        <Card key={item.id} className="overflow-hidden flex flex-col hover:border-zinc-400 dark:hover:border-zinc-700 transition-all hover:shadow-md">
                            <div className="h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                                <img
                                    src={item.image || 'https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=800&q=80'}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge variant="default" className="bg-black/70 backdrop-blur-sm text-white border-0 text-[11px]">
                                        {item.category}
                                    </Badge>
                                </div>
                            </div>

                            <CardHeader className="p-4 pb-2 flex-1">
                                <CardTitle className="text-base font-bold">
                                    {item.title}
                                </CardTitle>
                                {item.price_range && (
                                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                                        <Tag className="h-3 w-3" />
                                        <span>{item.price_range}</span>
                                    </p>
                                )}
                                <CardDescription className="text-xs leading-relaxed mt-2 line-clamp-3">
                                    {item.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="p-4 pt-0 space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                                {item.owner_name && (
                                    <div className="flex items-center gap-1.5">
                                        <ShoppingBag className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                                        <span>Produsen: <strong>{item.owner_name}</strong></span>
                                    </div>
                                )}
                                {item.location && (
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                                        <span>{item.location}</span>
                                    </div>
                                )}
                            </CardContent>

                            {item.contact_phone && (
                                <CardFooter className="p-4 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                    <a
                                        href={`https://wa.me/62${item.contact_phone.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=Halo%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(item.title)}%20Desa%20Karangwungu`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 dark:text-emerald-300 transition-colors"
                                    >
                                        <Phone className="h-3.5 w-3.5" />
                                        <span>Hubungi Penjual / Petani</span>
                                    </a>
                                </CardFooter>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
