const FAQS = [
  {
    question: "How much does a fence cost?",
    answer: "Pricing depends on materials, linear footage, and site conditions. We provide free on-site estimates.",
  },
  {
    question: "Do you handle permits and HOA requirements?",
    answer: "Yes. We guide you through permits and HOA approvals for Dallas–Fort Worth neighborhoods.",
  },
  {
    question: "How long does installation take?",
    answer: "Most residential fence installs are completed in 1–2 days after materials are ready.",
  },
  {
    question: "Do you offer financing?",
    answer: "Yes. We offer financing options for qualified homeowners.",
  },
];

export const FaqSection = () => (
  <section className="py-20 bg-white border-t border-border">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <p className="text-[11px] font-bold text-primary uppercase tracking-[0.35em] mb-4">
          Here are some of our most
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="max-w-4xl mx-auto space-y-5">
        {FAQS.map((faq) => (
          <details
            key={faq.question}
            className="group border border-[#e6e6e6] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          >
            <summary className="flex items-center justify-between px-7 py-6 cursor-pointer list-none">
              <span className="text-base md:text-lg font-semibold text-foreground">
                {faq.question}
              </span>
              <span className="w-11 h-11 bg-primary text-white flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="px-7 pb-6 text-sm md:text-base text-muted-foreground">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);
