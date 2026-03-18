import { Shield, TreePine, Lock } from "lucide-react";

const services = [
  {
    title: "Architectural Aluminum",
    desc: "Maintenance-free security with a modern silhouette.",
    Icon: Shield,
    delay: "",
  },
  {
    title: "Western Red Cedar",
    desc: "Premium privacy fencing with natural rot resistance.",
    Icon: TreePine,
    delay: "animation-delay-100",
  },
  {
    title: "Commercial Security",
    desc: "High-tensile steel solutions for industrial perimeters.",
    Icon: Lock,
    delay: "animation-delay-200",
  },
];

export const Services = () => (
  <section className="py-24 bg-muted/50">
    <div className="container mx-auto px-6">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-4">Our Specializations</h2>
        <div className="h-1 w-12 bg-primary rounded-full" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className={`p-8 bg-background rounded-2xl group cursor-default animate-fade-up ${service.delay}`}
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <div className="w-12 h-12 bg-muted rounded-lg mb-6 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-150">
              <service.Icon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
