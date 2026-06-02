import { useState } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { getLenis } from '@/hooks/useLenis';

const navLinks = [
  { label: 'Our Story', href: '#story' },
  { label: 'Products', href: '#products' },
  { label: 'Visit Us', href: '#visit' },
];

export function Navigation() {
  const { direction, isScrolled } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href, { offset: -72 });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          height: 'var(--nav-height)',
          transform: direction === 'down' && isScrolled ? 'translateY(-100%)' : 'translateY(0)',
          backgroundColor: isScrolled ? 'rgba(249, 247, 240, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          boxShadow: isScrolled ? '0 1px 0 rgba(43, 74, 43, 0.08)' : 'none',
          transitionProperty: 'transform, background-color, backdrop-filter, box-shadow',
          transitionDuration: '0.4s',
          transitionTimingFunction: 'ease',
        }}
      >
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5 md:px-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-body text-sm font-semibold tracking-[0.1em] uppercase"
            style={{ color: isScrolled ? '#2B4A2B' : '#F9F7F0' }}
          >
            LENENGWESI DAIRY
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-body text-sm font-medium tracking-[0.05em] uppercase relative group"
                style={{ color: isScrolled ? '#2B4A2B' : '#F9F7F0' }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300"
                  style={{
                    backgroundColor: isScrolled ? '#2B4A2B' : '#F9F7F0',
                  }}
                />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo('#visit')}
            className="hidden md:block font-body text-sm font-semibold rounded px-6 py-2.5 transition-all duration-300"
            style={{
              backgroundColor: isScrolled ? '#2B6B3C' : '#2B6B3C',
              color: '#F9F7F0',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#1A331A';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#2B6B3C';
            }}
          >
            Contact Us
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-[1.5px] w-6 transition-all duration-300"
              style={{
                backgroundColor: isScrolled ? '#2B4A2B' : '#F9F7F0',
                transform: mobileOpen ? 'rotate(45deg) translateY(6px)' : 'none',
              }}
            />
            <span
              className="block h-[1.5px] w-6 transition-all duration-300"
              style={{
                backgroundColor: isScrolled ? '#2B4A2B' : '#F9F7F0',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[1.5px] w-6 transition-all duration-300"
              style={{
                backgroundColor: isScrolled ? '#2B4A2B' : '#F9F7F0',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-400"
        style={{
          pointerEvents: mobileOpen ? 'auto' : 'none',
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div
          className="absolute inset-0 bg-black/20"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className="absolute right-0 top-0 h-full w-[280px] pt-[var(--nav-height)] px-8 pb-8 flex flex-col justify-center gap-8 transition-transform duration-400"
          style={{
            backgroundColor: '#F9F7F0',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-display text-2xl font-medium text-left"
              style={{
                color: '#2B4A2B',
                transitionDelay: mobileOpen ? `${i * 0.08}s` : '0s',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#visit')}
            className="mt-4 font-body text-base font-semibold rounded px-6 py-3 transition-all duration-300 w-fit"
            style={{
              backgroundColor: '#2B6B3C',
              color: '#F9F7F0',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease 0.24s, transform 0.4s ease 0.24s',
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
}
