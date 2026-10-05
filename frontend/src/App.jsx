import React, { useState, useEffect } from "react";
import {
  Plane,
  Building2,
  Car,
  Bus,
  Search,
  ArrowLeftRight,
  Clock,
  Star,
  MapPin,
  Users,
  Check,
  X,
  Copy,
  CreditCard,
  ShieldCheck,
  Calendar,
  Luggage,
  Fuel,
  Armchair,
  AlertCircle,
} from "lucide-react";

type Tab = "flights" | "stays" | "cars" | "buses";

const NAVY = "#0A1931";
const GOLD = "#FFC300";

const mockFlights = [
  { id: 1, airline: "FlySafair", code: "FA", logo: "FA", from: "JNB", to: "CPT", dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, badge: true, seats: 3 },
  { id: 2, airline: "Airlink", code: "4Z", logo: "4Z", from: "JNB", to: "CPT", dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, badge: true, seats: 5 },
  { id: 3, airline: "CemAir", code: "5Z", logo: "5Z", from: "JNB", to: "CPT", dep: "11:10", arr: "13:30", dur: "2h 20m", stops: "Direct", price: 945, original: 995, badge: false, seats: 2 },
  { id: 4, airline: "LIFT", code: "GE", logo: "GE", from: "JNB", to: "CPT", dep: "14:05", arr: "16:20", dur: "2h 15m", stops: "Direct", price: 989, original: 1039, badge: false, seats: 6 },
  { id: 5, airline: "FlySafair", code: "FA", logo: "FA", from: "JNB", to: "CPT", dep: "17:30", arr: "19:45", dur: "2h 15m", stops: "Direct", price: 1025, original: 1075, badge: true, seats: 4 },
  { id: 6, airline: "Airlink", code: "4Z", logo: "4Z", from: "JNB", to: "CPT", dep: "19:15", arr: "21:30", dur: "2h 15m", stops: "Direct", price: 1110, original: 1160, badge: false, seats: 1 },
];

const mockStays = [
  { id: 101, name: "Beverly Hills Hotel Umhlanga", loc: "Umhlanga Rocks, Durban", rating: 4.8, reviews: 1243, price: 2850, original: 3200, per: "night", tag: "Beachfront", badge: true },
  { id: 102, name: "The Oyster Box", loc: "Umhlanga Ridge", rating: 4.9, reviews: 892, price: 3450, original: 3800, per: "night", tag: "5-Star Luxury", badge: true },
  { id: 103, name: "Sun City Resort", loc: "Rustenburg, North West", rating: 4.6, reviews: 2104, price: 1890, original: 2100, per: "night", tag: "Family Favourite", badge: false },
  { id: 104, name: "Cape Grace, Fairmont Managed", loc: "V&A Waterfront, Cape Town", rating: 4.9, reviews: 756, price: 4250, original: 4600, per: "night", tag: "Harbour Views", badge: true },
];

const mockCars = [
  { id: 201, name: "Toyota Corolla Quest", type: "Sedan • Manual", seats: 5, bags: 2, fuel: "Petrol", price: 489, original: 539, per: "day", badge: true, company: "Avis" },
  { id: 202, name: "VW Polo Vivo", type: "Hatch • Manual", seats: 5, bags: 2, fuel: "Petrol", price: 425, original: 475, per: "day", badge: true, company: "Budget" },
  { id: 203, name: "Toyota Fortuner", type: "SUV • Auto", seats: 7, bags: 3, fuel: "Diesel", price: 1150, original: 1220, per: "day", badge: false, company: "Hertz" },
  { id: 204, name: "Hyundai H1", type: "Minivan • Manual", seats: 8, bags: 4, fuel: "Diesel", price: 1320, original: 1390, per: "day", badge: false, company: "Europcar" },
];

const mockBuses = [
  { id: 301, company: "Intercape", from: "JNB Park Station", to: "CPT Station", dep: "18:00", arr: "12:30+1", dur: "18h 30m", price: 685, original: 735, badge: true, type: "Sleepliner" },
  { id: 302, company: "Greyhound", from: "Pretoria", to: "Durban", dep: "20:15", arr: "06:45+1", dur: "10h 30m", price: 520, original: 570, badge: true, type: "Dreamliner" },
  { id: 303, company: "Intercity Xpress", from: "JNB", to: "Gqeberha", dep: "17:00", arr: "07:00+1", dur: "14h 00m", price: 595, original: 645, badge: false, type: "Semi-Lux" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("flights");
  const [searchFrom, setSearchFrom] = useState("JNB");
  const [searchTo, setSearchTo] = useState("CPT");
  const [departDate, setDepartDate] = useState("2026-10-15");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [showResults, setShowResults] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [bookingRef, setBookingRef] = useState("");
  const [docType, setDocType] = useState<"sa" | "passport">("sa");
  const [form, setForm] = useState({
    firstName: "", lastName: "", idNumber: "", passportNum: "",
    nationality: "South African", passportExpiry: "", email: "", phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("nedbank");
  const [copied, setCopied] = useState(false);

  useEffect(() => { setShowResults(true); }, []);

  const handleSearch = () => {
    setIsSearching(true); setShowResults(false);
    setTimeout(() => {
      setIsSearching(false); setShowResults(true);
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 900);
  };

  const openBooking = (item: any) => {
    setSelected(item); setModalStep(1); setShowModal(true);
    setBookingRef(`BK-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const nextStep = () => { if (modalStep < 4) setModalStep(s => s + 1); };
  const prevStep = () => { if (modalStep > 1) setModalStep(s => s - 1); };
  const closeModal = () => { setShowModal(false); setModalStep(1); };

  const copyBankDetails = () => {
    navigator.clipboard?.writeText(`Nedbank - MG. Gwala - Acc: 1044602244 - Branch: 198765 - CA - Ref: ${bookingRef}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-slate-900" style={{ fontFamily: "Inter, system-ui" }}>
      <div className="w-full text-center py-2.5 px-2 text-[11px] sm:text-[13px] font-extrabold tracking-widest uppercase" style={{ background: GOLD, color: NAVY }}>
        🇿🇦 TRAVEL PROUDLY SOUTH AFRICAN — SOUTH AFRICA'S LOWEST PRICES GUARANTEED 🇿🇦
      </div>

      <header className="sticky top-0 z-30 backdrop-blur bg-white/85 border-b">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black" style={{ background: NAVY }}>K</div>
            <div>
              <div className="font-black leading-none tracking-tight text-[18px]" style={{ color: NAVY }}>Khilane Travel ✈️</div>
              <div className="text-[11px] font-semibold text-emerald-600 leading-none mt-[2px]">ZAR Live v2.4 • R50 Beat • On-Site Booking • No Kiwi</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium">
            <span className="px-3 py-1.5 rounded-full bg-slate-900 text-white">API: khilane-api.onrender.com • Live • khilanetravel.co.za</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
          <div className="rounded-[24px] bg-white shadow-[0_20px_60px_rgba(10,25,49,0.08)] border overflow-hidden">
            <div className="p-1.5 sm:p-2 flex gap-1.5 bg-slate-50 m-2 rounded-full w-fit">
              {[
                { id: "flights", label: "Flights", icon: Plane },
                { id: "stays", label: "Stays", icon: Building2 },
                { id: "cars", label: "Car Hire", icon: Car },
                { id: "buses", label: "Buses", icon: Bus },
              ].map(t => {
                const active = activeTab === t.id;
                return (
                  <button key={t.id} onClick={() => { setActiveTab(t.id as Tab); setShowResults(true); }}
                    className={`h-9 px-4 rounded-full text-[13px] font-semibold flex items-center gap-1.5 transition ${active ? "text-white shadow" : "text-slate-600 hover:bg-white"}`}
                    style={{ background: active ? NAVY : "transparent" }}>
                    <t.icon size={14} /> {t.label}
                  </button>
                );
              })}
            </div>

            <div className="p-4 sm:p-6 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">From</label>
                  <input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} className="mt-1 w-full h-12 rounded-xl border bg-white px-3 font-bold outline-none focus:ring-2 focus:ring-[#FFC300]" placeholder="JNB" />
                </div>
                <div className="relative">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">To</label>
                  <input value={searchTo} onChange={e => setSearchTo(e.target.value)} className="mt-1 w-full h-12 rounded-xl border bg-white px-3 font-bold outline-none focus:ring-2 focus:ring-[#FFC300]" placeholder="CPT" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 uppercase">Depart</label>
                  <input type="date" value={departDate} onChange={e => setDepartDate(e.target.value)} className="mt-1 w-full h-12 rounded-xl border bg-white px-3 text-sm outline-none" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 uppercase">Return (optional)</label>
                  <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} className="mt-1 w-full h-12 rounded-xl border bg-white px-3 text-sm outline-none" />
                </div>
              </div>

              <button onClick={handleSearch} disabled={isSearching}
                className="mt-5 w-full h-[52px] rounded-full font-black text-[15px] flex items-center justify-center gap-2 tracking-wide shadow"
                style={{ background: GOLD, color: NAVY }}>
                {isSearching ? "Searching in ZAR (R)..." : `Search ${activeTab === "flights" ? "Flights" : activeTab === "stays" ? "Stays" : activeTab === "cars" ? "Cars" : "Buses"} in ZAR (R) →`}
              </button>

              <div className="mt-3 text-[11px] text-slate-500 text-center">API: khilane-api.onrender.com • v2.4 ZAR Fixed • Live • Domain: khilanetravel.co.za • All bookings on this page — No kiwi.com</div>
            </div>
          </div>

          <div className="rounded-[24px] p-5 sm:p-6 text-white" style={{ background: NAVY }}>
            <div className="text-[13px] font-semibold tracking-widest uppercase opacity-70">Why Khilane?</div>
            <div className="mt-3 text-[26px] font-black leading-[1.1]">South Africa's Lowest Prices — Beat by R50, On-Site.</div>
            <div className="mt-3 text-[13px] opacity-80 leading-relaxed">No redirects. No dollars. No kiwi.com. All bookings completed securely on khilanetravel.co.za. Pay to Nedbank MG. Gwala 1044602244.</div>
            <div className="mt-5 grid grid-cols-1 gap-2.5">
              {[
                "R50 Price Beat on ALL bookings — Flights, Stays, Cars, Buses",
                "100% On-Site Checkout — No external sites, no kiwi.com",
                "ZAR Only — No hidden USD conversion",
              ].map((x, i) => (
                <div key={i} className="flex gap-2.5 items-start rounded-xl bg-white/10 p-3 border border-white/10">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: GOLD }}><Check size={14} color={NAVY} strokeWidth={3} /></div>
                  <div className="text-[13px] font-medium leading-[1.3]">{x}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="results" className="mt-8">
          {showResults && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-black text-[18px]" style={{ color: NAVY }}>
                  {activeTab === "flights" ? `Flights ${searchFrom} → ${searchTo}` : activeTab === "stays" ? "Stays — Real Hotels (Not Flights)" : activeTab === "cars" ? "Car Hire SA" : "Buses SA"} • ZAR Results
                </h2>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold">On-Site • No kiwi.com</span>
              </div>

              {(activeTab === "flights" ? mockFlights : activeTab === "stays" ? mockStays : activeTab === "cars" ? mockCars : mockBuses).map((item: any) => (
                <div key={item.id} className="rounded-[18px] bg-white border shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-[12px]">{item.logo || item.company?.[0] || "K"}</div>
                    <div>
                      <div className="font-bold text-[14px] leading-tight">{activeTab === "flights" ? `${item.airline} • ${item.from} ${item.dep} → ${item.to} ${item.arr}` : activeTab === "stays" ? item.name : activeTab === "cars" ? `${item.company} • ${item.name}` : `${item.company} • ${item.from} → ${item.to}`}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        {activeTab === "flights" ? <><Clock size={12} /> {item.dur} • {item.stops} • {item.seats} seats</> : activeTab === "stays" ? <><MapPin size={12} /> {item.loc} • <Star size={12} className="fill-amber-400 text-amber-400" /> {item.rating} ({item.reviews})</> : activeTab === "cars" ? <><Users size={12} /> {item.seats} • {item.type}</> : <><Clock size={12} /> {item.dep} → {item.arr} • {item.dur} • {item.type}</>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400 line-through">R{item.original}</div>
                      <div className="font-black text-[18px]" style={{ color: NAVY }}>R{item.price}</div>
                      {item.badge && <div className="mt-1 inline-flex text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: GOLD, color: NAVY }}>BEAT BY R50</div>}
                    </div>
                    <button onClick={() => openBooking(item)} className="h-10 px-5 rounded-full font-bold text-[13px] text-white" style={{ background: NAVY }}>Select — Stay on Site</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 rounded-[20px] border bg-white p-4 text-center text-[11px] text-slate-500">All bookings completed securely on khilanetravel.co.za — No redirects to external sites — 100% South African • EFT: Nedbank MG. Gwala 1044602244 (CA) Branch 198765 • Paystack • PayFast • Ozow • No FNB account</div>
      </main>

      {showModal && selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/40 backdrop-blur-[2px]">
          <div className="w-full sm:max-w-[520px] bg-white rounded-t-[24px] sm:rounded-[24px] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden animate-[slideUp_0.25s_ease]">
            <div className="shrink-0 p-4 sm:p-5 border-b flex items-center justify-between" style={{ background: NAVY }}>
              <div className="text-white">
                <div className="font-black">Booking — Stay on khilanetravel.co.za</div>
                <div className="text-[11px] opacity-70 font-mono">{bookingRef} • R{selected.price} • No kiwi.com</div>
              </div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-white/15 text-white flex items-center justify-center"><X size={16} /></button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              {modalStep === 1 && (
                <div className="rounded-2xl bg-slate-50 border p-4">
                  <div className="text-[12px] font-bold uppercase tracking-wide text-slate-500">Step 1 • Trip Summary — On-Site</div>
                  <div className="mt-2 font-bold">{selected.airline || selected.name || selected.company} • R{selected.price} ZAR</div>
                  <div className="mt-1 text-[12px] text-slate-600">This booking will be completed entirely on khilanetravel.co.za. No redirect to kiwi.com. E-ticket issued from our system.</div>
                </div>
              )}

              {modalStep === 2 && (
                <div className="space-y-3">
                  <div className="text-[12px] font-bold uppercase">Step 2 • Traveller Details</div>
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-full w-fit">
                    <button onClick={() => setDocType("sa")} className={`px-3 h-8 rounded-full text-[12px] font-semibold ${docType === "sa" ? "bg-white shadow" : ""}`}>SA ID</button>
                    <button onClick={() => setDocType("passport")} className={`px-3 h-8 rounded-full text-[12px] font-semibold ${docType === "passport" ? "bg-white shadow" : ""}`}>Foreign Passport</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="First Name" className="h-11 rounded-xl border px-3 text-sm" />
                    <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Last Name" className="h-11 rounded-xl border px-3 text-sm" />
                    {docType === "sa" ? <input value={form.idNumber} onChange={e => setForm({ ...form, idNumber: e.target.value })} placeholder="SA ID 13-digit" className="col-span-2 h-11 rounded-xl border px-3 text-sm" /> : <>
                      <input value={form.passportNum} onChange={e => setForm({ ...form, passportNum: e.target.value })} placeholder="Passport No" className="col-span-2 h-11 rounded-xl border px-3 text-sm" />
                      <input value={form.nationality} onChange={e => setForm({ ...form, nationality: e.target.value })} placeholder="Nationality" className="h-11 rounded-xl border px-3 text-sm" />
                      <input type="date" value={form.passportExpiry} onChange={e => setForm({ ...form, passportExpiry: e.target.value })} className="h-11 rounded-xl border px-3 text-sm" />
                    </>}
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email for e-ticket (on khilanetravel.co.za)" className="col-span-2 h-11 rounded-xl border px-3 text-sm" />
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="col-span-2 h-11 rounded-xl border px-3 text-sm" />
                  </div>
                </div>
              )}

              {modalStep === 3 && (
                <div className="space-y-3">
                  <div className="text-[12px] font-bold uppercase">Step 3 • Payment — All on khilanetravel.co.za</div>
                  {[
                    { id: "nedbank", label: "Manual EFT 0% — Nedbank MG. Gwala", sub: "1044602244 • Branch 198765 • CA • Most trusted, no fees" },
                    { id: "paystack", label: "Paystack Card 2.9%+R1", sub: "Embedded on-site checkout" },
                    { id: "payfast", label: "PayFast 3.5%+R2", sub: "Embedded on-site" },
                    { id: "ozow", label: "Ozow Instant EFT 1.5%", sub: "Instant, stays on page" },
                    { id: "capitec", label: "Capitec Pay / Apple Pay / Google Pay", sub: "On-site wallet" },
                  ].map(m => (
                    <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`w-full text-left p-3 rounded-xl border flex items-center justify-between ${paymentMethod === m.id ? "border-[#0A1931] bg-[#F8FAFF]" : "bg-white"}`}>
                      <div><div className="font-semibold text-[13px]">{m.label}</div><div className="text-[11px] text-slate-500">{m.sub}</div></div>
                      {paymentMethod === m.id && <Check size={16} color={NAVY} />}
                    </button>
                  ))}

                  {paymentMethod === "nedbank" && (
                    <div className="rounded-2xl border p-4 bg-amber-50 border-amber-200">
                      <div className="flex justify-between items-center">
                        <div className="font-bold text-[13px]">EFT Details — Pay to:</div>
                        <button onClick={copyBankDetails} className="h-8 px-3 rounded-full bg-white border text-[11px] font-semibold flex items-center gap-1"><Copy size={12} /> {copied ? "Copied!" : "Copy"}</button>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
                        <div className="bg-white rounded-xl border p-2.5"><div className="text-[10px] uppercase text-slate-400 font-semibold">Account Holder</div><div className="font-bold">MG. Gwala</div></div>
                        <div className="bg-white rounded-xl border p-2.5"><div className="text-[10px] uppercase text-slate-400 font-semibold">Bank</div><div className="font-bold">Nedbank</div></div>
                        <div className="bg-white rounded-xl border p-2.5"><div className="text-[10px] uppercase text-slate-400 font-semibold">Account Number</div><div className="font-bold">1044602244</div></div>
                        <div className="bg-white rounded-xl border p-2.5"><div className="text-[10px] uppercase text-slate-400 font-semibold">Branch Code</div><div className="font-bold">198765</div></div>
                        <div className="col-span-2 bg-white rounded-xl border p-2.5 flex justify-between items-center"><div><div className="text-[10px] uppercase text-slate-400 font-semibold">Type</div><div className="font-bold">Current Account (CA)</div></div><div className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border">Verified SA</div></div>
                      </div>
                      <div className="mt-3 text-[11px] text-slate-600">Ref: {bookingRef} • After EFT upload proof here — ticket issued in 15 min on khilanetravel.co.za. No FNB used.</div>
                    </div>
                  )}
                </div>
              )}

              {modalStep === 4 && (
                <div className="text-center py-4">
                  <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: GOLD }}><Check size={36} strokeWidth={3} style={{ color: NAVY }} /></div>
                  <div className="font-black text-[22px]" style={{ color: NAVY }}>Booking Confirmed!</div>
                  <div className="mt-2 inline-flex px-4 py-2 rounded-full bg-slate-900 text-white font-mono text-sm">{bookingRef}</div>
                  <div className="mt-4 text-[12px] text-slate-600">E-ticket will be sent to {form.email || "your email"} from khilanetravel.co.za. Manage in My Trips on this site — no kiwi.com login needed. Paid to Nedbank 1044602244.</div>
                </div>
              )}
            </div>

            <div className="shrink-0 p-4 border-t bg-white flex gap-3">
              {modalStep > 1 && modalStep < 4 && <button onClick={prevStep} className="h-12 px-5 rounded-full border bg-white font-semibold text-sm flex-1">Back</button>}
              {modalStep < 3 && <button onClick={nextStep} className="h-12 rounded-full font-bold text-sm flex-[2] text-white" style={{ background: NAVY }}>Continue — {modalStep === 1 ? `R${selected.price}` : "Next"}</button>}
              {modalStep === 3 && <button onClick={() => setModalStep(4)} className="h-12 rounded-full font-bold text-sm flex-[2] flex items-center justify-center gap-2" style={{ background: GOLD, color: NAVY }}><ShieldCheck size={16} /> Pay R{selected.price} On-Site</button>}
              {modalStep === 4 && <button onClick={closeModal} className="h-12 w-full rounded-full font-bold text-sm text-white" style={{ background: NAVY }}>Done — Stay on khilanetravel.co.za</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
