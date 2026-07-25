import { memo, useCallback, useEffect, useRef, useState } from 'react';
import testimonials from '../../data/testimonials.json';
import SectionHeader from '../../components/ui/SectionHeader';

function TestimonialsSection() {
  const trackRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const getPerView = useCallback(() => {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }, []);

  const goTo = useCallback(
    (i) => {
      const track = trackRef.current;
      if (!track || !track.children.length) return;
      const per = getPerView();
      const max = Math.max(0, track.children.length - per);
      const next = Math.max(0, Math.min(i, max));
      setSlideIndex(next);
    },
    [getPerView]
  );

  useEffect(() => {
    const updatePosition = () => {
      const track = trackRef.current;
      if (!track || !track.children.length) return;
      const slideW = track.children[0].offsetWidth + 24;
      track.style.transform = `translateX(-${slideIndex * slideW}px)`;
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [slideIndex]);

  useEffect(() => {
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const per = getPerView();
      const max = Math.max(0, track.children.length - per);
      setSlideIndex((prev) => (prev + 1 > max ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [getPerView]);

  return (
    <section className="section-pad bg-cream-soft" id="reviews">
      <div className="container">
        <SectionHeader eyebrow="Reviews" title={<>Loved by <span className="accent">Sweet Lovers</span></>} />
        <div className="testimonials-slider-wrap reveal">
          <div className="testimonials-track" ref={trackRef}>
            {testimonials.map((r) => (
              <div key={r.name} className="testimonial-slide">
                <div className="testimonial-card-lux">
                  <div className="testimonial-quote">&quot;</div>
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">{r.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', opacity: 0.95 }}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--maroon)' }}>{r.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>📍 {r.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-nav">
            {testimonials.map((_, d) => (
              <button
                key={d}
                type="button"
                className={`slider-dot ${d === slideIndex ? 'active' : ''}`}
                aria-label={`Slide ${d + 1}`}
                onClick={() => goTo(d)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(TestimonialsSection);
