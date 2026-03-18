import React from "react";
import { RemoteImage } from "@/components/RemoteImage";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrustBar } from "@/components/TrustBar";
import { QuoteForm } from "@/components/QuoteForm";
import { ReviewsStrip } from "@/components/ReviewsStrip";
import { QuoteCtaSection } from "@/components/QuoteCtaSection";
import { GoogleReviewBadge } from "@/components/GoogleReviewBadge";
import { FinancingSection } from "@/components/FinancingSection";
import { getAllServices, getAllLocations, getRecentProjects, getHomePage, getMediaForPost } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dallas Fence Company | Texas Select Fencing",
  description:
    "Texas Select Fencing delivers fast, professional fence installation across Dallas–Fort Worth. Fences, gates, and outdoor living upgrades with free estimates.",
};

// Service area counties with cities — matches reference site exactly
const SERVICE_AREAS = [
  {
    county: "Dallas County",
    cities: [
      { name: "Addison", slug: "addison" },
      { name: "Carrollton", slug: "carrollton" },
      { name: "Dallas", slug: "dallas" },
      { name: "Farmers Branch", slug: "farmers-branch" },
      { name: "Garland", slug: "garland" },
      { name: "Grand Prairie", slug: "grand-prairie" },
      { name: "Highland Park", slug: "highland-park" },
      { name: "Irving", slug: "irving" },
      { name: "Mesquite", slug: "mesquite" },
      { name: "Richardson", slug: "richardson" },
    ],
  },
  {
    county: "Collin County",
    cities: [
      { name: "Allen", slug: "allen" },
      { name: "Anna", slug: "anna" },
      { name: "Celina", slug: "celina" },
      { name: "Fairview", slug: "fairview" },
      { name: "Farmersville", slug: "farmersville" },
      { name: "Frisco", slug: "frisco" },
      { name: "Lavon", slug: "lavon" },
      { name: "Lucas", slug: "lucas" },
      { name: "McKinney", slug: "mckinney" },
      { name: "Melissa", slug: "melissa" },
      { name: "Murphy", slug: "murphy" },
      { name: "Parker", slug: "parker" },
      { name: "Plano", slug: "plano" },
      { name: "Princeton", slug: "princeton" },
      { name: "Prosper", slug: "prosper" },
      { name: "Sachse", slug: "sachse" },
      { name: "Van Alstyne", slug: "van-alstyne" },
      { name: "Wylie", slug: "wylie" },
    ],
  },
  {
    county: "Denton County",
    cities: [
      { name: "Argyle", slug: "argyle" },
      { name: "Corinth", slug: "corinth" },
      { name: "Denton", slug: "denton" },
      { name: "Flower Mound", slug: "flower-mound" },
      { name: "Krum", slug: "krum" },
      { name: "Lake Dallas", slug: "lake-dallas" },
      { name: "Lakewood Village", slug: "lakewood-village" },
      { name: "Lewisville", slug: "lewisville" },
      { name: "Little Elm", slug: "little-elm" },
      { name: "Northlake", slug: "northlake" },
      { name: "Ponder", slug: "ponder" },
      { name: "Sanger", slug: "sanger" },
      { name: "The Colony", slug: "the-colony" },
    ],
  },
];

export default async function Home() {
  const [services, locations, projects, homePage] = await Promise.all([
    getAllServices(),
    getAllLocations(),
    getRecentProjects(6),
    getHomePage(),
  ]);

  const acf = homePage?.acf;
  const heroHeadline = acf?.hero_headline ?? "Dallas Fence Company – Fast & Professional Fence Installation";
  const heroSubheadline =
    acf?.hero_subheadline ??
    "We specialize in building stunning fences and outdoor living spaces that make your backyard feel like home.";
  const heroImage =
    acf?.hero_image_url ??
    "https://cdn.prod.website-files.com/62c785fe02fc516f0ee97490/647cbf98df963a10c43bfe8d_horizontal-3-min.jpg";
  const phone = acf?.phone_primary ?? "(214) 558-9169";
  const phoneSec = acf?.phone_secondary ?? "(214) 558-9169";
  const email = acf?.email ?? "contact@select-fencing.com";
  const address = acf?.address ?? "Dallas, TX 75204";

  const reviewLink = "https://g.page/r/CXHgqCdfbV7eEB0/review";
  const serviceMap = new Map(services.map((service) => [service.slug, service]));
  const CardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className ?? "w-5 h-5"} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h16" />
      <path d="M12 4v16" />
    </svg>
  );

  const serviceCardDefs = [
    {
      slug: "wood-fencing",
      title: "Wood Fence",
      description: "Classic cedar and pine privacy fencing built for curb appeal.",
      icon: CardIcon,
    },
    {
      slug: "wrought-iron-fences-2",
      title: "Wrought Iron Fence",
      description: "Elegant, durable iron fencing for security and style.",
      icon: CardIcon,
    },
    {
      slug: "chain-link-fencing",
      title: "Chain Link Fence",
      description: "Low-maintenance chain link options for residential and commercial sites.",
      icon: CardIcon,
    },
    {
      slug: "pipe-fences",
      title: "Pipe Fence",
      description: "Strong steel pipe fencing that blends ranch style with durability.",
      icon: CardIcon,
    },
    {
      slug: "ranch-fences",
      title: "Ranch Fence",
      description: "Open, horizontal fencing that frames acreage and property lines.",
      icon: CardIcon,
    },
    {
      slug: "composite-fences",
      title: "Composite Fence",
      description: "Modern composite panels with long-term durability and clean lines.",
      icon: CardIcon,
    },
    {
      slug: "r-panel-fences",
      title: "R-Panel Fence",
      description: "Cost-effective metal fencing for privacy and protection.",
      icon: CardIcon,
    },
    {
      slug: "driveway-swing-gates",
      title: "Swing Gates",
      description: "Custom driveway swing gates with manual or automated options.",
      icon: CardIcon,
    },
    {
      slug: "automatic-sliding-gates",
      title: "Slide Gates",
      description: "Space-saving sliding gates designed for driveways and access points.",
      icon: CardIcon,
    },
    {
      slug: "retaining-walls",
      title: "Retaining Walls",
      description: "Stone and concrete retaining walls that elevate outdoor living.",
      icon: CardIcon,
    },
  ].map((fallback) => {
    const service = serviceMap.get(fallback.slug);
    return { fallback, service };
  });

  // Fetch each service's own attached media in parallel (scoped to that post ID).
  // Falls back to ACF hero_image_url, then featured media embed, then placeholder.
  const serviceCards = await Promise.all(
    serviceCardDefs.map(async ({ fallback, service }) => {
      let attachedImageUrl: string | undefined;
      if (service?.id) {
        const attached = await getMediaForPost(service.id);
        attachedImageUrl = attached?.source_url;
      }
      return {
        slug: fallback.slug,
        title: service?.title.rendered ?? fallback.title,
        description: service?.acf?.short_description ?? service?.excerpt.rendered ?? fallback.description,
        image:
          fallback.slug === "r-panel-fences"
            ? "https://cdn.prod.website-files.com/62c785fe02fc51da67e974b2/69ab25ca54ffe1c3a4789dca_R-Panel%20Fence%20Installation%20Dallas-26.jpg"
            : service?.acf?.hero_image_url ??
              service?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
              attachedImageUrl ??
              `https://placehold.co/640x420/eeeeee/2a2a2a?text=${encodeURIComponent(fallback.title)}`,
        alt: service?.acf?.hero_image_alt ?? fallback.title,
        icon: fallback.icon,
      };
    })
  );

  return (
    <>
      <Navbar services={services} phone={phone} />

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative h-[560px] md:h-[620px] flex items-center justify-center text-center">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroImage}
        >
          <source src="/default.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-6">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-[0.2em] uppercase mb-4">
            Texas Select Fencing
          </h1>
          <p className="text-white/90 text-base md:text-lg italic mb-6">
            {heroHeadline}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#quote"
              className="inline-flex items-center gap-2 h-11 px-6 border border-primary text-white font-semibold uppercase tracking-wide hover:bg-primary/90 transition-all"
            >
              Get a Quote
            </Link>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 h-11 px-6 border border-primary text-white font-semibold uppercase tracking-wide hover:bg-primary/90 transition-all"
            >
              Call Us
            </a>
            <Link
              href={reviewLink}
              target="_blank"
              className="inline-flex items-center gap-2 h-11 px-6 border border-primary text-white font-semibold uppercase tracking-wide hover:bg-primary/90 transition-all"
            >
              Leave Review
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ───────────────────────────────────────────────── */}
      <TrustBar />

      {/* ─── SERVICES GRID ───────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-10 text-left">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Fence Services</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              <span className="block">Expert Fence &amp; Gate Installation</span>
              <span className="block">Across Dallas–Fort Worth</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              From classic wood privacy fences to ornamental iron, we install, repair, and maintain every fence type.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.slice(0, 9).map((card, i) => (
              <li key={card.slug} className={`animate-fade-up animation-delay-${Math.min(i * 100, 300)}`}>
                <Link
                  href={`/services/${card.slug}`}
                  className="group block rounded-none overflow-hidden bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border-b-4 border-b-primary"
                >
                  <div className="relative h-72 bg-muted overflow-hidden">
                    <RemoteImage
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {card.icon ? (
                      <div className="absolute bottom-6 left-6 w-12 h-12 bg-primary text-white flex items-center justify-center shadow-lg z-10 border-2 border-white">
                        <card.icon className="w-6 h-6" />
                      </div>
                    ) : null}
                  </div>
                  <div className="p-8 pt-8 flex-grow">
                    <h3
                      className="text-2xl font-black text-foreground group-hover:text-primary transition-colors mb-4 uppercase tracking-tight"
                      dangerouslySetInnerHTML={{ __html: card.title }}
                    />
                    <p
                      className="text-base text-muted-foreground leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    />
                    <span className="inline-block text-primary font-bold uppercase tracking-widest text-sm border-b-2 border-primary pb-1 group-hover:border-primary/50 transition-all">
                      Learn More
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── LOCATION MAP (MID-PAGE) ─────────────────────────────────── */}
      <section className="relative border-y border-border bg-muted/10">
        <div className="w-full py-16">
          <div className="relative min-h-[420px] rounded-none overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429011.7078174374!2d-97.28256!3d32.7766642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9911a8a9b3c7%3A0x98e70f7b5d7e0bc4!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Texas Select Fencing Dallas Map"
              className="absolute inset-0 w-full h-full"
            />
            <div className="relative z-10">
              <div className="absolute left-0 top-0 bg-white border-2 border-primary shadow-lg p-5 w-[300px] -translate-y-1">
                <div className="relative h-28 overflow-hidden">
                  <RemoteImage
                    src="https://cdn.prod.website-files.com/62c785fe02fc516f0ee97490/64efa62def666476a286f965_office-2.webp"
                    alt="Texas Select Fencing office"
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-extrabold text-foreground">Texas Select Fencing</h3>
                  <p className="text-sm text-muted-foreground">Dallas, TX 75204</p>
                </div>
                <div className="space-y-3 text-sm text-foreground mt-4">
                  <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Phone className="w-4 h-4 text-primary" /> {phone}
                  </a>
                  <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 text-primary" /> {email}
                  </a>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" /> {address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RECENT PROJECTS ─────────────────────────────────────────── */}
      {projects.length > 0 && (
        <section id="projects" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-left mb-12">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Our Past Work</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
                <span className="block">Recent Fences &amp; Gates We Built</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Recent projects completed for homeowners and businesses across DFW.
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((p) => {
                const isRPanel = p.slug?.includes("r-panel") || p.title.rendered.toLowerCase().includes("r-panel");
                const imgUrl =
                  isRPanel
                    ? "https://cdn.prod.website-files.com/62c785fe02fc51da67e974b2/69ab25ca54ffe1c3a4789dca_R-Panel%20Fence%20Installation%20Dallas-26.jpg"
                    : p.acf?.hero_image_url ||
                      p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "https://placehold.co/600x400/1a2332/ffffff?text=Project";
                const date = p.date ? new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : null;
                return (
                  <li key={p.id} className="animate-fade-up">
                    <Link
                      href={`/projects/${p.slug ?? p.id}`}
                      className="group block rounded-none overflow-hidden bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border-b-4 border-b-primary"
                    >
                      <div className="relative h-72 bg-muted overflow-hidden">
                        <RemoteImage
                          src={imgUrl}
                          alt={p.title.rendered}
                          fill
                          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-8 flex-grow">
                        <h3
                          className="text-xl font-black text-foreground group-hover:text-primary transition-colors mb-3 uppercase tracking-tight"
                          dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                        />
                        <div className="flex items-center justify-between mt-auto">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            {p.acf?.linear_feet ? `${p.acf.linear_feet} LF` : ""}
                            {p.acf?.linear_feet && date ? " · " : ""}
                            {date}
                          </p>
                          <span className="text-xs font-bold text-primary uppercase tracking-widest border-b border-primary">
                            View Project
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="text-center mt-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 h-11 px-8 border-2 border-primary text-primary font-bold rounded-md hover:bg-primary hover:text-white transition-all text-sm"
              >
                See All Of Our Projects Here <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <FinancingSection />

      <ReviewsStrip />

      {/* ─── MID-PAGE CTA + QUOTE FORM ───────────────────────────────── */}
      <QuoteCtaSection services={services} phone={phone} phoneSecondary={phoneSec} email={email} />

      <GoogleReviewBadge />

      {/* ─── SERVICE AREAS BY COUNTY ─────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">Service Areas</h2>
            <p className="text-muted-foreground max-w-3xl">
              We operate all throughout the Dallas–Fort Worth Metroplex. We provide services to the following areas:
            </p>
          </div>

          <div className="space-y-12">
            {SERVICE_AREAS.map((area) => (
              <div key={area.county}>
                <h3 className="text-xl font-extrabold text-primary mb-4">{area.county}</h3>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3">
                  {area.cities.map((city) => (
                    <li key={city.slug} className="flex items-center gap-2">
                      <span className="text-primary text-lg leading-none">•</span>
                      <Link
                        href={`/service-area/${city.slug}-fence-company`}
                        className="text-base text-foreground underline-offset-4 hover:text-primary hover:underline"
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer services={services} locations={locations} acf={acf} />
    </>
  );
}
