import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getAllServices, getAllLocations, getHomePage, getRecentProjects } from "@/lib/wordpress";
import type { Metadata } from "next";
import { RemoteImage } from "@/components/RemoteImage";
import { ArrowRight, Calendar, Ruler, Phone, Mail, MapPin } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getRecentProjects(100);
  return projects.map((p) => ({ slug: p.slug }));
}

async function getProjectBySlug(slug: string) {
  const projects = await getRecentProjects(100);
  return projects.find((p) => p.slug === slug) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title.rendered} | Texas Select Fencing Project`,
    description: project.acf?.short_description || project.excerpt?.rendered?.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const [project, services, locations, allProjects, homePage] = await Promise.all([
    getProjectBySlug(slug),
    getAllServices(),
    getAllLocations(),
    getRecentProjects(6),
    getHomePage(),
  ]);

  if (!project) notFound();

  const acf = project.acf;
  const phone = homePage?.acf?.phone_primary ?? "(214) 558-9169";
  const phoneSecondary = homePage?.acf?.phone_secondary ?? phone;
  const email = homePage?.acf?.email ?? "contact@select-fencing.com";
  
  const heroImage =
    project._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
    acf?.hero_image_url ??
    "https://placehold.co/1200x700/1a1a2e/ffffff?text=Project+Hero";

  const date = project.date ? new Date(project.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : null;

  return (
    <PageShell
      services={services}
      locations={locations}
      acf={homePage?.acf}
      phone={phone}
      phoneSecondary={phoneSecondary}
      email={email}
    >
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[450px] pt-32 pb-20 flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <RemoteImage
            src={heroImage}
            alt={project.title.rendered}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-6 text-white">
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 mb-6 uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#projects" className="hover:text-primary transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-white">{project.title.rendered}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-[0.9]">
            {project.title.rendered}
          </h1>
          
          <div className="flex flex-wrap gap-8 py-6 border-y border-white/20 mt-8">
            {date && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Completed</p>
                  <p className="font-bold">{date}</p>
                </div>
              </div>
            )}
            {acf?.linear_feet && (
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Scope</p>
                  <p className="font-bold">{acf.linear_feet} Linear Feet</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Location</p>
                <p className="font-bold">Dallas–Fort Worth, TX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTION ─────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,350px] gap-16">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-black uppercase tracking-tight text-foreground mb-8 border-l-4 border-primary pl-6">
                Project Overview
              </h2>
              <div 
                className="text-muted-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ __html: project.content?.rendered || project.excerpt?.rendered || "" }} 
              />
              
              {/* If there are more project details in ACF, they can go here */}
            </div>

            <aside className="space-y-8">
              <div className="bg-muted p-8 border-b-4 border-primary">
                <h3 className="text-xl font-black uppercase tracking-tight mb-6">Need a similar fence?</h3>
                <p className="text-sm text-muted-foreground mb-8">
                  Contact us today for a free estimate on your next project. We specialize in custom solutions.
                </p>
                <div className="space-y-4">
                  <a href={`tel:${phone}`} className="flex items-center gap-3 h-12 px-6 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all">
                    <Phone className="w-4 h-4" /> Call {phone}
                  </a>
                  <a href={`mailto:${email}`} className="flex items-center gap-3 h-12 px-6 border-2 border-primary text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors hover:text-white">
                    <Mail className="w-4 h-4" /> Email Us
                  </a>
                </div>
              </div>

              <div className="border border-border p-8">
                <h3 className="text-lg font-black uppercase tracking-tight mb-6">Related Projects</h3>
                <div className="space-y-6">
                  {allProjects.filter(p => p.id !== project.id).slice(0, 3).map(rp => (
                    <Link key={rp.id} href={`/projects/${rp.slug}`} className="group block">
                      <div className="relative h-40 mb-3 overflow-hidden">
                        <RemoteImage 
                          src={rp.acf?.hero_image_url || rp._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://placehold.co/400x300"} 
                          alt={rp.title.rendered}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-bold uppercase tracking-tight text-sm group-hover:text-primary transition-colors underline-offset-4 group-hover:underline">
                        {rp.title.rendered}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
