# WakeUp Nepal Builders – Next.js + Prisma + MySQL

Production-style website starter based on the approved WakeUp Nepal Builders homepage mockup. Includes public marketing pages, responsive UI, Prisma/MySQL data layer, contact inquiry capture, protected admin login and CMS-style management pages.

## Stack
- Next.js App Router + TypeScript
- React
- Prisma ORM
- MySQL 8
- Server Actions + Route Handlers
- JWT cookie sessions with `jose`
- Password hashing with `bcryptjs`
- Plain responsive CSS (no Tailwind dependency)

## Quick start
1. Copy `.env.example` to `.env` and set `AUTH_SECRET`.
2. Start MySQL: `docker compose up -d`.
3. Install packages: `npm install`.
4. Generate Prisma client: `npm run prisma:generate`.
5. Create database tables: `npm run prisma:migrate -- --name init`.
6. Seed demo content: `npm run prisma:seed`.
7. Start the app: `npm run dev`.

Open `http://localhost:3000`.

### Seed admin
- Email: `admin@wakeupnepalbuilders.com`
- Password: `Admin@12345`

**Change the seed password immediately for production.**

## Admin routes
- `/admin` dashboard
- `/admin/services`
- `/admin/materials`
- `/admin/projects`
- `/admin/inquiries`
- `/admin/settings`

## Main folders
```text
app/                       Next.js routes
  admin/                   Protected admin CMS
  api/                     Login, logout and inquiry endpoints
components/
  site/                    Public website components
  admin/                   Admin navigation/components
lib/                       Prisma, auth, fallback content/data helpers
prisma/                    Database schema and seed data
public/assets/             Logo and PNG assets used by the UI
preview/                   Static preview used to generate the full-page PNG
```

## Production notes
- Replace the demo `AUTH_SECRET` with a strong random secret.
- Change the seeded admin password.
- Configure production `DATABASE_URL`.
- Put the app behind HTTPS.
- Consider object storage (S3/R2/Cloudinary) if the admin will upload project photos.
- Add backups and database monitoring before launch.
