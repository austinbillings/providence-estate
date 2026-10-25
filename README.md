# Providence Estate Builders

Marketing and lead-generation site for [providenceestate.com](https://providenceestate.com) — Next.js (App Router) + Tailwind CSS + Sanity, deployed on Vercel.

```bash
vercel env pull .env.local   # Sanity project ID, dataset, tokens, revalidation secret
npm install
npm run dev     # http://localhost:3000 (Studio at /studio)
npm run build
```

## Content editing

Owners edit everything in **Sanity Studio** at `/studio`, signing in with their Sanity account. Content and photos live in Sanity (provisioned through the Vercel Marketplace), so deployments never touch them.

- **Business info:** name, email, phone, booking link, owners, ROC number, claim toggles, and the closing banner.
- **Pages:** headings, text, and photos for the homepage, About, Services, Process, Service areas, and Contact.
- **Services:** add, remove, reorder (by "Position"), and edit services. Each one gets its page, nav link, sitemap entry, and contact-form option automatically.
- **Shared lists:** promises, process steps, general FAQs, and service-area cities, used on several pages.

Published edits appear within seconds: a Sanity webhook calls `/api/revalidate`. If the webhook ever fails, pages still refresh within 60 seconds.

## Where things live

| What | File |
| --- | --- |
| Content schemas (what the Studio shows) | `sanity/schemaTypes/` |
| Studio sidebar layout | `sanity/structure.ts` |
| Content queries and types | `lib/cms.ts` |
| Fixed technical details (domain, ROC lookup URL) | `lib/site.ts` |
| Contact form options + lead delivery | `lib/inquiries.ts` |
| Colors and fonts | `app/globals.css`, `app/layout.tsx` |

## Launch checklist

- **Sanity access:** in [sanity.io/manage](https://www.sanity.io/manage), add CORS origins (with credentials) for `http://localhost:3000` and `https://providenceestate.com`, and invite the owners.
- **Publish webhook:** in sanity.io/manage → API → Webhooks, POST to `https://providenceestate.com/api/revalidate` on create/update/delete, with an `x-revalidate-secret` header set to the `SANITY_REVALIDATE_SECRET` value from Vercel.
- **Contact form delivery:** `deliverInquiry()` in `lib/inquiries.ts` is a stub. Until it's wired to an email service or CRM and returns `true`, submissions are validated and logged, and visitors are asked to send a pre-filled email instead (so no lead is lost).
- **Booking link and phone:** set them in Business info. Booking buttons switch from `/contact` to the booking page, and phone links appear across the site.
- **Unconfirmed claims:** the "Bonded & insured" and "Workmanship warranty" toggles in Business info are on for review. Turn them off until confirmed, and edit any promise or FAQ text that mentions them.
- **Photos:** current images are free Unsplash stand-ins. Replace them in the Studio with real project photos (and a portrait of Jacob and Steven on the About page).
