import Image from "next/image";

const TRUST_LOGOS = [
  {
    src: "/logos/master-halko.svg",
    alt: "Master Halco",
    width: 140,
    height: 42,
  },
  {
    src: "/logos/google-guaranteed.svg",
    alt: "Google Guaranteed",
    width: 160,
    height: 42,
  },
  {
    src: "/logos/angi.svg",
    alt: "Angi Leads",
    width: 120,
    height: 42,
  },
  {
    src: "/logos/google-my-business.svg",
    alt: "Google My Business",
    width: 120,
    height: 42,
  },
  {
    src: "/logos/yelp.svg",
    alt: "Yelp",
    width: 90,
    height: 42,
  },
];

export const TrustBar = () => (
  <section className="bg-muted/40 border-y border-border py-6">
    <div className="container mx-auto px-6">
      <ul className="flex flex-wrap items-center justify-center gap-8">
        {TRUST_LOGOS.map((logo) => (
          <li key={logo.alt} className="flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-8 w-auto object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
