create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null
);

create table if not exists public.admin_users (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  username text not null unique,
  display_name text not null default 'Admin',
  password_hash text not null,
  is_active boolean not null default true,
  last_login_at timestamptz
);

create table if not exists public.current_projects (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  title text not null,
  description text not null,
  image_url text not null,
  live_url text
);

create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  author_name text not null,
  author_role text,
  content text not null,
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  is_published boolean not null default false
);

grant usage on schema public to anon, authenticated, service_role;
grant all privileges on table public.reviews to service_role;
grant select, insert, update, delete on table public.reviews to anon, authenticated;
grant usage, select on sequence public.reviews_id_seq to anon, authenticated, service_role;

insert into public.reviews (
  author_name,
  author_role,
  content,
  visibility,
  is_published,
  created_at
)
select
  'Dr. Omoregie',
  'Client',
  'Champion, your humility and speed are unmatched. You delivered every detail flawlessly and moved with impressive care.',
  'public',
  true,
  '2025-01-14T00:00:00Z'::timestamptz
where not exists (
  select 1
  from public.reviews
  where author_name = 'Dr. Omoregie'
    and content = 'Champion, your humility and speed are unmatched. You delivered every detail flawlessly and moved with impressive care.'
);

insert into public.reviews (
  author_name,
  author_role,
  content,
  visibility,
  is_published,
  created_at
)
select
  'Michael Scott',
  'CEO, Scottified',
  'Champion made our mobile app real in record time. The delivery pace and execution quality stood out immediately.',
  'public',
  true,
  '2021-02-09T00:00:00Z'::timestamptz
where not exists (
  select 1
  from public.reviews
  where author_name = 'Michael Scott'
    and content = 'Champion made our mobile app real in record time. The delivery pace and execution quality stood out immediately.'
);

insert into public.reviews (
  author_name,
  author_role,
  content,
  visibility,
  is_published,
  created_at
)
select
  'Mr. Charles',
  'Founder, Prime Procurement',
  'Champion''s portfolio work elevated our brand. His React and TypeScript execution felt polished from start to finish.',
  'public',
  true,
  '2022-03-03T00:00:00Z'::timestamptz
where not exists (
  select 1
  from public.reviews
  where author_name = 'Mr. Charles'
    and content = 'Champion''s portfolio work elevated our brand. His React and TypeScript execution felt polished from start to finish.'
);

update public.reviews
set created_at = '2025-01-14T00:00:00Z'::timestamptz
where author_name = 'Dr. Omoregie'
  and content = 'Champion, your humility and speed are unmatched. You delivered every detail flawlessly and moved with impressive care.';

update public.reviews
set created_at = '2021-02-09T00:00:00Z'::timestamptz
where author_name = 'Michael Scott'
  and content = 'Champion made our mobile app real in record time. The delivery pace and execution quality stood out immediately.';

update public.reviews
set created_at = '2022-03-03T00:00:00Z'::timestamptz
where author_name = 'Mr. Charles'
  and content = 'Champion''s portfolio work elevated our brand. His React and TypeScript execution felt polished from start to finish.';

insert into public.admin_users (username, display_name, password_hash)
select
  'sirchamp',
  'Sirchamp',
  's1$0ddae0b831de2f1dc796d0c0cb5b7b76$5d324e8327f7807d3caa2e30b9fdb37870cd078617cf7783ce47f500e78d1a6fbd7985bb2aa951085c3e1e244747d2a248a62b7db35044b9aa693111e9cc6697'
where not exists (
  select 1
  from public.admin_users
  where username = 'sirchamp'
);

notify pgrst, 'reload schema';
