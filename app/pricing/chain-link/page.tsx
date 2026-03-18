import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { PricingTiers } from "@/components/PricingTiers";
import { QuoteForm } from "@/components/QuoteForm";
import { getAllServices, getAllLocations, getHomePage, getServiceBySlug } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chain Link Fence Pricing | Texas Select Fencing",
  description:
    "Chain link fence pricing ranges and factors for Dallas–Fort Worth. Get a fast, free estimate.",
};

export default async function ChainLinkPricingPage() {
  const [services, locations, homePage, service] = await Promise.all([
    getAllServices(),
    getAllLocations(),
    getHomePage(),
    getServiceBySlug("chain-link-fences"),
  ]);

  const phone = homePage?.acf?.phone_primary ?? "(214) 558-9169";
  const tiers = service?.acf?.price_tiers ?? [];

  return (
    <PageShell
      services={services}
      locations={locations}
      acf={homePage?.acf}
      phone={phone}
      phoneSecondary={homePage?.acf?.phone_secondary ?? phone}
      email={homePage?.acf?.email ?? "contact@select-fencing.com"}
    >
      <PageHero
        eyebrow="Pricing"
        title="Chain Link Fence Pricing"
        subtitle="Typical pricing ranges for galvanized, vinyl-coated, and privacy-slatted chain link fencing."
        services={services}
        phone={phone}
      />

      <PricingTiers
        title="Typical Chain Link Price Ranges"
        description="Chain link is the most cost-effective way to fence large areas. Pricing changes with gauge, coating, and height."
        tiers={tiers}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">What Impacts Chain Link Cost?</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Wire gauge and fence height (4′–8′).</li>
              <li>• Galvanized vs vinyl-coated finishes.</li>
              <li>• Privacy slats and security additions like barbed wire.</li>
              <li>• Gates, access control, and commercial-grade posts.</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-6">
              We’ll verify measurements onsite and provide a clear, line-item estimate.
            </p>
          </div>
          <div className="border border-primary/60 bg-white p-6">
            <QuoteForm services={services} preselectedService="chain-link-fences" variant="detailed" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
