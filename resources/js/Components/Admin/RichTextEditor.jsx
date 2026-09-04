import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Heading2,
    Heading3,
    Quote,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Minus,
    Undo2,
    Redo2,
    Eraser,
    Code2,
    Eye,
} from 'lucide-react';

export default function RichTextEditor({
    value = '',
    onChange,
    placeholder = 'Tuliskan isi warta berita di sini...',
    error = null,
}) {
    const editorRef = useRef(null);
    const isInternalChangeRef = useRef(false);
    const [viewMode, setViewMode] = useState('visual'); // 'visual' or 'html'
    const [stats, setStats] = useState({ words: 0, chars: 0 });

    // Calculate word and character count from text
    const updateStats = useCallback((html) => {
        if (!html) {
            setStats({ words: 0, chars: 0 });
            return;
        }
        const temp = document.createElement('div');
        temp.innerHTML = html;
        const text = temp.textContent || temp.innerText || '';
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        setStats({ words, chars: text.length });
    }, []);

    // Sync initial and external value to editor innerHTML
    useEffect(() => {
        if (!editorRef.current) return;
        if (isInternalChangeRef.current) {
            isInternalChangeRef.current = false;
            return;
        }
        const currentHtml = editorRef.current.innerHTML;
        const nextHtml = value || '';
        if (currentHtml !== nextHtml) {
            editorRef.current.innerHTML = nextHtml;
            updateStats(nextHtml);
        }
    }, [value, updateStats]);

    const handleInput = () => {
        if (!editorRef.current) return;
        isInternalChangeRef.current = true;
        const html = editorRef.current.innerHTML;
        updateStats(html);
        if (onChange) {
            onChange(html);
        }
    };

    const exec = (command, val = null) => {
        if (!editorRef.current) return;
        editorRef.current.focus();
        document.execCommand(command, false, val);
        handleInput();
    };

    // Format block helper for headings and paragraph
    const formatBlock = (tag) => {
        if (!editorRef.current) return;
        editorRef.current.focus();
        // Test current block
        document.execCommand('formatBlock', false, tag);
        handleInput();
    };

    return (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs focus-within:border-red-500 dark:focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-red-500/10 dark:focus-within:ring-amber-500/10 transition-all">
            {/* Toolbar Header */}
            <div className="flex flex-wrap items-center justify-between gap-1 p-2 bg-zinc-50 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-700">
                <div className="flex flex-wrap items-center gap-1">
                    {/* Headings */}
                    <div className="flex items-center rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 p-0.5">
                        <button
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                formatBlock('<p>');
                            }}
                            title="Paragraf Normal"
                            className="px-2 py-1 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            P
                        </button>
                        <button
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                formatBlock('<h2>');
                            }}
                            title="Sub-judul (H2)"
                            className="p-1 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            <Heading2 className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                formatBlock('<h3>');
                            }}
                            title="Sub-subjudul (H3)"
                            className="p-1 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            <Heading3 className="h-4 w-4" />
                        </button>
                    </div>

                    <span className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-0.5" />

                    {/* Inline Style */}
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('bold');
                        }}
                        title="Tebal (Ctrl+B)"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <Bold className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('italic');
                        }}
                        title="Miring (Ctrl+I)"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <Italic className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('underline');
                        }}
                        title="Garis Bawah (Ctrl+U)"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <Underline className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('strikeThrough');
                        }}
                        title="Coret Teks"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </button>

                    <span className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-0.5" />

                    {/* Lists */}
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('insertUnorderedList');
                        }}
                        title="Daftar Poin (Bulleted List)"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <List className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('insertOrderedList');
                        }}
                        title="Daftar Angka (Numbered List)"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            formatBlock('<blockquote>');
                        }}
                        title="Kutipan (Blockquote)"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <Quote className="h-4 w-4" />
                    </button>

                    <span className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-0.5" />

                    {/* Alignment */}
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('justifyLeft');
                        }}
                        title="Rata Kiri"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <AlignLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('justifyCenter');
                        }}
                        title="Rata Tengah"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <AlignCenter className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('justifyRight');
                        }}
                        title="Rata Kanan"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <AlignRight className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('justifyFull');
                        }}
                        title="Rata Kanan Kiri (Justify)"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <AlignJustify className="h-4 w-4" />
                    </button>

                    <span className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-0.5" />

                    {/* Line & Clear */}
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('insertHorizontalRule');
                        }}
                        title="Garis Pemisah (Horizontal Line)"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('removeFormat');
                        }}
                        title="Hapus Format Teks"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <Eraser className="h-4 w-4" />
                    </button>

                    <span className="h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-0.5" />

                    {/* Undo/Redo */}
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('undo');
                        }}
                        title="Urungkan (Ctrl+Z)"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <Undo2 className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            exec('redo');
                        }}
                        title="Ulangi (Ctrl+Y)"
                        className="p-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                        <Redo2 className="h-4 w-4" />
                    </button>
                </div>

                {/* View Mode Toggle: Visual vs Raw HTML */}
                <div className="flex items-center gap-1 border-t sm:border-t-0 pt-1 sm:pt-0 w-full sm:w-auto justify-end">
                    <button
                        type="button"
                        onClick={() => {
                            if (viewMode === 'html' && editorRef.current) {
                                // When switching back to visual, make sure DOM has updated value
                                editorRef.current.innerHTML = value || '';
                            }
                            setViewMode(viewMode === 'visual' ? 'html' : 'visual');
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                            viewMode === 'html'
                                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                                : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100'
                        }`}
                        title={viewMode === 'visual' ? 'Buka kode HTML' : 'Kembali ke editor visual'}
                    >
                        {viewMode === 'visual' ? (
                            <>
                                <Code2 className="h-3.5 w-3.5" />
                                <span>Kode HTML</span>
                            </>
                        ) : (
                            <>
                                <Eye className="h-3.5 w-3.5" />
                                <span>Mode Visual</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Editor Workspace */}
            <div className="relative">
                {viewMode === 'visual' ? (
                    <div
                        ref={editorRef}
                        contentEditable
                        onInput={handleInput}
                        onBlur={handleInput}
                        data-placeholder={placeholder}
                        className="min-h-[360px] p-4 sm:p-5 text-xs sm:text-sm leading-relaxed text-zinc-900 dark:text-zinc-100 bg-transparent focus:outline-none 
                        empty:before:content-[attr(data-placeholder)] empty:before:text-zinc-400 empty:before:pointer-events-none empty:before:italic
                        [&>p]:mb-3 [&>p]:leading-relaxed
                        [&>h2]:text-base [&>h2]:sm:text-lg [&>h2]:font-extrabold [&>h2]:mt-5 [&>h2]:mb-2 [&>h2]:text-zinc-900 [&>h2]:dark:text-white
                        [&>h3]:text-sm [&>h3]:sm:text-base [&>h3]:font-bold [&>h3]:mt-4 [&>h3]:mb-1.5 [&>h3]:text-zinc-900 [&>h3]:dark:text-white
                        [&>blockquote]:border-l-4 [&>blockquote]:border-red-500 [&>blockquote]:dark:border-amber-500 [&>blockquote]:pl-3.5 [&>blockquote]:py-1.5 [&>blockquote]:italic [&>blockquote]:my-3 [&>blockquote]:bg-zinc-50 [&>blockquote]:dark:bg-zinc-800/60 [&>blockquote]:rounded-r-lg [&>blockquote]:text-zinc-700 [&>blockquote]:dark:text-zinc-300
                        [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ul]:my-2.5
                        [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>ol]:my-2.5
                        [&>hr]:my-4 [&>hr]:border-zinc-200 [&>hr]:dark:border-zinc-700"
                    />
                ) : (
                    <textarea
                        value={value}
                        onChange={(e) => {
                            if (onChange) onChange(e.target.value);
                            updateStats(e.target.value);
                        }}
                        rows={16}
                        placeholder="Ketik kode HTML naskah berita di sini..."
                        className="w-full p-4 text-xs font-mono leading-relaxed bg-zinc-950 text-emerald-400 placeholder-zinc-500 focus:outline-none resize-y border-none"
                    />
                )}
            </div>

            {/* Bottom Status Bar */}
            <div className="flex items-center justify-between px-3.5 py-2 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-50/80 dark:bg-zinc-800/40 border-t border-zinc-200 dark:border-zinc-700/80">
                <div className="flex items-center gap-3">
                    <span>
                        <strong>{stats.words}</strong> kata
                    </span>
                    <span>•</span>
                    <span>
                        <strong>{stats.chars}</strong> karakter
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-xs ${viewMode === 'visual' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                    <span className="text-[10px] uppercase tracking-wider font-bold">
                        {viewMode === 'visual' ? 'WYSIWYG Visual' : 'Editor HTML'}
                    </span>
                </div>
            </div>

            {error && (
                <div className="p-2.5 bg-red-500/10 border-t border-red-500/20 text-xs text-red-500 font-medium">
                    {error}
                </div>
            )}
        </div>
    );
}
