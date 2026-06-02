import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '@/hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Play video after load
  useEffect(() => {
    if (videoRef.current && !isMobile) {
      videoRef.current.playbackRate = 0.8;
      const timer = setTimeout(() => {
        videoRef.current?.play().catch(() => {});
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Hero animations
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (!section || !content || !title || !subtitle || !cta) return;

    // Split title into characters
    const text = title.textContent || '';
    title.innerHTML = '';
    const chars: HTMLSpanElement[] = [];
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(40px)';
      title.appendChild(span);
      chars.push(span);
    });

    // Load animation timeline (auto-play on mount)
    const loadTl = gsap.timeline({
      onComplete: () => {
        // After load animation completes, enable scroll-based pin
        setupScrollTrigger();
      },
    });

    // Phase 1: Type-in title
    loadTl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.04,
      ease: 'power3.out',
    });

    // Phase 2: Subtitle fade up
    loadTl.to(
      subtitle,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.6'
    );

    // Phase 3: CTA fade up
    loadTl.to(
      cta,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    // Set initial states for subtitle and CTA
    gsap.set(subtitle, { opacity: 0, y: 20 });
    gsap.set(cta, { opacity: 0, y: 20 });

    let scrollTriggerInstance: ScrollTrigger | null = null;

    function setupScrollTrigger() {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;

          // Fade out content starting at 70%
          if (progress > 0.7) {
            const fadeProgress = (progress - 0.7) / 0.3;
            gsap.set(content, {
              opacity: 1 - fadeProgress,
              y: -30 * fadeProgress,
            });
          } else {
            gsap.set(content, { opacity: 1, y: 0 });
          }
        },
        onLeave: () => {
          gsap.set(content, { opacity: 0 });
        },
        onEnterBack: () => {
          gsap.set(content, { opacity: 1, y: 0 });
        },
      });
    }

    return () => {
      loadTl.kill();
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  const scrollToProducts = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo('#products', { offset: -72 });
    } else {
      const el = document.querySelector('#products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-screen overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Background Video or Image */}
      {!isMobile ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/hero-bg.mp4"
          poster="/images/hero-poster.jpg"
          muted
          loop
          playsInline
          preload="none"
        />
      ) : (
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/hero-poster.jpg"
          alt="Lush green dairy pasture with Friesian cows grazing at golden hour in Kenya"
        />
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(26,51,26,0.88) 0%, rgba(26,51,26,0.5) 40%, rgba(26,51,26,0.15) 100%)',
          zIndex: 1,
        }}
      />

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 z-10 px-5 pb-16 md:px-16 md:pb-32"
      >
        <h1
          ref={titleRef}
          className="font-display font-medium"
          style={{
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: '#F9F7F0',
            marginBottom: '1.5rem',
          }}
        >
          Lenengwesi Dairy Farm
        </h1>

        <p
          ref={subtitleRef}
          className="font-body"
          style={{
            fontSize: '1.25rem',
            color: 'rgba(249, 247, 240, 0.85)',
            maxWidth: '480px',
            lineHeight: 1.5,
            marginBottom: '2rem',
          }}
        >
          Fresh milk & dairy products from the heart of Kenya
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToProducts}
          className="font-body font-semibold rounded transition-all duration-300"
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
          Explore Our Products
        </button>
      </div>
    </section>
  );
}
