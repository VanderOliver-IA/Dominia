# 🏰 DOMINIA — Plano de Implementação Técnico

> **Tipo:** WEB (PWA) | **Stack:** Next.js 14 + Supabase + Tailwind v4 + Vercel
> **PRD:** [dominia-prd.md](file:///home/vanderoliver/Antigravity/Dominia/dominia-prd.md)
> **Equipe:** Solo (Vanderson + IA) | **Timeline:** 16 semanas

---

## Goal

Implementar o MVP da Dominia — plataforma gamificada de aprendizado em IA — com 10 trilhas jogáveis, sistema de gamificação completo, assistente IA contextual, dashboard de progresso, modelo freemium com pagamento, e painel administrativo.

---

## Tech Stack (Rationale)

| Camada | Tech | Por quê |
|--------|------|---------|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG, API routes, server actions, PWA, ecossistema React |
| **Styling** | Tailwind CSS v4 | Rapid UI, design tokens CSS-first, dark mode nativo |
| **State** | Zustand | Minimal boilerplate, perfeito para solo dev |
| **Backend** | Supabase | Auth + DB + RLS + Realtime + Storage em 1 serviço (solo dev = BaaS) |
| **DB** | PostgreSQL (Supabase) | Relacional, JSONB para configs de jogos, RLS para segurança |
| **Auth** | Supabase Auth | Email + Google OAuth, session management grátis |
| **Payments** | Stripe | Subscriptions, webhooks, checkout hosted, mature API |
| **AI** | OpenAI API (gpt-4o-mini) | Custo baixo, rápido, bom para assistente contextual |
| **Videos** | YouTube Embed (unlisted) | Zero custo de CDN/hosting |
| **Analytics** | PostHog (free tier) | Eventos, funis, feature flags, session replay |
| **Deploy** | Vercel | Zero-config Next.js, edge functions, preview deploys |
| **PWA** | @ducanh2912/next-pwa | Service worker, installable, push notifications |
| **Animations** | Framer Motion | Micro-animações de gamificação, transições fluidas |
| **Icons** | Lucide React | Consistente, tree-shakeable, leve |
| **Fonts** | Google Fonts (Inter + Space Grotesk) | Moderna, legível, gaming-friendly |

---

## File Structure

```
dominia/
├── public/
│   ├── icons/              # PWA icons (192, 512)
│   ├── badges/             # Badge/achievement images
│   ├── avatars/            # Avatar options
│   └── manifest.json       # PWA manifest
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Auth group layout
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (app)/                  # Main app layout (authenticated)
│   │   │   ├── dashboard/page.tsx  # F06: Progress dashboard (HOME)
│   │   │   ├── trails/
│   │   │   │   ├── page.tsx        # F02: Trail map overview
│   │   │   │   └── [trailId]/
│   │   │   │       ├── page.tsx    # Trail detail (lesson nodes)
│   │   │   │       └── [lessonId]/
│   │   │   │           └── page.tsx # F03/F04: Lesson game play
│   │   │   ├── profile/page.tsx    # User profile & settings
│   │   │   ├── achievements/page.tsx # Badges & conquistas
│   │   │   ├── leaderboard/page.tsx  # Rankings (Phase 2)
│   │   │   ├── pricing/page.tsx    # F08: Pricing page
│   │   │   └── layout.tsx          # Sidebar + nav
│   │   ├── (admin)/                # Admin panel
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx        # Admin dashboard
│   │   │   │   ├── trails/
│   │   │   │   │   ├── page.tsx    # CRUD trails
│   │   │   │   │   └── [trailId]/
│   │   │   │   │       ├── page.tsx # Edit trail + lessons
│   │   │   │   │       └── [lessonId]/
│   │   │   │   │           └── page.tsx # Edit lesson + games
│   │   │   │   ├── users/page.tsx  # User management
│   │   │   │   └── analytics/page.tsx # Metrics dashboard
│   │   │   └── layout.tsx          # Admin layout
│   │   ├── onboarding/             # F01: Onboarding flow
│   │   │   ├── page.tsx            # Step controller
│   │   │   └── components/
│   │   │       ├── StepLevel.tsx   # Explorer/Builder/Master selection
│   │   │       ├── StepInterests.tsx
│   │   │       ├── StepAvatar.tsx
│   │   │       └── StepMiniGame.tsx
│   │   ├── api/
│   │   │   ├── webhooks/
│   │   │   │   └── stripe/route.ts # Stripe webhooks
│   │   │   ├── ai/
│   │   │   │   └── chat/route.ts   # AI assistant endpoint
│   │   │   └── analytics/
│   │   │       └── track/route.ts  # Event tracking
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Landing page
│   │   └── globals.css             # Tailwind + custom tokens
│   │
│   ├── components/
│   │   ├── ui/                     # Base design system
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Skeleton.tsx
│   │   ├── game/                   # Game engines
│   │   │   ├── QuizBattle.tsx      # Quiz with timer + lives
│   │   │   ├── DragAndDrop.tsx     # Drag elements to positions
│   │   │   ├── FillTheGap.tsx      # Complete text/code
│   │   │   ├── MatchPairs.tsx      # Connect concepts
│   │   │   ├── SequenceBuilder.tsx # Order steps correctly
│   │   │   ├── SpeedChallenge.tsx  # Answer max in time limit
│   │   │   ├── Sandbox.tsx         # Free experimentation area
│   │   │   ├── BossBattle.tsx      # Final trail challenge
│   │   │   └── GameWrapper.tsx     # Common game logic (lives, XP, feedback)
│   │   ├── trail/
│   │   │   ├── TrailMap.tsx        # Visual map with nodes
│   │   │   ├── TrailNode.tsx       # Individual lesson node
│   │   │   ├── TrailProgress.tsx   # Trail progress bar
│   │   │   └── TrailCard.tsx       # Trail preview card
│   │   ├── lesson/
│   │   │   ├── LessonContent.tsx   # Text content renderer
│   │   │   ├── LessonVideo.tsx     # YouTube embed player
│   │   │   ├── LessonResult.tsx    # End-of-lesson XP + stars
│   │   │   ├── LessonSPAV.tsx      # Next lesson hook/preview
│   │   │   └── LessonFlow.tsx      # Orchestrates content → games → result
│   │   ├── dashboard/
│   │   │   ├── StatsOverview.tsx   # XP, streak, level
│   │   │   ├── ActivityHeatmap.tsx # GitHub-style heatmap
│   │   │   ├── ActiveTrails.tsx    # Current trails progress
│   │   │   ├── RecentBadges.tsx    # Latest achievements
│   │   │   └── Recommendations.tsx # Next lessons suggested
│   │   ├── ai/
│   │   │   ├── AIChatWidget.tsx    # Floating chat widget
│   │   │   └── AIChatMessage.tsx   # Message bubble
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx         # Main navigation
│   │   │   ├── Header.tsx          # Top bar with XP + avatar
│   │   │   ├── MobileNav.tsx       # Bottom nav for mobile
│   │   │   └── Footer.tsx
│   │   └── landing/
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       ├── Pricing.tsx
│   │       ├── Testimonials.tsx
│   │       └── CTA.tsx
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # Browser client
│   │   │   ├── server.ts           # Server client
│   │   │   ├── middleware.ts       # Auth middleware
│   │   │   └── types.ts            # Generated DB types
│   │   ├── stripe/
│   │   │   ├── client.ts           # Stripe client
│   │   │   ├── plans.ts            # Plan definitions
│   │   │   └── webhooks.ts         # Webhook handlers
│   │   ├── ai/
│   │   │   ├── openai.ts           # OpenAI client
│   │   │   ├── prompts.ts          # System prompts per level
│   │   │   └── rules.ts            # Local rules for common Q&A
│   │   ├── gamification/
│   │   │   ├── xp.ts               # XP calculation logic
│   │   │   ├── levels.ts           # Level thresholds + titles
│   │   │   ├── streaks.ts          # Streak logic + freeze
│   │   │   ├── badges.ts           # Badge criteria + unlock logic
│   │   │   └── lives.ts            # Lives system + regen
│   │   └── utils/
│   │       ├── constants.ts        # App-wide constants
│   │       ├── formatters.ts       # Date, number formatters
│   │       └── validators.ts       # Input validation
│   │
│   ├── hooks/
│   │   ├── useUser.ts              # Current user + profile
│   │   ├── useGameState.ts         # Game session state
│   │   ├── useXP.ts                # XP mutations + animations
│   │   ├── useStreak.ts            # Streak check + display
│   │   ├── useLives.ts             # Lives counter + regen
│   │   ├── useTrailProgress.ts     # Trail completion state
│   │   └── useAIChat.ts            # AI chat state + messages
│   │
│   ├── stores/
│   │   ├── userStore.ts            # User state (Zustand)
│   │   ├── gameStore.ts            # Active game state
│   │   └── uiStore.ts              # UI state (modals, toasts)
│   │
│   └── types/
│       ├── database.ts             # Supabase generated types
│       ├── game.ts                 # Game config types
│       ├── trail.ts                # Trail/lesson types
│       └── user.ts                 # User profile types
│
├── supabase/
│   ├── migrations/                 # DB migrations
│   │   ├── 001_users_profile.sql
│   │   ├── 002_trails_lessons.sql
│   │   ├── 003_gamification.sql
│   │   ├── 004_subscriptions.sql
│   │   └── 005_ai_chat.sql
│   ├── seed.sql                    # Seed data (10 trails + lessons)
│   └── config.toml
│
├── scripts/
│   └── seed-content.ts             # Script to seed trail/lesson content
│
├── .env.local                      # Environment variables
├── .env.example                    # Template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── dominia-prd.md                  # PRD (approved ✅)
└── dominia-plan.md                 # This file
```

---

## Tasks

### 🏗️ Phase 0: Project Foundation (Week 1-2)

- [ ] **T01:** Init Next.js 14 project with TypeScript, Tailwind v4, App Router → Verify: `npm run dev` shows default page
- [ ] **T02:** Setup Supabase project (cloud), configure env vars, install `@supabase/supabase-js` + `@supabase/ssr` → Verify: can connect from app
- [ ] **T03:** Create DB migrations (001-005): users_profile, trails_lessons, gamification, subscriptions, ai_chat → Verify: `supabase db push` succeeds
- [ ] **T04:** Setup RLS policies for all tables → Verify: anon can't read private data, authenticated can read own data
- [ ] **T05:** Design system — create all `components/ui/` base components with Tailwind tokens (colors, spacing, typography using Inter + Space Grotesk) → Verify: Storybook-like preview page at `/dev/components`
- [ ] **T06:** App layout — Sidebar, Header (XP + avatar + streak), MobileNav → Verify: responsive layout renders on mobile and desktop
- [ ] **T07:** Configure PWA (manifest.json, service worker, icons) → Verify: app installable from Chrome
- [ ] **T08:** Setup Framer Motion + animation utils for gamification feedback → Verify: test animation plays

### 🔑 Phase 1: Auth & Onboarding (Week 3-4)

- [ ] **T09:** Auth pages — Login + Signup with Supabase Auth (email + Google OAuth) → Verify: can signup, login, logout
- [ ] **T10:** Auth middleware — protect `/dashboard/*`, `/trails/*`, `/admin/*` routes → Verify: unauthenticated user redirected to `/login`
- [ ] **T11:** Onboarding flow — 4 steps: Level selection (Explorer/Builder/Master) → Interests (multi-select) → Avatar → Mini-game → Verify: new user goes through full flow, profile saved to DB
- [ ] **T12:** Profile page — edit name, avatar, level, interests → Verify: changes persist after refresh

### 🗺️ Phase 2: Trails & Map (Week 5-7)

- [ ] **T13:** Trail map page — grid/list of all trails with category grouping, lock/unlock state, progress indicators → Verify: shows 10 trails, locked ones are visually distinct
- [ ] **T14:** Trail detail page — visual node map showing lesson sequence, connected with lines/paths, progress per node → Verify: clicking unlocked node navigates to lesson
- [ ] **T15:** TrailNode component — states: locked, available, in-progress, completed (with stars) → Verify: each state renders correctly
- [ ] **T16:** Trail unlock logic — prerequisite system, complete trail X to unlock trail Y → Verify: completing last lesson unlocks next trail
- [ ] **T17:** Seed 10 trails + 100 lessons structure into DB (content placeholders) → Verify: `seed-content.ts` populates DB

### 🎮 Phase 3: Game Engine (Week 7-9)

- [ ] **T18:** GameWrapper — common game logic: lives counter, XP accumulator, feedback animations (correct/wrong), timer, progress bar → Verify: wrapper renders around any game type
- [ ] **T19:** QuizBattle — multiple choice with timer, lives, streak multiplier → Verify: 5-question quiz plays correctly
- [ ] **T20:** DragAndDrop — drag items to correct zones with snap animation → Verify: items snap to targets, correct/wrong feedback
- [ ] **T21:** FillTheGap — text/code with blanks, keyboard input or word bank → Verify: can complete gaps, validated correctly
- [ ] **T22:** MatchPairs — connect left items to right items with lines → Verify: pairs connect, feedback on completion
- [ ] **T23:** SequenceBuilder — reorder items in correct sequence → Verify: drag-reorder works, validates order
- [ ] **T24:** SpeedChallenge — rapid-fire questions with countdown → Verify: timer works, score tallied
- [ ] **T25:** Sandbox — free text area with AI response preview → Verify: user types prompt, sees simulated result
- [ ] **T26:** BossBattle — multi-stage challenge combining 3+ game types → Verify: completes full boss sequence

### 📚 Phase 4: Content & Lessons (Week 9-10)

- [ ] **T27:** LessonFlow — orchestrates: Context text → Video(optional) → Game 1 → Concept 2 → Game 2 → Practice → Result screen → Verify: full lesson flow plays end-to-end
- [ ] **T28:** LessonContent — renders markdown text adapted to user level (reads `content_easy`/`content_med`/`content_hard` from DB) → Verify: same lesson shows different text for different levels
- [ ] **T29:** LessonVideo — YouTube embed player (unlisted videos) with optional skip → Verify: video plays, skip button works
- [ ] **T30:** LessonResult — XP earned, stars (1-3), time taken, badge unlocked animation, SPAV hook → Verify: shows correct XP, star rating, next lesson preview
- [ ] **T31:** Write content for Trail 01 "O que é IA?" (10 lessons, 3 levels each) → Verify: all 10 lessons playable with actual content
- [ ] **T32:** Write content for Trail 02 "ChatGPT & Assistentes" (12 lessons) → Verify: playable
- [ ] **T33:** Write content for remaining 8 trails (placeholder → real content progressively) → Verify: at least 5 lessons per trail with real content

### ⭐ Phase 5: Gamification System (Week 11-12)

- [ ] **T34:** XP system — award XP on game completion, streak multipliers, perfect bonus, store in DB → Verify: XP increments correctly, shows animation
- [ ] **T35:** Level system — calculate user level from total XP, show level-up celebration → Verify: user levels up at correct XP thresholds
- [ ] **T36:** Streak (Ofensiva) system — daily check, freeze mechanic, recovery window, visual counter → Verify: streak increments daily, loss after 24h, freeze works
- [ ] **T37:** Lives system — 5 lives, lose on wrong answer, regenerate 1/30min, unlimited for premium → Verify: lives deplete, timer shows regen, premium bypasses
- [ ] **T38:** Badges system — define 20 badges with criteria, auto-unlock on trigger, notification toast → Verify: completing conditions triggers badge unlock animation
- [ ] **T39:** Notification toasts — XP gained, badge unlocked, streak milestone, level up → Verify: each event shows correct celebration

### 📊 Phase 6: Dashboard (Week 12-13)

- [ ] **T40:** Dashboard page (HOME) — overview layout with stats grid → Verify: loads for authenticated user
- [ ] **T41:** StatsOverview — XP total, current level, streak days, lessons completed today → Verify: shows real data
- [ ] **T42:** ActivityHeatmap — last 90 days of activity (lessons/day) GitHub-style → Verify: heatmap renders with correct data
- [ ] **T43:** ActiveTrails — progress bars for each active trail with % → Verify: shows real progress
- [ ] **T44:** RecentBadges — last 5 badges earned with dates → Verify: shows correct badges
- [ ] **T45:** Recommendations — "Continue where you left off" + suggested next trails → Verify: shows relevant suggestions

### 🤖 Phase 7: AI Assistant & SPAV (Week 13-14)

- [ ] **T46:** AI Chat API route — receives message + lesson context + user level, returns adapted response via OpenAI → Verify: different responses for Explorer vs Master
- [ ] **T47:** AIChatWidget — floating chat button, expandable panel, message history per lesson → Verify: opens, sends message, receives response
- [ ] **T48:** AI rate limiting — 10 msgs/day for free, unlimited for premium, counter in DB → Verify: free user blocked after 10, premium unlimited
- [ ] **T49:** Local rules engine — common Q&A cache to avoid API calls for frequent questions → Verify: cached answers return instantly without API call
- [ ] **T50:** SPAV system — end-of-lesson hook: preview next lesson title + teaser, "Continue" CTA → Verify: shows next lesson preview after completing current

### 💳 Phase 8: Payments & Freemium (Week 14-15)

- [ ] **T51:** Stripe setup — products (monthly R$29,90 + annual R$199,90), webhook endpoint → Verify: Stripe dashboard shows products
- [ ] **T52:** Pricing page — plan comparison (Free vs Premium), CTA buttons → Verify: renders correctly, buttons trigger checkout
- [ ] **T53:** Stripe Checkout integration — redirect to hosted checkout, handle success/cancel → Verify: can complete test payment
- [ ] **T54:** Webhook handler — handle `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted` → Verify: subscription status updates in DB
- [ ] **T55:** Premium gates — enforce limits (5 lessons/day free, 3 trails free, 5 lives, 10 AI msgs) → Verify: free user hits limits, premium bypasses
- [ ] **T56:** Trial — 7-day free trial of premium on first signup → Verify: new user gets premium for 7 days

### ⚙️ Phase 9: Admin CMS (Week 15-16)

- [ ] **T57:** Admin auth guard — only admin role can access `/admin/*` → Verify: non-admin gets 403
- [ ] **T58:** Admin dashboard — user count, revenue, active trails, engagement metrics → Verify: shows real aggregate data
- [ ] **T59:** Trail CRUD — create, edit, reorder, publish/unpublish trails → Verify: new trail appears in user-facing map
- [ ] **T60:** Lesson CRUD — create, edit, reorder lessons within trail, 3-level content editor → Verify: edited content shows for users
- [ ] **T61:** Game configurator — select game type, add questions/answers, set difficulty, preview → Verify: configured game plays correctly in lesson
- [ ] **T62:** User management — list users, view progress, toggle premium, toggle admin → Verify: can promote user to admin

### 🚀 Phase 10: Polish & Launch (Week 16)

- [ ] **T63:** Landing page — Hero, Features, Pricing, CTA sections → Verify: renders responsive, loads < 2s
- [ ] **T64:** SEO — meta tags, OG images, structured data, sitemap → Verify: Lighthouse SEO > 90
- [ ] **T65:** PWA final — offline fallback page, push notification setup → Verify: installable, offline page shows
- [ ] **T66:** Performance audit — Lighthouse > 90 all categories, bundle analysis → Verify: scores pass
- [ ] **T67:** Security audit — RLS review, API rate limiting, input sanitization → Verify: security scan passes
- [ ] **T68:** Beta launch — deploy to production, invite 50-100 beta testers → Verify: real users can signup, play lessons, pay

---

## Done When

- [ ] 10 trilhas com lições jogáveis e conteúdo real (mínimo 5 lições/trilha com conteúdo completo)
- [ ] 8 tipos de jogos funcionando com feedback e animações
- [ ] Sistema de gamificação completo (XP, níveis, Ofensiva, vidas, badges)
- [ ] Dashboard com stats reais, heatmap, progresso
- [ ] Assistente IA respondendo no contexto da lição e nível do usuário
- [ ] Pagamento Stripe funcionando (freemium com limites)
- [ ] Admin CMS permitindo criar/editar trilhas, lições e jogos
- [ ] PWA instalável
- [ ] Landing page com SEO otimizado
- [ ] 50+ beta testers ativos

---

## Risks & Dependencies

| Risk | Mitigation |
|------|-----------|
| OpenAI API cost scaling | Use gpt-4o-mini, aggressive caching, local rules for 80% of queries |
| Content creation bottleneck | AI-assisted content generation, start with 5 full trails + 5 partial |
| Supabase free tier limits | Monitor usage, upgrade to Pro ($25/mo) if needed before launch |
| Stripe Brazil regulations | Use Stripe Atlas or local partner, test with PIX integration |
| Solo dev burnout | Strict 2-week sprints, MVP mindset, no scope creep |

---

## Notes

- **DB Types:** Run `supabase gen types typescript` after each migration to auto-generate TypeScript types
- **Content Strategy:** Use Claude/GPT to draft lesson content, then review and adapt for 3 levels
- **Testing:** Focus on integration tests for game logic and gamification calculations, E2E for critical user flows (onboarding, lesson, payment)
- **Deployment:** Vercel auto-deploys from main branch, preview deploys for PRs
