import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function Card({ className = '', children, ...props }) {
    return (
        <div
            className={cn(
                'rounded-lg border border-zinc-800/80 bg-zinc-900/85 backdrop-blur-xs text-zinc-100 shadow-md transition-all duration-200 hover:border-amber-500/40',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className = '', children, ...props }) {
    return (
        <div className={cn('flex flex-col space-y-1.5 p-5 md:p-6', className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ className = '', children, ...props }) {
    return (
        <h3 className={cn('text-lg font-bold leading-tight tracking-normal text-white', className)} {...props}>
            {children}
        </h3>
    );
}

export function CardDescription({ className = '', children, ...props }) {
    return (
        <p className={cn('text-sm text-zinc-400 leading-relaxed', className)} {...props}>
            {children}
        </p>
    );
}

export function CardContent({ className = '', children, ...props }) {
    return (
        <div className={cn('p-5 pt-0 md:p-6 md:pt-0', className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ className = '', children, ...props }) {
    return (
        <div className={cn('flex items-center p-5 pt-0 md:p-6 md:pt-0 border-t border-zinc-800/60 mt-auto', className)} {...props}>
            {children}
        </div>
    );
}
