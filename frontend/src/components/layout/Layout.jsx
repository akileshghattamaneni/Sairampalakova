import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import OfferBanner from './OfferBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import MobileBottomBar from './MobileBottomBar';

const StickyCta = lazy(() => import('./StickyCta'));

export default function Layout() {
  const { pathname, hash } = useLocation();

  const bodyClass =
    pathname === '/' || pathname === ''
      ? 'page-home'
      : pathname.startsWith('/about')
        ? 'page-about'
        : pathname.startsWith('/products')
          ? 'page-products'
          : pathname.startsWith('/contact')
            ? 'page-contact'
            : '';

  useEffect(() => {
    document.body.className = bodyClass;
  }, [bodyClass]);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return (
    <>
      <OfferBanner />
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBottomBar />
      {bodyClass === 'page-home' && (
        <Suspense fallback={null}>
          <StickyCta />
        </Suspense>
      )}
    </>
  );
}
