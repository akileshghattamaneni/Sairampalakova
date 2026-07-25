import { memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '../sections/home/HeroSection';
import SectionHeader from '../components/ui/SectionHeader';
import LazyImage from '../components/ui/LazyImage';
import ProductCard from '../components/product/ProductCard';
import TestimonialsSection from '../sections/home/TestimonialsSection';
import { useProducts } from '../context/ProductsContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGsapAnimations } from '../hooks/useGsapAnimations';
import Seo from '../components/common/Seo';
import { FEATURES } from '../data/content';
import { SITE, asset, waLink, absoluteUrl } from '../config/site';

function HomePage() {
  const { products } = useProducts();
  const [filter, setFilter] = useState('all');

  usePageMeta('Taste the Tradition of Pure Palakova', 'Handcrafted Andhra PalaKova from pure buffalo milk — wood-fire kattela poyyi, zero chemicals. Order fresh daily in Nellore.');
  useScrollReveal();
  useGsapAnimations();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'kova', name: 'Palakova' },
    { id: 'ghee', name: 'Ghee' },
    { id: 'paneer', name: 'Paneer' }
  ];

  const filteredProducts = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter((p) => p.category === filter);
  }, [products, filter]);

  return (
    <>
      <Seo
        title="Taste the Tradition of Pure Palakova"
        description="Handcrafted Andhra PalaKova from pure buffalo milk — wood-fire kattela poyyi, zero chemicals. Order fresh daily in Nellore."
        keywords="Palakova, PalaKova, Andhra sweets, Nellore sweets, pure buffalo milk"
        canonical="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FoodBusiness',
          'name': 'Sai Ram PalaKova',
          'image': absoluteUrl('/assets/images/sweet_kova.jpg'),
          'priceRange': '$$',
          'telephone': SITE.phone,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': SITE.address,
            'addressLocality': 'Nayudupeta',
            'addressRegion': 'Andhra Pradesh',
            'postalCode': '524126',
            'addressCountry': 'IN'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': '13.951317',
            'longitude': '79.872303'
          },
          'url': absoluteUrl('/')
        }}
      />
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Brand Heritage / Story */}
      <section className="section-pad" id="story">
        <div className="container">
          <div className="story-block">
            <div className="story-copy reveal-left">
              <span className="section-eyebrow">Our Heritage</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                A Forefathers' Legacy,
                <br />
                <span className="accent">Reborn in 2018</span>
              </h2>
              <div className="section-divider" style={{ marginLeft: 0 }} />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, margin: '1.5rem 0' }}>
                Long before our name was on any board, our village knew us for slow-cooked PalaKova on <strong>kattela poyyi</strong> — pure buffalo milk, hours of stirring, and love in every spoon.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                On <strong>15 August 2018</strong>, we proudly restarted this tradition. Today, our sweets reach Murli Krishna Sweets and homes across Nellore — yet every batch still begins in our village kitchen.
              </p>
              <Link to="/about" className="btn btn-choco">
                Read Full Story
              </Link>
            </div>
            <div className="story-visual reveal-right">
              <LazyImage src={asset('assets/images/sweetless_palakova.jpg')} alt="Traditional Palakova preparation" />
              <div className="story-visual-badge">
                <strong style={{ color: 'var(--maroon)', display: 'block' }}>Village Kitchen</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Wood-fire · Limited batches</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="section-pad bg-cream-soft" id="why">
        <div className="container">
          <SectionHeader
            eyebrow="Why Choose Us"
            title={<>The <span className="accent">Sai Ram</span> Difference</>}
            subtitle="Purity, taste, and trust passed down through generations — never compromised for quantity."
          />
          <div className="row g-4">
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`col-md-6 col-lg-4 reveal delay-${(i % 3) + 1}`}>
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: f.icon }} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Products Showcase Catalog */}
      <section className="section-pad" id="products">
        <div className="container">
          <SectionHeader
            eyebrow="Catalog"
            title={<>Signature <span className="accent">Sweets</span></>}
            subtitle="Prepared fresh daily using pure buffalo milk and slow wood-fire cooking."
          />

          {/* Category Filters */}
          <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap reveal">
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
                      layoutId="activeHomeFilterBg"
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

          <motion.div layout className="row g-4 justify-content-center" id="homeProductsGrid">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
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
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Testimonials/Reviews */}
      <TestimonialsSection />

      {/* 5. Contact & WhatsApp CTA */}
      <section className="section-pad bg-cream-soft">
        <div className="container text-center reveal">
          <h2 className="section-title mb-3">Ready to Taste Tradition?</h2>
          <p className="section-subtitle mb-4">Click below to place order directly on WhatsApp. We reply instantly and arrange fresh delivery.</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <a href={waLink("Hello, I would like to place an order.")} className="btn btn-saffron btn-lg btn-glow" target="_blank" rel="noopener noreferrer">
              Order on WhatsApp
            </a>
            <Link to="/contact" className="btn btn-outline-choco btn-lg">
              Contact &amp; Map
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(HomePage);
