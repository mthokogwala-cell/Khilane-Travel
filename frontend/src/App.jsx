import React, { useState, useEffect } from "react";

// OPTION 2 - PURE AFFILIATE - CUSTOMER SAFE - NO SENSITIVE INFO SHOWN
// Approved 13 Oct 2026 - Publisher Mthokozisi Gwala 7936957 - Program 5446
// Finance 100% - Threshold ZAR300 - Tracking hidden from customers but active
const NAVY = "#0A1931";
const GOLD = "#FFC300";
const TRACKING_LINK = "https://travelstart.zwjlk6.net/k4Xqbx"; // Hidden from customers, still tracks

const getTravelstartLink = (tab) => {
  const base = TRACKING_LINK;
  if (tab === "flights") return `${base}?utm_source=khilanetravel&utm_medium=flights&utm_campaign=option2`;
  if (tab === "stays") return `${base}?utm_source=khilanetravel&utm_medium=stays`;
  if (tab === "cars") return `${base}?utm_source=khilanetravel&utm_medium=cars`;
  if (tab === "buses") return `${base}?utm_source=khilanetravel&utm_medium=buses`;
  return base;
};

const mockFlights = [
  { id: 1, airline: "FlySafair", code: "FA", from: "JNB", to: "CPT", dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, badge: true, seats: 3 },
  { id: 2, airline: "Airlink", code: "4Z", from: "JNB", to: "CPT", dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, badge: true, seats: 5 },
  { id: 3, airline: "CemAir", code: "5Z", from: "JNB", to: "CPT", dep: "11:10", arr: "13:30", dur: "2h 20m", stops: "Direct", price: 945, original: 995, badge: false, seats: 2 },
  { id: 4, airline: "LIFT", code: "GE", from: "JNB", to: "CPT", dep: "14:05", arr: "16:20", dur: "2h 15m", stops: "Direct", price: 989, original: 1039, badge: false, seats: 6 },
  { id: 5, airline: "FlySafair", code: "FA", from: "JNB", to: "CPT", dep: "17:30", arr: "19:45", dur: "2h 15m", stops: "Direct", price: 1025, original: 1075, badge: true, seats: 4 },
  { id: 6, airline: "Airlink", code: "4Z", from: "JNB", to: "CPT", dep: "19:15", arr: "21:30", dur: "2h 15m", stops: "Direct", price: 1110, original: 1160, badge: false, seats: 1 },
];
const mockStays = [
  { id: 101, name: "Beverly Hills Hotel Umhlanga", loc: "Umhlanga Rocks, Durban", rating: 4.8, reviews: 1243, price: 2850, original: 3200, per: "night", tag: "Beachfront", badge: true },
  { id: 102, name: "The Oyster Box", loc: "Umhlanga Ridge", rating: 4.9, reviews: 892, price: 3450, original: 3800, per: "night", tag: "5-Star Luxury", badge: true },
  { id: 103, name: "Sun City Resort", loc: "Rustenburg, North West", rating: 4.6, reviews: 2104, price: 1890, original: 2100, per: "night", tag: "Family Favourite", badge: false },
  { id: 104, name: "Cape Grace, Fairmont Managed", loc: "V&A Waterfront, Cape Town", rating: 4.9, reviews: 756, price: 4250, original: 4600, per: "night", tag: "Harbour Views", badge: true },
];
const mockCars = [
  { id: 201, name: "Toyota Corolla Quest", type: "Sedan - Manual", seats: 5, bags: 2, fuel: "Petrol", price: 489, original: 539, per: "day", badge: true, company: "Avis" },
  { id: 202, name: "VW Polo Vivo", type: "Hatch - Manual", seats: 5, bags: 2, fuel: "Petrol", price: 425, original: 475, per: "day", badge: true, company: "Budget" },
  { id: 203, name: "Toyota Fortuner", type: "SUV - Auto", seats: 7, bags: 3, fuel: "Diesel", price: 1150, original: 1220, per: "day", badge: false, company: "Hertz" },
];
const mockBuses = [
  { id: 301, company: "Intercape", from: "JNB Park Station", to: "CPT Station", dep: "18:00", arr: "12:30+1", dur: "18h 30m", price: 685, original: 735, badge: true, type: "Sleepliner" },
  { id: 302, company: "Greyhound", from: "Pretoria", to: "Durban", dep: "20:15", arr: "06:45+1", dur: "10h 30m", price: 520, original: 570, badge: true, type: "Dreamliner" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("flights");
  const [searchFrom, setSearchFrom] = useState("JNB");
  const [searchTo, setSearchTo] = useState("CPT");
  const [departDate, setDepartDate] = useState("2026-10-15");
  const [returnDate, setReturnDate] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('tailwind-cdn')) {
      const s = document.createElement('script');
      s.id = 'tailwind-cdn';
      s.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(s);
    }
  }, []);

  const handleSearch = () => {
    setIsSearching(true); setShowResults(false);
    setTimeout(() => { setIsSearching(false); setShowResults(true); }, 600);
  };

  const openTravelstart = () => {
    const link = getTravelstartLink(activeTab);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const data = activeTab === "flights" ? mockFlights : activeTab === "stays" ? mockStays : activeTab === "cars" ? mockCars : mockBuses;

  return (
    <div style={{ minHeight: '100vh', background: '#F6F7FB', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
      <div style={{ background: GOLD, color: NAVY, textAlign: 'center', padding: '10px', fontSize: 12, fontWeight: 900 }}>
        ZA TRAVEL PROUDLY SOUTH AFRICAN — SOUTH AFRICA'S LOWEST PRICES GUARANTEED ZA
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>K</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>Khilane Travel Flight</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>SA's Lowest Prices - Instant E-Ticket - Secure Booking</div>
            </div>
          </div>
          <div style={{ padding: '6px 12px', borderRadius: 999, background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', fontSize: 11, fontWeight: 700 }}>V Secure - Trusted SA Brand</div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 20 }}>
          <div style={{ background: 'white', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(10,25,49,0.06)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 6, background: '#f8fafc', margin: 8, padding: 4, borderRadius: 999, width: 'fit-content' }}>
              {[{ id: "flights", l: "Flights", i: "Flight" }, { id: "stays", l: "Stays", i: "Hotel" }, { id: "cars", l: "Car Hire", i: "Car" }, { id: "buses", l: "Buses", i: "Bus" }].map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: activeTab === t.id ? NAVY : 'transparent', color: activeTab === t.id ? 'white' : '#475569' }}>{t.i} {t.l}</button>
              ))}
            </div>
            <div style={{ padding: '0 20px 20px', display: 'grid', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'end' }}>
                <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>From</label><input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} /></div>
                <div style={{ paddingBottom: 10 }}>to</div>
                <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>To</label><input value={searchTo} onChange={e => setSearchTo(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Depart</label><input type="date" value={departDate} onChange={e => setDepartDate(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} /></div>
                <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Return</label><input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} /></div>
              </div>
              <button onClick={handleSearch} style={{ height: 48, borderRadius: 999, background: NAVY, color: 'white', fontWeight: 900, border: 'none', cursor: 'pointer' }}>{isSearching ? "Searching..." : `Search ${activeTab} in ZAR  -> `}</button>
              <div style={{ fontSize: 11, color: '#64748b', textAlign: 'center' }}>Powered by Travelstart - Instant e-ticket - ZAR</div>
            </div>
          </div>

          <div style={{ background: NAVY, color: 'white', borderRadius: 20, padding: 20 }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Why Khilane Travel?</div>
            <div style={{ marginTop: 12, display: 'grid', gap: 10, fontSize: 13 }}>
              <div>V South Africa's Lowest Prices — Beat by R50 Guaranteed</div>
              <div>V Instant E-Ticket — No waiting, ticket issued in minutes</div>
              <div>V Trusted SA Brand — Powered by Travelstart</div>
              <div>V Secure & Safe — No hidden USD, ZAR only</div>
              <div>V 24/7 Support — Changes, refunds, customer care</div>
              <div style={{ background: GOLD, color: NAVY, padding: 10, borderRadius: 10, fontWeight: 900 }}>V 100% Secure Checkout — Instant confirmation</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontWeight: 900, fontSize: 20, color: NAVY }}>Flights {searchFrom}  ->  {searchTo} - Best Prices in ZAR</h2>
          <div style={{ marginTop: 8 }}>
            <span style={{ padding: '4px 10px', borderRadius: 999, background: '#ecfdf5', border: '1px solid #a7f3d0', fontSize: 11, fontWeight: 700, color: '#065f46' }}>V Instant E-Ticket - Trusted SA - Secure</span>
          </div>
          <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            {data.map((item) => (
              <div key={item.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11 }}>{item.code || item.company?.[0] || "K"}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{item.airline || item.name || item.company} - {item.from ? `${item.from} ${item.dep}  ->  ${item.to} ${item.arr}` : item.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{item.dur || item.loc} - {item.stops || item.tag} - {item.seats ? item.seats + " seats" : ""}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'line-through' }}>R{item.original}</div>
                    <div style={{ fontWeight: 900, fontSize: 16, color: NAVY }}>R{item.price}</div>
                    {item.badge && <div style={{ marginTop: 2, display: 'inline-flex', fontSize: 9, fontWeight: 900, padding: '2px 6px', borderRadius: 999, background: GOLD, color: NAVY }}>BEAT BY R50</div>}
                  </div>
                  <button onClick={() => openTravelstart()} style={{ height: 40, padding: '0 18px', borderRadius: 999, background: NAVY, color: 'white', border: 'none', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>Select — Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 11, color: '#64748b', padding: 12, background: 'white', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          © 2026 Khilane Travel - Proudly South African - Powered by Travelstart - Instant e-ticket - Secure ZAR checkout
        </div>
      </main>
    </div>
  );
}
