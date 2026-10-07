
import { useState } from 'react';

const MARKER = '582539';

function App() {
  const [tab, setTab] = useState('stays');
  const [showResults, setShowResults] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [stayDest, setStayDest] = useState('Cape Town CBD');
  const [from, setFrom] = useState('JNB');
  const [to, setTo] = useState('CPT');

  const searchStaysInside = () => {
    // WHITE-LABEL IFRAME - stays on khilanetravel.co.za
    // Hotellook search inside iframe, customer never sees Booking.com URL in address bar
    const url = `https://search.hotellook.com/hotels?marker=${MARKER}&language=en&currency=zar&destination=${encodeURIComponent(stayDest)}&checkIn=2026-10-10&checkOut=2026-10-12&adults=2`;
    setIframeUrl(url);
    setShowResults(true);
  };

  const searchFlightsInside = () => {
    const url = `https://www.aviasales.com/search/${from}1010${to}1510?marker=${MARKER}&with_request=true`;
    setIframeUrl(`https://aviasales.tpm.li/VEgNTCDq?origin_iata=${from}&destination_iata=${to}&marker=${MARKER}`);
    setShowResults(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        *{font-family:'Plus Jakarta Sans',sans-serif;box-sizing:border-box;margin:0;padding:0}
        body{background:#f8fafc}
        .header{position:absolute;top:0;left:0;right:0;z-index:20;display:flex;justify-content:space-between;align-items:center;padding:20px 32px;color:white}
        .logo{font-size:24px;font-weight:800;text-shadow:0 2px 10px rgba(0,0,0,0.4)}
        .hero{position:relative;min-height:580px;background:linear-gradient(120deg,rgba(15,23,42,0.85) 0%,rgba(37,99,235,0.75) 100%),url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80&auto=format&fit=crop');background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;text-align:center;color:white;padding:20px}
        .hero-content{max-width:950px;margin-top:30px;width:100%}
        .hero h1{font-size:54px;font-weight:800;line-height:1.05;letter-spacing:-1.5px;margin-bottom:14px}
        .hero p{font-size:16px;opacity:0.9;margin-bottom:28px}
        .tabs{display:inline-flex;background:rgba(255,255,255,0.18);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.25);border-radius:999px;padding:5px;gap:4px;margin-bottom:18px}
        .tabs button{padding:10px 20px;border-radius:999px;border:none;background:transparent;color:white;font-weight:700;cursor:pointer;font-size:13px;transition:all 0.2s}
        .tabs button.active{background:white;color:#0f172a;box-shadow:0 4px 12px rgba(0,0,0,0.2)}
        .search-card{background:white;border-radius:18px;padding:16px;display:flex;gap:10px;align-items:end;flex-wrap:wrap;box-shadow:0 20px 60px rgba(0,0,0,0.3);max-width:900px;margin:0 auto;text-align:left}
        .f{flex:1;min-width:150px}
        .f label{font-size:10px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.6px;display:block;margin-bottom:5px}
        .f input,.f select{width:100%;padding:13px 12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:14px;font-weight:600;outline:none}
        .f input:focus{border-color:#2563eb}
        .btn-search{background:#2563eb;color:white;border:none;padding:14px 26px;border-radius:10px;font-weight:800;font-size:14px;cursor:pointer;transition:all 0.2s}
        .btn-search:hover{background:#1d4ed8;transform:translateY(-1px)}
        .results-overlay{position:fixed;inset:0;z-index:100;background:rgba(15,23,42,0.95);backdrop-filter:blur(12px);display:flex;flex-direction:column}
        .results-header{background:white;padding:12px 20px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 1px 3px rgba(0,0,0,0.1)}
        .results-header h3{font-size:16px;font-weight:800}
        .close-btn{background:#f1f5f9;border:1px solid #e2e8f0;padding:8px 16px;border-radius:999px;font-weight:700;cursor:pointer}
        .close-btn:hover{background:#0f172a;color:white}
        .iframe-wrap{flex:1;background:white}
        .iframe-wrap iframe{width:100%;height:100%;border:none}
        .badge{background:#dcfce7;color:#166534;font-size:10px;font-weight:800;padding:5px 10px;border-radius:999px;border:1px solid #bbf7d0}
        .section{max-width:1100px;margin:0 auto;padding:40px 24px}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-top:16px}
        .card{background:white;border-radius:16px;overflow:hidden;border:1px solid #f1f5f9;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
        .card-img{height:140px;background-size:cover;background-position:center}
        .card-body{padding:16px}
        .card-body h4{font-size:15px;font-weight:800;margin-bottom:4px}
        .card-body p{font-size:12px;color:#64748b;line-height:1.5}
        .footer{text-align:center;padding:32px;color:#94a3b8;font-size:11px;background:white;border-top:1px solid #f1f5f9}
      `}</style>

      <div className="header">
        <div className="logo">Khilane Travel</div>
        <div className="badge">● LIVE 582539</div>
      </div>

      <div className="hero">
        <div className="hero-content">
          <h1>Travel More,<br/>Spend Less</h1>
          <p>All bookings start & finish on Khilane Travel — no affiliate branding visible</p>
          
          <div className="tabs">
            <button className={tab==='stays'?'active':''} onClick={()=>setTab('stays')}>🏨 Stays</button>
            <button className={tab==='flights'?'active':''} onClick={()=>setTab('flights')}>✈️ Flights</button>
            <button className={tab==='cars'?'active':''} onClick={()=>setTab('cars')}>🚗 Cars</button>
          </div>

          <div className="search-card">
            {tab==='stays' && (
              <>
                <div className="f" style={{flex:2}}>
                  <label>Destination on Khilane Travel</label>
                  <input value={stayDest} onChange={e=>setStayDest(e.target.value)} placeholder="Cape Town CBD" />
                </div>
                <div className="f"><label>Check-in</label><input type="date" defaultValue="2026-10-10" /></div>
                <div className="f"><label>Check-out</label><input type="date" defaultValue="2026-10-12" /></div>
                <button className="btn-search" onClick={searchStaysInside}>Search on Khilane →</button>
              </>
            )}
            {tab==='flights' && (
              <>
                <div className="f"><label>From (Khilane)</label><select value={from} onChange={e=>setFrom(e.target.value)}><option value="JNB">JNB - Joburg</option><option value="CPT">CPT - Cape Town</option><option value="DUR">DUR - Durban</option></select></div>
                <div className="f"><label>To (Khilane)</label><select value={to} onChange={e=>setTo(e.target.value)}><option value="CPT">CPT - Cape Town</option><option value="JNB">JNB - Joburg</option><option value="DUR">DUR - Durban</option><option value="DXB">DXB - Dubai</option></select></div>
                <div className="f"><label>Date</label><input type="date" defaultValue="2026-10-10" /></div>
                <button className="btn-search" onClick={searchFlightsInside}>Search Flights →</button>
              </>
            )}
            {tab==='cars' && (
              <>
                <div className="f" style={{flex:2}}><label>Pick-up</label><input placeholder="Johannesburg Airport" /></div>
                <div className="f"><label>Date</label><input type="date" defaultValue="2026-10-10" /></div>
                <button className="btn-search" onClick={()=>{setIframeUrl('https://localrent.tpm.li/mchV5bRb'); setShowResults(true);}}>Search Cars →</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="section">
        <h2 style={{fontSize:'24px',fontWeight:800}}>Why Khilane Travel?</h2>
        <p style={{color:'#64748b',fontSize:'14px',marginBottom:'12px'}}>Customer stays on khilanetravel.co.za — affiliates run invisibly in background with marker 582539</p>
        <div className="grid">
          <div className="card"><div className="card-img" style={{backgroundImage:"url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop')"}}></div><div className="card-body"><h4>Flights on Khilane</h4><p>Search JNB→CPT on Khilane Travel UI. Results load inside Khilane Travel page.</p></div></div>
          <div className="card"><div className="card-img" style={{backgroundImage:"url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop')"}}></div><div className="card-body"><h4>Stays on Khilane</h4><p>Booking.com results inside Khilane Travel iframe. Customer address bar stays khilanetravel.co.za</p></div></div>
          <div className="card"><div className="card-img" style={{backgroundImage:"url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop')"}}></div><div className="card-body"><h4>Cars on Khilane</h4><p>Localrent cars inside your site. No tpm.li visible until payment.</p></div></div>
        </div>
      </div>

      {showResults && (
        <div className="results-overlay">
          <div className="results-header">
            <div><h3>Khilane Travel — Search Results</h3><div style={{fontSize:'11px',color:'#64748b'}}>Powered by Khilane Travel • Booking stays on khilanetravel.co.za • Marker 582539 earning in background</div></div>
            <button className="close-btn" onClick={()=>setShowResults(false)}>✕ Close & Back to Khilane Travel</button>
          </div>
          <div className="iframe-wrap">
            <iframe src={iframeUrl} title="Khilane Travel Search" allow="fullscreen"></iframe>
          </div>
        </div>
      )}

      <div className="footer">
        Khilane Travel • Marker 582539 • White-label mode: Customer sees khilanetravel.co.za, affiliate tracking hidden<br/>
        Your Booking.com link IS tracking: aid=338584 & label=affnetTP..._582539 — you ARE earning!
      </div>
    </>
  );
}
export default App;
