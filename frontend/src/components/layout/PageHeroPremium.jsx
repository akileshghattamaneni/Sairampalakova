import { memo } from 'react';
import { asset } from '../../config/site';

/** Inner-page hero with brand overlay and optional background photo */
function PageHeroPremium({ image = 'assets/images/sweet_kova.jpg', className = '', children }) {
  return (
    <section
      className={`page-hero-premium ${className}`.trim()}
      style={{ '--page-hero-image': `url(${asset(image)})` }}
    >
      <div className="page-hero-bg-layer" aria-hidden="true">
        <span className="page-hero-orb page-hero-orb-1" />
        <span className="page-hero-orb page-hero-orb-2" />
        <span className="page-hero-shimmer" />
      </div>
      {children}
    </section>
  );
}

export default memo(PageHeroPremium);
