import React, { useState, useEffect } from "react";
const NAVY="#0A1931"; const GOLD="#facc15"; const PAYSTACK_KEY="pk_test_162b0d185673f14112b09d1ed6f3a9d6fbfa7";
const OWNER_PASSWORD="Bongumenzi1@"; const STAFF_PASSWORD="Bongumenzi1@"; const API_URL="https://khilane-api.onrender.com";
const FLIGHTS=[{id:1,airline:"FlySafair",from:"JNB",to:"CPT",dep:"06:15",arr:"08:25",dur:"2h 10m",stops:"Direct",price:864,original:914},{id:2,airline:"Airlink",from:"JNB",to:"CPT",dep:"08:40",arr:"10:55",dur:"2h 15m",stops:"Direct",price:902,original:952},{id:3,airline:"CemAir",from:"DUR",to:"JNB",dep:"11:10",arr:"12:30",dur:"1h 20m",stops:"Direct",price:945,original:995}];
const STAYS_ALL=[{id:101,name:"Beverly Hills Hotel",loc:"Umhlanga Rocks, Durban",city:"Durban",rating:"4.8",price:2850,original:3200,tag:"Beachfront"},{id:102,name:"The Oyster Box",loc:"Umhlanga Ridge, Durban",city:"Durban",rating:"4.9",price:3450,original:3800,tag:"5-Star"},{id:103,name:"Sun City Resort",loc:"Sun City",city:"Rustenburg",rating:"4.6",price:1890,original:2100,tag:"Family"},{id:104,name:"Cape Town Marriott",loc:"Foreshore, Cape Town",city:"Cape Town",rating:"4.7",price:2650,original:3000,tag:"City Centre"},{id:105,name:"Premier Hotel Richards Bay",loc:"Richards Bay Waterfront",city:"Richards Bay",rating:"4.5",price:1950,original:2250,tag:"Waterfront"},{id:106,name:"BON Hotel Waterfront Richards Bay",loc:"Richards Bay, KZN",city:"Richards Bay",rating:"4.3",price:1650,original:1900,tag:"Business"},{id:107,name:"Protea Hotel Durban Umhlanga",loc:"Umhlanga, Durban",city:"Durban",rating:"4.4",price:1750,original:2000,tag:"Business"},{id:108,name:"Southern Sun Elangeni",loc:"Durban Beachfront",city:"Durban",rating:"4.6",price:2250,original:2600,tag:"Beachfront"}];
const CARS=[{id:201,name:"Toyota Corolla Quest",company:"Avis",type:"Sedan Manual",price:489,original:539},{id:202,name:"VW Polo Vivo",company:"Budget",type:"Hatch Manual",price:425,original:475},{id:203,name:"Toyota Fortuner",company:"Hertz",type:"SUV Auto 7 seats",price:1150,original:1220}];
const BUSES=[{id:301,company:"Intercape",from:"Johannesburg Park Station",to:"Cape Town Station",dep:"18:00",arr:"12:30+1",dur:"18h 30m",price:685,original:735,type:"Sleepliner"},{id:302,company:"Greyhound",from:"Pretoria Bosman",to:"Durban Central",dep:"20:15",arr:"06:45+1",dur:"10h 30m",price:520,original:570,type:"Dreamliner"}];

export default function App(){
  const [isAdminPage,setIsAdminPage]=useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [role,setRole]=useState(""); // owner or staff
  const [adminTab,setAdminTab]=useState("Dashboard");
  const [loginForm,setLoginForm]=useState({username:"",password:""});
  const [loginError,setLoginError]=useState("");
  
  useEffect(()=>{
    const p=window.location.pathname.toLowerCase(); const s=window.location.search.toLowerCase(); const h=window.location.hash.toLowerCase();
    if(p.includes("admin")||s.includes("admin")||h.includes("admin")) setIsAdminPage(true);
    const saved=localStorage.getItem("khilane_admin_role");
    const savedToken=localStorage.getItem("khilane_admin_token");
    if(saved && savedToken===OWNER_PASSWORD){ setIsLoggedIn(true); setRole(saved); setIsAdminPage(true); }
    if(saved==="staff" && savedToken===STAFF_PASSWORD){ setIsLoggedIn(true); setRole("staff"); setIsAdminPage(true); }
  },[]);

  const handleLogin=()=>{
    const u=loginForm.username.toLowerCase().trim();
    const pw=loginForm.password;
    setLoginError("");
    if(pw!==OWNER_PASSWORD && pw!==STAFF_PASSWORD){ setLoginError("Wrong password. Use Bongumenzi1@"); return; }
    // Owner: username owner/admin/mthoko/mthokozisi or empty or MG
    if(pw===OWNER_PASSWORD && (u===""||u==="owner"||u==="admin"||u==="mthoko"||u==="mthokozisi"||u==="mg"||u==="mg gwala"||u.includes("owner"))){
      setRole("owner"); setIsLoggedIn(true); localStorage.setItem("khilane_admin_role","owner"); localStorage.setItem("khilane_admin_token",OWNER_PASSWORD); setLoginError(""); return;
    }
    // Staff: username staff/agent/bookings
    if(u==="staff"||u==="agent"||u==="bookings"||u==="support"){
      setRole("staff"); setIsLoggedIn(true); localStorage.setItem("khilane_admin_role","staff"); localStorage.setItem("khilane_admin_token",STAFF_PASSWORD); setLoginError(""); return;
    }
    // If password correct but username ambiguous, treat as owner if owner password used, staff if staff username typed
    if(pw===OWNER_PASSWORD){
      // default owner
      setRole("owner"); setIsLoggedIn(true); localStorage.setItem("khilane_admin_role","owner"); localStorage.setItem("khilane_admin_token",OWNER_PASSWORD);
    } else {
      setRole("staff"); setIsLoggedIn(true); localStorage.setItem("khilane_admin_role","staff"); localStorage.setItem("khilane_admin_token",STAFF_PASSWORD);
    }
  };
  const handleLogout=()=>{ localStorage.removeItem("khilane_admin_role"); localStorage.removeItem("khilane_admin_token"); setIsLoggedIn(false); setRole(""); setIsAdminPage(false); window.history.pushState({},'', '/'); };

  const [tab,setTab]=useState("stays"); const [tripType,setTripType]=useState("single");
  const [from,setFrom]=useState("JNB"); const [to,setTo]=useState("CPT"); const [date,setDate]=useState("2026-10-15"); const [returnDate,setReturnDate]=useState("2026-10-20");
  const [adults,setAdults]=useState(1); const [children,setChildren]=useState(0); const [infants,setInfants]=useState(0); const [childAges,setChildAges]=useState([]);
  const [dest,setDest]=useState("Richards Bay"); const [checkIn,setCheckIn]=useState("2026-10-15"); const [checkOut,setCheckOut]=useState("2026-10-17"); const [stayAdults,setStayAdults]=useState(2); const [stayChildren,setStayChildren]=useState(0); const [stayRooms,setStayRooms]=useState(1); const [stayChildAges,setStayChildAges]=useState([]);
  const [pickUp,setPickUp]=useState("JNB Airport"); const [dropOff,setDropOff]=useState("CPT Airport"); const [pickDate,setPickDate]=useState("2026-10-15"); const [dropDate,setDropDate]=useState("2026-10-18");
  const [busFrom,setBusFrom]=useState("Johannesburg Park Station"); const [busTo,setBusTo]=useState("Cape Town Station"); const [busDate,setBusDate]=useState("2026-10-15");
  const [filteredFlights,setFilteredFlights]=useState(FLIGHTS); const [filteredStays,setFilteredStays]=useState(STAYS_ALL); const [filteredCars,setFilteredCars]=useState(CARS); const [filteredBuses,setFilteredBuses]=useState(BUSES);
  const [showPax,setShowPax]=useState(false); const [showStayPax,setShowStayPax]=useState(false);
  const [showModal,setShowModal]=useState(false); const [selected,setSelected]=useState(null); const [step,setStep]=useState(1); const [ref,setRef]=useState(""); const [form,setForm]=useState({email:"",phone:""}); const [pay,setPay]=useState("card"); const [stayMsg,setStayMsg]=useState("Showing Richards Bay & KZN");
  const totalFlightPax=adults+children+infants; const totalStayGuests=stayAdults+stayChildren;
  const calcFlightTotal=()=>{ if(!selected) return 0; return adults*selected.price + Math.round(children*selected.price*0.75) + infants*150; };
  const calcStayTotal=()=>{ if(!selected) return 0; const nights=Math.max(1,Math.ceil((new Date(checkOut)-new Date(checkIn))/(1000*60*60*24))); return selected.price*nights*stayRooms; };
  const doSearch=()=>{
    if(tab==="stays"){
      const q=dest.trim().toLowerCase();
      if(!q){ setFilteredStays(STAYS_ALL); setStayMsg("Showing all stays"); }
      else {
        let res=STAYS_ALL.filter(s=>s.city.toLowerCase().includes(q)||s.loc.toLowerCase().includes(q)||s.name.toLowerCase().includes(q));
        if(res.length===0){ if(q.includes("richards")||q.includes("bay")){ res=STAYS_ALL.filter(s=>s.city==="Richards Bay"||s.city==="Durban"); setStayMsg(`No exact match for "${dest}" — showing Richards Bay & Durban (nearest)`);} else { res=STAYS_ALL; setStayMsg(`No exact match for "${dest}" — showing all SA stays`);} }
        else setStayMsg(`Showing ${res.length} stays in ${dest} • ${totalStayGuests} guests • ${stayRooms} room`);
        setFilteredStays(res);
      }
    }
    setTimeout(()=>document.getElementById("results")?.scrollIntoView({behavior:"smooth"}),100);
  };
  const openBook=(item)=>{ setSelected(item); setStep(1); setShowModal(true); setRef(`BK-2026-${Math.floor(1000+Math.random()*9000)}`); };
  const payWithPaystack=()=>{ if(!window.PaystackPop){ alert("Paystack loading..."); return; } const total=tab==="flights"?calcFlightTotal():tab==="stays"?calcStayTotal():selected.price; const handler=window.PaystackPop.setup({ key:PAYSTACK_KEY, email:form.email||"customer@khilanetravel.co.za", amount:total*100, currency:"ZAR", ref:ref, callback:()=>setStep(4), onClose:()=>{} }); handler.openIframe(); };

  // ADMIN LOGIN SCREEN - Secure Back Office
  if(isAdminPage && !isLoggedIn){
    return(
      <div style={{minHeight:"100vh",background:NAVY,display:"grid",placeItems:"center",fontFamily:"Outfit",padding:20}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&display=swap');*{font-family:Outfit}`}</style>
        <div style={{width:"100%",maxWidth:380,background:"white",borderRadius:20,padding:24,boxShadow:"0 20px 60px rgba(0,0,0,0.4)"}}>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:16}}><div style={{width:40,height:40,background:NAVY,color:"white",display:"grid",placeItems:"center",borderRadius:12,fontWeight:900}}>K</div><div><div style={{fontWeight:900,color:NAVY}}>KHILANE TRAVEL</div><div style={{fontSize:11,color:"#64748b"}}>Secure Back Office • khilane-api.onrender.com</div></div></div>
          <h2 style={{fontWeight:900,fontSize:20,color:NAVY,margin:"0 0 6px"}}>Back Office Login</h2>
          <p style={{fontSize:12,color:"#64748b",margin:"0 0 14px"}}>Owner sees everything • Staff sees bookings only • Password: <b>Bongumenzi1@</b></p>
          <div style={{display:"grid",gap:10}}>
            <input value={loginForm.username} onChange={e=>setLoginForm({...loginForm,username:e.target.value})} placeholder="Username: owner or staff" style={{height:44,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:600}}/>
            <input type="password" value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} onKeyDown={e=>{if(e.key==="Enter") handleLogin();}} placeholder="Password: Bongumenzi1@" style={{height:44,borderRadius:10,border:"2px solid #0A1931",padding:"0 12px",fontWeight:700}}/>
            {loginError&&<div style={{background:"#fee2e2",color:"#991b1b",padding:"8px 10px",borderRadius:8,fontSize:12,fontWeight:700}}>{loginError}</div>}
            <button onClick={handleLogin} style={{height:46,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800,cursor:"pointer"}}>Login to Back Office →</button>
            <div style={{background:"#f1f5f9",borderRadius:10,padding:10,fontSize:11,color:"#475569",lineHeight:1.4}}>
              <b>How to login:</b><br/>
              • <b>Owner (You):</b> Username: <code>owner</code> • Password: <code>Bongumenzi1@</code> → Sees everything (Finance, Payroll, SARS, FNB 1044602244)<br/>
              • <b>Staff/Agent:</b> Username: <code>staff</code> • Password: <code>Bongumenzi1@</code> → Sees Bookings only
            </div>
            <button onClick={()=>{setIsAdminPage(false); window.history.pushState({},'','/');}} style={{height:40,borderRadius:20,border:"1px solid #cbd5e1",background:"white",fontWeight:700,fontSize:12}}>← Back to Website</button>
          </div>
        </div>
      </div>
    )
  }

  // ADMIN DASHBOARD - After login
  if(isAdminPage && isLoggedIn){
    const isOwner=role==="owner";
    return(
      <div style={{display:"flex",minHeight:"100vh",background:"#f1f5f9",fontFamily:"Outfit"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&display=swap');*{font-family:Outfit}`}</style>
        <div style={{width:260,background:NAVY,color:"white",padding:20,display:"flex",flexDirection:"column"}}>
          <div style={{fontWeight:900,color:GOLD,fontSize:20}}>KHILANE OS</div><div style={{fontSize:11,opacity:0.7,marginBottom:16}}>{isOwner?"Owner Access • Full":"Staff Access • Bookings only"} • {role}</div>
          {(isOwner?['Dashboard','Bookings','Finance','Payroll','Bookkeeper','SARS','Staff','FNB Bank','Settings']:['Bookings','Dashboard']).map(m=>(
            <div key={m} onClick={()=>setAdminTab(m)} style={{padding:'12px 14px',borderRadius:10,marginBottom:6,cursor:"pointer",background:adminTab===m?GOLD:"rgba(255,255,255,.08)",color:adminTab===m?NAVY:"white",fontWeight:700}}>{m}{m==="Bookings"&&role==="staff"?" (Only)":""}</div>
          ))}
          <div style={{marginTop:"auto",display:"grid",gap:8}}>
            <div style={{background:"rgba(250,204,21,0.15)",padding:10,borderRadius:10,fontSize:10}}><b style={{color:GOLD}}>Secure API:</b><br/>khilane-api.onrender.com<br/>Password: Bongumenzi1@<br/>Header: x-api-key</div>
            <button onClick={handleLogout} style={{width:'100%',padding:10,borderRadius:999,border:'none',background:'#ef4444',color:'white',fontWeight:800}}>Logout</button>
            <button onClick={()=>{setIsAdminPage(false); window.history.pushState({},'','/');}} style={{width:'100%',padding:10,borderRadius:999,border:'none',background:'white',color:NAVY,fontWeight:800}}>← Website</button>
          </div>
        </div>
        <div style={{flex:1,padding:24,overflowY:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}><h1 style={{fontWeight:900,fontSize:28,color:NAVY,margin:0}}>{adminTab} {isOwner?"— Owner Full Access":"— Staff (Bookings only)"}</h1><div style={{display:"flex",gap:8}}><span style={{background:isOwner?"#dcfce7":"#fef3c7",color:isOwner?"#166534":"#92400e",padding:"6px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>{isOwner?"Owner: Bongumenzi1@ — Full":"Staff: Bongumenzi1@ — Bookings only"}</span><span style={{background:NAVY,color:"white",padding:"6px 12px",borderRadius:20,fontSize:11}}>API: khilane-api.onrender.com secured</span></div></div>
          {adminTab==="Dashboard"&&(
            <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:14,marginTop:20}}>
              <div style={{background:'white',padding:16,borderRadius:14,border:"1px solid #e2e8f0"}}><div style={{fontSize:12,color:"#64748b"}}>Revenue Today</div><div style={{fontWeight:900,fontSize:22,color:NAVY}}>R 12,450</div>{isOwner&&<div style={{fontSize:10,color:"#16a34a"}}>↑ Owner sees full</div>}</div>
              <div style={{background:'white',padding:16,borderRadius:14,border:"1px solid #e2e8f0"}}><div style={{fontSize:12,color:"#64748b"}}>Bookings</div><div style={{fontWeight:900,fontSize:22,color:NAVY}}>24</div><div style={{fontSize:10}}>All staff see this</div></div>
              {isOwner&&<><div style={{background:'white',padding:16,borderRadius:14,border:"1px solid #e2e8f0"}}><div style={{fontSize:12,color:"#64748b"}}>Payroll Due</div><div style={{fontWeight:900,fontSize:22,color:NAVY}}>R 18,000</div><div style={{fontSize:10,color:"#dc2626"}}>Owner only</div></div><div style={{background:'white',padding:16,borderRadius:14,border:"1px solid #e2e8f0"}}><div style={{fontSize:12,color:"#64748b"}}>SARS VAT Due</div><div style={{fontWeight:900,fontSize:22,color:NAVY}}>R 2,340</div><div style={{fontSize:10}}>Owner only</div></div></>}
            </div>
            {!isOwner&&<div style={{marginTop:20,background:"#fef3c7",border:"1px solid #fde68a",padding:14,borderRadius:12,fontSize:13}}><b>Staff Access:</b> You can only view Bookings. Finance, Payroll, SARS, FNB Bank are hidden — owner only (Bongumenzi1@ owner login).</div>}
            {isOwner&&<div style={{marginTop:24,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}><div style={{background:'white',padding:18,borderRadius:14,border:"1px solid #e2e8f0"}}><b>Finance — FNB 1044602244 — Owner Only</b><p style={{fontSize:13,color:'#64748b',marginTop:6}}>Balance R45,200 • Profit R4,250 • API secured with Bongumenzi1@ • Header x-api-key</p></div><div style={{background:'white',padding:18,borderRadius:14,border:"1px solid #e2e8f0"}}><b>SARS — Owner Only</b><p style={{fontSize:13,color:'#64748b',marginTop:6}}>VAT201 R670 due • EMP201 PAYE R2,400 • Protected by owner password</p></div></div>}
            </>
          )}
          {adminTab==="Bookings"&&<div style={{marginTop:20,background:"white",padding:18,borderRadius:14,border:"1px solid #e2e8f0"}}><b>Recent Bookings — {isOwner?"Owner sees all":"Staff sees bookings"} • API: khilane-api.onrender.com (x-api-key: Bongumenzi1@)</b><div style={{marginTop:12,display:"grid",gap:8}}><div style={{display:"flex",justifyContent:"space-between",padding:"10px",background:"#f8fafc",borderRadius:8}}><span>BK-2026-4521 • JNB→CPT • 2A 1C • FlySafair</span><span style={{fontWeight:800}}>R 2,340</span></div><div style={{display:"flex",justifyContent:"space-between",padding:"10px",background:"#f8fafc",borderRadius:8}}><span>BK-2026-4520 • Premier Richards Bay • 2 nights • 2A</span><span style={{fontWeight:800}}>R 3,900</span></div></div></div>}
          {isOwner&&adminTab==="Finance"&&<div style={{marginTop:20,background:"white",padding:18,borderRadius:14,border:"1px solid #e2e8f0"}}><b>Finance — FNB 1044602244 MG Gwala — Owner Only — Secured</b><p style={{fontSize:13,color:"#64748b"}}>API {API_URL}/api/finance/summary requires header x-api-key: Bongumenzi1@</p></div>}
          {isOwner&&adminTab!=="Dashboard"&&adminTab!=="Bookings"&&adminTab!=="Finance"&&<div style={{marginTop:20,background:"white",padding:18,borderRadius:14,border:"1px solid #e2e8f0"}}><b>{adminTab} — Owner Only</b><p style={{fontSize:13,color:"#64748b"}}>This module requires owner login Bongumenzi1@ — staff cannot see.</p></div>}
          {!isOwner&&adminTab!=="Bookings"&&adminTab!=="Dashboard"&&<div style={{marginTop:20,background:"#fee2e2",padding:18,borderRadius:14,border:"1px solid #fecaca"}}><b>Access Denied — Staff</b><p style={{fontSize:13}}>Staff login can only view Bookings. Please login as owner (username: owner, password: Bongumenzi1@) to see {adminTab}.</p></div>}
        </div>
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
        <div style={{flex:"1 1 300px"}}><h1 style={{color:"white",fontSize:52,fontWeight:900,lineHeight:0.95,margin:0}}>South Africa's<br/>Cheapest<br/>Travel Booking</h1><p style={{color:"white",opacity:0.9,marginTop:12,fontSize:14}}>Flights • Stays • Cars • Buses • Secure ZAR</p></div>
        <div style={{flex:"0 1 420px",background:"white",borderRadius:20,padding:18,boxShadow:"0 20px 60px rgba(0,0,0,0.3)",width:"100%",maxWidth:460}}>
          <div style={{display:"flex",gap:6,background:"#f1f5f9",padding:5,borderRadius:30,width:"fit-content"}}>{[{id:"flights",l:"✈️ Flights"},{id:"stays",l:"🏨 Stays"},{id:"cars",l:"🚗 Cars"},{id:"buses",l:"🚌 Buses"}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{height:32,padding:"0 12px",borderRadius:30,border:"none",fontSize:12,fontWeight:800,background:tab===t.id?NAVY:"transparent",color:tab===t.id?"white":"#475569",cursor:"pointer"}}>{t.l}</button>)}</div>
          <div style={{marginTop:12}}>
            {tab==="stays" && (<><input value={dest} onChange={e=>setDest(e.target.value)} placeholder="Destination e.g. Richards Bay" style={{width:"100%",height:42,borderRadius:10,border:`2px solid ${NAVY}`,padding:"0 10px",fontWeight:700}}/><div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/><input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/></div><div style={{marginTop:10,position:"relative"}}><button onClick={()=>setShowStayPax(!showStayPax)} style={{width:"100%",height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",textAlign:"left",background:"white",fontWeight:700,fontSize:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span>{stayRooms} Room • {stayAdults}A {stayChildren>0?`• ${stayChildren}C`:""}</span><span>▼</span></button>{showStayPax&&<div style={{position:"absolute",zIndex:30,top:46,left:0,right:0,background:"white",border:"1px solid #e2e8f0",borderRadius:14,padding:12,boxShadow:"0 10px 30px rgba(0,0,0,0.15)",display:"grid",gap:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:12}}>Rooms</div><div style={{display:"flex",gap:8,alignItems:"center"}}><button onClick={()=>{if(stayRooms>1)setStayRooms(stayRooms-1)}} style={{width:28,height:28,borderRadius:14,border:"1px solid #cbd5e1",background:"white"}}>−</button><b>{stayRooms}</b><button onClick={()=>setStayRooms(stayRooms+1)} style={{width:28,height:28,borderRadius:14,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:12}}>Adults</div><div style={{display:"flex",gap:8,alignItems:"center"}}><button onClick={()=>{if(stayAdults>1)setStayAdults(stayAdults-1)}} style={{width:28,height:28,borderRadius:14,border:"1px solid #cbd5e1",background:"white"}}>−</button><b>{stayAdults}</b><button onClick={()=>setStayAdults(stayAdults+1)} style={{width:28,height:28,borderRadius:14,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{fontWeight:700,fontSize:12}}>Children</div><div style={{display:"flex",gap:8,alignItems:"center"}}><button onClick={()=>{if(stayChildren>0)setStayChildren(stayChildren-1)}} style={{width:28,height:28,borderRadius:14,border:"1px solid #cbd5e1",background:"white"}}>−</button><b>{stayChildren}</b><button onClick={()=>{setStayChildren(stayChildren+1)}} style={{width:28,height:28,borderRadius:14,border:`1px solid ${NAVY}`,background:NAVY,color:"white"}}>+</button></div></div><button onClick={()=>setShowStayPax(false)} style={{height:34,borderRadius:10,border:"none",background:NAVY,color:"white",fontWeight:800,fontSize:12}}>Done</button></div>}</div></>)}
            {tab==="flights" && (<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input value={from} onChange={e=>setFrom(e.target.value)} placeholder="FROM JNB" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:800}}/><input value={to} onChange={e=>setTo(e.target.value)} placeholder="TO CPT" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:800}}/></div><div style={{marginTop:8}}><input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{width:"100%",height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/></div></>)}
            {tab==="cars" && (<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input value={pickUp} onChange={e=>setPickUp(e.target.value)} placeholder="Pick-up" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontSize:12}}/><input value={dropOff} onChange={e=>setDropOff(e.target.value)} placeholder="Drop-off" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontSize:12}}/></div></>)}
            {tab==="buses" && (<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input value={busFrom} onChange={e=>setBusFrom(e.target.value)} placeholder="From" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontSize:12}}/><input value={busTo} onChange={e=>setBusTo(e.target.value)} placeholder="To" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontSize:12}}/></div></>)}
            <button onClick={doSearch} style={{marginTop:12,width:"100%",height:46,borderRadius:30,border:"none",background:GOLD,color:NAVY,fontWeight:900,fontSize:13,cursor:"pointer"}}>Search {tab} →</button>
            <div style={{marginTop:6,textAlign:"center",fontSize:10,color:"#64748b"}}>{stayMsg}</div>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"20px auto",padding:"0 14px"}}>
        <div id="results" style={{background:"white",borderRadius:16,padding:14,border:"1px solid #e2e8f0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{fontWeight:900,fontSize:16,color:NAVY,margin:0}}>{tab==="stays"?`${dest} • ${filteredStays.length} stays`:`${tab} results`} • ZAR</h2><span style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:"#dcfce7",color:"#166534",fontWeight:700}}>R20 Beat</span></div>
          <div style={{marginTop:12,display:"grid",gap:10}}>
            {(tab==="stays"?filteredStays:tab==="flights"?filteredFlights:tab==="cars"?filteredCars:filteredBuses).map(item=>(
              <div key={item.id} style={{border:"1px solid #e2e8f0",borderRadius:14,padding:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:800,fontSize:13}}>{item.name||`${item.company||item.airline} • ${item.from}→${item.to}`}</div><div style={{fontSize:11,color:"#64748b"}}>{item.loc||item.type||`${item.dur}`}</div></div>
                <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{fontWeight:900,color:NAVY}}>R{item.price}</div><button onClick={()=>openBook(item)} style={{height:36,padding:"0 14px",borderRadius:20,border:"none",background:NAVY,color:"white",fontWeight:800,fontSize:12}}>Book & Pay</button></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal&&selected&&(
        <div style={{position:"fixed",inset:0,zIndex:50,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <div style={{width:"100%",maxWidth:520,background:"white",borderRadius:"24px 24px 0 0",maxHeight:"92vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <div style={{background:NAVY,padding:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{color:"white",fontWeight:900}}>Secure Booking — {ref}</div><button onClick={()=>setShowModal(false)} style={{width:32,height:32,borderRadius:16,background:"rgba(255,255,255,0.15)",color:"white",border:"none"}}>✕</button></div>
            <div style={{padding:16}}><div style={{fontWeight:800}}>{selected.name||selected.airline} — R{selected.price}</div><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" style={{marginTop:10,width:"100%",height:34,borderRadius:8,border:"1px solid #cbd5e1",padding:"0 8px"}}/></div>
            <div style={{padding:14,display:"flex",gap:10}}><button onClick={payWithPaystack} style={{height:46,flex:1,borderRadius:22,border:"none",background:GOLD,color:NAVY,fontWeight:900}}>Pay Card</button><button onClick={()=>setShowModal(false)} style={{height:46,flex:1,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>Done</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
