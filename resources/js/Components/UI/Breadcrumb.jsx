import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="py-3 px-4 md:px-0 text-sm text-zinc-500 dark:text-zinc-400">
            <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Beranda</span>
                    </Link>
                </li>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="inline-flex items-center gap-1.5">
                            <ChevronRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600 shrink-0" />
                            {isLast || !item.url ? (
                                <span className="font-medium text-zinc-900 dark:text-zinc-100 max-w-[200px] md:max-w-none truncate" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.url}
                                    className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
