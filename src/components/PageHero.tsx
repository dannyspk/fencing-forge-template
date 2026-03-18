import { Navbar } from "@/components/Navbar";
import { TrustBar } from "@/components/TrustBar";
import type { WPService } from "@/types/wordpress";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  services: WPService[];
  phone: string;
}

export const PageHero = ({ eyebrow, title, subtitle, services, phone }: PageHeroProps) => (
  <>
    <Navbar services={services} phone={phone} />
    <section className="bg-background pt-28 pb-12 border-b border-border">
      <div className="container mx-auto px-6">
        {eyebrow && (
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{eyebrow}</p>
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">{title}</h1>
        {subtitle && <p className="text-muted-foreground max-w-3xl">{subtitle}</p>}
      </div>
    </section>
    <TrustBar />
  </>
);
