import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { ICON_REGISTRY } from '@/Utils/iconRegistry';

/**
 * IconPickerModal
 * Modal pemilihan ikon visual dari katalog ICON_REGISTRY lengkap dengan
 * pencarian real-time dan filter kategori berbasis tab/pill.
 */
export default function IconPickerModal({
    isOpen,
    onClose,
    onSelect,
    selectedIcon,
    title = 'Pilih Icon Visual',
    subtitle = 'Pilih icon dari katalog referensi yang tersedia atau gunakan kotak pencarian.',
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Extract unique categories from registry
    const categories = useMemo(() => {
        const set = new Set(Object.values(ICON_REGISTRY).map((item) => item.category).filter(Boolean));
        return ['all', ...Array.from(set)];
    }, []);

    // Filtered icon entries
    const filteredEntries = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        return Object.entries(ICON_REGISTRY).filter(([key, item]) => {
            const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
            const matchSearch =
                !term ||
                key.toLowerCase().includes(term) ||
                item.label.toLowerCase().includes(term) ||
                (item.category && item.category.toLowerCase().includes(term));

            return matchCategory && matchSearch;
        });
    }, [searchTerm, selectedCategory]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden my-auto">
                {/* Header */}
                <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/80 dark:bg-zinc-900/80">
                    <div>
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-red-600 dark:text-amber-400" />
                            <span>{title}</span>
                        </h3>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {subtitle}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        title="Tutup"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Search & Category Filter */}
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 space-y-3 bg-white dark:bg-zinc-900">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari icon (misal: padi, ikan, toko, gotong royong, pohon...)"
                            className="w-full pl-9 pr-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
                            autoFocus
                        />
                    </div>

                    {/* Category Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-red-600 text-white font-bold shadow-xs'
                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                }`}
                            >
                                {cat === 'all' ? 'Semua Kategori' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Icon Grid */}
                <div className="p-4 overflow-y-auto max-h-[50vh]">
                    {filteredEntries.length === 0 ? (
                        <div className="p-10 text-center text-xs text-zinc-400">
                            Tidak ditemukan icon yang cocok dengan pencarian "{searchTerm}".
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {filteredEntries.map(([iconKey, item]) => {
                                const Comp = item.icon;
                                const isCurrent = selectedIcon === iconKey;

                                return (
                                    <button
                                        key={iconKey}
                                        type="button"
                                        onClick={() => {
                                            onSelect(iconKey);
                                            onClose();
                                        }}
                                        className={`p-3 rounded-xl border text-left flex flex-col items-center gap-2 transition-all cursor-pointer group ${
                                            isCurrent
                                                ? 'bg-red-50 border-red-500 dark:bg-red-950/40 dark:border-red-500 shadow-xs ring-1 ring-red-500/50'
                                                : 'bg-white dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800/80 hover:border-red-300 dark:hover:border-red-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40'
                                        }`}
                                    >
                                        <div
                                            className={`p-2.5 rounded-lg transition-colors ${
                                                isCurrent
                                                    ? 'bg-red-600 text-white shadow-xs'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-red-600 group-hover:text-white'
                                            }`}
                                        >
                                            <Comp className="h-5 w-5" />
                                        </div>
                                        <div className="text-center w-full min-w-0">
                                            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200 block truncate">
                                                {iconKey}
                                            </span>
                                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate mt-0.5">
                                                {item.label}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
}
