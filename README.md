# Sai Ram PalaKova — Premium Website

Modern, high-converting website for **Sai Ram PalaKova** — traditional Andhra buffalo milk sweets (kattela poyyi / wood-fire).

**Stack:** React 18 + Vite (SPA frontend), PHP + MySQL (API & admin), Bootstrap 5, GSAP (XAMPP).

## Quick start

1. Copy project to `C:\xampp\htdocs\palakova_project`
2. Start **Apache** + **MySQL** in XAMPP
3. Create database `sairam_palakova` in phpMyAdmin
4. Import `database.sql`
5. Edit `includes/config.php` (DB credentials, phone, WhatsApp)
6. **React frontend** (requires [Node.js](https://nodejs.org/) LTS):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Dev UI: `http://localhost:5173/palakova_project/`

7. **Production build** (served from `index.php` when `/dist` exists):
   ```bash
   cd frontend
   npm run build
   ```
   Then open: `http://localhost/palakova_project/`

## Pages (React SPA)

| Page | Route |
|------|-------|
| Home | `/` |
| Shop | `/products` |
| Our Story | `/about` |
| Contact | `/contact` |
| Track Order | `/track-order` |
| Admin | `admin/` (PHP, unchanged) |

Legacy PHP pages (`products.php`, etc.) remain as fallback until you run `npm run build`.

## Features

### Frontend
- Cinematic hero, GSAP scroll animations
- Cart drawer + wishlist (localStorage)
- Product search & category filters
- Testimonial slider, FAQ, fresh-batch countdown
- Mobile bottom navigation + WhatsApp float
- Toast notifications, instant load (no blocking page loader)
- Code-split routes, lazy images, React cart/wishlist context

### Backend
- `api/submit_order.php` — save orders
- `api/submit_contact.php` — contact form
- `api/products.php` — JSON product list
- `api/track_order.php` — order lookup by mobile
- Admin: dashboard stats, orders, messages, products CRUD

### SEO
- Schema.org JSON-LD (FoodEstablishment)
- `robots.txt`, `sitemap.xml` (update URLs for production)
- Canonical URLs, Open Graph meta

## Users table (admin)

| Column | Type | Required |
|--------|------|----------|
| `id` | INT, auto | yes (PK) |
| `username` | VARCHAR(50) | yes, unique |
| `password` | VARCHAR(255) | yes (bcrypt hash) |
| `created_at` | TIMESTAMP | yes (auto) |

**Existing database?** Run `database/migrate_users.sql` in phpMyAdmin.

**Add another admin** (phpMyAdmin SQL):

```sql
INSERT INTO users (username, password) VALUES
('newadmin', '$2y$10$...');  -- use PHP password_hash('yourpassword', PASSWORD_DEFAULT)
```

## Production checklist

- [ ] Change default admin password (update `users.password` with a new bcrypt hash)
- [ ] Update `robots.txt` / `sitemap.xml` with your live domain
- [ ] Set real `BUSINESS_PHONE` and `BUSINESS_WHATSAPP`
- [ ] Enable HTTPS on Apache
- [ ] Consider hashed admin passwords (database users table)

## Folder structure

```
palakova_project/
├── frontend/         # React + Vite source
│   └── src/          # components, pages, hooks, context
├── dist/             # Production build (after npm run build)
├── index.php         # Serves /dist SPA when built, else legacy PHP
├── api/              # JSON endpoints
├── admin/            # Admin panel
├── assets/           # Shared images + legacy CSS/JS
├── includes/         # Legacy PHP partials
└── database.sql
```

Crafted with tradition · Pure buffalo milk · Nellore, AP
