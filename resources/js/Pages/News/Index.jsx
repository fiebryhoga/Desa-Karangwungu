import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Badge from '../../Components/UI/Badge';
import Button from '../../Components/UI/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../Components/UI/Card';
import { formatDateIndo } from '../../Utils/format';
import { Search, Calendar, Eye, ChevronRight, ArrowRight, User } from 'lucide-react';

export default function NewsIndex({
    posts = { data: [] },
    filters = {},
    categories = [],
}) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/berita', {
            search: searchTerm,
            category: filters.category !== 'Semua' ? filters.category : undefined,
        }, { preserveState: true });
    };

    const handleCategoryFilter = (cat) => {
        router.get('/berita', {
            search: searchTerm || undefined,
            category: cat === 'Semua' ? undefined : cat,
        }, { preserveState: true });
    };

    return (
        <AppLayout>
            <SeoHead
                title="Warta Berita & Pengumuman Desa"
                description="Kabar terkini seputar kegiatan pemerintahan, pembangunan, pertanian, panen raya, dan pengumuman resmi Pemerintah Desa Karangwungu, Karanggeneng, Lamongan."
                keywords="Berita Desa Karangwungu, Pengumuman Desa Karangwungu, Agenda Karangwungu Lamongan"
                breadcrumbs={[{ label: 'Berita & Informasi', url: '/berita' }]}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={[{ label: 'Berita & Informasi', url: '/berita' }]} />

                {/* Header Title */}
                <div className="my-6">
                    <Badge variant="gold">Publikasi Resmi</Badge>
                    <h1 className="text-3xl font-extrabold text-white mt-2">
                        Warta Desa & Pengumuman Resmi
                    </h1>
                    <p className="text-base text-zinc-300 mt-1 max-w-3xl leading-relaxed">
                        Pusat rilis berita, agenda musyawarah desa, program bantuan sosial, dan informasi publik Desa Karangwungu.
                    </p>
                </div>

                {/* Search & Category Filter */}
                <div className="my-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Category Pills */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryFilter(cat)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    filters.category === cat || (cat === 'Semua' && !filters.category)
                                        ? 'bg-amber-500 text-zinc-950 shadow-md'
                                        : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="w-full md:w-80 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-amber-400" />
                            <input
                                type="text"
                                placeholder="Cari artikel berita..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-700 bg-zinc-950 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500"
                            />
                        </div>
                        <Button type="submit" variant="red" size="sm" className="shrink-0">
                            Cari
                        </Button>
                    </form>
                </div>

                {/* Posts Grid */}
                {posts.data.length === 0 ? (
                    <Card className="my-8 border-dashed border-zinc-800">
                        <CardContent className="p-8 text-center space-y-2">
                            <p className="text-base font-semibold text-zinc-300">
                                Tidak ada artikel berita ditemukan.
                            </p>
                            <p className="text-xs text-zinc-500">
                                Silakan gunakan kata kunci pencarian lain atau pilih kategori lain.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                        {posts.data.map((post) => (
                            <Card key={post.id} className="overflow-hidden flex flex-col group hover:border-amber-500/50 transition-all hover:shadow-xl">
                                <div className="h-48 w-full overflow-hidden bg-zinc-950 relative">
                                    <img
                                        src={post.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <Badge variant="default" className="bg-black/90 backdrop-blur-sm text-amber-300 border border-amber-500/30 text-[11px]">
                                            {post.category}
                                        </Badge>
                                    </div>
                                </div>

                                <CardHeader className="p-5 pb-2 flex-1">
                                    <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5 text-amber-400" />
                                            {formatDateIndo(post.published_at)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-3.5 w-3.5" />
                                            {post.views}x
                                        </span>
                                    </div>
                                    <CardTitle className="text-base font-bold line-clamp-2 group-hover:text-amber-400 transition-colors">
                                        <Link href={`/berita/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription className="text-xs line-clamp-3 mt-2 leading-relaxed text-zinc-400">
                                        {post.excerpt}
                                    </CardDescription>
                                </CardHeader>

                                <CardFooter className="p-5 pt-2">
                                    <Link
                                        href={`/berita/${post.slug}`}
                                        className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors"
                                    >
                                        <span>Baca Selengkapnya</span>
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
