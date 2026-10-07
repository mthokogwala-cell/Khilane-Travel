
import { useState } from 'react';

const AFFILIATE = {
  MARKER: '582539',
  AVIASALES: 'https://aviasales.tpm.li/VEgNTCDq',
  TRIPCOM: 'https://tpm.li/wmATAoyL',
  LOCALRENT: 'https://localrent.tpm.li/mchV5bRb',
  KIWITAXI: 'https://kiwitaxi.tpm.li/SWTYWJD3',
  YESIM: 'https://yesim.tpm.li/3dLRV8Ha',
  KLOOK: 'https://klook.tpm.li/IsLqe3G6',
  WEGOTRIP: 'https://wegotrip.tpm.li/yps5iBGG',
  HOTELLOOK: 'https://search.hotellook.com/hotels?marker=582539&language=en',
};

function App() {
  const [tab, setTab] = useState('stays');
  const open = (url) => window.open(url, '_blank');
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        *{font-family:'Inter',sans-serif;box-sizing:border-box;margin:0;padding:0}
        body{background:#f8fafc}
        .header{background:white;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);position:sticky;top:0;z-index:10}
        .logo{font-size:26px;font-weight:800;color:#2563eb;letter-spacing:-1px}
        .badge{background:#dcfce7;color:#166534;font-size:11px;font-weight:700;padding:6px 12px;border-radius:999px;border:1px solid #bbf7d0}
        .nav{display:flex;gap:8px;padding:20px;justify-content:center;flex-wrap:wrap;background:white;border-bottom:1px solid #e2e8f0}
        .nav button{padding:10px 20px;border-radius:999px;border:1.5px solid #e2e8f0;background:white;font-weight:600;cursor:pointer;transition:all 0.2s;text-transform:capitalize}
        .nav button.active{background:#2563eb;color:white;border-color:#2563eb;box-shadow:0 4px 12px rgba(37,99,235,0.3)}
        .nav button:hover{border-color:#2563eb;color:#2563eb}
        .nav button.active:hover{color:white}
        .container{max-width:1100px;margin:0 auto;padding:24px}
        .title{font-size:32px;font-weight:800;margin-bottom:8px;letter-spacing:-0.5px}
        .subtitle{color:#64748b;margin-bottom:20px}
        .alert{background:#fefce8;border:1px solid #fde68a;padding:12px 16px;border-radius:12px;font-size:14px;margin-bottom:20px}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px}
        .card{background:white;border-radius:16px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.08),0 4px 12px rgba(0,0,0,0.04);border:1px solid #f1f5f9;transition:transform 0.2s}
        .card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.08)}
        .card h3{font-size:18px;font-weight:700;margin-bottom:8px}
        .card p{font-size:13px;color:#64748b;margin:8px 0;line-height:1.5}
        .btn{width:100%;padding:14px;border:none;border-radius:12px;font-weight:700;font-size:14px;cursor:pointer;margin-top:12px;transition:all 0.2s}
        .btn-blue{background:#2563eb;color:white}
        .btn-blue:hover{background:#1d4ed8;transform:scale(1.02)}
        .btn-green{background:#16a34a;color:white}
        .btn-orange{background:#ea580c;color:white}
        .btn-black{background:#0f172a;color:white}
        .btn-purple{background:#7c3aed;color:white}
        .live{font-size:11px;color:#16a34a;font-weight:700;margin-top:8px;display:flex;align-items:center;gap:4px}
        .footer{text-align:center;padding:32px;color:#94a3b8;font-size:12px;line-height:1.6}
        .hero{background:linear-gradient(135deg,#2563eb 0%,#7c3aed 100%);color:white;padding:32px 24px;border-radius:20px;margin-bottom:24px}
        .hero h2{font-size:28px;font-weight:800;margin-bottom:8px}
        .hero p{opacity:0.9;font-size:14px}
      `}</style>

      <div className="header">
        <div className="logo">Khilane Travel ✈️</div>
        <div className="badge">EARNING LIVE • 582539</div>
      </div>

      <div className="nav">
        {['stays','flights','cars','activities','esim'].map(t=>(
          <button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{t}</button>
        ))}
      </div>

      <div className="container">
        {tab==='stays' && (
          <>
            <div className="hero">
              <h2>Find Your Perfect Stay 🏨</h2>
              <p>Earn 5% per booking • 7 affiliate programs LIVE • Booking.com pending approval (ID 582539)</p>
            </div>
            <div className="alert">⏳ <b>Booking.com is In Review</b> (15 min - 2 hrs). While waiting, your bookings earn via Hotellook + Trip.com — same hotels, same price!</div>
            <div className="grid">
              <div className="card">
                <h3>🏨 Hotellook – 1.8 Million Hotels</h3>
                <p>Same inventory as Booking.com. Searches 70+ booking sites. Marker 582539 embedded.</p>
                <button className="btn btn-blue" onClick={()=>open(AFFILIATE.HOTELLOOK)}>Search Hotels on Hotellook →</button>
                <div className="live">✅ LIVE • Marker 582539 tracking</div>
              </div>
              <div className="card">
                <h3>🌍 Trip.com Hotels</h3>
                <p>Best for SA + international hotels. Instant confirmation. Link: tpm.li/wmATAoyL</p>
                <button className="btn btn-green" style={{background:'#16a34a'}} onClick={()=>open(AFFILIATE.TRIPCOM)}>Search Hotels on Trip.com →</button>
                <div className="live">✅ LIVE</div>
              </div>
            </div>
          </>
        )}

        {tab==='flights' && (
          <>
            <h2 className="title">Cheap Flights – Earn 1.5%</h2>
            <p className="subtitle">Domestic JNB-CPT from R600 • International deals</p>
            <div className="grid">
              <div className="card" style={{borderLeft:'4px solid #2563eb'}}>
                <h3>✈️ Aviasales – Cheapest SA Flights</h3>
                <p>Best for domestic: JNB-CPT, DUR-JNB, CPT-DUR. Compares Kulula, Safair, Airlink. Link: aviasales.tpm.li/VEgNTCDq</p>
                <button className="btn btn-blue" onClick={()=>open(AFFILIATE.AVIASALES)}>Search Cheap Flights →</button>
                <div className="live">✅ LIVE • Your #1 earner</div>
              </div>
              <div className="card" style={{borderLeft:'4px solid #16a34a'}}>
                <h3>🌍 Trip.com Flights – International</h3>
                <p>International flights + hotel bundles. Link: tpm.li/wmATAoyL</p>
                <button className="btn btn-green" style={{background:'#16a34a'}} onClick={()=>open(AFFILIATE.TRIPCOM)}>Search International →</button>
                <div className="live">✅ LIVE</div>
              </div>
            </div>
          </>
        )}

        {tab==='cars' && (
          <>
            <h2 className="title">Cars & Transfers</h2>
            <div className="grid">
              <div className="card">
                <h3>🚗 Localrent – Car Rentals</h3>
                <p>Cheaper than Avis/Hertz. Local suppliers, no hidden fees. Earn 7% per rental.</p>
                <button className="btn btn-orange" style={{background:'#ea580c'}} onClick={()=>open(AFFILIATE.LOCALRENT)}>Rent a Car →</button>
                <div className="live">✅ LIVE</div>
              </div>
              <div className="card">
                <h3>🚕 KiwiTaxi – Airport Transfers</h3>
                <p>JNB, CPT, DUR airport to hotel. Fixed price, flight tracking.</p>
                <button className="btn" style={{background:'#facc15',color:'#000',fontWeight:700}} onClick={()=>open(AFFILIATE.KIWITAXI)}>Book Airport Taxi →</button>
                <div className="live">✅ LIVE</div>
              </div>
            </div>
          </>
        )}

        {tab==='activities' && (
          <>
            <h2 className="title">Tours & Activities</h2>
            <div className="grid">
              <div className="card">
                <h3>🎢 Klook – Activities</h3>
                <p>Table Mountain, Robben Island, safari. Earn 8%.</p>
                <button className="btn btn-purple" style={{background:'#7c3aed'}} onClick={()=>open(AFFILIATE.KLOOK)}>Find Activities →</button>
                <div className="live">✅ LIVE</div>
              </div>
              <div className="card">
                <h3>🎧 WeGoTrip – Audio Tours</h3>
                <p>Self-guided tours, no guide needed.</p>
                <button className="btn" style={{background:'#0d9488',color:'white'}} onClick={()=>open(AFFILIATE.WEGOTRIP)}>Explore Audio Tours →</button>
                <div className="live">✅ LIVE</div>
              </div>
              <div className="card">
                <h3>📱 Yesim – eSIM Data</h3>
                <p>Travelers need data. $3-$10 per eSIM sale.</p>
                <button className="btn btn-black" onClick={()=>open(AFFILIATE.YESIM)}>Buy eSIM →</button>
                <div className="live">✅ LIVE</div>
              </div>
            </div>
          </>
        )}

        {tab==='esim' && (
          <>
            <h2 className="title">eSIM – $3 per sale</h2>
            <p className="subtitle">Highest conversion</p>
            <div className="card" style={{maxWidth:'400px'}}>
              <h3>📱 Yesim eSIM – Global Data</h3>
              <p>Instant QR code. Works in 150+ countries. You earn $3-$10 per eSIM.</p>
              <button className="btn btn-black" onClick={()=>open(AFFILIATE.YESIM)}>Buy eSIM for $5 →</button>
              <div className="live">✅ LIVE • Highest conversion</div>
            </div>
          </>
        )}
      </div>

      <div className="footer">
        Traffic Source: 582539 • Khilanetravel • 7 programs LIVE • Booking.com pending approval<br/>
        Payout: Payoneer → FNB • All links track automatically • khilanetravel.co.za<br/>
        Built with ❤️ in SA
      </div>
    </>
  );
}
export default App;
