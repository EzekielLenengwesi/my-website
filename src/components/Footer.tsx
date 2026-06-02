import { getLenis } from '@/hooks/useLenis';

const quickLinks = [
  { label: 'OUR STORY', href: '#story' },
  { label: 'PRODUCTS', href: '#products' },
  { label: 'VISIT US', href: '#visit' },
];

export function Footer() {
  const scrollTo = (href: string) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href, { offset: -72 });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: '#1A331A',
        padding: '4rem 0 2rem',
      }}
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <span className="font-body text-sm font-semibold tracking-[0.1em] uppercase" style={{ color: '#F9F7F0' }}>
              LENENGWESI DAIRY
            </span>
            <p
              className="font-display text-lg"
              style={{ color: 'rgba(249, 247, 240, 0.7)' }}
            >
              Fresh from our farm to your table
            </p>
            <div className="flex items-center gap-4 mt-2">
              {/* Instagram */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="transition-opacity duration-300 hover:opacity-60"
                style={{ color: '#F9F7F0' }}
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="transition-opacity duration-300 hover:opacity-60"
                style={{ color: '#F9F7F0' }}
                aria-label="Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            {quickLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-body text-sm font-medium tracking-[0.05em] text-left transition-colors duration-300 hover:text-[#F9F7F0]"
                style={{ color: 'rgba(249, 247, 240, 0.7)' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-3">
            <span className="font-body text-sm font-semibold" style={{ color: '#F9F7F0' }}>
              Get in Touch
            </span>
            <a
              href="mailto:hello@lenengwesidairy.co.ke"
              className="font-body text-sm transition-colors duration-300 hover:text-[#F9F7F0]"
              style={{ color: 'rgba(249, 247, 240, 0.7)' }}
            >
              hello@lenengwesidairy.co.ke
            </a>
            <a
              href="tel:+254700123456"
              className="font-body text-sm transition-colors duration-300 hover:text-[#F9F7F0]"
              style={{ color: 'rgba(249, 247, 240, 0.7)' }}
            >
              +254 700 123 456
            </a>
            <span
              className="font-body text-sm"
              style={{ color: 'rgba(249, 247, 240, 0.7)' }}
            >
              Maralal-Samburu Road, 5km from Maralal town center
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 text-center"
          style={{ borderTop: '1px solid rgba(249, 247, 240, 0.1)' }}
        >
          <p
            className="font-body text-xs"
            style={{ color: 'rgba(249, 247, 240, 0.4)' }}
          >
            &copy; 2025 Lenengwesi Dairy Farm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
