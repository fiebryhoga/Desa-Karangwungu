import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * PageHeader Component
 * 
 * Reusable dynamic geometric red-gold faceted header banner with
 * traditional batik silhouette, landscape backdrop, and customizable typography/action buttons.
 */
export default function PageHeader({
    badge = 'Pemerintah Desa Karangwungu',
    title = '',
    subtitle = '',
    actions = [],
    bgImage = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80',
    className = '',
    children,
}) {
    return (
        <div
            className={`relative rounded-2xl overflow-hidden shadow-xl border border-red-500/40 bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white ${className}`}
        >
            {/* 1. Subtle Background Landscape Photo */}
            {bgImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `url('${bgImage}')`,
                    }}
                />
            )}

            {/* 2. Geometric Layered Chevron / Polygon Facets */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Large Left Chevron Shade */}
                <div className="absolute -left-20 top-0 bottom-0 w-1/2 bg-gradient-to-r from-red-950/60 via-red-900/40 to-transparent transform -skew-x-12" />

                {/* Dynamic Center Chevron Waves SVG */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-30"
                    viewBox="0 0 1200 400"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M-100 0 L350 200 L-100 400 Z"
                        fill="url(#headerFacet1)"
                        opacity="0.7"
                    />
                    <path
                        d="M100 0 L600 200 L100 400 Z"
                        fill="url(#headerFacet2)"
                        opacity="0.5"
                    />
                    <path
                        d="M600 0 L1100 200 L600 400 Z"
                        fill="url(#headerFacet1)"
                        opacity="0.6"
                    />
                    <path
                        d="M850 0 L1350 200 L850 400 Z"
                        fill="url(#headerFacet3)"
                        opacity="0.7"
                    />
                    <defs>
                        <linearGradient id="headerFacet1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="headerFacet2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#991b1b" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="headerFacet3" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#450a0a" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Subtle Traditional Batik Silhouette */}
                <div
                    className="absolute inset-0 opacity-[0.14] bg-repeat pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60 Q 30 30, 60 60 T 120 60 M0 0 Q 30 -30, 60 0 T 120 0 M0 120 Q 30 90, 60 120 T 120 120 M-30 30 L 30 90 M30 -30 L 90 30 M90 -30 L 150 30 M-30 90 L 30 150 M30 90 L 90 150 M90 90 L 150 150' stroke='%23fde047' stroke-width='2' fill='none' stroke-linecap='round' stroke-dasharray='1 4'/%3E%3Cpath d='M12 48 Q 30 24, 48 48 Q 66 72, 84 48 Q 102 24, 120 48' stroke='%23fde047' stroke-width='1.8' fill='none'/%3E%3Ccircle cx='30' cy='30' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='90' r='4' fill='%23fde047'/%3E%3Ccircle cx='90' cy='30' r='2.5' fill='%23fde047'/%3E%3Ccircle cx='30' cy='90' r='2.5' fill='%23fde047'/%3E%3C/svg%3E")`,
                        backgroundSize: '90px 90px',
                    }}
                />
            </div>

            {/* 3. Centered Editorial Content */}
            <div className="relative z-10 py-4.5 sm:py-5 lg:py-6 px-4 sm:px-6 max-w-2xl mx-auto text-center space-y-2 sm:space-y-2.5">
                {badge && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold text-amber-300 tracking-wide shadow-xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span>{badge}</span>
                    </div>
                )}

                {title && (
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                        {title}
                    </h1>
                )}

                {subtitle && (
                    <p className="text-xs sm:text-[13px] font-semibold text-red-100/90 max-w-lg mx-auto leading-snug">
                        {subtitle}
                    </p>
                )}

                {/* Actions / Nav Buttons */}
                {Array.isArray(actions) && actions.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
                        {actions.map((act, index) => {
                            const IconComponent = act.icon;
                            const isAmber = act.variant === 'primary' || act.variant === 'amber';
                            return (
                                <Link
                                    key={index}
                                    href={act.href}
                                    className={`px-3 py-1 rounded-lg text-[11px] font-bold backdrop-blur-md transition-all inline-flex items-center gap-1.5 shadow-xs ${
                                        isAmber
                                            ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black'
                                            : 'bg-black/30 hover:bg-black/50 text-white border border-white/20 hover:border-amber-400'
                                    }`}
                                >
                                    {IconComponent && (
                                        <IconComponent
                                            className={`h-3.5 w-3.5 ${
                                                isAmber ? 'text-zinc-950' : 'text-amber-300'
                                            }`}
                                        />
                                    )}
                                    <span>{act.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Custom Content slot if provided */}
                {children}
            </div>
        </div>
    );
}
