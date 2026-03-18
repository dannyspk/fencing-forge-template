"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RemoteImage } from "@/components/RemoteImage";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import type { WPService } from "@/types/wordpress";

const NAV_GROUPS = [
  {
    label: "FENCES",
    items: [
      { slug: "wood-fences", label: "Wood Fences" },
      { slug: "wrought-iron-fences", label: "Wrought Iron Fences" },
      { slug: "chain-link-fences", label: "Chain Link Fence" },
      { slug: "pipe-fences", label: "Pipe Fencing" },
      { slug: "ranch-fences", label: "Ranch Fence" },
      { slug: "composite-fences", label: "Composite Fence" },
      { slug: "r-panel-fences", label: "R-Panel Fence" },
      { slug: "residential-fencing", label: "Residential Fence" },
      { slug: "commercial-fencing", label: "Commercial Fence" },
    ],
  },
  {
    label: "GATES",
    items: [
      { slug: "driveway-swing-gates", label: "Swing Gates" },
      { slug: "automatic-sliding-gates", label: "Slide Gates" },
      { slug: "gate-opener-installation", label: "Gate Openers" },
      { slug: "access-control-systems", label: "Access Control Systems" },
      { slug: "bollards", label: "Bollards" },
      { slug: "dumpster-enclosures", label: "Dumpster Enclosures" },
    ],
  },
  {
    label: "OUTDOOR LIVING",
    items: [
      { slug: "pergolas", label: "Pergolas" },
      { slug: "patio-covers", label: "Patio Covers" },
      { slug: "decks", label: "Decks" },
      { slug: "outdoor-kitchens", label: "Outdoor Kitchens" },
      { slug: "outdoor-fireplaces", label: "Outdoor Fireplaces" },
      { slug: "concrete-patios", label: "Concrete Patios" },
      { slug: "stone-columns", label: "Stone Columns" },
      { slug: "retaining-walls", label: "Retaining Walls" },
    ],
  },
  {
    label: "PRICING",
    items: [
      { slug: "wood-pricing", label: "Wood Pricing", href: "/services/wood-fences#pricing" },
      { slug: "chain-link-pricing", label: "Chain Link Pricing", href: "/services/wood-fences#pricing" },
    ],
  },
  {
    label: "ABOUT",
    items: [
      { slug: "our-company", label: "Our Company", href: "/about" },
      { slug: "meet-the-team", label: "Meet the Team", href: "/meet-the-team" },
    ],
  },
];

const UTILITY_LINKS = [
  { href: "/reviews", label: "Reviews" },
  { href: "/service-areas", label: "Service Area" },
  { href: "/projects", label: "Recent Projects" },
  { href: "#quote", label: "Request Estimate" },
];

interface NavbarProps {
  services: WPService[];
  phone: string;
}

export const Navbar = ({ services, phone }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const serviceTitleMap = useMemo(() => {
    const entries = services.map((service) => [service.slug, service.title.rendered] as const);
    return new Map(entries);
  }, [services]);
  const resolveLabel = (slug: string, fallback: string) => serviceTitleMap.get(slug) ?? fallback;
  const menuIcon = (
    <span className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 12h16" />
        <path d="M12 4v16" />
      </svg>
    </span>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* ── Promo bar ───────────────────────────────────────────── */}
      <div className="bg-[#f2f2f2] text-foreground text-xs py-2 hidden md:block border-b border-border">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm bg-primary text-white text-[10px]">≡</span>
            Low Monthly Payments Available
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            {UTILITY_LINKS.map(({ href, label }, idx) => (
              <span key={label} className="flex items-center gap-4">
                <Link href={href} className="hover:text-primary transition-colors">
                  {label}
                </Link>
                {idx < UTILITY_LINKS.length - 1 && <span className="text-muted-foreground">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main bar ──────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <RemoteImage
              src="/logos/texas-select-fencing.webp"
              alt="Texas Select Fencing"
              width={240}
              height={64}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop mega-menu */}
          <div className="hidden md:flex items-center gap-3">
            {NAV_GROUPS.map((group) => {
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setActiveGroup(group.label)}
                  onMouseLeave={() => setActiveGroup(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-bold text-[hsl(222,47%,11%)] hover:text-primary transition-colors uppercase tracking-wide relative ${
                      activeGroup === group.label ? "text-primary" : ""
                    }`}
                  >
                    {group.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                    {activeGroup === group.label && (
                      <span className="absolute left-3 right-3 -bottom-1 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>

                  {activeGroup === group.label && (
                    <div className="absolute top-full left-0 pt-3 w-[640px] z-50">
                      <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {group.items.map((item) => (
                            <Link
                              key={item.slug}
                              href={item.href ?? `/services/${item.slug}`}
                              className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
                            >
                              {menuIcon}
                              <span>{resolveLabel(item.slug, item.label)}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Phone — right aligned */}
          <a
            href={`tel:${phone}`}
            className="hidden md:flex items-center gap-2 text-[hsl(222,47%,11%)] font-bold text-base hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            {phone}
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[hsl(222,47%,11%)]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────── */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 pb-6 pt-4 space-y-1 shadow-lg">
          {NAV_GROUPS.map((group) => {
            return (
              <div key={group.label} className="py-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 pb-1 pt-2">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={item.href ?? `/services/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 text-sm text-gray-700 hover:text-primary transition-colors"
                  >
                    {resolveLabel(item.slug, item.label)}
                  </Link>
                ))}
              </div>
            );
          })}
          <div className="pt-3 border-t border-gray-100 space-y-3">
            {UTILITY_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="block text-sm text-gray-600 hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/services/wood-fences#pricing"
              onClick={() => setOpen(false)}
              className="block text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="block text-sm text-gray-600 hover:text-primary transition-colors"
            >
              About
            </Link>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-sm font-bold text-[hsl(222,47%,11%)]"
            >
              <Phone className="w-4 h-4 text-primary" /> {phone}
            </a>
            <Link
              href="#quote"
              onClick={() => setOpen(false)}
              className="block w-full h-10 bg-primary text-white rounded-md text-sm font-bold text-center leading-10"
            >
              Get Estimate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
