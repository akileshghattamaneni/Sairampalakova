import { memo, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGsapAnimations } from '../hooks/useGsapAnimations';
import Seo from '../components/common/Seo';
import { useProducts } from '../context/ProductsContext';
import LazyImage from '../components/ui/LazyImage';
import PageHeroPremium from '../components/layout/PageHeroPremium';
import { asset, waLink, absoluteUrl } from '../config/site';

function ProductDetails() {
  const { slug } = useParams();
  const { products } = useProducts();
  const product = useMemo(() => products.find((item) => item.slug === slug), [products, slug]);

  usePageMeta(product ? `${product.name} — Pure Palakova` : 'Product Not Found', product ? product.description : 'The requested product could not be found.');
  useScrollReveal();
  useGsapAnimations();

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const orderMessage = `Hello, I'm interested in this product: ${product.name}`;

  const productSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': absoluteUrl(`/${product.image.replace(/^\//, '')}`),
    'description': product.description,
    'offers': {
      '@type': 'Offer',
      'price': product.price,
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
      'url': absoluteUrl(`/products/${product.slug}`)
    },
    'brand': {
      '@type': 'Brand',
      'name': 'Sai Ram PalaKova'
    }
  }), [product]);

  return (
    <>
      <Seo
        title={`${product.name} — Pure Palakova`}
        description={product.description}
        keywords={`${product.name}, Palakova, pure buffalo milk`}
        canonical={`/products/${product.slug}`}
        schema={productSchema}
      />
      <PageHeroPremium image={product.image}>
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7 reveal-left">
              <div className="hero-eyebrow mb-3">
                <span className="dot" /> Freshly Prepared · {product.category?.toUpperCase()}
              </div>
              <h1 className="page-title">{product.name}</h1>
              <p className="page-subtitle">{product.description}</p>
            </div>
            <div className="col-lg-5 reveal-right text-lg-end">
              <span className="trust-badge">₹{product.price} / {product.weight || '500g'}</span>
            </div>
          </div>
        </div>
      </PageHeroPremium>

      <section className="section-pad">
        <div className="container">
          <div className="row gy-4 gy-lg-5 align-items-stretch">
            <div className="col-lg-6 reveal-left">
              <div className="product-detail-showcase">
                <div className="product-detail-image-frame">
                  <LazyImage
                    src={asset(product.image)}
                    alt={product.name}
                    className="product-detail-image"
                    eager
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 reveal-right">
              <div className="contact-card-lux product-detail-info">
                <p className="product-detail-price mb-3">
                  ₹{product.price} <span>/ {product.weight || '500g'}</span>
                </p>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>{product.description}</p>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text)', lineHeight: 2 }}>
                  {product.highlights?.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <a href={waLink(orderMessage)} className="btn btn-saffron btn-glow" target="_blank" rel="noreferrer">Order via WhatsApp</a>
                  <Link to="/products" className="btn btn-outline-choco">Back to Products</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(ProductDetails);
