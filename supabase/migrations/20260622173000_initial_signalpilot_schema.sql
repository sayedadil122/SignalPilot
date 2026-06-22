create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  project_name text not null,
  url text not null,
  platform text not null,
  reviews_count integer not null default 0,
  top_complaint text,
  last_analyzed_date date not null default current_date,
  result jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analysis_runs (
  id uuid primary key default gen_random_uuid(),
  project_id text references public.projects(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  input_type text not null check (input_type in ('url', 'paste', 'upload', 'monitor', 'sample')),
  input_value text not null,
  platform text not null,
  status text not null default 'completed' check (status in ('queued', 'running', 'completed', 'failed')),
  total_reviews integer not null default 0,
  result jsonb not null default '{}'::jsonb,
  error_message text,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  analysis_run_id uuid references public.analysis_runs(id) on delete cascade,
  project_id text references public.projects(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  source_platform text not null,
  author text,
  rating numeric,
  sentiment text check (sentiment in ('Positive', 'Negative', 'Neutral')),
  urgency text check (urgency in ('High', 'Medium', 'Low')),
  raw_text text not null,
  normalized_text text,
  source_url text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.problem_themes (
  id text primary key,
  analysis_run_id uuid references public.analysis_runs(id) on delete cascade,
  project_id text references public.projects(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  category text,
  summary text,
  mention_count integer not null default 0,
  platforms text[] not null default '{}',
  severity text not null check (severity in ('High', 'Medium', 'Low')),
  confidence_score integer not null default 0 check (confidence_score between 0 and 100),
  opportunity_score integer not null default 0 check (opportunity_score between 0 and 100),
  problem_statement text,
  root_cause text,
  why_users_care text,
  competitor_gap text,
  product_opportunity text,
  suggested_feature text,
  bias_risk text not null check (bias_risk in ('Low', 'Medium', 'High')),
  created_at timestamptz not null default now()
);

create table if not exists public.theme_quotes (
  id uuid primary key default gen_random_uuid(),
  theme_id text references public.problem_themes(id) on delete cascade,
  review_id uuid references public.reviews(id) on delete set null,
  user_id uuid references auth.users(id) on delete cascade,
  quote_text text not null,
  source_platform text not null,
  author text,
  rating numeric,
  sentiment text check (sentiment in ('Positive', 'Negative', 'Neutral')),
  urgency text check (urgency in ('High', 'Medium', 'Low')),
  created_at timestamptz not null default now()
);

create table if not exists public.opportunities (
  id text primary key,
  analysis_run_id uuid references public.analysis_runs(id) on delete cascade,
  project_id text references public.projects(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  user_pain text,
  evidence text,
  target_user text,
  why_now text,
  mvp_feature text,
  impact_score integer not null default 1 check (impact_score between 1 and 10),
  effort_score integer not null default 1 check (effort_score between 1 and 10),
  confidence_score integer check (confidence_score between 0 and 100),
  bias_risk text check (bias_risk in ('Low', 'Medium', 'High')),
  recommendation text not null check (recommendation in ('Build', 'Validate', 'Ignore')),
  created_at timestamptz not null default now()
);

create table if not exists public.competitor_gap_rows (
  id uuid primary key default gen_random_uuid(),
  analysis_run_id uuid references public.analysis_runs(id) on delete cascade,
  project_id text references public.projects(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  competitor_name text not null,
  what_users_like text,
  common_complaints text,
  missing_capability text,
  signal_pilot_opportunity text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.evidence_packs (
  id uuid primary key default gen_random_uuid(),
  project_id text references public.projects(id) on delete cascade,
  analysis_run_id uuid references public.analysis_runs(id) on delete cascade,
  opportunity_id text references public.opportunities(id) on delete set null,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crawl_schedules (
  id text primary key,
  user_id uuid references auth.users(id) on delete cascade,
  project_name text not null,
  url text not null,
  platforms text[] not null default '{}',
  frequency text not null check (frequency in ('Hourly', 'Daily', 'Weekly', 'Monthly')),
  deduplication_enabled boolean not null default true,
  status text not null default 'Active' check (status in ('Active', 'Paused')),
  last_run text not null default 'Never',
  next_run text not null default 'Not scheduled',
  target_product text,
  competitors text[] not null default '{}',
  delivery_channel text check (delivery_channel in ('Email', 'Slack', 'In-app')),
  recipient_email text,
  report_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles (id, email, full_name)
select
  id,
  email,
  coalesce(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name')
from auth.users
on conflict (id) do update
set
  email = excluded.email,
  full_name = coalesce(public.profiles.full_name, excluded.full_name),
  updated_at = now();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists set_evidence_packs_updated_at on public.evidence_packs;
create trigger set_evidence_packs_updated_at
before update on public.evidence_packs
for each row execute function public.set_updated_at();

drop trigger if exists set_crawl_schedules_updated_at on public.crawl_schedules;
create trigger set_crawl_schedules_updated_at
before update on public.crawl_schedules
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.analysis_runs enable row level security;
alter table public.reviews enable row level security;
alter table public.problem_themes enable row level security;
alter table public.theme_quotes enable row level security;
alter table public.opportunities enable row level security;
alter table public.competitor_gap_rows enable row level security;
alter table public.evidence_packs enable row level security;
alter table public.crawl_schedules enable row level security;

create policy "Profiles are user owned" on public.profiles
for all using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Projects are user owned or demo" on public.projects
for all using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "Analysis runs are user owned or demo" on public.analysis_runs
for all using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "Reviews are user owned or demo" on public.reviews
for all using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "Problem themes are user owned or demo" on public.problem_themes
for all using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "Theme quotes are user owned or demo" on public.theme_quotes
for all using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "Opportunities are user owned or demo" on public.opportunities
for all using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "Competitor gaps are user owned or demo" on public.competitor_gap_rows
for all using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "Evidence packs are user owned or demo" on public.evidence_packs
for all using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create policy "Crawl schedules are user owned or demo" on public.crawl_schedules
for all using (user_id is null or auth.uid() = user_id)
with check (user_id is null or auth.uid() = user_id);

create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists analysis_runs_project_id_idx on public.analysis_runs(project_id);
create index if not exists reviews_project_id_idx on public.reviews(project_id);
create index if not exists problem_themes_project_id_idx on public.problem_themes(project_id);
create index if not exists opportunities_project_id_idx on public.opportunities(project_id);
create index if not exists crawl_schedules_user_id_idx on public.crawl_schedules(user_id);
