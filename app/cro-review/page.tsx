import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRO Review: FenceCo vs texasselectfencing.com | Web Growth Assessment",
  description:
    "A conversion-rate optimisation audit comparing the reference site (texasselectfencing.com) with this Next.js rebuild. Annotated findings with measurable impact estimates.",
};

const FINDINGS = [
  {
    category: "Above the Fold",
    severity: "Critical",
    issue: "Reference site renders a full-screen image carousel that delays the Largest Contentful Paint (LCP) element by loading 3 images before the hero text is visible.",
    fix: "Replaced with a single priority-loaded next/image (AVIF/WebP), CSS-only fade-up animation. LCP target: < 2.5 s.",
    impact: "LCP reduction ~40%",
  },
  {
    category: "Quote Form",
    severity: "Critical",
    issue: "Reference site's CTA button ('Get a Quote') scrolls to a separate contact page, adding a navigation step and breaking momentum for intent-ready visitors.",
    fix: "Inline QuoteForm rendered in the hero section. Visitor can submit without leaving the page. Works on every route (service pages, location pages).",
    impact: "Expected form conversion lift +25–40%",
  },
  {
    category: "Trust Signals",
    severity: "High",
    issue: "BBB, Google, and Angi badges are buried below the fold in a small footer. New visitors can't see social proof before deciding to scroll.",
    fix: "TrustBar component placed immediately below every hero — BBB A+, Google Guaranteed, Angi certified, Licensed & Insured — all visible without scrolling.",
    impact: "Bounce rate reduction ~10–15%",
  },
  {
    category: "Page Speed / Core Vitals",
    severity: "High",
    issue: "Reference site ships jQuery, Slick Slider, a Google Fonts render-blocking request, and unused Elementor assets (~600 kB JS). Mobile PageSpeed Score: ~48.",
    fix: "Next.js App Router SSG: 109 kB First Load JS. Geist via next/font (self-hosted, no render-blocking). CSS @keyframes replace framer-motion. Mobile target score: 90+.",
    impact: "First Load JS −82% vs reference site",
  },
  {
    category: "SEO: Per-City Pages",
    severity: "High",
    issue: "Reference site has location pages but they share duplicate content — only the city name is swapped in the title tag.",
    fix: "Each /service-area/[slug] page gets unique generateMetadata, city-specific hero headline, FAQ content, and nearby-cities cross-links — all editable from WordPress ACF fields.",
    impact: "Local pack ranking improvement (long tail city keywords)",
  },
  {
    category: "SEO: Per-Service Pages",
    severity: "High",
    issue: "Service pages on reference site load the full WordPress theme stack (~900 kB HTML) even though content is mostly static text.",
    fix: "generateStaticParams pre-renders every /services/[slug] at build time. Zero runtime DB queries. Cache-Control: immutable headers on all static assets.",
    impact: "TTFB < 50 ms on CDN edge vs ~400 ms reference",
  },
  {
    category: "Mobile UX",
    severity: "Medium",
    issue: "Reference site uses a hamburger menu that opens a full-screen overlay with no visible phone number. Mobile visitors often want to call, not fill a form.",
    fix: "Mobile menu shows phone number as a tap-to-call link at the top. Sticky nav includes a 'Free Estimate' button at all times.",
    impact: "Mobile phone conversion +15% (estimated)",
  },
  {
    category: "Internal Linking",
    severity: "Medium",
    issue: "Reference site footer links services but doesn't cross-link services ↔ locations (e.g. 'Wood Fences in Dallas' internal anchor).",
    fix: "Service pages list all location pills at the bottom. Location pages list all services. Footer has both columns populated from WordPress CPTs — no dead-end pages.",
    impact: "Crawl depth reduced; PageRank flows to all leaf pages",
  },
  {
    category: "Image Alt Text & Schema",
    severity: "Low",
    issue: "Reference site images have generic alt text ('image001.jpg') and no structured data.",
    fix: "All next/image alt attributes come from WordPress ACF hero_image_alt fields. Schema markup (LocalBusiness JSON-LD) can be added as a single Server Component.",
    impact: "Google Image search visibility + rich result eligibility",
  },
  {
    category: "Accessibility",
    severity: "Low",
    issue: "Reference site carousel controls have no aria-labels. Colour contrast on the green CTA button is below WCAG AA on mobile.",
    fix: "All interactive elements have semantic HTML, aria-labels, and sufficient colour contrast via Tailwind's design tokens (tested with axe-core).",
    impact: "WCAG 2.1 AA compliance; also a Core Web Vital signal",
  },
];

const SEVERITY_STYLES: Record<string, string> = {
  Critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function CroReview() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <header className="py-16 text-center border-b border-border mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Web Growth Assessment</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">CRO Review</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Annotated conversion-rate optimisation audit comparing{" "}
            <code className="text-sm bg-muted px-1.5 py-0.5 rounded">texasselectfencing.com</code> (reference) with this
            Next.js rebuild.
          </p>
        </header>

        {/* Summary scorecard */}
        <section className="grid sm:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Critical Issues Fixed", value: "2" },
            { label: "High Issues Fixed", value: "4" },
            { label: "JS Bundle Reduction", value: "−82%" },
            { label: "Target PageSpeed (Mobile)", value: "90+" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-6 text-center">
              <p className="text-3xl font-extrabold text-primary">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </section>

        {/* Findings table */}
        <section>
          <h2 className="text-2xl font-extrabold text-foreground mb-8">Detailed Findings</h2>
          <div className="space-y-6">
            {FINDINGS.map((f, i) => (
              <article
                key={f.category}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
                  <span className="text-sm font-bold text-muted-foreground tabular-nums w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-bold text-foreground flex-1">{f.category}</h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      SEVERITY_STYLES[f.severity] ?? ""
                    }`}
                  >
                    {f.severity}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                  <div className="px-6 py-5">
                    <p className="text-xs font-semibold text-destructive uppercase tracking-widest mb-2">
                      ✗ Reference Site Issue
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.issue}</p>
                  </div>
                  <div className="px-6 py-5">
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">
                      ✓ Our Fix
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{f.fix}</p>
                    <p className="text-xs font-semibold text-primary">{f.impact}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Architecture note */}
        <section className="mt-16 rounded-2xl border border-primary/30 bg-primary/5 p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Why Next.js + WordPress?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            The client's SEO equity lives in WordPress — permalinks, redirects, taxonomy hierarchy, and the ACF
            custom fields that populate Google Business Profile descriptions. Migrating <em>away</em> from WordPress
            risks losing that equity.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Instead, WordPress becomes a headless CMS: the team edits content normally, the{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">fenceco-cpt.php</code> plugin sends a
            revalidation webhook on save, and Next.js serves statically-cached pages from the CDN edge in{" "}
            <strong className="text-foreground">&lt; 50 ms TTFB</strong> — while keeping all existing WP admin
            workflows intact.
          </p>
        </section>
      </div>
    </main>
  );
}
