import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { getAllServices, getAllLocations, getHomePage } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Texas Select Fencing",
  description:
    "Learn about Texas Select Fencing, our Dallas–Fort Worth fence specialists, and the values that guide every project.",
};

export default async function AboutPage() {
  const [services, locations, homePage] = await Promise.all([
    getAllServices(),
    getAllLocations(),
    getHomePage(),
  ]);

  const phone = homePage?.acf?.phone_primary ?? "(214) 558-9169";

  return (
    <PageShell
      services={services}
      locations={locations}
      acf={homePage?.acf}
      phone={phone}
      phoneSecondary={homePage?.acf?.phone_secondary ?? phone}
      email={homePage?.acf?.email ?? "contact@select-fencing.com"}
      includeSharedSections={false}
    >
      <PageHero
        eyebrow="About Us"
        title="Texas Select Fencing"
        subtitle="Dallas–Fort Worth fence specialists focused on craftsmanship, clear communication, and reliable timelines."
        services={services}
        phone={phone}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Texas Select Fencing is a locally owned team serving Dallas–Fort Worth with premium fence
              installations. We focus on wood, wrought iron, chain link, and custom gates that fit your property,
              HOA requirements, and budget.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our process is built around clear expectations — transparent quotes, clean job sites, and proactive
              updates from estimate to final walkthrough. We install fences that look great on day one and keep
              performing for years.
            </p>
          </div>
          <div className="bg-muted/20 border border-border p-6">
            <h3 className="text-lg font-bold text-foreground mb-3">What We’re Known For</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Fast, detailed estimates with no surprises.</li>
              <li>• Premium materials: cedar, powder-coated iron, and galvanized chain link.</li>
              <li>• HOA and permit guidance for Dallas–Fort Worth neighborhoods.</li>
              <li>• Residential, commercial, and multi-family installations.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Craftsmanship", text: "Every build is measured, level, and finished to last." },
              { title: "Transparency", text: "Clear line-item pricing and honest recommendations." },
              { title: "Reliability", text: "We show up on time and finish when we say we will." },
              { title: "Service", text: "Responsive communication before, during, and after install." },
            ].map((value) => (
              <div key={value.title} className="border border-border bg-white p-5">
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">Request a Free Estimate</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            We encourage homeowners to compare multiple quotes. We’ll make sure you have the information you need
            to make the best choice for your property.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center justify-center h-11 px-6 border border-primary text-primary font-semibold uppercase tracking-wide hover:bg-primary hover:text-white transition-all"
          >
            Start Your Quote
          </a>
        </div>
      </section>
    </PageShell>
  );
}
