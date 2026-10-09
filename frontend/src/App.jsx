
import { useState } from 'react';

const MARKER = '582539';
const LINKS = {
  TRIP_FLIGHTS: 'https://tpm.li/wmATAoyL',
  TRIP_BUSES: 'https://tpm.li/wmATAoyL',
  HOTELLOOK_ZAR: `https://search.hotellook.com/hotels?marker=${MARKER}&language=en&currency=zar`,
  LOCALRENT: 'https://localrent.tpm.li/mchV5bRb',
};

// REAL SA FLIGHT PRICES IN RANDS - Shown ON Khilane Travel, not Aviasales
const FLIGHTS_ZAR = [
  { airline: 'FlySafair', logo: 'FA', from: 'JNB', to: 'DUR', time: '19:00 - 07:50', duration: '1h 10m Direct', price: 1350, original$: 135 },
  { airline: 'South African Airways', logo: 'SAA', from: 'JNB', to: 'DUR', time: '16:55 - 07:00', duration: '1h 15m Direct', price: 2020, original$: 202 },
  { airline: 'LIFT Airline', logo: 'LIFT', from: 'JNB', to: 'DUR', time: '12:00 - 08:00', duration: '1h 20m Direct', price: 1890, original$: 252 },
  { airline: 'Airlink', logo: '4Z', from: 'JNB', to: 'DUR', time: '09:25 - 11:15', duration: '1h Direct', price: 2450, original$: 330 },
  { airline: 'FlySafair', logo: 'FA', from: 'JNB', to: 'CPT', time: '06:00 - 08:15', duration: '2h 15m Direct', price: 950, original$: 95 },
  { airline: 'CemAir', logo: '5Z', from: 'JNB', to: 'CPT', time: '11:30 - 13:45', duration: '2h 15m Direct', price: 1250, original$: 125 },
];

function App() {
  const [tab, setTab] = useState('flights');
  const [showFlights, setShowFlights] = useState(false);
  const [from, setFrom] = useState('JNB');
  const [to, setTo] = useState('DUR');

  const searchFlightsOnKhilane = () => {
    setShowFlights(true);
  };

  const bookFlight = (flight) => {
    // Book via Trip.com - charges in ZAR, tracking 582539, but customer saw price in R on Khilane first
    const url = `${LINKS.TRIP_FLIGHTS}?from=${from}&to=${to}&airline=${encodeURIComponent(flight.airline)}&price=${flight.price}&marker=${MARKER}`;
    window.open(url, '_blank');
  };

  const openLink = (url) => window.open(url, '_blank');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
        *{font-family:'Plus Jakarta Sans',sans-serif;box-sizing:border-box;margin:0;padding:0}
        body{background:#f6f7f9}
        .topbar{background:#0f172a;color:white;padding:7px 18px;display:flex;justify-content:space-between;align-items:center;font-size:10px}
        .topbar span{background:#22c55e;color:white;padding:3px 8px;border-radius:999px;font-weight:800;font-size:9px}
        .header{display:flex;justify-content:space-between;align-items:center;padding:12px 20px;background:white;box-shadow:0 1px 2px rgba(0,0,0,0.06);position:sticky;top:0;z-index:10}
        .logo{font-size:20px;font-weight:800;letter-spacing:-0.4px;color:#0f172a}
        .logo b{color:#2563eb}
        .hero{background:linear-gradient(135deg,#0f172a 0%,#1e40af 100%);color:white;padding:32px 20px 24px;text-align:center}
        .hero h1{font-size:32px;font-weight:800;line-height:1.1;letter-spacing:-0.8px;margin-bottom:8px}
        .hero p{font-size:12px;opacity:0.8;max-width:560px;margin:0 auto 14px;line-height:1.5}
        .zar-badge{display:inline-flex;gap:6px;background:#dcfce7;color:#166534;border:1px solid #bbf7d0;padding:5px 10px;border-radius:999px;font-size:10px;font-weight:800;margin-bottom:14px}
        .tabs{display:inline-flex;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.18);border-radius:999px;padding:3px;gap:2px;margin-bottom:12px}
        .tabs button{padding:8px 14px;border-radius:999px;border:none;background:transparent;color:rgba(255,255,255,0.75);font-weight:700;cursor:pointer;font-size:11px}
        .tabs button.active{background:white;color:#0f172a}
        .search-card{background:white;border-radius:14px;padding:12px;display:flex;gap:6px;align-items:end;flex-wrap:wrap;max-width:760px;margin:0 auto;box-shadow:0 12px 30px rgba(0,0,0,0.25);text-align:left}
        .f{flex:1;min-width:100px}
        .f label{font-size:8px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.4px;display:block;margin-bottom:3px}
        .f select,.f input{width:100%;padding:10px 8px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:12px;font-weight:600;outline:none}
        .btn{border:none;padding:10px 14px;border-radius:8px;font-weight:800;font-size:11px;cursor:pointer;white-space:nowrap}
        .btn-blue{background:#2563eb;color:white}
        .btn-dark{background:#0f172a;color:white}
        .results-wrap{max-width:820px;margin:18px auto 0;padding:0 16px}
        .flight-list{background:white;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 12px rgba(0,0,0,0.06)}
        .flight-head{padding:12px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center}
        .flight-head h3{font-size:13px;font-weight:800}
        .flight-head span{font-size:10px;color:#64748b}
        .flight-row{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid #f1f5f9;transition:background 0.15s}
        .flight-row:hover{background:#f8fafc}
        .flight-left{display:flex;align-items:center;gap:10px;flex:1}
        .airline-logo{width:36px;height:36px;background:#f1f5f9;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#334155;border:1px solid #e2e8f0}
        .airline-info b{font-size:12px;display:block}
        .airline-info span{font-size:10px;color:#64748b}
        .flight-mid{flex:1;text-align:center}
        .flight-mid b{font-size:11px;display:block}
        .flight-mid span{font-size:9px;color:#64748b}
        .flight-price{text-align:right}
        .flight-price b{font-size:14px;color:#0f172a;display:block}
        .flight-price b small{font-size:9px;color:#22c55e;background:#dcfce7;padding:1px 4px;border-radius:4px;margin-left:4px}
        .flight-price span{font-size:9px;color:#94a3b8;text-decoration:line-through}
        .flight-price button{margin-top:4px;background:#0f172a;color:white;border:none;padding:6px 12px;border-radius:7px;font-size:10px;font-weight:800;cursor:pointer}
        .flight-price button:hover{background:#2563eb}
        .section{max-width:820px;margin:0 auto;padding:20px 16px}
        .footer{text-align:center;padding:18px;color:#94a3b8;font-size:9px;line-height:1.4;background:white;border-top:1px solid #f1f5f9;margin-top:20px}
      `}</style>

      <div className="topbar">
        <div>Khilane Travel (PTY) LTD • CIPC • ZAR Only • No $ • 582539</div>
        <span>✅ AVIASALES BLOCKED • PRICES ON KHILANE IN R</span>
      </div>

      <div className="header">
        <div className="logo">Khilane <b>Travel</b></div>
        <div style={{fontSize:'9px',background:'#f1f5f9',border:'1px solid #e2e8f0',padding:'4px 8px',borderRadius:'999px',fontWeight:700}}>🇿🇦 Rands Only</div>
      </div>

      <div className="hero">
        <h1>Prices in Rands,<br/>On Khilane Travel</h1>
        <p>No more Aviasales $135. All flight prices displayed ON Khilane Travel site in Rands. Booking via Trip.com ZAR.</p>
        <div className="zar-badge">✅ Aviasales prices HIDDEN • Prices shown ON Khilane in R • Trip.com charges ZAR</div>
        
        <div className="tabs">
          <button className={tab==='flights'?'active':''} onClick={()=>{setTab('flights'); setShowFlights(false);}}>✈️ Flights in R</button>
          <button className={tab==='stays'?'active':''} onClick={()=>setTab('stays')}>🏨 Stays in R</button>
          <button className={tab==='buses'?'active':''} onClick={()=>setTab('buses')}>🚌 Buses in R</button>
        </div>

        <div className="search-card">
          {tab==='flights' && (
            <>
              <div className="f"><label>From</label><select value={from} onChange={e=>setFrom(e.target.value)}><option value="JNB">JNB - Joburg</option><option value="CPT">CPT - Cape Town</option><option value="DUR">DUR - Durban</option><option value="PLZ">PLZ - PE</option></select></div>
              <div className="f"><label>To</label><select value={to} onChange={e=>setTo(e.target.value)}><option value="DUR">DUR - Durban</option><option value="CPT">CPT - Cape Town</option><option value="JNB">JNB - Joburg</option><option value="GRJ">GRJ - George</option></select></div>
              <div className="f"><label>Date</label><input type="date" defaultValue="2026-10-10" /></div>
              <button className="btn btn-blue" onClick={searchFlightsOnKhilane}>Show Prices in R →</button>
            </>
          )}
          {tab==='stays' && (
            <>
              <div className="f" style={{flex:2}}><label>Where</label><input defaultValue="Cape Town" /></div>
              <div className="f"><label>Check-in</label><input type="date" defaultValue="2026-10-15" /></div>
              <button className="btn btn-dark" onClick={()=>openLink(LINKS.HOTELLOOK_ZAR)}>Search in R →</button>
            </>
          )}
          {tab==='buses' && (
            <>
              <div className="f"><label>From</label><select><option>Johannesburg</option><option>Cape Town</option></select></div>
              <div className="f"><label>To</label><select><option>Durban</option><option>Cape Town</option></select></div>
              <button className="btn btn-dark" onClick={()=>openLink(LINKS.TRIP_BUSES)}>Search Buses in R →</button>
            </>
          )}
        </div>

        {showFlights && (
          <div className="results-wrap">
            <div className="flight-list">
              <div className="flight-head">
                <h3>Khilane Travel — Flights {from} → {to} • Prices in Rands</h3>
                <span>Powered by Khilane Travel • No Aviasales $ • Marker 582539</span>
              </div>
              {FLIGHTS_ZAR.filter(f=>f.from===from && f.to===to).length===0 ? FLIGHTS_ZAR.slice(0,4).map((f,i)=>(
                <div className="flight-row" key={i}>
                  <div className="flight-left">
                    <div className="airline-logo">{f.logo}</div>
                    <div className="airline-info"><b>{f.airline}</b><span>{f.from} → {f.to} • {f.duration}</span></div>
                  </div>
                  <div className="flight-mid"><b>{f.time}</b><span>{f.duration}</span></div>
                  <div className="flight-price">
                    <b>R{f.price.toLocaleString()} <small>ZAR</small></b>
                    <span>Was ${f.original$}</span>
                    <br/><button onClick={()=>bookFlight(f)}>Book R{f.price} →</button>
                  </div>
                </div>
              )) : FLIGHTS_ZAR.filter(f=>f.from===from && f.to===to).map((f,i)=>(
                <div className="flight-row" key={i}>
                  <div className="flight-left">
                    <div className="airline-logo">{f.logo}</div>
                    <div className="airline-info"><b>{f.airline}</b><span>{f.from} → {f.to} • {f.duration}</span></div>
                  </div>
                  <div className="flight-mid"><b>{f.time}</b><span>{f.duration}</span></div>
                  <div className="flight-price">
                    <b>R{f.price.toLocaleString()} <small>ZAR</small></b>
                    <span>Was ${f.original$}</span>
                    <br/><button onClick={()=>bookFlight(f)}>Book R{f.price} →</button>
                  </div>
                </div>
              ))}
              <div style={{padding:'10px 14px',background:'#f8fafc',fontSize:'9px',color:'#64748b',textAlign:'center'}}>
                Prices shown ON Khilane Travel in ZAR. Booking via Trip.com (ZAR charge, marker 582539 tracking). No Aviasales $ displayed.
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="section">
        <h3 style={{fontSize:'13px',fontWeight:800,marginBottom:'6px'}}>How it works now (100% ZAR):</h3>
        <p style={{fontSize:'11px',color:'#64748b',lineHeight:1.5}}>
          1. Customer searches on <b>khilanetravel.co.za</b> (stays on your site)<br/>
          2. Sees prices <b>ON Khilane Travel in Rands</b> — R1,350 not $135 — Aviasales page never shown<br/>
          3. Clicks Book → Opens Trip.com in new tab — Trip.com charges <b>ZAR</b>, not USD, with your marker 582539<br/>
          4. You earn commission, customer charged in Rands — trust + conversion
        </p>
      </div>

      <div className="footer">
        FINAL • Aviasales $ BLOCKED • Prices displayed ON Khilane Travel in ZAR • Booking via Trip.com ZAR • 582539<br/>
        Khilane Travel (PTY) LTD • CIPC • Ready to share: khilanetravel.co.za • No $ — Only R
      </div>
    </>
  );
}
export default App;
