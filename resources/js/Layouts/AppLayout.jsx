import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '../Components/UI/Navbar';
import Footer from '../Components/UI/Footer';
import Alert from '../Components/UI/Alert';
import { ArrowUp } from 'lucide-react';

export default function AppLayout({ children }) {
    const { flash } = usePage().props;
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [alertDismissed, setAlertDismissed] = useState(false);

    useEffect(() => {
        setAlertDismissed(false);
    }, [flash]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-texture-main text-zinc-900 dark:text-zinc-100 antialiased selection:bg-red-800 selection:text-amber-300 pb-16 lg:pb-0">
            {/* Accessibility: Skip to Main Content */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-red-800 focus:text-white focus:rounded-lg focus:shadow-lg text-xs font-semibold"
            >
                Lewati ke konten utama
            </a>

            {/* Header / Navbar */}
            <Navbar />

            {/* Global Flash Alerts */}
            {flash?.success && !alertDismissed && (
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
                    <Alert
                        variant="success"
                        title="Berhasil"
                        onClose={() => setAlertDismissed(true)}
                    >
                        {flash.success}
                    </Alert>
                </div>
            )}

            {flash?.error && !alertDismissed && (
                <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
                    <Alert
                        variant="error"
                        title="Perhatian"
                        onClose={() => setAlertDismissed(true)}
                    >
                        {flash.error}
                    </Alert>
                </div>
            )}

            {/* Main Content Area */}
            <main id="main-content" className="flex-1 w-full focus:outline-none">
                {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    aria-label="Kembali ke atas"
                    className="fixed bottom-20 lg:bottom-6 right-5 lg:right-6 z-30 h-11 w-11 rounded-2xl bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800/90 shadow-lg hover:shadow-red-600/20 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white hover:border-red-500 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
                >
                    <ArrowUp className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            )}
        </div>
    );
}
