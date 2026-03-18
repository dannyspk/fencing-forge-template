import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";
import { getAllServices, getAllLocations, getHomePage } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team | Texas Select Fencing",
  description:
    "Get to know the Texas Select Fencing team serving Dallas–Fort Worth.",
};

const TEAM = [
  {
    name: "Dylan Snider",
    role: "Owner & President",
    bio: "Leads operations across DFW with a focus on craftsmanship and customer experience.",
  },
  {
    name: "DJ",
    role: "Field Manager",
    bio: "Coordinates installations and ensures every project meets our build standards.",
  },
  {
    name: "Jennifer Pineda",
    role: "Administrative Manager",
    bio: "Keeps schedules, estimates, and customer communication running smoothly.",
  },
  {
    name: "Lina Robles",
    role: "Assistant Field Manager",
    bio: "Supports onsite crews and quality checks across active projects.",
  },
  {
    name: "John DeLaGarza",
    role: "Sales Representative",
    bio: "Helps customers choose the right fence, gate, and outdoor solutions.",
  },
];

export default async function MeetTheTeamPage() {
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
        eyebrow="Our Team"
        title="Meet the Texas Select Fencing Team"
        subtitle="Dedicated professionals serving Dallas–Fort Worth with reliable fencing solutions."
        services={services}
        phone={phone}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <article key={member.name} className="border border-border bg-white p-6">
                <div className="w-14 h-14 bg-primary/10 text-primary font-bold flex items-center justify-center text-lg mb-4">
                  {member.name.slice(0, 1)}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
