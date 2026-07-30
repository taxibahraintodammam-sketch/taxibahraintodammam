'use client';

import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function AdminShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname?.startsWith('/admin/login');

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('admin-sidebar-collapsed');
        if (saved === 'true') setIsCollapsed(true);
        setMounted(true);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(prev => {
            const next = !prev;
            localStorage.setItem('admin-sidebar-collapsed', String(next));
            return next;
        });
    };

    const darkPages = [
        '/admin/dashboard',
        '/admin/locations',
        '/admin/fleet',
        '/admin/support',
        '/admin/settings',
        '/admin/reports',
        '/admin/pricing',
        '/admin/notifications',
        '/admin/whatsapp-templates'
    ];
    const isDarkPage = darkPages.some(page => pathname === page || pathname?.startsWith(page + '/'));

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-gray-50">
                {children}
            </div>
        );
    }

    return (
        <div className={cn(
            "flex min-h-screen print:bg-white transition-colors duration-200",
            isDarkPage ? "bg-neutral-950 text-white" : "bg-gray-50 text-gray-900"
        )}>
            <AdminSidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
            <main className={cn(
                "flex-1 transition-all duration-300 print:ml-0",
                mounted
                    ? isCollapsed ? "md:ml-[64px]" : "md:ml-64"
                    : "md:ml-64"
            )}>
                <div className="p-3 md:p-6 pt-20 md:pt-6 min-h-screen print:p-0 print:pt-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
