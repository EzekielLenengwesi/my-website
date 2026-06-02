import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CharRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
}

export function CharReveal({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
}: CharRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.char');
    if (chars.length === 0) return;

    gsap.set(chars, {
      y: '100%',
      clipPath: 'inset(0 0 100% 0)',
    });

    const tween = gsap.to(chars, {
      y: '0%',
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.6,
      delay,
      stagger: 0.02,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  const words = children.split(' ');

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`${className} overflow-hidden`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="char inline-block"
              style={{ willChange: 'transform, clip-path' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
