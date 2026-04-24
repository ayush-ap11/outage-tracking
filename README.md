# ⚡ Urja System — Pune Power Outage Tracker

Real-time power outage tracking for Pune, Maharashtra. Built to fill the gap where no live citizen-reporting platform exists for MSEDCL consumers.

## Features

- Live outage map (Leaflet.js, dark tiles)
- GPS-based outage reporting with geo-tagging
- Community confirmation voting
- Admin dashboard for utility staff
- Outage history + area-wise stats
- Planned vs unplanned outage tracking

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Firebase (Firestore + Auth)
- Leaflet.js
- Vercel (deployment)

## Getting Started

```bash
pnpm install
pnpm dev
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Firebase project credentials.

## Demo Credentials

- Citizen: any phone number + any 6-digit OTP
- Admin: phone = `admin` | password = `admin123`

## Deployment

Connect the repo to Vercel, add the environment variables in the Vercel dashboard, then deploy.

## Pages

- `/` -> redirects based on auth
- `/auth` -> citizen login
- `/map` -> live outage map (protected)
- `/report` -> report an outage (protected)
- `/history` -> outage history + stats (protected)
- `/profile` -> user profile (protected)
- `/admin/login` -> admin login
- `/admin/dashboard` -> admin control panel (admin only)

## V2 Planned Features

- Real OTP via Firebase Phone Auth
- Push notifications via FCM
- Marathi language toggle
- MSEDCL / Urja System API integration
- CSV export for admin
- GeoJSON area boundaries

Built by: Ayush
College: Indira College of Engineering and Management
Batch: 2023-2027This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
