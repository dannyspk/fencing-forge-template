import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { PricingTiers } from "@/components/PricingTiers";
import { QuoteForm } from "@/components/QuoteForm";
import { getAllServices, getAllLocations, getHomePage, getServiceBySlug } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wood Fence Pricing | Texas Select Fencing",
  description:
    "Wood fence pricing ranges and factors for Dallas–Fort Worth. Explore typical ranges and request a free estimate.",
};

export default async function WoodPricingPage() {
  const [services, locations, homePage, service] = await Promise.all([
    getAllServices(),
    getAllLocations(),
    getHomePage(),
    getServiceBySlug("wood-fences"),
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
        title="Wood Fence Pricing"
        subtitle="Typical ranges for cedar and pine wood fence projects across Dallas–Fort Worth."
        services={services}
        phone={phone}
      />

      <PricingTiers
        title="Typical Wood Fence Price Ranges"
        description="Prices vary by linear footage, wood grade, post type, and site conditions. These ranges reflect common DFW projects."
        tiers={tiers}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">What Impacts Wood Fence Cost?</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Linear footage and fence height (6′ vs 8′).</li>
              <li>• Cedar vs pine, and board-on-board vs side-by-side styles.</li>
              <li>• Steel posts and concrete depth requirements.</li>
              <li>• Gates, staining, and decorative upgrades.</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-6">
              We’ll provide a detailed estimate after a quick site visit so you know exactly what to expect.
            </p>
          </div>
          <div className="border border-primary/60 bg-white p-6">
            <QuoteForm services={services} preselectedService="wood-fences" variant="detailed" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
