import { Phone, Mail } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import type { WPService } from "@/types/wordpress";

interface QuoteCtaSectionProps {
  services: WPService[];
  phone: string;
  phoneSecondary: string;
  email: string;
}

export const QuoteCtaSection = ({
  services,
  phone,
  phoneSecondary,
  email,
}: QuoteCtaSectionProps) => (
  <section id="quote" className="py-20 bg-background">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Request Your Quote</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight">
            This is your opportunity to{" "}
            <span className="text-primary">Create Your Dream Space.</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Are you looking for a partner to help you take your outdoor aspirations from dream to reality? Contact us
            today, and we will be in touch soon to help you get started with the initial details.
          </p>
          <ul className="space-y-4 text-sm text-foreground">
            <li>
              <a href={`tel:${phone}`} className="flex items-center gap-3 hover:text-primary transition-colors font-semibold">
                <Phone className="w-5 h-5 text-primary" /> {phone}
              </a>
            </li>
            <li>
              <a href={`tel:${phoneSecondary}`} className="flex items-center gap-3 hover:text-primary transition-colors font-semibold">
                <Phone className="w-5 h-5 text-primary" /> {phoneSecondary}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-primary transition-colors font-semibold">
                <Mail className="w-5 h-5 text-primary" /> {email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <QuoteForm services={services} variant="detailed" showServiceSelect={false} />
        </div>
      </div>
    </div>
  </section>
);
