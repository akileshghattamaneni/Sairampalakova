import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function initGsap() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const hero = document.querySelector('.hero-cinematic');
  if (hero) {
    gsap.fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.fromTo('.hero-headline', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, delay: 0.35, ease: 'power3.out' });
    gsap.fromTo('.hero-lead', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.55 });
    gsap.fromTo('.hero-cta-row .btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 0.7 });
    gsap.fromTo('.hero-trust-row .trust-pill', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.85 });
    gsap.fromTo('.hero-main-image', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.2, delay: 0.4, ease: 'power2.out' });
    gsap.fromTo('.hero-float-card', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, delay: 0.9 });
  }

  gsap.utils.toArray('.section-title').forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 30 }, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  gsap.utils.toArray('.feature-card, .product-card-premium').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 36 }, {
      scrollTrigger: { trigger: el, start: 'top 92%' },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: (i % 3) * 0.08,
      ease: 'power2.out',
    });
  });

  const milkFill = document.querySelector('.milk-meter-fill');
  if (milkFill && ScrollTrigger) {
    gsap.fromTo(milkFill, { scaleX: 0 }, {
      scrollTrigger: { trigger: milkFill, start: 'top 85%' },
      scaleX: 1,
      duration: 1.2,
      ease: 'power2.inOut',
      transformOrigin: 'left',
    });
  }
}

export function useGsapAnimations() {
  const { pathname } = useLocation();

  useEffect(() => {
    let active = true;
    const run = () => {
      if (active) requestAnimationFrame(initGsap);
    };

    let isLoadBound = false;
    const onLoad = () => run();

    if (window.gsap) {
      run();
    } else {
      window.addEventListener('load', onLoad);
      isLoadBound = true;
    }

    return () => {
      active = false;
      if (isLoadBound) {
        window.removeEventListener('load', onLoad);
      }
      const ScrollTrigger = window.ScrollTrigger;
      if (ScrollTrigger) {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach((t) => t.kill());
      }
    };
  }, [pathname]);
}
