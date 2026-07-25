import { memo, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SITE, asset } from '../../config/site';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

  return (
    <header className="site-header">
      <nav className={`navbar navbar-expand-lg sweets-navbar ${scrolled ? 'scrolled' : ''}`} id="mainNav" aria-label="Main navigation">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className="brand-logo">
              <img src={asset('assets/images/logo.png')} alt={SITE.businessName} width={56} height={56} />
            </div>
            <div className="brand-name-wrap">
              <span className="brand-title">{SITE.businessName}</span>
              <span className="brand-tagline">Pure Milk · Wood-Fire · Since 2018</span>
            </div>
          </Link>



          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" end className={navClass}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className={navClass}>
                  Our Story
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className={navClass}>
                  Shop
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className={navClass}>
                  Contact
                </NavLink>
              </li>
            </ul>
            <Link to="/products" className="btn btn-saffron btn-nav-cta d-none d-lg-inline-flex">
              Order Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default memo(Navbar);
