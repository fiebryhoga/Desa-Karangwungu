import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import SeoHead from '../../Components/SEO/SeoHead';
import Breadcrumb from '../../Components/UI/Breadcrumb';
import Badge from '../../Components/UI/Badge';
import Button from '../../Components/UI/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../Components/UI/Card';
import { formatDateIndo } from '../../Utils/format';
import { Calendar, Eye, User, Share2, Check, ArrowLeft, ChevronRight, MessageSquare } from 'lucide-react';

export default function NewsShow({ post, relatedPosts = [] }) {
    const { props } = usePage();
    const [copied, setCopied] = useState(false);
    const appUrl = props.app_url || window?.location?.origin || 'https://karangwungu-lamongan.desa.id';
    const postUrl = `${appUrl}/berita/${post.slug}`;

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const newsSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'headline': post.title,
        'image': [
            post.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80'
        ],
        'datePublished': post.published_at,
        'dateModified': post.updated_at,
        'author': [{
            '@type': 'Organization',
            'name': post.author || 'Pemerintah Desa Karangwungu',
            'url': appUrl,
        }],
        'publisher': {
            '@type': 'GovernmentOrganization',
            'name': 'Pemerintah Desa Karangwungu',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80',
            }
        },
        'description': post.excerpt,
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': postUrl,
        }
    };

    return (
        <AppLayout>
            <SeoHead
                title={post.title}
                description={post.excerpt}
                image={post.image}
                type="article"
                schemaData={newsSchema}
                breadcrumbs={[
                    { label: 'Berita & Informasi', url: '/berita' },
                    { label: post.title, url: `/berita/${post.slug}` },
                ]}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb
                    items={[
                        { label: 'Berita & Informasi', url: '/berita' },
                        { label: post.title, url: `/berita/${post.slug}` },
                    ]}
                />

                {/* Article Header */}
                <article className="my-6 space-y-4">
                    <div className="flex items-center gap-2">
                        <Badge variant="gold" className="text-xs">
                            {post.category}
                        </Badge>
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                        {post.title}
                    </h1>

                    {/* Metadata bar */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 py-2.5 border-y border-zinc-800">
                        <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                            <User className="h-3.5 w-3.5 text-amber-400" />
                            {post.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-amber-400" />
                            {formatDateIndo(post.published_at)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Eye className="h-3.5 w-3.5 text-amber-400" />
                            Dibaca {post.views} kali
                        </span>
                    </div>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="my-6 rounded-lg overflow-hidden border border-zinc-800 shadow-xl">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full max-h-[480px] object-cover"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <div
                        className="text-zinc-200 text-sm sm:text-base leading-relaxed space-y-4 my-8"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Social Share Buttons */}
                    <div className="p-4 rounded-lg bg-zinc-900/90 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 my-8 shadow-md">
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                            <Share2 className="h-4 w-4" />
                            <span>Bagikan Informasi Ini:</span>
                        </span>

                        <div className="flex items-center gap-2">
                            <a
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-md text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                            >
                                WhatsApp
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-md text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                            >
                                Facebook
                            </a>
                            <button
                                onClick={handleCopy}
                                className="px-3 py-1.5 rounded-md text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                                {copied ? <Check className="h-3.5 w-3.5 text-amber-400" /> : null}
                                <span>{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
                            </button>
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                    <div className="my-12 pt-8 border-t border-zinc-800 space-y-6">
                        <h3 className="text-xl font-bold text-white">
                            Berita Terkait Lainnya
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {relatedPosts.map((item) => (
                                <Card key={item.id} className="overflow-hidden flex flex-col hover:border-amber-500/50 transition-all">
                                    <div className="h-32 w-full overflow-hidden bg-zinc-950">
                                        <img
                                            src={item.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80'}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <CardHeader className="p-3.5 flex-1">
                                        <span className="text-[10px] text-zinc-400 block mb-1">
                                            {formatDateIndo(item.published_at)}
                                        </span>
                                        <CardTitle className="text-xs font-bold line-clamp-2">
                                            <Link href={`/berita/${item.slug}`} className="hover:text-amber-400">
                                                {item.title}
                                            </Link>
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
