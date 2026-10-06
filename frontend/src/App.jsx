import React, { useState, useEffect } from "react";
const NAVY="#0A1931"; const GOLD="#facc15"; const PAYSTACK_KEY="pk_test_162b0d185673f14112b09d1ed6f3a9d6fbfa7";
const API="https://khilane-api.onrender.com";
const FLIGHTS=[{id:1,airline:"FlySafair",from:"JNB",to:"CPT",dep:"06:15",arr:"08:25",dur:"2h 10m",stops:"Direct",price:864,original:914,badge:true},{id:2,airline:"Airlink",from:"JNB",to:"CPT",dep:"08:40",arr:"10:55",dur:"2h 15m",stops:"Direct",price:902,original:952,badge:true},{id:3,airline:"CemAir",from:"DUR",to:"JNB",dep:"11:10",arr:"12:30",dur:"1h 20m",stops:"Direct",price:945,original:995,badge:false}];
const STAYS_ALL=[
{id:101,name:"Beverly Hills Hotel",loc:"Umhlanga Rocks, Durban",city:"Durban",rating:"4.8",price:2850,original:3200,tag:"Beachfront",badge:true,region:"KZN"},
{id:102,name:"The Oyster Box",loc:"Umhlanga Ridge, Durban",city:"Durban",rating:"4.9",price:3450,original:3800,tag:"5-Star",badge:true,region:"KZN"},
{id:103,name:"Sun City Resort",loc:"Sun City",city:"Rustenburg",rating:"4.6",price:1890,original:2100,tag:"Family",badge:false,region:"North West"},
{id:104,name:"Cape Town Marriott",loc:"Foreshore, Cape Town",city:"Cape Town",rating:"4.7",price:2650,original:3000,tag:"City Centre",badge:true,region:"Western Cape"},
{id:105,name:"Premier Hotel Richards Bay",loc:"Richards Bay Waterfront",city:"Richards Bay",rating:"4.5",price:1950,original:2250,tag:"Waterfront",badge:true,region:"KZN"},
{id:106,name:"BON Hotel Waterfront Richards Bay",loc:"Richards Bay, KZN",city:"Richards Bay",rating:"4.3",price:1650,original:1900,tag:"Business",badge:true,region:"KZN"},
{id:107,name:"Protea Hotel Durban Umhlanga",loc:"Umhlanga, Durban",city:"Durban",rating:"4.4",price:1750,original:2000,tag:"Business",badge:false,region:"KZN"},
{id:108,name:"Southern Sun Elangeni",loc:"Durban Beachfront",city:"Durban",rating:"4.6",price:2250,original:2600,tag:"Beachfront",badge:true,region:"KZN"},
];
const CARS=[{id:201,name:"Toyota Corolla Quest",company:"Avis",type:"Sedan Manual",price:489,original:539,badge:true},{id:202,name:"VW Polo Vivo",company:"Budget",type:"Hatch Manual",price:425,original:475,badge:true},{id:203,name:"Toyota Fortuner",company:"Hertz",type:"SUV Auto 7 seats",price:1150,original:1220,badge:false}];
const BUSES=[{id:301,company:"Intercape",from:"Johannesburg Park Station",to:"Cape Town Station",dep:"18:00",arr:"12:30+1",dur:"18h 30m",price:685,original:735,badge:true,type:"Sleepliner"},{id:302,company:"Greyhound",from:"Pretoria Bosman",to:"Durban Central",dep:"20:15",arr:"06:45+1",dur:"10h 30m",price:520,original:570,badge:true,type:"Dreamliner"}];

export default function App(){
  const [isAdmin,setIsAdmin]=useState(false); const [adminTab,setAdminTab]=useState("Dashboard");
  useEffect(()=>{ const p=window.location.pathname.toLowerCase(); const s=window.location.search.toLowerCase(); const h=window.location.hash.toLowerCase(); if(p.includes("admin")||s.includes("admin")||s.includes("khilane")||h.includes("admin")) setIsAdmin(true); },[]);
  const [tab,setTab]=useState("stays"); // default to stays to test your issue
  const [tripType,setTripType]=useState("single");
  const [from,setFrom]=useState("JNB"); const [to,setTo]=useState("CPT"); const [date,setDate]=useState("2026-10-15"); const [returnDate,setReturnDate]=useState("2026-10-20");
  const [adults,setAdults]=useState(1); const [children,setChildren]=useState(0); const [infants,setInfants]=useState(0); const [childAges,setChildAges]=useState([]);
  const [multiLegs,setMultiLegs]=useState([{from:"JNB",to:"CPT",date:"2026-10-15"},{from:"CPT",to:"DUR",date:"2026-10-18"}]);
  const [dest,setDest]=useState("Richards Bay"); const [checkIn,setCheckIn]=useState("2026-10-15"); const [checkOut,setCheckOut]=useState("2026-10-17"); const [stayAdults,setStayAdults]=useState(2); const [stayChildren,setStayChildren]=useState(0); const [stayRooms,setStayRooms]=useState(1); const [stayChildAges,setStayChildAges]=useState([]);
  const [pickUp,setPickUp]=useState("JNB Airport"); const [dropOff,setDropOff]=useState("CPT Airport"); const [pickDate,setPickDate]=useState("2026-10-15"); const [dropDate,setDropDate]=useState("2026-10-18");
  const [busFrom,setBusFrom]=useState("Johannesburg Park Station"); const [busTo,setBusTo]=useState("Cape Town Station"); const [busDate,setBusDate]=useState("2026-10-15"); const [busAdults,setBusAdults]=useState(1); const [busChildren,setBusChildren]=useState(0);
  const [filteredFlights,setFilteredFlights]=useState(FLIGHTS); const [filteredStays,setFilteredStays]=useState(STAYS_ALL); const [filteredCars,setFilteredCars]=useState(CARS); const [filteredBuses,setFilteredBuses]=useState(BUSES);
  const [showPax,setShowPax]=useState(false); const [showStayPax,setShowStayPax]=useState(false);
  const [showModal,setShowModal]=useState(false); const [selected,setSelected]=useState(null); const [step,setStep]=useState(1); const [ref,setRef]=useState(""); const [form,setForm]=useState({firstName:"",lastName:"",email:"",phone:""}); const [pay,setPay]=useState("card"); const [copied,setCopied]=useState(false); const [stayMsg,setStayMsg]=useState("");
  const totalFlightPax=adults+children+infants; const totalStayGuests=stayAdults+stayChildren;
  const calcFlightTotal=()=>{ if(!selected) return 0; return adults*selected.price + Math.round(children*selected.price*0.75) + infants*150; };
  const calcStayTotal=()=>{ if(!selected) return 0; const nights=Math.max(1,Math.ceil((new Date(checkOut)-new Date(checkIn))/(1000*60*60*24))); return selected.price*nights*stayRooms; };
  const doSearch=()=>{
    if(tab==="stays"){
      const q=dest.trim().toLowerCase();
      if(!q){ setFilteredStays(STAYS_ALL); setStayMsg("Showing all stays in South Africa"); }
      else {
        let res=STAYS_ALL.filter(s=>s.city.toLowerCase().includes(q)||s.loc.toLowerCase().includes(q)||s.name.toLowerCase().includes(q)||s.region.toLowerCase().includes(q));
        if(res.length===0){
          // RESPONSIVE FIX: If no exact match, show nearby KZN or all with message
          if(q.includes("richards")||q.includes("bay")){ res=STAYS_ALL.filter(s=>s.city==="Richards Bay"||s.region==="KZN"); setStayMsg(`No exact match for "${dest}" — showing stays in Richards Bay & KZN (nearest)`); }
          else { res=STAYS_ALL; setStayMsg(`No exact match for "${dest}" — showing all South African stays`); }
        } else {
          setStayMsg(`Showing ${res.length} stays in ${dest} • ${totalStayGuests} guests • ${stayRooms} room${stayRooms>1?'s':''}`);
        }
        setFilteredStays(res);
      }
    }
    if(tab==="flights"){ setFilteredFlights(FLIGHTS); }
    setTimeout(()=>document.getElementById("results")?.scrollIntoView({behavior:"smooth"}),100);
  };
  // Auto search stays when page loads if dest is Richards Bay
  useEffect(()=>{ if(tab==="stays"&&dest.toLowerCase().includes("richards")) doSearch(); },[]);
  const openBook=(item)=>{ setSelected(item); setStep(1); setShowModal(true); setRef(`BK-2026-${Math.floor(1000+Math.random()*9000)}`); };
  const copy=()=>{ navigator.clipboard?.writeText(`Nedbank MG Gwala 1044602244 Branch 198765 CA Ref ${ref}`); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  const payWithPaystack=()=>{ if(!window.PaystackPop){ alert("Paystack loading..."); return; } const total=tab==="flights"?calcFlightTotal():tab==="stays"?calcStayTotal():selected.price; const handler=window.PaystackPop.setup({ key:PAYSTACK_KEY, email:form.email||"customer@khilanetravel.co.za", amount:total*100, currency:"ZAR", ref:ref, callback:()=>setStep(4), onClose:()=>{} }); handler.openIframe(); };

  if(isAdmin){
    return(
      <div style={{display:"flex",minHeight:"100vh",background:"#f1f5f9",fontFamily:"Outfit"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&display=swap');*{font-family:Outfit}`}</style>
        <div style={{width:260,background:NAVY,color:"white",padding:20}}><div style={{fontWeight:900,color:GOLD,fontSize:20}}>KHILANE OS<br/><span style={{fontSize:11,color:"white",opacity:0.6}}>Secret Admin • /admin</span></div>{['Dashboard','Bookings','Finance','Payroll','Bookkeeper','SARS','Staff','FNB Bank'].map(m=><div key={m} onClick={()=>setAdminTab(m)} style={{padding:'12px 14px',borderRadius:10,marginBottom:6,cursor:"pointer",background:adminTab===m?GOLD:"rgba(255,255,255,.08)",color:adminTab===m?NAVY:"white",fontWeight:700}}>{m}</div>)}<button onClick={()=>{setIsAdmin(false); window.history.pushState({},'','/');}} style={{marginTop:20,width:'100%',padding:10,borderRadius:999,border:'none',background:'white',fontWeight:800}}>← Back to Website</button></div>
        <div style={{flex:1,padding:24}}><h1 style={{fontWeight:900,fontSize:28,color:NAVY,margin:0}}>{adminTab}</h1><div style={{marginTop:20,background:"white",padding:18,borderRadius:14}}>Admin OS Live • Backend {API} • Price Beat R20 • FNB 1044602244</div></div>
      </div>
    )
  }

  return(
    <div style={{minHeight:"100vh",background:"#f1f5f9",fontFamily:"Outfit, Inter, system-ui"}}>
      <script src="https://js.paystack.co/v1/inline.js"></script>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&display=swap');*{font-family:Outfit}`}</style>
      <div style={{background:NAVY,color:"white",padding:"14px 3%",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:40,height:40,background:"white",color:NAVY,display:"grid",placeItems:"center",borderRadius:12,fontWeight:900,fontSize:20}}>K</div><div style={{fontWeight:900,color:GOLD}}>KHILANE TRAVEL</div></div>
        <div style={{display:"flex",gap:14,fontWeight:700,fontSize:13}}>{[{id:"flights",l:"Flights"},{id:"stays",l:"Stays"},{id:"cars",l:"Cars"},{id:"buses",l:"Buses"}].map(k=><span key={k.id} onClick={()=>setTab(k.id)} style={{cursor:"pointer",paddingBottom:3,borderBottom:tab===k.id?`3px solid ${GOLD}`:"none",color:tab===k.id?GOLD:"white"}}>{k.l}</span>)}</div>
        <div style={{background:GOLD,color:NAVY,padding:"6px 14px",borderRadius:999,fontWeight:900,fontSize:11}}>R20 PRICE BEAT</div>
      </div>
      <div style={{background:GOLD,textAlign:"center",padding:"10px",fontWeight:900,fontSize:12,color:NAVY}}>🇿🇦 khilanetravel.co.za — PROUDLY SOUTH AFRICAN — LOWEST PRICES GUARANTEED — BEAT BY R20 🇿🇦</div>
      <div style={{minHeight:420,background:`linear-gradient(rgba(10,25,49,0.45),rgba(10,25,49,0.55)),url('https://images.unsplash.com/photo-1551882547-b79c5d7daf4b?w=1600') center/cover`,display:"flex",alignItems:"center",padding:"0 5%",gap:20,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 300px"}}><h1 style={{color:"white",fontSize:52,fontWeight:900,lineHeight:0.95,margin:0}}>South Africa's<br/>Cheapest<br/>Travel Booking</h1><p style={{color:"white",opacity:0.9,marginTop:12,fontSize:14}}>Flights • Stays • Cars • Buses • Secure ZAR • Paystack protected</p></div>
        <div style={{flex:"0 1 420px",background:"white",borderRadius:20,padding:18,boxShadow:"0 20px 60px rgba(0,0,0,0.3)",width:"100%",maxWidth:460}}>
          <div style={{display:"flex",gap:6,background:"#f1f5f9",padding:5,borderRadius:30,width:"fit-content"}}>{[{id:"flights",l:"✈️ Flights"},{id:"stays",l:"🏨 Stays"},{id:"cars",l:"🚗 Cars"},{id:"buses",l:"🚌 Buses"}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{height:32,padding:"0 12px",borderRadius:30,border:"none",fontSize:12,fontWeight:800,background:tab===t.id?NAVY:"transparent",color:tab===t.id?"white":"#475569",cursor:"pointer"}}>{t.l}</button>)}</div>
          <div style={{marginTop:12}}>
            {tab==="flights" && (<><div style={{display:"flex",gap:6,marginBottom:10}}>{[{id:"single",l:"Single Trip"},{id:"return",l:"Return"},{id:"multi",l:"Multi-City"}].map(t=><button key={t.id} onClick={()=>setTripType(t.id)} style={{height:30,padding:"0 10px",borderRadius:20,border:tripType===t.id?`2px solid ${NAVY}`:"1px solid #cbd5e1",background:tripType===t.id?"#f1f5f9":"white",fontWeight:700,fontSize:11,cursor:"pointer"}}>{t.l}</button>)}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input value={from} onChange={e=>setFrom(e.target.value)} placeholder="FROM JNB" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:800}}/><input value={to} onChange={e=>setTo(e.target.value)} placeholder="TO CPT" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:800}}/></div><div style={{marginTop:8,display:"grid",gridTemplateColumns:tripType==="return"?"1fr 1fr":"1fr",gap:8}}><input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/>{tripType==="return"&&<input type="date" value={returnDate} onChange={e=>setReturnDate(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/>}</div><div style={{marginTop:10,position:"relative"}}><button onClick={()=>setShowPax(!showPax)} style={{width:"100%",height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",textAlign:"left",background:"white",fontWeight:700,fontSize:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span>{adults}A {children>0?`• ${children}C`:""} {infants>0?`• ${infants}I`:""} — Child/Adult</span><span>▼</span></button>{showPax&&<div style={{position:"absolute",zIndex:30,top:46,left:0,right:0,background:"white",border:"1px solid #e2e8f0",borderRadius:14,padding:12,boxShadow:"0 10px 30px rgba(0,0,0,0.15)",display:"grid",gap:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:12}}>Adults 18+ yrs</div><div style={{display:"flex",gap:8,alignItems:"center"}}><button onClick={()=>{if(adults>1)setAdults(adults-1)}} style={{width:28,height:28,borderRadius:14,border:"1px solid #cbd5e1",background:"white"}}>−</button><b>{adults}</b><button onClick={()=>setAdults(adults+1)} style={{width:28,height:28,borderRadius:14,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:12}}>Children 2-17 yrs • 25% OFF</div><div style={{display:"flex",gap:8,alignItems:"center"}}><button onClick={()=>{if(children>0){setChildren(children-1); const na=[...childAges]; na.pop(); setChildAges(na);}}} style={{width:28,height:28,borderRadius:14,border:"1px solid #cbd5e1",background:"white"}}>−</button><b>{children}</b><button onClick={()=>{setChildren(children+1); setChildAges([...childAges,12])}} style={{width:28,height:28,borderRadius:14,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div><button onClick={()=>setShowPax(false)} style={{height:34,borderRadius:10,border:"none",background:NAVY,color:"white",fontWeight:800,fontSize:12}}>Done • {adults+children+infants} pax</button></div>}</div></>)}
            {tab==="stays" && (
              <>
                <input value={dest} onChange={e=>setDest(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") doSearch();}} placeholder="Destination e.g. Richards Bay, Durban" style={{width:"100%",height:42,borderRadius:10,border:`2px solid ${NAVY}`,padding:"0 10px",fontWeight:700}}/>
                <div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/><input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/></div>
                <div style={{marginTop:10,position:"relative"}}>
                  <button onClick={()=>setShowStayPax(!showStayPax)} style={{width:"100%",height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",textAlign:"left",background:"white",fontWeight:700,fontSize:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span>{stayRooms} Room • {stayAdults}A {stayChildren>0?`• ${stayChildren}C`:""} — Child/Adult</span><span>▼</span>
                  </button>
                  {showStayPax&&<div style={{position:"absolute",zIndex:30,top:46,left:0,right:0,background:"white",border:"1px solid #e2e8f0",borderRadius:14,padding:12,boxShadow:"0 10px 30px rgba(0,0,0,0.15)",display:"grid",gap:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:12}}>Rooms</div><div style={{display:"flex",gap:8,alignItems:"center"}}><button onClick={()=>{if(stayRooms>1)setStayRooms(stayRooms-1)}} style={{width:28,height:28,borderRadius:14,border:"1px solid #cbd5e1",background:"white"}}>−</button><b>{stayRooms}</b><button onClick={()=>setStayRooms(stayRooms+1)} style={{width:28,height:28,borderRadius:14,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:12}}>Adults 18+ yrs</div><div style={{display:"flex",gap:8,alignItems:"center"}}><button onClick={()=>{if(stayAdults>1)setStayAdults(stayAdults-1)}} style={{width:28,height:28,borderRadius:14,border:"1px solid #cbd5e1",background:"white"}}>−</button><b>{stayAdults}</b><button onClick={()=>setStayAdults(stayAdults+1)} style={{width:28,height:28,borderRadius:14,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:12}}>Children 0-17 yrs • Child Rate</div><div style={{display:"flex",gap:8,alignItems:"center"}}><button onClick={()=>{if(stayChildren>0){setStayChildren(stayChildren-1); const na=[...stayChildAges]; na.pop(); setStayChildAges(na);}}} style={{width:28,height:28,borderRadius:14,border:"1px solid #cbd5e1",background:"white"}}>−</button><b>{stayChildren}</b><button onClick={()=>{setStayChildren(stayChildren+1); setStayChildAges([...stayChildAges,8])}} style={{width:28,height:28,borderRadius:14,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div>
                    {stayChildren>0&&<div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{Array.from({length:stayChildren}).map((_,i)=><select key={i} value={stayChildAges[i]||8} onChange={e=>{const na=[...stayChildAges]; na[i]=parseInt(e.target.value); setStayChildAges(na);}} style={{height:28,borderRadius:6,border:"1px solid #cbd5e1",fontSize:11}}><option value={0}>0-2 yrs</option>{Array.from({length:17}).map((_,a)=><option key={a+3} value={a+3}>{a+3} yrs</option>)}</select>)}</div>}
                    <button onClick={()=>setShowStayPax(false)} style={{height:34,borderRadius:10,border:"none",background:NAVY,color:"white",fontWeight:800,fontSize:12}}>Done • {totalStayGuests} guests, {stayRooms} room</button>
                  </div>}
                </div>
              </>
            )}
            {tab==="cars" && (<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input value={pickUp} onChange={e=>setPickUp(e.target.value)} placeholder="Pick-up point" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:700,fontSize:12}}/><input value={dropOff} onChange={e=>setDropOff(e.target.value)} placeholder="Drop-off point" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:700,fontSize:12}}/></div><div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input type="date" value={pickDate} onChange={e=>setPickDate(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/><input type="date" value={dropDate} onChange={e=>setDropDate(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/></div></>)}
            {tab==="buses" && (<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input value={busFrom} onChange={e=>setBusFrom(e.target.value)} placeholder="From (Pick-up)" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:700,fontSize:12}}/><input value={busTo} onChange={e=>setBusTo(e.target.value)} placeholder="To (Destination)" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:700,fontSize:12}}/></div><div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input type="date" value={busDate} onChange={e=>setBusDate(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/><div style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",background:"white",display:"grid",placeItems:"center",fontWeight:700,fontSize:12}}>{busAdults}A</div></div></>)}
            <button onClick={doSearch} style={{marginTop:12,width:"100%",height:46,borderRadius:30,border:"none",background:GOLD,color:NAVY,fontWeight:900,fontSize:13,cursor:"pointer"}}>{tab==="stays"?`Search stays • ${totalStayGuests} guests →`:`Search ${tab} →`}</button>
            <div style={{marginTop:6,textAlign:"center",fontSize:10,color:"#64748b"}}>{stayMsg||"Secure • R20 Price Beat • Instant e-ticket"}</div>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"20px auto",padding:"0 14px"}}>
        <div id="results" style={{background:"white",borderRadius:16,padding:14,border:"1px solid #e2e8f0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}><h2 style={{fontWeight:900,fontSize:16,color:NAVY,margin:0}}>{tab==="stays"?`${dest||"All"} • ${filteredStays.length} stays • ${stayRooms} room • ${totalStayGuests} guests`:`${tab} results`} • ZAR</h2><span style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:"#dcfce7",color:"#166534",fontWeight:700}}>R20 Beat • {tab==="stays"?stayMsg:"Responsive"}</span></div>
          <div style={{marginTop:12,display:"grid",gap:10}}>
            {(tab==="stays"?filteredStays:tab==="flights"?filteredFlights:tab==="cars"?filteredCars:filteredBuses).map(item=>(
              <div key={item.id} style={{border:"1px solid #e2e8f0",borderRadius:14,padding:12,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:36,height:36,borderRadius:18,background:NAVY,color:"white",display:"grid",placeItems:"center",fontWeight:900,fontSize:12}}>{(item.airline?.[0]||item.name?.[0]||item.company?.[0])}</div><div><div style={{fontWeight:800,fontSize:13}}>{item.name||`${item.company||item.airline} • ${item.from||""} → ${item.to||""}`}</div><div style={{fontSize:11,color:"#64748b"}}>{item.loc||item.type||`${item.dur} • ${item.stops}`} • {item.rating?`⭐ ${item.rating}`:""} • {item.tag||""}</div></div></div>
                <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{textAlign:"right"}}><div style={{fontSize:11,textDecoration:"line-through",color:"#94a3b8"}}>R{item.original}</div><div style={{fontWeight:900,fontSize:16,color:NAVY}}>R{item.price}{tab==="stays"?" /night":""}</div>{tab==="stays"&&<div style={{fontSize:10,color:"#64748b"}}>{Math.max(1,Math.ceil((new Date(checkOut)-new Date(checkIn))/(1000*60*60*24)))} nights • {stayRooms} room • Total R{item.price*Math.max(1,Math.ceil((new Date(checkOut)-new Date(checkIn))/(1000*60*60*24)))*stayRooms}</div>}</div><button onClick={()=>openBook(item)} style={{height:36,padding:"0 14px",borderRadius:20,border:"none",background:NAVY,color:"white",fontWeight:800,fontSize:12,cursor:"pointer"}}>Book & Pay</button></div>
              </div>
            ))}
            {tab==="stays"&&filteredStays.length===0&&<div style={{padding:20,textAlign:"center",color:"#64748b",fontSize:13}}>No stays found — try Durban, Richards Bay, Cape Town, Rustenburg</div>}
          </div>
        </div>
      </div>
      {showModal&&selected&&(
        <div style={{position:"fixed",inset:0,zIndex:50,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{width:"100%",maxWidth:520,background:"white",borderRadius:"24px 24px 0 0",maxHeight:"92vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <div style={{background:NAVY,padding:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{color:"white"}}><div style={{fontWeight:900}}>Secure Booking — {ref}</div></div><button onClick={()=>setShowModal(false)} style={{width:32,height:32,borderRadius:16,background:"rgba(255,255,255,0.15)",color:"white",border:"none"}}>✕</button></div>
            <div style={{padding:16,overflowY:"auto",display:"grid",gap:12}}>
              {step===1&&<div style={{background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:14,padding:12}}><div style={{fontSize:12,fontWeight:800,color:"#64748b"}}>STEP 1 • {tab.toUpperCase()} • {tab==="stays"?`${dest} • ${stayRooms} room • ${totalStayGuests} guests • Total R${calcStayTotal()}`:`${from}→${to}`}</div><div style={{marginTop:6,fontWeight:800}}>{selected.name||selected.airline||selected.company} — R{selected.price}{tab==="stays"?" /night":""}</div></div>}
              {step===2&&<div style={{display:"grid",gap:8}}><div style={{fontSize:12,fontWeight:800}}>STEP 2 • GUESTS — {totalStayGuests} guests • {stayAdults}A {stayChildren>0?`+ ${stayChildren}C (${stayChildAges.join(",")}yrs)`:""}</div><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email for e-ticket" style={{width:"100%",height:34,borderRadius:8,border:"1px solid #cbd5e1",padding:"0 8px",fontSize:12}}/><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone" style={{width:"100%",height:34,borderRadius:8,border:"1px solid #cbd5e1",padding:"0 8px",fontSize:12}}/></div>}
              {step===3&&<div style={{display:"grid",gap:10}}><div style={{fontSize:12,fontWeight:800}}>STEP 3 • PAYMENT — R{tab==="stays"?calcStayTotal():tab==="flights"?calcFlightTotal():selected.price}</div><button onClick={()=>setPay("card")} style={{textAlign:"left",padding:12,borderRadius:12,border:pay==="card"?`2px solid ${NAVY}`:"1px solid #e2e8f0",background:pay==="card"?"#f8faff":"white"}}><div style={{fontWeight:700,fontSize:13}}>Pay with Card (Paystack) ✓</div></button><button onClick={()=>setPay("eft")} style={{textAlign:"left",padding:12,borderRadius:12,border:pay==="eft"?`2px solid ${NAVY}`:"1px solid #e2e8f0",background:pay==="eft"?"#f8faff":"white"}}><div style={{fontWeight:700,fontSize:13}}>Manual EFT — Nedbank Private</div></button>{pay==="eft"&&<div style={{background:"#fef3c7",border:"1px solid #fde68a",borderRadius:14,padding:12}}><div style={{fontWeight:800,fontSize:12}}>EFT Private — Secure Checkout Only</div><div style={{marginTop:8,fontSize:12}}>Holder: MG Gwala • Acc: 1044602244 • Branch: 198765 • CA<br/>Ref: <b>{ref}</b> • Amount R{tab==="stays"?calcStayTotal():selected.price}</div></div>}</div>}
              {step===4&&<div style={{textAlign:"center",padding:"14px 0"}}><div style={{width:70,height:70,borderRadius:35,background:GOLD,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontWeight:900,color:NAVY}}>✓</div><div style={{marginTop:10,fontWeight:900,fontSize:20,color:NAVY}}>Booking Confirmed!</div><div style={{marginTop:8,display:"inline-block",padding:"6px 14px",borderRadius:20,background:"#0f172a",color:"white",fontFamily:"monospace",fontSize:13}}>{ref}</div></div>}
            </div>
            <div style={{padding:14,borderTop:"1px solid #e2e8f0",display:"flex",gap:10,background:"white"}}>
              {step>1&&step<4&&<button onClick={()=>setStep(step-1)} style={{height:46,flex:1,borderRadius:22,border:"1px solid #cbd5e1",background:"white",fontWeight:700}}>Back</button>}
              {step<3&&<button onClick={()=>setStep(step+1)} style={{height:46,flex:2,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>Continue</button>}
              {step===3&&pay==="card"&&<button onClick={payWithPaystack} style={{height:46,flex:2,borderRadius:22,border:"none",background:GOLD,color:NAVY,fontWeight:900}}>Pay Card</button>}
              {step===3&&pay==="eft"&&<button onClick={()=>setStep(4)} style={{height:46,flex:2,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>I Have Paid</button>}
              {step===4&&<button onClick={()=>setShowModal(false)} style={{height:46,width:"100%",borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>Done</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
