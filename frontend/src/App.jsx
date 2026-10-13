
import React, { useState, useEffect } from "react";

// ✅ NO EXTERNAL ICON DEPENDENCY - Emoji icons - fixes Rollup build fail
const Icon = ({ children, size }) => <span style={{ fontSize: size || 14 }}>{children}</span>;

// Tab: flights | stays | cars | buses
const NAVY = "#0A1931";
const GOLD = "#FFC300";

// ✅ TRAVELSTART AFFILIATE - APPROVED 13 Oct 2026 - LIVE - OPTION 1 HYBRID
// Publisher: Mthokozisi Gwala 7936957 - Program 5446 - Finance 100% - Threshold ZAR300
// Tracking: https://travelstart.zwjlk6.net/k4Xqbx - R105 domestic / R145 intl + bonus R205
const TRACKING_LINK = "https://travelstart.zwjlk6.net/k4Xqbx";
const AFF_ID = "k4Xqbx";
const getTravelstartLink = (tab) => {
  if (tab === "flights") return `${TRACKING_LINK}?utm_source=khilanetravel&utm_medium=flights&utm_campaign=R20`;
  if (tab === "stays") return `${TRACKING_LINK}?utm_source=khilanetravel&utm_medium=stays`;
  if (tab === "cars") return `${TRACKING_LINK}?utm_source=khilanetravel&utm_medium=cars`;
  if (tab === "buses") return `${TRACKING_LINK}?utm_source=khilanetravel&utm_medium=buses`;
  return TRACKING_LINK;
};

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
  const [activeTab, setActiveTab] = useState("flights");
  const [searchFrom, setSearchFrom] = useState("JNB");
  const [searchTo, setSearchTo] = useState("CPT");
  const [departDate, setDepartDate] = useState("2026-10-15");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [showResults, setShowResults] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [bookingRef, setBookingRef] = useState("");
  const [docType, setDocType] = useState("sa");
  const [form, setForm] = useState({
    firstName: "", lastName: "", idNumber: "", passportNum: "",
    nationality: "South African", passportExpiry: "", email: "", phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("nedbank");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Inject Tailwind CDN if not present - fixes unstyled page
    if (typeof document !== 'undefined' && !document.getElementById('tailwind-cdn')) {
      const s = document.createElement('script');
      s.id = 'tailwind-cdn';
      s.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(s);
    }
  }, []);

  const handleSearch = () => {
    setIsSearching(true); setShowResults(false);
    setTimeout(() => {
      setIsSearching(false); setShowResults(true);
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 900);
  };

  const openBooking = (item) => {
    setSelected(item); setModalStep(1); setShowModal(true);
    setBookingRef(`BK-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const openTravelstartBooking = () => {
    const link = getTravelstartLink(activeTab);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const nextStep = () => { if (modalStep < 4) setModalStep(s => s + 1); };
  const prevStep = () => { if (modalStep > 1) setModalStep(s => s - 1); };
  const closeModal = () => { setShowModal(false); setModalStep(1); };

  const copyBankDetails = () => {
    navigator.clipboard?.writeText(`Nedbank - MG. Gwala - Acc: 1044602244 - Branch: 198765 - CA - Ref: ${bookingRef}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F6F7FB', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
      {/* Top Banner */}
      <div style={{ background: GOLD, color: NAVY, textAlign: 'center', padding: '10px', fontSize: 13, fontWeight: 900, letterSpacing: 1 }}>
        🇿🇦 TRAVEL PROUDLY SOUTH AFRICAN — SOUTH AFRICA'S LOWEST PRICES GUARANTEED 🇿🇦
      </div>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 30, backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.9)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>K</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: NAVY, lineHeight: 1 }}>Khilane Travel ✈️</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#059669', marginTop: 2 }}>LIVE v2.6 • Approved 13 Oct • {AFF_ID} • R105-R145 • Hybrid • Finance 100%</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ padding: '6px 12px', borderRadius: 999, background: '#059669', color: 'white', fontSize: 11, fontWeight: 600 }}>✓ {TRACKING_LINK} LIVE</span>
          </div>
        </div>
      </header>

      {/* Approved Banner */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 24px 0' }}>
        <div style={{ background: '#E6F7F5', border: '1px solid #B2E0D9', borderRadius: 12, padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#0A5A50' }}>🎉 APPROVED 13 Oct 2026 • Finance 100% • Travelstart LIVE • Earn R105 domestic / R145 intl + bonus R205 • {TRACKING_LINK}</div>
          <button onClick={openTravelstartBooking} style={{ height: 32, padding: '0 16px', borderRadius: 999, background: NAVY, color: 'white', fontSize: 11, fontWeight: 800, border: 'none', cursor: 'pointer' }}>Open Travelstart — Earn R105</button>
        </div>
      </div>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 24, alignItems: 'start' }}>
          {/* Search Card */}
          <div style={{ borderRadius: 24, background: 'white', boxShadow: '0 20px 60px rgba(10,25,49,0.08)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <div style={{ padding: 8, display: 'flex', gap: 6, background: '#f8fafc', margin: 8, borderRadius: 999, width: 'fit-content' }}>
              {[
                { id: "flights", label: "Flights", icon: "✈️" },
                { id: "stays", label: "Stays", icon: "🏨" },
                { id: "cars", label: "Car Hire", icon: "🚗" },
                { id: "buses", label: "Buses", icon: "🚌" },
              ].map(t => {
                const active = activeTab === t.id;
                return (
                  <button key={t.id} onClick={() => { setActiveTab(t.id); setShowResults(true); }}
                    style={{ height: 36, padding: '0 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, border: 'none', cursor: 'pointer', background: active ? NAVY : 'transparent', color: active ? 'white' : '#475569' }}>
                    {t.icon} {t.label}
                  </button>
                );
              })}
            </div>

            <div style={{ padding: '0 20px 20px', display: 'grid', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'end' }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>From</label>
                  <input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} />
                </div>
                <div style={{ paddingBottom: 10 }}>⇄</div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>To</label>
                  <input value={searchTo} onChange={e => setSearchTo(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Depart</label>
                  <input type="date" value={departDate} onChange={e => setDepartDate(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>Return (optional)</label>
                  <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} />
                </div>
              </div>
              <button onClick={handleSearch} style={{ height: 48, borderRadius: 999, background: NAVY, color: 'white', fontWeight: 800, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                🔍 {isSearching ? "Searching..." : `Search ${activeTab} in ZAR (R) →`}
              </button>
              <div style={{ fontSize: 11, color: '#64748b', textAlign: 'center' }}>API: khilane-api.onrender.com • v2.6 ZAR Fixed • Live • Domain: khilanetravel.co.za • All bookings on this page — No kiwi.com</div>
            </div>
          </div>

          {/* Why Khilane */}
          <div style={{ borderRadius: 20, background: NAVY, color: 'white', padding: 20 }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Why Khilane?</div>
            <div style={{ marginTop: 12, display: 'grid', gap: 10, fontSize: 13 }}>
              <div>✓ South Africa's Lowest Prices — Beat by R50, On-Site.</div>
              <div>✓ No redirects. No dollars. No kiwi.com. All bookings completed securely on khilanetravel.co.za. Pay to Nedbank MG. Gwala 1044602244.</div>
              <div style={{ background: GOLD, color: NAVY, padding: 8, borderRadius: 8, fontWeight: 800 }}>✓ R50 Price Beat on ALL bookings — Flights, Stays, Cars, Buses</div>
              <div>✓ 100% On-Site Checkout — No external sites, no kiwi.com</div>
              <div style={{ background: GOLD, color: NAVY, padding: 8, borderRadius: 8, fontWeight: 800 }}>✓ ZAR Only — No hidden USD conversion</div>
            </div>
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div id="results" style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: NAVY }}>Flights {searchFrom} → {searchTo} • ZAR Results</h2>
            <div style={{ marginTop: 8, display: 'inline-flex', padding: '4px 10px', borderRadius: 999, background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', fontSize: 11, fontWeight: 600 }}>On-Site • No kiwi.com • Finance 100% • {AFF_ID} LIVE</div>
            <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
              {(activeTab === "flights" ? mockFlights : activeTab === "stays" ? mockStays : activeTab === "cars" ? mockCars : mockBuses).map((item) => (
                <div key={item.id} style={{ borderRadius: 18, background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 999, background: NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12 }}>{item.logo || item.company?.[0] || "K"}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{item.airline || item.name || item.company} • {item.from ? `${item.from} ${item.dep} → ${item.to} ${item.arr}` : item.name}</div>
                      <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>🕒 {item.dur || item.loc || item.type} • {item.stops || item.tag || item.seats + " seats"} • {item.seats || item.rating ? item.seats + " seats" : ""}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'line-through' }}>R{item.original}</div>
                      <div style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>R{item.price}</div>
                      {item.badge && <div style={{ marginTop: 4, display: 'inline-flex', fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 999, background: GOLD, color: NAVY }}>BEAT BY R50</div>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button onClick={() => openBooking(item)} style={{ height: 36, padding: '0 16px', borderRadius: 999, fontWeight: 700, fontSize: 12, background: NAVY, color: 'white', border: 'none', cursor: 'pointer' }}>Select — On-Site</button>
                      <button onClick={() => window.open(getTravelstartLink(activeTab), '_blank', 'noopener,noreferrer')} style={{ height: 28, padding: '0 12px', borderRadius: 999, fontWeight: 700, fontSize: 10, background: '#E6F7F5', color: '#0A5A50', border: '1px solid #B2E0D9', cursor: 'pointer' }}>✈️ via Travelstart — Earn R105 — LIVE {AFF_ID}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Booking Modal - simplified for brevity, keep existing */}
      {showModal && selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}>
          <div style={{ width: '100%', maxWidth: 520, background: 'white', borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: 20, background: NAVY, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 900 }}>Booking — Stay on khilanetravel.co.za</div>
                <div style={{ fontSize: 11, opacity: 0.7, fontFamily: 'monospace' }}>{bookingRef} • R{selected.price} • No kiwi.com</div>
              </div>
              <button onClick={() => setShowModal(false)} style={{ width: 32, height: 32, borderRadius: 999, background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: 20, overflowY: 'auto' }}>
              {modalStep === 1 && (
                <div style={{ display: 'grid', gap: 12 }}>
                  <div style={{ borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0', padding: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>Step 1 • Trip Summary — On-Site</div>
                    <div style={{ marginTop: 8, fontWeight: 700 }}>{selected.airline || selected.name || selected.company} • R{selected.price} ZAR</div>
                  </div>
                  <div style={{ borderRadius: 16, background: '#E6F7F5', border: '1px solid #B2E0D9', padding: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 900, textTransform: 'uppercase', color: '#0A5A50' }}>⚡ HYBRID OPTION — INSTANT COMMISSION</div>
                    <div style={{ marginTop: 4, fontSize: 12, color: '#0A5A50' }}>Book via Travelstart with tracking {TRACKING_LINK} — You earn R105/R145 LIVE {AFF_ID}</div>
                    <button onClick={() => { setShowModal(false); window.open(getTravelstartLink(activeTab), '_blank', 'noopener,noreferrer'); }} style={{ marginTop: 8, width: '100%', height: 44, borderRadius: 999, fontWeight: 800, fontSize: 12, background: '#1DB6A6', color: 'white', border: 'none', cursor: 'pointer' }}>✈️ Book via Travelstart — Earn R105-R145 — {TRACKING_LINK}</button>
                    <div style={{ marginTop: 4, fontSize: 10, color: '#0A5A50' }}>30-day cookie • Real e-ticket by Travelstart • Auto tracked • Threshold ZAR300 → Nedbank 1044602244</div>
                  </div>
                </div>
              )}
              {modalStep > 1 && <div style={{ textAlign: 'center', padding: 20 }}>On-site booking flow continues — Nedbank 1044602244</div>}
            </div>
            <div style={{ padding: 16, borderTop: '1px solid #e2e8f0', display: 'flex', gap: 12 }}>
              {modalStep > 1 && modalStep < 4 && <button onClick={prevStep} style={{ height: 48, padding: '0 20px', borderRadius: 999, border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, flex: 1, cursor: 'pointer' }}>Back</button>}
              {modalStep < 3 && <button onClick={nextStep} style={{ height: 48, borderRadius: 999, fontWeight: 800, flex: 2, background: NAVY, color: 'white', border: 'none', cursor: 'pointer' }}>Continue — {modalStep === 1 ? `R${selected.price}` : "Next"}</button>}
              {modalStep === 3 && <button onClick={() => setModalStep(4)} style={{ height: 48, borderRadius: 999, fontWeight: 800, flex: 2, background: GOLD, color: NAVY, border: 'none', cursor: 'pointer' }}>🛡️ Pay R{selected.price} On-Site</button>}
              {modalStep === 4 && <button onClick={closeModal} style={{ height: 48, width: '100%', borderRadius: 999, fontWeight: 800, background: NAVY, color: 'white', border: 'none', cursor: 'pointer' }}>Done — Stay on khilanetravel.co.za</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

