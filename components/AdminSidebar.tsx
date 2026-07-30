'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
    LayoutDashboard,
    CalendarDays,
    Car,
    Settings,
    LogOut,
    Menu,
    X,
    MapPin,
    FileText,
    Star,
    HelpCircle,
    Tag,
    Calendar,
    Users,
    DollarSign,
    BarChart2,
    MessageSquare,
    Bell,
    Inbox,
    ClipboardList,
    ChevronLeft,
    ChevronRight,
    UserCog,
    Mail,
    Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const menuItems = [
    { name: 'Dashboard',       href: '/admin/dashboard',           icon: LayoutDashboard },
    { name: 'Bookings',        href: '/admin/bookings',            icon: CalendarDays },
    { name: 'Calendar',        href: '/admin/calendar',            icon: Calendar },
    { name: 'Customers',       href: '/admin/customers',           icon: Users },
    { name: 'Email Client',    href: '/admin/email-client',        icon: Mail },
    { name: 'B2B Leads',       href: '/admin/b2b-leads',           icon: Building2 },
    { name: 'Drivers',         href: '/admin/drivers',             icon: UserCog },
    { name: 'Reports',         href: '/admin/reports',             icon: BarChart2 },
    { name: 'Pricing',         href: '/admin/pricing',             icon: DollarSign },
    { name: 'WA Templates',    href: '/admin/whatsapp-templates',  icon: MessageSquare },
    { name: 'Notifications',   href: '/admin/notifications',       icon: Bell },
    { name: 'Promo Codes',     href: '/admin/promo-codes',         icon: Tag },
    { name: 'Invoice Creator', href: '/admin/invoice-generator',   icon: FileText },
    { name: 'Reviews',         href: '/admin/reviews',             icon: Star },
    { name: 'Questions',       href: '/admin/questions',           icon: HelpCircle },
    { name: 'Comments',        href: '/admin/comments',            icon: MessageSquare },
    { name: 'Blogs',           href: '/admin/blogs',               icon: FileText },
    { name: 'Support',         href: '/admin/support',             icon: Inbox },
    { name: 'Audit Log',       href: '/admin/audit-log',           icon: ClipboardList },
    { name: 'Fleet',           href: '/admin/fleet',               icon: Car },
    { name: 'Locations',       href: '/admin/locations',           icon: MapPin },
    { name: 'Settings',        href: '/admin/settings',            icon: Settings },
];

interface AdminSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setIsAuthenticated(!!session);
            });
            return () => subscription.unsubscribe();
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        router.push('/admin/login');
    };

    if (isAuthenticated === false && pathname !== '/admin/login') return null;

    return (
        <div className="print:hidden">
            {/* Mobile toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    className="bg-white border-gray-200 text-gray-900 shadow-sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </Button>
            </div>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
                isCollapsed ? "w-[64px]" : "w-64",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {/* Logo + collapse toggle */}
                <div className={cn(
                    "h-16 flex items-center border-b border-gray-200 shrink-0",
                    isCollapsed ? "justify-center px-2" : "justify-between px-4"
                )}>
                    {!isCollapsed ? (
                        <Link href="/admin/dashboard/" className="flex items-center gap-2">
                            <div className="bg-primary/20 p-1.5 rounded-lg">
                                <Car className="h-5 w-5 text-primary" />
                            </div>
                            <span className="text-base font-bold text-gray-900 whitespace-nowrap">Admin<span className="text-primary">Panel</span></span>
                        </Link>
                    ) : (
                        <Link href="/admin/dashboard/" title="Dashboard">
                            <div className="bg-primary/20 p-1.5 rounded-lg">
                                <Car className="h-5 w-5 text-primary" />
                            </div>
                        </Link>
                    )}
                    <button
                        onClick={onToggle}
                        className="hidden md:flex h-7 w-7 items-center justify-center rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors shrink-0"
                        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={isCollapsed ? item.name : undefined}
                                className={cn(
                                    "flex items-center rounded-xl transition-all duration-150 group",
                                    isCollapsed
                                        ? "justify-center px-0 py-2.5 mx-1"
                                        : "gap-3 px-3 py-2.5",
                                    isActive
                                        ? "bg-primary text-black font-semibold shadow-sm"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Icon className={cn(
                                    "w-4 h-4 shrink-0",
                                    isActive ? "text-black" : "text-gray-400 group-hover:text-gray-700"
                                )} />
                                {!isCollapsed && (
                                    <span className="text-sm truncate">{item.name}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-2 border-t border-gray-200 shrink-0">
                    <button
                        onClick={handleLogout}
                        title={isCollapsed ? 'Sign Out' : undefined}
                        className={cn(
                            "w-full flex items-center rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all py-2.5",
                            isCollapsed ? "justify-center px-0" : "gap-2.5 px-3"
                        )}
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}
