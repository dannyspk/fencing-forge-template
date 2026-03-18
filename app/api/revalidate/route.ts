/**
 * On-demand ISR revalidation webhook.
 *
 * WordPress calls this endpoint via the fenceco-cpt.php plugin
 * whenever a Service, Location, Project, or Page is saved/published.
 *
 * WP sends:
 *   POST /api/revalidate
 *   Headers: { "x-revalidate-token": "<WP_REVALIDATE_TOKEN>" }
 *   Body:    { "type": "service" | "location" | "project" | "home", "slug": "wood-fences" }
 *
 * Next.js then purges the static cache for that specific path,
 * triggering a background re-fetch from the WP REST API.
 *
 * This means editors see their changes live within seconds of saving in WP —
 * without a full redeploy.
 */

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token");

  if (token !== process.env.WP_REVALIDATE_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { type?: string; slug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { type, slug } = body;

  if (!type) {
    return NextResponse.json({ error: "Missing type" }, { status: 400 });
  }

  const pathsToRevalidate: string[] = [];

  switch (type) {
    case "service":
      if (slug) pathsToRevalidate.push(`/services/${slug}`);
      pathsToRevalidate.push("/"); // home page shows services grid
      break;
    case "location":
      if (slug) pathsToRevalidate.push(`/service-area/${slug}`);
      pathsToRevalidate.push("/");
      break;
    case "project":
      pathsToRevalidate.push("/"); // home page shows recent projects
      if (slug) pathsToRevalidate.push(`/projects/${slug}`);
      break;
    case "home":
      pathsToRevalidate.push("/");
      break;
    default:
      return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
  }

  for (const path of pathsToRevalidate) {
    revalidatePath(path);
  }

  return NextResponse.json({
    revalidated: true,
    paths: pathsToRevalidate,
    timestamp: new Date().toISOString(),
  });
}
