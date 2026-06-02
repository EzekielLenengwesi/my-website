import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '@/hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

export function VisitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgImage = bgImageRef.current;
    const card = cardRef.current;

    if (!section || !bgImage || !card) return;

    // Background parallax
    gsap.to(bgImage, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Card reveal animation
    const cardElements = card.querySelectorAll('.card-item');

    gsap.fromTo(
      card,
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          once: true,
        },
        onComplete: () => {
          // Stagger inner elements
          gsap.fromTo(
            cardElements,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
            }
          );
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="visit"
      className="relative overflow-hidden"
      style={{
        minHeight: 'min(80vh, 700px)',
        backgroundColor: '#1A331A',
      }}
    >
      {/* Background Image */}
      <img
        ref={bgImageRef}
        src="/images/visit-bg.jpg"
        alt="Panoramic view of Mbogo Dairy Farm at sunrise with rolling green pastures"
        className="absolute inset-0 h-[calc(100%+40px)] w-full object-cover -mt-5"
        loading="lazy"
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(26, 51, 26, 0.7)' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-16 h-full flex items-center justify-center md:justify-end py-16 md:py-24">
        {/* Content Card */}
        <div
          ref={cardRef}
          className="w-full md:max-w-[520px] opacity-0"
          style={{
            backgroundColor: 'rgba(249, 247, 240, 0.95)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            borderRadius: '8px',
          }}
        >
          <span
            className="card-item font-body text-xs font-medium uppercase tracking-[0.08em] block mb-4 opacity-0"
            style={{ color: '#084d08',  
              fontSize: '1.75rem' }}
          >
            Visit the Farm
          </span>

          <h2
            className="card-item font-display font-medium mb-4 opacity-0"
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              color: '#2B4A2B',
              lineHeight: 1.15,
            }}
          >
            Come Experience Freshness
          </h2>

          <p
            className="card-item font-body text-base leading-relaxed mb-6 opacity-0"
            style={{ color: '#3D2E1E' }}
          >
            We welcome visitors every Saturday for farm tours, fresh milk tastings, and a
            chance to meet our happy herd. Bring the family and reconnect with where real
            food comes from.
          </p>

          <div className="card-item flex items-center gap-3 mb-2 opacity-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B4A2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span className="font-body text-base font-medium" style={{ color: '#2B4A2B' }}>
              Mondays to Fridays: 8 AM — 5 PM
            </span>
          </div>

          <div className="card-item flex items-center gap-3 mb-6 opacity-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B4A2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <span className="font-body text-base font-medium" style={{ color: '#2B4A2B' }}>
              Saturdays: 9 AM — 3 PM
            </span>
          </div>

          <div className="card-item flex items-center gap-3 mb-6 opacity-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7A8F7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-body text-sm" style={{ color: '#036603' }}>
              Maralal-Samburu Road, 5km from Maralal town center
            </span>
          </div>

          <button
            className="card-item font-body font-semibold rounded transition-all duration-300 opacity-0"
            style={{
              fontSize: '1rem',
              letterSpacing: '0.02em',
              backgroundColor: '#2B6B3C',
              color: '#F9F7F0',
              padding: '14px 32px',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = '#1A331A';
              btn.style.transform = 'translateY(-2px)';
              btn.style.boxShadow = '0 8px 24px rgba(26, 51, 26, 0.2)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.backgroundColor = '#2B6B3C';
              btn.style.transform = 'translateY(0)';
              btn.style.boxShadow = 'none';
            }}
          >
            Book a Visit
          </button>

          <div className="card-item mt-4 opacity-0">
            <button
              className="font-body text-sm font-medium transition-colors duration-300"
              style={{ color: '#2B4A2B' }}
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.textDecoration = 'underline';
                (e.currentTarget as HTMLElement).style.textUnderlineOffset = '4px';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.textDecoration = 'none';
              }}
            >
              Get Directions →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
