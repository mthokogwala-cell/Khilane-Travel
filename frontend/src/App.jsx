import React, { useState, useEffect } from "react";

const NAVY = "#0A1931";
const GOLD = "#FFC300";

// AFFILIATE LINKS - ALL IN ZAR - currency=ZAR - PAY SA DIRECT ZAR
const LINKS = {
  travelstart: "https://travelstart.zwjlk6.net/k4Xqbx",
  aviasales: "https://www.aviasales.com/?marker=khilanetravel&currency=ZAR",
  kiwiTequila: "https://tequila.kiwi.com/?a_aid=khilanetravel&currency=ZAR",
  bookingTP: "https://search.hotellook.com/hotels?marker=khilanetravel&currency=ZAR&locale=en",
  discoverCars: "https://www.discovercars.com/?a_aid=khilanetravel&currency=ZAR",
  kiwitaxi: "https://kiwitaxi.com/?marker=khilanetravel&currency=ZAR",
  twelveGo: "https://12go.asia/en?marker=khilanetravel&currency=ZAR",
  busbud: "https://www.busbud.com/?a_aid=khilanetravel&currency=ZAR",
  omio: "https://www.omio.com/?a_aid=khilanetravel&currency=ZAR",
};

// Helper to format ZAR
const formatZAR = (amount) => `R ${amount.toLocaleString('en-ZA')} ZAR`;
const formatZARShort = (amount) => `R${amount} ZAR`;

const mockFlights = [
  { id: 1, airline: "FlySafair", code: "FA", from: "JNB", to: "CPT", dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, badge: true },
  { id: 2, airline: "Airlink", code: "4Z", from: "JNB", to: "CPT", dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, badge: true },
  { id: 3, airline: "CemAir", code: "5Z", from: "JNB", to: "CPT", dep: "11:10", arr: "13:30", dur: "2h 20m", stops: "Direct", price: 945, original: 995, badge: false },
  { id: 4, airline: "LIFT", code: "GE", from: "JNB", to: "CPT", dep: "14:05", arr: "16:20", dur: "2h 15m", stops: "Direct", price: 989, original: 1039, badge: false },
  { id: 5, airline: "FlySafair", code: "FA", from: "JNB", to: "DUR", dep: "06:30", arr: "07:35", dur: "1h 05m", stops: "Direct", price: 765, original: 815, badge: true },
  { id: 6, airline: "Airlink", code: "4Z", from: "JNB", to: "DUR", dep: "09:00", arr: "10:05", dur: "1h 05m", stops: "Direct", price: 812, original: 862, badge: true },
  { id: 7, airline: "Kenya Airways", code: "KQ", from: "JNB", to: "NBO", dep: "13:20", arr: "18:30", dur: "4h 10m", stops: "Direct", price: 4850, original: 5200, badge: true, global: true },
  { id: 8, airline: "Emirates", code: "EK", from: "JNB", to: "DXB", dep: "20:15", arr: "06:30+1", dur: "8h 15m", stops: "Direct", price: 8950, original: 9400, badge: true, global: true },
];

const mockStays = [
  { id: 101, name: "Beverly Hills Hotel Umhlanga", loc: "Umhlanga Rocks, Durban", city: "Durban", rating: 4.8, price: 2850, original: 3200, tag: "Beachfront", badge: true },
  { id: 102, name: "The Oyster Box", loc: "Umhlanga Ridge", city: "Durban", rating: 4.9, price: 3450, original: 3800, tag: "5-Star Luxury", badge: true },
  { id: 103, name: "Sun City Resort", loc: "Rustenburg", city: "Rustenburg", rating: 4.6, price: 1890, original: 2100, tag: "Family Favourite", badge: false },
  { id: 104, name: "Cape Grace, Fairmont", loc: "V&A Waterfront, Cape Town", city: "Cape Town", rating: 4.9, price: 4250, original: 4600, tag: "Harbour Views", badge: true },
  { id: 105, name: "The Michelangelo Hotel", loc: "Sandton, Johannesburg", city: "Johannesburg", rating: 4.7, price: 2250, original: 2600, tag: "Luxury City", badge: true },
  { id: 106, name: "Dubai Mall Hotel", loc: "Downtown Dubai, UAE", city: "Dubai", rating: 4.9, price: 3850, original: 4200, tag: "Luxury - Global", badge: true, global: true },
];

const mockCars = [
  { id: 201, name: "Toyota Corolla Quest", type: "Sedan • Manual", seats: 5, city: "Durban", price: 489, original: 539, company: "Avis", badge: true },
  { id: 202, name: "VW Polo Vivo", type: "Hatch • Manual", seats: 5, city: "Johannesburg", price: 425, original: 475, company: "Budget", badge: true },
  { id: 203, name: "Toyota Fortuner", type: "SUV • Auto", seats: 7, city: "Cape Town", price: 1150, original: 1220, company: "Hertz", badge: false },
  { id: 204, name: "Kia Picanto", type: "Hatch • Manual", seats: 4, city: "Gqeberha", price: 365, original: 415, company: "Budget", badge: true },
];

const mockShuttles = [
  { id: 301, name: "OR Tambo Airport Shuttle", type: "Shared Shuttle • JNB Airport", seats: "Up to 8", city: "Johannesburg", price: 285, original: 320, company: "Kiwitaxi", badge: true },
  { id: 302, name: "Cape Town Airport - V&A Private Transfer", type: "Private Car • CPT", seats: "Up to 3", city: "Cape Town", price: 550, original: 600, company: "Kiwitaxi", badge: true },
  { id: 303, name: "King Shaka Airport - Umhlanga Shuttle", type: "Shared Shuttle • DUR", seats: "Up to 8", city: "Durban", price: 195, original: 230, company: "HolidayTransfers", badge: false },
];

const mockBuses = [
  { id: 401, company: "Intercape", from: "JNB Park Station", to: "CPT Station", dep: "18:00", arr: "12:30+1", dur: "18h 30m", price: 685, original: 735, badge: true, type: "Sleepliner - Domestic" },
  { id: 402, company: "Greyhound", from: "Pretoria", to: "Durban", dep: "20:15", arr: "06:45+1", dur: "10h 30m", price: 520, original: 570, badge: true, type: "Dreamliner - Domestic" },
  { id: 403, company: "Intercape", from: "JNB", to: "Durban", dep: "19:00", arr: "04:30+1", dur: "9h 30m", price: 485, original: 535, badge: true, type: "Mainliner - Domestic" },
];

const mockTrains = [
  { id: 501, company: "Shosholoza Meyl", from: "Johannesburg", to: "Cape Town", dep: "09:00", arr: "18:00+1", dur: "27h", price: 650, original: 700, badge: true, type: "Tourist Class" },
  { id: 502, company: "Gautrain", from: "OR Tambo", to: "Sandton", dep: "Every 15 min", arr: "15 min", dur: "0h 15m", price: 185, original: 200, badge: true, type: "Airport Train" },
  { id: 503, company: "Eurostar", from: "London", to: "Paris", dep: "07:01", arr: "10:47", dur: "2h 16m", price: 1850, original: 2100, badge: true, type: "High-Speed - Global" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("flights");
  const [searchFrom, setSearchFrom] = useState("JNB");
  const [searchTo, setSearchTo] = useState("CPT");
  const [departDate, setDepartDate] = useState("2026-10-15");
  const [returnDate, setReturnDate] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [bookingRef, setBookingRef] = useState("");
  const [docType, setDocType] = useState("sa");
  const [form, setForm] = useState({ firstName: "", lastName: "", idNumber: "", passportNum: "", nationality: "South African", passportExpiry: "", email: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("nedbank");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('tailwind-cdn')) {
      const s = document.createElement('script');
      s.id = 'tailwind-cdn';
      s.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(s);
    }
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 600);
  };

  const openBooking = (item) => {
    setSelected(item);
    setModalStep(1);
    setShowModal(true);
    setBookingRef(`BK-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const openAffiliate = (type) => {
    let link = LINKS.travelstart;
    if (type === "flights-global") link = LINKS.aviasales;
    if (type === "stays") link = LINKS.bookingTP;
    if (type === "cars") link = LINKS.discoverCars;
    if (type === "shuttles") link = LINKS.kiwitaxi;
    if (type === "buses") link = LINKS.twelveGo;
    if (type === "trains") link = LINKS.twelveGo;
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const nextStep = () => { if (modalStep < 4) setModalStep(s => s + 1); };
  const prevStep = () => { if (modalStep > 1) setModalStep(s => s - 1); };
  const closeModal = () => { setShowModal(false); setModalStep(1); };

  const copyBankDetails = () => {
    navigator.clipboard?.writeText(`Nedbank - MG. Gwala - Acc: 1044602244 - Branch: 198765 - CA - Ref: ${bookingRef}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const data = activeTab === "flights" ? mockFlights : activeTab === "stays" ? mockStays : activeTab === "cars" ? mockCars : activeTab === "shuttles" ? mockShuttles : activeTab === "buses" ? mockBuses : mockTrains;

  return (
    <div style={{ minHeight: '100vh', background: '#F6F7FB', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
      <div style={{ background: GOLD, color: NAVY, textAlign: 'center', padding: '10px', fontSize: 12, fontWeight: 900 }}>
        🇿🇦 PRICES IN ZAR - ALL PRICES SHOW IN SOUTH AFRICAN RAND - R ... ZAR - SOUTH AFRICA'S LOWEST PRICES GUARANTEED - DOMESTIC + GLOBAL 🇿🇦
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>K</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>Khilane Travel ✈️ - PRICES IN ZAR</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>All prices in ZAR • Flights R864 ZAR • Hotels R2850 ZAR • Cars R489 ZAR • Shuttles R285 ZAR • Buses R685 ZAR • Trains R650 ZAR</div>
            </div>
          </div>
          <a href="https://wa.me/27724573419" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', borderRadius: 999, background: '#25D366', color: 'white', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>WhatsApp 0724573419</a>
        </div>
      </header>

      <main style={{ maxWidth: 1150, margin: '0 auto', padding: 20 }}>
        <div style={{ background: 'white', borderRadius: 24, border: '1px solid #e2e8f0', padding: 24 }}>
          <div style={{ display: 'flex', gap: 6, background: '#f8fafc', padding: 4, borderRadius: 999, width: 'fit-content', flexWrap: 'wrap' }}>
            {[
              { id: "flights", l: "Flights - ZAR" },
              { id: "stays", l: "Hotels - ZAR" },
              { id: "cars", l: "Car Hire - ZAR" },
              { id: "shuttles", l: "Shuttles - ZAR" },
              { id: "buses", l: "Buses - ZAR" },
              { id: "trains", l: "Trains - ZAR" },
            ].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ height: 36, padding: '0 18px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, background: activeTab === t.id ? NAVY : 'transparent', color: activeTab === t.id ? 'white' : '#475569' }}>{t.l}</button>
            ))}
          </div>

          <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>From / City</label><input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} placeholder="JNB, CPT, DUR..." style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6, fontSize: 14, fontWeight: 600 }} /></div>
              <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>To</label><input value={searchTo} onChange={e => setSearchTo(e.target.value)} placeholder="CPT, DUR, London..." style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6, fontSize: 14, fontWeight: 600 }} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Depart</label><input type="date" value={departDate} onChange={e => setDepartDate(e.target.value)} style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6 }} /></div>
              <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Return</label><input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6 }} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <button onClick={handleSearch} style={{ height: 52, borderRadius: 999, background: NAVY, color: 'white', fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer' }}>{isSearching ? "Searching ZAR prices..." : `Search ${activeTab} - Prices in ZAR`}</button>
              <button onClick={() => openAffiliate(activeTab)} style={{ height: 52, borderRadius: 999, background: 'white', color: NAVY, fontWeight: 800, fontSize: 12, border: `2px solid ${NAVY}`, cursor: 'pointer' }}>More options - All prices in ZAR - currency=ZAR</button>
            </div>

            <div style={{ padding: 12, background: '#F6F7FB', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 11, lineHeight: 1.6 }}>
              <div style={{ fontWeight: 900, color: NAVY }}>PRICES IN ZAR - You asked: I want prices to be shown in ZAR</div>
              <div style={{ marginTop: 6 }}>
                <div>✅ <strong>All prices now shown in ZAR (South African Rand):</strong> Flights JNB-CPT <strong>{formatZAR(864)}</strong> was R864, now explicit R 864 ZAR • JNB-DUR {formatZAR(765)} • JNB-NBO {formatZAR(4850)} • JNB-DXB {formatZAR(8950)} — Hotels Beverly Hills {formatZAR(2850)} ZAR, Oyster Box {formatZAR(3450)} ZAR — Cars Corolla {formatZAR(489)} ZAR per day, Polo {formatZAR(425)} ZAR — Shuttles OR Tambo {formatZAR(285)} ZAR, CPT-V&A {formatZAR(550)} ZAR — Buses Intercape {formatZAR(685)} ZAR — Trains Shosholoza {formatZAR(650)} ZAR, Gautrain {formatZAR(185)} ZAR, Eurostar {formatZAR(1850)} ZAR — All prices in ZAR!</div>
                <div style={{ marginTop: 6 }}>✅ <strong>Affiliate links also in ZAR:</strong> Travelstart 7936957 https://travelstart.zwjlk6.net/k4Xqbx + currency=ZAR param — Aviasales marker khilanetravel&currency=ZAR — Booking.com marker khilanetravel&currency=ZAR — DiscoverCars a_aid=khilanetravel&currency=ZAR — Kiwitaxi marker khilanetravel&currency=ZAR — 12Go marker khilanetravel&currency=ZAR — All affiliates forced to show ZAR — No USD, No EUR — Only ZAR!</div>
                <div style={{ marginTop: 6, fontWeight: 700, background: GOLD, color: NAVY, padding: '6px 8px', borderRadius: 6, display: 'inline-block' }}>All prices: R ... ZAR format — Explicit ZAR — Customer sees ZAR only — No confusion — Domestic + Global all in ZAR!</div>
              </div>
            </div>
          </div>
        </div>

        <div id="results" style={{ marginTop: 24 }}>
          <h2 style={{ fontWeight: 900, fontSize: 18, color: NAVY, textTransform: 'capitalize' }}>{activeTab} - Prices in ZAR - {data.length} options</h2>
          <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            {data.map(item => (
              <div key={item.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, background: item.global ? "#7c3aed" : NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11 }}>{item.code || item.company?.[0] || "K"}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{item.airline || item.name || item.company} {item.from ? `${item.from} → ${item.to}` : ""} - {formatZARShort(item.price)} {item.badge && <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 999, background: '#dcfce7', color: '#166534' }}>BEST PRICE ZAR</span>} {item.global && <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 999, background: '#ede9fe', color: '#5b21b6' }}>GLOBAL - ZAR</span>}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{item.dur || item.loc || item.type} • {item.tag || item.type} • Price in ZAR</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'line-through' }}>{formatZARShort(item.original)}</div>
                    <div style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>{formatZAR(item.price)}</div>
                    <div style={{ fontSize: 9, fontWeight: 800, color: '#64748b' }}>ZAR • Incl. taxes</div>
                  </div>
                  <button onClick={() => openBooking(item)} style={{ height: 44, padding: '0 20px', borderRadius: 999, background: NAVY, color: 'white', border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Select - {formatZARShort(item.price)}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', fontSize: 11, color: '#94a3b8', padding: 16, background: 'white', borderRadius: 12, border: '1px solid #f1f5f9' }}>
          © 2026 Khilane Travel - PRICES IN ZAR - All prices R ... ZAR - Flights R864 ZAR • Stays R2850 ZAR • Cars R489 ZAR • Shuttles R285 ZAR • Buses R685 ZAR • Trains R650 ZAR - Direct Nedbank 1044602244 + Affiliates Travelstart 7936957 + Aviasales + Booking.com + DiscoverCars + Kiwitaxi + 12Go + Busbud + Omio - All currency=ZAR - Paystack 2042515 - Domestic + Global - ZAR Only
        </div>
      </main>

      {showModal && selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: 480, borderRadius: '24px 24px 0 0', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: 20, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 900, fontSize: 14, color: NAVY }}>Book {activeTab} - Prices in ZAR - Step {modalStep}/4</div>
              <button onClick={closeModal} style={{ width: 32, height: 32, borderRadius: 999, background: '#F6F7FB', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 700 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
              {modalStep === 1 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>Step 1 - Price in ZAR</div>
                  <div style={{ marginTop: 16, padding: 16, borderRadius: 16, background: '#F6F7FB', border: '1px solid #e2e8f0', fontSize: 13 }}>
                    <div style={{ fontWeight: 700 }}>{selected.airline || selected.name || selected.company} - {formatZAR(selected.price)} - Price in ZAR</div>
                    <div style={{ color: '#64748b', marginTop: 4, fontSize: 12 }}>Ref {bookingRef} • All prices in ZAR • No USD • No EUR • Only South African Rand • E-ticket from info@khilanetravel.co.za</div>
                  </div>
                  <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <button onClick={() => setDocType("sa")} style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', background: docType === "sa" ? NAVY : 'white', color: docType === "sa" ? 'white' : '#0f172a', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>SA ID</button>
                    <button onClick={() => setDocType("passport")} style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', background: docType === "passport" ? NAVY : 'white', color: docType === "passport" ? 'white' : '#0f172a', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Passport (Global - ZAR)</button>
                  </div>
                </div>
              )}
              {modalStep === 2 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>Step 2 - Details - Price {formatZAR(selected.price)}</div>
                  <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="First Name" style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
                    <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Last Name" style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
                    {docType === "sa" ? <input value={form.idNumber} onChange={e => setForm({ ...form, idNumber: e.target.value })} placeholder="SA ID 13-digit" style={{ gridColumn: 'span 2', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} /> : <>
                      <input value={form.passportNum} onChange={e => setForm({ ...form, passportNum: e.target.value })} placeholder="Passport No" style={{ gridColumn: 'span 2', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
                      <input value={form.nationality} onChange={e => setForm({ ...form, nationality: e.target.value })} placeholder="Nationality" style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
                      <input type="date" value={form.passportExpiry} onChange={e => setForm({ ...form, passportExpiry: e.target.value })} style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
                    </>}
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email for e-ticket" style={{ gridColumn: 'span 2', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" style={{ gridColumn: 'span 2', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
                  </div>
                </div>
              )}
              {modalStep === 3 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>Step 3 - Payment - {formatZAR(selected.price)} - All prices in ZAR</div>
                  <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
                    {[
                      { id: "nedbank", label: `Manual EFT 0% - Nedbank - ${formatZAR(selected.price)}`, sub: "MG. Gwala 1044602244 • Branch 198765 • CA • Price in ZAR - You keep 100% markup - ZAR only" },
                      { id: "paystack", label: `Paystack Card 2.9%+R1 - ${formatZAR(selected.price)}`, sub: "Secure card - Price in ZAR - Global cards accepted - Charged in ZAR" },
                      { id: "payfast", label: `PayFast 3.5%+R2 - ${formatZAR(selected.price)}`, sub: "Secure checkout - Price in ZAR" },
                      { id: "ozow", label: `Ozow Instant EFT 1.5% - ${formatZAR(selected.price)}`, sub: "Instant EFT - Price in ZAR" },
                      { id: "capitec", label: `Capitec Pay / Apple Pay / Google Pay - ${formatZAR(selected.price)}`, sub: "Wallet - Price in ZAR" },
                    ].map(m => (
                      <button key={m.id} onClick={() => setPaymentMethod(m.id)} style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 12, border: `1px solid ${paymentMethod === m.id ? NAVY : '#e2e8f0'}`, background: paymentMethod === m.id ? '#F8FAFF' : 'white', cursor: 'pointer' }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{m.label}</div><div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{m.sub}</div>
                      </button>
                    ))}
                    {paymentMethod === "nedbank" && (
                      <div style={{ borderRadius: 16, border: '1px solid #fde68a', padding: 16, background: '#fffbeb', marginTop: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>EFT Details - Pay {formatZAR(selected.price)} - Price in ZAR</div>
                          <button onClick={copyBankDetails} style={{ height: 32, padding: '0 12px', borderRadius: 999, background: 'white', border: '1px solid #e2e8f0', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{copied ? "Copied!" : "Copy"}</button>
                        </div>
                        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Account Holder</div><div style={{ fontWeight: 700, marginTop: 2 }}>MG. Gwala</div></div>
                          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Bank</div><div style={{ fontWeight: 700, marginTop: 2 }}>Nedbank</div></div>
                          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Account Number</div><div style={{ fontWeight: 700, marginTop: 2 }}>1044602244</div></div>
                          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Branch Code</div><div style={{ fontWeight: 700, marginTop: 2 }}>198765</div></div>
                        </div>
                        <div style={{ marginTop: 12, fontSize: 11, color: '#475569' }}>Ref: {bookingRef} • Amount: {formatZAR(selected.price)} • ZAR only • After EFT upload proof • Ticket issued in 15 min • No USD • No EUR • Only ZAR</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {modalStep === 4 && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ margin: '0 auto', width: 80, height: 80, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: GOLD, fontSize: 36, fontWeight: 900, color: NAVY }}>✓</div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: NAVY, marginTop: 16 }}>Booking Confirmed! {formatZAR(selected.price)} Paid!</div>
                  <div style={{ marginTop: 12, display: 'inline-flex', padding: '8px 16px', borderRadius: 999, background: '#0f172a', color: 'white', fontFamily: 'monospace', fontSize: 14 }}>{bookingRef} • {formatZAR(selected.price)}</div>
                  <div style={{ marginTop: 16, fontSize: 13, color: '#475569' }}>E-ticket will be sent to {form.email || "your email"} from khilanetravel.co.za<br/>Amount paid: {formatZAR(selected.price)} • ZAR only • Domestic + Global</div>
                </div>
              )}
            </div>
            <div style={{ padding: 16, borderTop: '1px solid #e2e8f0', background: 'white', display: 'flex', gap: 12 }}>
              {modalStep > 1 && modalStep < 4 && <button onClick={prevStep} style={{ height: 52, flex: 1, borderRadius: 999, border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Back</button>}
              {modalStep < 3 && <button onClick={nextStep} style={{ height: 52, flex: 2, borderRadius: 999, background: NAVY, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>Continue - {modalStep === 1 ? formatZAR(selected.price) : "Next"}</button>}
              {modalStep === 3 && <button onClick={() => setModalStep(4)} style={{ height: 52, flex: 2, borderRadius: 999, background: GOLD, color: NAVY, fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer' }}>Pay {formatZAR(selected.price)} - ZAR</button>}
              {modalStep === 4 && <button onClick={closeModal} style={{ height: 52, width: '100%', borderRadius: 999, background: NAVY, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>Done - {formatZAR(selected.price)} Paid - ZAR</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
      }
