import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside className={`sticky-cta-bar ${visible ? 'visible' : ''}`} id="stickyCta" aria-hidden={!visible}>
      <div className="sticky-cta-inner">
        <Link to="/products" className="btn btn-saffron btn-sm">
          Order
        </Link>
      </div>
    </aside>
  );
}

export default memo(StickyCta);
