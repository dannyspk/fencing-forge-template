import { RemoteImage } from "@/components/RemoteImage";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import type { WPService, WPLocation, HomeACF } from "@/types/wordpress";

interface FooterProps {
  services: WPService[];
  locations: WPLocation[];
  acf?: Partial<HomeACF>;
}

// Social link component using inline SVG paths to avoid extra dependencies
const SocialLinks = () => (
  <div className="flex flex-wrap items-center gap-3 mt-5">
    {/* Instagram */}
    <a
      href="https://www.instagram.com/fenceco"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-primary hover:border-primary transition-colors"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </a>
    {/* Facebook */}
    <a
      href="https://www.facebook.com/fenceco"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-primary hover:border-primary transition-colors"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </a>
    {/* YouTube */}
    <a
      href="https://www.youtube.com/@fenceco"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-primary hover:border-primary transition-colors"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    </a>
    {/* Pinterest */}
    <a
      href="https://www.pinterest.com/fenceco"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pinterest"
      className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-primary hover:border-primary transition-colors"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    </a>
    {/* Yelp */}
    <a
      href="https://www.yelp.com/biz/fenceco"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Yelp"
      className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-primary hover:border-primary transition-colors"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M20.16 12.594l-4.995 1.433c-.96.275-1.77-.702-1.248-1.573l2.83-4.666c.526-.866 1.748-.603 1.904.392l.943 5.29c.078.44-.277.83-.717.83h-.717zm-7.996 4.622l-.056 5.235c-.013 1.024 1.137 1.595 1.898.919l4.092-3.609c.755-.665.408-1.899-.558-2.082l-4.36-.883c-.447-.09-.915.247-.962.696l-.054.424zm-3.678 4.806l2.676-4.26c.514-.818 1.696-.614 1.933.345l1.322 5.358c.231.938-.696 1.74-1.614 1.408L9.197 23.28c-.836-.3-1.074-1.37-.543-2.055l-.172-.203zm-4.002-7.977l4.853-1.743c.933-.335 1.773.6 1.29 1.485l-2.575 4.8c-.486.907-1.75.7-1.95-.31L5.28 13.19c-.105-.514.27-1.006.796-1.072l.408-.073zm1.048-6.918l3.547 3.935c.681.755.218 1.917-.796 2.009L3.11 9.525c-.991.09-1.541-.984-1.008-1.797L4.44 4.005c.504-.76 1.538-.733 2.004.048l.028.074z"/>
      </svg>
    </a>
  </div>
);

export const Footer = ({
  services,
  locations: _locations,
  acf = {},
}: FooterProps) => {
  const phone = acf.phone_primary ?? "(214) 558-9169";
  const email = acf.email ?? "info@texasselectfencing.com";
  const address = acf.address ?? "Dallas, TX 75204";
  const year = new Date().getFullYear();
  const serviceMap = new Map(services.map((service) => [service.slug, service.title.rendered]));
  const resolveLabel = (slug: string, fallback: string) => serviceMap.get(slug) ?? fallback;

  return (
    <footer className="bg-[#141414] border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-7 gap-10 mb-12">
        {/* Brand + contact + social */}
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <RemoteImage
              src="/logos/texas-select-fencing-white.webp"
              alt="Texas Select Fencing"
              width={260}
              height={72}
              className="h-14 w-auto"
            />
          </Link>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            <li>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" /> {email}
              </a>
            </li>
            <li>
              <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" /> {phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" /> {address}
            </li>
          </ul>
          <SocialLinks />
        </div>

        {/* Fences */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-primary/60 pb-2">Fences</h4>
          <ul className="space-y-2.5 text-sm text-white">
            {[
              { slug: "wood-fences", label: "Wood" },
              { slug: "horizontal-fences", label: "Horizontal" },
              { slug: "wrought-iron-fences", label: "Wrought Iron" },
              { slug: "chain-link-fences", label: "Chain Link" },
              { slug: "pipe-fences", label: "Pipe" },
              { slug: "ranch-fences", label: "Ranch" },
              { slug: "composite-fences", label: "Composite" },
              { slug: "r-panel-fences", label: "R-Panel" },
              { slug: "residential-fencing", label: "Residential" },
              { slug: "commercial-fencing", label: "Commercial" },
            ].map((item) => (
              <li key={`${item.slug}-${item.label}`}>
                <Link href={`/services/${item.slug}`} className="hover:text-primary transition-colors">
                  {resolveLabel(item.slug, item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Gates */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-primary/60 pb-2">Gates</h4>
          <ul className="space-y-2.5 text-sm text-white">
            {[
              { slug: "driveway-swing-gates", label: "Driveway Gates" },
              { slug: "automatic-sliding-gates", label: "Sliding Gates" },
              { slug: "gate-opener-installation", label: "Gate Openers" },
              { slug: "access-control-systems", label: "Access Control" },
              { slug: "bollards", label: "Bollards" },
              { slug: "dumpster-enclosures", label: "Dumpster Gates" },
            ].map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="hover:text-primary transition-colors">
                  {resolveLabel(item.slug, item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Outdoor Living */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-primary/60 pb-2">Outdoor Living</h4>
          <ul className="space-y-2.5 text-sm text-white">
            {[
              { slug: "pergolas", label: "Pergolas" },
              { slug: "patio-covers", label: "Patio Covers" },
              { slug: "decks", label: "Decks" },
              { slug: "outdoor-kitchens", label: "Outdoor Kitchens" },
              { slug: "outdoor-fireplaces", label: "Outdoor Fireplaces" },
              { slug: "concrete-patios", label: "Concrete Patios" },
              { slug: "stone-columns", label: "Stone Columns" },
              { slug: "retaining-walls", label: "Retaining Walls" },
            ].map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="hover:text-primary transition-colors">
                  {resolveLabel(item.slug, item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-primary/60 pb-2">About</h4>
          <ul className="space-y-2.5 text-sm text-white">
            {[
              { href: "/about", label: "About Us" },
              { href: "/meet-the-team", label: "Meet The Team" },
              { href: "/service-areas", label: "Service Areas" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-primary transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-1">
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-primary/60 pb-2">Contact</h4>
          <ul className="space-y-2.5 text-sm text-white">
            {[
              { href: "#quote", label: "Free Estimate" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:text-primary transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-6 border-t border-white/10 text-center text-sm text-white/60">
        Texas Select Fencing LLC, {year} © All Rights Reserved
      </div>
    </footer>
  );
};
