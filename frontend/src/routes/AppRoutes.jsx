import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Contact = lazy(() => import('../pages/Contact'));
const NotFound = lazy(() => import('../pages/NotFound'));

function RouteFallback() {
  return <div className="section-pad text-center text-muted-warm" aria-busy="true" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Suspense fallback={<RouteFallback />}><Home /></Suspense>} />
      <Route path="about" element={<Suspense fallback={<RouteFallback />}><About /></Suspense>} />
      <Route path="products" element={<Suspense fallback={<RouteFallback />}><Products /></Suspense>} />
      <Route path="products/:slug" element={<Suspense fallback={<RouteFallback />}><ProductDetails /></Suspense>} />
      <Route path="contact" element={<Suspense fallback={<RouteFallback />}><Contact /></Suspense>} />
      <Route path="404" element={<Suspense fallback={<RouteFallback />}><NotFound /></Suspense>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
