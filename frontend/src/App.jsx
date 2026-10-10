import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('return');
  const [bookingStep, setBookingStep] = useState('search');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengers, setPassengers] = useState([{ firstName: '', lastName: '', email: '' }]);

  const mockFlights = [
    { id: 1, airline: 'Airlink', logo: '✈️', from: 'JNB', to: 'CPT', depart: '06:15', arrive: '08:25', duration: '2h 10m', stops: 'Direct', price: 2850, originalPrice: 3100, savings: 250, seats: 4 },
    { id: 2, airline: 'FlySafair', logo: '🟢', from: 'JNB', to: 'CPT', depart: '09:30', arrive: '11:45', duration: '2h 15m', stops: 'Direct', price: 2950, originalPrice: 3200, savings: 250, seats: 7, popular: true },
    { id: 3, airline: 'SAA', logo: '🇿🇦', from: 'JNB', to: 'CPT', depart: '14:00', arrive: '16:20', duration: '2h 20m', stops: 'Direct', price: 3250, originalPrice: 3550, savings: 300, seats: 2 },
    { id: 4, airline: 'CemAir', logo: '🔵', from: 'JNB', to: 'CPT', depart: '18:45', arrive: '21:00', duration: '2h 15m', stops: 'Direct', price: 2750, originalPrice: 2950, savings: 200, seats: 9, cheapest: true },
  ];

  const handleSearch = () => {
    setBookingStep('results');
    window.scrollTo(0, 0);
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setBookingStep('passengers');
    window.scrollTo(0, 0);
  };

  const handlePayment = () => {
    setBookingStep('payment');
    window.scrollTo(0, 0);
  };

  const handleConfirmPayment = () => {
    setBookingStep('confirmation');
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#E9EEF3', display: 'flex', justifyContent: 'center', padding: '16px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tabs-container { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; flex-wrap: nowrap; }
        .tabs-container::-webkit-scrollbar { display: none; }
        .tab-btn { display: flex; align-items: center; gap: 6px; padding: 10px 18px; border-radius: 11px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: all 0.2s; min-height: 40px; }
        .tab-btn.active { background: #0B1F3A !important; color: white !important; box-shadow: 0 4px 12px rgba(11,31,58,0.25); }
        .tab-btn.inactive { background: #F3F5F7; color: #5A6A7F; }
        .progress-bar { display: flex; gap: 8px; align-items: center; justify-content: center; padding: 16px; background: white; border-bottom: 1px solid #EEF2F6; flex-wrap: wrap; }
        .progress-step { display: flex; align-items: center; gap: 8px; }
        .progress-circle { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }
        .progress-active { background: #0B1F3A; color: white; }
        .progress-done { background: #1DB6A6; color: white; }
        .progress-todo { background: #F3F5F7; color: #9AA9BD; }
        .progress-line { width: 40px; height: 2px; background: #E3E8EF; }
        .progress-line.done { background: #1DB6A6; }
        @media (max-width: 768px) {
          .search-grid { grid-template-columns: 1fr !important; }
          .search-grid > div { grid-column: span 1 !important; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '1280px', background: 'white', borderRadius: '32px', border: '6px solid #0B1F3A', overflow: 'hidden', boxShadow: '0 20px 80px rgba(11,31,58,0.18)', display: 'flex', flexDirection: 'column' }}>

        <header style={{ background: '#0B1F3A', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={()=>setBookingStep('search')}>
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
              <span key={l} onClick={()=>setBookingStep('search')} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>{l}</span>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px', padding: '6px 12px', display: 'flex', gap: '6px' }}>
              <span style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>ZAR</span><span style={{ fontSize: '11px' }}>🇿🇦</span>
            </div>
            <div style={{ background: 'white', borderRadius: '999px', padding: '6px 14px', fontSize: '12px', fontWeight: 700, color: '#0B1F3A' }}>My Account</div>
          </div>
        </header>

        {bookingStep !== 'search' && (
          <div className="progress-bar">
            {[
              { id: 'search', label: 'Search', num: 1 },
              { id: 'results', label: 'Flights', num: 2 },
              { id: 'passengers', label: 'Details', num: 3 },
              { id: 'payment', label: 'Payment', num: 4 },
              { id: 'confirmation', label: 'Ticket', num: 5 },
            ].map((step, idx) => {
              const order = ['search','results','passengers','payment','confirmation'];
              const isActive = bookingStep === step.id;
              const isDone = order.indexOf(bookingStep) > order.indexOf(step.id);
              return (
                <div key={step.id} className="progress-step">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div className={`progress-circle ${isDone ? 'progress-done' : isActive ? 'progress-active' : 'progress-todo'}`}>
                      {isDone ? '✓' : step.num}
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: isActive ? 700 : 500, color: isActive ? '#0B1F3A' : isDone ? '#1DB6A6' : '#9AA9BD' }}>{step.label}</span>
                  </div>
                  {idx < 4 && <div className={`progress-line ${isDone ? 'done' : ''}`} />}
                </div>
              );
            })}
          </div>
        )}

        {bookingStep === 'search' && (
          <div style={{ position: 'relative', height: '440px', background: '#0B1F3A', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #FF8A65, #FF7043 30%, #4A2C5A 75%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,31,58,0.85), rgba(11,31,58,0.3), transparent)' }} />
            <div style={{ position: 'absolute', left: '51%', top: '44%', width: '200px', height: '200px', transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, #FFF7D1, #FFCC6A, #FF8A3D)', opacity: 0.9 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '58%', background: '#0B1F3A', clipPath: 'polygon(0 42%, 8% 32%, 14% 18%, 21% 18%, 28% 18%, 36% 18%, 44% 18%, 52% 18%, 60% 18%, 66% 28%, 74% 35%, 84% 30%, 92% 38%, 100% 42%, 100% 100%, 0 100%)' }} />
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px', maxWidth: '700px' }}>
              <h1 style={{ color: 'white', fontWeight: 800, lineHeight: '0.93', fontSize: '44px' }}>South Africa's Cheapest<br/>Travel Booking Company</h1>
              <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Flights • Hotels • Cars • Buses • All in ZAR (R) — Stay on Khilane beginning to end</p>
              <div style={{ marginTop: '20px', display: 'inline-flex', gap: '10px', background: '#FFC107', borderRadius: '999px', padding: '8px 16px 8px 8px', maxWidth: '540px', alignItems: 'flex-start' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#FFC107', fontSize: '12px', fontWeight: 900 }}>R</span>
                </div>
                <p style={{ color: '#0B1F3A', fontSize: '11.5px', fontWeight: 700 }}><span style={{ fontWeight: 800 }}>White-Label — R20 Beat:</span> Book entirely on khilanetravel.co.za — no redirect to Travelstart. We beat any price by R20.</p>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'search' && (
          <div style={{ position: 'relative', zIndex: 20, padding: '0 24px', marginTop: '-56px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1100px', background: 'white', borderRadius: '18px', boxShadow: '0 18px 56px rgba(11,31,58,0.18)', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="tabs-container">
                  {[
                    { id:'flights', label:'Flights', icon:'✈️' },
                    { id:'stays', label:'Stays', icon:'🏨' },
                    { id:'cars', label:'Cars', icon:'🚗' },
                    { id:'buses', label:'Buses', icon:'🚌' },
                  ].map(tab => (
                    <button key={tab.id} onClick={()=>setActiveTab(tab.id)} className={`tab-btn ${activeTab===tab.id ? 'active' : 'inactive'}`}>
                      <span>{tab.icon}</span>{tab.label}
                    </button>
                  ))}
                </div>
                <div style={{ background: '#0B1F3A', color: 'white', fontSize: '10.5px', fontWeight: 700, padding: '7px 14px', borderRadius: '999px', display: 'flex', gap: '6px', alignItems: 'center', whiteSpace: 'nowrap' }}>
                  <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#FFC107', color: '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>R</span>
                  White-Label: Stays on Khilane • R20 Beat
                </div>
              </div>
              <div style={{ height: '1px', background: '#EEF2F6' }} />
              <div style={{ display: 'flex', gap: '20px', padding: '12px 20px', background: '#FAFBFC', flexWrap: 'wrap' }}>
                {[{id:'return',label:'Return'},{id:'oneway',label:'One Way'}].map(opt=>(
                  <label key={opt.id} style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: tripType===opt.id ? '1.8px solid #0B1F3A' : '1.8px solid #C2CAD6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {tripType===opt.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0B1F3A' }} />}
                    </div>
                    <input type="radio" style={{ display: 'none' }} checked={tripType===opt.id} onChange={()=>setTripType(opt.id)} />
                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: tripType===opt.id ? '#0B1F3A' : '#6B7D94' }}>{opt.label}</span>
                  </label>
                ))}
                <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: '#0B1F3A', background: 'rgba(255,193,7,0.2)', padding: '4px 10px', borderRadius: '999px' }}>White-Label • No redirect to Travelstart</span>
              </div>
              <div className="search-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', padding: '12px', background: 'white' }}>
                <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>From</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1F3A', marginTop: '4px' }}>Johannesburg JNB</div>
                </div>
                <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>To</div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1F3A', marginTop: '4px' }}>Cape Town CPT</div>
                </div>
                <div style={{ gridColumn: 'span 2', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Departure</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>📅 12 Jan 2026</div>
                </div>
                <div style={{ gridColumn: 'span 2', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Return</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>📅 19 Jan 2026</div>
                </div>
                <div style={{ gridColumn: 'span 2', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Travelers</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>👥 2 Adults, 1 Child</div>
                </div>
              </div>
              <div style={{ padding: '0 12px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: '#6B7D94' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E6F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                  <span><b style={{ color: '#0B1F3A' }}>White-Label • R20 Beat</b> — Customer stays on khilanetravel.co.za</span>
                </div>
                <button onClick={handleSearch} style={{ background: '#FFC107', color: '#0B1F3A', fontWeight: 800, fontSize: '13.5px', borderRadius: '12px', padding: '13px 28px', border: 'none', cursor: 'pointer' }}>🔍 Search Flights on Khilane</button>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'results' && (
          <div style={{ padding: '24px', background: '#FAFBFC' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0B1F3A' }}>JNB → CPT • 12 Jan • 4 flights found</h2>
                  <p style={{ fontSize: '12px', color: '#6B7D94', marginTop: '4px' }}>White-labeled on khilanetravel.co.za • R20 Beat • Pay in ZAR via Paystack • No Travelstart redirect</p>
                </div>
                <button onClick={()=>setBookingStep('search')} style={{ background: 'white', border: '1px solid #E3E8EF', padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>← Modify Search</button>
              </div>
              <div style={{ display: 'grid', gap: '12px' }}>
                {mockFlights.map(flight => (
                  <div key={flight.id} style={{ background: 'white', borderRadius: '16px', padding: '16px 20px', border: flight.popular ? '2px solid #FFC107' : '1px solid #E3E8EF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ fontSize: '20px' }}>{flight.logo}</span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0B1F3A' }}>{flight.airline}</div>
                          <div style={{ fontSize: '10px', color: '#7A8CA6' }}>{flight.stops} • {flight.seats} seats left</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0B1F3A' }}>{flight.depart}</div>
                          <div style={{ fontSize: '11px', color: '#7A8CA6' }}>{flight.from}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ fontSize: '10px', color: '#9AA9BD' }}>{flight.duration}</div>
                          <div style={{ width: '80px', height: '2px', background: '#E3E8EF', margin: '4px 0' }} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0B1F3A' }}>{flight.arrive}</div>
                          <div style={{ fontSize: '11px', color: '#7A8CA6' }}>{flight.to}</div>
                        </div>
                      </div>
                      {flight.popular && <div style={{ background: '#FFC107', color: '#0B1F3A', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '999px' }}>MOST POPULAR</div>}
                      {flight.cheapest && <div style={{ background: '#E6F7F5', color: '#1DB6A6', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '999px' }}>CHEAPEST • R20 BEAT</div>}
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#9AA9BD', textDecoration: 'line-through' }}>R{flight.originalPrice}</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#0B1F3A' }}>R{flight.price}</div>
                        <div style={{ fontSize: '10px', color: '#1DB6A6', fontWeight: 600 }}>Save R{flight.savings} + R20 Beat</div>
                      </div>
                      <button onClick={()=>handleSelectFlight(flight)} style={{ background: '#0B1F3A', color: 'white', fontWeight: 700, fontSize: '13px', padding: '12px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>Select →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'passengers' && selectedFlight && (
          <div style={{ padding: '24px', background: '#FAFBFC' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '18px', padding: '24px', border: '1px solid #E3E8EF' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1F3A' }}>Passenger Details — Stay on Khilane</h2>
              <p style={{ fontSize: '12px', color: '#6B7D94', marginTop: '4px' }}>Flight: {selectedFlight.airline} {selectedFlight.from}→{selectedFlight.to} • R{selectedFlight.price} • R20 Beat</p>
              <div style={{ marginTop: '20px', display: 'grid', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '16px', background: '#F5F7F9', borderRadius: '12px' }}>
                  <div><div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', marginBottom: '6px' }}>First Name</div><input placeholder="Mthokozisi" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E3E8EF', fontSize: '13px' }} /></div>
                  <div><div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', marginBottom: '6px' }}>Last Name</div><input placeholder="Gwala" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E3E8EF', fontSize: '13px' }} /></div>
                  <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', marginBottom: '6px' }}>Email (e-ticket sent here)</div><input placeholder="mthokogwala@gmail.com" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E3E8EF', fontSize: '13px' }} /></div>
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={()=>setBookingStep('results')} style={{ background: 'white', border: '1px solid #E3E8EF', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer' }}>← Back</button>
                <button onClick={handlePayment} style={{ background: '#0B1F3A', color: 'white', padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Continue to Payment — R{selectedFlight.price} →</button>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'payment' && selectedFlight && (
          <div style={{ padding: '24px', background: '#FAFBFC' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '18px', padding: '24px', border: '1px solid #E3E8EF' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1F3A' }}>Payment — Pay in ZAR on Khilane</h2>
              <p style={{ fontSize: '12px', color: '#6B7D94' }}>Paystack Secure • No redirect • Stays on khilanetravel.co.za</p>
              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
                <div>
                  <input placeholder="Card Number • 4242 4242 4242 4242" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E3E8EF', marginBottom: '10px' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input placeholder="MM / YY" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E3E8EF' }} />
                    <input placeholder="CVV" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E3E8EF' }} />
                  </div>
                </div>
                <div style={{ background: '#0B1F3A', borderRadius: '12px', padding: '16px', color: 'white' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>Booking Summary • Khilane</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{selectedFlight.from}→{selectedFlight.to}</span><span>R{selectedFlight.price}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFC107' }}><span>R20 Beat Discount</span><span>-R20</span></div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', margin: '10px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: 'white' }}><span>Total ZAR</span><span>R{selectedFlight.price - 20}</span></div>
                  </div>
                  <button onClick={handleConfirmPayment} style={{ width: '100%', marginTop: '16px', background: '#FFC107', color: '#0B1F3A', fontWeight: 800, padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>Pay R{selectedFlight.price - 20} • Issue Ticket on Khilane</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'confirmation' && selectedFlight && (
          <div style={{ padding: '24px', background: '#FAFBFC' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', borderRadius: '18px', padding: '32px', border: '2px solid #1DB6A6', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E6F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '28px' }}>✓</div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0B1F3A', marginTop: '16px' }}>Ticket Issued on Khilane Travel!</h2>
              <p style={{ fontSize: '13px', color: '#6B7D94', marginTop: '8px' }}>Customer stayed on khilanetravel.co.za beginning to end — No Travelstart redirect</p>
              <div style={{ marginTop: '24px', background: '#0B1F3A', borderRadius: '12px', padding: '20px', textAlign: 'left', color: 'white' }}>
                <div style={{ fontSize: '18px', fontWeight: 800 }}>{selectedFlight.from} → {selectedFlight.to} • {selectedFlight.depart} - {selectedFlight.arrive}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Booking Ref: KHL-{Math.floor(Math.random()*900000)+100000} • Issued by Khilane Travel • Duffel API hidden • R20 Beat applied</div>
              </div>
              <button onClick={()=>{setBookingStep('search'); setSelectedFlight(null);}} style={{ marginTop: '20px', background: '#0B1F3A', color: 'white', padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Book Another Flight on Khilane →</button>
            </div>
          </div>
        )}

        <footer style={{ background: '#0B1F3A', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: '300px', marginTop: 'auto' }}>
          <div style={{ padding: '40px' }}>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '28px' }}>We Beat Prices,<br/>By R20. White-Label.</h3>
            <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.6)', fontSize: '12px', maxWidth: '360px' }}>Customer stays on khilanetravel.co.za from search to ticket. No Travelstart page. Duffel API + Paystack in background, Khilane branding only. R20 Beat Guarantee.</p>
          </div>
          <div style={{ background: 'linear-gradient(to bottom right, #1A3A5F, #0B1F3A)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '28px' }}>Your Journey<br/>Our Priority</h3>
          </div>
        </footer>
      </div>
    </div>
  );
}
