# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js 16, hot reload)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (flat config with next/core-web-vitals + typescript)
```

No test framework is configured.

## Environment Variables

Required in `.env.local` (see `.env.example`):
- `HENRIK_API_KEY` — Henrik Dev API key for Valorant player data
- `ANTHROPIC_API_KEY` — Claude API key for bio generation
- `GEMINI_API_KEY` — Google Gemini API key for card image generation
- `NEXT_PUBLIC_BASE_URL` — Base URL (e.g., `http://localhost:3000`)

## Architecture

**VALOCARD** — Valorant 프로필 카드 생성기. Searches Valorant players by Riot ID, aggregates competitive stats, generates AI bios, and renders downloadable card images.

### Data Flow

1. **Search** (`/search`) → user enters Riot ID + region
2. **Player API** (`/api/player`) → parallel fetches from Henrik API (account, MMR, last 10 competitive matches) → `aggregateStats()` produces `ProcessedPlayerStats` → cached in-memory (5min TTL)
3. **Stats stored in `sessionStorage`**, navigate to `/card/[puuid]`
4. **Bio generation** (`/api/generate-bio`) → Claude Haiku 4.5 with esports-caster-style prompt, supports `ko`/`en`
5. **Card rendering** (`/api/generate-card`) → **Primary:** Gemini AI (`gemini-2.5-flash-image`) generates the entire card image from a detailed prompt containing all player stats, bio, and template style. **Fallback:** If Gemini fails, falls back to Pollinations background + Satori template rendering (React→SVG→PNG, 800x450)

### Card Image Generation

**Primary path** (`lib/ai/gemini-card-generator.ts`): Gemini generates the complete card image. The prompt (`buildCardImagePrompt` in `lib/ai/prompts.ts`) includes player stats, agents, playstyle, bio, and template-specific design directions (neon-cyber, clean-minimal, valorant-classic).

**Fallback path** (`lib/image/card-renderer.ts`): Satori-based JSX templates in `templates/`. These are plain functions (no hooks), Satori-compatible (flexbox only, no grid). The template map in `card-renderer.ts` must be updated when adding new templates.

### Key Types (`types/index.ts`)

- `ProcessedPlayerStats` — aggregated player data (account, rank, overall stats, top agents, recent form, playstyle profile)
- `CardData` — everything needed to render a card (stats + bio + template choice + language + optional background)
- `PlaystyleProfile` — computed scores (aggression, accuracy, consistency, teamplay) + role preference + strengths/weaknesses
- `TemplateComponent` — `(props: { data: CardData }) => React.JSX.Element`

### External APIs

- **Henrik Dev API** (`api.henrikdev.xyz`) — account lookup, MMR/rank, match history. Wrapped in `lib/api/henrik-client.ts`
- **Valorant API** (`valorant-api.com`) — agent images, rank tier images. Wrapped in `lib/api/valorant-assets.ts`
- **Anthropic Claude** — bio generation via `@anthropic-ai/sdk`. Model: `claude-haiku-4-5-20251001`
- **Google Gemini** — full card image generation via `@google/genai`. Model: `gemini-2.5-flash-image`
- **Pollinations AI** — fallback background image generation (Flux model). No API key needed

### Caching

In-memory TTL cache (`lib/cache.ts`). Player data cached 5 minutes, assets 1 hour. Resets on server restart.

### Path Aliases

`@/*` maps to project root (tsconfig paths). Use `@/lib/...`, `@/components/...`, `@/types`, `@/templates/...`, etc.

### Server-External Packages

`@resvg/resvg-js` and `sharp` are configured as `serverExternalPackages` in `next.config.ts` (native Node modules, not bundled by Next.js).

## Conventions

- Bilingual support: Korean is default, English is alternate. UI strings are inline (no i18n library).
- API routes use Zod for request validation.
- Fonts: Inter (English) and Pretendard (Korean) loaded as WOFF from `public/fonts/` for Satori rendering.
