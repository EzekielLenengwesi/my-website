import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CharReveal } from '@/components/CharReveal';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Fresh Whole Milk',
    availability: 'Available Daily',
    description:
      'Creamy, full-bodied milk from pasture-raised Friesian cows. Rich in calcium and essential nutrients. Nothing added, nothing taken away — just pure, wholesome goodness.',
    sizes: '500ml / 1L / 5L',
    image: '/images/product-milk.jpg',
  },
  {
    name: 'Greek Yogurt',
    availability: 'Available Daily',
    description:
      'Thick, velvety yogurt crafted in small batches using traditional methods. Perfect for breakfast, smoothies, or as a versatile cooking ingredient.',
    sizes: '250g / 500g / 1kg',
    image: '/images/product-yogurt.jpg',
  },
  {
    name: 'Fresh Mala',
    availability: 'Weekends Only',
    description:
      'Tangy, refreshing cultured buttermilk — a Kenyan favorite. Best served chilled on a warm afternoon, or paired with your favorite meal.',
    sizes: '500ml / 1L',
    image: '/images/product-mala.jpg',
  },
  {
    name: 'Farm Butter',
    availability: 'Available Daily',
    description:
      'Small-batch churned butter with a golden color and rich, creamy flavor. Ideal for baking, spreading, or adding richness to any dish.',
    sizes: '250g / 500g',
    image: '/images/product-butter.jpg',
  },
  {
    name: 'Natural Cream',
    availability: 'Available Daily',
    description:
      'Pure heavy cream, perfect for coffee, desserts, or cooking. No stabilizers, no additives — just rich, velvety cream from our happiest cows.',
    sizes: '250ml / 500ml',
    image: '/images/product-cream.jpg',
  },
];

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // No horizontal scroll on mobile

    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const header = headerRef.current;

    if (!section || !wrapper || !track || !header) return;

    // Wait for images to load before calculating widths
    const images = track.querySelectorAll('img');
    let loadedCount = 0;

    const initScroll = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = trackWidth - viewportWidth;

      if (scrollDistance <= 0) return;

      const tl = gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance * 1.8}`,
          pin: wrapper,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      return tl;
    };

    const allImagesLoaded = images.length === 0 || loadedCount >= images.length;
    let tl: gsap.core.Tween | undefined;

    if (allImagesLoaded) {
      tl = initScroll();
    } else {
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener('load', () => {
            loadedCount++;
            if (loadedCount >= images.length && !tl) {
              tl = initScroll();
            }
          });
        }
      });
      // Fallback: init after a timeout
      setTimeout(() => {
        if (!tl) {
          tl = initScroll();
        }
      }, 2000);
    }

    return () => {
      if (tl?.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl?.kill();
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative"
      style={{ backgroundColor: '#F9F7F0' }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="text-center px-5 md:px-16 pt-20 pb-12 md:pt-24 md:pb-16"
      >
        <span
          className="font-body text-xs font-medium uppercase tracking-[0.08em] block mb-4"
          style={{ color: '#7A8F7A' }}
        >
          Our Products
        </span>
        <CharReveal
          as="h2"
          className="font-display font-medium"
          delay={0}
        >
          From Farm to Table
        </CharReveal>
      </div>

      {isMobile ? (
        // Mobile: Vertical stack
        <div className="px-5 pb-16 flex flex-col gap-8">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} isMobile />
          ))}
        </div>
      ) : (
        // Desktop: Horizontal scroll
        <div
          ref={wrapperRef}
          className="relative overflow-hidden"
          style={{ height: '100vh' }}
        >
          <div
            ref={trackRef}
            className="flex items-center h-full"
            style={{ gap: '4rem', paddingLeft: '4rem', paddingRight: '4rem' }}
          >
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

interface ProductCardProps {
  product: (typeof products)[0];
  isMobile?: boolean;
}

function ProductCard({ product, isMobile }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group flex-shrink-0 overflow-hidden transition-all duration-300 ${
        isMobile ? 'w-full' : 'w-[85vw] max-w-[1100px]'
      }`}
      style={{
        backgroundColor: '#F9F7F0',
        border: '1px solid rgba(43, 74, 43, 0.08)',
        borderRadius: '8px',
        boxShadow: '0 4px 24px rgba(26, 51, 26, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(26, 51, 26, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(26, 51, 26, 0.06)';
      }}
    >
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} h-full`}>
        {/* Image */}
        <div
          className={`overflow-hidden ${isMobile ? 'h-[280px]' : 'w-1/2'}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div
          className={`flex flex-col justify-center ${isMobile ? 'p-6' : 'w-1/2 p-10'}`}
        >
          {/* Availability Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  product.availability === 'Weekends Only' ? '#D4A843' : '#2B6B3C',
              }}
            />
            <span
              className="font-body text-xs font-medium uppercase tracking-[0.08em]"
              style={{ color: '#2B6B3C' }}
            >
              {product.availability}
            </span>
          </div>

          {/* Product Name */}
          <h3
            className="font-display font-medium mb-3"
            style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              color: '#2B4A2B',
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p
            className="font-body text-base leading-relaxed mb-4"
            style={{ color: '#3D2E1E' }}
          >
            {product.description}
          </p>

          {/* Divider */}
          <div
            className="my-3"
            style={{
              height: '1px',
              backgroundColor: 'rgba(43, 74, 43, 0.1)',
            }}
          />

          {/* Sizes */}
          <span
            className="font-body text-sm"
            style={{ color: '#7A8F7A' }}
          >
            Size: {product.sizes}
          </span>
        </div>
      </div>
    </div>
  );
}
