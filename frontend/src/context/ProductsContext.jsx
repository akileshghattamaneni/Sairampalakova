import { createContext, useContext, useMemo, useState } from 'react';
import productsData from '../data/products.json';
import { asset } from '../config/site';

const FALLBACK = [
  { id: 1, slug: 'sweetless-kova', name: 'Sweetless Kova', category: 'kova', description: 'Pure buffalo milk kova without added sugar.', price: 480, image: asset('assets/images/sweetless_palakova.jpg') },
  { id: 2, slug: 'sweet-kova', name: 'Sweet Kova', category: 'kova', description: 'Classic sweet PalaKova slow-cooked on kattela poyyi.', price: 520, image: asset('assets/images/sweet_kova.jpg') },
  { id: 3, slug: 'ginni-kova', name: 'Ginni Kova', category: 'kova', description: 'Hand-shaped Ginni Kova — melt-in-mouth festive favourite.', price: 560, image: asset('assets/images/ginni-kova.jpg') },
];

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products] = useState(() => productsData.map((p) => ({ ...p, image: asset(p.image) })));
  const [loading] = useState(false);

  const value = useMemo(() => ({ products, loading }), [products, loading]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
