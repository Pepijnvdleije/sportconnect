# SportConnect - MVP

A platform connecting runners and cyclists to exercise together. Find activities near you, join group workouts, and rate your experience.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your AUTH_SECRET (generate with: openssl rand -base64 32)

# Create database and run migrations
npx prisma migrate dev

# Seed with sample data
npx tsx prisma/seed.ts

# Start dev server
npm run dev
```

## Test Accounts

After seeding, you can log in with any of these accounts (password: `password123`):

| Name | Email | Sport |
|------|-------|-------|
| Emma de Vries | emma@example.com | Running |
| Daan Bakker | daan@example.com | Cycling |
| Sophie Jansen | sophie@example.com | Both |
| Lars van Dijk | lars@example.com | Running |
| Mila Visser | mila@example.com | Cycling |
| Tom Peters | tom@example.com | Both |

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Prisma + SQLite**
- **Auth.js v5** (email/password)
- **Tailwind CSS**

## Features

- User registration and profiles
- Create running/cycling activities
- Discovery feed with filters (sport, group type, radius)
- Join/leave activities
- Post-activity feedback and ratings
- Mobile-first responsive design

## Project Structure

```
src/
  app/           # Pages and API routes (Next.js App Router)
  components/    # Reusable UI and feature components
  actions/       # Server actions (mutations)
  lib/           # Utilities, Prisma client, validators
  hooks/         # Client-side React hooks
  types/         # TypeScript type definitions
  providers/     # Context providers
prisma/
  schema.prisma  # Database schema
  seed.ts        # Seed script
```
