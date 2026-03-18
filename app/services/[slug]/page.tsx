import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { QuoteForm } from "@/components/QuoteForm";
import { getAllServices, getServiceBySlug, getAllLocations, getHomePage, getRecentProjects } from "@/lib/wordpress";
import type { Metadata } from "next";
import { RemoteImage } from "@/components/RemoteImage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title.rendered} in Dallas–Fort Worth | FenceCo`,
    description: service.acf?.short_description || service.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  const [service, services, locations, projects, homePage] = await Promise.all([
    getServiceBySlug(slug),
    getAllServices(),
    getAllLocations(),
    getRecentProjects(6),
    getHomePage(),
  ]);

  if (!service) notFound();

  const acf = service.acf;
  const phone = homePage?.acf?.phone_primary ?? "(214) 558-9169";
  const phoneSecondary = homePage?.acf?.phone_secondary ?? phone;
  const email = homePage?.acf?.email ?? "contact@select-fencing.com";
  const heroImage =
    service._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    acf?.hero_image_url ??
    "https://placehold.co/1200x700/1a1a2e/ffffff?text=Service+Hero";

  const displayProjects = projects.slice(0, 3);

  return (
    <PageShell
      services={services}
      locations={locations}
      acf={homePage?.acf}
      phone={phone}
      phoneSecondary={phoneSecondary}
      email={email}
    >

      {/* ─── HERO + FORM PANEL ────────────────────────────────────────── */}
      <section className="relative min-h-[520px] pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <RemoteImage
            src={heroImage}
            alt={acf?.hero_image_alt ?? service.title.rendered}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <div className="lg:col-span-2 text-white/80 text-sm flex flex-wrap items-center gap-1 mb-4">
            <Link href="/" className="hover:text-white underline-offset-4 hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-white underline-offset-4 hover:underline">
              Services
            </Link>
            <span>/</span>
            <span className="text-white">{service.title.rendered.replace(" Installation", "")}</span>
          </div>
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              {service.title.rendered} in Dallas–Fort Worth
            </h1>
            <p
              className="text-white/90 max-w-xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.excerpt.rendered }}
            />
          </div>
          <div className="bg-white border border-primary/60 shadow-lg p-6">
            <h2 className="text-xl font-extrabold text-foreground text-center">
              {acf?.tagline ?? "Handcrafted Wood Fences Built On-site"}
            </h2>
            <div className="h-0.5 w-20 bg-primary mx-auto my-3" />
            <p className="text-center text-sm text-muted-foreground mb-4">Let's Get Started</p>
            <QuoteForm
              services={services}
              preselectedService={slug}
              variant="detailed"
              showServiceSelect={false}
            />
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>BBB</span>
              <span>Google</span>
              <span>Angi</span>
              <span>Yelp</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCT STYLES ───────────────────────────────────── */}
      {acf?.styles && acf.styles.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 grid lg:grid-cols-[1fr,2fr] gap-10 items-start">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Our Featured Products</p>
              <h2 className="text-3xl font-extrabold text-foreground mb-4">
                Explore our {service.title.rendered.replace(" Installation", "").toLowerCase()} options to discover
                the best fit for your space.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              {acf.styles.slice(0, 4).map((style) => (
                <div key={style.name} className="space-y-4">
                  <div className="relative h-48 border border-border bg-white">
                    <RemoteImage
                      src={style.image_url}
                      alt={style.name}
                      fill
                      sizes="(max-width:640px) 100vw, 50vw"
                      className="object-contain p-6"
                    />
                  </div>
                  <h3 className="text-primary font-semibold">{style.name}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {style.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="text-primary">•</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── PRICING TIERS ─────────────────────────────────────────────── */}
      {acf?.price_tiers && acf.price_tiers.length > 0 && (
        <section id="pricing" className="py-20 bg-background">
          <div className="container mx-auto px-6 text-center">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Estimate Your Costs</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              How Much Will Your {service.title.rendered.replace(" Installation", "")} Cost?
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-10">
              {service.title.rendered} is a versatile and timeless solution, customizable to your style and needs.
              Contact us today, and we’ll help you find the perfect design for your space and budget.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {acf.price_tiers.map((tier) => (
                <div key={tier.label} className="border border-border bg-white">
                  <div className="relative h-40 bg-muted/20">
                    <RemoteImage
                      src={heroImage}
                      alt={tier.label}
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground">{tier.label} {service.title.rendered.replace(" Installation", "")}</h3>
                    <p className="text-3xl font-extrabold text-primary mt-3">{tier.price_range}</p>
                    <p className="text-sm text-muted-foreground mt-2">{tier.linear_feet}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              *These prices are average estimates and will vary based on the actual linear footage and design selections.
            </p>
          </div>
        </section>
      )}

      {/* ─── UPGRADES ──────────────────────────────────────────────────── */}
      {acf?.upgrades && acf.upgrades.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">Wood Fence Upgrades We Offer</h2>
            <p className="text-muted-foreground max-w-2xl mb-8">
              There&apos;s many ways you can upgrade your fence. See some of our popular wood fence upgrades below.
            </p>
            <div className="flex flex-wrap gap-6 mb-10">
              {acf.upgrades.map((upgrade) => (
                <div key={upgrade.name} className="text-center">
                  <div className="w-20 h-20 rounded-full border border-border overflow-hidden mx-auto mb-2 bg-white relative">
                    <RemoteImage src={upgrade.image_url} alt={upgrade.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <p className="text-sm text-muted-foreground">{upgrade.name}</p>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-10 items-start">
              <div className="relative h-72 border border-border bg-white">
                <RemoteImage src={acf.upgrades[0].image_url} alt={acf.upgrades[0].name} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{acf.upgrades[0].name}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Enhanced Visual Appeal: {acf.upgrades[0].description}</li>
                  <li>• Cost: $</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── PORTFOLIO ─────────────────────────────────────────────────── */}
      {displayProjects.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 text-center">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Recent {service.title.rendered.replace(" Installation", "")} Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
              Check out some of our recent projects, or click here to see all past wood fence projects.
            </p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {displayProjects.map((p) => {
                const imgUrl =
                  p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
                  "https://placehold.co/600x400/1a1a2e/ffffff?text=Project";
                return (
                  <li key={p.id} className="border border-border bg-white">
                    <div className="relative h-48">
                      <RemoteImage
                        src={imgUrl}
                        alt={p.title.rendered}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-semibold text-foreground">{p.title.rendered}</h3>
                      <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }} />
                      <span className="inline-flex items-center text-sm text-primary">View project →</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

    </PageShell>
  );
}
