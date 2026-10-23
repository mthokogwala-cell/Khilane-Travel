import React, { useState, useEffect } from "react";

const NAVY = "#0A1931";
const GOLD = "#FFC300";

const mockFlights = [
  { id: 1, airline: "FlySafair", code: "FA", from: "JNB", to: "CPT", dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, badge: true },
  { id: 2, airline: "Airlink", code: "4Z", from: "JNB", to: "CPT", dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, badge: true },
  { id: 3, airline: "CemAir", code: "5Z", from: "JNB", to: "CPT", dep: "11:10", arr: "13:30", dur: "2h 20m", stops: "Direct", price: 945, original: 995, badge: false },
  { id: 4, airline: "LIFT", code: "GE", from: "JNB", to: "CPT", dep: "14:05", arr: "16:20", dur: "2h 15m", stops: "Direct", price: 989, original: 1039, badge: false },
];

const mockStays = [
  { id: 101, name: "Beverly Hills Hotel Umhlanga", loc: "Umhlanga Rocks, Durban", city: "Durban", rating: 4.8, price: 2850, original: 3200, tag: "Beachfront", badge: true },
  { id: 102, name: "The Oyster Box", loc: "Umhlanga Ridge", city: "Durban", rating: 4.9, price: 3450, original: 3800, tag: "5-Star Luxury", badge: true },
  { id: 103, name: "Sun City Resort", loc: "Rustenburg", city: "Rustenburg", rating: 4.6, price: 1890, original: 2100, tag: "Family Favourite", badge: false },
  { id: 104, name: "Cape Grace, Fairmont Managed", loc: "V&A Waterfront, Cape Town", city: "Cape Town", rating: 4.9, price: 4250, original: 4600, tag: "Harbour Views", badge: true },
];

const mockCars = [
  { id: 201, name: "Toyota Corolla Quest", type: "Sedan • Manual", seats: 5, city: "Durban", price: 489, original: 539, company: "Avis", badge: true },
  { id: 202, name: "VW Polo Vivo", type: "Hatch • Manual", seats: 5, city: "Johannesburg", price: 425, original: 475, company: "Budget", badge: true },
  { id: 203, name: "Toyota Fortuner", type: "SUV • Auto", seats: 7, city: "Rustenburg", price: 1150, original: 1220, company: "Hertz", badge: false },
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

  const nextStep = () => { if (modalStep < 4) setModalStep(s => s + 1); };
  const prevStep = () => { if (modalStep > 1) setModalStep(s => s - 1); };
  const closeModal = () => { setShowModal(false); setModalStep(1); };

  const copyBankDetails = () => {
    navigator.clipboard?.writeText(`Nedbank - MG. Gwala - Acc: 1044602244 - Branch: 198765 - CA - Ref: ${bookingRef}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const data = activeTab === "flights" ? mockFlights : activeTab === "stays" ? mockStays : activeTab === "cars" ? mockCars : mockBuses;

  return (
    <div style={{ minHeight: '100vh', background: '#F6F7FB', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
      <div style={{ background: GOLD, color: NAVY, textAlign: 'center', padding: '10px', fontSize: 12, fontWeight: 800, letterSpacing: '0.5px' }}>
        🇿🇦 TRAVEL PROUDLY SOUTH AFRICAN — SOUTH AFRICA'S LOWEST PRICES GUARANTEED 🇿🇦
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>K</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>Khilane Travel ✈️</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: '#64748b' }}>Flights • Stays • Cars • Buses - SA's Lowest Prices</div>
            </div>
          </div>
          <div>
            <a href="https://wa.me/27724573419" target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', borderRadius: 999, background: '#25D366', color: 'white', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>WhatsApp 0724573419</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
        <div style={{ background: 'white', borderRadius: 24, border: '1px solid #e2e8f0', padding: 24 }}>
          <div style={{ display: 'flex', gap: 6, background: '#f8fafc', padding: 4, borderRadius: 999, width: 'fit-content' }}>
            {[
              { id: "flights", l: "Flights" },
              { id: "stays", l: "Stays" },
              { id: "cars", l: "Cars" },
              { id: "buses", l: "Buses" },
            ].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ height: 36, padding: '0 18px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: activeTab === t.id ? NAVY : 'transparent', color: activeTab === t.id ? 'white' : '#475569' }}>{t.l}</button>
            ))}
          </div>

          <div style={{ marginTop: 24, display: 'grid', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>From / City</label><input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} placeholder="JNB / Durban" style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6, fontSize: 14, fontWeight: 600 }} /></div>
              <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>To</label><input value={searchTo} onChange={e => setSearchTo(e.target.value)} placeholder="CPT / Cape Town" style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6, fontSize: 14, fontWeight: 600 }} /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Depart</label><input type="date" value={departDate} onChange={e => setDepartDate(e.target.value)} style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6, fontSize: 14 }} /></div>
              <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Return</label><input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} style={{ width: '100%', height: 48, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 16px', marginTop: 6, fontSize: 14 }} /></div>
            </div>
            <button onClick={handleSearch} style={{ height: 52, borderRadius: 999, background: NAVY, color: 'white', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer' }}>{isSearching ? "Searching..." : `Search ${activeTab}`}</button>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <h2 style={{ fontWeight: 900, fontSize: 20, color: NAVY, textTransform: 'capitalize' }}>{activeTab}</h2>
          <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            {data.map(item => (
              <div key={item.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 999, background: NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12 }}>{item.code || item.company?.[0] || "K"}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>{item.airline || item.name || item.company} {item.from ? `${item.from} → ${item.to}` : ""} <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>• {item.dur || item.loc || item.type}</span></div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{item.tag || item.type} {item.badge && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999, background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }}>BEST PRICE</span>}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, color: '#94a3b8', textDecoration: 'line-through' }}>R{item.original}</div>
                    <div style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>R{item.price}</div>
                  </div>
                  <button onClick={() => openBooking(item)} style={{ height: 44, padding: '0 20px', borderRadius: 999, background: NAVY, color: 'white', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Select</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', fontSize: 11, color: '#94a3b8', padding: 16, background: 'white', borderRadius: 12, border: '1px solid #f1f5f9' }}>
          © 2026 Khilane Travel - Proudly South African - SA's Lowest Prices Guaranteed - WhatsApp 0724573419 - info@khilanetravel.co.za - Nedbank 1044602244 Branch 198765 - Paystack 2042515
        </div>
      </main>

      {showModal && selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: 480, borderRadius: '24px 24px 0 0', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: 20, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 900, fontSize: 15, color: NAVY, textTransform: 'capitalize' }}>Book {activeTab} - Step {modalStep}/4</div>
              <button onClick={closeModal} style={{ width: 32, height: 32, borderRadius: 999, background: '#F6F7FB', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 700 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
              {modalStep === 1 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b' }}>Step 1 - Passenger</div>
                  <div style={{ marginTop: 16, padding: 16, borderRadius: 16, background: '#F6F7FB', border: '1px solid #e2e8f0', fontSize: 13 }}>
                    <div style={{ fontWeight: 700 }}>{selected.airline || selected.name || selected.company} - R{selected.price}</div>
                    <div style={{ color: '#64748b', marginTop: 4, fontSize: 12 }}>Booking Ref will be {bookingRef} - E-ticket sent from info@khilanetravel.co.za</div>
                  </div>
                  <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <button onClick={() => setDocType("sa")} style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', background: docType === "sa" ? NAVY : 'white', color: docType === "sa" ? 'white' : '#0f172a', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>SA ID</button>
                    <button onClick={() => setDocType("passport")} style={{ height: 48, borderRadius: 12, border: '1px solid #e2e8f0', background: docType === "passport" ? NAVY : 'white', color: docType === "passport" ? 'white' : '#0f172a', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Passport</button>
                  </div>
                </div>
              )}
              {modalStep === 2 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b' }}>Step 2 - Details</div>
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
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b' }}>Step 3 - Payment</div>
                  <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
                    {[
                      { id: "nedbank", label: "Manual EFT 0% - Nedbank", sub: "MG. Gwala 1044602244 • Branch 198765 • CA • Most trusted" },
                      { id: "paystack", label: "Paystack Card 2.9%+R1", sub: "Secure card payment" },
                      { id: "payfast", label: "PayFast 3.5%+R2", sub: "Secure checkout" },
                      { id: "ozow", label: "Ozow Instant EFT 1.5%", sub: "Instant EFT" },
                      { id: "capitec", label: "Capitec Pay / Apple Pay / Google Pay", sub: "Wallet payment" },
                    ].map(m => (
                      <button key={m.id} onClick={() => setPaymentMethod(m.id)} style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 12, border: `1px solid ${paymentMethod === m.id ? NAVY : '#e2e8f0'}`, background: paymentMethod === m.id ? '#F8FAFF' : 'white', cursor: 'pointer' }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{m.label}</div><div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{m.sub}</div>
                      </button>
                    ))}
                    {paymentMethod === "nedbank" && (
                      <div style={{ borderRadius: 16, border: '1px solid #fde68a', padding: 16, background: '#fffbeb', marginTop: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontWeight: 700, fontSize: 13 }}>EFT Details - Pay to:</div>
                          <button onClick={copyBankDetails} style={{ height: 32, padding: '0 12px', borderRadius: 999, background: 'white', border: '1px solid #e2e8f0', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>{copied ? "Copied!" : "Copy"}</button>
                        </div>
                        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Account Holder</div><div style={{ fontWeight: 700, marginTop: 2 }}>MG. Gwala</div></div>
                          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Bank</div><div style={{ fontWeight: 700, marginTop: 2 }}>Nedbank</div></div>
                          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Account Number</div><div style={{ fontWeight: 700, marginTop: 2 }}>1044602244</div></div>
                          <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 12 }}><div style={{ fontSize: 10, textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>Branch Code</div><div style={{ fontWeight: 700, marginTop: 2 }}>198765</div></div>
                        </div>
                        <div style={{ marginTop: 12, fontSize: 11, color: '#475569' }}>Ref: {bookingRef} - After EFT upload proof - ticket issued in 15 min on khilanetravel.co.za</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {modalStep === 4 && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ margin: '0 auto', width: 80, height: 80, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: GOLD, fontSize: 36, fontWeight: 900, color: NAVY }}>✓</div>
                  <div style={{ fontWeight: 900, fontSize: 22, color: NAVY, marginTop: 16 }}>Booking Confirmed!</div>
                  <div style={{ marginTop: 12, display: 'inline-flex', padding: '8px 16px', borderRadius: 999, background: '#0f172a', color: 'white', fontFamily: 'monospace', fontSize: 14 }}>{bookingRef}</div>
                  <div style={{ marginTop: 16, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>E-ticket will be sent to {form.email || "your email"} from khilanetravel.co.za<br/>Manage in My Trips on this site</div>
                </div>
              )}
            </div>
            <div style={{ padding: 16, borderTop: '1px solid #e2e8f0', background: 'white', display: 'flex', gap: 12 }}>
              {modalStep > 1 && modalStep < 4 && <button onClick={prevStep} style={{ height: 52, flex: 1, borderRadius: 999, border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Back</button>}
              {modalStep < 3 && <button onClick={nextStep} style={{ height: 52, flex: 2, borderRadius: 999, background: NAVY, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>Continue - {modalStep === 1 ? `R${selected.price}` : "Next"}</button>}
              {modalStep === 3 && <button onClick={() => setModalStep(4)} style={{ height: 52, flex: 2, borderRadius: 999, background: GOLD, color: NAVY, fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer' }}>Pay R{selected.price}</button>}
              {modalStep === 4 && <button onClick={closeModal} style={{ height: 52, width: '100%', borderRadius: 999, background: NAVY, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>Done</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
          }
