import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetails'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageFallback() {
  return <div className="section-pad text-center text-muted-warm" aria-busy="true" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Suspense fallback={<PageFallback />}><HomePage /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<PageFallback />}><AboutPage /></Suspense>} />
        <Route path="products" element={<Suspense fallback={<PageFallback />}><ProductsPage /></Suspense>} />
        <Route path="products/:slug" element={<Suspense fallback={<PageFallback />}><ProductDetailsPage /></Suspense>} />
        <Route path="contact" element={<Suspense fallback={<PageFallback />}><ContactPage /></Suspense>} />
        <Route path="404" element={<Suspense fallback={<PageFallback />}><NotFound /></Suspense>} />
        <Route path="*" element={<Suspense fallback={<PageFallback />}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  );
}
