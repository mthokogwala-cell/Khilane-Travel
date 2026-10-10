import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('return');
  const AFFILIATE_URL = 'https://www.travelstart.co.za/?affId=PLACEHOLDER';

  const handleSearch = () => {
    window.open(AFFILIATE_URL, '_blank', 'noopener,noreferrer');
  };

  const destinations = [
    { name: 'Cape Town', price: 'R2,850', country: 'South Africa', color: '#2C5F8A' },
    { name: 'Johannesburg', price: 'R1,950', country: 'South Africa', color: '#8B6A2B' },
    { name: 'Durban', price: 'R2,150', country: 'South Africa', color: '#0E7C7B' },
    { name: 'Kruger Park', price: 'R4,250', country: 'South Africa', color: '#4A5D23' },
    { name: 'Mauritius', price: 'R8,450', country: 'Indian Ocean', color: '#0AA6B0' },
    { name: 'Dubai', price: 'R9,750', country: 'UAE', color: '#1C2A44' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#E9EEF3', display: 'flex', justifyContent: 'center', padding: '16px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Inter, sans-serif; }
      `}</style>

      <div style={{ width: '100%', maxWidth: '1280px', background: 'white', borderRadius: '32px', border: '6px solid #0B1F3A', overflow: 'hidden', boxShadow: '0 20px 80px rgba(11,31,58,0.18)', display: 'flex', flexDirection: 'column' }}>

        {/* HEADER */}
        <header style={{ background: '#0B1F3A', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFC107', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#0B1F3A' }}>✈</div>
            <div>
              <div style={{ display: 'flex', gap: '2px' }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: '16px' }}>Khilane</span>
                <span style={{ color: '#FFC107', fontWeight: 800, fontSize: '16px' }}>Travel</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '8.5px', letterSpacing: '0.13em', fontWeight: 600, textTransform: 'uppercase', marginTop: '2px' }}>Explore More • Pay Less • Travel Better</div>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '24px' }}>
            {['Home','Flights','Stays','Cars','Buses','Deals','About Us'].map(l => (
              <span key={l} style={{ color: l==='Home' ? 'white' : 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: 500, borderBottom: l==='Home' ? '2.5px solid #FFC107' : 'none', paddingBottom: l==='Home' ? '6px' : '0' }}>{l}</span>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '6px 12px', display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>ZAR</span><span style={{ fontSize: '11px' }}>🇿🇦</span>
            </div>
            <div style={{ background: 'white', borderRadius: '999px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>My Account</div>
          </div>
        </header>

        {/* HERO */}
        <div style={{ position: 'relative', height: '440px', background: '#0B1F3A', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #FF8A65, #FF7043 30%, #4A2C5A 75%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,31,58,0.85), rgba(11,31,58,0.3), transparent)' }} />
          <div style={{ position: 'absolute', left: '51%', top: '44%', width: '200px', height: '200px', transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, #FFF7D1, #FFCC6A, #FF8A3D)', opacity: 0.9, boxShadow: '0 0 80px rgba(255,184,80,0.6)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '58%', background: '#0B1F3A', clipPath: 'polygon(0 42%, 8% 32%, 14% 18%, 21% 18%, 28% 18%, 36% 18%, 44% 18%, 52% 18%, 60% 18%, 66% 28%, 74% 35%, 84% 30%, 92% 38%, 100% 42%, 100% 100%, 0 100%)' }} />
          <div style={{ position: 'absolute', top: '20px', right: '32px', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>Table Mountain, Cape Town — Discover South Africa and the World</div>
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px', maxWidth: '700px' }}>
            <h1 style={{ color: 'white', fontWeight: 800, lineHeight: '0.93', fontSize: '44px', letterSpacing: '-0.02em', textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>South Africa's Cheapest<br/>Travel Booking Company</h1>
            <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 500 }}>Flights • Hotels • Cars • Buses • More — All in ZAR (R)</p>
            <div style={{ marginTop: '20px', display: 'inline-flex', gap: '10px', background: '#FFC107', borderRadius: '999px', padding: '8px 16px 8px 8px', maxWidth: '540px', alignItems: 'flex-start', boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#FFC107', fontSize: '12px', fontWeight: 900 }}>R</span>
              </div>
              <p style={{ color: '#0B1F3A', fontSize: '11.5px', lineHeight: '1.35', fontWeight: 700 }}><span style={{ fontWeight: 800 }}>Price Beat Guarantee — R20:</span> Find a lower price? We'll beat it by at least R20. No suppliers named. Just cheaper flights.</p>
            </div>
          </div>
        </div>

        {/* SEARCH CARD */}
        <div style={{ position: 'relative', zIndex: 20, padding: '0 24px', marginTop: '-56px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '1100px', background: 'white', borderRadius: '18px', boxShadow: '0 18px 56px rgba(11,31,58,0.18), 0 2px 10px rgba(11,31,58,0.08)', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', flexWrap: 'wrap', background: 'white' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id:'flights', label:'Flights', icon:'✈️' },
                  { id:'stays', label:'Stays', icon:'🏨' },
                  { id:'cars', label:'Cars', icon:'🚗' },
                  { id:'buses', label:'Buses', icon:'🚌' },
                ].map(tab => (
                  <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{ display: 'flex', gap: '6px', padding: '10px 16px', borderRadius: '11px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', background: activeTab===tab.id ? '#0B1F3A' : '#F3F5F7', color: activeTab===tab.id ? 'white' : '#5A6A7F' }}>
                    <span>{tab.icon}</span>{tab.label}
                  </button>
                ))}
              </div>
              <div style={{ background: '#0B1F3A', color: 'white', fontSize: '10.5px', fontWeight: 700, padding: '6px 12px', borderRadius: '999px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#FFC107', color: '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>R</span>
                Price Beat Guarantee: We beat any price by R20
              </div>
            </div>
            <div style={{ height: '1px', background: '#EEF2F6' }} />
            <div style={{ display: 'flex', gap: '20px', padding: '12px 20px', background: '#FAFBFC', flexWrap: 'wrap' }}>
              {[{id:'return',label:'Return'},{id:'oneway',label:'One Way'},{id:'multi',label:'Multi-City'}].map(opt=>(
                <label key={opt.id} style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: tripType===opt.id ? '1.8px solid #0B1F3A' : '1.8px solid #C2CAD6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {tripType===opt.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0B1F3A' }} />}
                  </div>
                  <input type="radio" style={{ display: 'none' }} checked={tripType===opt.id} onChange={()=>setTripType(opt.id)} />
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: tripType===opt.id ? '#0B1F3A' : '#6B7D94' }}>{opt.label}</span>
                </label>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: '#0B1F3A', background: 'rgba(255,193,7,0.2)', border: '1px solid rgba(255,193,7,0.3)', padding: '4px 10px', borderRadius: '999px' }}>Flights active • R20 guarantee applies</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', padding: '12px', background: 'white' }}>
              <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#7A8CA6', textTransform: 'uppercase' }}>From</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <div><div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1F3A' }}>Johannesburg</div><div style={{ fontSize: '11px', color: '#7A8CA6', fontWeight: 500, marginTop: '2px' }}>JNB</div></div>
                  <button style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'white', border: '1px solid #E3E8EF', cursor: 'pointer' }}>⇄</button>
                </div>
              </div>
              <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#7A8CA6', textTransform: 'uppercase' }}>To</div>
                <div style={{ marginTop: '4px' }}><div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1F3A' }}>Cape Town</div><div style={{ fontSize: '11px', color: '#7A8CA6', fontWeight: 500, marginTop: '2px' }}>CPT</div></div>
              </div>
              <div style={{ gridColumn: 'span 2', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#7A8CA6', textTransform: 'uppercase' }}>Departure</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>📅 12 Jan 2026</div>
              </div>
              <div style={{ gridColumn: 'span 2', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#7A8CA6', textTransform: 'uppercase' }}>Return</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>📅 19 Jan 2026</div>
              </div>
              <div style={{ gridColumn: 'span 2', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: '#7A8CA6', textTransform: 'uppercase' }}>Travelers</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px', lineHeight: '1.2' }}>👥 2 Adults, 1 Child</div>
              </div>
            </div>
            <div style={{ padding: '0 12px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: '#6B7D94' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E6F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                <span><b style={{ color: '#0B1F3A' }}>R20 Price Beat Guarantee</b> — applied at checkout • All prices in ZAR</span>
              </div>
              <button onClick={handleSearch} style={{ background: '#FFC107', color: '#0B1F3A', fontWeight: 800, fontSize: '13.5px', borderRadius: '12px', padding: '13px 28px', border: 'none', cursor: 'pointer', boxShadow: '0 2px 10px rgba(255,193,7,0.35)' }}>🔍 Search Flights</button>
            </div>
          </div>
        </div>

        {/* TRUST */}
        <div style={{ padding: '0 40px', marginTop: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px', padding: '24px 0', borderTop: '1px solid #EAF0F6', borderBottom: '1px solid #EAF0F6' }}>
            {[
              { title: 'Price Beat Guarantee R20', desc: 'Beat by R20 or more — ZAR' },
              { title: 'Secure Payments', desc: 'ZAR safe checkout' },
              { title: '24/7 Customer Support', desc: "We're here to help, anytime" },
              { title: 'Trusted Travel Partners', desc: 'Global & local coverage' },
              { title: 'Sustainable Travel', desc: 'A better tomorrow' },
            ].map((item,i)=>(
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E6F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1DB6A6', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>✓</div>
                <div><div style={{ fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>{item.title}</div><div style={{ fontSize: '11px', color: '#6B7D94', marginTop: '2px', fontWeight: 500 }}>{item.desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR DESTINATIONS */}
        <div style={{ padding: '32px 40px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0B1F3A' }}>Popular Destinations</h2>
              <p style={{ fontSize: '12.5px', color: '#6B7D94', fontWeight: 500, marginTop: '4px' }}>All prices in ZAR (R) • R20 Price Beat Guarantee on every booking</p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>View All Destinations →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px' }}>
            {destinations.map(dest=>(
              <div key={dest.name} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '192px', cursor: 'pointer', background: dest.color, boxShadow: '0 2px 12px rgba(11,31,58,0.08)' }}>
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', color: '#0B1F3A', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '999px' }}>R20 BEAT</div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1), transparent)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px' }}>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '13.5px' }}>{dest.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 500 }}>{dest.country}</div>
                  <div style={{ color: 'white', fontSize: '11px', fontWeight: 700, marginTop: '4px' }}>From {dest.price} • {dest.country}</div>
                </div>
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↗</div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER - NO SUPPLIERS */}
        <footer style={{ background: '#0B1F3A', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: '360px' }}>
          <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ color: 'white', fontWeight: 800, fontSize: '34px', lineHeight: '0.95', maxWidth: '380px' }}>We Beat Prices,<br/>By R20. Automatically.</h3>
              <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.6)', fontSize: '12.5px', lineHeight: '1.6', maxWidth: '380px', fontWeight: 500 }}>Khilane Travel compares millions of fares in real-time. If you find a cheaper price elsewhere, we don't just match it — we beat it by R20. Guaranteed. All prices in ZAR. No supplier names, just cheapest fare for khilanetravel.co.za.</p>
              <div style={{ marginTop: '20px', display: 'inline-flex', gap: '8px', background: '#FFC107', borderRadius: '999px', padding: '8px 16px', alignItems: 'center' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#0B1F3A', color: '#FFC107', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>R</span>
                <span style={{ color: '#0B1F3A', fontSize: '11px', fontWeight: 800 }}>Price Beat Guarantee R20 • ZAR Only • No Hidden Suppliers</span>
              </div>
            </div>
            <div style={{ marginTop: '40px', display: 'flex', gap: '24px', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
              <span>About Us</span><span>Contact Us</span><span>Terms • R20 Guarantee</span>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(to bottom right, #1A3A5F, #0B1F3A, #132D52)', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '36px', lineHeight: '0.95' }}>Your Journey<br/>Our Priority</h3>
            <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.55)', fontSize: '12px', maxWidth: '300px', lineHeight: '1.5' }}>Curated experiences, local expertise, and best-price assurance. All in ZAR. R20 Price Beat Guarantee on khilanetravel.co.za</p>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <div style={{ background: 'white', color: '#0B1F3A', fontSize: '11px', fontWeight: 700, padding: '6px 12px', borderRadius: '999px' }}>🇿🇦 Proudly South African</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', padding: '6px 0' }}>R Prices Only</div>
            </div>
          </div>
        </footer>
        <div style={{ background: '#0B1F3A', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 48px', display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>
          <span>© {new Date().getFullYear()} Khilane Travel (Pty) Ltd. Prices in ZAR only. Price Beat Guarantee R20.</span>
          <span>khilanetravel.co.za • Secure • Trusted • Cheapest • R20 Beat</span>
        </div>
      </div>
    </div>
  );
}
