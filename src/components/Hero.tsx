import Image from "next/image";
import heroFence from "@/assets/hero-fence.jpg";

export const Hero = () => (
  <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden bg-background">
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <div className="animate-fade-up">
        <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
          Est. 1998 — Quality Guaranteed
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6">
          Precision-built boundaries for modern living.
        </h1>
        <p className="text-xl text-muted-foreground max-w-[50ch] mb-10">
          Custom fencing solutions engineered for durability, security, and architectural harmony.
        </p>
        <div className="flex gap-4">
          <button className="h-12 px-8 bg-primary text-primary-foreground rounded-md font-medium transition-all hover:brightness-110 active:scale-[0.98]">
            Request a Quote
          </button>
          <button className="h-12 px-8 bg-muted text-foreground rounded-md font-medium transition-all hover:bg-secondary">
            View Projects
          </button>
        </div>
      </div>

      <div
        className="relative aspect-[4/5] bg-muted rounded-2xl overflow-hidden animate-fade-in-scale"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <Image
          src={heroFence}
          alt="Modern black aluminum fence installation"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  </section>
);
