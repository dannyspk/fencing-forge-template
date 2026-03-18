const REASONS = [
  "Premium Materials",
  "20+ Years Experience",
  "3-Year Warranty",
  "Owner-operated",
  "Financing Available",
  "Small Business",
  "Competitive Pricing",
  "Reputable",
];

export const WhyUsSection = () => (
  <section className="bg-[#141414] py-16">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-2xl md:text-3xl font-extrabold text-white">
        Top Reasons Our <span className="text-primary">Customers Choose</span> Texas Select Fencing
      </h2>
      <div className="h-0.5 w-28 bg-primary mx-auto mt-4 mb-10" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
        {REASONS.map((reason) => (
          <div key={reason} className="space-y-4">
            <div className="w-14 h-14 mx-auto border border-primary text-primary flex items-center justify-center">
              ★
            </div>
            <p className="font-semibold text-base">{reason}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
