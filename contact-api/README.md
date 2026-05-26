# Champion Contact API

Small Next.js API service for the portfolio contact form.

## What it does

- accepts `POST /api/contact`
- validates the incoming form payload
- stores the submission in Supabase
- sends the message to your mailbox with Resend
- exposes admin-protected routes for reading submissions and publishing current projects
- exposes admin-protected routes for publishing and moderating reviews
- exposes a public route for reading current projects on the portfolio
- exposes a public route for reading published public reviews on the portfolio
- protects the CV behind admin-approved access tokens and a request chat flow
- proxies the TechCrunch RSS feed for the blog screen
- runs cleanly on Vercel

## Folder to deploy on Vercel

Deploy the `contact-api` folder as its own Vercel project.

If this repo is connected to Vercel:

1. Create a new Vercel project.
2. Select this repository.
3. Set the Root Directory to `contact-api`.
4. Add the environment variables from `.env.example`.
5. Deploy.

## Required environment variables

Copy `.env.example` and fill in:

- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `SUPABASE_CONTACT_TABLE`
- `SUPABASE_ADMIN_USERS_TABLE`
- `SUPABASE_CURRENT_PROJECTS_TABLE`
- `SUPABASE_REVIEWS_TABLE`
- `SUPABASE_CV_ACCESS_CHATS_TABLE`
- `SUPABASE_CV_ACCESS_MESSAGES_TABLE`
- `CV_PDF_PATH`
- `CV_ACCESS_TOKEN_TTL_HOURS`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `ALLOWED_ORIGINS`
- `ADMIN_SESSION_SECRET`
- `ADMIN_SESSION_TTL_HOURS`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_UPLOAD_FOLDER`

`ALLOWED_ORIGINS` should be a comma-separated list of the frontend domains allowed to post to this API, for example:

```env
ALLOWED_ORIGINS=http://localhost:5173,https://champion.feeda.us
```

If you already have a legacy Supabase `service_role` key in an older setup, the API route still accepts `SUPABASE_SERVICE_ROLE_KEY` as a fallback, but `SUPABASE_SECRET_KEY` is the preferred variable name for this project.

## Supabase tables

Create this table in Supabase:

```sql
create table if not exists contact_messages (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null
);
```

Create this table for admin-managed live projects:

```sql
create table if not exists current_projects (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  title text not null,
  description text not null,
  image_url text not null,
  live_url text
);
```

Create this table for admin-managed reviews:

```sql
create table if not exists reviews (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  author_name text not null,
  author_role text,
  content text not null,
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  is_published boolean not null default false
);
```

Create this table for real admin login:

```sql
create table if not exists admin_users (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  username text not null unique,
  display_name text not null default 'Admin',
  password_hash text not null,
  is_active boolean not null default true,
  last_login_at timestamptz
);
```

If you use different table names, set:

```env
SUPABASE_CONTACT_TABLE=contact_messages
SUPABASE_ADMIN_USERS_TABLE=admin_users
SUPABASE_CURRENT_PROJECTS_TABLE=current_projects
SUPABASE_REVIEWS_TABLE=reviews
SUPABASE_CV_ACCESS_CHATS_TABLE=cv_access_chats
SUPABASE_CV_ACCESS_MESSAGES_TABLE=cv_access_messages
CV_PDF_PATH=private/sirchampion.pdf
CV_ACCESS_TOKEN_TTL_HOURS=72
```

## Protected CV access

The portfolio CV is no longer bundled in the frontend. Visitors start a chat request from the home page, and an admin approves the request to issue a one-time download token.

Place the PDF at `contact-api/private/sirchampion.pdf` or set `CV_PDF_PATH` to another readable path on the server.

When an admin approves a request, the API auto-replies in the chat with the requester's email as the username, the chat ID, and the access token.

Create the CV access tables with the SQL in [supabase/schema.sql](./supabase/schema.sql).

## Admin routes

Admin login now uses a real database-backed `admin_users` table plus a signed server-issued session token:

- `POST /api/admin/session`
- `GET /api/admin/session`
- `GET /api/admin/submissions`
- `POST /api/admin/uploads/project-image`
- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `GET /api/admin/reviews`
- `POST /api/admin/reviews`
- `PATCH /api/admin/reviews/:id`
- `GET /api/admin/cv-access/chats`
- `POST /api/admin/cv-access/chats/:chatId/approve`

The provided schema seeds a first admin account:

- username: `sirchamp`
- password: `sirchamp@dev`

## Public routes

- `GET /api/projects/current`
- `GET /api/reviews`
- `GET /api/blogs/techcrunch`
- `POST /api/cv-access/chats`
- `GET /api/cv-access/chats/:chatId`
- `POST /api/cv-access/chats/:chatId/messages`
- `GET /api/cv-access/download?token=`

## Cloudinary project images

Current project images are now uploaded through the admin API to Cloudinary and the returned hosted URL is saved in `current_projects.image_url`.

Set:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLOUDINARY_UPLOAD_FOLDER=champion
```

## Resend

Before production use:

1. Verify the sending domain in Resend.
2. Set `RESEND_FROM_EMAIL` to an address on that verified domain.
3. Set `CONTACT_TO_EMAIL` to the inbox that should receive form submissions.

## Frontend connection

This repo's Vite frontend can keep the same form logic.

Set:

```env
VITE_CONTACT_API_URL=https://your-contact-api.vercel.app
```

Then the existing forms will post to:

```txt
https://your-contact-api.vercel.app/api/contact
```

## Local development

From `contact-api`:

```bash
npm install
npm run dev
```

The local API will be available at:

```txt
http://localhost:3000/api/contact
```

## Quick Supabase setup

Run the SQL in [supabase/schema.sql](./supabase/schema.sql) inside the Supabase SQL editor before testing admin login or current projects.
