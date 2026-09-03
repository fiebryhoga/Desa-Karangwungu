import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export default function AdminPageHeader({
    title,
    description,
    breadcrumbs = [],
    actions,
    className = '',
}) {
    return (
        <div className={`w-full pb-5 border-b border-zinc-200/80 dark:border-zinc-800/80 ${className}`}>
            {/* Optional Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                    {breadcrumbs.map((crumb, idx) => (
                        <React.Fragment key={idx}>
                            {idx > 0 && <ChevronRight className="h-3 w-3 text-zinc-400 dark:text-zinc-600 shrink-0" />}
                            {crumb.href ? (
                                <Link
                                    href={crumb.href}
                                    className="hover:text-red-600 dark:hover:text-amber-400 transition-colors font-medium"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{crumb.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
            )}

            {/* Title, Description & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl">
                            {description}
                        </p>
                    )}
                </div>

                {/* Right Action Buttons */}
                {actions && (
                    <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}
