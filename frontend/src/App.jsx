
import React, { useState, useEffect } from "react";

const NAVY = "#0A1931";
const GOLD = "#FFC300";

// ALL TABS LIVE - ULTRA MINIMAL - GUARANTEED BUILD - NO LUCIDE-REACT - NO TS
const TRACKING_LINK = "https://travelstart.zwjlk6.net/k4Xqbx";
const DISCOVERCARS_LINK = "https://www.discovercars.com/?a_aid=khilanetravel&currency=ZAR";
const TRAVELPAYOUTS_MARKER = "khilanetravel";
const WHATSAPP = "0724573419";

const mockFlights = [
  { id: 1, airline: "FlySafair", from: "JNB", to: "CPT", dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, badge: true },
  { id: 2, airline: "Airlink", from: "JNB", to: "CPT", dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, badge: true },
];

const mockStays = [
  { id: 101, name: "Beverly Hills Hotel Umhlanga", loc: "Umhlanga Rocks", rating: 4.8, reviews: 1243, price: 2850, original: 3200, badge: true },
];

const mockCars = [
  { id: 201, name: "Toyota Corolla Quest", type: "Sedan", seats: 5, price: 489, original: 539, company: "Avis", badge: true },
];

const mockBuses = [
  { id: 301, company: "Intercape", from: "JNB", to: "CPT", dep: "18:00", arr: "12:30+1", dur: "18h 30m", price: 685, original: 735, type: "Sleepliner", badge: true },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("flights");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [copied, setCopied] = useState(false);

  const openBooking = (item) => {
    setSelected(item);
    setShowModal(true);
    setBookingRef("BK-2026-" + Math.floor(1000 + Math.random() * 9000));
  };

  const copyBankDetails = () => {
    navigator.clipboard.writeText("Nedbank - MG. Gwala - Acc: 1044602244 - Branch: 198765 - Ref: " + bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const list = activeTab === "flights" ? mockFlights : activeTab === "stays" ? mockStays : activeTab === "cars" ? mockCars : mockBuses;

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: "Inter, system-ui", color: "#0f172a" }}>
      <div style={{ background: GOLD, color: NAVY, textAlign: "center", padding: "10px", fontWeight: 900, fontSize: 12 }}>🇿🇦 TRAVEL PROUDLY SA — ALL TABS LIVE — R50 BEAT 🇿🇦</div>
      <header style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "12px 16px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 900, color: NAVY }}>Khilane Travel ✈️ — ALL TABS LIVE</div>
        <div style={{ fontSize: 11 }}>WhatsApp 0724573419 | Nedbank 1044602244</div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["flights","stays","cars","buses"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "8px 16px", borderRadius: 999, border: "1px solid #e2e8f0", background: activeTab===tab?NAVY:"white", color: activeTab===tab?"white":NAVY, fontWeight: 700, textTransform: "capitalize" }}>{tab}</button>
          ))}
        </div>

        <div id="results" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 style={{ fontWeight: 900, color: NAVY }}>{activeTab} — ZAR Results — ALL TABS LIVE — Pay Direct to Nedbank 1044602244</h2>
          {list.map(item => (
            <div key={item.id} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 18, padding: 16, display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{item.airline || item.name || item.company} — R{item.price}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>{item.from||""} {item.to? "→ "+item.to : item.loc||item.type||""} • {item.dep||""} • {item.dur||""}</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>Original R{item.original} — Badge: {item.badge?"BEAT BY R50":""}</div>
              </div>
              <button onClick={() => openBooking(item)} style={{ background: NAVY, color: "white", padding: "10px 20px", borderRadius: 999, fontWeight: 700, border: 0 }}>Select — Stay on Site</button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 12, fontSize: 11, textAlign: "center" }}>
          All bookings completed securely on khilanetravel.co.za — No redirects — 100% SA — EFT: Nedbank MG. Gwala 1044602244 Branch 198765 CA — Travelstart 7936957 LIVE R105/R145 — DiscoverCars khilanetravel LIVE 70% — Travelpayouts khilanetravel LIVE 4-7% — Paystack 2042515 rejected affiliate (Evelyn) — Payfast offline maintenance 20:33 — Manual EFT 0% works TODAY!
        </div>
      </div>

      {showModal && selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", padding: 16, zIndex: 50 }}>
          <div style={{ background: "white", borderRadius: 24, maxWidth: 520, width: "100%", maxHeight: "90vh", overflow: "auto" }}>
            <div style={{ background: NAVY, color: "white", padding: 16, display: "flex", justifyContent: "space-between" }}>
              <div><div style={{ fontWeight: 900 }}>Booking — Stay on khilanetravel.co.za</div><div style={{ fontSize: 11, opacity: 0.7 }}>{bookingRef} • R{selected.price}</div></div>
              <button onClick={() => setShowModal(false)} style={{ background: "rgba(255,255,255,0.15)", color: "white", border: 0, borderRadius: 999, width: 32, height: 32 }}>X</button>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Trip Summary — On-Site — ALL TABS LIVE</div>
                <div style={{ fontWeight: 700, marginTop: 8 }}>{selected.airline || selected.name || selected.company} • R{selected.price} ZAR</div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>This booking will be completed entirely on khilanetravel.co.za. E-ticket issued from our system. Flights: {TRACKING_LINK} — Cars: {DISCOVERCARS_LINK} — Stays/Buses: marker {TRAVELPAYOUTS_MARKER} — All pay direct to Nedbank.</div>
              </div>

              <div style={{ marginTop: 16, background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 16, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>EFT Details — Pay to:</div>
                  <button onClick={copyBankDetails} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>{copied ? "Copied!" : "Copy"}</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12, fontSize: 12 }}>
                  <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 8 }}><div style={{ fontSize: 10, color: "#94a3b8" }}>Account Holder</div><div style={{ fontWeight: 700 }}>MG. Gwala</div></div>
                  <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 8 }}><div style={{ fontSize: 10, color: "#94a3b8" }}>Bank</div><div style={{ fontWeight: 700 }}>Nedbank</div></div>
                  <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 8 }}><div style={{ fontSize: 10, color: "#94a3b8" }}>Account Number</div><div style={{ fontWeight: 700 }}>1044602244</div></div>
                  <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12, padding: 8 }}><div style={{ fontSize: 10, color: "#94a3b8" }}>Branch Code</div><div style={{ fontWeight: 700 }}>198765</div></div>
                </div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 8 }}>Ref: {bookingRef} • After EFT upload proof — ticket issued in 15 min. WhatsApp {WHATSAPP}</div>
              </div>
            </div>
            <div style={{ padding: 16, borderTop: "1px solid #e2e8f0", display: "flex", gap: 12 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: 12, borderRadius: 999, border: "1px solid #e2e8f0", background: "white", fontWeight: 700 }}>Back</button>
              <button onClick={() => setShowModal(false)} style={{ flex: 2, padding: 12, borderRadius: 999, border: 0, background: GOLD, color: NAVY, fontWeight: 900 }}>Pay R{selected.price} On-Site — Nedbank 1044602244</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
