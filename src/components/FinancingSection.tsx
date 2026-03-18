import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const FinancingSection = () => (
  <section className="py-14 bg-orange-50 border-y border-orange-100">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <h2 className="text-xl font-extrabold text-foreground mb-1">
          Prefer to pay over time rather than all at once?
        </h2>
        <p className="text-muted-foreground text-sm max-w-md">
          Take advantage of flexible financing with Hearth! Finance your outdoor project with affordable monthly payments. Checking your rates won&apos;t impact your credit score.
        </p>
      </div>
      <Link
        href="/fence-financing"
        className="flex-shrink-0 inline-flex items-center gap-2 h-11 px-7 bg-primary text-white font-bold rounded-none hover:brightness-110 transition-all text-sm"
      >
        Financing Calculator <ExternalLink className="w-4 h-4" />
      </Link>
    </div>
  </section>
);
