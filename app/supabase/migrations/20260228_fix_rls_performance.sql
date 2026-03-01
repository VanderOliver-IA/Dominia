-- ═══════════════════════════════════════
-- FIX: RLS auth.uid() → (select auth.uid())
-- Performance: avaliado 1x por query, não 1x por row
-- ═══════════════════════════════════════

-- profiles: update policy
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles
  for update using ((select auth.uid()) = id);

-- user_progress: select policy
drop policy if exists "Users can view own progress" on public.user_progress;
create policy "Users can view own progress" on public.user_progress
  for select using ((select auth.uid()) = user_id);

-- user_progress: insert policy
drop policy if exists "Users can insert own progress" on public.user_progress;
create policy "Users can insert own progress" on public.user_progress
  for insert with check ((select auth.uid()) = user_id);

-- user_progress: update policy
drop policy if exists "Users can update own progress" on public.user_progress;
create policy "Users can update own progress" on public.user_progress
  for update using ((select auth.uid()) = user_id);
