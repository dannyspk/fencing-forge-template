/**
 * WordPress REST API client.
 *
 * All functions fetch from the WP REST API at WP_API_URL.
 * When WP_API_URL is not set (local dev without a live WP instance),
 * they return mock data that mirrors the exact WP REST API shape.
 *
 * Next.js caches fetch() responses by default.
 * Pass `{ next: { revalidate: N } }` to enable ISR per-fetch.
 * On-demand revalidation is handled by app/api/revalidate/route.ts.
 */

import type { WPService, WPLocation, WPProject, WPPage } from "@/types/wordpress";
import {
  mockServices,
  mockLocations,
  mockProjects,
  mockHomePage,
} from "@/lib/mock-data";

const BASE = process.env.WP_API_URL
  ? `${process.env.WP_API_URL.replace(/\/$/, "")}/wp-json/wp/v2`
  : null;

// How long (seconds) before Next.js re-fetches from WP in the background.
// On-demand revalidation via the /api/revalidate webhook overrides this.
const REVALIDATE = 60; // 1 minute — adjust per client publishing cadence

// ── Generic fetch helper ───────────────────────────────────────────────────────

async function wpFetch<T>(path: string): Promise<T> {
  if (!BASE) return Promise.resolve(null as T); // handled by callers via mock fallback

  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    next: { revalidate: REVALIDATE },
    headers: {
      Accept: "application/json",
      // Add Authorization header here if WP requires authenticated reads
      // "Authorization": `Bearer ${process.env.WP_JWT_TOKEN}`,
    },
  });

  if (!res.ok) {
    const error = new Error(`WP API error ${res.status} for ${url}`);
    (error as Error & { status?: number }).status = res.status;
    throw error;
  }

  return res.json() as Promise<T>;
}

// ── Services (CPT: service) ────────────────────────────────────────────────────

/**
 * List all published services.
 * WP endpoint: GET /wp-json/wp/v2/services?_embed&per_page=100
 */
export async function getAllServices(): Promise<WPService[]> {
  if (!BASE) return mockServices;
  try {
    return await wpFetch<WPService[]>("/services?_embed&per_page=100");
  } catch (err) {
    if ((err as { status?: number }).status === 404) {
      return wpFetch<WPService[]>("/posts?_embed&per_page=100");
    }
    return mockServices;
  }
}

/**
 * Get a single service by slug.
 * WP endpoint: GET /wp-json/wp/v2/services?slug={slug}&_embed
 */
export async function getServiceBySlug(slug: string): Promise<WPService | null> {
  if (!BASE) return mockServices.find((s) => s.slug === slug) ?? null;
  try {
    const results = await wpFetch<WPService[]>(`/services?slug=${slug}&_embed`);
    return results[0] ?? null;
  } catch (err) {
    if ((err as { status?: number }).status === 404) {
      const results = await wpFetch<WPService[]>(`/posts?slug=${slug}&_embed`);
      return results[0] ?? null;
    }
    return mockServices.find((s) => s.slug === slug) ?? null;
  }
}

// ── Locations (CPT: location) ──────────────────────────────────────────────────

/**
 * List all published locations.
 * WP endpoint: GET /wp-json/wp/v2/locations?per_page=100
 */
export async function getAllLocations(): Promise<WPLocation[]> {
  if (!BASE) return mockLocations;
  try {
    return await wpFetch<WPLocation[]>("/locations?per_page=100");
  } catch (err) {
    if ((err as { status?: number }).status === 404) {
      return wpFetch<WPLocation[]>("/posts?per_page=100");
    }
    return mockLocations;
  }
}

/**
 * Get a single location by slug.
 * WP endpoint: GET /wp-json/wp/v2/locations?slug={slug}
 */
export async function getLocationBySlug(slug: string): Promise<WPLocation | null> {
  if (!BASE) return mockLocations.find((l) => l.slug === slug) ?? null;
  try {
    const results = await wpFetch<WPLocation[]>(`/locations?slug=${slug}`);
    return results[0] ?? null;
  } catch (err) {
    if ((err as { status?: number }).status === 404) {
      const results = await wpFetch<WPLocation[]>(`/posts?slug=${slug}`);
      return results[0] ?? null;
    }
    return mockLocations.find((l) => l.slug === slug) ?? null;
  }
}

// ── Projects (standard WP Posts) ──────────────────────────────────────────────

/**
 * Get recent projects (posts).
 * WP endpoint: GET /wp-json/wp/v2/projects?_embed&per_page=6
 */
export async function getRecentProjects(limit = 6): Promise<WPProject[]> {
  if (!BASE) return mockProjects.slice(0, limit);
  try {
    return await wpFetch<WPProject[]>(`/projects?_embed&per_page=${limit}&orderby=date&order=desc`);
  } catch (err) {
    if ((err as { status?: number }).status === 404) {
      return wpFetch<WPProject[]>(`/posts?_embed&per_page=${limit}&orderby=date&order=desc`);
    }
    return mockProjects.slice(0, limit);
  }
}

// ── Home page (standard WP Page, slug: "home") ────────────────────────────────

/**
 * Get homepage ACF options.
 * WP endpoint: GET /wp-json/wp/v2/pages?slug=home
 *
 * On the WP side, create a Page titled "Home Options" with slug "home"
 * and attach the "Home Settings" ACF field group to it.
 */
export async function getHomePage(): Promise<WPPage | null> {
  if (!BASE) return mockHomePage;
  try {
    const results = await wpFetch<WPPage[]>("/pages?slug=home");
    return results[0] ?? null;
  } catch {
    return mockHomePage;
  }
}

// ── Media (attachments) ──────────────────────────────────────────────────────

export interface WPMediaItem {
  id: number;
  source_url: string;
  alt_text?: string;
}

/**
 * Get media attached to a specific post/CPT item.
 * WP endpoint: GET /wp-json/wp/v2/media?parent={postId}&per_page=1&orderby=menu_order&order=asc
 *
 * Uses `parent` to scope results to that post only — avoids pulling random
 * images from the whole Media Library.
 */
export async function getMediaForPost(postId: number): Promise<WPMediaItem | null> {
  if (!BASE) return null;
  try {
    const items = await wpFetch<WPMediaItem[]>(
      `/media?parent=${postId}&per_page=1&orderby=menu_order&order=asc`
    );
    return items[0] ?? null;
  } catch {
    return null;
  }
}
