import React, { useState } from "react";
const NAVY="#0A1931"; const GOLD="#FFC300";
const PAYSTACK_KEY="pk_test_162b0d185673f14112b09";

const FLIGHTS=[{id:1,airline:"FlySafair",from:"JNB",to:"CPT",dep:"06:15",arr:"08:25",dur:"2h 10m",stops:"Direct",price:864,original:914,badge:true,seats:3},{id:2,airline:"Airlink",from:"JNB",to:"CPT",dep:"08:40",arr:"10:55",dur:"2h 15m",stops:"Direct",price:902,original:952,badge:true,seats:5},{id:3,airline:"CemAir",from:"DUR",to:"JNB",dep:"11:10",arr:"12:30",dur:"1h 20m",stops:"Direct",price:945,original:995,badge:false,seats:2}];
const STAYS=[{id:101,name:"Beverly Hills Hotel",loc:"Umhlanga Rocks, Durban",city:"Durban",rating:"4.8",price:2850,original:3200,tag:"Beachfront",badge:true},{id:102,name:"The Oyster Box",loc:"Umhlanga Ridge, Durban",city:"Durban",rating:"4.9",price:3450,original:3800,tag:"5-Star",badge:true},{id:103,name:"Sun City Resort",loc:"Sun City, Rustenburg",city:"Rustenburg",rating:"4.6",price:1890,original:2100,tag:"Family",badge:false},{id:104,name:"The Palace at Sun City",loc:"Sun City, North West",city:"Rustenburg",rating:"4.9",price:4200,original:4800,tag:"Luxury",badge:true},{id:105,name:"Cape Town Marriott Hotel",loc:"Foreshore, Cape Town",city:"Cape Town",rating:"4.7",price:2650,original:3000,tag:"City Centre",badge:true},{id:106,name:"O.R. Tambo Airport Hotel",loc:"Kempton Park, Johannesburg",city:"Johannesburg",rating:"4.3",price:1450,original:1650,tag:"Airport",badge:false}];
const CARS=[{id:201,name:"Toyota Corolla Quest",company:"Avis",type:"Sedan Manual",price:489,original:539,badge:true},{id:202,name:"VW Polo Vivo",company:"Budget",type:"Hatch Manual",price:425,original:475,badge:true},{id:203,name:"Toyota Fortuner",company:"Hertz",type:"SUV Auto 7 seats",price:1150,original:1220,badge:false}];
const BUSES=[{id:301,company:"Intercape",from:"Johannesburg Park Station",to:"Cape Town Station",dep:"18:00",arr:"12:30+1",dur:"18h 30m",price:685,original:735,badge:true,type:"Sleepliner"},{id:302,company:"Greyhound",from:"Pretoria Bosman",to:"Durban Central",dep:"20:15",arr:"06:45+1",dur:"10h 30m",price:520,original:570,badge:true,type:"Dreamliner"},{id:303,company:"Intercape",from:"Durban Central",to:"Johannesburg Park",dep:"19:30",arr:"05:00+1",dur:"9h 30m",price:450,original:500,badge:false,type:"Mainliner"}];

export default function App(){
  const [tab,setTab]=useState("flights");
  // Flight states
  const [tripType,setTripType]=useState("single"); // single | return | multi
  const [from,setFrom]=useState("JNB"); const [to,setTo]=useState("CPT"); const [date,setDate]=useState("2026-10-15"); const [returnDate,setReturnDate]=useState("2026-10-20");
  const [adults,setAdults]=useState(1); const [children,setChildren]=useState(0); const [infants,setInfants]=useState(0);
  const [multiLegs,setMultiLegs]=useState([{from:"JNB",to:"CPT",date:"2026-10-15"},{from:"CPT",to:"DUR",date:"2026-10-18"}]);
  // Stays
  const [dest,setDest]=useState(""); const [checkIn,setCheckIn]=useState("2026-10-15"); const [checkOut,setCheckOut]=useState("2026-10-17"); const [stayAdults,setStayAdults]=useState(2); const [stayChildren,setStayChildren]=useState(0); const [stayRooms,setStayRooms]=useState(1);
  // Cars
  const [pickUp,setPickUp]=useState("JNB Airport"); const [dropOff,setDropOff]=useState("CPT Airport"); const [pickDate,setPickDate]=useState("2026-10-15"); const [dropDate,setDropDate]=useState("2026-10-18");
  // Buses
  const [busFrom,setBusFrom]=useState("Johannesburg Park Station"); const [busTo,setBusTo]=useState("Cape Town Station"); const [busDate,setBusDate]=useState("2026-10-15"); const [busAdults,setBusAdults]=useState(1); const [busChildren,setBusChildren]=useState(0);
  // Search results
  const [filteredFlights,setFilteredFlights]=useState(FLIGHTS); const [filteredStays,setFilteredStays]=useState(STAYS); const [filteredCars,setFilteredCars]=useState(CARS); const [filteredBuses,setFilteredBuses]=useState(BUSES);
  const [showPax,setShowPax]=useState(false); const [showStayPax,setShowStayPax]=useState(false); const [showBusPax,setShowBusPax]=useState(false);
  const [showModal,setShowModal]=useState(false); const [selected,setSelected]=useState(null); const [step,setStep]=useState(1); const [ref,setRef]=useState("");
  const [form,setForm]=useState({firstName:"",lastName:"",email:"",phone:""}); const [pay,setPay]=useState("card"); const [copied,setCopied]=useState(false);
  const [childAges,setChildAges]=useState([]); const [busChildAges,setBusChildAges]=useState([]); const [stayChildAges,setStayChildAges]=useState([]);

  const totalFlightPax=adults+children+infants;
  const totalStayGuests=stayAdults+stayChildren;
  const totalBusPax=busAdults+busChildren;

  const calcFlightTotal=()=>{
    if(!selected) return 0;
    const childDiscount=0.75; const infantPrice=150;
    return adults*selected.price + Math.round(children*selected.price*childDiscount) + infants*infantPrice;
  };

  const doSearch=()=>{
    if(tab==="stays"){ const q=dest.toLowerCase(); setFilteredStays(!q?STAYS:STAYS.filter(s=>s.city.toLowerCase().includes(q)||s.loc.toLowerCase().includes(q)||s.name.toLowerCase().includes(q)));
    } else if(tab==="flights"){ setFilteredFlights(FLIGHTS); } else if(tab==="cars"){ setFilteredCars(CARS); } else if(tab==="buses"){ setFilteredBuses(BUSES); }
    document.getElementById("results")?.scrollIntoView({behavior:"smooth"});
  };

  const openBook=(item)=>{ setSelected(item); setStep(1); setShowModal(true); setRef(`BK-2026-${Math.floor(1000+Math.random()*9000)}`); };
  const copy=()=>{ navigator.clipboard?.writeText(`Nedbank MG Gwala 1044602244 Branch 198765 CA Ref ${ref}`); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const payWithPaystack=()=>{
    if(!window.PaystackPop){ alert("Paystack loading... try again"); return; }
    const total=tab==="flights"?calcFlightTotal():selected.price;
    const handler=window.PaystackPop.setup({ key:PAYSTACK_KEY, email:form.email||"customer@khilanetravel.co.za", amount:total*100, currency:"ZAR", ref:ref,
      callback:()=>setStep(4), onClose:()=>{} });
    handler.openIframe();
  };

  const inc=(setter,val,max=9)=>{ if(val<max) setter(v=>v+1); };
  const dec=(setter,val,min=0)=>{ if(val>min) setter(v=>v-1); };

  return(
    <div style={{minHeight:"100vh",background:"#F6F7FB",fontFamily:"Inter,system-ui"}}>
      <script src="https://js.paystack.co/v1/inline.js"></script>
      <div style={{background:GOLD,color:NAVY,textAlign:"center",padding:9,fontWeight:900,fontSize:11,letterSpacing:1}}>🇿🇦 SECURE ZAR BOOKINGS • PAYSTACK PROTECTED 🇿🇦 — TEST MODE</div>
      <div style={{background:"white",borderBottom:"1px solid #e2e8f0",position:"sticky",top:0,zIndex:20}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 14px",height:60,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:34,height:34,borderRadius:12,background:NAVY,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>K</div><div><div style={{fontWeight:900,color:NAVY}}>Khilane Travel ✈️</div><div style={{fontSize:11,color:"#059669",fontWeight:700}}>v2.8 • Trip Type + Child/Adult • Test Pending Live</div></div></div>
          <div style={{background:"#0f172a",color:"white",padding:"6px 12px",borderRadius:20,fontSize:11}}>khilanetravel.co.za</div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:16}}>
        <div style={{display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:18}}>

          <div style={{background:"white",borderRadius:22,border:"1px solid #e2e8f0",boxShadow:"0 20px 60px rgba(10,25,49,0.06)",overflow:"hidden"}}>
            <div style={{display:"flex",gap:6,background:"#f8fafc",margin:8,padding:6,borderRadius:30,width:"fit-content"}}>
              {[{id:"flights",l:"✈️ Flights"},{id:"stays",l:"🏨 Stays"},{id:"cars",l:"🚗 Cars"},{id:"buses",l:"🚌 Buses"}].map(t=>(
                <button key={t.id} onClick={()=>{setTab(t.id); setShowPax(false);}} style={{height:36,padding:"0 14px",borderRadius:30,border:"none",fontSize:13,fontWeight:700,background:tab===t.id?NAVY:"transparent",color:tab===t.id?"white":"#475569",cursor:"pointer"}}>{t.l}</button>
              ))}
            </div>

            <div style={{padding:"8px 18px 18px"}}>

              {tab==="flights" && (
                <>
                  <div style={{display:"flex",gap:8,marginBottom:12}}>
                    {[{id:"single",l:"Single Trip"},{id:"return",l:"Return"},{id:"multi",l:"Multi-City"}].map(t=>(
                      <button key={t.id} onClick={()=>setTripType(t.id)} style={{height:34,padding:"0 14px",borderRadius:20,border:tripType===t.id?`2px solid ${NAVY}`:"1px solid #cbd5e1",background:tripType===t.id?"#f1f5f9":"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>{t.l}</button>
                    ))}
                  </div>

                  {tripType!=="multi" ? (
                    <>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                        <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>FROM</div><input value={from} onChange={e=>setFrom(e.target.value)} placeholder="JNB" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:800}}/></div>
                        <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>TO</div><input value={to} onChange={e=>setTo(e.target.value)} placeholder="CPT" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:800}}/></div>
                      </div>
                      <div style={{marginTop:10,display:"grid",gridTemplateColumns: tripType==="return"?"1fr 1fr":"1fr 1fr",gap:10}}>
                        <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DEPART</div><input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                        {tripType==="return" && <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>RETURN</div><input type="date" value={returnDate} onChange={e=>setReturnDate(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>}
                      </div>
                    </>
                  ) : (
                    <div style={{display:"grid",gap:10}}>
                      {multiLegs.map((leg,i)=>(
                        <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:8,alignItems:"end"}}>
                          <div><div style={{fontSize:10,fontWeight:700,color:"#64748b"}}>FROM {i+1}</div><input value={leg.from} onChange={e=>{const nl=[...multiLegs]; nl[i].from=e.target.value; setMultiLegs(nl);}} style={{marginTop:2,width:"100%",height:40,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:700,fontSize:13}}/></div>
                          <div><div style={{fontSize:10,fontWeight:700,color:"#64748b"}}>TO {i+1}</div><input value={leg.to} onChange={e=>{const nl=[...multiLegs]; nl[i].to=e.target.value; setMultiLegs(nl);}} style={{marginTop:2,width:"100%",height:40,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:700,fontSize:13}}/></div>
                          <div><div style={{fontSize:10,fontWeight:700,color:"#64748b"}}>DATE</div><input type="date" value={leg.date} onChange={e=>{const nl=[...multiLegs]; nl[i].date=e.target.value; setMultiLegs(nl);}} style={{marginTop:2,width:"100%",height:40,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontSize:12}}/></div>
                          <button onClick={()=>{if(multiLegs.length>2)setMultiLegs(multiLegs.filter((_,idx)=>idx!==i))}} style={{height:40,width:30,borderRadius:8,border:"1px solid #fecaca",background:"#fef2f2",cursor:"pointer"}}>✕</button>
                        </div>
                      ))}
                      <button onClick={()=>{if(multiLegs.length<5)setMultiLegs([...multiLegs,{from:"",to:"",date:"2026-10-20"}])}} style={{height:36,borderRadius:10,border:"1px dashed #94a3b8",background:"white",fontWeight:700,fontSize:12,cursor:"pointer"}}>+ Add another flight (max 5)</button>
                    </div>
                  )}

                  <div style={{marginTop:12,position:"relative"}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>PASSENGERS • Adult / Child / Infant</div>
                    <button onClick={()=>setShowPax(!showPax)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",textAlign:"left",background:"white",fontWeight:700,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
                      <span>{adults} Adult{adults!==1?"s":""} • {children} Child{children!==1?"ren":""} • {infants} Infant{infants!==1?"s":""}</span><span>▼</span>
                    </button>
                    {showPax && (
                      <div style={{position:"absolute",zIndex:10,top:68,left:0,right:0,background:"white",border:"1px solid #e2e8f0",borderRadius:14,padding:12,boxShadow:"0 10px 30px rgba(0,0,0,0.1)",display:"grid",gap:12}}>
                        {[
                          {label:"Adults",sub:"18+ years",val:adults,set:setAdults,min:1},
                          {label:"Children",sub:"2-17 years • 25% OFF",val:children,set:setChildren,min:0},
                          {label:"Infants",sub:"Under 2 • R150 flat",val:infants,set:setInfants,min:0},
                        ].map(r=>(
                          <div key={r.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div><div style={{fontWeight:700,fontSize:13}}>{r.label}</div><div style={{fontSize:10,color:"#64748b"}}>{r.sub}</div></div>
                            <div style={{display:"flex",alignItems:"center",gap:10}}><button onClick={()=>{if(r.val>r.min){r.set(r.val-1); if(r.label==="Children"){const na=[...childAges]; na.pop(); setChildAges(na);}}}} style={{width:32,height:32,borderRadius:16,border:"1px solid #cbd5e1",background:"white",cursor:"pointer"}}>−</button><div style={{width:24,textAlign:"center",fontWeight:800}}>{r.val}</div><button onClick={()=>{if(r.val<9){r.set(r.val+1); if(r.label==="Children")setChildAges([...childAges,12])}}} style={{width:32,height:32,borderRadius:16,border:`1px solid ${NAVY}`,background:NAVY,color:"white",cursor:"pointer"}}>+</button></div>
                          </div>
                        ))}
                        {children>0 && <div style={{borderTop:"1px solid #f1f5f9",paddingTop:8}}><div style={{fontSize:11,fontWeight:700,color:"#64748b",marginBottom:6}}>CHILD AGES (for airline)</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{Array.from({length:children}).map((_,i)=>(<select key={i} value={childAges[i]||12} onChange={e=>{const na=[...childAges]; na[i]=parseInt(e.target.value); setChildAges(na);}} style={{height:32,borderRadius:8,border:"1px solid #cbd5e1",padding:"0 6px",fontSize:12}}>{Array.from({length:16}).map((_,a)=><option key={a} value={a+2}>{a+2} yrs</option>)}</select>))}</div></div>}
                        <button onClick={()=>setShowPax(false)} style={{height:38,borderRadius:10,border:"none",background:NAVY,color:"white",fontWeight:800,cursor:"pointer"}}>Done • {totalFlightPax} passenger{totalFlightPax!==1?"s":""}</button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {tab==="stays" && (
                <>
                  <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DESTINATION / CITY OR HOTEL NAME</div><input value={dest} onChange={e=>setDest(e.target.value)} placeholder="e.g. Durban, Cape Town, Umhlanga..." style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"2px solid #0A1931",padding:"0 12px",fontWeight:700}}/></div>
                  <div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>CHECK-IN</div><input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>CHECK-OUT</div><input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                  </div>
                  <div style={{marginTop:12,position:"relative"}}>
                    <div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>GUESTS & ROOMS • Adult / Child</div>
                    <button onClick={()=>setShowStayPax(!showStayPax)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",textAlign:"left",background:"white",fontWeight:700,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}><span>{stayRooms} Room{stayRooms!==1?"s":""} • {stayAdults} Adult{stayAdults!==1?"s":""} • {stayChildren} Child{stayChildren!==1?"ren":""}</span><span>▼</span></button>
                    {showStayPax && (
                      <div style={{position:"absolute",zIndex:10,top:68,left:0,right:0,background:"white",border:"1px solid #e2e8f0",borderRadius:14,padding:12,boxShadow:"0 10px 30px rgba(0,0,0,0.1)",display:"grid",gap:12}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:13}}>Rooms</div><div style={{display:"flex",gap:10,alignItems:"center"}}><button onClick={()=>dec(setStayRooms,stayRooms,1)} style={{width:32,height:32,borderRadius:16,border:"1px solid #cbd5e1",background:"white"}}>−</button><div style={{width:20,textAlign:"center",fontWeight:800}}>{stayRooms}</div><button onClick={()=>inc(setStayRooms,stayRooms,5)} style={{width:32,height:32,borderRadius:16,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,fontSize:13}}>Adults</div><div style={{fontSize:10,color:"#64748b"}}>18+ years</div></div><div style={{display:"flex",gap:10,alignItems:"center"}}><button onClick={()=>dec(setStayAdults,stayAdults,1)} style={{width:32,height:32,borderRadius:16,border:"1px solid #cbd5e1",background:"white"}}>−</button><div style={{width:20,textAlign:"center",fontWeight:800}}>{stayAdults}</div><button onClick={()=>inc(setStayAdults,stayAdults,9)} style={{width:32,height:32,borderRadius:16,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontWeight:700,fontSize:13}}>Children</div><div style={{fontSize:10,color:"#64748b"}}>0-17 years</div></div><div style={{display:"flex",gap:10,alignItems:"center"}}><button onClick={()=>{if(stayChildren>0){setStayChildren(stayChildren-1); const na=[...stayChildAges]; na.pop(); setStayChildAges(na);}}} style={{width:32,height:32,borderRadius:16,border:"1px solid #cbd5e1",background:"white"}}>−</button><div style={{width:20,textAlign:"center",fontWeight:800}}>{stayChildren}</div><button onClick={()=>{if(stayChildren<6){setStayChildren(stayChildren+1); setStayChildAges([...stayChildAges,8])}}} style={{width:32,height:32,borderRadius:16,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div>
                        {stayChildren>0 && <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>Child ages</div><div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>{Array.from({length:stayChildren}).map((_,i)=>(<select key={i} value={stayChildAges[i]||8} onChange={e=>{const na=[...stayChildAges]; na[i]=parseInt(e.target.value); setStayChildAges(na);}} style={{height:32,borderRadius:8,border:"1px solid #cbd5e1"}}>{Array.from({length:18}).map((_,a)=><option key={a} value={a}>{a} yrs</option>)}</select>))}</div></div>}
                        <button onClick={()=>setShowStayPax(false)} style={{height:38,borderRadius:10,border:"none",background:NAVY,color:"white",fontWeight:800}}>Done</button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {tab==="cars" && (
                <>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>PICK-UP POINT</div><input value={pickUp} onChange={e=>setPickUp(e.target.value)} placeholder="e.g. JNB Airport" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:700}}/></div>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DROP-OFF POINT</div><input value={dropOff} onChange={e=>setDropOff(e.target.value)} placeholder="e.g. CPT Airport" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:700}}/></div>
                  </div>
                  <div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>PICK-UP DATE</div><input type="date" value={pickDate} onChange={e=>setPickDate(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DROP-OFF DATE</div><input type="date" value={dropDate} onChange={e=>setDropDate(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                  </div>
                  <div style={{marginTop:10}}><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DRIVER AGE</div><select style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}><option>26+ Adult driver</option><option>21-25 Young driver</option></select></div>
                </>
              )}

              {tab==="buses" && (
                <>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>FROM (PICK-UP)</div><input value={busFrom} onChange={e=>setBusFrom(e.target.value)} placeholder="e.g. JHB Park Station" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:700}}/></div>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>TO (DESTINATION)</div><input value={busTo} onChange={e=>setBusTo(e.target.value)} placeholder="e.g. CPT Station" style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:700}}/></div>
                  </div>
                  <div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <div><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>DEPART DATE</div><input type="date" value={busDate} onChange={e=>setBusDate(e.target.value)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px"}}/></div>
                    <div style={{position:"relative"}}><div style={{fontSize:11,fontWeight:700,color:"#64748b"}}>PASSENGERS • Adult / Child</div>
                      <button onClick={()=>setShowBusPax(!showBusPax)} style={{marginTop:4,width:"100%",height:46,borderRadius:12,border:"1px solid #cbd5e1",padding:"0 12px",textAlign:"left",background:"white",fontWeight:700,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span>{busAdults} Adult • {busChildren} Child</span><span>▼</span></button>
                      {showBusPax && (
                        <div style={{position:"absolute",zIndex:10,top:68,left:0,right:0,background:"white",border:"1px solid #e2e8f0",borderRadius:14,padding:12,boxShadow:"0 10px 30px rgba(0,0,0,0.1)",display:"grid",gap:10}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:13}}>Adults<br/><span style={{fontSize:10,color:"#64748b"}}>12+ years</span></div><div style={{display:"flex",gap:10,alignItems:"center"}}><button onClick={()=>dec(setBusAdults,busAdults,1)} style={{width:32,height:32,borderRadius:16,border:"1px solid #cbd5e1",background:"white"}}>−</button><div style={{width:20,textAlign:"center",fontWeight:800}}>{busAdults}</div><button onClick={()=>inc(setBusAdults,busAdults,8)} style={{width:32,height:32,borderRadius:16,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:13}}>Children<br/><span style={{fontSize:10,color:"#64748b"}}>2-11 years • 20% OFF</span></div><div style={{display:"flex",gap:10,alignItems:"center"}}><button onClick={()=>{if(busChildren>0){setBusChildren(busChildren-1); const na=[...busChildAges]; na.pop(); setBusChildAges(na);}}} style={{width:32,height:32,borderRadius:16,border:"1px solid #cbd5e1",background:"white"}}>−</button><div style={{width:20,textAlign:"center",fontWeight:800}}>{busChildren}</div><button onClick={()=>{if(busChildren<8){setBusChildren(busChildren+1); setBusChildAges([...busChildAges,8])}}} style={{width:32,height:32,borderRadius:16,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div>
                          {busChildren>0 && <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{Array.from({length:busChildren}).map((_,i)=>(<select key={i} value={busChildAges[i]||8} onChange={e=>{const na=[...busChildAges]; na[i]=parseInt(e.target.value); setBusChildAges(na);}} style={{height:32,borderRadius:8,border:"1px solid #cbd5e1",fontSize:12}}>{Array.from({length:10}).map((_,a)=><option key={a} value={a+2}>{a+2} yrs</option>)}</select>))}</div>}
                          <button onClick={()=>setShowBusPax(false)} style={{height:36,borderRadius:10,border:"none",background:NAVY,color:"white",fontWeight:800}}>Done • {totalBusPax} passenger{totalBusPax!==1?"s":""}</button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <button onClick={doSearch} style={{marginTop:18,width:"100%",height:52,borderRadius:30,border:"none",background:GOLD,color:NAVY,fontWeight:900,fontSize:15,cursor:"pointer"}}>
                {tab==="flights" ? (tripType==="single"?`Search one-way • ${totalFlightPax} pax →` : tripType==="return"?`Search return • ${totalFlightPax} pax →` : `Search ${multiLegs.length} flights • ${totalFlightPax} pax →`) : tab==="stays" ? `Search stays in ${dest||"SA"} • ${totalStayGuests} guests →` : tab==="cars" ? `Search cars ${pickUp} → ${dropOff} →` : `Search buses • ${totalBusPax} pax →`}
              </button>
            </div>
          </div>

          <div style={{background:NAVY,borderRadius:22,padding:18,color:"white",height:"fit-content"}}>
            <div style={{fontSize:11,letterSpacing:1,opacity:0.6,fontWeight:700}}>SECURE PAYMENTS</div>
            <div style={{marginTop:8,fontSize:26,fontWeight:900,lineHeight:1.1}}>Pay with Card or EFT — Secured.</div>
            <div style={{marginTop:8,fontSize:12,opacity:0.8}}>All payments protected by Paystack. Test mode — Live coming soon</div>
            <div style={{marginTop:14,background:"rgba(255,255,255,0.08)",borderRadius:12,padding:12,fontSize:11}}><b>Current selection:</b><br/>
              {tab==="flights" && `${tripType.toUpperCase()} • ${from}→${to} ${tripType==="return"?`↔ ${returnDate}`: tripType==="multi"?`+ ${multiLegs.length-1} more`:date} • ${adults}A ${children>0?`+ ${children}C`:""} ${infants>0?`+ ${infants}I`:""} • ${childAges.length>0?`Ages: ${childAges.join(", ")}`:""}`}
              {tab==="stays" && `${dest||"South Africa"} • ${checkIn}→${checkOut} • ${stayRooms} room • ${stayAdults}A ${stayChildren>0?`+ ${stayChildren}C ${stayChildAges.join(", ")}yrs`:""}`}
              {tab==="cars" && `${pickUp} → ${dropOff} • ${pickDate}→${dropDate}`}
              {tab==="buses" && `${busFrom} → ${busTo} • ${busDate} • ${busAdults}A ${busChildren>0?`+ ${busChildren}C`:""}`}
            </div>
            <div style={{marginTop:16,display:"grid",gap:10}}>
              {["Visa / Mastercard via Paystack","Child & Adult fares auto-calculated","PCI DSS secure — 3D Secure","E-ticket instant"].map((t,i)=>(<div key={i} style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:12,display:"flex",gap:10,alignItems:"center"}}><div style={{width:24,height:24,borderRadius:12,background:GOLD,color:NAVY,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:11}}>✓</div><div style={{fontSize:12,fontWeight:500}}>{t}</div></div>))}
            </div>
          </div>
        </div>

        <div id="results" style={{marginTop:26}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <h2 style={{fontWeight:900,fontSize:18,color:NAVY}}>
              {tab==="flights" ? `${tripType==="single"?"One-way": tripType==="return"?"Return":`Multi-City (${multiLegs.length})`} Flights • ${totalFlightPax} passenger${totalFlightPax!==1?"s":""} • ${adults}A ${children>0?`+ ${children}C`:""}` :
               tab==="stays" ? `Stays in ${dest||"South Africa"} • ${totalStayGuests} guests • ${stayRooms} room${stayRooms!==1?"s":""}` :
               tab==="cars" ? `Cars • ${pickUp} → ${dropOff}` : `Buses • ${busFrom} → ${busTo} • ${totalBusPax} pax`} • ZAR
            </h2>
            <span style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:"#dcfce7",color:"#166534",fontWeight:700}}>Secure</span>
          </div>

          <div style={{marginTop:12,display:"grid",gap:10}}>
            {(tab==="stays"?filteredStays:tab==="flights"?filteredFlights:tab==="cars"?filteredCars:filteredBuses).map(item=>(
              <div key={item.id} style={{background:"white",border:"1px solid #e2e8f0",borderRadius:18,padding:14,display:"flex",justifyContent:"space-between",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{width:40,height:40,borderRadius:20,background:"#0f172a",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:12}}>{(item.airline?.[0]||item.name?.[0]||item.company?.[0]||"K")}</div>
                  <div>
                    <div style={{fontWeight:800,fontSize:14}}>{item.name || `${item.company||item.airline} • ${item.from||""} → ${item.to||""}`}</div>
                    <div style={{fontSize:11,color:"#64748b"}}>{item.loc||item.type||`${item.dur||""} • ${item.stops||""} • ${item.dep||""}→${item.arr||""}`}</div>
                    {tab==="flights" && totalFlightPax>1 && <div style={{fontSize:10,color:NAVY,fontWeight:700,marginTop:2}}>{adults} Adult • {children>0?`${children} Child (${childAges.join("yrs, ")}yrs) • `:""}{infants>0?`${infants} Infant`:""} {tripType==="return"?"• Return":""} {tripType==="multi"?`• ${multiLegs.length} flights`:""}</div>}
                  </div>
                </div>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#94a3b8",textDecoration:"line-through"}}>R{item.original}</div><div style={{fontWeight:900,fontSize:18,color:NAVY}}>R{item.price}{tab==="flights"&&totalFlightPax>1?" pp":""}</div><div style={{fontSize:10,color:"#64748b"}}>{tab==="flights"&&totalFlightPax>1?`Total ~R${item.price*adults + Math.round(item.price*0.75*children) + infants*150}`:""}</div>{item.badge&&<div style={{fontSize:10,fontWeight:900,background:GOLD,color:NAVY,padding:"2px 8px",borderRadius:10,display:"inline-block"}}>SAVE R50</div>}</div>
                  <button onClick={()=>openBook(item)} style={{height:40,padding:"0 16px",borderRadius:20,border:"none",background:NAVY,color:"white",fontWeight:800,fontSize:13,cursor:"pointer"}}>Book & Pay</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && selected && (
        <div style={{position:"fixed",inset:0,zIndex:50,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{width:"100%",maxWidth:520,background:"white",borderRadius:"24px 24px 0 0",maxHeight:"92vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <div style={{background:NAVY,padding:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{color:"white"}}><div style={{fontWeight:900}}>Secure Booking — khilanetravel.co.za</div><div style={{fontSize:11,opacity:0.7,fontFamily:"monospace"}}>{ref} • R{step===3&&tab==="flights"?calcFlightTotal():selected.price} • {tab} • {totalFlightPax>0?`${totalFlightPax} pax`:""}</div></div>
              <button onClick={()=>setShowModal(false)} style={{width:32,height:32,borderRadius:16,background:"rgba(255,255,255,0.15)",color:"white",border:"none",cursor:"pointer"}}>✕</button>
            </div>
            <div style={{padding:16,overflowY:"auto",display:"grid",gap:14}}>
              {step===1 && <div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:16,padding:14}}><div style={{fontSize:12,fontWeight:800,color:"#64748b"}}>STEP 1 • SUMMARY</div><div style={{marginTop:6,fontWeight:800}}>{selected.name||selected.airline||selected.company} — R{selected.price} {tab==="flights"&&totalFlightPax>1?"pp":""}</div><div style={{marginTop:6,fontSize:12,color:"#475569"}}>
                {tab==="flights" && <><div>{tripType.toUpperCase()} {from} → {to} {tripType==="return"?`+ Return ${returnDate}`:""} {tripType==="multi"?multiLegs.map(l=>`${l.from}→${l.to} ${l.date}`).join(", "):date}</div><div style={{marginTop:4,fontWeight:700}}>{adults} Adult • {children} Child {childAges.length>0?`(${childAges.join("yrs, ")}yrs)`:""} • {infants} Infant • Total pax {totalFlightPax}</div><div style={{marginTop:4,color:NAVY,fontWeight:800}}>Total: R{calcFlightTotal()} (Child 25% OFF, Infant R150)</div></>}
                {tab==="stays" && `${dest||selected.city} • ${checkIn}→${checkOut} • ${stayRooms} room • ${stayAdults} Adults ${stayChildren>0?`+ ${stayChildren} Children (${stayChildAges.join(", ")}yrs)`:""}`}
                {tab==="cars" && `${pickUp} → ${dropOff} • ${pickDate}→${dropDate}`}
                {tab==="buses" && `${busFrom} → ${busTo} • ${busDate} • ${busAdults} Adults ${busChildren>0?`+ ${busChildren} Children (${busChildAges.join(", ")}yrs)`:""}`}
              </div></div>}
              {step===2 && <div style={{display:"grid",gap:10}}><div style={{fontSize:12,fontWeight:800}}>STEP 2 • TRAVELLERS — Enter Child / Adult Details</div>
                {Array.from({length:totalFlightPax||totalStayGuests||totalBusPax||1}).slice(0,6).map((_,i)=>(
                  <div key={i} style={{border:"1px solid #e2e8f0",borderRadius:12,padding:10,display:"grid",gap:6}}>
                    <div style={{fontSize:11,fontWeight:800,color:NAVY}}>{i < adults || i < stayAdults || i < busAdults ? `Adult ${i+1}` : i < (adults||stayAdults||busAdults)+(children||stayChildren||busChildren) ? `Child ${i-(adults||stayAdults||busAdults)+1} • ${(childAges[i-(adults||stayAdults||busAdults)]||stayChildAges[i-(stayAdults)]||busChildAges[i-(busAdults)]||"12")} yrs` : `Infant ${i-(adults||0)-(children||0)+1}`}</div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}><input placeholder="First Name" style={{height:36,borderRadius:8,border:"1px solid #cbd5e1",padding:"0 10px",fontSize:12}}/><input placeholder="Last Name" style={{height:36,borderRadius:8,border:"1px solid #cbd5e1",padding:"0 10px",fontSize:12}}/></div>
                    {i===0 && <><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email for e-ticket" style={{height:36,borderRadius:8,border:"1px solid #cbd5e1",padding:"0 10px",fontSize:12}}/><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone" style={{height:36,borderRadius:8,border:"1px solid #cbd5e1",padding:"0 10px",fontSize:12}}/></>}
                  </div>
                ))}
              </div>}
              {step===3 && <div style={{display:"grid",gap:10}}><div style={{fontSize:12,fontWeight:800}}>STEP 3 • PAYMENT — R{tab==="flights"?calcFlightTotal():selected.price}</div>
                <button onClick={()=>setPay("card")} style={{textAlign:"left",padding:12,borderRadius:12,border:pay==="card"?`2px solid ${NAVY}`:"1px solid #e2e8f0",background:pay==="card"?"#f8faff":"white"}}><div style={{fontWeight:700,fontSize:13}}>Pay with Card (Paystack) ✓</div><div style={{fontSize:11,color:"#64748b"}}>Total R{tab==="flights"?calcFlightTotal():selected.price} • Instant</div></button>
                <button onClick={()=>setPay("eft")} style={{textAlign:"left",padding:12,borderRadius:12,border:pay==="eft"?`2px solid ${NAVY}`:"1px solid #e2e8f0",background:pay==="eft"?"#f8faff":"white"}}><div style={{fontWeight:700,fontSize:13}}>Manual EFT — Nedbank (Private)</div></button>
                {pay==="eft" && <div style={{background:"#fef3c7",border:"1px solid #fde68a",borderRadius:16,padding:14}}><div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontWeight:800,fontSize:13}}>EFT Private</div><button onClick={copy} style={{height:32,padding:"0 12px",borderRadius:20,background:"white",border:"1px solid #e2e8f0",fontSize:11,fontWeight:700}}>{copied?"Copied!":"Copy"}</button></div><div style={{marginTop:10,fontSize:12}}>Holder: MG Gwala • Bank: Nedbank<br/>Acc: 1044602244 • Branch: 198765 • CA<br/>Ref: <b>{ref}</b> • Amount R{tab==="flights"?calcFlightTotal():selected.price}</div></div>}
              </div>}
              {step===4 && <div style={{textAlign:"center",padding:"14px 0"}}><div style={{width:70,height:70,borderRadius:35,background:GOLD,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontWeight:900,color:NAVY}}>✓</div><div style={{marginTop:10,fontWeight:900,fontSize:20,color:NAVY}}>Booking Confirmed!</div><div style={{marginTop:8,display:"inline-block",padding:"6px 14px",borderRadius:20,background:"#0f172a",color:"white",fontFamily:"monospace",fontSize:13}}>{ref}</div><div style={{marginTop:10,fontSize:12,color:"#475569"}}>E-ticket sent to {form.email||"your email"}<br/>{tab==="flights"?`${adults}A ${children>0?`+ ${children}C`:""} ${infants>0?`+ ${infants}I`:""} • ${tripType} • Total R${calcFlightTotal()}`:""}</div></div>}
            </div>
            <div style={{padding:14,borderTop:"1px solid #e2e8f0",display:"flex",gap:10,background:"white"}}>
              {step>1&&step<4&&<button onClick={()=>setStep(step-1)} style={{height:46,flex:1,borderRadius:22,border:"1px solid #cbd5e1",background:"white",fontWeight:700}}>Back</button>}
              {step<3&&<button onClick={()=>setStep(step+1)} style={{height:46,flex:2,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>Continue — R{tab==="flights"?calcFlightTotal():selected.price}</button>}
              {step===3&&pay==="card"&&<button onClick={payWithPaystack} style={{height:46,flex:2,borderRadius:22,border:"none",background:GOLD,color:NAVY,fontWeight:900}}>Pay R{tab==="flights"?calcFlightTotal():selected.price} Card</button>}
              {step===3&&pay==="eft"&&<button onClick={()=>setStep(4)} style={{height:46,flex:2,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>I Have Paid — Confirm</button>}
              {step===4&&<button onClick={()=>setShowModal(false)} style={{height:46,width:"100%",borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>Done</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
