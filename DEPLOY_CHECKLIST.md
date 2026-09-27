# Khilane Travel - Production Deploy Checklist
POPIA + SARS + PCI-DSS Compliance - South Africa
Born in Eshowe, KZN - South Africa's lowest prices guaranteed

## Pre-Deploy (30 min)

### 1. Supabase - Database (10 min)
- [ ] Create project at supabase.com: khilane-production
- [ ] SQL Editor -> paste `supabase.sql` -> Run
- [ ] Verify tables: bookings, ledger, payroll_runs
- [ ] Settings -> API -> copy URL + anon key + service_role key into `.env`
- [ ] Settings -> Database -> copy connection string -> DATABASE_URL
- [ ] Enable Point-in-Time Recovery (PITR) - 7 days

### 2. Payments - Test Mode First
#### Paystack (Primary - 2.9%+R1 Most Popular)
- [ ] dashboard.paystack.com -> Settings -> API Keys -> Copy TEST secret + public
- [ ] Webhooks -> Add: https://api.khilane.travel/api/webhooks/paystack
- [ ] Events: charge.success, charge.failed
- [ ] Test card: 4084084084084081 12/30 408

#### PayFast (3.5%+R2)
- [ ] payfast.co.za -> Sandbox: 10000100 / 46f0cd694581a
- [ ] ITN URL: https://api.khilane.travel/api/webhooks/payfast

#### Ozow (1.5% Lowest Fee)
- [ ] ozow.com -> API -> Site Code KHILANE-TEST + Keys
- [ ] Notify URL: https://api.khilane.travel/api/webhooks/ozow

#### Manual EFT 0%
- [ ] Verify FNB Account 6284123456 Branch 250655 - Khilane Travel Pty Ltd
- [ ] Add proof of payment upload: bookings need reference BK-2026-XXXX

### 3. Domains
- [ ] Buy khilane.travel + api.khilane.travel + admin.khilane.travel (Afrihost / GoDaddy)
- [ ] Vercel -> Add domain khilane.travel -> set A records
- [ ] Render -> Custom domain api.khilane.travel

## POPIA Compliance (Critical - SA Law)

### SA ID & Passport Handling
Your prototype collects:
- SA ID 13-digit (DOB + gender + citizenship extraction)
- Foreign Passport: No + Nationality + Expiry >6 months
- DOB, First/Last Name

**Requirements:**
- [ ] Privacy Policy page: Explain why SA ID needed (Home Affairs verification for flights)
- [ ] Consent checkbox on traveler modal: "I consent to POPIA storage of my ID/Passport for booking purposes"
- [ ] Encryption at rest: Supabase enables AES-256 by default - verify
- [ ] Encryption in transit: HTTPS only (Vercel + Render auto)
- [ ] Retention: Delete ID copies 12 months after travel date (add cron job)
- [ ] Access: Only admin@khilane.travel role can view full SA ID - mask as 800101******08 in Bookings table for others
- [ ] Operator agreement: If using Duffel/Horse for flights, sign POPIA operator agreement

**Code changes needed before live:**
```js
// In bookings table, mask SA ID for display
function maskSAID(id){ return id.slice(0,6)+'******'+id.slice(-2); }
// Store full only in encrypted column travelers.details[0].saIdEncrypted
```

### Children Ages 0-17
- [ ] You collect child ages - this is special personal info under POPIA (child data)
- [ ] Need parental consent checkbox: "I am parent/guardian of child travelers"
- [ ] Don't store child DOB longer than needed

## SARS Compliance - Payroll & Accounting

### Bookkeeper Ledger (you have 4000/5000/5010/1000)
- [ ] VAT: Your formula ourPrice = max(competitor-50, supplier*1.12) - supplier cost is ex VAT, add 15% VAT on total
  Ledger should add:
  DR 1000 Bank total
  CR 4000 Income ex VAT (ourPrice/1.15)
  CR 2000 VAT Payable (ourPrice - ourPrice/1.15)
- [ ] EMP201: Payroll_runs table -> export monthly PAYE+UIF+SDL
  PAYE brackets 2026: 18% up to R237k, 26% to R370k etc
  UIF: 1% employee +1% employer capped R17,712 per month
  SDL: 1% of payroll if >R500k annual
- [ ] IRP5: Generate per employee end Feb
- [ ] eFiling: Integrate SARS eFiling API for EMP201 submission (optional Phase 2)

### Invoicing
- [ ] Tax Invoice must include: Khilane Travel Pty Ltd VAT No, customer name, booking ref BK-2026-XXXX, VAT breakdown
- [ ] E-ticket email from noreply@khilane.travel with PDF

## Security / PCI-DSS

- [ ] Never store card numbers - Paystack handles it (you already do - good)
- [ ] .env never committed - .gitignore includes .env
- [ ] Enable 2FA on Supabase, Vercel, Render, Paystack
- [ ] Rate limit: /api/bookings 10/min per IP (add express-rate-limit)

## Go-Live Tests (Run in order)

1. [ ] Search Flights JNB->CPT Return -> Select -> Fill SA ID 8001015009087 (test) -> Pay with Paystack test card 408408... -> Confirmation BK-2026-XXXX
2. [ ] Check Admin OS -> Bookings table shows PAID + Posted AUTO
3. [ ] Check ledger -> 4 entries: Income credit, Supplier debit, Fees debit, Bank net
4. [ ] Search Stays Cape Town -> Check-in/out -> Guests 2 Adults 1 Child age 5 -> Select Oyster Box From R2,850 -> Pay Ozow test -> Confirmation
5. [ ] Test Foreign Passport toggle: Check Non-South African? -> Passport P1234567 Nationality USA Expiry 2028-12-01 -> Book -> Verify in DB
6. [ ] Test Car Hire JNB Airport -> Toyota Fortuner -> Book
7. [ ] Test Buses JHB-CPT -> Intercape -> Book
8. [ ] Refund one booking -> Verify CR 4000 and DR 1000 reversal + credit note

## Post-Launch

- [ ] Switch Paystack/PayFast/Ozow from TEST to LIVE keys
- [ ] Set up UptimeRobot for api.khilane.travel/health
- [ ] Add Google Analytics + Meta Pixel for Popular Destinations clicks
- [ ] Backup: Supabase daily backup + export ledger CSV weekly

## Current Prototype Status
- ✅ Front+Back unified, banner South Africa's lowest prices guaranteed #FFC300/#0A1931
- ✅ 4 tabs working (Flights/Stays/Cars/Buses) - Stays shows resorts NOT flights
- ✅ 3-step modal working (SA ID 13-digit / Foreign Passport)
- ✅ 5 gateways with live fee calc
- ✅ Auto ledger posting + Bookings sync
- ⏳ Needs Supabase connect (2 lines uncomment in server.supabase.js)
- ⏳ Needs live payment keys
- ⏳ Needs POPIA consent checkboxes (add before live)

Questions: support@khilane.travel | Eshowe, KZN
