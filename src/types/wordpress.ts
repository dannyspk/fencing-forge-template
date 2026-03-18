/**
 * WordPress REST API response types.
 *
 * These match the JSON returned by the WP REST API when the
 * custom "FenceCo CPT" plugin is active (see /wp-plugin/fenceco-cpt.php).
 *
 * Endpoints:
 *   GET /wp-json/wp/v2/services           → WPService[]
 *   GET /wp-json/wp/v2/services?slug=x    → WPService[]
 *   GET /wp-json/wp/v2/locations          → WPLocation[]
 *   GET /wp-json/wp/v2/locations?slug=x   → WPLocation[]
 *   GET /wp-json/wp/v2/projects           → WPProject[]
 *   GET /wp-json/wp/v2/pages?slug=home    → WPPage[]
 *
 * ACF fields are exposed via the ACF "Show in REST API" toggle
 * (ACF PRO >= 5.11) or the free "ACF to REST API" plugin.
 */

export interface WPRendered {
  rendered: string;
}

export interface WPFeaturedMedia {
  source_url: string;
  alt_text: string;
  media_details: { width: number; height: number };
}

// ── ACF field groups ───────────────────────────────────────────────────────────

export interface ServiceACF {
  tagline: string;
  short_description: string;
  hero_image_url: string;
  hero_image_alt: string;
  price_tiers: {
    label: string;       // "Small" | "Medium" | "Large"
    price_range: string; // "$2–4k"
    linear_feet: string; // "50 Linear Feet"
  }[];
  /** "Featured Products" — style/option variants shown in the styles grid */
  styles: {
    name: string;        // "Flat Top"
    image_url: string;
    bullets: string[];   // feature bullet points
  }[];
  /** Upgrade add-ons shown in the upgrades tabs section */
  upgrades: {
    name: string;        // "Puppy Panel"
    description: string;
    image_url: string;
  }[];
  features: {
    label: string;
    detail: string;
  }[];
  /** "Why Us" tiles — can override the global home page set per-service */
  why_us_items: {
    icon: string;
    title: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface LocationACF {
  city: string;
  county: string;
  state_abbr: string;
  hero_headline: string;
  hero_subheadline: string;
  hero_image_url: string;
  intro_text: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  nearby_cities: string[]; // slugs of sibling location pages
}

export interface HomeACF {
  hero_headline: string;
  hero_subheadline: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  hero_image_url: string;
  hero_image_alt: string;
  why_us_items: { icon: string; title: string; description: string }[];
  service_areas_intro: string;
  phone_primary: string;
  phone_secondary: string;
  email: string;
  address: string;
}

export interface ProjectACF {
  linear_feet: string;
  location_city: string;
  service_type: string; // slug of related service
  short_description?: string;
  hero_image_url?: string;
  hero_image_alt?: string;
}

// ── REST API response shapes ───────────────────────────────────────────────────

export interface WPService {
  id: number;
  slug: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  acf: ServiceACF;
  _embedded?: {
    "wp:featuredmedia"?: WPFeaturedMedia[];
  };
}

export interface WPLocation {
  id: number;
  slug: string;
  title: WPRendered;
  content: WPRendered;
  acf: LocationACF;
}

export interface WPProject {
  id: number;
  slug: string;
  title: WPRendered;
  content?: WPRendered;
  excerpt: WPRendered;
  date: string; // ISO 8601
  acf: ProjectACF;
  _embedded?: {
    "wp:featuredmedia"?: WPFeaturedMedia[];
  };
}

export interface WPPage {
  id: number;
  slug: string;
  title: WPRendered;
  acf: HomeACF;
}
