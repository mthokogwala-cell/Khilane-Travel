import React, { useState } from "react";
const API = "https://khilane-api.onrender.com";
const WA = "27600000000"; // change to your WhatsApp

export default function App(){
  const [tab,setTab]=useState("flights");
  const [admin,setAdmin]=useState(false);
  const [from,setFrom]=useState("JNB");
  const [to,setTo]=useState("CPT");
  const [depart,setDepart]=useState("2026-10-15");
  const [ret,setRet]=useState("2026-10-22");
  const [city,setCity]=useState("Cape Town");

  const searchFlights = async () => {
    // This calls YOUR backend -> backend calls Amadeus real API
    const r = await fetch(`${API}/api/flights/search?from=${from}&to=${to}&depart=${depart}&return=${ret}`);
    const data = await r.json();
    alert(`REAL API LIVE: ${data.count} flights found. This will become Amadeus live data.`);
    window.open(`https://www.aviasales.com/?marker=650123&origin_iata=${from}&destination_iata=${to}&depart_date=${depart}`,"_blank");
  };

  if(admin){
    return(
      <div style={{display:'flex',minHeight:'100vh',background:'#f1f5f9',fontFamily:'Outfit'}}>
        <div style={{width:260,background:'#0a1931',color:'white',padding:20}}>
          <div style={{fontWeight:900,color:'#facc15',fontSize:20,marginBottom:20}}>KHILANE OS</div>
          {['Dashboard','Bookings','Finance','Payroll','Bookkeeper','SARS','Staff','FNB Bank'].map(m=>(
            <div key={m} style={{padding:'12px 14px',borderRadius:10,marginBottom:6,background:'rgba(255,255,255,.08)'}}>{m}</div>
          ))}
          <button onClick={()=>setAdmin(false)} style={{marginTop:20,width:'100%',padding:10,borderRadius:999,border:'none',background:'#facc15',fontWeight:800}}>← Back to Website</button>
          <div style={{marginTop:20,fontSize:11,opacity:.6}}>CIPC: Khilane Travel (Pty) Ltd<br/>FNB: Business Account Linked<br/>Domain: khilanetravel.co.za</div>
        </div>
        <div style={{flex:1,padding:24}}>
          <h1 style={{fontWeight:900,fontSize:28}}>Business OS — Admin Side</h1>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginTop:20}}>
            <div style={{background:'white',padding:16,borderRadius:14}}><div>Revenue Today</div><div style={{fontWeight:900,fontSize:22}}>R 12,450</div></div>
            <div style={{background:'white',padding:16,borderRadius:14}}><div>Bookings</div><div style={{fontWeight:900,fontSize:22}}>24</div></div>
            <div style={{background:'white',padding:16,borderRadius:14}}><div>Payroll Due</div><div style={{fontWeight:900,fontSize:22}}>R 18,000</div></div>
            <div style={{background:'white',padding:16,borderRadius:14}}><div>SARS VAT Due</div><div style={{fontWeight:900,fontSize:22}}>R 2,340</div></div>
          </div>
          <div style={{marginTop:24,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <div style={{background:'white',padding:18,borderRadius:14}}><b>Finance Department</b><p style={{fontSize:13,color:'#64748b',marginTop:6}}>Income, Expenses, P&L, FNB bank feed. API ready in backend/routes/finance.js</p></div>
            <div style={{background:'white',padding:18,borderRadius:14}}><b>SARS Module</b><p style={{fontSize:13,color:'#64748b',marginTop:6}}>VAT201, EMP201, ITR14 auto-calc. 15% VAT, PAYE, UIF, SDL.</p></div>
            <div style={{background:'white',padding:18,borderRadius:14}}><b>Payroll</b><p style={{fontSize:13,color:'#64748b',marginTop:6}}>Add staff, salaries, generate payslips PDF.</p></div>
            <div style={{background:'white',padding:18,borderRadius:14}}><b>Bookkeeper</b><p style={{fontSize:13,color:'#64748b',marginTop:6}}>Invoices, Quotes, VAT invoices, FNB reconciliation.</p></div>
          </div>
        </div>
      </div>
    )
  }

  return(
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800;900&display=swap');*{font-family:Outfit;box-sizing:border-box}`}</style>
      <div style={{background:'#0a1931',color:'white',padding:'12px 3%',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',gap:10,alignItems:'center'}}><div style={{width:38,height:38,background:'white',color:'#0a1931',display:'grid',placeItems:'center',borderRadius:10,fontWeight:900}}>K</div><div style={{fontWeight:900,color:'#facc15'}}>KHILANE TRAVEL</div></div>
        <div style={{display:'flex',gap:16,fontWeight:700}}>{['Flights','Stays','Cars','Buses'].map(k=><span key={k} onClick={()=>setTab(k.toLowerCase())} style={{cursor:'pointer',borderBottom:tab===k.toLowerCase()?'3px solid #facc15':'none'}}>{k}</span>)}</div>
        <button onClick={()=>setAdmin(true)} style={{background:'#facc15',border:'none',padding:'8px 16px',borderRadius:999,fontWeight:800}}>ADMIN OS</button>
      </div>
      <div style={{background:'#facc15',textAlign:'center',padding:'8px',fontWeight:900,fontSize:12}}>🇿🇦 khilanetravel.co.za — PROUDLY SA — LOWEST PRICES GUARANTEED 🇿🇦</div>
      <div style={{height:380,background:`linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.4)),url('https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=1600') center/cover`,display:'flex',alignItems:'center',padding:'0 5%'}}>
        <h1 style={{color:'white',fontSize:48,fontWeight:900,lineHeight:.9}}>South Africa's<br/>Cheapest<br/>Travel Booking</h1>
      </div>
      <div style={{maxWidth:1100,margin:'-60px auto 0',background:'white',borderRadius:20,boxShadow:'0 20px 60px rgba(0,0,0,.18)',padding:20}}>
        {tab==='flights' && (<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr 140px',gap:10}}><select value={from} onChange={e=>setFrom(e.target.value)} style={{padding:12,borderRadius:10}}><option>JNB</option><option>DUR</option><option>CPT</option></select><select value={to} onChange={e=>setTo(e.target.value)} style={{padding:12,borderRadius:10}}><option>CPT</option><option>JNB</option><option>DUR</option></select><input type="date" value={depart} onChange={e=>setDepart(e.target.value)} style={{padding:11,borderRadius:10}}/><input type="date" value={ret} onChange={e=>setRet(e.target.value)} style={{padding:11,borderRadius:10}}/><button onClick={searchFlights} style={{background:'#facc15',border:'none',borderRadius:999,fontWeight:800}}>Search Flights</button></div>)}
        {tab==='stays' && (<div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 140px',gap:10}}><input value={city} onChange={e=>setCity(e.target.value)} placeholder="City" style={{padding:12,borderRadius:10,border:'1px solid #ddd'}}/><input type="date" style={{padding:11,borderRadius:10}}/><input type="date" style={{padding:11,borderRadius:10}}/><button style={{background:'#facc15',border:'none',borderRadius:999,fontWeight:800}}>Search Stays</button></div>)}
        {tab==='cars' && <div>Car hire via DiscoverCars API — live when you add API key</div>}
        {tab==='buses' && <div>Bus via Intercape — WhatsApp engine + custom inventory</div>}
      </div>
    </>
  )
}
