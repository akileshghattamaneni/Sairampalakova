import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '../ui/LazyImage';
import { waLink } from '../../config/site';

function ProductCard({ product, revealClass = 'reveal' }) {
  const name = product.name;
  const price = Number(product.price) || 0;
  const image = product.image || product.image_path;
  const slug = product.slug;

  const orderMessage = `Hello, I'm interested in this product: ${name}`;

  return (
    <motion.article
      whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
      className={`product-card product-card-premium h-100 ${revealClass}`}
      data-product-name={name}
      data-product-price={price}
      data-product-image={image}
    >
      <div className="product-image-wrapper">
        <Link to={`/products/${slug}`}>
          <LazyImage src={image} alt={name} className="product-image" width={400} height={300} />
        </Link>
        <div className="product-image-shine" />
        <div className="product-badges">
          {product.category === 'kova' && <span className="badge-pure-milk">🔥 Wood Fire</span>}
          {product.id === 2 && <span className="badge-fresh">⭐ Best Seller</span>}
          {product.id === 1 && <span className="badge-fresh" style={{ backgroundColor: 'var(--maroon)', color: '#ffd2d6', borderColor: 'rgba(201,162,39,0.3)' }}>Zero Sugar</span>}
          {product.category === 'ghee' && <span className="badge-pure-milk">🏺 Pure Buffalo</span>}
          {product.category === 'paneer' && <span className="badge-fresh">🥛 Freshly Made</span>}
        </div>
      </div>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={`/products/${slug}`}>{name}</Link>
        </h3>
        <div className="product-footer d-flex align-items-center justify-content-between w-100 pt-2">
          <div className="product-price" style={{ fontSize: '1.25rem' }}>
            ₹{Math.round(price)} <small style={{ fontSize: '0.75rem', opacity: 0.85 }}>/ {product.weight || '500g'}</small>
          </div>
          <a
            href={waLink(orderMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-saffron btn-sm btn-glow px-3"
          >
            Order Now
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(ProductCard);
