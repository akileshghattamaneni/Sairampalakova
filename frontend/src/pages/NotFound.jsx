import { memo } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/common/Seo';
import { usePageMeta } from '../hooks/usePageMeta';

function NotFound() {
  usePageMeta('Page Not Found', 'The requested page is not available. Explore our products and contact page instead.');

  return (
    <>
      <Seo title="Page Not Found" description="The requested page is not available. Explore our products and contact page instead." canonical="/404" />
      <section className="section-pad text-center">
      <div className="container">
        <div className="contact-card-lux mx-auto" style={{ maxWidth: '560px' }}>
          <h1 className="page-title">404</h1>
          <p className="page-subtitle">The page you are looking for could not be found.</p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <Link to="/" className="btn btn-saffron">Back Home</Link>
            <Link to="/products" className="btn btn-outline-choco">View Products</Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default memo(NotFound);
