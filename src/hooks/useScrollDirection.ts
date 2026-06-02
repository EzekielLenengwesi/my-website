import { useState, useEffect, useRef } from 'react';

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const deadzone = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      setIsScrolled(currentY > 100);

      if (Math.abs(diff) > 5) {
        if (diff > 0 && deadzone.current <= 0) {
          setDirection('down');
          deadzone.current = 1;
        } else if (diff < 0 && deadzone.current >= 0) {
          setDirection('up');
          deadzone.current = -1;
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { direction, isScrolled };
}
