import { memo } from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../components/ui/LazyImage';
import SectionHeader from '../components/ui/SectionHeader';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useGsapAnimations } from '../hooks/useGsapAnimations';
import Seo from '../components/common/Seo';
import PageHeroPremium from '../components/layout/PageHeroPremium';
import { ABOUT_GALLERY } from '../data/content';
import { SITE, asset } from '../config/site';

function AboutPage() {
  usePageMeta('Our Story — Heritage & Tradition', "The Sai Ram PalaKova legacy — forefathers' wood-fire tradition restarted 15 August 2018 with pure buffalo milk.");
  useScrollReveal();
  useGsapAnimations();

  const miniStats = [
    ['6+', 'Years'],
    ['5', 'Products'],
    ['100%', 'Pure Milk'],
    ['0', 'Chemicals'],
  ];

  return (
    <>
      <Seo
        title="Our Story — Heritage & Tradition"
        description="The Sai Ram PalaKova legacy — forefathers' wood-fire tradition restarted 15 August 2018 with pure buffalo milk."
        keywords="about Sai Ram Palakova, traditional sweets, Nellore heritage"
        canonical="/about"
      />
      <PageHeroPremium image="assets/images/our_story.jpg">
        <div className="container">
          <div className="row align-items-center gy-3">
            <div className="col-lg-8 reveal-left">
              <div className="hero-eyebrow mb-3">
                <span className="dot" /> Our Heritage · Our Pride
              </div>
              <h1 className="page-title">
                Our <span className="text-saffron" style={{ fontStyle: 'italic' }}>Story</span>
              </h1>
              <p className="page-subtitle mb-0">A forefathers&apos; tradition lovingly restarted on 15 August 2018 — authentic village-style PalaKova.</p>
            </div>
            <div className="col-lg-4 reveal-right text-lg-end">
              <span className="trust-badge">🥛 Traditional Buffalo Milk</span>
            </div>
          </div>
        </div>
      </PageHeroPremium>

      <section className="section-pad">
        <div className="container">
          <div className="story-block reveal">
            <div className="story-copy">
              <span className="section-eyebrow">Rooted in Legacy</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Generations of <span className="accent">Sweetness</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, margin: '1.25rem 0' }}>
                Long before <strong>{SITE.businessName}</strong> was written on any board, our forefathers were known for slow-cooked PalaKova on <strong>kattela poyyi</strong> — pure buffalo milk, hours of stirring, aroma filling the village air.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.85 }}>
                On <strong>15 August 2018</strong>, with elders&apos; blessings, we restarted under this name — keeping everything authentic: fresh village milk, wood-fire cooking, and absolutely no chemicals.
              </p>
            </div>
            <div className="story-visual">
              <LazyImage src={asset('assets/images/our_story.jpg')} alt="Traditional PalaKova" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream-soft">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-7 reveal-left">
              <div className="milk-purity-section">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--maroon)', marginBottom: '1rem' }}>What Makes Us Special</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text)', lineHeight: 2.2 }}>
                  <li>🏺 Generations-old traditional recipes</li>
                  <li>🥛 Pure buffalo milk — high butter content</li>
                  <li>🔥 Kattela poyyi wood-fire preparation</li>
                  <li>🌿 100% chemical-free approach</li>
                  <li>🏪 Trusted by Murli Krishna Sweets, Nellore</li>
                  <li>📦 Limited daily batches for freshness</li>
                </ul>
                <Link to="/products" className="btn btn-saffron mt-3">
                  Order Now
                </Link>
              </div>
            </div>
            <div className="col-lg-5 reveal-right">
              <div className="row g-3">
                {miniStats.map(([val, label]) => (
                  <div key={label} className="col-6">
                    <div className="feature-card text-center p-4">
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--saffron)', fontWeight: 700 }}>{val}</div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-sm">
        <div className="container">
          <SectionHeader eyebrow="Gallery" title={<>A Glimpse Into <span className="accent">Our World</span></>} />
          <div className="insta-gallery reveal">
            {ABOUT_GALLERY.map(([file, alt]) => (
              <div key={file + alt} className="insta-item" title={alt}>
                <LazyImage src={asset(`assets/images/${file}`)} alt={alt} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream-soft text-center reveal">
        <div className="container">
          <h2 className="section-title mb-3">Taste the Tradition</h2>
          <p className="section-subtitle mb-4">Experience authentic village PalaKova — order fresh today.</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/products" className="btn btn-saffron btn-lg">
              Shop Products
            </Link>
            <Link to="/contact" className="btn btn-outline-choco btn-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(AboutPage);
