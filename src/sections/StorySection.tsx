import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CharReveal } from '@/components/CharReveal';
import { FadeUp } from '@/components/FadeUp';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: '+', label: 'Liters daily' },
  { value: 3, suffix: '', label: 'Generations' },
  { value: 50, suffix: '+', label: 'Partner farmers' },
];

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statValuesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const quote = quoteRef.current;
    const statsContainer = statsRef.current;

    if (!section || !image || !quote || !statsContainer) return;

    // Image parallax
    gsap.to(image.querySelector('img'), {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Image fade in
    gsap.fromTo(
      image,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );

    // Quote border animation
    const borderLine = quote.querySelector('.quote-border');
    const quoteText = quote.querySelector('.quote-text');

    if (borderLine && quoteText) {
      gsap.fromTo(
        borderLine,
        { width: 0 },
        {
          width: 3,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        quoteText,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }

    // Stats count-up animation
    statValuesRef.current.forEach((el, i) => {
      if (!el) return;
      const target = stats[i].value;
      const proxy = { val: 0 };

      gsap.to(proxy, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsContainer,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (el) {
            el.textContent = Math.round(proxy.val).toString();
          }
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section || st.trigger === quote || st.trigger === statsContainer) {
          st.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative"
      style={{
        padding: 'clamp(5rem, 10vh, 8rem) 0',
        backgroundColor: '#F9F7F0',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-8 md:gap-16 items-start">
          {/* Image Column */}
          <div
            ref={imageRef}
            className="relative overflow-hidden rounded"
            style={{ aspectRatio: '4/3' }}
          >
            <img
              src="/images/story-farm.jpg"
              alt="Mbogo Dairy Farm - green pastures with healthy Friesian cows grazing near a rustic wooden barn in the Kenyan highlands"
              className="h-[calc(100%+60px)] w-full object-cover -mt-[30px]"
              loading="lazy"
            />
          </div>

          {/* Text Column */}
          <div className="flex flex-col gap-6 pt-0 md:pt-8">
            <FadeUp>
              <span
                className="font-body text-xs font-medium uppercase tracking-[0.08em]"
                style={{ color: '#7A8F7A' }}
              >
                Our Story
              </span>
            </FadeUp>

            <CharReveal
              as="h2"
              className="font-display font-medium"
              delay={0.1}
            >
              Rooted in the land, crafted with care
            </CharReveal>

            <FadeUp delay={0.2} stagger={0.12}>
              <p className="font-body text-base leading-relaxed" style={{ color: '#3D2E1E' }}>
                For three generations, the Mbogo family has tended cattle on the rolling green
                hills of central Kenya. What began as a small herd of Friesian cows has grown into
                a trusted dairy farm producing over 500 liters of fresh milk daily.
              </p>

              {/* Pull Quote */}
              <div ref={quoteRef} className="relative pl-6 my-6">
                <div
                  className="quote-border absolute left-0 top-0 bottom-0"
                  style={{ backgroundColor: '#2B4A2B', width: 0 }}
                />
                <blockquote
                  className="quote-text font-display italic opacity-0"
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    lineHeight: 1.4,
                    color: '#2B4A2B',
                  }}
                >
                  Every morning, we believe the best milk comes from cows that graze freely under
                  the African sun.
                </blockquote>
              </div>

              <p className="font-body text-base leading-relaxed" style={{ color: '#3D2E1E' }}>
                We work hand-in-hand with neighboring small-scale farmers, sourcing the finest
                local milk while supporting our community. Our commitment to ethical farming means
                our cows roam open pastures, fed on nutrient-rich grass and cared for with the
                highest welfare standards.
              </p>
            </FadeUp>

            {/* Stats Row */}
            <div
              ref={statsRef}
              className="flex gap-8 pt-4 mt-2"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="flex items-baseline gap-0.5">
                    <span
                      ref={(el) => { statValuesRef.current[i] = el; }}
                      className="font-display font-semibold"
                      style={{ fontSize: '2rem', color: '#2B4A2B', lineHeight: 1 }}
                    >
                      0
                    </span>
                    <span
                      className="font-display font-semibold"
                      style={{ fontSize: '2rem', color: '#2B4A2B', lineHeight: 1 }}
                    >
                      {stat.suffix}
                    </span>
                  </span>
                  <span
                    className="font-body text-sm mt-1"
                    style={{ color: '#7A8F7A' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
