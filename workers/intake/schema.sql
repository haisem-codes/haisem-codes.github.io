create table if not exists public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lang text not null,
  business_name text not null,
  email text not null,
  answers jsonb not null,
  score int not null,
  tier text not null check (tier in ('hot','warm','cold')),
  annual_sek int not null,
  status text not null default 'new' check (status in ('new','contacted','won','lost'))
);
alter table public.intake_submissions enable row level security;
-- no policies: only the service key (Worker) can read/write

create extension if not exists pg_cron;
select cron.schedule('intake-retention', '0 3 * * *',
  $$delete from public.intake_submissions where status <> 'won' and created_at < now() - interval '12 months'$$);
