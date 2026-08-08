import { memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import Seo from '../components/common/Seo';
import { useProducts } from '../context/ProductsContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGsapAnimations } from '../hooks/useGsapAnimations';
import { productTags } from '../data/content';
import categories from '../data/categories.json';
import DeliveryInfoSection from '../components/sections/DeliveryInfoSection';
import PageHeroPremium from '../components/layout/PageHeroPremium';

function ProductsPage() {
  const { products, loading } = useProducts();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  usePageMeta('Shop Fresh Palakova & Milk Products', 'Order Sweet Kova, Sweetless Kova, Ginni Kova, Ghee & Paneer — pure buffalo milk, daily fresh, Nellore delivery.');
  useScrollReveal();
  useGsapAnimations();

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      const name = (p.name || '').toLowerCase();
      const tags = productTags(p.name);
      const matchQ = !q || name.includes(q) || tags.includes(q);
      const matchCat = filter === 'all' || (p.category || '').toLowerCase() === filter.toLowerCase();
      return matchQ && matchCat;
    });
  }, [products, search, filter]);

  return (
    <>
      <Seo
        title="Shop Fresh Palakova & Milk Products"
        description="Order Sweet Kova, Sweetless Kova, Ginni Kova, Ghee and Paneer — pure buffalo milk, daily fresh, Nellore delivery."
        keywords="buy palakova online, sweetless kova, ginni kova, pure ghee, fresh paneer"
        canonical="/products"
      />
      <PageHeroPremium image="assets/images/sweetless_palakova.jpg">
        <div className="container">
          <div className="row align-items-end gy-4">
            <div className="col-lg-8 reveal-left">
              <div className="hero-eyebrow mb-3">
                <span className="dot" />
                Fresh Daily · Pure Milk · Nellore
              </div>
              <h1 className="page-title">
                Shop Our <span className="text-saffron" style={{ fontStyle: 'italic' }}>Sweets</span>
              </h1>
              <p className="page-subtitle">Buffalo milk products slow-cooked on kattela poyyi — pure, chemical-free, delivered fresh.</p>
            </div>
            <div className="col-lg-4 reveal-right text-lg-end">
              <span className="trust-badge" style={{ fontSize: '0.75rem' }}>
                🚚 Daily dispatch to Nellore
              </span>
            </div>
          </div>
        </div>
      </PageHeroPremium>

      <section className="section-pad">
        <div className="container">
          <div className="shop-toolbar reveal">
            <div className="search-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input type="search" id="productSearch" placeholder="Search products…" aria-label="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="filter-chips">
              {categories.map((c) => {
                const isActive = filter === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`filter-chip ${isActive ? 'active' : ''}`}
                    onClick={() => setFilter(c.id)}
                    style={{ position: 'relative', overflow: 'hidden' }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterBg"
                        className="active-filter-bg"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'var(--maroon)',
                          zIndex: 0,
                          borderRadius: '999px'
                        }}
                      />
                    )}
                    <span style={{ position: 'relative', zIndex: 1, color: isActive ? '#fff' : 'var(--text)' }}>
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="delivery-info-shop-note reveal mb-4">
            Listed prices are for <strong>local delivery</strong> in Nellore, Nayudupeta &amp; nearby. Outstation cities — bulk orders of <strong>5 kg+</strong>.
          </p>

          <DeliveryInfoSection className="mb-4" />

          <motion.div layout className="row g-4 products-grid" id="productsGrid">
            <AnimatePresence mode="popLayout">
              {loading && products.length <= 3 ? (
                <>
                  {[0, 1, 2].map((s) => (
                    <div key={s} className="col-sm-6 col-lg-4">
                      <div className="product-card-premium h-100">
                        <div className="skeleton" style={{ height: 260 }} />
                        <div style={{ padding: '1.5rem' }}>
                          <div className="skeleton mb-2" style={{ height: 24, width: '60%' }} />
                          <div className="skeleton mb-3" style={{ height: 14 }} />
                          <div className="skeleton" style={{ height: 40 }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : filtered.length > 0 ? (
                filtered.map((product, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    className="col-sm-6 col-lg-4"
                  >
                    <ProductCard product={product} revealClass="" />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-12 text-center mt-3"
                >
                  <p className="text-muted-warm">
                    No products match your search.{' '}
                    <Link to="/contact" className="text-saffron fw-bold">
                      Contact us
                    </Link>{' '}
                    to order directly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default memo(ProductsPage);
