# Sai Ram PalaKova — Premium Website

Modern, high-converting **static** website for **Sai Ram PalaKova** — traditional Andhra buffalo milk sweets (kattela poyyi / wood-fire). Built to showcase the brand, drive WhatsApp and phone orders, and rank well in search — **no server database or PHP backend** in this repo.

**Live site:** [sairampalakova.com](https://sairampalakova.com)  
**Repository:** [github.com/akileshghattamaneni/Sairampalakova](https://github.com/akileshghattamaneni/Sairampalakova)

**Stack:** React 18 · Vite · React Router · Bootstrap 5 · Framer Motion · GSAP (CDN) · Netlify Forms (contact)

---

## Quick start

Requires [Node.js](https://nodejs.org/) LTS (18+).

```bash
# From repo root
npm install --prefix frontend
npm run dev
```

Dev server: **http://localhost:5173/palakova_project/** (see `base` in `frontend/vite.config.js`).

**Production build** (output → `/dist`):

```bash
npm run build
npm run preview   # optional local preview of dist
```

---

## Pages (React SPA)

| Page        | Route              |
|-------------|--------------------|
| Home        | `/`                |
| Shop        | `/products`        |
| Product     | `/products/:slug`  |
| Our Story   | `/about`           |
| Contact     | `/contact`         |
| Not found   | `/404`             |

All routes are client-side; the host must serve `index.html` for unknown paths (SPA fallback).

---

## Features

### Business & UX
- Cinematic hero, scroll reveal, GSAP section animations
- Product catalog from static JSON (`frontend/src/data/products.json`)
- Cart drawer + wishlist (browser `localStorage`)
- Product search and category filters
- Testimonials, FAQ, fresh-batch countdown
- Mobile bottom bar (Order → WhatsApp / Call / Maps)
- Desktop footer with WhatsApp, phone, Instagram, YouTube
- WhatsApp deep links and click-to-call throughout

### Contact & orders
- **No backend API** — orders and enquiries go through **WhatsApp** and **phone**
- Contact form posts to **Netlify Forms** when deployed on Netlify (see `frontend/index.html` + `ContactPage.jsx`)

### Performance & code
- Route-based code splitting (lazy pages)
- Lazy-loaded images, shared React context (cart, products, toasts)
- No blocking full-page loader

### SEO
- Per-page titles and meta via `react-helmet-async` (`Seo` component)
- Schema.org JSON-LD on key pages (e.g. FoodEstablishment on home)
- Root `robots.txt` and `sitemap.xml` — keep URLs in sync with production domain
- Canonical URLs and Open Graph meta

---

## Configuration

Edit **`frontend/src/config/site.js`** for:

- Business name, phone, WhatsApp
- Site URL, address
- Instagram and YouTube links

Product copy, prices, and images: **`frontend/src/data/`** (`products.json`, `testimonials.json`, etc.).

Images: **`assets/images/`** (also copied under `frontend/public/assets/` for dev/build).

---

## Deploy (Netlify)

Typical settings:

| Setting            | Value        |
|--------------------|--------------|
| Build command      | `npm run build` |
| Publish directory  | `dist`       |
| Node version       | 18 or 20     |

Add a **`_redirects`** or **`netlify.toml`** SPA rule so all paths serve the app, for example:

```
/*    /index.html   200
```

Enable **Netlify Forms** on the site so the contact form is processed.

For a **root domain** (e.g. `sairampalakova.com`), set Vite `base: '/'` in `frontend/vite.config.js` and rebuild so asset paths match production.

---

## Production checklist

- [ ] Update `SITE.siteUrl`, phone, WhatsApp, and address in `frontend/src/config/site.js`
- [ ] Set Vite `base` to match hosting path (`/` for apex domain)
- [ ] Update `robots.txt`, `sitemap.xml`, and `frontend/public/sitemap.xml` with live URLs
- [ ] Run `npm run build` and verify contact form + WhatsApp links on staging
- [ ] Confirm HTTPS and custom domain on Netlify (or your static host)

---

## Folder structure

```
Sairampalakova/
├── frontend/              # React + Vite source
│   ├── public/            # Static files, Netlify form stub, manifest
│   └── src/
│       ├── components/    # Layout, UI, product cards, modals
│       ├── pages/         # Route pages
│       ├── sections/      # Home sections
│       ├── data/          # Products, testimonials, FAQ content (JSON/JS)
│       ├── config/site.js # Site-wide constants
│       ├── context/       # Cart, products, toast
│       └── styles/        # Global CSS
├── assets/                # Brand images (shared)
├── dist/                  # Production build (generated; gitignored)
├── index.html             # Root redirect / hosting entry (if used)
├── package.json           # Root scripts → frontend
├── robots.txt
└── sitemap.xml
```

---

## Scripts (repo root)

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Vite dev server          |
| `npm run build` | Production build → `dist` |
| `npm run preview` | Preview `dist` locally |

---

Crafted with tradition · Pure buffalo milk · Nellore, AP
