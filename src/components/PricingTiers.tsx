interface PricingTier {
  label: string;
  price_range: string;
  linear_feet?: string;
}

interface PricingTiersProps {
  title: string;
  description: string;
  tiers: PricingTier[];
}

export const PricingTiers = ({ title, description, tiers }: PricingTiersProps) => (
  <section className="py-16 bg-muted/10 border-y border-border">
    <div className="container mx-auto px-6">
      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">{title}</h2>
      <p className="text-muted-foreground max-w-2xl">{description}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {tiers.map((tier) => (
          <div key={tier.label} className="border border-border bg-white p-6">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">{tier.label}</p>
            <p className="text-3xl font-extrabold text-foreground mt-3">{tier.price_range}</p>
            {tier.linear_feet && <p className="text-sm text-muted-foreground mt-2">{tier.linear_feet}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);
