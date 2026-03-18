# Architecture & Performance Rules

> **Every code change must preserve or improve Core Vitals scores.**  
> When in doubt, measure first. These rules are non-negotiable defaults.

---

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 App Router | RSC, static prerendering, built-in image/font optimization |
| Styling | Tailwind CSS v3 | Zero-runtime, purged CSS, no JS cost |
| Components | shadcn/ui (RSC mode) | Unstyled Radix primitives, tree-shakeable |
| Language | TypeScript (strict off, but typed) | Safety without build overhead |
| Font | `next/font/google` | Self-hosted, preloaded, zero CLS |
| Images | `next/image` | AVIF → WebP, lazy by default, LCP-safe with `priority` |

---

## Rule 1 — Default to Server Components

Every component is a **React Server Component (RSC) unless it has to be client-side.**

A component needs `"use client"` only if it uses:
- `useState` / `useReducer` / `useEffect` / any React hook
- Browser APIs (`window`, `document`, event listeners)
- Third-party libs that require a DOM context

```
✅ Server Component (default)   →  Navbar static shell, Hero, Services, Footer
✅ Client Component (justified) →  Navbar mobile toggle (useState), Providers wrapper
❌ Never do this                →  "use client" on a component just to import an icon
```

---

## Rule 2 — No JS for Animations

Use **CSS `@keyframes` + Tailwind `@layer utilities`** for all entrance/transition effects.

```css
/* ✅ correct — GPU-composited, zero JS, zero TBT impact */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

```tsx
// ❌ never — ships ~100 kB, blocks TTI, causes layout thrash
import { motion } from "framer-motion";
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

**Allowed animation properties (compositor-only):** `opacity`, `transform` (translate, scale, rotate).  
**Never animate:** `width`, `height`, `top`, `left`, `margin`, `padding`, `background-color` (triggers layout/paint).

---

## Rule 3 — Font Loading

Always load fonts through `next/font`. Never use a CSS `@import` or a `<link>` tag for fonts.

```tsx
// ✅ app/layout.tsx
import { Geist } from "next/font/google";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

// Tailwind picks it up via:
// fontFamily: { sans: ["var(--font-geist)", ...] }
```

**Why:** `next/font` self-hosts the file, injects a `<link rel="preload">` in `<head>`, and eliminates the external DNS lookup + round-trip that blocks FCP.

---

## Rule 4 — Images

Every `<Image>` must have:

| Prop | Rule |
|---|---|
| `alt` | Always descriptive |
| `sizes` | Always set — prevents browser downloading a full-width image for a 50%-wide slot |
| `priority` | Set **only** on the above-the-fold LCP image (usually the hero). One per page. |
| `fill` or explicit `width`/`height` | Required — prevents CLS |
| Format | Handled automatically by Next.js (AVIF → WebP → original) |

```tsx
// ✅
<Image src={hero} alt="..." fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />

// ❌
<img src="/hero.jpg" />
```

---

## Rule 5 — Bundle Discipline

Before adding any `npm` dependency, answer these three questions:

1. **Is it used on the critical render path?** If not → `next/dynamic` lazy import.
2. **Does it require a DOM/browser API?** If yes → `"use client"` + lazy import.
3. **Can the same result be achieved with CSS or a native API?** If yes → don't install it.

### Current bundle budget

| Chunk | Max size |
|---|---|
| First Load JS (per route) | **120 kB** |
| Route-specific JS | **20 kB** |
| CSS (all) | **15 kB** |

### Packages that are banned
| Package | Replacement |
|---|---|
| `framer-motion` | CSS `@keyframes` |
| `@tanstack/react-query` | `fetch` in RSC / `use` hook / `server-actions` |
| `axios` | Native `fetch` |
| `moment` / `dayjs` | `date-fns` (already installed, tree-shakeable) |
| `lodash` | Native JS or individual `lodash-es` imports |
| `styled-components` / `emotion` | Tailwind CSS |

---

## Rule 6 — Providers / Context

Keep the **root layout a Server Component**. Push all `"use client"` providers into a single `src/components/Providers.tsx`.

- Lazy-load any provider that is not needed for the initial paint (`Toaster`, `Sonner`, modals, etc.) using `next/dynamic`.
- Never wrap the entire app in `QueryClientProvider` unless a route actually fetches data client-side.

---

## Rule 7 — Static by Default

Every page should be `○ (Static)` in the build output unless it explicitly needs dynamic data.

```
○  (Static)   prerendered as static HTML  ← target for all marketing/landing pages
●  (SSG)      uses generateStaticParams   ← blog posts, product pages
ƒ  (Dynamic)  rendered per-request        ← only when req-time data is unavoidable
```

Do not use `export const dynamic = "force-dynamic"` without a documented reason.

---

## Rule 8 — Caching & Headers

Static assets are already configured with immutable cache headers in `next.config.ts`:

```
/_next/static/*          Cache-Control: public, max-age=31536000, immutable
/*.{jpg,webp,avif,...}   Cache-Control: public, max-age=31536000, immutable
```

Do not change these. When deploying to Vercel or a CDN, these headers flow through automatically.

---

## WordPress Integration

### Why Headless WordPress?

The client's SEO equity lives in WordPress — permalink slugs, redirects, taxonomy hierarchy, and Google Business Profile data. Migrating *away* from WordPress risks losing that equity. Instead, WP becomes a **headless CMS**: the team edits content normally; Next.js serves statically-cached pages from CDN edge in < 50 ms TTFB.

### Custom Post Types (CPTs)

Install `wp-plugin/fenceco-cpt.php` in WordPress. It registers three CPTs:

| CPT slug | REST endpoint | Next.js route |
|---|---|---|
| `service` | `/wp-json/wp/v2/services` | `/services/[slug]` |
| `location` | `/wp-json/wp/v2/locations` | `/service-area/[slug]` |
| `project` | `/wp-json/wp/v2/projects` | `/` (grid) |

ACF field groups are registered programmatically (no JSON export needed). Requires **ACF PRO ≥ 5.11** or the free **ACF to REST API** plugin so the `acf` key is present in REST responses.

### ACF Field Map

#### Service CPT (`/wp-json/wp/v2/services?slug=x`)
| ACF field | Type | Used in Next.js |
|---|---|---|
| `tagline` | text | Hero badge, service card |
| `short_description` | textarea | `<meta description>` |
| `hero_image_url` | url | Hero `<Image>` fallback |
| `hero_image_alt` | text | `alt` attribute |
| `price_tiers[]` | repeater | Pricing tiers section |
| `features[]` | repeater | Feature bullet list |
| `faqs[]` | repeater | FAQ accordion |

#### Location CPT (`/wp-json/wp/v2/locations?slug=x`)
| ACF field | Type | Used in Next.js |
|---|---|---|
| `city` | text | Hero, page title, footer |
| `county` | text | Meta description |
| `hero_headline` | text | `<h1>` |
| `hero_subheadline` | text | Hero subtitle |
| `intro_text` | textarea | Hero paragraph |
| `faqs[]` | repeater | City FAQ section |
| `nearby_cities[]` | repeater | Nearby city pill links |

#### Home Page (`/wp-json/wp/v2/pages?slug=home`)
| ACF field | Type | Used in Next.js |
|---|---|---|
| `hero_headline` | text | `<h1>` on homepage |
| `hero_image_url` | url | Hero `<Image>` |
| `phone_primary` | text | Navbar, footer, hero CTA |
| `email` | email | Footer |
| `address` | text | Footer |
| `why_us_items[]` | repeater | Why-Us section tiles |

### Data Flow

```
WordPress Admin
      │  editor saves CPT post
      ▼
save_post hook (fenceco-cpt.php)
      │  POST /api/revalidate  +  x-revalidate-token header
      ▼
Next.js /api/revalidate endpoint
      │  validates token, calls revalidatePath()
      ▼
ISR cache invalidated for affected route(s)
      │  next visitor triggers background regeneration
      ▼
Vercel CDN serves fresh static page  (<50 ms TTFB)
```

### Revalidation Map

| WP post type | Routes revalidated |
|---|---|
| `service` | `/services/[slug]`, `/` |
| `location` | `/service-area/[slug]`, `/` |
| `project` | `/`, `/projects/[slug]` |
| `page` (home) | `/` |

### Mock Data Fallback

`src/lib/mock-data.ts` provides realistic placeholder data matching the exact WP REST API shape. All fetch functions in `src/lib/wordpress.ts` return mock data when `WP_API_URL` is not set:

```ts
const BASE = process.env.WP_API_URL;
if (!BASE) return mockServices;  // dev works without live WP
```

### Go-Live Checklist

1. Upload `wp-plugin/fenceco-cpt.php` → activate in WP Admin
2. Install ACF PRO (or free ACF to REST API plugin)
3. Enter CPT content: Services, Locations, Projects, Home Page ACF fields
4. Set environment variables on Vercel:
   - `WP_API_URL=https://your-wp-site.com`
   - `WP_REVALIDATE_TOKEN=<long-random-secret>`
5. Add to `wp-config.php`:
   ```php
   define( 'FENCECO_NEXTJS_URL', 'https://your-vercel-app.vercel.app' );
   define( 'FENCECO_REVALIDATE_TOKEN', '<same-long-random-secret>' );
   ```
6. Run `npm run build` — confirm all routes show `○ (Static)` or `ƒ (ISR)`
7. Deploy to Vercel — verify `/api/revalidate` responds 200 after a WP post save

---

## Checklist Before Every PR

- [ ] `npm run build` passes with **zero warnings**
- [ ] No new `"use client"` without justification comment
- [ ] No new animation library imports — use CSS keyframes
- [ ] Every new `<Image>` has `sizes`, `alt`, and explicit dimensions or `fill`
- [ ] First Load JS for affected routes stays under **120 kB**
- [ ] No new fonts loaded via `<link>` or CSS `@import`
- [ ] Lazy-load any component not needed for initial paint
