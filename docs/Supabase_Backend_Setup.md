# SignalPilot Supabase Backend Setup

## Project

- Supabase project name: `SignalPilot`
- Project URL: `https://gyfhemivkushqwfwzsou.supabase.co`
- Project ref: `gyfhemivkushqwfwzsou`

## Frontend Environment

The Vite app reads Supabase config from `.env.local`:

```env
VITE_SUPABASE_URL=https://gyfhemivkushqwfwzsou.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

Use the public `anon` key only in frontend code. Do not expose the `service_role` key in this app.

## Apply Database Schema

The migration file is:

```txt
supabase/migrations/20260622173000_initial_signalpilot_schema.sql
```

Option A: Supabase Dashboard

1. Open Supabase Dashboard.
2. Select the `SignalPilot` project.
3. Go to SQL Editor.
4. Paste the full migration SQL.
5. Run it.

Option B: Supabase CLI

Link the local repo to the hosted project:

```powershell
supabase link --project-ref gyfhemivkushqwfwzsou
```

Then push migrations:

```powershell
supabase db push
```

The CLI may ask for your Supabase access token or database password. The frontend anon key is not enough to create tables.

## Current Backend Coverage

Implemented:

- Supabase client setup
- Local Supabase config
- Initial schema and RLS policies
- Project persistence bridge
- Crawl schedule persistence bridge
- LocalStorage fallback while schema is unavailable

Next:

- Auth UI
- User-owned data only, after login is added
- Edge Functions for real analysis
- Upload storage bucket and import parser
- Scheduled monitor runner
