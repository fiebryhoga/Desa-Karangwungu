import React from 'react';
import { Link } from '@inertiajs/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Button({
    children,
    className = '',
    variant = 'default',
    size = 'default',
    href,
    type = 'button',
    disabled = false,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer rounded-lg';

    const variants = {
        default: 'bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm',
        secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700',
        outline: 'border border-zinc-300 bg-transparent hover:bg-zinc-100 text-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-zinc-200',
        ghost: 'hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800',
        
        // Merah (Crimson / Deep Red)
        red: 'bg-red-700 text-white hover:bg-red-800 dark:bg-red-700 dark:hover:bg-red-600 shadow-sm',
        accent: 'bg-red-700 text-white hover:bg-red-800 dark:bg-red-700 dark:hover:bg-red-600 shadow-sm',

        // Emas (Warm Gold / Amber)
        gold: 'bg-amber-500 text-zinc-950 font-semibold hover:bg-amber-400 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400 shadow-sm',
        
        // Outline Emas / Merah
        'outline-gold': 'border border-amber-500/70 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40',
        'outline-red': 'border border-red-600/70 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40',
    };

    const sizes = {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2 text-sm',
        lg: 'h-11 px-6 text-base font-semibold',
        icon: 'h-10 w-10 p-0',
    };

    const combinedClasses = cn(baseStyles, variants[variant] || variants.default, sizes[size], className);

    if (href) {
        return (
            <Link href={href} className={combinedClasses} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={combinedClasses}
            {...props}
        >
            {children}
        </button>
    );
}
