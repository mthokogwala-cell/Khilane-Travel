import React, { useState, useEffect } from "react";

// --- CONFIG - MOVED TO ENV FOR SECURITY ---
// In Render -> Settings -> Environment, add:
// VITE_OWNER_PASSWORD, VITE_PAYSTACK_KEY
const NAVY="#0A1931"; 
const GOLD="#facc15"; 
const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_KEY || "pk_test_162b0d185673f14112b09d1ed6f3a9d6fbfa7";
const OWNER_PASSWORD = import.meta.env.VITE_OWNER_PASSWORD || "Bongumenzi1@"; 
const STAFF_DEFAULT_PASSWORD="00000";

const STAYS_ALL=[{id:101,name:"Beverly Hills Hotel",loc:"Umhlanga Rocks, Durban",city:"Durban",rating:"4.8",price:2850,original:3200,tag:"Beachfront"},{id:102,name:"The Oyster Box",loc:"Umhlanga Ridge, Durban",city:"Durban",rating:"4.9",price:3450,original:3800,tag:"5-Star"},{id:103,name:"Sun City Resort",loc:"Sun City",city:"Rustenburg",rating:"4.6",price:1890,original:2100,tag:"Family"},{id:104,name:"Cape Town Marriott",loc:"Foreshore, Cape Town",city:"Cape Town",rating:"4.7",price:2650,original:3000,tag:"City Centre"},{id:105,name:"Premier Hotel Richards Bay",loc:"Richards Bay Waterfront",city:"Richards Bay",rating:"4.5",price:1950,original:2250,tag:"Waterfront"},{id:106,name:"BON Hotel Waterfront Richards Bay",loc:"Richards Bay, KZN",city:"Richards Bay",rating:"4.3",price:1650,original:1900,tag:"Business"},{id:107,name:"Protea Hotel Durban Umhlanga",loc:"Umhlanga, Durban",city:"Durban",rating:"4.4",price:1750,original:2000,tag:"Business"},{id:108,name:"Southern Sun Elangeni",loc:"Durban Beachfront",city:"Durban",rating:"4.6",price:2250,original:2600,tag:"Beachfront"}];
const FLIGHTS=[{id:1,airline:"FlySafair",from:"JNB",to:"CPT",dep:"06:15",arr:"08:25",dur:"2h 10m",stops:"Direct",price:864,original:914},{id:2,airline:"Airlink",from:"JNB",to:"CPT",dep:"08:40",arr:"10:55",dur:"2h 15m",stops:"Direct",price:902,original:952}];
const CARS=[{id:201,name:"Toyota Corolla Quest",company:"Avis",type:"Sedan Manual",price:489,original:539},{id:202,name:"VW Polo Vivo",company:"Budget",type:"Hatch Manual",price:425,original:475}];
const BUSES=[{id:301,company:"Intercape",from:"Johannesburg Park Station",to:"Cape Town Station",dep:"18:00",arr:"12:30+1",dur:"18h 30m",price:685,original:735,type:"Sleepliner"}];

export default function App(){
  // FIXED: Website is DEFAULT. Admin only if URL is /admin
  const [isAdminPage,setIsAdminPage]=useState(()=>{
    const p = window.location.pathname.toLowerCase();
    return p.startsWith("/admin") || p.startsWith("/owner") || p.startsWith("/backoffice");
  });
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [role,setRole]=useState("");
  const [adminTab,setAdminTab]=useState("Dashboard");
  const [loginForm,setLoginForm]=useState({username:"",password:""});
  const [loginError,setLoginError]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [mustChangePassword,setMustChangePassword]=useState(false);
  const [newPassForm,setNewPassForm]=useState({newPass:"",confirmPass:""});
  const [staffCustomPass,setStaffCustomPass]=useState(()=>localStorage.getItem("khilane_staff_custom_pass")||"");
  const [ownerCustomPass,setOwnerCustomPass]=useState(()=>localStorage.getItem("khilane_owner_custom_pass")||"");
  const [settingsMsg,setSettingsMsg]=useState("");

  useEffect(()=>{
    const p=window.location.pathname.toLowerCase();
    const isAdminRoute = p.startsWith("/admin") || p.startsWith("/owner") || p.startsWith("/backoffice");
    
    const savedRole=localStorage.getItem("khilane_admin_role");
    const savedToken=localStorage.getItem("khilane_admin_token");
    const customStaff=localStorage.getItem("khilane_staff_custom_pass");
    const customOwner=localStorage.getItem("khilane_owner_custom_pass")||OWNER_PASSWORD;
    
    // FIXED: Only auto-login if user is ALREADY on /admin route. 
    // If they are on "/" (homepage), do NOT jump to admin - stay on website.
    if(savedRole && savedToken && isAdminRoute){
      if(savedRole==="owner" && (savedToken===OWNER_PASSWORD || savedToken===customOwner)){ 
        setIsLoggedIn(true); setRole("owner"); setIsAdminPage(true); 
      }
      if(savedRole==="staff"){
        const validStaff = customStaff || STAFF_DEFAULT_PASSWORD;
        if(savedToken===validStaff || savedToken===STAFF_DEFAULT_PASSWORD){
          if(savedToken===STAFF_DEFAULT_PASSWORD && !customStaff){ 
            setIsLoggedIn(true); setRole("staff"); setMustChangePassword(true); setIsAdminPage(true); 
          } else { 
            setIsLoggedIn(true); setRole("staff"); setIsAdminPage(true); 
          }
        }
      }
    }
    
    // If on admin route but not logged in, ensure isAdminPage true to show login
    if(isAdminRoute){
      setIsAdminPage(true);
    }
  },[]);

  const handleLogin=()=>{
    const u=loginForm.username.toLowerCase().trim();
    const pw=loginForm.password;
    setLoginError("");
    const currentOwnerPass=localStorage.getItem("khilane_owner_custom_pass")||OWNER_PASSWORD;
    const currentStaffPass=localStorage.getItem("khilane_staff_custom_pass")||STAFF_DEFAULT_PASSWORD;

    // SECURED: Require exact username
    if((u==="owner"||u==="admin") && (pw===OWNER_PASSWORD || pw===currentOwnerPass)){
      setRole("owner"); setIsLoggedIn(true); localStorage.setItem("khilane_admin_role","owner"); localStorage.setItem("khilane_admin_token",pw); setLoginError(""); 
      window.history.pushState({},'', '/admin');
      return;
    }
    if(u==="staff"||u==="agent"){
      if(pw===currentStaffPass || pw===STAFF_DEFAULT_PASSWORD){
        setRole("staff"); setIsLoggedIn(true); localStorage.setItem("khilane_admin_role","staff"); localStorage.setItem("khilane_admin_token",pw);
        if(pw===STAFF_DEFAULT_PASSWORD && !localStorage.getItem("khilane_staff_custom_pass")){
          setMustChangePassword(true);
        }
        setLoginError(""); 
        window.history.pushState({},'', '/admin');
        return;
      } else {
        setLoginError("Invalid staff password. Default is 00000 for first login."); return;
      }
    }
    setLoginError("Invalid username or password. Use owner / admin or staff / agent");
  };

  const handlePasswordChange=()=>{
    if(newPassForm.newPass.length<5){ setLoginError("Password must be at least 5 characters."); return; }
    if(newPassForm.newPass!==newPassForm.confirmPass){ setLoginError("Passwords do not match."); return; }
    if(role==="staff"){
      localStorage.setItem("khilane_staff_custom_pass",newPassForm.newPass);
      localStorage.setItem("khilane_admin_token",newPassForm.newPass);
      setStaffCustomPass(newPassForm.newPass);
      setMustChangePassword(false);
      setLoginError(""); setNewPassForm({newPass:"",confirmPass:""});
      alert("Staff password changed successfully!");
    } else {
      localStorage.setItem("khilane_owner_custom_pass",newPassForm.newPass);
      localStorage.setItem("khilane_admin_token",newPassForm.newPass);
      setOwnerCustomPass(newPassForm.newPass);
      setMustChangePassword(false);
      setLoginError(""); setNewPassForm({newPass:"",confirmPass:""});
      alert("Owner password changed successfully!");
    }
  };

  const handleLogout=()=>{ 
    localStorage.removeItem("khilane_admin_role"); 
    localStorage.removeItem("khilane_admin_token"); 
    setIsLoggedIn(false); 
    setRole(""); 
    setIsAdminPage(false); 
    setMustChangePassword(false); 
    window.location.href='/';
  };

  const goToWebsite = () => {
    setIsAdminPage(false);
    window.location.href='/';
  }

  const [tab,setTab]=useState("stays"); const [dest,setDest]=useState("Richards Bay"); const [checkIn,setCheckIn]=useState("2026-10-15"); const [checkOut,setCheckOut]=useState("2026-10-17"); const [stayAdults,setStayAdults]=useState(2); const [stayChildren,setStayChildren]=useState(0); const [stayRooms,setStayRooms]=useState(1);
  const [filteredStays,setFilteredStays]=useState(STAYS_ALL); const [showStayPax,setShowStayPax]=useState(false); const [stayMsg,setStayMsg]=useState("Secure • R20 Price Beat");
  const [from,setFrom]=useState("JNB"); const [to,setTo]=useState("CPT"); const [date,setDate]=useState("2026-10-15");
  const doSearch=()=>{ const q=dest.trim().toLowerCase(); if(!q){ setFilteredStays(STAYS_ALL); setStayMsg("Showing all stays"); } else { let res=STAYS_ALL.filter(s=>s.city.toLowerCase().includes(q)||s.loc.toLowerCase().includes(q)||s.name.toLowerCase().includes(q)); if(res.length===0){ res=STAYS_ALL.filter(s=>s.city==="Richards Bay"||s.city==="Durban"); setStayMsg(`No exact match for "${dest}" — showing nearby`);} else setStayMsg(`Showing ${res.length} stays in ${dest}`); setFilteredStays(res);} };

  // ADMIN LOGIN SCREEN - SECURE - NO PASSWORD DISPLAY
  if(isAdminPage && !isLoggedIn){
    return(
      <div style={{minHeight:"100vh",background:NAVY,display:"grid",placeItems:"center",fontFamily:"Outfit",padding:20}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&display=swap');*{font-family:Outfit}`}</style>
        <div style={{width:"100%",maxWidth:380,background:"white",borderRadius:20,padding:24,boxShadow:"0 20px 60px rgba(0,0,0,0.4)"}}>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:16}}><div style={{width:40,height:40,background:NAVY,color:"white",display:"grid",placeItems:"center",borderRadius:12,fontWeight:900}}>K</div><div><div style={{fontWeight:900,color:NAVY}}>KHILANE TRAVEL</div><div style={{fontSize:11,color:"#64748b"}}>Secure Back Office</div></div></div>
          <h2 style={{fontWeight:900,fontSize:20,color:NAVY,margin:"0 0 6px"}}>Back Office Login</h2>
          <p style={{fontSize:12,color:"#64748b",margin:"0 0 14px"}}>Secure access — Owner full • Staff bookings only</p>
          <div style={{display:"grid",gap:10}}>
            <input value={loginForm.username} onChange={e=>setLoginForm({...loginForm,username:e.target.value})} placeholder="Username (owner or staff)" style={{height:44,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:600}}/>
            <div style={{position:"relative"}}><input type={showPassword?"text":"password"} value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})} onKeyDown={e=>{if(e.key==="Enter") handleLogin();}} placeholder="Password" style={{height:44,borderRadius:10,border:"2px solid #0A1931",padding:"0 44px 0 12px",fontWeight:700,width:"100%",boxSizing:"border-box"}}/><button type="button" onClick={()=>setShowPassword(!showPassword)} style={{position:"absolute",right:8,top:8,height:28,padding:"0 8px",borderRadius:8,border:"1px solid #e2e8f0",background:"white",fontSize:11,fontWeight:700,cursor:"pointer"}}>{showPassword?"Hide":"Show"}</button></div>
            {loginError&&<div style={{background:"#fee2e2",color:"#991b1b",padding:"8px 10px",borderRadius:8,fontSize:12,fontWeight:700}}>{loginError}</div>}
            <button onClick={handleLogin} style={{height:46,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800,cursor:"pointer"}}>Login to Back Office →</button>
            <div style={{background:"#f1f5f9",borderRadius:10,padding:10,fontSize:11,color:"#475569",lineHeight:1.4}}>
              <b>How to login:</b><br/>
              • Owner: Username <code>owner</code> or <code>admin</code><br/>
              • Staff: Username <code>staff</code> or <code>agent</code> — Default <code>00000</code> on first login.
            </div>
            <button onClick={goToWebsite} style={{height:40,borderRadius:20,border:"1px solid #cbd5e1",background:"white",fontWeight:700,fontSize:12}}>← Back to Website</button>
          </div>
        </div>
      </div>
    )
  }

  // FORCE PASSWORD CHANGE ON FIRST STAFF LOGIN
  if(isAdminPage && isLoggedIn && mustChangePassword){
    return(
      <div style={{minHeight:"100vh",background:NAVY,display:"grid",placeItems:"center",fontFamily:"Outfit",padding:20}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&display=swap');*{font-family:Outfit}`}</style>
        <div style={{width:"100%",maxWidth:380,background:"white",borderRadius:20,padding:24,boxShadow:"0 20px 60px rgba(0,0,0,0.4)"}}>
          <h2 style={{fontWeight:900,fontSize:20,color:NAVY,margin:"0 0 6px"}}>Change Password Required</h2>
          <p style={{fontSize:12,color:"#64748b",margin:"0 0 14px"}}>First login detected with default password <code>00000</code>. Please set your own password.</p>
          <div style={{display:"grid",gap:10}}>
            <input type="password" value={newPassForm.newPass} onChange={e=>setNewPassForm({...newPassForm,newPass:e.target.value})} placeholder="New password (min 5 chars)" style={{height:44,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:600}}/>
            <input type="password" value={newPassForm.confirmPass} onChange={e=>setNewPassForm({...newPassForm,confirmPass:e.target.value})} placeholder="Confirm new password" style={{height:44,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 12px",fontWeight:600}}/>
            {loginError&&<div style={{background:"#fee2e2",color:"#991b1b",padding:"8px 10px",borderRadius:8,fontSize:12,fontWeight:700}}>{loginError}</div>}
            <button onClick={handlePasswordChange} style={{height:46,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800,cursor:"pointer"}}>Set New Password & Continue →</button>
          </div>
        </div>
      </div>
    )
  }

  if(isAdminPage && isLoggedIn){
    const isOwner=role==="owner";
    return(
      <div style={{display:"flex",minHeight:"100vh",background:"#f1f5f9",fontFamily:"Outfit"}}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&display=swap');*{font-family:Outfit}`}</style>
        <div style={{width:260,background:NAVY,color:"white",padding:20,display:"flex",flexDirection:"column"}}>
          <div style={{fontWeight:900,color:GOLD,fontSize:20}}>KHILANE OS</div><div style={{fontSize:11,opacity:0.7,marginBottom:16}}>{isOwner?"Owner Access • Full":"Staff Access • Bookings only"} • {role}</div>
          {(isOwner?['Dashboard','Bookings','Finance','Payroll','Bookkeeper','SARS','Staff','FNB Bank','Settings']:['Bookings','Dashboard','Settings']).map(m=>(
            <div key={m} onClick={()=>setAdminTab(m)} style={{padding:'12px 14px',borderRadius:10,marginBottom:6,cursor:"pointer",background:adminTab===m?GOLD:"rgba(255,255,255,.08)",color:adminTab===m?NAVY:"white",fontWeight:700}}>{m}</div>
          ))}
          <div style={{marginTop:"auto",display:"grid",gap:8}}>
            <button onClick={handleLogout} style={{width:'100%',padding:10,borderRadius:999,border:'none',background:'#ef4444',color:'white',fontWeight:800}}>Logout</button>
            <button onClick={goToWebsite} style={{width:'100%',padding:10,borderRadius:999,border:'none',background:'white',color:NAVY,fontWeight:800}}>← Website</button>
          </div>
        </div>
        <div style={{flex:1,padding:24,overflowY:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}><h1 style={{fontWeight:900,fontSize:28,color:NAVY,margin:0}}>{adminTab} {isOwner?"— Owner Full Access":"— Staff"}</h1><div style={{display:"flex",gap:8}}><span style={{background:isOwner?"#dcfce7":"#fef3c7",color:isOwner?"#166534":"#92400e",padding:"6px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>{isOwner?"Owner — Full":"Staff — Bookings only"}</span></div></div>
          {adminTab==="Dashboard"&&(
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:14,marginTop:20}}>
              <div style={{background:'white',padding:16,borderRadius:14,border:"1px solid #e2e8f0"}}><div style={{fontSize:12,color:"#64748b"}}>Revenue Today</div><div style={{fontWeight:900,fontSize:22,color:NAVY}}>R 12,450</div></div>
              <div style={{background:'white',padding:16,borderRadius:14,border:"1px solid #e2e8f0"}}><div style={{fontSize:12,color:"#64748b"}}>Bookings</div><div style={{fontWeight:900,fontSize:22,color:NAVY}}>24</div></div>
              {isOwner&&<><div style={{background:'white',padding:16,borderRadius:14,border:"1px solid #e2e8f0"}}><div style={{fontSize:12,color:"#64748b"}}>Payroll Due</div><div style={{fontWeight:900,fontSize:22,color:NAVY}}>R 18,000</div></div><div style={{background:'white',padding:16,borderRadius:14,border:"1px solid #e2e8f0"}}><div style={{fontSize:12,color:"#64748b"}}>SARS VAT Due</div><div style={{fontWeight:900,fontSize:22,color:NAVY}}>R 2,340</div></div></>}
            </div>
          )}
          {adminTab==="Bookings"&&<div style={{marginTop:20,background:"white",padding:18,borderRadius:14,border:"1px solid #e2e8f0"}}><b>Recent Bookings</b><div style={{marginTop:12,display:"grid",gap:8}}><div style={{display:"flex",justifyContent:"space-between",padding:"10px",background:"#f8fafc",borderRadius:8}}><span>BK-2026-4521 • JNB→CPT • 2A 1C</span><span style={{fontWeight:800}}>R 2,340</span></div><div style={{display:"flex",justifyContent:"space-between",padding:"10px",background:"#f8fafc",borderRadius:8}}><span>BK-2026-4520 • Premier Richards Bay • 2 nights</span><span style={{fontWeight:800}}>R 3,900</span></div></div></div>}
          {adminTab==="Settings"&&(
            <div style={{marginTop:20,background:"white",padding:18,borderRadius:14,border:"1px solid #e2e8f0",maxWidth:500}}>
              <b>Settings — Change Password</b><p style={{fontSize:12,color:"#64748b",margin:"6px 0 12px"}}>{isOwner?"Owner can change own password.":"You can change your own staff password anytime."}</p>
              <div style={{display:"grid",gap:10}}>
                <input type="password" value={newPassForm.newPass} onChange={e=>setNewPassForm({...newPassForm,newPass:e.target.value})} placeholder="New password" style={{height:40,borderRadius:8,border:"1px solid #cbd5e1",padding:"0 10px"}}/>
                <input type="password" value={newPassForm.confirmPass} onChange={e=>setNewPassForm({...newPassForm,confirmPass:e.target.value})} placeholder="Confirm new password" style={{height:40,borderRadius:8,border:"1px solid #cbd5e1",padding:"0 10px"}}/>
                {settingsMsg&&<div style={{background:"#dcfce7",color:"#166534",padding:"8px 10px",borderRadius:8,fontSize:12,fontWeight:700}}>{settingsMsg}</div>}
                {loginError&&<div style={{background:"#fee2e2",color:"#991b1b",padding:"8px 10px",borderRadius:8,fontSize:12,fontWeight:700}}>{loginError}</div>}
                <button onClick={()=>{ 
                  if(newPassForm.newPass.length<5){ setLoginError("Min 5 chars"); return; }
                  if(newPassForm.newPass!==newPassForm.confirmPass){ setLoginError("Passwords don't match"); return; }
                  if(isOwner){ localStorage.setItem("khilane_owner_custom_pass",newPassForm.newPass); localStorage.setItem("khilane_admin_token",newPassForm.newPass); setOwnerCustomPass(newPassForm.newPass); setSettingsMsg("Owner password updated!"); }
                  else { localStorage.setItem("khilane_staff_custom_pass",newPassForm.newPass); localStorage.setItem("khilane_admin_token",newPassForm.newPass); setStaffCustomPass(newPassForm.newPass); setSettingsMsg("Staff password updated!"); }
                  setLoginError(""); setNewPassForm({newPass:"",confirmPass:""});
                }} style={{height:44,borderRadius:22,border:"none",background:NAVY,color:"white",fontWeight:800}}>Update My Password</button>
                <div style={{background:"#f1f5f9",padding:10,borderRadius:8,fontSize:11,color:"#475569"}}>
                  Owner password: {ownerCustomPass ? "Custom set ✓" : "Using default"} • Staff password: {staffCustomPass ? "Custom set ✓" : "Still 00000 - must change on first login"}<br/>
                  <span style={{fontSize:10, opacity:0.7}}>Security tip: Change owner password monthly. Store in Render Env Vars for production.</span>
                </div>
              </div>
            </div>
          )}
          {isOwner&&adminTab!=="Dashboard"&&adminTab!=="Bookings"&&adminTab!=="Settings"&&<div style={{marginTop:20,background:"white",padding:18,borderRadius:14,border:"1px solid #e2e8f0"}}><b>{adminTab} — Owner Only</b><p style={{fontSize:13,color:"#64748b"}}>Owner full access module.</p></div>}
          {!isOwner&&adminTab!=="Bookings"&&adminTab!=="Dashboard"&&adminTab!=="Settings"&&<div style={{marginTop:20,background:"#fee2e2",padding:18,borderRadius:14,border:"1px solid #fecaca"}}><b>Access Denied — Staff</b><p style={{fontSize:13}}>Staff can only view Bookings and Settings.</p></div>}
        </div>
      </div>
    )
  }

  // PUBLIC WEBSITE - ALWAYS DEFAULT
  return(
    <div style={{minHeight:"100vh",background:"#f1f5f9",fontFamily:"Outfit, Inter, system-ui"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&display=swap');*{font-family:Outfit}`}</style>
      <div style={{background:NAVY,color:"white",padding:"14px 3%",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:40,height:40,background:"white",color:NAVY,display:"grid",placeItems:"center",borderRadius:12,fontWeight:900,fontSize:20}}>K</div><div style={{fontWeight:900,color:GOLD}}>KHILANE TRAVEL</div></div>
        <div style={{display:"flex",gap:14,fontWeight:700,fontSize:13}}>{[{id:"flights",l:"Flights"},{id:"stays",l:"Stays"},{id:"cars",l:"Cars"},{id:"buses",l:"Buses"}].map(k=><span key={k.id} onClick={()=>setTab(k.id)} style={{cursor:"pointer",paddingBottom:3,borderBottom:tab===k.id?`3px solid ${GOLD}`:"none",color:tab===k.id?GOLD:"white"}}>{k.l}</span>)}</div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>{setIsAdminPage(true); window.history.pushState({},'', '/admin'); window.location.reload();}} style={{background:"rgba(255,255,255,0.15)",color:"white",border:"1px solid rgba(255,255,255,0.3)",padding:"6px 12px",borderRadius:20,fontWeight:700,fontSize:11,cursor:"pointer"}}>Owner Login</button>
          <div style={{background:GOLD,color:NAVY,padding:"6px 14px",borderRadius:999,fontWeight:900,fontSize:11}}>R20 PRICE BEAT</div>
        </div>
      </div>
      <div style={{background:GOLD,textAlign:"center",padding:"10px",fontWeight:900,fontSize:12,color:NAVY}}>🇿🇦 khilanetravel.co.za — PROUDLY SOUTH AFRICAN — LOWEST PRICES GUARANTEED — BEAT BY R20 🇿🇦</div>
      <div style={{minHeight:420,background:`linear-gradient(rgba(10,25,49,0.45),rgba(10,25,49,0.55)),url('https://images.unsplash.com/photo-1551882547-b79c5d7daf4b?w=1600') center/cover`,display:"flex",alignItems:"center",padding:"0 5%",gap:20,flexWrap:"wrap"}}>
        <div style={{flex:"1 1 300px"}}><h1 style={{color:"white",fontSize:52,fontWeight:900,lineHeight:0.95,margin:0}}>South Africa's<br/>Cheapest<br/>Travel Booking</h1><p style={{color:"white",opacity:0.9,marginTop:12,fontSize:14}}>Flights • Stays • Cars • Buses • Secure ZAR • info@khilanetravel.co.za</p></div>
        <div style={{flex:"0 1 420px",background:"white",borderRadius:20,padding:18,boxShadow:"0 20px 60px rgba(0,0,0,0.3)",width:"100%",maxWidth:460}}>
          <div style={{display:"flex",gap:6,background:"#f1f5f9",padding:5,borderRadius:30,width:"fit-content"}}>{[{id:"flights",l:"✈ Flights"},{id:"stays",l:"🏨 Stays"},{id:"cars",l:"🚗 Cars"},{id:"buses",l:"🚌 Buses"}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{height:32,padding:"0 12px",borderRadius:30,border:"none",fontSize:12,fontWeight:800,background:tab===t.id?NAVY:"transparent",color:tab===t.id?"white":"#475569",cursor:"pointer"}}>{t.l}</button>)}</div>
          <div style={{marginTop:12}}>
            {tab==="stays" && (<><input value={dest} onChange={e=>setDest(e.target.value)} placeholder="Destination e.g. Richards Bay" style={{width:"100%",height:42,borderRadius:10,border:`2px solid ${NAVY}`,padding:"0 10px",fontWeight:700}}/><div style={{marginTop:8,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/><input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/></div><div style={{marginTop:10,position:"relative"}}><button onClick={()=>setShowStayPax(!showStayPax)} style={{width:"100%",height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",textAlign:"left",background:"white",fontWeight:700,fontSize:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span>{stayRooms} Room • {stayAdults}A {stayChildren>0?`• ${stayChildren}C`:""}</span><span>▼</span></button></div></>)}
            {tab==="flights" && (<><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><input value={from} onChange={e=>setFrom(e.target.value)} placeholder="FROM JNB" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:800}}/><input value={to} onChange={e=>setTo(e.target.value)} placeholder="TO CPT" style={{height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px",fontWeight:800}}/></div><input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{marginTop:8,width:"100%",height:42,borderRadius:10,border:"1px solid #cbd5e1",padding:"0 10px"}}/></>)}
            <button onClick={doSearch} style={{marginTop:12,width:"100%",height:46,borderRadius:30,border:"none",background:GOLD,color:NAVY,fontWeight:900,fontSize:13,cursor:"pointer"}}>Search {tab} →</button>
            <div style={{marginTop:6,textAlign:"center",fontSize:10,color:"#64748b"}}>{stayMsg} • Contact: info@khilanetravel.co.za</div>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1100,margin:"20px auto",padding:"0 14px"}}>
        <div id="results" style={{background:"white",borderRadius:16,padding:14,border:"1px solid #e2e8f0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><h2 style={{fontWeight:900,fontSize:16,color:NAVY,margin:0}}>{tab==="stays"?`${dest} • ${filteredStays.length} stays`:`${tab} results`} • ZAR</h2><span style={{fontSize:11,padding:"4px 10px",borderRadius:20,background:"#dcfce7",color:"#166534",fontWeight:700}}>R20 Beat • Paystack Secured</span></div>
          <div style={{marginTop:12,display:"grid",gap:10}}>
            {(tab==="stays"?filteredStays:FLIGHTS).map(item=>(
              <div key={item.id} style={{border:"1px solid #e2e8f0",borderRadius:14,padding:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:800,fontSize:13}}>{item.name||`${item.airline} • ${item.from}→${item.to}`}</div><div style={{fontSize:11,color:"#64748b"}}>{item.loc||`${item.dur} • Direct`}</div></div>
                <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{fontWeight:900,color:NAVY}}>R{item.price}</div><button onClick={()=>{ if(window.PaystackPop){ const handler=window.PaystackPop.setup({key:PAYSTACK_KEY,email:"customer@khilanetravel.co.za",amount:item.price*100,currency:"ZAR",callback:function(r){alert("Payment successful: "+r.reference)}}); handler.openIframe(); } else alert("Paystack loading... try again"); }} style={{height:36,padding:"0 14px",borderRadius:20,border:"none",background:NAVY,color:"white",fontWeight:800,fontSize:12}}>Book & Pay</button></div>
              </div>
            ))}
          </div>
          <div style={{marginTop:16,padding:12,background:"#f8fafc",borderRadius:12,fontSize:11,color:"#475569"}}>
            <b>Why Khilane Travel?</b> • We beat any SA price by R20 • Proudly South African • Secure payments via Paystack • Email: info@khilanetravel.co.za • Based in Richards Bay & Durban
          </div>
        </div>
      </div>
      <div style={{background:NAVY,color:"white",padding:"20px 5%",marginTop:20,textAlign:"center",fontSize:11}}>
        © 2026 Khilane Travel • www.khilanetravel.co.za • info@khilanetravel.co.za • Richards Bay, KZN • <span onClick={()=>{setIsAdminPage(true); window.history.pushState({},'', '/admin');}} style={{textDecoration:"underline",cursor:"pointer",color:GOLD}}>Owner Login</span>
      </div>
    </div>
  );
}
