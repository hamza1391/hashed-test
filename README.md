# Venuze

Venuze is a marketing and venue-listing frontend. It has a pixel-matched landing page and a `/venue` search results experience (keyword search, category tabs, filter dialog, cards, and a Leaflet map).

There is no backend. Listings, copy, and images are local mock data so the UI can be demonstrated end to end.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · TanStack Query · Axios · Zustand · Leaflet / react-leaflet · lucide-react

**Brand color:** `#ff5037` (`brand` in Tailwind)

**Breakpoints used in layout:** mobile, `md` (768px), `lg` (1024px)

---

## Setup instructions

### Requirements

- Node.js 20+
- [pnpm](https://pnpm.io) 11 (the repo pins `"packageManager": "pnpm@11.1.1"`)

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script        | Command       | Purpose              |
| ------------- | ------------- | -------------------- |
| Dev server    | `pnpm dev`    | Local development    |
| Production    | `pnpm build`  | Create a production build |
| Start         | `pnpm start`  | Serve the production build |
| Lint          | `pnpm lint`   | ESLint               |

### Routes

| Path     | Page |
| -------- | ---- |
| `/`      | Landing (hero through destinations) |
| `/venue` | Venue listing + map. Search query: `?where=&when=&guests=&tab=` |

Example after a hero search:

```
/venue?where=dubai&when=today&guests=10-20&tab=venue
```

No `.env` file is required. Maps use public Carto / OpenStreetMap tiles (no API key).

---

## How the project is organized

```
app/                         Next.js App Router
  layout.tsx                 Root layout: fonts, Providers, Header, main, footer
  providers.tsx              QueryClientProvider
  page.tsx                   Landing page (sections only)
  venue/page.tsx             Venue listing (Suspense around client page)
  api/                       Route handlers used by Axios + TanStack Query
    catalog/route.ts         Search options, categories, sort
    home/route.ts            Landing-section content
    venues/route.ts          Filtered venue listings
    contact/route.ts         Contact form submit
  globals.css                Tailwind v4 theme, brand tokens, map/slider CSS

components/                  UI only
  layout/                    Header, compact search, footer, contact form
  section/                   Landing-page blocks
  venue/                     Listing page and map/filters/cards
  ui/                        Shared dropdown

hooks/                       TanStack Query hooks
  use-catalog.ts
  use-home-content.ts
  use-venue-listings.ts
  use-submit-contact.ts

lib/
  api/                       Axios client + API functions
  query/                     QueryClient + query key factory
  data/                      Mock datasets (stand-in for a database)
  search/                    URL search-param helpers
  venues/                    Listing types, filter defaults, search logic

store/
  ui-store.ts                Chrome UI: dropdowns, carousels, search fields
  venue-store.ts             Listing UI: keywords, filter dialog, selected pin

public/images/               Logos, hero, cards, empty state, section assets
```

**Path alias:** `@/*` maps to the repo root (`tsconfig.json`).

### Data vs UI

`lib/data/` is mock data only (no React hooks). `lib/api/` exposes Axios calls to `/api/*`. Components read server state through `hooks/` (TanStack Query), not from `lib/data` directly.

Footer copy is still imported in the server `Footer` component. London venues are defined first; copies are generated for Dubai, Abu Dhabi, Sharjah, and Doha so a city search still returns cards.

### Layout chrome

`Header` and `ConditionalFooter` sit in `app/layout.tsx` so they appear on every route. The landing page does not render its own header/footer. On `/venue` the footer is omitted so the list + map can fill the viewport under the compact header.

---

## Technical decisions

### Next.js 16 App Router

Pages and layout use the App Router. Client navigation uses `useRouter` and `useSearchParams` from `next/navigation` (not the Pages Router `next/router`). `useSearchParams` is wrapped in a `<Suspense>` boundary on `/venue` so the route can still prerender.

Hero and compact **Search** call `router.push(buildVenueSearchPath(...))` so the selected Where / When / Guests / tab become URL state.

### Client components where interactivity lives

Header, search, carousels, listing, map, and filters are `"use client"` because they use Zustand, scroll listeners, or Leaflet. The root layout and `app/page.tsx` stay server components and compose those clients.

### Tailwind v4 + screenshot-driven layout

Styling is Tailwind v4 (`@import "tailwindcss"` and `@theme inline` in `globals.css`). Brand orange is `--color-brand`. Layouts were matched to design screenshots at mobile / tablet / desktop rather than a generic design system.

`next/image` is used for photographs and logos. `next.config.ts` allows SVG (`dangerouslyAllowSVG`) because many assets in `public/images` are SVGs, with a tight image CSP.

### Leaflet loaded client-only

`react-leaflet` does not run on the server. The map is loaded with `next/dynamic(..., { ssr: false })`. Tiles are Carto light tiles (no Mapbox key). Map pane z-index is forced down in CSS so overlays can sit above it.

### Filters dialog via portal

Leaflet map panes sit at z-index 400–1000. A normal in-page dialog painted behind the map. The filter panel is rendered with `createPortal(..., document.body)` at `z-[10000]` and slides in from the right.

### Destination CTA overlapping the footer

The “Turn Your Venue into a Destination” banner is pulled out of the white destinations block and given a negative bottom margin so it sits on top of the black footer. Extra footer top padding leaves the rounded corners visible. An earlier `main` stacking context (`relative z-0`) hid this overlap and was removed.

### Dual header

On `/`, the header is transparent over the hero at the top of the page. After scroll (or on `/venue`), it switches to a sticky white compact bar: icon + wordmark, compact search, “Add your listing”, language, avatar. Compact search uses its own dropdown ids (`compactWhere`, `compactWhen`, `compactGuests`) so it does not collide with the hero dropdowns.

### TanStack Query + Next route handlers

Server state (catalog, homepage content, venue search, contact submit) goes through Axios → `app/api/*` → TanStack Query hooks. Mock data still lives in `lib/data/` so the UI works without an external backend. Filtering runs in `lib/venues/search.ts` on the server route, not in the Zustand store.

`QueryClientProvider` is in `app/providers.tsx`, following the Next.js 16 TanStack Query setup (new client per server request, one reused client in the browser).

---

## State management approach

**TanStack Query** owns server state. **Zustand** owns UI chrome. Applied city/guests/tab for results live in the **URL**.

### TanStack Query (`hooks/`)

| Hook | Source | Used by |
| --- | --- | --- |
| `useCatalog` | `GET /api/catalog` | Header, hero search, listing categories/filters |
| `useHomeContent` | `GET /api/home` | Landing sections |
| `useVenueListingsQuery` | `GET /api/venues` | Listing grid, map, results bar |
| `useSubmitContact` | `POST /api/contact` | Footer contact form |

`useVenueListingsQuery` sends URL params plus Zustand keywords, category, sort, and applied filters. The route runs `searchVenueListings()`. Vendors tab returns no rows. `keepPreviousData` keeps the last list visible while a new query loads.

### `store/ui-store.ts` — shared UI

- Hero / compact search fields: `locationId`, `dateId`, `guestsId`, `listingTab`
- Which dropdown is open: `openDropdown` (one at a time)
- Language, hero slide, carousel indexes, featured category and favorites

Selecting a location/date/guests updates the store immediately (dropdown labels). **Results do not change until Search is clicked**, because listings read the URL.

### `store/venue-store.ts` — listing UI only

- Keyword draft + chips, category tab, sort
- Draft vs applied filters (dialog edits `draftFilters`; Apply copies to `appliedFilters`)
- Selected venue (card + map pin)

Default applied filters match the listing screenshot chips: Verified, Parking, Kitchen, min size 2000 sq ft.

### Dropdowns

`components/ui/dropdown.tsx` is controlled by `openDropdown` in the UI store.

### What is *not* in Zustand

- Applied search (city / guests / tab) for results: URL + Query
- Listing rows and homepage copy: Query → API routes → `lib/data/`

---

## Assumptions

- This is a **frontend demo**. There is no auth, booking, payments, or CMS.
- **Hero search is the way to reach relevant listing data.** Choosing Dubai + 10–20 guests + Search should land on `/venue` with Dubai venues that can hold at least 10 guests.
- **Guest count** means “venue capacity ≥ the lower bound of the selected range,” not a tight max (a 300-person studio still appears for 10–20 guests).
- **When (date)** is stored in the URL and header for fidelity to the design. Mock listings have no availability calendar, so date does not hide rows.
- **Vendors** is a tab in the hero UI; there is no vendor catalog, so that tab shows the empty state.
- **Default listing filters** (Parking, Kitchen, verified, min 2000 sq ft) stay on until the user clears them, so first paint matches the design even if that hides some smaller venues.
- Cities other than London reuse the London listing set with new ids, labels, and coordinates.
- Copy, avatars, and “John Snow” are placeholder marketing content.
- Language EN/AR only switches the label in the header; the site is not localized.
- “Add a venue / vendor” and profile items are UI only (no destination flows).
- Screenshots are the source of truth for spacing, type, and breakpoints.

---

## Challenges faced

### Filter dialog behind the map

Leaflet panes use a high z-index. A CSS z-index on the dialog inside the listing column was not enough. **Fix:** portal the dialog to `document.body` at `z-[10000]`, and keep the map wrapper at `z-0`.

### Listing hidden under the footer

The venue page is `100svh` minus the header. Inside `main { flex-1 }`, that height plus a visible footer clipped or covered the bottom of the list. **Fix:** do not render the footer on `/venue`.

### Destination CTA vs footer

1. `main` with `relative z-0` created a stacking context, so the footer painted over the CTA. That class was removed.
2. Keeping the CTA inside a `bg-white` section made a white slab cover the footer around the banner. **Fix:** render the CTA as a sibling after the white block, pull it down with negative margin, and add footer padding so black shows around the rounded corners.

### Header: two designs on one component

The landing needs a transparent overlay on first paint and a white compact bar after scroll; inner pages always need the compact bar. Pathname + scroll position drive the mode. Compact and hero search fields needed **separate dropdown ids** so opening “Where” in the header does not fight the hero panel.

### Search had to be a real navigation

A `<Link href="/venue">` ignored the dropdowns. Search now builds a query string and `router.push`es it. The listing page parses params and filters. `useSearchParams` required a **Suspense** boundary on the venue page.

### SVG images in `next/image`

Many assets are SVGs. Next.js blocks them unless `images.dangerouslyAllowSVG` is enabled, with a restrictive CSP on image responses.

### Leaflet and SSR

Importing the map in a server graph crashes. The map module is dynamically imported with `ssr: false`.

### Stacking and z-index in general

Header, dropdowns, map panes, filter overlay, and footer overlap by design. Each layer needed an explicit z-index and, in the CTA case, avoidance of extra stacking contexts on `main`.
