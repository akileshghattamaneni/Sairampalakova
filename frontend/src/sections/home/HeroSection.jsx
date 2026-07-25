import { memo } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../../components/ui/LazyImage';
import { SITE, asset, waLink } from '../../config/site';
import { useFreshCountdown } from '../../hooks/useFreshCountdown';

function HeroSection() {
  const countdown = useFreshCountdown();

  return (
    <>
      <section className="hero-cinematic" id="hero">
        <div className="hero-bg-layer">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="milk-splash milk-splash-1" />
          <div className="milk-splash milk-splash-2" />
          <div className="milk-splash milk-splash-3" />
          <span className="floating-sweet floating-sweet-1">🍯</span>
          <span className="floating-sweet floating-sweet-2">🥛</span>
          <span className="floating-sweet floating-sweet-3">✨</span>
        </div>
        <div className="container position-relative">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6 hero-content">
              <div className="hero-eyebrow">
                <span className="dot" />
                Authentic Andhra · Pure Buffalo Milk
              </div>
              <h1 className="hero-headline">
                Taste the <span className="line-accent">Tradition</span>
                <br />
                of <span className="line-gold">Pure Palakova</span>
              </h1>
              <p className="hero-lead">
                Handcrafted sweetness from pure milk — slow-cooked on kattela poyyi wood-fire with absolutely no chemicals. From our village hearth to your home.
              </p>
              <div className="hero-cta-row">
                <Link to="/products" className="btn btn-saffron btn-lg btn-glow">
                  Order Fresh Palakova
                </Link>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline-choco btn-lg">
                  WhatsApp Order
                </a>
              </div>
              <div className="hero-trust-row">
                <div className="trust-pill"><span className="trust-pill-icon">🔥</span> Kattela Poyyi</div>
                <div className="trust-pill"><span className="trust-pill-icon">🥛</span> Pure Milk</div>
                <div className="trust-pill"><span className="trust-pill-icon">🌿</span> Zero Chemicals</div>
                <div className="trust-pill"><span className="trust-pill-icon">✅</span> Daily Fresh</div>
              </div>
            </div>
            <div className="col-lg-6 hero-visual">
              <div className="hero-image-stage">
                <div className="hero-glow-ring" />
                <div className="hero-main-image">
                  <span className="hero-since-badge">Since 2018</span>
                  <LazyImage src={asset('assets/images/sweet_kova.jpg')} alt={`Premium ${SITE.businessName}`} width={600} height={480} eager />
                  <div className="hero-image-overlay">
                    <h3>{SITE.businessName}</h3>
                    <p>Wood-fire · Pure buffalo milk · Nellore&apos;s trusted taste</p>
                  </div>
                </div>
                <div className="hero-float-card hero-float-1">
                  <span className="hero-float-label">Supplying Daily</span>
                  <strong>Murli Krishna Sweets, Nellore</strong>
                </div>
                <div className="hero-float-card hero-float-2">
                  <span className="hero-float-label">Trusted By</span>
                  <strong>Families &amp; sweet shops across Nellore</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="#fresh" className="scroll-indicator" aria-label="Scroll down">
          <span>Discover</span>
          <span className="scroll-line" />
        </a>
      </section>

      <div className="fresh-timer-strip" id="fresh">
        <div className="container">
          Next fresh batch preparation in <strong id="freshCountdown">{countdown}</strong> · Limited daily quantity · Order before stock ends
        </div>
      </div>
    </>
  );
}

export default memo(HeroSection);
