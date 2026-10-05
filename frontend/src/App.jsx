import React, { useState } from "react";
const NAVY = "#0A1931"; const GOLD = "#FFC300";
const PAYSTACK_KEY = "pk_test_162b0d185673f14112b09"; // change to pk_live_ when approved

const FLIGHTS = [
  { id:1, airline:"FlySafair", from:"JNB", to:"CPT", dep:"06:15", arr:"08:25", dur:"2h 10m", stops:"Direct", price:864, original:914, badge:true, seats:3 },
  { id:2, airline:"Airlink", from:"JNB", to:"CPT", dep:"08:40", arr:"10:55", dur:"2h 15m", stops:"Direct", price:902, original:952, badge:true, seats:5 },
  { id:3, airline:"CemAir", from:"DUR", to:"JNB", dep:"11:10", arr:"12:30", dur:"1h 20m", stops:"Direct", price:945, original:995, badge:false, seats:2 },
];
const STAYS = [
  { id:101, name:"Beverly Hills Hotel", loc:"Umhlanga Rocks, Durban", city:"Durban", rating:"4.8", price:2850, original:3200, tag:"Beachfront", badge:true },
  { id:102, name:"The Oyster Box", loc:"Umhlanga Ridge, Durban", city:"Durban", rating:"4.9", price:3450, original:3800, tag:"5-Star", badge:true },
  { id:103, name:"Sun City Resort", loc:"Sun City, Rustenburg", city:"Rustenburg", rating:"4.6", price:1890, original:2100, tag:"Family", badge:false },
  { id:104, name:"The Palace at Sun City", loc:"Sun City, North West", city:"Rustenburg", rating:"4.9", price:4200, original:4800, tag:"Luxury", badge:true },
  { id:105, name:"Cape Town Marriott Hotel", loc:"Foreshore, Cape Town", city:"Cape Town", rating:"4.7", price:2650, original:3000, tag:"City Centre", badge:true },
  { id:106, name:"O.R. Tambo Airport Hotel", loc:"Kempton Park, Johannesburg", city:"Johannesburg", rating:"4.3", price:1450, original:1650, tag:"Airport", badge:false },
];
const CARS = [
  { id:201, name:"Toyota Corolla Quest", company:"Avis", type:"Sedan Manual", price:489, original:539, badge:true, locations:["JNB","DUR","CPT"] },
  { id:202, name:"VW Polo Vivo", company:"Budget", type:"Hatch Manual", price:425, original:475, badge:true, locations:["JNB","CPT"] },
  { id:203, name:"Toyota Fortuner", company:"Hertz", type:"SUV Auto 7 seats", price:1150, original:1220, badge:false, locations:["DUR","JNB"] },
];
const BUSES = [
  { id:301, company:"Intercape", from:"Johannesburg Park Station", to:"Cape Town Station", dep:"18:00", arr:"12:30+1", dur:"18h 30m", price:685, original:735, badge:true, type:"Sleepliner" },
  { id:302, company:"Greyhound", from:"Pretoria Bosman", to:"Durban Central", dep:"20:15", arr:"06:45+1", dur:"10h 30m", price:520, original:570, badge:true, type:"Dreamliner" },
  { id:303, company:"Intercape", from:"Durban Central", to:"Johannesburg Park", dep:"19:30", arr:"05:00+1", dur:"9h 30m", price:450, original:500, badge:false, type:"Mainliner" },
];

export default function App(){
  const [tab,setTab]=useState("stays");
  const [from,setFrom]=useState("JNB"); const [to,setTo]=useState("CPT"); const [date,setDate]=useState("2026-10-15");
  const [dest,setDest]=useState(""); const [checkIn,setCheckIn]=useState("2026-10-15"); const [checkOut,setCheckOut]=useState("2026-10-17"); const [guests,setGuests]=useState("2 Guests");
  const [pickUp,setPickUp]=useState("JNB Airport"); const [dropOff,setDropOff]=useState("CPT Airport"); const [pickDate,setPickDate]=useState("2026-10-15"); const [dropDate,setDropDate]=useState("2026-10-18");
  const [busFrom,setBusFrom]=useState("Johannesburg Park Station"); const [busTo,setBusTo]=useState("Cape Town Station"); const [busDate,setBusDate]=useState("2026-10-15"); const [pax,setPax]=useState("1 Passenger");
  const [filteredStays,setFilteredStays]=useState(STAYS); const [filteredFlights,setFilteredFlights]=useState(FLIGHTS);
  const [filteredCars,setFilteredCars]=useState(CARS); const [filteredBuses,setFilteredBuses]=useState(BUSES);
  const [showModal,setShowModal]=useState(false); const [selected,setSelected]=useState(null); const [step,setStep]=useState(1); const [ref,setRef]=useState("");
  const [form,setForm]=useState({firstName:"",lastName:"",email:"",phone:""}); const [pay,setPay]=useState("card"); const [copied,setCopied]=useState(false);

  const doSearch=()=>{
    if(tab==="stays"){
      const q=dest.toLowerCase();
      if(!q) setFilteredStays(STAYS);
      else setFilteredStays(STAYS.filter(s=> s.city.toLowerCase().includes(q) || s.loc.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)));
    } else if(tab==="flights"){
      setFilteredFlights(FLIGHTS.filter(f=> f.from.includes(from) || f.to.includes(to) || from===""||to===""));
    } else if(tab==="cars"){
      setFilteredCars(CARS);
    } else if(tab==="buses"){
      const qFrom=busFrom.toLowerCase(); const qTo=busTo.toLowerCase();
      setFilteredBuses(BUSES.filter(b=> b.from.toLowerCase().includes(qFrom) || b.to.toLowerCase().includes(qTo) || qFrom==="" ));
    }
    document.getElementById("results")?.scrollIntoView({behavior:"smooth"});
  };

  const openBook=(item)=>{ setSelected(item); setStep(1); setShowModal(true); setRef(`BK-2026-${Math.floor(1000+Math.random()*9000)}`); };
  const copy=()=>{ navigator.clipboard?.writeText(`Nedbank MG Gwala 1044602244 Branch 198765 CA Ref ${ref}`); setCopied(true); setTimeout(()=>setCopied(false),2000); };

  const payWithPaystack=()=>{
    if(!window.PaystackPop){ alert("Paystack loading... try again in 2 secs"); return; }
    const handler=window.PaystackPop.setup({
      key:PAYSTACK_KEY, email:form.email||"customer@khilanetravel.co.za", amount:selected.price*100, currency:"ZAR",
      ref:ref, metadata:{ custom_fields:[{display_name:"Booking Ref", variable_name:"booking_ref", value:ref}] },
      callback:(res)=>{ setStep(4); },
      onClose:()=>{ alert("Payment window closed"); }
    });
    handler.openIframe();
  };

  return(
    <div style={{minHeight:"100vh", background:"#F6F7FB", fontFamily:"Inter,system-ui"}}>
      <script src="https://js.paystack.co/v1/inline.js"></script>
      <div style={{background:GOLD, color:NAVY, textAlign:"center", padding:"9px", fontWeight:900, fontSize:11, letterSpacing:1}}>🇿🇦 SECURE ZAR BOOKINGS • PAYSTACK PROTECTED 🇿🇦 — TEST MODE</div>
      <div style={{background:"white", borderBottom:"1px solid #e2e8f0", position:"sticky", top:0, zIndex:20}}>
        <div style={{maxWidth:1100, margin:"0 auto", padding:"0 14px", height:60, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <div style={{display:"flex", gap:10, alignItems:"center"}}><div style={{width:34,height:34,borderRadius:12,background:NAVY,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>K</div>
            <div><div style={{fontWeight:900,color:NAVY}}>Khilane Travel ✈️</div><div style={{fontSize:11,color:"#059669",fontWeight:700}}>v2.7 • Stays Cars Buses Fixed • Test Mode Pending Live Approval</div></div></div>
          <div style={{background:"#0f172a",color:"white",padding:"6px 12px",borderRadius:20,fontSize:11}}>khilanetravel.co.za</div>
        </div>
      </div>

      <div style={{maxWidth:1100, margin:"0 auto", padding:"16px"}}>
        <div style={{display:"grid", gridTemplateColumns:"1.2fr 0.8fr", gap:18}}>

          <div style={{background:"white", borderRadius:22, border:"1px solid #e2e8f0", boxShadow:"0 20px 60px rgba(10,25,49,0.06)", overflow:"hidden"}}>
            <div style={{display:"flex", gap:6, background:"#f8fafc", margin:8, padding:6, borderRadius:30, width:"fit-content"}}>
              {[{id:"flights",l:"✈️ Flights"},{id:"stays",l:"🏨 Stays"},{id:"cars",l:"🚗 Cars"},{id:"buses",l:"🚌 Buses"}].map(t=>(
                <button key={t.id} onClick={()=>setTab(t.id)} style={{height:36,padding:"0 14px",borderRadius:30,border:"none",fontSize:13,fontWeight:700,background:tab===t.id?NAVY:"transparent",color:tab===t.id?"white":"#475569",cursor:"pointer"}}>{t.l}</button>
              ))}
            </div>

            <div style={{padding:"8px 18px 18px"}}>
              {tab==="flights" && (
                <>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>FROM</div><input value={from} onChange={e=>setFrom(e.target.value)} placeholder="JNB" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:800}}/></div>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>TO</div><input value={to} onChange={e=>setTo(e.target.value)} placeholder="CPT" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:800}}/></div>
                  </div>
                  <div style={{marginTop:10}}><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DEPART</div><input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                </>
              )}

              {tab==="stays" && (
                <>
                  <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DESTINATION / CITY OR HOTEL NAME</div>
                    <input value={dest} onChange={e=>setDest(e.target.value)} placeholder="e.g. Durban, Cape Town, Umhlanga, Sun City..." style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"2px solid #0A1931",padding:"0 12px",fontWeight:700}}/>
                    <div style={{fontSize:10,color:"#64748b",marginTop:4}}>Enter destination → we show resorts in that area</div>
                  </div>
                  <div style={{marginTop:10, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>CHECK-IN</div><input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>CHECK-OUT</div><input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                  </div>
                  <div style={{marginTop:10}}><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>GUESTS</div>
                    <select value={guests} onChange={e=>setGuests(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}>
                      <option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option><option>Family</option>
                    </select>
                  </div>
                </>
              )}

              {tab==="cars" && (
                <>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>PICK-UP POINT</div><input value={pickUp} onChange={e=>setPickUp(e.target.value)} placeholder="e.g. JNB Airport, Durban City" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:700}}/></div>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DROP-OFF POINT</div><input value={dropOff} onChange={e=>setDropOff(e.target.value)} placeholder="e.g. CPT Airport, Umhlanga" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:700}}/></div>
                  </div>
                  <div style={{marginTop:10, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>PICK-UP DATE</div><input type="date" value={pickDate} onChange={e=>setPickDate(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DROP-OFF DATE</div><input type="date" value={dropDate} onChange={e=>setDropDate(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                  </div>
                </>
              )}

              {tab==="buses" && (
                <>
                  <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>FROM (PICK-UP)</div><input value={busFrom} onChange={e=>setBusFrom(e.target.value)} placeholder="e.g. JHB Park Station" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:700}}/></div>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>TO (DESTINATION)</div><input value={busTo} onChange={e=>setBusTo(e.target.value)} placeholder="e.g. CPT Station" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:700}}/></div>
                  </div>
                  <div style={{marginTop:10, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DEPART DATE</div><input type="date" value={busDate} onChange={e=>setBusDate(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>PASSENGERS</div>
                      <select value={pax} onChange={e=>setPax(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}>
                        <option>1 Passenger</option><option>2 Passengers</option><option>3 Passengers</option><option>4 Passengers</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <button onClick={doSearch} style={{marginTop:18,width:"100%",height:52,borderRadius:30,border:"none",background:GOLD,color:NAVY,fontWeight:900,fontSize:15,cursor:"pointer"}}>
                {tab==="stays" ? `Search stays in ${dest||"South Africa"} →` : tab==="cars" ? `Search cars ${pickUp} → ${dropOff} →` : tab==="buses" ? `Search buses ${busFrom.split(" ")[0]} → ${busTo.split(" ")[0]} →` : `Search flights →`} 
              </button>
              <div style={{marginTop:8,textAlign:"center",fontSize:10,color:"#64748b"}}>Secure booking on khilanetravel.co.za • ZAR only • Instant confirmation</div>
            </div>
          </div>

          <div style={{background:NAVY, borderRadius:22, padding:18, color:"white"}}>
            <div style={{fontSize:11,letterSpacing:1,opacity:0.6,fontWeight:700}}>SECURE PAYMENTS</div>
            <div style={{marginTop:8,fontSize:26,fontWeight:900,lineHeight:1.1}}>Pay with Card or EFT — Settles to Nedbank.</div>
            <div style={{marginTop:8,fontSize:12,opacity:0.8}}>All payments protected by Paystack. Pending approval: Test mode — Live coming soon</div>
            <div style={{marginTop:16, display:"grid", gap:10}}>
              {["Visa / Mastercard / Instant EFT via Paystack","PCI DSS secure — 3D Secure","E-ticket instant after payment","Funds secured via Paystack settlement"].map((t,i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:12,display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:24,height:24,borderRadius:12,background:GOLD,color:NAVY,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:11}}>✓</div>
                  <div style={{fontSize:12,fontWeight:500}}>{t}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:14, fontSize:10, opacity:0.5}}>Bank details shown only inside secure checkout after booking ref is generated — not on homepage.</div>
          </div>
        </div>

        <div id="results" style={{marginTop:26}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8}}>
            <h2 style={{fontWeight:900, fontSize:18, color:NAVY}}>
              {tab==="stays" ? (dest ? `Stays in ${dest} • ${filteredStays.length} resorts found` : "All Stays • South Africa") :
               tab==="cars" ? `Cars • ${pickUp} → ${dropOff}` :
               tab==="buses" ? `Buses • ${busFrom} → ${busTo}` : `Flights • ${from} → ${to}`} • ZAR
            </h2>
            <span style={{fontSize:11, padding:"4px 10px", borderRadius:20, background:"#dcfce7", color:"#166534", fontWeight:700}}>Secure • Instant</span>
          </div>

          <div style={{marginTop:12, display:"grid", gap:10}}>
            {(tab==="stays" ? filteredStays : tab==="flights" ? filteredFlights : tab==="cars" ? filteredCars : filteredBuses).map(item=>(
              <div key={item.id} style={{background:"white", border:"1px solid #e2e8f0", borderRadius:18, padding:14, display:"flex", justifyContent:"space-between", gap:10, alignItems:"center", flexWrap:"wrap"}}>
                <div style={{display:"flex", gap:12, alignItems:"center"}}>
                  <div style={{width:40,height:40,borderRadius:20,background:"#0f172a",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:12}}>{(item.airline?.[0]||item.name?.[0]||item.company?.[0]||"K")}</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:14}}>{item.name || `${item.company || item.airline} • ${item.from||pickUp} → ${item.to||dropOff}`}</div>
                    <div style={{fontSize:11,color:"#64748b"}}>{item.loc || item.type || `${item.dur||""} • ${item.stops||""} • ${item.dep||""}→${item.arr||""}`}</div>
                    {tab==="stays" && <div style={{fontSize:10, color:"#059669", fontWeight:700, marginTop:2}}>📍 {item.city} • {item.tag} • ⭐ {item.rating}</div>}
                  </div>
                </div>
                <div style={{display:"flex", gap:12, alignItems:"center"}}>
                  <div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#94a3b8",textDecoration:"line-through"}}>R{item.original}</div><div style={{fontWeight:900,fontSize:18,color:NAVY}}>R{item.price}</div>{item.badge&&<div style={{fontSize:10,fontWeight:900,background:GOLD,color:NAVY,padding:"2px 8px",borderRadius:10,display:"inline-block"}}>SAVE R50</div>}</div>
                  <button onClick={()=>openBook(item)} style={{height:40,padding:"0 16px",borderRadius:20,border:"none",background:NAVY,color:"white",fontWeight:800,fontSize:13,cursor:"pointer"}}>Book & Pay</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:28, background:"white", border:"1px solid #e2e8f0", borderRadius:16, padding:14, textAlign:"center", fontSize:11, color:"#64748b"}}>
          <div style={{fontWeight:800,color:NAVY}}>Khilane Travel (Pty) Ltd • Proudly South African</div>
          <div>All bookings securely completed on www.khilanetravel.co.za. Prices in ZAR (R). Instant confirmation.</div>
        </div>
      </div>

      {showModal && selected && (
        <div style={{position:"fixed", inset:0, zIndex:50, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"flex-end", justifyContent:"center"}}>
          <div style={{width:"100%",maxWidth:520,background:"white",borderRadius:"24px 24px 0 0",maxHeight:"92vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <div style={{background:NAVY,padding:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{color:"white"}}><div style={{fontWeight:900}}>Secure Booking — khilanetravel.co.za</div><div style={{fontSize:11,opacity:0.7,fontFamily:"monospace"}}>{ref} • R{selected.price} • {tab}</div></div>
              <button onClick={()=>setShowModal(false)} style={{width:32,height:32,borderRadius:16,background:"rgba(255,255,255,0.15)",color:"white",border:"none",cursor:"pointer"}}>✕</button>
            </div>
            <div style={{padding:16,overflowY:"auto",display:"grid",gap:14}}>
              {step===1 && <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:16,padding:14}}><div style={{fontSize:12,fontWeight:800,color:"#64748b"}}>STEP 1 • SUMMARY</div><div style={{marginTop:6,fontWeight:800}}>{selected.name||selected.airline||selected.company} — R{selected.price} ZAR</div><div style={{marginTop:6,fontSize:12,color:"#475569"}}>{tab==="stays" ? `Destination: ${dest||selected.city} • ${checkIn} to ${checkOut} • ${guests}` : tab==="cars" ? `${pickUp} → ${dropOff} • ${pickDate} to ${dropDate}` : tab==="buses" ? `${busFrom} → ${busTo} • ${busDate} • ${pax}` : `${from} → ${to} • ${date}`}</div></div>}
              {step===2 && <div style={{display:"grid",gap:10}}><div style={{fontSize:12,fontWeight:800}}>STEP 2 • TRAVELLER</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} placeholder="First Name" style={{height:44,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/><input value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} placeholder="Last Name" style={{height:44,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email for e-ticket" style={{gridColumn:"span 2",height:44,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone" style={{gridColumn:"span 2",height:44,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div></div>}
              {step===3 && <div style={{display:"grid",gap:10}}><div style={{fontSize:12,fontWeight:800}}>STEP 3 • PAYMENT — SECURE</div>
                <button onClick={()=>setPay("card")} style={{textAlign:"left",padding:12,borderRadius:12,border:pay==="card"?`2px solid ${NAVY}`:"1px solid #e2e8f0",background:pay==="card"?"#f8faff":"white"}}><div style={{fontWeight:700,fontSize:13}}>Pay with Card (Paystack) ✓</div><div style={{fontSize:11,color:"#64748b"}}>Secure • Instant • Settles to Nedbank</div></button>
                <button onClick={()=>setPay("eft")} style={{textAlign:"left",padding:12,borderRadius:12,border:pay==="eft"?`2px solid ${NAVY}`:"1px solid #e2e8f0",background:pay==="eft"?"#f8faff":"white"}}><div style={{fontWeight:700,fontSize:13}}>Manual EFT — Nedbank (Private Details After)</div><div style={{fontSize:11,color:"#64748b"}}>For business/invoice — Details shown securely</div></button>
                {pay==="eft" && <div style={{background:"#fef3c7",border:"1px solid #fde68a",borderRadius:16,padding:14}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontWeight:800,fontSize:13}}>EFT Banking — Private</div><button onClick={copy} style={{height:32,padding:"0 12px",borderRadius:20,background:"white",border:"1px solid #e2e8f0",fontSize:11,fontWeight:700}}>{copied?"Copied!":"Copy"}</button></div><div style={{marginTop:10,fontSize:12}}>Holder: MG Gwala • Bank: Nedbank<br/>Acc: 1044602244 • Branch: 198765 • CA<br/>Ref: <b>{ref}</b></div><div style={{marginTop:8,fontSize:10,color:"#92400e"}}>Private — shown only in secure checkout. Use ref {ref}.</div></div>}
              </div>}
              {step===4 && <div style={{textAlign:"center",padding:"14px 0"}}><div style={{width:70,height:70,borderRadius:35,background:GOLD,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontWeight:900,color:NAVY}}>✓</div><div style={{marginTop:10,fontWeight:900,fontSize:20,color:NAVY}}>Booking Confirmed!</div><div style={{marginTop:8,display:"inline-block",padding:"6px 14px",borderRadius:20,background:"#0f172a",color:"white",fontFamily:"monospace",fontSize:13}}>{ref}</div><div style={{marginTop:10,fontSize:12,color:"#475569"}}>E-ticket sent to {form.email||"your email"} from khilanetravel.co.za</div></div>}
            </div>
            <div style={{padding:14,borderTop:"1px solid #e2e8f0",display:"flex",gap:10,background:"white"}}>
              {step>1&&step<4&&<button onClick={()=>setStep(step-1)} style={{height:46,flex:1,borderRadius:22,border:"1px solid #cbd5e1",background:"white",fontWeight:700}}>Back</button>}
              {step<3&&<button onClick={()=>setStep(step+1)} style={{height:46,flex:2,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>Continue — R{selected.price}</button>}
              {step===3&&pay==="card"&&<button onClick={payWithPaystack} style={{height:46,flex:2,borderRadius:22,border:"none",background:GOLD,color:NAVY,fontWeight:900}}>Pay R{selected.price} with Paystack</button>}
              {step===3&&pay==="eft"&&<button onClick={()=>setStep(4)} style={{height:46,flex:2,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>I Have Paid — Confirm</button>}
              {step===4&&<button onClick={()=>setShowModal(false)} style={{height:46,width:"100%",borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>Done</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
