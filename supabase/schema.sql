-- Blogger App: komplettes Datenbankschema für den Supabase SQL Editor
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  content text not null check (char_length(content) > 0),
  category text not null check (char_length(category) between 1 and 80),
  status text not null default 'draft' check (status in ('draft', 'published', 'disabled')),
  image_url text,
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_user_id_idx on public.posts(user_id);
create index if not exists posts_public_idx on public.posts(status, created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at before update on public.posts
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- SECURITY DEFINER verhindert rekursive profiles-Policies.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create or replace function public.current_user_role()
returns text language sql stable security definer set search_path = '' as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'user');
$$;
revoke all on function public.current_user_role() from public;
grant execute on function public.current_user_role() to authenticated;

alter table public.profiles enable row level security;
alter table public.posts enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles for select
using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update
using (id = auth.uid()) with check (id = auth.uid() and role = public.current_user_role());

drop policy if exists "posts_public_or_owner_or_admin_select" on public.posts;
create policy "posts_public_or_owner_or_admin_select" on public.posts for select
using (status = 'published' or user_id = auth.uid() or public.is_admin());
drop policy if exists "posts_owner_insert" on public.posts;
create policy "posts_owner_insert" on public.posts for insert to authenticated
with check (user_id = auth.uid() and status in ('draft', 'published'));
drop policy if exists "posts_owner_or_admin_update" on public.posts;
create policy "posts_owner_or_admin_update" on public.posts for update to authenticated
using (user_id = auth.uid() or public.is_admin())
with check ((user_id = auth.uid() and status in ('draft', 'published')) or public.is_admin());
drop policy if exists "posts_owner_or_admin_delete" on public.posts;
create policy "posts_owner_or_admin_delete" on public.posts for delete to authenticated
using (user_id = auth.uid() or public.is_admin());

-- Öffentlicher Bucket: URLs sind lesbar, Schreiben/Löschen bleibt per Policy geschützt.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('post-images', 'post-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- Die Policies für storage.objects werden im Supabase Dashboard unter
-- Storage -> Policies -> OBJECTS angelegt. Manche Projekte erlauben dem
-- SQL Editor nicht, Policies auf dieser von Supabase verwalteten Tabelle
-- zu erstellen oder zu löschen ("must be owner of table objects").

-- Nach dem ersten Login einen Benutzer manuell zum Admin machen:
-- update public.profiles set role = 'admin' where id = 'USER_UUID';
