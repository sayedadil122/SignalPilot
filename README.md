# SignalPilot

SignalPilot is a React, TypeScript, Vite, and Supabase app for turning public reviews, customer feedback, and competitor complaints into product discovery dashboards.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example` and add:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Start the dev server:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Netlify

Netlify uses `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: `/index.html`

Add these environment variables in Netlify:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
