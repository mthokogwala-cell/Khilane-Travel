-- Khilane Travel Production Schema
-- Run this in Supabase SQL Editor

-- Enable UUID
create extension if not exists "uuid-ossp";

-- Bookings Table
create table public.bookings (
  id uuid primary key default uuid_generate_v4(),
  ref text unique not null, -- BK-2026-XXXX
  type text not null check (type in ('Flights','Stays','Car Hire','Buses')),
  route jsonb not null, -- {from: 'JNB', to: 'CPT', departure: '2026-01-12', return: '2026-01-19'}
  travelers jsonb not null, -- {adults: 2, children:1, childAges:[5], cabin:'Economy', details:[{firstName,lastName,dob,idType,saId/passportNo,nationality,expiry}]}
  id_type text not null check (id_type in ('SA_ID','FOREIGN_PASSPORT')),
  contact jsonb not null, -- {email, phone}
  competitor_price numeric not null,
  supplier_cost numeric not null,
  our_price numeric not null, -- max(competitor-50, supplier*1.12)
  gateway_fee numeric not null,
  total numeric not null, -- our_price + gateway_fee
  gateway text not null check (gateway in ('paystack','payfast','ozow','capitec','eft')),
  status text not null default 'PAID' check (status in ('PAID','PENDING','REFUNDED','FAILED')),
  ledger_posted boolean default true,
  created_at timestamptz default now(),
  paid_at timestamptz default now()
);

-- Ledger Table (Double Entry)
create table public.ledger (
  id uuid primary key default uuid_generate_v4(),
  date timestamptz default now(),
  ref text not null references public.bookings(ref),
  account_code text not null, -- 1000 Bank, 4000 Income, 5000 Supplier, 5010 Fees, 2000 VAT, 2005 PAYE, 2006 UIF
  account_name text not null,
  debit numeric default 0,
  credit numeric default 0,
  description text,
  gateway text,
  created_at timestamptz default now()
);

-- Payroll Table
create table public.payroll_runs (
  id uuid primary key default uuid_generate_v4(),
  month text not null, -- 2026-01
  staff jsonb not null, -- array of {name, role, basic, paye, uif, sdl, net}
  total_basic numeric,
  total_paye numeric,
  total_uif numeric,
  total_net numeric,
  emp201_payload jsonb,
  created_at timestamptz default now()
);

-- Indexes
create index idx_bookings_ref on public.bookings(ref);
create index idx_bookings_type on public.bookings(type);
create index idx_bookings_created on public.bookings(created_at desc);
create index idx_ledger_ref on public.ledger(ref);
create index idx_ledger_account on public.ledger(account_code);

-- RLS (disable for now for quick launch, enable with policies later for POPIA)
alter table public.bookings enable row level security;
alter table public.ledger enable row level security;
alter table public.payroll_runs enable row level security;

-- Allow all for anon/service (replace with strict policies before launch)
create policy "Allow all" on public.bookings for all using (true) with check (true);
create policy "Allow all" on public.ledger for all using (true) with check (true);
create policy "Allow all" on public.payroll_runs for all using (true) with check (true);

-- Seed mock bookings (10)
insert into public.bookings (ref, type, route, travelers, id_type, contact, competitor_price, supplier_cost, our_price, gateway_fee, total, gateway, status)
values
('BK-2026-1001','Flights','{"from":"JNB","to":"CPT","departure":"2026-10-15"}'::jsonb,'{"adults":2,"children":1,"childAges":[5]}'::jsonb,'SA_ID','{"email":"test@khilane.travel","phone":"0820000001"}'::jsonb, 3250, 2857, 3200, 93.8, 3293.8,'paystack','PAID'),
('BK-2026-1002','Stays','{"destination":"Cape Town","checkin":"2026-11-01","checkout":"2026-11-03","nights":2}'::jsonb,'{"adults":2,"rooms":1}'::jsonb,'FOREIGN_PASSPORT','{"email":"guest@hotel.com","phone":"+44 7700 900000"}'::jsonb, 5900, 5267, 5850, 170.65, 6020.65,'ozow','PAID');
