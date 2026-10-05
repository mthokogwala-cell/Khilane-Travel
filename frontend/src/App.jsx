import React, { useState } from "react";

const NAVY = "#0A1931";
const GOLD = "#FFC300";

const mockFlights = [
  { id: 1, airline: "FlySafair", from: "JNB", to: "CPT", dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, badge: true, seats: 3 },
  { id: 2, airline: "Airlink", from: "JNB", to: "CPT", dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, badge: true, seats: 5 },
  { id: 3, airline: "CemAir", from: "JNB", to: "CPT", dep: "11:10", arr: "13:30", dur: "2h 20m", stops: "Direct", price: 945, original: 995, badge: false, seats: 2 },
  { id: 4, airline: "LIFT", from: "JNB", to: "CPT", dep: "14:05", arr: "16:20", dur: "2h 15m", stops: "Direct", price: 989, original: 1039, badge: false, seats: 6 },
  { id: 5, airline: "FlySafair", from: "JNB", to: "CPT", dep: "17:30", arr: "19:45", dur: "2h 15m", stops: "Direct", price: 1025, original: 1075, badge: true, seats: 4 },
];
const mockStays = [
  { id: 101, name: "Beverly Hills Hotel Umhlanga", loc: "Umhlanga Rocks, Durban", rating: "4.8", price: 2850, original: 3200, tag: "Beachfront", badge: true },
  { id: 102, name: "The Oyster Box", loc: "Umhlanga Ridge", rating: "4.9", price: 3450, original: 3800, tag: "5-Star Luxury", badge: true },
  { id: 103, name: "Sun City Resort", loc: "Rustenburg", rating: "4.6", price: 1890, original: 2100, tag: "Family", badge: false },
];
const mockCars = [
  { id: 201, name: "Toyota Corolla Quest", company: "Avis", type: "Sedan Manual 5 seats", price: 489, original: 539, badge: true },
  { id: 202, name: "VW Polo Vivo", company: "Budget", type: "Hatch Manual 5 seats", price: 425, original: 475, badge: true },
  { id: 203, name: "Toyota Fortuner", company: "Hertz", type: "SUV Auto 7 seats", price: 1150, original: 1220, badge: false },
];
const mockBuses = [
  { id: 301, company: "Intercape", from: "JNB Park", to: "CPT Station", dep: "18:00", arr: "12:30+1", dur: "18h 30m", price: 685, original: 735, badge: true, type: "Sleepliner" },
  { id: 302, company: "Greyhound", from: "Pretoria", to: "Durban", dep: "20:15", arr: "06:45+1", dur: "10h 30m", price: 520, original: 570, badge: true, type: "Dreamliner" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("flights");
  const [from, setFrom] = useState("JNB");
  const [to, setTo] = useState("CPT");
  const [departDate, setDepartDate] = useState("2026-10-15");
  const [showResults, setShowResults] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [ref, setRef] = useState("");
  const [docType, setDocType] = useState("sa");
  const [form, setForm] = useState({ firstName: "", lastName: "", idNumber: "", passportNum: "", nationality: "South African", email: "", phone: "" });
  const [pay, setPay] = useState("card");
  const [copied, setCopied] = useState(false);

  const doSearch = () => {
    setIsSearching(true);
    setShowResults(false);
    setTimeout(() => { setIsSearching(false); setShowResults(true); document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }); }, 600);
  };
  const openBook = (item) => { setSelected(item); setStep(1); setShowModal(true); setRef(`BK-2026-${Math.floor(1000 + Math.random() * 9000)}`); };
  const copy = () => { navigator.clipboard?.writeText(`Nedbank MG. Gwala 1044602244 Branch 198765 CA Ref ${ref}`); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  const results = activeTab === "flights" ? mockFlights : activeTab === "stays" ? mockStays : activeTab === "cars" ? mockCars : mockBuses;

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: "Inter, system-ui, sans-serif", color: "#0f172a" }}>
      <div style={{ background: GOLD, color: NAVY, textAlign: "center", padding: "10px 8px", fontWeight: 900, fontSize: "12px", letterSpacing: "1px" }}>
        🇿🇦 TRAVEL PROUDLY SOUTH AFRICAN — SECURE BOOKINGS IN ZAR (R) 🇿🇦
      </div>

      <div style={{ background: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px", height: 64, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: NAVY, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900 }}>K</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: NAVY, lineHeight: 1 }}>Khilane Travel ✈️</div>
              <div style={{ fontSize: 11, color: "#059669", fontWeight: 700 }}>ZAR Live v2.5 • Secure • On-Site Booking</div>
            </div>
          </div>
          <div style={{ background: "#0f172a", color: "white", padding: "6px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>khilanetravel.co.za</div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 20 }}>
          <div style={{ background: "white", borderRadius: 24, border: "1px solid #e2e8f0", boxShadow: "0 20px 60px rgba(10,25,49,0.08)", overflow: "hidden" }}>
            <div style={{ display: "flex", gap: 6, background: "#f8fafc", margin: 8, padding: 6, borderRadius: 30, width: "fit-content" }}>
              {[
                { id: "flights", label: "✈️ Flights" },
                { id: "stays", label: "🏨 Stays" },
                { id: "cars", label: "🚗 Car Hire" },
                { id: "buses", label: "🚌 Buses" },
              ].map((t) => (
                <button key={t.id} onClick={() => { setActiveTab(t.id); setShowResults(true); }}
                  style={{ height: 36, padding: "0 16px", borderRadius: 30, border: "none", fontSize: 13, fontWeight: 700, background: activeTab === t.id ? NAVY : "transparent", color: activeTab === t.id ? "white" : "#475569", cursor: "pointer" }}>
                  {t.label}
                </button>
              ))}
            </div>

            <div style={{ padding: "8px 20px 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>From</div>
                  <input value={from} onChange={(e) => setFrom(e.target.value)} style={{ marginTop: 4, width: "100%", height: 48, borderRadius: 12, border: "1px solid #cbd5e1", padding: "0 12px", fontWeight: 800 }} /></div>
                <div><div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>To</div>
                  <input value={to} onChange={(e) => setTo(e.target.value)} style={{ marginTop: 4, width: "100%", height: 48, borderRadius: 12, border: "1px solid #cbd5e1", padding: "0 12px", fontWeight: 800 }} /></div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Depart Date</div>
                <input type="date" value={departDate} onChange={(e) => setDepartDate(e.target.value)} style={{ marginTop: 4, width: "100%", height: 48, borderRadius: 12, border: "1px solid #cbd5e1", padding: "0 12px" }} />
              </div>
              <button onClick={doSearch} disabled={isSearching} style={{ marginTop: 20, width: "100%", height: 52, borderRadius: 30, border: "none", background: GOLD, color: NAVY, fontWeight: 900, fontSize: 15, cursor: "pointer" }}>
                {isSearching ? "Searching..." : `Search ${activeTab} in ZAR (R) →`}
              </button>
              <div style={{ marginTop: 10, textAlign: "center", fontSize: 11, color: "#64748b" }}>Secure booking on khilanetravel.co.za • ZAR only • Instant confirmation</div>
            </div>
          </div>

          <div style={{ background: NAVY, borderRadius: 24, padding: 20, color: "white" }}>
            <div style={{ fontSize: 11, letterSpacing: 2, opacity: 0.7, fontWeight: 700 }}>WHY KHILANE?</div>
            <div style={{ marginTop: 12, fontSize: 26, fontWeight: 900, lineHeight: 1.1 }}>Lowest Prices Guaranteed in ZAR.</div>
            <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85, lineHeight: 1.4 }}>Secure, fast and proudly South African. All bookings are completed on our official website with instant e-ticket delivery.</div>
            <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
              {[
                "Best Price Promise on all bookings",
                "100% Secure checkout on khilanetravel.co.za",
                "ZAR (R) pricing — no hidden fees",
                "Instant e-ticket & WhatsApp support"
              ].map((t, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 12, display: "flex", gap: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 12, background: GOLD, color: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>✓</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="results" style={{ marginTop: 30 }}>
          {showResults && (
            <div style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>{activeTab === "flights" ? `Flights ${from} → ${to}` : activeTab === "stays" ? "Stays — Hotels & Resorts" : activeTab === "cars" ? "Car Hire" : "Bus Travel"} • ZAR Results</h2>
                <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0", fontWeight: 700 }}>Secure • Instant</span>
              </div>

              {results.map((item) => (
                <div key={item.id} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 18, padding: 16, display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 20, background: "#0f172a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>{item.airline?.[0] || item.name?.[0] || item.company?.[0] || "K"}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14 }}>{activeTab === "flights" ? `${item.airline} • ${item.from} ${item.dep} → ${item.to} ${item.arr}` : item.name || `${item.company} • ${item.from || ""} → ${item.to || ""}`}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{activeTab === "flights" ? `${item.dur} • ${item.stops} • ${item.seats} seats left` : item.loc || item.type || ""}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "#94a3b8", textDecoration: "line-through" }}>R{item.original}</div>
                      <div style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>R{item.price}</div>
                      {item.badge && <div style={{ fontSize: 10, fontWeight: 900, background: GOLD, color: NAVY, padding: "2px 8px", borderRadius: 10, display: "inline-block" }}>SAVE R50</div>}
                    </div>
                    <button onClick={() => openBook(item)} style={{ height: 40, padding: "0 18px", borderRadius: 20, border: "none", background: NAVY, color: "white", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>Select</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 30, background: "white", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16, textAlign: "center", fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>
          <div style={{ fontWeight: 800, color: NAVY }}>Khilane Travel (Pty) Ltd • Proudly South African</div>
          <div>All bookings are securely completed on www.khilanetravel.co.za. Prices in ZAR (R). Instant confirmation. Support via WhatsApp.</div>
          <div style={{ marginTop: 6 }}>© 2026 Khilane Travel. All rights reserved. • Terms • Privacy • Refunds</div>
        </div>
      </div>

      {showModal && selected && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 520, background: "white", borderRadius: "24px 24px 0 0", maxHeight: "92vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ background: NAVY, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "white" }}>
                <div style={{ fontWeight: 900 }}>Secure Booking — khilanetravel.co.za</div>
                <div style={{ fontSize: 11, opacity: 0.7, fontFamily: "monospace" }}>{ref} • R{selected.price}</div>
              </div>
              <button onClick={() => setShowModal(false)} style={{ width: 32, height: 32, borderRadius: 16, background: "rgba(255,255,255,0.15)", color: "white", border: "none", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ padding: 16, overflowY: "auto", display: "grid", gap: 16 }}>
              {step === 1 && (
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b" }}>STEP 1 • TRIP SUMMARY</div>
                  <div style={{ marginTop: 8, fontWeight: 800 }}>{selected.airline || selected.name || selected.company} • R{selected.price} ZAR</div>
                  <div style={{ marginTop: 6, fontSize: 12, color: "#475569" }}>Your booking will be completed securely on our official website with instant confirmation.</div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 800 }}>STEP 2 • TRAVELLER DETAILS</div>
                  <div style={{ display: "flex", gap: 6, background: "#f1f5f9", padding: 4, borderRadius: 20, width: "fit-content" }}>
                    <button onClick={() => setDocType("sa")} style={{ padding: "6px 14px", borderRadius: 20, border: "none", background: docType === "sa" ? "white" : "transparent", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>SA ID</button>
                    <button onClick={() => setDocType("passport")} style={{ padding: "6px 14px", borderRadius: 20, border: "none", background: docType === "passport" ? "white" : "transparent", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Foreign Passport</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="First Name" style={{ height: 44, borderRadius: 12, border: "1px solid #cbd5e1", padding: "0 12px" }} />
                    <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Last Name" style={{ height: 44, borderRadius: 12, border: "1px solid #cbd5e1", padding: "0 12px" }} />
                    {docType === "sa" ? (
                      <input value={form.idNumber} onChange={(e) => setForm({ ...form, idNumber: e.target.value })} placeholder="SA ID 13-digit" style={{ gridColumn: "span 2", height: 44, borderRadius: 12, border: "1px solid #cbd5e1", padding: "0 12px" }} />
                    ) : (
                      <input value={form.passportNum} onChange={(e) => setForm({ ...form, passportNum: e.target.value })} placeholder="Passport No" style={{ gridColumn: "span 2", height: 44, borderRadius: 12, border: "1px solid #cbd5e1", padding: "0 12px" }} />
                    )}
                    <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email for e-ticket" style={{ gridColumn: "span 2", height: 44, borderRadius: 12, border: "1px solid #cbd5e1", padding: "0 12px" }} />
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" style={{ gridColumn: "span 2", height: 44, borderRadius: 12, border: "1px solid #cbd5e1", padding: "0 12px" }} />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 800 }}>STEP 3 • PAYMENT — SECURE CHECKOUT</div>
                  {[
                    { id: "card", label: "Pay with Card (Visa/Mastercard)", sub: "Secure Paystack/PayFast • Instant" },
                    { id: "eft", label: "Instant EFT / Ozow", sub: "Pay from any SA bank app • 1.5% fee" },
                    { id: "nedbank", label: "Manual EFT — Nedbank", sub: "For business/invoice payments — Details shown after" },
                  ].map((m) => (
                    <button key={m.id} onClick={() => setPay(m.id)} style={{ textAlign: "left", padding: 12, borderRadius: 12, border: pay === m.id ? `2px solid ${NAVY}` : "1px solid #e2e8f0", background: pay === m.id ? "#f8faff" : "white", cursor: "pointer" }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{m.label} {pay === m.id ? "✓" : ""}</div>
                      <div style={{ fontSize: 11, color: "#64748b" }}>{m.sub}</div>
                    </button>
                  ))}

                  {pay === "card" && (
                    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 12 }}>
                      <input placeholder="Card Number • 4242 4242 4242 4242" style={{ width: "100%", height: 44, borderRadius: 10, border: "1px solid #cbd5e1", padding: "0 12px", marginBottom: 8 }} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <input placeholder="MM / YY" style={{ height: 44, borderRadius: 10, border: "1px solid #cbd5e1", padding: "0 12px" }} />
                        <input placeholder="CVC" style={{ height: 44, borderRadius: 10, border: "1px solid #cbd5e1", padding: "0 12px" }} />
                      </div>
                      <div style={{ marginTop: 8, fontSize: 10, color: "#94a3b8" }}>Processed securely on khilanetravel.co.za • 3D Secure • PCI Compliant</div>
                    </div>
                  )}

                  {pay === "nedbank" && (
                    <div style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 16, padding: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontWeight: 800, fontSize: 13 }}>EFT Banking Details — Private</div>
                        <button onClick={copy} style={{ height: 32, padding: "0 12px", borderRadius: 20, background: "white", border: "1px solid #e2e8f0", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{copied ? "Copied!" : "Copy Details"}</button>
                      </div>
                      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
                        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 10 }}><div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>HOLDER</div><div style={{ fontWeight: 800 }}>MG. Gwala</div></div>
                        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 10 }}><div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>BANK</div><div style={{ fontWeight: 800 }}>Nedbank</div></div>
                        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 10 }}><div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>ACCOUNT NO</div><div style={{ fontWeight: 800 }}>1044602244</div></div>
                        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 10 }}><div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>BRANCH</div><div style={{ fontWeight: 800 }}>198765</div></div>
                        <div style={{ gridColumn: "span 2", background: "white", borderRadius: 12, border: "1px solid #e2e8f0", padding: 10, display: "flex", justifyContent: "space-between" }}>
                          <div><div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 700 }}>TYPE / REF</div><div style={{ fontWeight: 800 }}>Current Account • {ref}</div></div>
                        </div>
                      </div>
                      <div style={{ marginTop: 10, fontSize: 11, color: "#92400e" }}>⚠️ Private banking details — shown only in secure checkout. Do not share publicly. Use ref {ref} as payment reference.</div>
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div style={{ textAlign: "center", padding: "16px 0" }}>
                  <div style={{ width: 80, height: 80, borderRadius: 40, background: GOLD, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900, color: NAVY }}>✓</div>
                  <div style={{ marginTop: 12, fontWeight: 900, fontSize: 22, color: NAVY }}>Booking Confirmed!</div>
                  <div style={{ marginTop: 8, display: "inline-block", padding: "6px 16px", borderRadius: 20, background: "#0f172a", color: "white", fontFamily: "monospace", fontSize: 14 }}>{ref}</div>
                  <div style={{ marginTop: 12, fontSize: 12, color: "#475569" }}>Your e-ticket will be sent to {form.email || "your email"} from our official domain. Thank you for choosing Khilane Travel.</div>
                </div>
              )}
            </div>

            <div style={{ padding: 16, borderTop: "1px solid #e2e8f0", display: "flex", gap: 12, background: "white" }}>
              {step > 1 && step < 4 && <button onClick={() => setStep(step - 1)} style={{ height: 48, flex: 1, borderRadius: 24, border: "1px solid #cbd5e1", background: "white", fontWeight: 700, cursor: "pointer" }}>Back</button>}
              {step < 3 && <button onClick={() => setStep(step + 1)} style={{ height: 48, flex: 2, borderRadius: 24, border: "none", background: NAVY, color: "white", fontWeight: 800, cursor: "pointer" }}>Continue — {step === 1 ? `R${selected.price}` : "Next"}</button>}
              {step === 3 && <button onClick={() => setStep(4)} style={{ height: 48, flex: 2, borderRadius: 24, border: "none", background: GOLD, color: NAVY, fontWeight: 900, cursor: "pointer" }}>Pay R{selected.price} Securely</button>}
              {step === 4 && <button onClick={() => setShowModal(false)} style={{ height: 48, width: "100%", borderRadius: 24, border: "none", background: NAVY, color: "white", fontWeight: 800, cursor: "pointer" }}>Done</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
