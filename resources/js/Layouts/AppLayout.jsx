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
        <div className="min-h-screen flex flex-col bg-texture-main text-zinc-100 antialiased selection:bg-red-800 selection:text-amber-300">
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
                    className="fixed bottom-6 right-6 z-40 p-2.5 rounded-lg bg-zinc-900/95 text-amber-400 border border-amber-500/50 shadow-2xl hover:bg-red-800 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                    <ArrowUp className="h-5 w-5" />
                </button>
            )}
        </div>
    );
}
