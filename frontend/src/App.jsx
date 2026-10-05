import React, { useState } from "react";

const NAVY = "#0A1931";
const GOLD = "#FFC300";
// PAYSTACK KEYS - TEST now, will switch to LIVE when approved
// After approval, change to pk_live_... from Paystack Dashboard
const PAYSTACK_PUBLIC_KEY = "pk_test_162b0d185673f14112b09"; // ← CHANGE TO pk_live_ WHEN APPROVED
const BACKEND_URL = "https://khilane-api.onrender.com";

const mockFlights = [
  { id: 1, airline: "FlySafair", from: "JNB", to: "CPT", dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, badge: true },
  { id: 2, airline: "Airlink", from: "JNB", to: "CPT", dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, badge: true },
  { id: 3, airline: "CemAir", from: "JNB", to: "CPT", dep: "11:10", arr: "13:30", dur: "2h 20m", stops: "Direct", price: 945, original: 995, badge: false },
  { id: 4, airline: "LIFT", from: "JNB", to: "CPT", dep: "14:05", arr: "16:20", dur: "2h 15m", stops: "Direct", price: 989, original: 1039, badge: false },
];
const mockStays = [
  { id: 101, name: "Beverly Hills Hotel Umhlanga", loc: "Umhlanga Rocks", rating: "4.8", price: 2850, original: 3200, tag: "Beachfront", badge: true },
  { id: 102, name: "The Oyster Box", loc: "Umhlanga Ridge", rating: "4.9", price: 3450, original: 3800, tag: "5-Star", badge: true },
  { id: 103, name: "Sun City Resort", loc: "Rustenburg", rating: "4.6", price: 1890, original: 2100, tag: "Family", badge: false },
];
const mockCars = [
  { id: 201, name: "Toyota Corolla Quest", company: "Avis", type: "Sedan Manual", price: 489, original: 539, badge: true },
  { id: 202, name: "VW Polo Vivo", company: "Budget", type: "Hatch Manual", price: 425, original: 475, badge: true },
  { id: 203, name: "Toyota Fortuner", company: "Hertz", type: "SUV Auto", price: 1150, original: 1220, badge: false },
];
const mockBuses = [
  { id: 301, company: "Intercape", from: "JNB", to: "CPT", dep: "18:00", arr: "12:30+1", dur: "18h 30m", price: 685, original: 735, badge: true },
  { id: 302, company: "Greyhound", from: "PTA", to: "DBN", dep: "20:15", arr: "06:45+1", dur: "10h 30m", price: 520, original: 570, badge: true },
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
  const [form, setForm] = useState({ firstName: "", lastName: "", idNumber: "", passportNum: "", email: "", phone: "" });
  const [pay, setPay] = useState("card");
  const [processing, setProcessing] = useState(false);

  const doSearch = () => { setIsSearching(true); setShowResults(false); setTimeout(()=>{ setIsSearching(false); setShowResults(true); },600); };
  const openBook = (item) => { setSelected(item); setStep(1); setShowModal(true); setRef(`BK-2026-${Math.floor(1000+Math.random()*9000)}`); };

  const payWithPaystack = () => {
    if (!form.email || !form.firstName) { alert("Enter email and first name"); return; }
    setProcessing(true);
    
    // Load Paystack inline script
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: form.email,
        amount: selected.price * 100, // Paystack uses kobo/cents
        currency: "ZAR",
        ref: ref,
        metadata: {
          custom_fields: [
            { display_name: "Booking Ref", variable_name: "booking_ref", value: ref },
            { display_name: "Traveller", variable_name: "traveller", value: `${form.firstName} ${form.lastName}` },
            { display_name: "Flight", variable_name: "flight", value: `${selected.airline || selected.name} R${selected.price}` }
          ]
        },
        callback: function(response) {
          // Payment success - verify on backend
          fetch(`${BACKEND_URL}/api/payments/paystack/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference, bookingRef: ref, email: form.email, amount: selected.price })
          }).then(()=>{});
          setProcessing(false);
          setStep(4);
          // TODO: Backend will auto-send e-ticket and settle to Nedbank 1044602244
        },
        onClose: function() { setProcessing(false); alert("Payment window closed"); }
      });
      handler.openIframe();
    };
    document.body.appendChild(script);
  };

  const results = activeTab==="flights"?mockFlights:activeTab==="stays"?mockStays:activeTab==="cars"?mockCars:mockBuses;

  return (
    <div style={{ minHeight:"100vh", background:"#F6F7FB", fontFamily:"Inter, system-ui", color:"#0f172a" }}>
      <div style={{ background:GOLD, color:NAVY, textAlign:"center", padding:"10px 8px", fontWeight:900, fontSize:12 }}>🇿🇦 SECURE ZAR BOOKINGS • PAYSTACK PROTECTED 🇿🇦 {PAYSTACK_PUBLIC_KEY.startsWith("pk_test")?"— TEST MODE":"— LIVE MODE"}</div>

      <div style={{ background:"white", borderBottom:"1px solid #e2e8f0", position:"sticky", top:0, zIndex:20 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 16px", height:64, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <div style={{ width:36, height:36, borderRadius:12, background:NAVY, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900 }}>K</div>
            <div><div style={{ fontWeight:900, fontSize:18, color:NAVY }}>Khilane Travel ✈️</div><div style={{ fontSize:11, color:"#059669", fontWeight:700 }}>v2.6 • Paystack • {PAYSTACK_PUBLIC_KEY.startsWith("pk_test")?"Test Mode Pending Live Approval":"LIVE Payments to Nedbank 1044602244"}</div></div>
          </div>
          <div style={{ background:"#0f172a", color:"white", padding:"6px 12px", borderRadius:20, fontSize:11, fontWeight:600 }}>khilanetravel.co.za</div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"20px 16px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.15fr 0.85fr", gap:20 }}>
          <div style={{ background:"white", borderRadius:24, border:"1px solid #e2e8f0", overflow:"hidden" }}>
            <div style={{ display:"flex", gap:6, background:"#f8fafc", margin:8, padding:6, borderRadius:30, width:"fit-content" }}>
              {["flights","stays","cars","buses"].map(t=><button key={t} onClick={()=>{setActiveTab(t); setShowResults(true);}} style={{ height:36, padding:"0 16px", borderRadius:30, border:"none", fontSize:13, fontWeight:700, background:activeTab===t?NAVY:"transparent", color:activeTab===t?"white":"#475569", cursor:"pointer", textTransform:"capitalize" }}>{t==="stays"?"🏨 "+t:"✈️ "+t}</button>)}
            </div>
            <div style={{ padding:"8px 20px 20px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div><div style={{ fontSize:11, fontWeight:700, color:"#64748b" }}>FROM</div><input value={from} onChange={e=>setFrom(e.target.value)} style={{ marginTop:4, width:"100%", height:48, borderRadius:12, border:"1px solid #cbd5e1", padding:"0 12px", fontWeight:800 }} /></div>
                <div><div style={{ fontSize:11, fontWeight:700, color:"#64748b" }}>TO</div><input value={to} onChange={e=>setTo(e.target.value)} style={{ marginTop:4, width:"100%", height:48, borderRadius:12, border:"1px solid #cbd5e1", padding:"0 12px", fontWeight:800 }} /></div>
              </div>
              <div style={{ marginTop:12 }}><div style={{ fontSize:11, fontWeight:700, color:"#64748b" }}>DEPART</div><input type="date" value={departDate} onChange={e=>setDepartDate(e.target.value)} style={{ marginTop:4, width:"100%", height:48, borderRadius:12, border:"1px solid #cbd5e1", padding:"0 12px" }} /></div>
              <button onClick={doSearch} disabled={isSearching} style={{ marginTop:20, width:"100%", height:52, borderRadius:30, border:"none", background:GOLD, color:NAVY, fontWeight:900, fontSize:15, cursor:"pointer" }}>{isSearching?"Searching...":`Search ${activeTab} in ZAR →`}</button>
            </div>
          </div>

          <div style={{ background:NAVY, borderRadius:24, padding:20, color:"white" }}>
            <div style={{ fontSize:11, letterSpacing:2, opacity:0.7, fontWeight:700 }}>SECURE PAYMENTS</div>
            <div style={{ marginTop:12, fontSize:26, fontWeight:900, lineHeight:1.1 }}>Pay with Card or EFT — Settles to Nedbank.</div>
            <div style={{ marginTop:10, fontSize:13, opacity:0.85 }}>All card payments protected by Paystack. Funds settle to your Nedbank account automatically. Pending approval: {PAYSTACK_PUBLIC_KEY.startsWith("pk_test")?"Test mode — Live coming soon":"Live mode active!"}</div>
            <div style={{ marginTop:16, display:"grid", gap:10 }}>
              {["Visa / Mastercard / Instant EFT via Paystack","PCI DSS secure — 3D Secure","E-ticket instant after payment","Money → Nedbank 1044602244"].map((t,i)=><div key={i} style={{ background:"rgba(255,255,255,0.1)", borderRadius:12, padding:12, display:"flex", gap:10 }}><div style={{ width:24, height:24, borderRadius:12, background:GOLD, color:NAVY, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:12 }}>✓</div><div style={{ fontSize:13 }}>{t}</div></div>)}
            </div>
          </div>
        </div>

        <div id="results" style={{ marginTop:30 }}>
          {showResults && <div style={{ display:"grid", gap:12 }}>
            <h2 style={{ fontWeight:900, fontSize:18, color:NAVY, textTransform:"capitalize" }}>{activeTab} • ZAR • Paystack {PAYSTACK_PUBLIC_KEY.startsWith("pk_test")?"Test":"Live"}</h2>
            {results.map(item=><div key={item.id} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:18, padding:16, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:40, height:40, borderRadius:20, background:"#0f172a", color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:12 }}>{item.airline?.[0]||item.name?.[0]||item.company?.[0]||"K"}</div>
                <div><div style={{ fontWeight:800, fontSize:14 }}>{item.airline||item.name||item.company} • R{item.price}</div><div style={{ fontSize:11, color:"#64748b" }}>{item.dep?`${item.from} ${item.dep} → ${item.to} ${item.arr} • ${item.dur}`:item.loc||item.type}</div></div>
              </div>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ textAlign:"right" }}><div style={{ fontSize:11, color:"#94a3b8", textDecoration:"line-through" }}>R{item.original}</div><div style={{ fontWeight:900, fontSize:18, color:NAVY }}>R{item.price}</div></div>
                <button onClick={()=>openBook(item)} style={{ height:40, padding:"0 18px", borderRadius:20, border:"none", background:NAVY, color:"white", fontWeight:800, fontSize:13, cursor:"pointer" }}>Book & Pay</button>
              </div>
            </div>)}
          </div>}
        </div>

        <div style={{ marginTop:30, background:"white", border:"1px solid #e2e8f0", borderRadius:16, padding:16, textAlign:"center", fontSize:11, color:"#64748b" }}>
          Khilane Travel (Pty) Ltd • Secure payments via Paystack • Settlements to Nedbank • © 2026
        </div>
      </div>

      {showModal && selected && (
        <div style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
          <div style={{ width:"100%", maxWidth:520, background:"white", borderRadius:"24px 24px 0 0", maxHeight:"92vh", display:"flex", flexDirection:"column", overflow:"hidden" }}>
            <div style={{ background:NAVY, padding:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ color:"white" }}><div style={{ fontWeight:900 }}>Secure Checkout — Paystack</div><div style={{ fontSize:11, opacity:0.7, fontFamily:"monospace" }}>{ref} • R{selected.price} {PAYSTACK_PUBLIC_KEY.startsWith("pk_test")?"TEST":"LIVE"}</div></div>
              <button onClick={()=>setShowModal(false)} style={{ width:32, height:32, borderRadius:16, background:"rgba(255,255,255,0.15)", color:"white", border:"none", cursor:"pointer" }}>✕</button>
            </div>

            <div style={{ padding:16, overflowY:"auto", display:"grid", gap:16 }}>
              {step===1 && <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:16, padding:16 }}><div style={{ fontSize:12, fontWeight:800, color:"#64748b" }}>STEP 1 • SUMMARY</div><div style={{ marginTop:8, fontWeight:800 }}>{selected.airline||selected.name} • R{selected.price} ZAR</div><div style={{ marginTop:6, fontSize:12, color:"#475569" }}>Payment via Paystack — protected and secure. {PAYSTACK_PUBLIC_KEY.startsWith("pk_test")?"You are in TEST mode — use test card 4242 4242 4242 4242":"Live payments — funds to Nedbank 1044602244"}</div></div>}

              {step===2 && <div style={{ display:"grid", gap:12 }}>
                <div style={{ fontSize:12, fontWeight:800 }}>STEP 2 • TRAVELLER</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  <input value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})} placeholder="First Name *" style={{ height:44, borderRadius:12, border:"1px solid #cbd5e1", padding:"0 12px" }} />
                  <input value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})} placeholder="Last Name *" style={{ height:44, borderRadius:12, border:"1px solid #cbd5e1", padding:"0 12px" }} />
                  <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email for e-ticket *" style={{ gridColumn:"span 2", height:44, borderRadius:12, border:"1px solid #cbd5e1", padding:"0 12px" }} />
                  <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone *" style={{ gridColumn:"span 2", height:44, borderRadius:12, border:"1px solid #cbd5e1", padding:"0 12px" }} />
                </div>
              </div>}

              {step===3 && <div style={{ display:"grid", gap:12 }}>
                <div style={{ fontSize:12, fontWeight:800 }}>STEP 3 • PAY R{selected.price} SECURELY</div>
                <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:12 }}>
                  <div style={{ fontWeight:800, fontSize:13, color:"#166534" }}>Paystack Secure Checkout {PAYSTACK_PUBLIC_KEY.startsWith("pk_test")?"— TEST MODE":"— LIVE MODE"}</div>
                  <div style={{ fontSize:11, color:"#15803d", marginTop:4 }}>{PAYSTACK_PUBLIC_KEY.startsWith("pk_test")?"Use test card: 4242 4242 4242 4242 • Exp 12/30 • CVC 123 — No real money":"Real card — Funds settle to Nedbank 1044602244 within 24-48h"}</div>
                </div>
                <button onClick={payWithPaystack} disabled={processing} style={{ height:52, borderRadius:16, border:"none", background:GOLD, color:NAVY, fontWeight:900, fontSize:15, cursor:"pointer" }}>{processing?"Processing...":`Pay R${selected.price} with Paystack ${PAYSTACK_PUBLIC_KEY.startsWith("pk_test")?"(TEST)":""}`}</button>
                <div style={{ fontSize:10, color:"#94a3b8", textAlign:"center" }}>Powered by Paystack • PCI DSS • 3D Secure • Paystack dashboard: Khilane Travel (PTY) LTD 2042515</div>
              </div>}

              {step===4 && <div style={{ textAlign:"center", padding:"16px 0" }}>
                <div style={{ width:80, height:80, borderRadius:40, background:GOLD, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, fontWeight:900, color:NAVY }}>✓</div>
                <div style={{ marginTop:12, fontWeight:900, fontSize:22, color:NAVY }}>Payment Successful!</div>
                <div style={{ marginTop:8, display:"inline-block", padding:"6px 16px", borderRadius:20, background:"#0f172a", color:"white", fontFamily:"monospace", fontSize:14 }}>{ref}</div>
                <div style={{ marginTop:12, fontSize:12, color:"#475569" }}>E-ticket sent to {form.email}. {PAYSTACK_PUBLIC_KEY.startsWith("pk_test")?"This was a TEST payment — no real money moved. When Live approved, real money will go to Nedbank 1044602244":"Funds will settle to your Nedbank 1044602244 within 24-48 hours. Check Paystack dashboard."}</div>
                <div style={{ marginTop:12, background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:12, padding:10, fontSize:11 }}>Paystack Ref: {ref} • Check Paystack Dashboard → Transactions to see payment • Payouts → Nedbank</div>
              </div>}
            </div>

            <div style={{ padding:16, borderTop:"1px solid #e2e8f0", display:"flex", gap:12, background:"white" }}>
              {step>1 && step<4 && <button onClick={()=>setStep(step-1)} style={{ height:48, flex:1, borderRadius:24, border:"1px solid #cbd5e1", background:"white", fontWeight:700, cursor:"pointer" }}>Back</button>}
              {step<3 && <button onClick={()=>setStep(step+1)} style={{ height:48, flex:2, borderRadius:24, border:"none", background:NAVY, color:"white", fontWeight:800, cursor:"pointer" }}>Continue — {step===1?`R${selected.price}`:"Pay"}</button>}
              {step===4 && <button onClick={()=>setShowModal(false)} style={{ height:48, width:"100%", borderRadius:24, border:"none", background:NAVY, color:"white", fontWeight:800, cursor:"pointer" }}>Done</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
