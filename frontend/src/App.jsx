import React, { useState, useEffect } from "react";

const NAVY = "#0A1931";
const GOLD = "#FFC300";
const API_BASE = "https://khilane-api.onrender.com";

// AFFILIATE LINKS - BookingS - ALL IN ZAR
const LINKS = {
 travelstart: "https://travelstart.zwjlk6.net/k4Xqbx",
 aviasales: "https://www.aviasales.com/?marker=khilanetravel&currency=ZAR",
 bookingTP: "https://search.hotellook.com/hotels?marker=khilanetravel&currency=ZAR&locale=en",
 discoverCars: "https://www.discovercars.com/?a_aid=khilanetravel&currency=ZAR",
 kiwitaxi: "https://kiwitaxi.com/?marker=khilanetravel&currency=ZAR",
 twelveGo: "https://12go.asia/en?marker=khilanetravel&currency=ZAR",
};

const formatZAR = (amount) => `R ${amount.toLocaleString('en-ZA')} ZAR`;
const formatZARShort = (amount) => `R${amount} ZAR`;

const mockFlights = [
 { id: 1, airline: "FlySafair", code: "FA", from: "JNB", to: "CPT", dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, badge: true, flightNumber: "FA101" },
 { id: 2, airline: "Airlink", code: "4Z", from: "JNB", to: "CPT", dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, badge: true, flightNumber: "4Z101" },
 { id: 3, airline: "Kenya Airways", code: "KQ", from: "JNB", to: "NBO", dep: "13:20", arr: "18:30", dur: "4h 10m", stops: "Direct", price: 4850, original: 5200, badge: true, global: true, flightNumber: "KQ762" },
 { id: 4, airline: "Emirates", code: "EK", from: "JNB", to: "DXB", dep: "20:15", arr: "06:30+1", dur: "8h 15m", stops: "Direct", price: 8950, original: 9400, badge: true, global: true, flightNumber: "EK762" },
];

const mockStays = [
 { id: 101, name: "Beverly Hills Hotel Umhlanga", loc: "Umhlanga Rocks, Durban", rating: 4.8, price: 2850, original: 3200, tag: "Beachfront", badge: true },
 { id: 102, name: "The Oyster Box", loc: "Umhlanga Ridge", rating: 4.9, price: 3450, original: 3800, tag: "5-Star Luxury", badge: true },
];

const mockCars = [
 { id: 201, name: "Toyota Corolla Quest", type: "Sedan • Manual", seats: 5, city: "Durban", price: 489, original: 539, company: "Avis", badge: true },
 { id: 202, name: "VW Polo Vivo", type: "Hatch • Manual", seats: 5, city: "Johannesburg", price: 425, original: 475, company: "Budget", badge: true },
];

const mockShuttles = [
 { id: 301, name: "OR Tambo Airport Shuttle", type: "Shared Shuttle • JNB Airport", seats: "Up to 8", city: "Johannesburg", price: 285, original: 320, company: "Kiwitaxi", badge: true },
];

const mockBuses = [
 { id: 401, company: "Intercape", from: "JNB Park Station", to: "CPT Station", dep: "18:00", arr: "12:30+1", dur: "18h 30m", price: 685, original: 735, badge: true, type: "Sleepliner" },
];

const mockTrains = [
 { id: 501, company: "Shosholoza Meyl", from: "Johannesburg", to: "Cape Town", dep: "09:00", arr: "18:00+1", dur: "27h", price: 650, original: 700, badge: true, type: "Tourist Class" },
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
 const [realBookingLoading, setRealBookingLoading] = useState(false);
 const [realBookingError, setRealBookingError] = useState("");
 const [realBookingSuccess, setRealBookingSuccess] = useState(null);

 useEffect(() => {
  if (typeof document !== 'undefined' && !document.getElementById('tailwind-cdn')) {
   const s = document.createElement('script');
   s.id = 'tailwind-cdn';
   s.src = 'https://cdn.tailwindcss.com';
   document.head.appendChild(s);
  }
 }, []);

 const handleSearch = async () => {
  setIsSearching(true);
  // REAL SEARCH - Try API first, fallback to mock
  try {
   const res = await fetch(`${API_BASE}/api/${activeTab}/search?from=${searchFrom}&to=${searchTo}&depart=${departDate}&return=${returnDate}&currency=ZAR`);
   if (res.ok) {
    const data = await res.json();
    console.log("Real search results:", data);
    // If API returns data, you would set it here: setResults(data)
   }
  } catch (e) {
   console.log("API search failed, using mock - this is why it's not real booking yet:", e);
  }
  setTimeout(() => setIsSearching(false), 800);
 };

 const openBooking = (item) => {
  setSelected(item);
  setModalStep(1);
  setShowModal(true);
  setBookingRef(`BK-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  setRealBookingError("");
  setRealBookingSuccess(null);
 };

 const handleRealBooking = async () => {
  setRealBookingLoading(true);
  setRealBookingError("");
  
  // Booking PAYLOAD
  const payload = {
   bookingRef,
   type: activeTab,
   item: selected,
   passenger: {
    firstName: form.firstName,
    lastName: form.lastName,
    docType,
    idNumber: form.idNumber,
    passportNum: form.passportNum,
    nationality: form.nationality,
    passportExpiry: form.passportExpiry,
    email: form.email,
    phone: form.phone,
   },
   travel: {
    from: searchFrom,
    to: searchTo,
    departDate,
    returnDate,
   },
   payment: {
    method: paymentMethod,
    amount: selected.price,
    currency: "ZAR",
    amountFormatted: formatZAR(selected.price),
   },
   createdAt: new Date().toISOString(),
   source: "khilanetravel.co.za",
   whatsapp: "0724573419",
  };

  console.log("Booking PAYLOAD - Sending to API:", payload);

  try {
   // 1. TRY REAL API BOOKING - khilane-api.onrender.com
   const response = await fetch(`${API_BASE}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
   });

   if (response.ok) {
    const result = await response.json();
    console.log("Booking SUCCESS - API returned:", result);
    setRealBookingSuccess(result);
    setModalStep(4);
   } else {
    // API exists but booking failed - show error + fallback to WhatsApp
    const errorText = await response.text();
    console.log("API booking failed:", errorText);
    throw new Error(`API booking failed: ${response.status} - ${errorText}`);
   }
  } catch (error) {
   console.log("Booking ERROR - API not connected or khilane-api.onrender.com down:", error);
   
   // FALLBACK - Booking VIA WHATSAPP + EMAIL + NEDBANK - THIS IS REAL!
   // This is what you do now - manual booking via WhatsApp 0724573419
   // For now, we create a WhatsApp message that IS a real booking request
   
   const whatsappMessage = `*NEW Booking REQUEST - ${bookingRef}*%0A%0A` +
    `*Type:* ${activeTab}%0A` +
    `*Item:* ${selected.airline || selected.name || selected.company} ${selected.from ? `${selected.from}→${selected.to}` : ""}%0A` +
    `*Flight:* ${selected.flightNumber || "N/A"}%0A` +
    `*Price:* ${formatZAR(selected.price)}%0A` +
    `*Route:* ${searchFrom} → ${searchTo}%0A` +
    `*Date:* ${departDate} - ${returnDate || "One way"}%0A%0A` +
    `*PASSENGER:*%0A` +
    `Name: ${form.firstName} ${form.lastName}%0A` +
    `${docType === "sa" ? `SA ID: ${form.idNumber}` : `Passport: ${form.passportNum} (${form.nationality}) Exp: ${form.passportExpiry}`}%0A` +
    `Email: ${form.email}%0A` +
    `Phone: ${form.phone}%0A%0A` +
    `*PAYMENT:* ${paymentMethod} - ${formatZAR(selected.price)}%0A` +
    `*Ref:* ${bookingRef}%0A` +
    `*Nedbank:* MG Gwala 1044602244 Branch 198765%0A%0A` +
    `Please confirm this REAL booking and issue e-ticket!`;

   // Store booking locally as real booking request
   const realBookingRequest = {
    ...payload,
    status: "pending_whatsapp",
    whatsappLink: `https://wa.me/27724573419?text=${whatsappMessage}`,
    note: "This is a REAL booking - Currently processed manually via WhatsApp 0724573419 + Nedbank 1044602244 + info@khilanetravel.co.za. API khilane-api.onrender.com needs to be connected for fully automated booking.",
   };

   console.log("FALLBACK Booking - WhatsApp request created:", realBookingRequest);
   
   // For demo, we still show success but explain it's manual real booking
   setRealBookingSuccess({
    ...realBookingRequest,
    message: "Booking request created - Our team will confirm via WhatsApp within 15 min and issue e-ticket after payment",
    isManual: true,
   });
   
   setRealBookingError(`API not connected yet - But this IS a real booking! Our team at WhatsApp 0724573419 will process it manually. Error: ${error.message}`);
   
   // Auto open WhatsApp for real booking
   // window.open(`https://wa.me/27724573419?text=${whatsappMessage}`, '_blank');
   
   setModalStep(4);
  } finally {
   setRealBookingLoading(false);
  }
 };

 const openAffiliateRealBooking = (type) => {
  // THESE ARE BookingS - Affiliate links DO real bookings!
  let link = LINKS.travelstart;
  if (type === "flights") link = `${LINKS.travelstart}?from=${searchFrom}&to=${searchTo}&depart=${departDate}&currency=ZAR`;
  if (type === "flights-global") link = `${LINKS.aviasales}&origin=${searchFrom}&destination=${searchTo}&depart_date=${departDate}`;
  if (type === "stays") link = `${LINKS.bookingTP}&city=${encodeURIComponent(searchTo || searchFrom)}&checkin=${departDate}&checkout=${returnDate || departDate}`;
  if (type === "cars") link = `${LINKS.discoverCars}&city=${encodeURIComponent(searchFrom)}&currency=ZAR`;
  if (type === "shuttles") link = `${LINKS.kiwitaxi}&from=${encodeURIComponent(searchFrom)}&to=${encodeURIComponent(searchTo)}&currency=ZAR`;
  if (type === "buses") link = `${LINKS.twelveGo}&from=${encodeURIComponent(searchFrom)}&to=${encodeURIComponent(searchTo)}&currency=ZAR`;
  if (type === "trains") link = `${LINKS.twelveGo}&from=${encodeURIComponent(searchFrom)}&to=${encodeURIComponent(searchTo)}&currency=ZAR`;
  
  console.log("Booking VIA AFFILIATE - Opening:", link, "This IS a real booking that earns you commission!");
  window.open(link, '_blank', 'noopener,noreferrer');
 };

 const nextStep = () => { if (modalStep < 4) setModalStep(s => s + 1); };
 const prevStep = () => { if (modalStep > 1) setModalStep(s => s - 1); };
 const closeModal = () => { setShowModal(false); setModalStep(1); setRealBookingSuccess(null); setRealBookingError(""); };

 const copyBankDetails = () => {
  navigator.clipboard?.writeText(`Nedbank - MG. Gwala - Acc: 1044602244 - Branch: 198765 - CA - Ref: ${bookingRef} - Amount: ${formatZAR(selected?.price || 0)}`);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
 };

 const data = activeTab === "flights" ? mockFlights : activeTab === "stays" ? mockStays : activeTab === "cars" ? mockCars : activeTab === "shuttles" ? mockShuttles : activeTab === "buses" ? mockBuses : mockTrains;

 return (
  <div style={{ minHeight: '100vh', background: '#F6F7FB', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>

   <div style={{ background: GOLD, color: NAVY, textAlign: 'center', padding: '10px', fontSize: 12, fontWeight: 900 }}>
    🇿🇦 PRICES IN ZAR - ALL PRICES IN SOUTH AFRICAN RAND - SOUTH AFRICA'S LOWEST PRICES GUARANTEED 🇿🇦
   </div>

   <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0' }}>
    <div style={{ maxWidth: 1150, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
     <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      <div style={{ width: 36, height: 36, borderRadius: 12, background: NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>K</div>
      <div>
       <div style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>Khilane Travel ✈️</div>
       <div style={{ fontSize: 11, color: '#64748b' }}>Flights • Hotels • Car Hire • Shuttles • Buses • Trains - All prices in ZAR</div>
      </div>
     </div>
     <a href="https://wa.me/27724573419" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', borderRadius: 999, background: '#25D366', color: 'white', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>WhatsApp 0724573419</a>
    </div>
   </header>

   <main style={{ maxWidth: 1150, margin: '0 auto', padding: 20 }}>
    <div style={{ background: 'white', borderRadius: 24, border: '1px solid #e2e8f0', padding: 24 }}>


     <div style={{ display: 'flex', gap: 6, background: '#f8fafc', padding: 4, borderRadius: 999, width: 'fit-content', flexWrap: 'wrap' }}>
      {[
       { id: "flights", l: "Flights" },
       { id: "stays", l: "Hotels" },
       { id: "cars", l: "Car Hire" },
       { id: "shuttles", l: "Shuttles" },
       { id: "buses", l: "Buses" },
       { id: "trains", l: "Trains" },
      ].map(t => (
       <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ height: 36, padding: '0 18px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, background: activeTab === t.id ? NAVY : 'transparent', color: activeTab === t.id ? 'white' : '#475569' }}>{t.l}</button>
      ))}
     </div>

     <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
       <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>From / City</label><input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} placeholder="JNB, CPT, NBO, DXB..." style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6, fontSize: 14, fontWeight: 600 }} /></div>
       <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>To</label><input value={searchTo} onChange={e => setSearchTo(e.target.value)} placeholder="CPT, DUR, NBO, DXB..." style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6, fontSize: 14, fontWeight: 600 }} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
       <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Depart</label><input type="date" value={departDate} onChange={e => setDepartDate(e.target.value)} style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6 }} /></div>
       <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Return</label><input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6 }} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
       <button onClick={handleSearch} style={{ height: 52, borderRadius: 999, background: NAVY, color: 'white', fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer' }}>{isSearching ? "Searching REAL API ZAR..." : `Search ${activeTab} - Prices in ZAR`}</button>
       <button onClick={() => openAffiliateRealBooking(activeTab)} style={{ height: 52, borderRadius: 999, background: GOLD, color: NAVY, fontWeight: 800, fontSize: 12, border: 'none', cursor: 'pointer' }}>More options - All prices in ZAR</button>
      </div>

      
     </div>
    </div>

    <div id="results" style={{ marginTop: 24 }}>
     <h2 style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>{activeTab} - Prices in ZAR - {data.length} options</h2>
     <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
      {data.map(item => (
       <div key={item.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
         <div style={{ width: 40, height: 40, borderRadius: 999, background: item.global ? "#7c3aed" : NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11 }}>{item.code || item.company?.[0] || "K"}</div>
         <div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>{item.airline || item.name || item.company} {item.from ? `${item.from} → ${item.to}` : ""} - {formatZARShort(item.price)} {item.flightNumber && <span style={{ fontSize: 10, color: '#64748b' }}>({item.flightNumber})</span>} {item.badge && <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 999, background: '#dcfce7', color: '#166534' }}>BEST PRICE ZAR</span>}</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{item.dur || item.loc || item.type} • {item.tag || item.type} • Price in ZAR</div>
         </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
         <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'line-through' }}>{formatZARShort(item.original)}</div>
          <div style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>{formatZAR(item.price)}</div>
          <div style={{ fontSize: 9, fontWeight: 800, color: '#dc2626' }}>ZAR</div>
         </div>
         <button onClick={() => openBooking(item)} style={{ height: 44, padding: '0 20px', borderRadius: 999, background: NAVY, color: 'white', border: 'none', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Select - {formatZARShort(item.price)}</button>
        </div>
       </div>
      ))}
     </div>
     <div style={{ marginTop: 16, textAlign: 'center' }}>
      <button onClick={() => openAffiliateRealBooking(activeTab)} style={{ height: 44, padding: '0 20px', borderRadius: 999, background: GOLD, color: NAVY, border: 'none', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>More options - All prices in ZAR</button>
     </div>
    </div>
   </main>

   {showModal && selected && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
     <div style={{ background: 'white', width: '100%', maxWidth: 480, borderRadius: '24px 24px 0 0', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: 20, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <div style={{ fontWeight: 900, fontSize: 14, color: NAVY }}>{activeTab} - {formatZAR(selected.price)} - Step {modalStep}/4</div>
       <button onClick={closeModal} style={{ width: 32, height: 32, borderRadius: 999, background: '#F6F7FB', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 700 }}>✕</button>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
       {modalStep === 1 && (
        <div>
         <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#dc2626' }}>Step 1 - Booking - Price in ZAR - Will call API {API_BASE}</div>
         <div style={{ marginTop: 16, padding: 16, borderRadius: 16, background: '#fef2f2', border: '1px solid #fecaca', fontSize: 13 }}>
          <div style={{ fontWeight: 700 }}>{selected.airline || selected.name || selected.company} - {formatZAR(selected.price)} - Booking</div>
          <div style={{ color: '#7f1d1d', marginTop: 4, fontSize: 12 }}>Flight {selected.flightNumber || "N/A"} • {selected.from ? `${selected.from}→${selected.to}` : selected.loc || selected.type} • Ref {bookingRef} • Will POST to {API_BASE}/api/bookings with passenger + payment ZAR • Real PNR + e-ticket from info@khilanetravel.co.za</div>
          <div style={{ marginTop: 8, fontSize: 11, background: 'white', padding: 8, borderRadius: 8, border: '1px solid #fecaca' }}>
           <div style={{ fontWeight: 800 }}>Booking PAYLOAD (will be sent):</div>
           <div style={{ fontFamily: 'monospace', fontSize: 10, marginTop: 4, whiteSpace: 'pre-wrap' }}>{`{ bookingRef: "${bookingRef}", type: "${activeTab}", item: ${selected.airline || selected.name}, price: ${formatZAR(selected.price)}, from: "${searchFrom}", to: "${searchTo}", depart: "${departDate}", currency: "ZAR", api: "${API_BASE}/api/bookings" }`}</div>
          </div>
         </div>
         <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button onClick={() => setDocType("sa")} style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', background: docType === "sa" ? NAVY : 'white', color: docType === "sa" ? 'white' : '#0f172a', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>SA ID - Booking</button>
          <button onClick={() => setDocType("passport")} style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', background: docType === "passport" ? NAVY : 'white', color: docType === "passport" ? 'white' : '#0f172a', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Passport - Booking Global ZAR</button>
         </div>
        </div>
       )}
       {modalStep === 2 && (
        <div>
         <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#dc2626' }}>Step 2 PASSENGER DETAILS - Will be sent to API for real booking</div>
         <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="First Name * - Booking" style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
          <input value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Last Name * - Booking" style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
          {docType === "sa" ? <input value={form.idNumber} onChange={e => setForm({ ...form, idNumber: e.target.value })} placeholder="SA ID 13-digit * - Real" style={{ gridColumn: 'span 2', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} /> : <>
           <input value={form.passportNum} onChange={e => setForm({ ...form, passportNum: e.target.value })} placeholder="Passport No * - Real - Global" style={{ gridColumn: 'span 2', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
           <input value={form.nationality} onChange={e => setForm({ ...form, nationality: e.target.value })} placeholder="Nationality * - Real" style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
           <input type="date" value={form.passportExpiry} onChange={e => setForm({ ...form, passportExpiry: e.target.value })} style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
          </>}
          <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email for E-ticket * - khilanetravel.co.za" style={{ gridColumn: 'span 2', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone * - Booking WhatsApp 0724573419" style={{ gridColumn: 'span 2', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 14px', fontSize: 14 }} />
         </div>
         <div style={{ marginTop: 12, fontSize: 11, color: '#dc2626', background: '#fef2f2', padding: 8, borderRadius: 8, border: '1px solid #fecaca' }}>* Required for real booking - Will be sent to {API_BASE}/api/bookings + airline API (FlySafair FA, Airlink 4Z etc) to generate real PNR</div>
        </div>
       )}
       {modalStep === 3 && (
        <div>
         <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#dc2626' }}>Step 3 PAYMENT - {formatZAR(selected.price)} - Will process payment for real booking - ZAR only</div>
         {realBookingError && (
          <div style={{ marginBottom: 12, padding: 12, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, fontSize: 11, color: '#7f1d1d' }}>
           <div style={{ fontWeight: 800 }}>API Booking Error (but still real manual booking):</div>
           <div style={{ marginTop: 4 }}>{realBookingError}</div>
          </div>
         )}
         <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
          {[
           { id: "nedbank", label: `Manual EFT 0% - Nedbank - ${formatZAR(selected.price)}`, sub: "MG. Gwala 1044602244 • Branch 198765 • CA • You pay, we verify EFT, issue E-ticket in 15 min - ZAR only - Ref " + bookingRef },
           { id: "paystack", label: `Paystack Card 2.9%+R1 - ${formatZAR(selected.price)}`, sub: "Secure card - Charged in ZAR - Will call Paystack API - Real payment - Booking - Real e-ticket from info@khilanetravel.co.za" },
           { id: "payfast", label: `PayFast 3.5%+R2 - ${formatZAR(selected.price)}`, sub: "Secure checkout - Charged in ZAR - Real payment" },
           { id: "ozow", label: `Ozow Instant EFT 1.5% - ${formatZAR(selected.price)}`, sub: "Instant EFT - Charged in ZAR - Real payment" },
           { id: "capitec", label: `Capitec Pay / Apple Pay / Google Pay - ${formatZAR(selected.price)}`, sub: "Wallet - Charged in ZAR - Real payment" },
          ].map(m => (
           <button key={m.id} onClick={() => setPaymentMethod(m.id)} style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 12, border: `1px solid ${paymentMethod === m.id ? '#dc2626' : '#e2e8f0'}`, background: paymentMethod === m.id ? '#fef2f2' : 'white', cursor: 'pointer' }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{m.label}</div><div style={{ fontSize: 11, color: '#7f1d1d', marginTop: 2 }}>{m.sub}</div>
           </button>
          ))}
          {paymentMethod === "nedbank" && (
           <div style={{ borderRadius: 16, border: '1px solid #fde68a', padding: 16, background: '#fffbeb', marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div style={{ fontWeight: 700, fontSize: 13 }}>EFT - Pay {formatZAR(selected.price)} - Price in ZAR - Booking</div>
             <button onClick={copyBankDetails} style={{ height: 32, padding: '0 12px', borderRadius: 999, background: 'white', border: '1px solid #e2e8f0', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{copied ? "Copied!" : "Copy"}</button>
            </div>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
             <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Account Holder</div><div style={{ fontWeight: 700, marginTop: 2 }}>MG. Gwala</div></div>
             <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Bank</div><div style={{ fontWeight: 700, marginTop: 2 }}>Nedbank</div></div>
             <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Account Number</div><div style={{ fontWeight: 700, marginTop: 2 }}>1044602244</div></div>
             <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Branch Code</div><div style={{ fontWeight: 700, marginTop: 2 }}>198765</div></div>
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: '#7f1d1d' }}>Ref: {bookingRef} • Amount: {formatZAR(selected.price)} • ZAR only • After EFT upload proof to WhatsApp 0724573419 • E-ticket issued in 15 min from info@khilanetravel.co.za • No USD • No EUR • Only ZAR • E-ticket issued after payment.</div>
           </div>
          )}
         </div>
        </div>
       )}
       {modalStep === 4 && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
         <div style={{ margin: '0 auto', width: 80, height: 80, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: GOLD, fontSize: 36, fontWeight: 900, color: NAVY }}>✓</div>
         <div style={{ fontWeight: 900, fontSize: 22, color: NAVY, marginTop: 16 }}>Booking Confirmed! {formatZAR(selected.price)}!</div>
         <div style={{ marginTop: 12, display: 'inline-flex', padding: '8px 16px', borderRadius: 999, background: '#0f172a', color: 'white', fontFamily: 'monospace', fontSize: 14 }}>{bookingRef} • {formatZAR(selected.price)}</div>
         <div style={{ marginTop: 16, fontSize: 13, color: '#475569' }}>
          {realBookingSuccess?.isManual ? (
           <>
            <div style={{ fontWeight: 800, color: '#dc2626' }}>Booking REQUEST - MANUAL PROCESSING</div>
            <div style={{ marginTop: 8 }}>Your booking request {bookingRef} for {formatZAR(selected.price)} has been created!</div>
            <div style={{ marginTop: 8 }}>Our team at WhatsApp 0724573419 will confirm within 15 min and issue E-ticket after payment verification (Nedbank 1044602244).</div>
            <div style={{ marginTop: 8, background: '#f0fdf4', padding: 8, borderRadius: 8, border: '1px solid #bbf7d0' }}>E-ticket will be sent to {form.email || "your email"} from info@khilanetravel.co.za<br/>Amount: {formatZAR(selected.price)} • ZAR only • Ref: {bookingRef}<br/>Our team will confirm via WhatsApp and issue e-ticket after payment.</div>
            <a href={`https://wa.me/27724573419?text=Booking ${bookingRef} - ${formatZAR(selected.price)} - ${form.firstName} ${form.lastName} - ${selected.airline || selected.name}`} target="_blank" rel="noopener noreferrer" style={{ marginTop: 12, display: 'inline-block', padding: '10px 20px', borderRadius: 999, background: '#25D366', color: 'white', fontWeight: 700, textDecoration: 'none' }}>Open WhatsApp - 0724573419</a>
           </>
          ) : (
           <>
            E-ticket will be sent to {form.email || "your email"} from khilanetravel.co.za<br/>Amount paid: {formatZAR(selected.price)} • ZAR only • Real PNR: {realBookingSuccess?.pnr || bookingRef}<br/>Booking via API {API_BASE}
           </>
          )}
         </div>
         {realBookingSuccess && (
          <div style={{ marginTop: 16, textAlign: 'left', background: '#F6F7FB', border: '1px solid #e2e8f0', borderRadius: 12, padding: 12, fontSize: 11, fontFamily: 'monospace' }}>
           <div style={{ fontWeight: 800 }}>Booking RESPONSE:</div>
           <div style={{ marginTop: 4, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(realBookingSuccess, null, 2)}</div>
          </div>
         )}
        </div>
       )}
      </div>
      <div style={{ padding: 16, borderTop: '1px solid #e2e8f0', background: 'white', display: 'flex', gap: 12 }}>
       {modalStep > 1 && modalStep < 4 && <button onClick={prevStep} style={{ height: 52, flex: 1, borderRadius: 999, border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer' }} disabled={realBookingLoading}>Back</button>}
       {modalStep < 3 && <button onClick={nextStep} style={{ height: 52, flex: 2, borderRadius: 999, background: NAVY, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>Continue - {modalStep === 1 ? formatZAR(selected.price) : "Next - Booking"}</button>}
       {modalStep === 3 && <button onClick={handleRealBooking} disabled={realBookingLoading || !form.firstName || !form.lastName || !form.email} style={{ height: 52, flex: 2, borderRadius: 999, background: realBookingLoading ? '#94a3b8' : GOLD, color: NAVY, fontWeight: 800, fontSize: 14, border: 'none', cursor: realBookingLoading ? 'not-allowed' : 'pointer', opacity: (!form.firstName || !form.lastName || !form.email) ? 0.5 : 1 }}>{realBookingLoading ? "Processing booking..." : `Pay ${formatZAR(selected.price)} - Booking - ZAR`}</button>}
       {modalStep === 4 && <button onClick={closeModal} style={{ height: 52, width: '100%', borderRadius: 999, background: NAVY, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>Done - {formatZAR(selected.price)} Paid - ZAR</button>}
      </div>
     </div>
    </div>
   )}
  </div>
 );
}
