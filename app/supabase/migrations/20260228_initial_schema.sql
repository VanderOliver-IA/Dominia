-- ═══════════════════════════════════════
-- DOMINIA — INITIAL SCHEMA (2026)
-- ═══════════════════════════════════════

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. ENUMS
create type learning_level as enum ('Explorer', 'Builder', 'Master');
create type lesson_type as enum ('Game', 'Theory', 'Boss');
create type progress_status as enum ('locked', 'available', 'completed');

-- 3. PROFILES (Extende o auth.users do Supabase)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  avatar_url text,
  level learning_level default 'Explorer',
  xp integer default 0,
  streak integer default 0,
  last_streak_at timestamp with time zone,
  hearts integer default 5,
  last_heart_at timestamp with time zone default now(),
  is_premium boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 4. TRAILS (As Trilhas de Aprendizado)
create table public.trails (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  slug text unique not null,
  icon_name text, -- Nome do ícone Lucide
  order_index integer default 0,
  is_published boolean default false,
  created_at timestamp with time zone default now()
);

-- 5. LESSONS (Unidade básica de conteúdo)
create table public.lessons (
  id uuid default uuid_generate_v4() primary key,
  trail_id uuid references public.trails on delete cascade not null,
  title text not null,
  slug text not null,
  description text,
  content text, -- Markdown ou JSON para a lição
  video_url text, -- Link não listado do YouTube
  type lesson_type default 'Theory',
  xp_reward integer default 10,
  order_index integer not null,
  metadata jsonb default '{}'::jsonb, -- Configurações específicas do jogo
  created_at timestamp with time zone default now(),
  unique(trail_id, slug)
);

-- 6. USER_PROGRESS (Onde o jogo acontece)
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  lesson_id uuid references public.lessons on delete cascade not null,
  status progress_status default 'locked',
  best_score integer default 0,
  completed_at timestamp with time zone,
  unique(user_id, lesson_id)
);

-- 7. RLS (ROW LEVEL SECURITY)
alter table public.profiles enable row level security;
alter table public.trails enable row level security;
alter table public.lessons enable row level security;
alter table public.user_progress enable row level security;

-- Policies: Profiles (Usuário lê o próprio, todos lêem usernames públicos)
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);
create policy "Users can update own profile" on public.profiles
  for update using ((select auth.uid()) = id);

-- Policies: Trails & Lessons (Todos lêem o que estiver publicado)
create policy "Anyone can view published trails" on public.trails
  for select using (is_published = true);
create policy "Anyone can view lessons" on public.lessons
  for select using (true);

-- Policies: Progress (Apenas o próprio usuário acessa seu progresso)
create policy "Users can view own progress" on public.user_progress
  for select using ((select auth.uid()) = user_id);
create policy "Users can insert own progress" on public.user_progress
  for insert with check ((select auth.uid()) = user_id);
create policy "Users can update own progress" on public.user_progress
  for update using ((select auth.uid()) = user_id);

-- 8. FUNCTIONS & TRIGGERS (Auto-criação de perfil)
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'display_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
