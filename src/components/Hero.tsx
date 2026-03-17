import { motion } from "framer-motion";
import heroFence from "@/assets/hero-fence.jpg";

const ease = [0.25, 0.1, 0.25, 1];

export const Hero = () => (
  <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden bg-background">
    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease }}
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease, delay: 0.1 }}
        className="relative aspect-[4/5] bg-muted rounded-2xl overflow-hidden"
        style={{ boxShadow: "var(--shadow-md)" }}
      >
        <img
          src={heroFence}
          alt="Modern black aluminum fence installation"
          className="object-cover w-full h-full"
          loading="eager"
        />
      </motion.div>
    </div>
  </section>
);
