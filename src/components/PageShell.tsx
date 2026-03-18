import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReviewsStrip } from "@/components/ReviewsStrip";
import { QuoteCtaSection } from "@/components/QuoteCtaSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { FaqSection } from "@/components/FaqSection";
import type { WPService, WPLocation, HomeACF } from "@/types/wordpress";

interface PageShellProps {
  services: WPService[];
  locations: WPLocation[];
  acf?: Partial<HomeACF>;
  phone: string;
  phoneSecondary: string;
  email: string;
  includeSharedSections?: boolean;
  children: React.ReactNode;
}

export const PageShell = ({
  services,
  locations,
  acf,
  phone,
  phoneSecondary,
  email,
  includeSharedSections = true,
  children,
}: PageShellProps) => (
  <>
    <Navbar services={services} phone={phone} />
    {children}
    {includeSharedSections && (
      <>
        <ReviewsStrip />
        <QuoteCtaSection services={services} phone={phone} phoneSecondary={phoneSecondary} email={email} />
        <WhyUsSection />
        <FaqSection />
      </>
    )}
    <Footer services={services} locations={locations} acf={acf} />
  </>
);
