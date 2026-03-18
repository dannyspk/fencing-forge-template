const REVIEWS = [
  {
    name: "Sienna Stone",
    time: "22 days ago on Google",
    text: "Great quality and craftsmanship! We were having some security concerns...",
  },
  {
    name: "Jay Scott",
    time: "1 month ago on Google",
    text: "Texas Select Fencing did an amazing job replacing our fence. The team...",
  },
  {
    name: "Jake Salyer",
    time: "1 month ago on Google",
    text: "I had a great experience from start to finish. The team was professional...",
  },
  {
    name: "Joseph Davis",
    time: "2 months ago on Google",
    text: "If you need a fence, call Texas Select Fencing. Axel was easy to work with...",
  },
];

export const ReviewsStrip = () => (
  <section className="bg-primary py-16">
    <div className="container mx-auto px-6">
      <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-10">
        Join 100+ Other Homeowners Who Chose Texas Select Fencing
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS.map((review) => (
          <article key={review.name} className="bg-white rounded-none p-5 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                {review.name.slice(0, 1)}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.time}</p>
              </div>
            </div>
            <div className="text-[#f4b400] text-sm mb-2">★★★★★</div>
            <p className="text-sm text-muted-foreground">{review.text}</p>
            <p className="text-xs text-muted-foreground mt-3">Read more</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
