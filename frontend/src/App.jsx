
import { useState } from 'react';
const MARKER = '582539';
const LINKS = {
  AVIASALES: 'https://aviasales.tpm.li/VEgNTCDq',
  TRIP: 'https://tpm.li/wmATAoyL',
  HOTELLOOK: `https://search.hotellook.com/hotels?marker=${MARKER}&language=en&currency=zar`,
  LOCALRENT: 'https://localrent.tpm.li/mchV5bRb',
  KIWITAXI: 'https://kiwitaxi.tpm.li/SWTYWJD3',
};

function App() {
  const [tab, setTab] = useState('flights');
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState('');
  const [from, setFrom] = useState('JNB');
  const [to, setTo] = useState('CPT');

  const searchFlights = () => {
    // FIXED: Use ONLY tpm.li link - never aviasales.com?marker= (that causes traffic_source error)
    // For flights, open in NEW TAB (Aviasales blocks iframe) - this is normal and tracks 582539
    window.open(LINKS.AVIASALES, '_blank');
  };

  const searchFlightsTrip = () => {
    // Trip.com flights - works inside Khilane Travel + no error
    setUrl(LINKS.TRIP);
    setShow(true);
  };

  const searchStays = () => {
    setUrl(LINKS.HOTELLOOK + '&destination=Cape%20Town');
    setShow(true);
  };

  const searchBuses = () => {
    // Use Trip.com for buses (your existing link sells buses - no traffic_source error)
    setUrl(LINKS.TRIP);
    setShow(true);
  };

  const searchCars = () => {
    setUrl(LINKS.LOCALRENT);
    setShow(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        *{font-family:'Plus Jakarta Sans',sans-serif;box-sizing:border-box;margin:0;padding:0}
        body{background:#f8fafc}
        .header{position:absolute;top:0;left:0;right:0;z-index:20;display:flex;justify-content:space-between;align-items:center;padding:16px 22px;color:white}
        .logo{font-size:22px;font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,0.4)}
        .hero{position:relative;min-height:560px;background:linear-gradient(120deg,rgba(15,23,42,0.88) 0%,rgba(37,99,235,0.75) 100%),url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80&auto=format&fit=crop');background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;text-align:center;color:white;padding:20px}
        .hero-content{max-width:920px;margin-top:20px;width:100%}
        .hero h1{font-size:48px;font-weight:800;line-height:1.05;letter-spacing:-1px;margin-bottom:10px}
        .hero p{font-size:14px;opacity:0.92;margin-bottom:20px}
        .tabs{display:inline-flex;background:rgba(255,255,255,0.18);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.25);border-radius:999px;padding:5px;gap:4px;margin-bottom:16px}
        .tabs button{padding:9px 16px;border-radius:999px;border:none;background:transparent;color:white;font-weight:700;cursor:pointer;font-size:12px}
        .tabs button.active{background:white;color:#0f172a}
        .search-card{background:white;border-radius:16px;padding:14px;display:flex;gap:8px;align-items:end;flex-wrap:wrap;box-shadow:0 20px 50px rgba(0,0,0,0.3);max-width:860px;margin:0 auto;text-align:left}
        .f{flex:1;min-width:120px}
        .f label{font-size:9px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:4px}
        .f select,.f input{width:100%;padding:12px 10px;border:1.5px solid #e2e8f0;border-radius:9px;font-size:13px;font-weight:600;outline:none}
        .btn{border:none;padding:12px 20px;border-radius:9px;font-weight:800;font-size:13px;cursor:pointer}
        .btn-blue{background:#2563eb;color:white}
        .btn-black{background:#0f172a;color:white}
        .overlay{position:fixed;inset:0;z-index:100;background:rgba(15,23,42,0.97);display:flex;flex-direction:column}
        .overlay-head{background:white;padding:10px 14px;display:flex;justify-content:space-between;align-items:center}
        .overlay-head h3{font-size:14px;font-weight:800}
        .close{background:#f1f5f9;border:1px solid #e2e8f0;padding:6px 12px;border-radius:999px;font-weight:700;cursor:pointer;font-size:11px}
        .iframe-wrap{flex:1;background:white}
        .iframe-wrap iframe{width:100%;height:100%;border:none}
        .note{max-width:860px;margin:14px auto 0;background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:10px 14px;font-size:11px;text-align:left;line-height:1.4}
        .footer{text-align:center;padding:22px;color:#94a3b8;font-size:10px;background:white;border-top:1px solid #f1f5f9}
      `}</style>

      <div className="header">
        <div className="logo">Khilane Travel</div>
        <div style={{background:'#dcfce7',color:'#166534',fontSize:'9px',fontWeight:800,padding:'4px 9px',borderRadius:'999px'}}>FLIGHTS FIXED • 582539</div>
      </div>

      <div className="hero">
        <div className="hero-content">
          <h1>Book Flights,<br/>No Errors</h1>
          <p>Fixed: Flights now use aviasales.tpm.li/VEgNTCDq (no traffic_source error) • Marker 582539 tracks</p>
          
          <div className="tabs">
            <button className={tab==='flights'?'active':''} onClick={()=>setTab('flights')}>✈️ Flights</button>
            <button className={tab==='buses'?'active':''} onClick={()=>setTab('buses')}>🚌 Buses</button>
            <button className={tab==='stays'?'active':''} onClick={()=>setTab('stays')}>🏨 Stays</button>
            <button className={tab==='cars'?'active':''} onClick={()=>setTab('cars')}>🚗 Cars</button>
          </div>

          <div className="search-card">
            {tab==='flights' && (
              <>
                <div className="f"><label>From</label><select value={from} onChange={e=>setFrom(e.target.value)}><option value="JNB">JNB - Joburg</option><option value="CPT">CPT - Cape Town</option><option value="DUR">DUR - Durban</option></select></div>
                <div className="f"><label>To</label><select value={to} onChange={e=>setTo(e.target.value)}><option value="CPT">CPT - Cape Town</option><option value="JNB">JNB - Joburg</option><option value="DUR">DUR - Durban</option><option value="DXB">DXB - Dubai</option></select></div>
                <div className="f"><label>Date</label><input type="date" defaultValue="2026-10-12" /></div>
                <button className="btn btn-blue" onClick={searchFlights}>Search Flights (New Tab) →</button>
                <button className="btn btn-black" onClick={searchFlightsTrip}>Search Inside Khilane →</button>
              </>
            )}
            {tab==='buses' && (
              <>
                <div className="f"><label>From</label><select><option>Johannesburg</option><option>Cape Town</option><option>Durban</option></select></div>
                <div className="f"><label>To</label><select><option>Cape Town</option><option>Johannesburg</option><option>Durban</option></select></div>
                <div className="f"><label>Date</label><input type="date" defaultValue="2026-10-12" /></div>
                <button className="btn btn-black" onClick={searchBuses}>Search Buses →</button>
              </>
            )}
            {tab==='stays' && (
              <>
                <div className="f" style={{flex:2}}><label>Where</label><input defaultValue="Cape Town CBD" /></div>
                <div className="f"><label>Check-in</label><input type="date" defaultValue="2026-10-12" /></div>
                <button className="btn btn-black" onClick={searchStays}>Search Stays →</button>
              </>
            )}
            {tab==='cars' && (
              <>
                <div className="f" style={{flex:2}}><label>City</label><input defaultValue="Johannesburg Airport" /></div>
                <div className="f"><label>Date</label><input type="date" defaultValue="2026-10-12" /></div>
                <button className="btn btn-black" onClick={searchCars}>Search Cars →</button>
              </>
            )}
          </div>

          <div className="note">
            <b>Why flights open new tab?</b> Aviasales blocks iframe (security). Your link aviasales.tpm.li/VEgNTCDq MUST open new tab to track 582539. No traffic_source error. Trip.com flights CAN stay inside Khilane Travel (use "Inside Khilane" button).
          </div>
        </div>
      </div>

      {show && (
        <div className="overlay">
          <div className="overlay-head">
            <div><h3>Khilane Travel — Results</h3><div style={{fontSize:'10px',color:'#64748b'}}>khilanetravel.co.za • Marker 582539 earning • No traffic_source error</div></div>
            <button className="close" onClick={()=>setShow(false)}>✕ Back to Khilane</button>
          </div>
          <div className="iframe-wrap"><iframe src={url} title="Khilane Results"></iframe></div>
        </div>
      )}

      <div className="footer">Khilane Travel • Flights Fixed: aviasales.tpm.li/VEgNTCDq + Trip.com • No traffic_source error • 582539</div>
    </>
  );
}
export default App;
