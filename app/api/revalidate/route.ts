import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/cms";

/**
 * Called by the Sanity webhook on every publish, so edits show up right away
 * instead of waiting for the 60-second cache fallback. The whole site shares
 * one tag; it's small enough that refreshing everything is simplest.
 */
export async function POST(request: Request) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected) {
    return Response.json({ error: "Revalidation is not configured" }, { status: 500 });
  }

  const given = Buffer.from(request.headers.get("x-revalidate-secret") ?? "");
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length || !timingSafeEqual(given, wanted)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(CONTENT_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}
