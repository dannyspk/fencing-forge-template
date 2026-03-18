/**
 * Mock data — mirrors the exact WP REST API response shapes.
 *
 * Used automatically when WP_API_URL is not set (local dev).
 * Replace nothing when going live — just set WP_API_URL in .env.local
 * and this file is never imported.
 */

import type { WPService, WPLocation, WPProject, WPPage } from "@/types/wordpress";

// ── Services ──────────────────────────────────────────────────────────────────

export const mockServices: WPService[] = [
  {
    id: 1,
    slug: "wood-fences",
    title: { rendered: "Wood Fence Installation" },
    excerpt: { rendered: "Handcrafted cedar &amp; pine privacy fences built on-site." },
    content: {
      rendered:
        "<p>Our wood fences are crafted on-site using premium cedar and pine. Choose from board-on-board, side-by-side, shadowbox, or horizontal styles — each built to last and designed to add lasting value to your property.</p>",
    },
    acf: {
      tagline: "Handcrafted & Built On-site",
      short_description: "Premium cedar and pine privacy fences built by hand.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Wood+Fence",
      hero_image_alt: "Board-on-board cedar fence installation",
      price_tiers: [
        { label: "Small", price_range: "$2–4k", linear_feet: "~50 Linear Feet" },
        { label: "Medium", price_range: "$6.5–9k", linear_feet: "~150 Linear Feet" },
        { label: "Large", price_range: "$10–15k", linear_feet: "~250 Linear Feet" },
      ],
      styles: [
        {
          name: "Board-on-Board",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Board+on+Board",
          bullets: [
            "Maximum privacy — overlapping pickets, zero gaps",
            "Our most popular residential option",
            "Available in 6' and 8' heights",
          ],
        },
        {
          name: "Side-by-Side",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Side+by+Side",
          bullets: [
            "Cost-effective privacy fence",
            "Clean, uniform look",
            "Available in 4', 6', and 8' heights",
          ],
        },
        {
          name: "Shadowbox",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Shadowbox",
          bullets: [
            "Looks finished from both sides",
            "Allows airflow while maintaining privacy",
            "Great for shared property lines",
          ],
        },
        {
          name: "Horizontal",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Horizontal",
          bullets: [
            "Modern, contemporary aesthetic",
            "Makes small spaces feel larger",
            "Cedar boards cut flush for a clean edge",
          ],
        },
      ],
      upgrades: [
        {
          name: "Post Caps",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Post+Caps",
          description: "Decorative caps seal the post tops to prevent water damage and add a polished finished look to any wood fence.",
        },
        {
          name: "Lattice Top",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Lattice+Top",
          description: "Add a decorative lattice panel above your privacy boards for a classic garden look without sacrificing security.",
        },
        {
          name: "Steel Posts",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Steel+Posts",
          description: "Upgrade from wood to galvanized steel posts for superior strength and a lifespan that outlasts the boards themselves.",
        },
      ],
      features: [
        { label: "Board-on-board", detail: "Ultimate privacy — overlapping pickets, zero gaps." },
        { label: "Side-by-side", detail: "Cost-effective option, slight gap between pickets." },
        { label: "Shadowbox", detail: "Looks finished from both sides. Great airflow." },
        { label: "Horizontal", detail: "Modern aesthetic that makes spaces feel open." },
      ],
      why_us_items: [
        { icon: "🪵", title: "Premium Cedar & Pine" },
        { icon: "🏆", title: "20+ Years Experience" },
        { icon: "🛡️", title: "3-Year Warranty" },
        { icon: "👤", title: "Owner-Operated" },
        { icon: "💳", title: "Financing Available" },
        { icon: "🏠", title: "Small Business" },
        { icon: "💰", title: "Competitive Pricing" },
        { icon: "⭐", title: "Reputable" },
      ],
      faqs: [
        { question: "What type of wood lasts longest?", answer: "Cedar is naturally rot-resistant and outperforms pine in longevity — typically 15–20 years with minimal maintenance." },
        { question: "Is pine or cedar better?", answer: "Cedar for longevity and natural resistance. Pine is lower cost upfront but requires staining within 1–2 years." },
        { question: "How much does a wood fence cost?", answer: "Costs range from $2k for a small 50 ft fence up to $15k+ for large 250 ft projects. We provide exact quotes after an on-site visit." },
        { question: "Do I need a permit?", answer: "Permit requirements vary by city. We handle the research for your specific location as part of our consultation." },
      ],
    },
  },
  {
    id: 2,
    slug: "wrought-iron-fences",
    title: { rendered: "Wrought Iron Fence Installation" },
    excerpt: { rendered: "Durable wrought iron fences designed to accent your outdoor space." },
    content: {
      rendered:
        "<p>Wrought iron fencing delivers unmatched elegance and security. Our iron fences are powder-coated for rust resistance and custom-fabricated to fit your property perfectly.</p>",
    },
    acf: {
      tagline: "Elegant Security That Lasts Generations",
      short_description: "Powder-coated iron fencing for lasting curb appeal and security.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Wrought+Iron+Fence",
      hero_image_alt: "3-rail wrought iron fence with decorative spears",
      price_tiers: [
        { label: "Small",  price_range: "$1.5–3k",  linear_feet: "~50 Linear Feet" },
        { label: "Medium", price_range: "$5–7k",    linear_feet: "~150 Linear Feet" },
        { label: "Large",  price_range: "$8–12k",   linear_feet: "~250 Linear Feet" },
      ],
      styles: [
        {
          name: "Flat Top",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Flat+Top",
          bullets: [
            "Straight, clean line on the top offers a modern / sleek look",
            "Our most popular and cost-effective option",
            "Available in 2 and 3 rail options and heights of 4′, 5′, 6′, 7′, and 8′",
          ],
        },
        {
          name: "Puppy Panel",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Puppy+Panel",
          bullets: [
            "Features closely spaced lower pickets to prevent small dogs from slipping through",
            "24″ tall of 2″ spaced pickets for extra pet protection",
            "Available in heights of 4′, 5′, and 6′",
          ],
        },
        {
          name: "Pressed Point",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Pressed+Point",
          bullets: [
            "Pickets extend through the top rail and are pressed to a sharp point",
            "The pressed point adds security to your fence",
            "Complements traditional, gothic, and colonial homes best",
          ],
        },
        {
          name: "Curved Top",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Curved+Top",
          bullets: [
            "Pickets extend through the top rail and are curved outwards",
            "Curved pickets add an extra layer of security",
            "Best used in commercial applications",
          ],
        },
        {
          name: "Finials",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Finials",
          bullets: [
            "Pickets are topped with a decorative finial of your choice",
            "Finials come in a multitude of designs to complement your home",
            "Complements traditional, gothic, and colonial homes best",
          ],
        },
      ],
      upgrades: [
        {
          name: "Puppy Panel",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Puppy+Panel",
          description: "Adding puppy panel to your wrought iron fence keeps small dogs securely in the backyard. Features 24″ of closely spaced 2″ pickets at the base.",
        },
        {
          name: "MagnaLatch",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=MagnaLatch",
          description: "A magnetic self-latching gate lock that's child-proof and pool-code compliant. Operates from inside or outside with the key.",
        },
        {
          name: "Rackable Panels",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Rackable+Panels",
          description: "Panels engineered to follow sloped terrain without gaps at the bottom — ideal for hilly yards in DFW.",
        },
        {
          name: "Post Skirt",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Post+Skirt",
          description: "A decorative cover that wraps the base of concrete posts for a finished, clean look where the post meets the ground.",
        },
        {
          name: "Lockey Lock Box",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Lock+Box",
          description: "A keypad lock box mounted on the gate so you can grant access with a code — no key required. Perfect for pool gates.",
        },
      ],
      features: [
        { label: "Powder-coated", detail: "Rust-resistant finish available in any color." },
        { label: "Custom fabrication", detail: "Fabricated to match your exact property dimensions." },
        { label: "Decorative options", detail: "Spear tops, rings, scrolls and more." },
        { label: "Low maintenance", detail: "Occasional touch-up paint is all it needs." },
      ],
      why_us_items: [
        { icon: "🔩", title: "Premium Materials" },
        { icon: "🏆", title: "20+ Years Experience" },
        { icon: "🛡️", title: "3-Year Warranty" },
        { icon: "👤", title: "Owner-Operated" },
        { icon: "💳", title: "Financing Available" },
        { icon: "🏠", title: "Small Business" },
        { icon: "💰", title: "Competitive Pricing" },
        { icon: "⭐", title: "Reputable" },
      ],
      faqs: [
        { question: "What is the life expectancy of a wrought iron fence?", answer: "With proper powder coating and occasional maintenance, wrought iron fences last 50+ years — often outliving the property itself." },
        { question: "How do I stop my wrought iron fence from rusting?", answer: "Our fences are powder-coated which provides a strong protective barrier. If surface rust appears, sand it back and touch up with rust-inhibiting paint." },
        { question: "Is wrought iron fencing made of iron or steel?", answer: "Modern 'wrought iron' fences are typically fabricated from steel tubing and flat bar, which is stronger and more workable than true wrought iron." },
        { question: "How much does it cost to install a wrought iron fence?", answer: "Costs range from around $1,500 for a small 50 ft fence to $12,000+ for a large 250 ft project. We provide exact quotes after an on-site consultation." },
      ],
    },
  },
  {
    id: 3,
    slug: "chain-link-fences",
    title: { rendered: "Chain Link Fence Installation" },
    excerpt: { rendered: "Residential &amp; commercial chain link — galvanized, vinyl-coated, or slatted." },
    content: {
      rendered:
        "<p>Chain link is the most cost-effective fencing solution for large areas. We install galvanized, vinyl-coated (black, green, brown), and privacy-slatted chain link for both residential and commercial clients.</p>",
    },
    acf: {
      tagline: "Cost-Effective Security for Any Property Size",
      short_description: "Galvanized, vinyl-coated, and slatted chain link for homes and businesses.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Chain+Link+Fence",
      hero_image_alt: "Black vinyl-coated chain link fence installation",
      price_tiers: [
        { label: "Small",  price_range: "$3–4k",  linear_feet: "~50 Linear Feet" },
        { label: "Medium", price_range: "$5–6k",  linear_feet: "~150 Linear Feet" },
        { label: "Large",  price_range: "$7–9k",  linear_feet: "~250 Linear Feet" },
      ],
      styles: [
        {
          name: "Galvanized",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Galvanized",
          bullets: [
            "Classic silver zinc coating prevents rust",
            "Most affordable chain link option",
            "Available in 4′–8′ heights with 11 or 9 gauge wire",
          ],
        },
        {
          name: "Vinyl-Coated Black",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Vinyl+Black",
          bullets: [
            "Black coating blends with landscaping",
            "More attractive than standard galvanized",
            "Provides additional corrosion protection",
          ],
        },
        {
          name: "Privacy Slats",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Privacy+Slats",
          bullets: [
            "PVC slats inserted vertically through the mesh",
            "~85% privacy while maintaining airflow",
            "Available in multiple colors",
          ],
        },
        {
          name: "Commercial Grade",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Commercial",
          bullets: [
            "Heavier 6-gauge wire for high-security applications",
            "Larger diameter posts and top rail",
            "Used for warehouses, yards, and industrial perimeters",
          ],
        },
      ],
      upgrades: [
        {
          name: "Barbed Wire Top",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Barbed+Wire",
          description: "A 3-strand barbed wire extension arm adds a security deterrent to the top of commercial chain link fences.",
        },
        {
          name: "Razor Wire Top",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Razor+Wire",
          description: "Coiled concertina razor wire provides maximum perimeter security for high-risk commercial and industrial properties.",
        },
        {
          name: "Swing Gate",
          image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Swing+Gate",
          description: "A matching chain link walk or drive gate with a heavy-duty frame and latch, fabricated to match your fence height.",
        },
      ],
      features: [
        { label: "Galvanized", detail: "Standard silver finish — most affordable option." },
        { label: "Vinyl-coated", detail: "Available in black, green, or brown to blend with landscaping." },
        { label: "Privacy slats", detail: "Insert slats into the chain link for added privacy." },
        { label: "Commercial grade", detail: "Heavier gauge wire and posts for high-security applications." },
      ],
      why_us_items: [
        { icon: "🔗", title: "Premium Materials" },
        { icon: "🏆", title: "20+ Years Experience" },
        { icon: "🛡️", title: "3-Year Warranty" },
        { icon: "👤", title: "Owner-Operated" },
        { icon: "💳", title: "Financing Available" },
        { icon: "🏠", title: "Small Business" },
        { icon: "💰", title: "Competitive Pricing" },
        { icon: "⭐", title: "Reputable" },
      ],
      faqs: [
        { question: "How long does chain link last?", answer: "Galvanized chain link typically lasts 20–30 years. Vinyl-coated can last longer with less visible wear." },
        { question: "Can chain link be made private?", answer: "Yes — privacy slats inserted vertically through the links create an effective privacy screen at ~85% opacity." },
        { question: "Is chain link suitable for commercial properties?", answer: "Absolutely. We install commercial-grade 6-gauge chain link for warehouses, yards, and industrial perimeters every day." },
        { question: "What gauge wire should I choose?", answer: "11-gauge is standard for residential. 9-gauge is heavier duty for pet containment. 6-gauge is commercial/industrial grade." },
      ],
    },
  },
  // ── Fences (continued) ──────────────────────────────────────────────────────
  {
    id: 4,
    slug: "pipe-fences",
    title: { rendered: "Pipe Fence Installation" },
    excerpt: { rendered: "New steel pipe expertly welded and painted to keep your agriculture safe." },
    content: { rendered: "<p>Durable steel pipe fencing for agricultural, ranch, and commercial properties across DFW.</p>" },
    acf: {
      tagline: "Agricultural & Commercial Grade",
      short_description: "New steel pipe expertly welded and painted to keep your agriculture safe and secure.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Pipe+Fence",
      hero_image_alt: "Steel pipe fence installation Dallas",
      price_tiers: [
        { label: "Small", price_range: "$3–5k", linear_feet: "~100 Linear Feet" },
        { label: "Medium", price_range: "$7–12k", linear_feet: "~250 Linear Feet" },
        { label: "Large", price_range: "$15–25k", linear_feet: "~500 Linear Feet" },
      ],
      styles: [
        { name: "2-Rail Pipe", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=2+Rail", bullets: ["Classic ranch look", "Great for large acreage", "Low maintenance steel"] },
        { name: "3-Rail Pipe", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=3+Rail", bullets: ["Added containment", "Popular for horses", "Available in any length"] },
      ],
      upgrades: [
        { name: "Custom Gates", description: "Matching pipe gates with heavy-duty hinges.", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Pipe+Gate" },
        { name: "Powder Coat Finish", description: "Long-lasting color-matched powder coating.", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Powder+Coat" },
      ],
      features: [{ label: "Material", detail: "Schedule 40 steel pipe" }, { label: "Finish", detail: "Welded & painted" }],
      why_us_items: [],
      faqs: [
        { question: "What size pipe do you use?", answer: "We typically use 2\" to 4\" Schedule 40 steel pipe depending on application." },
        { question: "Can pipe fences be painted any color?", answer: "Yes — we offer a full range of powder coat and paint finishes." },
      ],
    },
  },
  {
    id: 5,
    slug: "ranch-fences",
    title: { rendered: "Ranch Fence Installation" },
    excerpt: { rendered: "Durable and functional fencing designed to secure and define your property." },
    content: { rendered: "<p>From split rail to high-tensile wire, we build ranch fences for properties of all sizes across DFW.</p>" },
    acf: {
      tagline: "Define & Protect Your Property",
      short_description: "Durable and functional fencing designed to secure and define your property and protect your agriculture.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Ranch+Fence",
      hero_image_alt: "Ranch fence installation Dallas Fort Worth",
      price_tiers: [
        { label: "Small", price_range: "$2–4k", linear_feet: "~150 Linear Feet" },
        { label: "Medium", price_range: "$5–9k", linear_feet: "~400 Linear Feet" },
        { label: "Large", price_range: "$10–20k", linear_feet: "~1000 Linear Feet" },
      ],
      styles: [
        { name: "Split Rail", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Split+Rail", bullets: ["Classic rustic look", "Great for property boundaries", "Natural cedar or pine"] },
        { name: "High-Tensile Wire", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=High+Tensile", bullets: ["Cost-effective for large acreage", "Livestock containment", "Low maintenance"] },
      ],
      upgrades: [],
      features: [{ label: "Best for", detail: "Large acreage & livestock" }],
      why_us_items: [],
      faqs: [
        { question: "What's the best ranch fence for horses?", answer: "3-board wood or pipe rail fences are safest for horses — no sharp edges, high visibility." },
      ],
    },
  },
  {
    id: 6,
    slug: "composite-fences",
    title: { rendered: "Composite Fence Installation" },
    excerpt: { rendered: "Enhance your property with a modern and eco-friendly composite fence." },
    content: { rendered: "<p>Composite fencing combines the look of wood with the durability of plastic — zero rot, zero splinters, minimal upkeep.</p>" },
    acf: {
      tagline: "Modern & Low Maintenance",
      short_description: "Enhance your property with a modern and eco-friendly composite fence that never needs painting.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Composite+Fence",
      hero_image_alt: "Composite fence installation Dallas",
      price_tiers: [
        { label: "Small", price_range: "$3–6k", linear_feet: "~50 Linear Feet" },
        { label: "Medium", price_range: "$8–14k", linear_feet: "~150 Linear Feet" },
        { label: "Large", price_range: "$16–25k", linear_feet: "~250 Linear Feet" },
      ],
      styles: [
        { name: "Privacy Board", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Composite+Privacy", bullets: ["Zero rot or splinters", "UV-resistant color", "Looks like real wood"] },
        { name: "Horizontal Slat", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Composite+Horizontal", bullets: ["Contemporary aesthetic", "Available in multiple colors", "Never needs painting"] },
      ],
      upgrades: [],
      features: [{ label: "Warranty", detail: "25-year manufacturer warranty" }],
      why_us_items: [],
      faqs: [
        { question: "Does composite fence look cheap?", answer: "Modern composite has come a long way — premium brands are nearly indistinguishable from real wood at a distance." },
      ],
    },
  },
  // ── Gates ───────────────────────────────────────────────────────────────────
  {
    id: 7,
    slug: "driveway-swing-gates",
    title: { rendered: "Swing Gates" },
    excerpt: { rendered: "Single or double swing automatic gates that secure your property." },
    content: { rendered: "<p>Custom single and double swing driveway gates, manual or automated, in wood, iron, or steel.</p>" },
    acf: {
      tagline: "Manual & Automated Options",
      short_description: "Single or double swing automatic gates designed to secure your property in any fence style.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Swing+Gate",
      hero_image_alt: "Automatic swing gate installation Dallas",
      price_tiers: [
        { label: "Manual", price_range: "$800–2k", linear_feet: "Single gate" },
        { label: "Automated", price_range: "$2.5–5k", linear_feet: "With opener" },
        { label: "Double Automated", price_range: "$5–9k", linear_feet: "Dual leaf" },
      ],
      styles: [
        { name: "Wrought Iron Swing", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Iron+Swing", bullets: ["Classic elegant look", "Powder coated", "Custom widths"] },
        { name: "Wood Swing Gate", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Wood+Swing", bullets: ["Matches cedar fence", "Heavy-duty hinges", "Manual or automated"] },
      ],
      upgrades: [
        { name: "LiftMaster Opener", description: "Commercial-grade automated gate opener with smartphone control.", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Gate+Opener" },
        { name: "Keypad Entry", description: "Coded keypad for visitor access without a remote.", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Keypad" },
      ],
      features: [{ label: "Automation", detail: "LiftMaster & FAAC compatible" }],
      why_us_items: [],
      faqs: [
        { question: "How wide can a swing gate be?", answer: "Single swing gates are typically 4–16 feet wide. Larger openings use double/bi-parting swing gates." },
      ],
    },
  },
  {
    id: 8,
    slug: "automatic-sliding-gates",
    title: { rendered: "Sliding Gates" },
    excerpt: { rendered: "Beautiful and secure automatic sliding gates that conform to your existing fence style." },
    content: { rendered: "<p>Sliding gates are ideal for driveways with limited side clearance. We install manual and fully automated options.</p>" },
    acf: {
      tagline: "Space-Saving Automated Entry",
      short_description: "Beautiful and secure automatic sliding gates that conform to your existing style of fence.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Sliding+Gate",
      hero_image_alt: "Automatic sliding gate installation Dallas",
      price_tiers: [
        { label: "Manual", price_range: "$1–2.5k", linear_feet: "Up to 12ft" },
        { label: "Automated", price_range: "$3–6k", linear_feet: "With opener" },
        { label: "Heavy Duty", price_range: "$6–12k", linear_feet: "Commercial grade" },
      ],
      styles: [
        { name: "Chain Link Slide", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Chain+Slide", bullets: ["Matches existing fence", "Cantilever option available", "Low ground clearance"] },
        { name: "Iron Slide Gate", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Iron+Slide", bullets: ["Heavy-duty construction", "Powder coated finish", "Custom widths"] },
      ],
      upgrades: [
        { name: "Cantilever Rollers", description: "No ground track needed — ideal for uneven driveways.", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Cantilever" },
      ],
      features: [{ label: "Best for", detail: "Driveways with limited swing clearance" }],
      why_us_items: [],
      faqs: [
        { question: "What's the difference between cantilever and track sliding gates?", answer: "Cantilever gates hang from a top rail with no ground track — better for areas where snow, gravel, or uneven ground is a factor." },
      ],
    },
  },
  {
    id: 9,
    slug: "gate-opener-installation",
    title: { rendered: "Gate Opener Installation" },
    excerpt: { rendered: "Automate any existing gate with a professional LiftMaster or FAAC opener." },
    content: { rendered: "<p>We install and service LiftMaster, FAAC, and other leading gate automation systems on existing or new gates.</p>" },
    acf: {
      tagline: "Automate Your Existing Gate",
      short_description: "Professional installation of gate openers on new or existing swing and slide gates.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Gate+Opener",
      hero_image_alt: "Gate opener installation Dallas",
      price_tiers: [
        { label: "Residential", price_range: "$800–1.5k", linear_feet: "Single gate" },
        { label: "Dual Gate", price_range: "$1.5–3k", linear_feet: "Double leaf" },
        { label: "Commercial", price_range: "$3–8k", linear_feet: "Heavy-duty" },
      ],
      styles: [],
      upgrades: [
        { name: "Smartphone App", description: "Control and monitor your gate from anywhere via app.", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=App+Control" },
        { name: "Intercom System", description: "Two-way intercom with video doorbell integration.", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Intercom" },
      ],
      features: [{ label: "Brands", detail: "LiftMaster, FAAC, Ghost Controls" }],
      why_us_items: [],
      faqs: [
        { question: "Can you automate my existing gate?", answer: "In most cases yes — as long as the gate structure and posts are solid. We assess during the free estimate." },
      ],
    },
  },
  // ── Outdoor Living ──────────────────────────────────────────────────────────
  {
    id: 10,
    slug: "pergolas",
    title: { rendered: "Pergola Installation" },
    excerpt: { rendered: "Custom wood and aluminum pergolas to shade and beautify your outdoor space." },
    content: { rendered: "<p>We design and build custom pergolas in cedar, pine, and aluminum — freestanding or attached to your home.</p>" },
    acf: {
      tagline: "Shade & Style for Your Yard",
      short_description: "Custom cedar, pine, and aluminum pergolas built to shade and define your outdoor living space.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Pergola",
      hero_image_alt: "Custom pergola installation Dallas",
      price_tiers: [
        { label: "Small", price_range: "$3–6k", linear_feet: "10×10 ft" },
        { label: "Medium", price_range: "$7–12k", linear_feet: "12×16 ft" },
        { label: "Large", price_range: "$14–22k", linear_feet: "16×20+ ft" },
      ],
      styles: [
        { name: "Cedar Pergola", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Cedar+Pergola", bullets: ["Natural grain beauty", "Stainable & paintable", "Freestanding or attached"] },
        { name: "Aluminum Pergola", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Aluminum+Pergola", bullets: ["Zero maintenance", "Powder coated colors", "Outlasts wood"] },
      ],
      upgrades: [],
      features: [{ label: "Materials", detail: "Cedar, pine, aluminum" }],
      why_us_items: [],
      faqs: [
        { question: "Do pergolas need a permit in Dallas?", answer: "Permits are typically required for attached pergolas over 200 sq ft. We handle the permit process for you." },
      ],
    },
  },
  {
    id: 11,
    slug: "patio-covers",
    title: { rendered: "Patio Covers" },
    excerpt: { rendered: "Solid patio covers that protect your outdoor space year-round." },
    content: { rendered: "<p>We install solid and insulated patio covers in wood and aluminum to protect your outdoor living area from Texas heat and rain.</p>" },
    acf: {
      tagline: "Year-Round Outdoor Protection",
      short_description: "Solid and insulated patio covers in wood and aluminum to protect your outdoor space from Texas heat and rain.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Patio+Cover",
      hero_image_alt: "Patio cover installation Dallas Texas",
      price_tiers: [
        { label: "Small", price_range: "$4–7k", linear_feet: "10×12 ft" },
        { label: "Medium", price_range: "$8–15k", linear_feet: "14×20 ft" },
        { label: "Large", price_range: "$16–28k", linear_feet: "20×24+ ft" },
      ],
      styles: [
        { name: "Wood Patio Cover", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Wood+Cover", bullets: ["Classic look", "Can be stained or painted", "Attached to home or freestanding"] },
        { name: "Insulated Aluminum", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Insulated+Cover", bullets: ["Superior heat blocking", "No maintenance", "Professional finish"] },
      ],
      upgrades: [],
      features: [{ label: "Best for", detail: "Texas summer heat & rain" }],
      why_us_items: [],
      faqs: [],
    },
  },
  {
    id: 12,
    slug: "retaining-walls",
    title: { rendered: "Retaining Walls" },
    excerpt: { rendered: "Protect your outdoor investments by preventing soil erosion." },
    content: { rendered: "<p>We build retaining walls in timber, concrete block, and natural stone to control erosion and create usable outdoor space.</p>" },
    acf: {
      tagline: "Stop Erosion, Create Space",
      short_description: "Retaining walls in timber, concrete block, and natural stone to prevent erosion and level your yard.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Retaining+Wall",
      hero_image_alt: "Retaining wall installation Dallas Texas",
      price_tiers: [
        { label: "Small", price_range: "$2–4k", linear_feet: "20 linear ft, 2ft tall" },
        { label: "Medium", price_range: "$5–10k", linear_feet: "40 linear ft, 3ft tall" },
        { label: "Large", price_range: "$12–25k", linear_feet: "60+ linear ft, 4ft+ tall" },
      ],
      styles: [
        { name: "Timber Wall", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Timber+Wall", bullets: ["Cost-effective", "Natural rustic look", "Up to 4ft height"] },
        { name: "Concrete Block", image_url: "https://placehold.co/400x300/1a2332/ffffff?text=Block+Wall", bullets: ["Most durable option", "Engineered for heights over 4ft", "Multiple textures available"] },
      ],
      upgrades: [],
      features: [{ label: "Materials", detail: "Timber, concrete block, natural stone" }],
      why_us_items: [],
      faqs: [
        { question: "Do I need a permit for a retaining wall?", answer: "Walls over 4 feet typically require a permit in Dallas. We advise and handle permits during the estimate process." },
      ],
    },
  },
  {
    id: 13,
    slug: "r-panel-fences",
    title: { rendered: "R-Panel Fence Installation" },
    excerpt: { rendered: "Metal R-panel fencing that delivers privacy and durability." },
    content: { rendered: "<p>R-panel fences offer a clean, modern look with excellent privacy and longevity. Ideal for residential yards and commercial property lines.</p>" },
    acf: {
      tagline: "Modern Metal Privacy",
      short_description: "Metal R-panel fencing for privacy, durability, and a sleek aesthetic.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=R-Panel+Fence",
      hero_image_alt: "R-panel fence installation",
      price_tiers: [],
      styles: [],
      upgrades: [],
      features: [],
      why_us_items: [],
      faqs: [],
    },
  },
  {
    id: 14,
    slug: "residential-fencing",
    title: { rendered: "Residential Fencing" },
    excerpt: { rendered: "Custom fencing solutions tailored to Dallas–Fort Worth homes." },
    content: { rendered: "<p>We design and install residential fencing that balances curb appeal, privacy, and security for DFW neighborhoods.</p>" },
    acf: {
      tagline: "Residential Fence Specialists",
      short_description: "Residential fencing designed for privacy, security, and curb appeal.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Residential+Fencing",
      hero_image_alt: "Residential fence installation",
      price_tiers: [],
      styles: [],
      upgrades: [],
      features: [],
      why_us_items: [],
      faqs: [],
    },
  },
  {
    id: 15,
    slug: "commercial-fencing",
    title: { rendered: "Commercial Fencing" },
    excerpt: { rendered: "Secure, code-compliant fencing for commercial properties." },
    content: { rendered: "<p>Commercial fencing and access control solutions for warehouses, retail, and multi-family properties across DFW.</p>" },
    acf: {
      tagline: "Commercial Security Solutions",
      short_description: "Secure fencing and gate systems for commercial properties.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Commercial+Fencing",
      hero_image_alt: "Commercial fence installation",
      price_tiers: [],
      styles: [],
      upgrades: [],
      features: [],
      why_us_items: [],
      faqs: [],
    },
  },
  {
    id: 16,
    slug: "access-control-systems",
    title: { rendered: "Access Control Systems" },
    excerpt: { rendered: "Keypads, key fobs, and smart access control for gates." },
    content: { rendered: "<p>Enhance security with access control systems that integrate with swing and slide gates, including smart keypads and remote entry.</p>" },
    acf: {
      tagline: "Secure Entry Systems",
      short_description: "Access control upgrades for residential and commercial gates.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Access+Control",
      hero_image_alt: "Access control system installation",
      price_tiers: [],
      styles: [],
      upgrades: [],
      features: [],
      why_us_items: [],
      faqs: [],
    },
  },
  {
    id: 17,
    slug: "bollards",
    title: { rendered: "Bollards" },
    excerpt: { rendered: "Protect pedestrian areas and storefronts with sturdy bollards." },
    content: { rendered: "<p>We install bollards for commercial properties, parking lots, and high-traffic areas to control access and improve safety.</p>" },
    acf: {
      tagline: "Protective Perimeter Solutions",
      short_description: "Commercial-grade bollards for safety and access control.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Bollards",
      hero_image_alt: "Bollard installation",
      price_tiers: [],
      styles: [],
      upgrades: [],
      features: [],
      why_us_items: [],
      faqs: [],
    },
  },
  {
    id: 18,
    slug: "dumpster-enclosures",
    title: { rendered: "Dumpster Enclosures" },
    excerpt: { rendered: "Durable enclosures to keep commercial dumpsters secure and tidy." },
    content: { rendered: "<p>Custom dumpster enclosures that match your property and comply with city requirements.</p>" },
    acf: {
      tagline: "Clean, Secure Enclosures",
      short_description: "Durable dumpster enclosures that keep commercial properties tidy.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Dumpster+Enclosure",
      hero_image_alt: "Dumpster enclosure installation",
      price_tiers: [],
      styles: [],
      upgrades: [],
      features: [],
      why_us_items: [],
      faqs: [],
    },
  },
  {
    id: 19,
    slug: "decks",
    title: { rendered: "Decks" },
    excerpt: { rendered: "Custom decks that expand your outdoor living area." },
    content: { rendered: "<p>We build wood and composite decks tailored to your home and lifestyle, providing a durable outdoor retreat.</p>" },
    acf: {
      tagline: "Outdoor Living Upgrades",
      short_description: "Custom decks in wood or composite materials.",
      hero_image_url: "https://placehold.co/1200x800/1a2332/ffffff?text=Decks",
      hero_image_alt: "Deck installation",
      price_tiers: [],
      styles: [],
      upgrades: [],
      features: [],
      why_us_items: [],
      faqs: [],
    },
  },
];

// ── Locations ─────────────────────────────────────────────────────────────────

export const mockLocations: WPLocation[] = [
  {
    id: 10,
    slug: "dallas",
    title: { rendered: "Dallas Fence Company" },
    content: {
      rendered:
        "<p>For over 10 years, FenceCo has been the trusted fence contractor in Dallas, TX. We build wood, iron, and chain link fences for homeowners and businesses across the city.</p>",
    },
    acf: {
      city: "Dallas",
      county: "Dallas County",
      state_abbr: "TX",
      hero_headline: "#1 Trusted Dallas Fence Company",
      hero_subheadline: "Expert fence installation for cedar, chain link, wrought iron, and privacy fencing — backed by a 3-year warranty.",
      hero_image_url: "https://cdn.prod.website-files.com/62c785fe02fc516f0ee97490/6638fb18912102b283b96fca_Ralph_8_BOB_Cedar_-_Top_Cap_-_Double_Trim_-_Corbels-25-min.avif",
      intro_text:
        "FenceCo has proudly served Dallas homeowners and businesses for over a decade. Whether you need a cedar privacy fence for your backyard or a commercial security fence for your property, our team delivers quality craftsmanship on time and on budget.",
      faqs: [
        { question: "How much does a fence cost in Dallas?", answer: "Wood fences start at around $2,000 for a small yard. Exact pricing depends on linear footage, material, and design. We provide free on-site estimates." },
        { question: "Do I need a permit for a fence in Dallas?", answer: "Dallas requires a permit for fences over 6 feet. We research requirements for your specific address as part of the consultation." },
        { question: "What is the most popular fence style in Dallas?", answer: "Board-on-board cedar is by far the most popular style — it provides full privacy and a clean finished look from both sides." },
      ],
      nearby_cities: ["fort-worth", "plano", "arlington"],
    },
  },
  {
    id: 11,
    slug: "fort-worth",
    title: { rendered: "Fort Worth Fence Company" },
    content: {
      rendered:
        "<p>FenceCo serves Fort Worth and the surrounding Tarrant County area with professional fence installation for residential and commercial properties.</p>",
    },
    acf: {
      city: "Fort Worth",
      county: "Tarrant County",
      state_abbr: "TX",
      hero_headline: "#1 Trusted Fort Worth Fence Company",
      hero_subheadline: "Quality fence installation in Fort Worth, TX — wood, iron, chain link, and more.",
      intro_text:
        "From the historic Near Southside to the suburbs of Keller and Southlake, FenceCo installs beautiful, long-lasting fences across the entire Fort Worth metro area.",
      faqs: [
        { question: "How much does a fence cost in Fort Worth?", answer: "Pricing is similar to Dallas — wood fences start around $2,000. We offer free estimates for all Fort Worth properties." },
        { question: "Do I need a permit in Fort Worth?", answer: "Fort Worth requires permits for most fences. We handle the permit research and paperwork for you." },
        { question: "What areas of Fort Worth do you serve?", answer: "We serve all of Fort Worth including Near Southside, Aledo, Benbrook, Crowley, Haltom City, and the full Tarrant County area." },
      ],
      nearby_cities: ["dallas", "arlington", "plano"],
    },
  },
  {
    id: 12,
    slug: "plano",
    title: { rendered: "Plano Fence Company" },
    content: {
      rendered:
        "<p>FenceCo is Plano's trusted fence installation company. We work with Plano HOAs, homeowners, and commercial properties to deliver fences that meet code and look great.</p>",
    },
    acf: {
      city: "Plano",
      county: "Collin County",
      state_abbr: "TX",
      hero_headline: "#1 Trusted Plano Fence Company",
      hero_subheadline: "HOA-compliant fence installation in Plano, TX — free estimates, 3-year warranty.",
      intro_text:
        "Plano has some of the strictest HOA fence requirements in the DFW metroplex. FenceCo knows the local codes inside and out — we ensure every fence we build in Plano passes HOA review and city inspection.",
      faqs: [
        { question: "Do Plano HOAs restrict fence styles?", answer: "Many Plano HOAs require specific heights, materials, and colors. We review your HOA guidelines before providing a quote." },
        { question: "How much does a fence cost in Plano?", answer: "Wood fences in Plano start around $2,200 due to HOA material requirements. We provide exact quotes after reviewing your HOA docs." },
        { question: "Do you handle HOA approval submissions?", answer: "Yes — we prepare the documentation and assist with the HOA submission process as part of our service." },
      ],
      nearby_cities: ["dallas", "fort-worth", "allen"],
    },
  },
  {
    id: 13,
    slug: "frisco",
    title: { rendered: "Frisco Fence Company" },
    content: {
      rendered:
        "<p>Texas Select Fencing provides premium wood, iron, and chain link fencing in Frisco, TX. From new subdivisions to established neighborhoods, we design fences that match your home and HOA requirements.</p>",
    },
    acf: {
      city: "Frisco",
      county: "Collin County",
      state_abbr: "TX",
      hero_headline: "Frisco Fence Company — Fast & Professional Installation",
      hero_subheadline: "Serving Frisco homeowners with cedar, wrought iron, and chain link fences built to code.",
      intro_text:
        "We help Frisco homeowners and builders with new installs, repairs, and gate automation. Our team handles HOA specs, permit guidance, and clean job sites.",
      faqs: [
        { question: "Do you install fences for new builds in Frisco?", answer: "Yes. We work with builders and homeowners on new construction installs and can coordinate with HOA guidelines." },
        { question: "What fence styles are popular in Frisco?", answer: "Board-on-board cedar, wrought iron, and black chain link are the most common choices for curb appeal and durability." },
      ],
      nearby_cities: ["plano", "mckinney", "little-elm", "prosper", "allen"],
    },
  },
  {
    id: 14,
    slug: "richardson",
    title: { rendered: "Richardson Fence Company" },
    content: {
      rendered:
        "<p>Local Richardson fence installers specializing in wood privacy, iron, and chain link fencing. We build fences that look great and last for years.</p>",
    },
    acf: {
      city: "Richardson",
      county: "Dallas County",
      state_abbr: "TX",
      hero_headline: "Richardson Fence Company You Can Trust",
      hero_subheadline: "Quality fencing for Richardson homes and commercial properties — on time and on budget.",
      intro_text:
        "From fence replacements to custom gates, Texas Select Fencing serves Richardson with responsive service and premium materials.",
      faqs: [
        { question: "Do you replace old fences in Richardson?", answer: "Yes. We remove old materials, haul away debris, and install a new fence quickly." },
        { question: "How soon can I get an estimate?", answer: "Most Richardson estimates are scheduled within 24–48 hours." },
      ],
      nearby_cities: ["garland", "plano", "addison", "dallas", "sachse"],
    },
  },
];

// ── Projects ──────────────────────────────────────────────────────────────────

export const mockProjects: WPProject[] = [
  {
    id: 20,
    slug: "6ft-cedar-board-on-board-dallas",
    title: { rendered: "6′ Cedar Board-on-Board — Dallas, TX" },
    excerpt: { rendered: "180 feet of 6′ board-on-board cedar fence with steel posts and double-trim cap." },
    date: "2026-02-15T00:00:00",
    acf: { linear_feet: "180", location_city: "Dallas", service_type: "wood-fences" },
    _embedded: {
      "wp:featuredmedia": [
        { source_url: "https://placehold.co/800x600/1a2332/ffffff?text=Cedar+Fence", alt_text: "Cedar board-on-board fence Dallas", media_details: { width: 800, height: 600 } },
      ],
    },
  },
  {
    id: 21,
    slug: "wrought-iron-driveway-gate-plano",
    title: { rendered: "Wrought Iron Driveway Gate — Plano, TX" },
    excerpt: { rendered: "Custom 14′ double swing wrought iron gate with automated opener." },
    date: "2026-01-28T00:00:00",
    acf: { linear_feet: "14", location_city: "Plano", service_type: "wrought-iron-fences" },
    _embedded: {
      "wp:featuredmedia": [
        { source_url: "https://placehold.co/800x600/1a2332/ffffff?text=Iron+Gate", alt_text: "Wrought iron driveway gate Plano", media_details: { width: 800, height: 600 } },
      ],
    },
  },
  {
    id: 22,
    slug: "commercial-chain-link-fort-worth",
    title: { rendered: "Commercial Chain Link — Fort Worth, TX" },
    excerpt: { rendered: "320 feet of 8′ commercial-grade galvanized chain link for an industrial yard." },
    date: "2026-01-10T00:00:00",
    acf: { linear_feet: "320", location_city: "Fort Worth", service_type: "chain-link-fences" },
    _embedded: {
      "wp:featuredmedia": [
        { source_url: "https://placehold.co/800x600/1a2332/ffffff?text=Chain+Link", alt_text: "Commercial chain link fence Fort Worth", media_details: { width: 800, height: 600 } },
      ],
    },
  },
  {
    id: 23,
    slug: "shadowbox-cedar-arlington",
    title: { rendered: "6′ Shadowbox Cedar Fence — Arlington, TX" },
    excerpt: { rendered: "220 feet of shadowbox cedar — great neighbor fence, looks finished on both sides." },
    date: "2025-12-20T00:00:00",
    acf: { linear_feet: "220", location_city: "Arlington", service_type: "wood-fences" },
    _embedded: {
      "wp:featuredmedia": [
        { source_url: "https://placehold.co/800x600/1a2332/ffffff?text=Shadowbox+Fence", alt_text: "Shadowbox cedar fence Arlington", media_details: { width: 800, height: 600 } },
      ],
    },
  },
  {
    id: 24,
    slug: "horizontal-cedar-modern-dallas",
    title: { rendered: "Modern Horizontal Cedar Fence — Dallas, TX" },
    excerpt: { rendered: "130 feet of 6′ horizontal board-on-board cedar with black metal posts." },
    date: "2025-12-05T00:00:00",
    acf: { linear_feet: "130", location_city: "Dallas", service_type: "wood-fences" },
    _embedded: {
      "wp:featuredmedia": [
        { source_url: "https://placehold.co/800x600/1a2332/ffffff?text=Horizontal+Cedar", alt_text: "Modern horizontal cedar fence Dallas", media_details: { width: 800, height: 600 } },
      ],
    },
  },
  {
    id: 25,
    slug: "vinyl-chain-link-plano",
    title: { rendered: "Black Vinyl Chain Link — Plano, TX" },
    excerpt: { rendered: "150 feet of 4′ black vinyl-coated chain link for a residential backyard." },
    date: "2025-11-18T00:00:00",
    acf: { linear_feet: "150", location_city: "Plano", service_type: "chain-link-fences" },
    _embedded: {
      "wp:featuredmedia": [
        { source_url: "https://placehold.co/800x600/1a2332/ffffff?text=Vinyl+Chain+Link", alt_text: "Black vinyl chain link fence Plano", media_details: { width: 800, height: 600 } },
      ],
    },
  },
];

// ── Home page ACF ─────────────────────────────────────────────────────────────

export const mockHomePage: WPPage = {
  id: 2,
  slug: "home",
  title: { rendered: "Home" },
  acf: {
    hero_headline: "Dallas Fence Company – Fast & Professional Fence Installation",
    hero_subheadline:
      "We specialize in building stunning fences and outdoor living spaces that make your backyard feel like home.",
    hero_cta_primary: "Get a Quote",
    hero_cta_secondary: "Call Us",
    hero_image_url: "https://cdn.prod.website-files.com/62c785fe02fc516f0ee97490/647cbf98df963a10c43bfe8d_horizontal-3-min.jpg",
    hero_image_alt: "Fence installation in Dallas Texas",
    service_areas_intro:
      "We operate all throughout the Dallas–Fort Worth Metroplex, serving Dallas, Collin, and Denton counties.",
    phone_primary: "(214) 558-9169",
    phone_secondary: "(214) 558-9169",
    email: "contact@select-fencing.com",
    address: "Dallas, TX 75204",
  },
};
