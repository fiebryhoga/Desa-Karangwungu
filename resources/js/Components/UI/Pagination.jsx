import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links = [], meta = {} }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            {/* Results Counter */}
            {meta && meta.total !== undefined && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Menampilkan <span className="font-semibold text-zinc-900 dark:text-white">{meta.from || 0}</span> -{' '}
                    <span className="font-semibold text-zinc-900 dark:text-white">{meta.to || 0}</span> dari{' '}
                    <span className="font-semibold text-zinc-900 dark:text-white">{meta.total}</span> artikel
                </p>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
                {links.map((link, idx) => {
                    const isPrev = idx === 0 || link.label.toLowerCase().includes('prev') || link.label.includes('«') || link.label.includes('&laquo;');
                    const isNext = idx === links.length - 1 || link.label.toLowerCase().includes('next') || link.label.includes('»') || link.label.includes('&raquo;');
                    const isPageNumber = !isPrev && !isNext;

                    if (!link.url) {
                        return (
                            <span
                                key={idx}
                                className={`h-9 rounded-xl flex items-center justify-center text-xs font-medium text-zinc-400 dark:text-zinc-600 bg-zinc-100/60 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 cursor-not-allowed select-none ${
                                    isPageNumber ? 'w-9' : 'px-3.5 gap-1.5'
                                }`}
                            >
                                {isPrev ? (
                                    <>
                                        <ChevronLeft className="h-3.5 w-3.5" />
                                        <span className="hidden sm:inline">Sebelumnya</span>
                                    </>
                                ) : isNext ? (
                                    <>
                                        <span className="hidden sm:inline">Berikutnya</span>
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </>
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={idx}
                            href={link.url}
                            preserveScroll
                            preserveState
                            className={`h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                                isPageNumber ? 'w-9' : 'px-3.5 gap-1.5'
                            } ${
                                link.active
                                    ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md shadow-red-600/30 scale-105 border border-transparent'
                                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
                            }`}
                        >
                            {isPrev ? (
                                <>
                                    <ChevronLeft className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Sebelumnya</span>
                                </>
                            ) : isNext ? (
                                <>
                                    <span className="hidden sm:inline">Berikutnya</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </>
                            ) : (
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
