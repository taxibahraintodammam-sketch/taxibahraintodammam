'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MobileStickyWhatsApp from '@/components/MobileStickyWhatsApp';
import JsonLdBreadcrumb from '@/components/JsonLdBreadcrumb';
import JsonLdService from '@/components/JsonLdService';
import JsonLdLocalBusiness from '@/components/JsonLdLocalBusiness';
import JsonLdOrganization from '@/components/JsonLdOrganization';
import JsonLdWebSite from '@/components/JsonLdWebSite';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {/* Only show Navbar, Footer, and other components on non-admin routes */}
      {!isAdminRoute && (
        <>
          <Navbar />
          <JsonLdBreadcrumb />
          <JsonLdService />
          <JsonLdLocalBusiness />
          <JsonLdOrganization />
          <JsonLdWebSite />
          <FloatingWhatsApp />
          <MobileStickyWhatsApp />
        </>
      )}

      <main className={!isAdminRoute ? 'pt-[136px]' : ''}>
        {!isAdminRoute && pathname !== '/' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <Breadcrumbs />
          </div>
        )}
        {children}
      </main>

      {!isAdminRoute && (
        <>
          <Footer />
        </>
      )}
    </>
  );
}
