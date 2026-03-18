import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { TrustBar } from "@/components/TrustBar";
import { QuoteForm } from "@/components/QuoteForm";
import { RemoteImage } from "@/components/RemoteImage";
import { getAllLocations, getLocationBySlug, getAllServices, getRecentProjects, getHomePage } from "@/lib/wordpress";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const locations = await getAllLocations();
  return locations.map((l) => ({ slug: `${l.slug}-fence-company` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.replace(/-fence-company$/, "");
  const location = await getLocationBySlug(normalizedSlug);
  if (!location) return {};
  const city = location.acf?.city ?? location.title.rendered;
  const county = location.acf?.county ? `, ${location.acf.county}` : "";
  return {
    title: `Fence Installation in ${city}${county} | FenceCo`,
    description:
      location.acf?.intro_text?.slice(0, 160) ??
      `Top-rated fence contractor serving ${city}. Wood, wrought iron, chain link & custom gates. Free estimates.`,
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const normalizedSlug = slug.replace(/-fence-company$/, "");

  const [location, services, projects, homePage] = await Promise.all([
    getLocationBySlug(normalizedSlug),
    getAllServices(),
    getRecentProjects(6),
    getHomePage(),
  ]);

  if (!location) notFound();

  const acf = location.acf;
  const city = acf?.city ?? location.title.rendered;
  const county = acf?.county ?? "";
  const phone = homePage?.acf?.phone_primary ?? "(214) 558-9169";
  const phoneSecondary = homePage?.acf?.phone_secondary ?? phone;
  const email = homePage?.acf?.email ?? "contact@select-fencing.com";
  const heroHeadline = acf?.hero_headline ?? `Top-Rated Fence Installation in ${city}, TX`;
  const heroSubheadline =
    acf?.hero_subheadline ?? `Serving ${city}${county ? ` and all of ${county} County` : ""} with premium residential & commercial fencing.`;

  return (
    <PageShell
      services={services}
      locations={[]}
      acf={homePage?.acf}
      phone={phone}
      phoneSecondary={phoneSecondary}
      email={email}
    >

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center pt-24 pb-16 overflow-hidden">
        {acf?.hero_image_url && (
          <div className="absolute inset-0 z-0">
            <RemoteImage
              src={acf.hero_image_url}
              alt={`${city} Fence Company`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fade-up">
            <p className="flex items-center gap-1.5 text-sm font-bold text-primary mb-3 uppercase tracking-wider">
              <MapPin className="w-4 h-4" /> Serving {city}{county ? `, ${county}` : ""}, TX
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              {heroHeadline}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-lg leading-relaxed font-medium">
              {heroSubheadline}
            </p>
            {acf?.intro_text && (
              <p className="text-lg text-white/80 leading-relaxed max-w-lg italic">
                {acf.intro_text}
              </p>
            )}
          </div>
          <div className="animate-fade-up animation-delay-200 lg:ml-auto w-full max-w-md">
            <QuoteForm services={services} variant="hero" />
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─────────────────────────────────────────────────── */}
      <TrustBar />

      {/* ─── SERVICES IN CITY ──────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Fence Services in {city}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every fence type, installed to code, on time and on budget.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <li key={s.slug} className={`animate-fade-up animation-delay-${Math.min(i * 100, 300)}`}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group block rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all p-6 h-full"
                >
                  {s.acf?.tagline && (
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">{s.acf.tagline}</p>
                  )}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {s.title.rendered}
                  </h3>
                  <p
                    className="text-sm text-muted-foreground line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: s.excerpt.rendered }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── RECENT PROJECTS IN CITY ───────────────────────────────────── */}
      {(() => {
        const cityProjects = projects.filter(
          (p) => p.acf?.location_city?.toLowerCase() === city.toLowerCase()
        );
        const displayProjects = cityProjects.length > 0 ? cityProjects : projects.slice(0, 3);
        return displayProjects.length > 0 ? (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-foreground mb-3">
                  Recent Projects in {city}
                </h2>
              </div>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayProjects.map((p) => {
                  const imgUrl =
                    p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
                    "https://placehold.co/600x400/1a1a2e/ffffff?text=Project";
                  return (
                    <li key={p.id} className="rounded-2xl overflow-hidden border border-border bg-card">
                      <div className="relative h-48">
                        <Image
                          src={imgUrl}
                          alt={p.title.rendered}
                          fill
                          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-foreground text-sm">{p.title.rendered}</h3>
                        {p.acf?.linear_feet && (
                          <p className="text-xs text-muted-foreground mt-1">{p.acf.linear_feet} linear ft</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null;
      })()}

      {/* ─── CITY FAQ ──────────────────────────────────────────────────── */}
      {acf?.faqs && acf.faqs.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl font-extrabold text-foreground text-center mb-12">
              {city} Fencing FAQ
            </h2>
            <dl className="space-y-6">
              {acf.faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-border bg-card p-6">
                  <dt className="font-semibold text-foreground mb-2">{faq.question}</dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ─── NEARBY CITIES ─────────────────────────────────────────────── */}
      {acf?.nearby_cities && acf.nearby_cities.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-extrabold text-foreground mb-8">
              Also Serving Near {city}
            </h2>
            <ul className="flex flex-wrap justify-center gap-3">
              {acf.nearby_cities.map((citySlug) => (
                <li key={citySlug}>
                  <Link
                    href={`/service-area/${citySlug}`}
                    className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all capitalize"
                  >
                    {citySlug.replace(/-/g, " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ─── CTA BANNER ────────────────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-primary-foreground mb-4">
            Get a Free Estimate in {city}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
            Same-day quotes. Most installs completed in 1–2 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#quote"
              className="h-12 px-8 rounded-md bg-background text-foreground font-semibold text-sm hover:brightness-105 active:scale-[0.98] transition-all inline-flex items-center justify-center"
            >
              Request Estimate Online
            </Link>
            <a
              href={`tel:${phone}`}
              className="h-12 px-8 rounded-md border-2 border-primary-foreground text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 active:scale-[0.98] transition-all inline-flex items-center justify-center"
            >
              Call {phone}
            </a>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
