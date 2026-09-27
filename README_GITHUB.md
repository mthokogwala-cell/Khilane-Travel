# Khilane Travel - South Africa's Cheapest Travel Booking Company
🇿🇦 TRAVEL PROUDLY SOUTH AFRICAN — SOUTH AFRICA'S LOWEST PRICES GUARANTEED 🇿🇦

Born in Eshowe, KZN. Explore More - Pay Less - Travel Better.

## Live Demo
- Frontend: https://khilane.travel (Vercel)
- API: https://api.khilane.travel/health (Render)
- Prototype: See `frontend/final-unified-os.html`

## Stack
- Frontend: React 18 + Vite, Navy #0A1931 / Teal #00B4AB / Gold #FFC300
- Backend: Express 4 + Supabase Postgres
- Payments: Paystack 2.9%+R1, PayFast 3.5%+R2, Ozow 1.5%, Capitec/Apple/Google Pay, EFT 0% FNB 6284123456
- Price Beat: `Our Price = max(Competitor-50, Supplier*1.12)` - Beat by R50 + 12% margin protection

## Features
- 4 Tabs Working: Flights (From/To swap, Return/OneWay/MultiCity, Travelers Adults/Children ages 0-17, SA ID / Foreign Passport toggle), Stays (resorts not flights - Beverly Hills From R2850 etc), Car Hire (Fortuner/Corolla/Polo/Hilux), Buses (JHB-CPT Intercape/Greyhound)
- 3-Step Booking: Details (SA ID 13-digit validation vs Passport No+Nationality+Expiry) -> Payment (5 gateways live fee) -> Confirmation BK-2026-XXXX + ledger posting
- Backend OS: Overview KPI, Bookings PAID+Posted AUTO, Accounting double-entry 4000/5000/5010/1000, Payroll PAYE/UIF/NET EMP201, Payments config, Reports

## One-Click Deploy

### Supabase
1. Create project
2. SQL Editor -> paste supabase.sql -> Run
3. Copy URL + keys to .env

### Render (from render.yaml)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/khilane-travel)

## POPIA + SARS
See DEPLOY_CHECKLIST.md

## Structure
```
frontend/ - React + Vite (final-unified-os.html = working prototype)
backend/ - Express API server.js + server.supabase.js + Dockerfile
supabase.sql - Production schema
render.yaml - Blueprint for Render
.env - Env vars (gitignored)
```

## Local Dev
```bash
docker-compose up
# frontend http://localhost:5173
# api http://localhost:3001/api/health
```

Made in Eshowe, KZN
