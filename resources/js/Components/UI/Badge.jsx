import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Badge({
    children,
    className = '',
    variant = 'default',
    ...props
}) {
    const baseStyles = 'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400';

    const variants = {
        default: 'bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900',
        secondary: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700',
        outline: 'border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200',
        
        // Emas / Gold
        gold: 'bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-800',
        
        // Merah / Red
        red: 'bg-red-100 text-red-900 dark:bg-red-950/70 dark:text-red-300 border border-red-300 dark:border-red-800',
        danger: 'bg-red-100 text-red-900 dark:bg-red-950/70 dark:text-red-300 border border-red-300 dark:border-red-800',

        success: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
        warning: 'bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300 dark:border-amber-800',
        info: 'bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800',
    };

    return (
        <span className={cn(baseStyles, variants[variant] || variants.default, className)} {...props}>
            {children}
        </span>
    );
}
