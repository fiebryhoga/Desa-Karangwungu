import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Alert({
    variant = 'info',
    title,
    children,
    className = '',
    onClose,
}) {
    const variants = {
        info: {
            container: 'bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-800',
            icon: <Info className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0" />,
        },
        success: {
            container: 'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800',
            icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
        },
        warning: {
            container: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800',
            icon: <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />,
        },
        error: {
            container: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/40 dark:text-red-200 dark:border-red-800',
            icon: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />,
        },
    };

    const currentVariant = variants[variant] || variants.info;

    return (
        <div
            className={cn(
                'relative w-full rounded-lg border p-4 flex items-start gap-3 text-sm transition-all',
                currentVariant.container,
                className
            )}
            role="alert"
        >
            {currentVariant.icon}
            <div className="flex-1">
                {title && <h5 className="font-semibold mb-1 text-sm tracking-normal leading-tight">{title}</h5>}
                <div className="text-xs md:text-sm leading-relaxed opacity-95">{children}</div>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex h-8 w-8 rounded-md hover:bg-black/5 dark:hover:bg-white/10 opacity-70 hover:opacity-100"
                    aria-label="Tutup"
                >
                    <span className="sr-only">Tutup</span>
                    &times;
                </button>
            )}
        </div>
    );
}
