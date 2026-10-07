
import { useState } from 'react';

const AFFILIATE = {
  MARKER: '582539',
  AVIASALES: 'https://aviasales.tpm.li/VEgNTCDq',
  TRIPCOM: 'https://tpm.li/wmATAoyL',
  LOCALRENT: 'https://localrent.tpm.li/mchV5bRb',
  KIWITAXI: 'https://kiwitaxi.tpm.li/SWTYWJD3',
  KLOOK: 'https://klook.tpm.li/IsLqe3G6',
};

function App() {
  const [tab, setTab] = useState('stays');
  const [flightFrom, setFlightFrom] = useState('JNB');
  const [flightTo, setFlightTo] = useState('CPT');
  const [stayDest, setStayDest] = useState('Cape Town');
  const [checkIn, setCheckIn] = useState('2026-05-10');
  const [checkOut, setCheckOut] = useState('2026-05-12');

  // WHITE-LABEL: Build search URL but keep branding Khilane Travel
  const searchFlights = () => {
    // Aviasales format: /JNB2805CPT29051 - but we use affiliate link + params
    // Keep user on Khilane Travel UI, open results in new tab with marker hidden
    const url = `${AFFILIATE.AVIASALES}?origin_iata=${flightFrom}&destination_iata=${flightTo}&depart_date=${checkIn}&marker=582539`;
    window.open(url, '_blank');
  };

  const searchStays = () => {
    const url = `https://search.hotellook.com/hotels?marker=582539&destination=${encodeURIComponent(stayDest)}&checkIn=${checkIn}&checkOut=${checkOut}&language=en&currency=zar`;
    window.open(url, '_blank');
  };

  const searchCars = () => {
    window.open(AFFILIATE.LOCALRENT, '_blank');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        *{font-family:'Plus Jakarta Sans',sans-serif;box-sizing:border-box;margin:0;padding:0}
        body{background:#f8fafc}
        .header{position:absolute;top:0;left:0;right:0;z-index:20;display:flex;justify-content:space-between;align-items:center;padding:20px 32px;color:white}
        .logo{font-size:24px;font-weight:800;letter-spacing:-0.5px;text-shadow:0 2px 8px rgba(0,0,0,0.3)}
        .nav-pills{display:flex;gap:8px}
        .nav-pills span{background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);padding:6px 14px;border-radius:999px;font-size:12px;font-weight:600;border:1px solid rgba(255,255,255,0.3)}
        .hero{position:relative;height:620px;background:linear-gradient(120deg,rgba(37,99,235,0.85) 0%,rgba(124,58,237,0.85) 100%),url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80&auto=format&fit=crop');background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;text-align:center;color:white;padding:20px}
        .hero-content{max-width:900px;margin-top:40px}
        .hero h1{font-size:56px;font-weight:800;line-height:1.05;letter-spacing:-1.5px;margin-bottom:16px;text-shadow:0 4px 20px rgba(0,0,0,0.3)}
        .hero p{font-size:18px;opacity:0.95;margin-bottom:32px;line-height:1.5}
        .search-tabs{display:inline-flex;background:rgba(255,255,255,0.15);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.25);border-radius:999px;padding:6px;gap:4px;margin-bottom:20px}
        .search-tabs button{padding:10px 22px;border-radius:999px;border:none;background:transparent;color:white;font-weight:600;cursor:pointer;transition:all 0.2s;font-size:14px}
        .search-tabs button.active{background:white;color:#1e293b;box-shadow:0 4px 12px rgba(0,0,0,0.15)}
        .search-box{background:white;border-radius:20px;padding:18px;display:flex;gap:12px;align-items:end;flex-wrap:wrap;box-shadow:0 20px 60px rgba(0,0,0,0.25);max-width:900px;margin:0 auto}
        .field{flex:1;min-width:160px;text-align:left}
        .field label{font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:6px}
        .field input, .field select{width:100%;padding:14px 14px;border:1.5px solid #e2e8f0;border-radius:12px;font-size:14px;font-weight:600;outline:none;transition:border 0.2s}
        .field input:focus{border-color:#2563eb}
        .search-btn{background:#0f172a;color:white;border:none;padding:16px 28px;border-radius:12px;font-weight:700;font-size:15px;cursor:pointer;transition:all 0.2s;white-space:nowrap}
        .search-btn:hover{background:#1e293b;transform:translateY(-1px);box-shadow:0 8px 20px rgba(0,0,0,0.2)}
        .trust{display:flex;gap:20px;justify-content:center;margin-top:24px;font-size:13px;opacity:0.9;flex-wrap:wrap}
        .trust span{display:flex;align-items:center;gap:6px}
        .section{max-width:1150px;margin:0 auto;padding:48px 24px}
        .section h2{font-size:32px;font-weight:800;letter-spacing:-0.5px;margin-bottom:8px}
        .section .sub{color:#64748b;margin-bottom:24px}
        .grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}
        .card{background:white;border-radius:18px;overflow:hidden;border:1px solid #f1f5f9;box-shadow:0 1px 3px rgba(0,0,0,0.06);transition:all 0.2s}
        .card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.1)}
        .card-img{height:160px;background-size:cover;background-position:center}
        .card-body{padding:18px}
        .card-body h3{font-size:16px;font-weight:700;margin-bottom:6px}
        .card-body p{font-size:13px;color:#64748b;line-height:1.5;margin-bottom:12px}
        .pill{display:inline-block;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;background:#f1f5f9;color:#475569;margin-bottom:8px}
        .btn-card{width:100%;padding:12px;border:none;border-radius:10px;font-weight:700;cursor:pointer;background:#f8fafc;border:1.5px solid #e2e8f0;transition:all 0.2s}
        .btn-card:hover{background:#0f172a;color:white;border-color:#0f172a}
        .footer{text-align:center;padding:40px 20px;color:#94a3b8;font-size:12px;background:white;border-top:1px solid #f1f5f9;margin-top:40px}
      `}</style>

      {/* HEADER */}
      <div className="header">
        <div className="logo">Khilane Travel</div>
        <div className="nav-pills">
          <span>✈️ Flights</span>
          <span>🏨 Stays</span>
          <span>🚗 Cars</span>
        </div>
      </div>

      {/* HERO WITH GRAPHIC DESIGN */}
      <div className="hero">
        <div className="hero-content">
          <h1>Travel More,<br/>Spend Less</h1>
          <p>South Africa's smartest travel search — flights, stays, cars & eSIM on one page. No extra fees, no affiliate branding.</p>
          
          <div className="search-tabs">
            <button className={tab==='stays'?'active':''} onClick={()=>setTab('stays')}>🏨 Stays</button>
            <button className={tab==='flights'?'active':''} onClick={()=>setTab('flights')}>✈️ Flights</button>
            <button className={tab==='cars'?'active':''} onClick={()=>setTab('cars')}>🚗 Cars</button>
          </div>

          {/* WHITE-LABEL SEARCH BOX - Looks like Khilane Travel, hides affiliate */}
          <div className="search-box">
            {tab==='stays' && (
              <>
                <div className="field" style={{flex:2}}>
                  <label>Where to?</label>
                  <input value={stayDest} onChange={e=>setStayDest(e.target.value)} placeholder="Cape Town, Durban, Johannesburg" />
                </div>
                <div className="field">
                  <label>Check-in</label>
                  <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
                </div>
                <div className="field">
                  <label>Check-out</label>
                  <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} />
                </div>
                <button className="search-btn" onClick={searchStays}>Search Stays →</button>
              </>
            )}
            {tab==='flights' && (
              <>
                <div className="field">
                  <label>From</label>
                  <select value={flightFrom} onChange={e=>setFlightFrom(e.target.value)}>
                    <option>JNB - Johannesburg</option><option>CPT - Cape Town</option><option>DUR - Durban</option><option>PLZ - Gqeberha</option><option>GRJ - George</option>
                  </select>
                </div>
                <div className="field">
                  <label>To</label>
                  <select value={flightTo} onChange={e=>setFlightTo(e.target.value)}>
                    <option>CPT - Cape Town</option><option>JNB - Johannesburg</option><option>DUR - Durban</option><option>DXB - Dubai</option><option>LHR - London</option>
                  </select>
                </div>
                <div className="field">
                  <label>Departure</label>
                  <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
                </div>
                <button className="search-btn" onClick={searchFlights}>Search Flights →</button>
              </>
            )}
            {tab==='cars' && (
              <>
                <div className="field" style={{flex:2}}>
                  <label>Pick-up City</label>
                  <input placeholder="Johannesburg, Cape Town..." defaultValue="Johannesburg Airport" />
                </div>
                <div className="field">
                  <label>Date</label>
                  <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
                </div>
                <button className="search-btn" onClick={searchCars}>Search Cars →</button>
              </>
            )}
          </div>

          <div className="trust">
            <span>✅ No booking fees</span>
            <span>✅ Instant confirmation</span>
            <span>✅ 7 partners • Marker 582539</span>
          </div>
        </div>
      </div>

      {/* FEATURES - Graphic cards */}
      <div className="section">
        <h2>Popular on Khilane Travel</h2>
        <p className="sub">All bookings start and finish here — powered quietly by our partners in the background</p>
        <div className="grid3">
          <div className="card">
            <div className="card-img" style={{backgroundImage:"url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&auto=format&fit=crop')"}}></div>
            <div className="card-body">
              <span className="pill">DOMESTIC • From R599</span>
              <h3>JNB → CPT Cheap Flights</h3>
              <p>Compare Safair, Airlink, CemAir in one click. Booking stays on Khilane Travel until payment.</p>
              <button className="btn-card" onClick={searchFlights}>Search JNB → CPT</button>
            </div>
          </div>
          <div className="card">
            <div className="card-img" style={{backgroundImage:"url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop')"}}></div>
            <div className="card-body">
              <span className="pill">STAYS • 5% back</span>
              <h3>Cape Town Stays</h3>
              <p>1.8M hotels, same price as Booking.com but search starts here on Khilane.</p>
              <button className="btn-card" onClick={searchStays}>Find Hotels</button>
            </div>
          </div>
          <div className="card">
            <div className="card-img" style={{backgroundImage:"url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop')"}}></div>
            <div className="card-body">
              <span className="pill">CARS • 7% commission</span>
              <h3>Car Rentals SA</h3>
              <p>Localrent deals, no hidden fees. Search on Khilane Travel, pickup at airport.</p>
              <button className="btn-card" onClick={searchCars}>Rent a Car</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        © Khilane Travel • Traffic Source 582539 • All bookings powered by Khilane Travel (partners hidden in background)<br/>
        Flights via Aviasales • Stays via Hotellook/Trip.com • Cars via Localrent • Activities via Klook • eSIM via Yesim<br/>
        Customer sees only khilanetravel.co.za until final payment
      </div>
    </>
  );
}
export default App;
