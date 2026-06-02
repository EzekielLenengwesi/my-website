import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  duration?: number;
}

export function FadeUp({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  y = 40,
  duration = 0.8,
}: FadeUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const childElements = el.children;
    if (childElements.length === 0) return;

    gsap.set(childElements, { opacity: 0, y });

    const tween = gsap.to(childElements, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, stagger, y, duration]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
