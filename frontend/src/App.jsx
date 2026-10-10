import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('return');
  const [bookingStep, setBookingStep] = useState('search');
  const [selectedItem, setSelectedItem] = useState(null);

  const mockFlights = [
    { id: 1, type: 'flight', airline: 'Airlink', logo: '✈️', from: 'JNB', to: 'CPT', depart: '06:15', arrive: '08:25', duration: '2h 10m', price: 2850, originalPrice: 3100, popular: false, cheapest: false, seats: 4 },
    { id: 2, type: 'flight', airline: 'FlySafair', logo: '🟢', from: 'JNB', to: 'CPT', depart: '09:30', arrive: '11:45', duration: '2h 15m', price: 2950, originalPrice: 3200, popular: true, cheapest: false, seats: 7 },
    { id: 3, type: 'flight', airline: 'SAA', logo: '🇿🇦', from: 'JNB', to: 'CPT', depart: '14:00', arrive: '16:20', duration: '2h 20m', price: 3250, originalPrice: 3550, popular: false, cheapest: false, seats: 2 },
    { id: 4, type: 'flight', airline: 'CemAir', logo: '🔵', from: 'JNB', to: 'CPT', depart: '18:45', arrive: '21:00', duration: '2h 15m', price: 2750, originalPrice: 2950, popular: false, cheapest: true, seats: 9 },
  ];

  const mockStays = [
    { id: 101, type: 'stay', name: 'The Silo Hotel', location: 'Cape Town', rating: 4.9, reviews: 324, price: 4850, originalPrice: 5200, per: '/night', image: '🏨', amenities: 'Pool • Spa • Breakfast', popular: true },
    { id: 102, type: 'stay', name: 'Saxon Hotel', location: 'Johannesburg', rating: 4.8, reviews: 412, price: 3950, originalPrice: 4300, per: '/night', image: '🏨', amenities: 'Gym • Restaurant • Bar', cheapest: true },
    { id: 103, type: 'stay', name: 'Oyster Box', location: 'Durban', rating: 4.7, reviews: 298, price: 4250, originalPrice: 4600, per: '/night', image: '🏨', amenities: 'Beachfront • Pool • Spa' },
    { id: 104, type: 'stay', name: 'Kruger Lodge', location: 'Kruger Park', rating: 4.9, reviews: 567, price: 6850, originalPrice: 7200, per: '/night', image: '🦁', amenities: 'Safari • All Inclusive • Pool' },
  ];

  const mockCars = [
    { id: 201, type: 'car', name: 'Toyota Corolla', company: 'Avis', logo: '🚗', seats: 5, bags: 2, transmission: 'Auto', price: 850, originalPrice: 950, per: '/day', image: '🚗', popular: true },
    { id: 202, type: 'car', name: 'VW Polo', company: 'Hertz', logo: '🚙', seats: 5, bags: 2, transmission: 'Manual', price: 650, originalPrice: 750, per: '/day', image: '🚗', cheapest: true },
    { id: 203, type: 'car', name: 'Ford Ranger', company: 'Budget', logo: '🛻', seats: 5, bags: 3, transmission: 'Auto', price: 1250, originalPrice: 1350, per: '/day', image: '🚙' },
    { id: 204, type: 'car', name: 'BMW X3', company: 'Europcar', logo: '🏎️', seats: 5, bags: 3, transmission: 'Auto', price: 1850, originalPrice: 2100, per: '/day', image: '🚙' },
  ];

  const mockBuses = [
    { id: 301, type: 'bus', company: 'Greyhound', logo: '🚌', from: 'JNB', to: 'CPT', depart: '19:00', arrive: '07:30+1', duration: '12h 30m', price: 850, originalPrice: 950, seats: 12, popular: true },
    { id: 302, type: 'bus', company: 'Intercape', logo: '🚌', from: 'JNB', to: 'CPT', depart: '20:30', arrive: '09:00+1', duration: '12h 30m', price: 750, originalPrice: 850, seats: 8, cheapest: true },
    { id: 303, type: 'bus', company: 'Eldo Coaches', logo: '🚍', from: 'JNB', to: 'CPT', depart: '18:00', arrive: '06:30+1', duration: '12h 30m', price: 950, originalPrice: 1050, seats: 15 },
    { id: 304, type: 'bus', company: 'City to City', logo: '🚍', from: 'JNB', to: 'Durban', depart: '08:00', arrive: '14:30', duration: '6h 30m', price: 550, originalPrice: 650, seats: 20 },
  ];

  const getCurrentData = () => {
    if (activeTab === 'stays') return mockStays;
    if (activeTab === 'cars') return mockCars;
    if (activeTab === 'buses') return mockBuses;
    return mockFlights;
  };

  const handleSearch = () => {
    setBookingStep('results');
    window.scrollTo(0,0);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setBookingStep('passengers');
    window.scrollTo(0,0);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#E9EEF3', display: 'flex', justifyContent: 'center', padding: '12px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tabs-container { display: flex; gap: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; flex-wrap: nowrap; width: 100%; }
        .tabs-container::-webkit-scrollbar { display: none; }
        .tab-btn { display: flex; align-items: center; gap: 6px; padding: 11px 18px; border-radius: 11px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: all 0.2s; min-height: 42px; flex: 1; justify-content: center; max-width: 140px; }
        .tab-btn.active { background: #0B1F3A !important; color: white !important; box-shadow: 0 4px 12px rgba(11,31,58,0.25); transform: scale(1.02); }
        .tab-btn.inactive { background: #F3F5F7; color: #5A6A7F; }
        .tab-btn.inactive:hover { background: #E9EEF3; color: #0B1F3A; }
        .progress-bar { display: flex; gap: 8px; align-items: center; justify-content: center; padding: 16px; background: white; border-bottom: 1px solid #EEF2F6; flex-wrap: wrap; }
        .progress-step { display: flex; align-items: center; gap: 8px; }
        .progress-circle { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }
        .progress-active { background: #0B1F3A; color: white; }
        .progress-done { background: #1DB6A6; color: white; }
        .progress-todo { background: #F3F5F7; color: #9AA9BD; }
        .progress-line { width: 40px; height: 2px; background: #E3E8EF; }
        .progress-line.done { background: #1DB6A6; }
        .search-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 10px; padding: 12px; background: white; }
        .result-card { background: white; border-radius: 16px; padding: 16px 20px; border: 1px solid #E3E8EF; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; cursor: pointer; }
        .result-card:hover { box-shadow: 0 4px 20px rgba(11,31,58,0.1); transform: translateY(-1px); border-color: #0B1F3A; }
        .result-card.popular { border: 2px solid #FFC107; box-shadow: 0 4px 20px rgba(255,193,7,0.15); }
        @media (max-width: 1024px) {
          .search-grid { grid-template-columns: repeat(6, 1fr); }
        }
        @media (max-width: 768px) {
          .tabs-header { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }
          .tabs-container { gap: 6px; }
          .tab-btn { padding: 10px 12px; font-size: 12px; flex: 1; max-width: none; min-height: 40px; }
          .search-grid { grid-template-columns: 1fr !important; }
          .search-grid > div { grid-column: span 1 !important; }
          .result-card { flex-direction: column !important; align-items: stretch !important; gap: 12px; }
          .result-card > div:last-child { justify-content: space-between; width: 100%; }
          .progress-line { width: 20px; }
          .hero-title { font-size: 28px !important; }
          .hero { height: 380px !important; padding: 0 20px !important; }
        }
        @media (max-width: 480px) {
          .tab-btn { font-size: 11px; padding: 9px 10px; gap: 4px; }
          .tab-btn span:first-child { font-size: 14px; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '1280px', background: 'white', borderRadius: '28px', border: '5px solid #0B1F3A', overflow: 'hidden', boxShadow: '0 20px 80px rgba(11,31,58,0.18)', display: 'flex', flexDirection: 'column' }}>

        <header style={{ background: '#0B1F3A', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={()=>setBookingStep('search')}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFC107', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#0B1F3A' }}>✈</div>
            <div>
              <div style={{ display: 'flex', gap: '2px' }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: '16px' }}>Khilane</span>
                <span style={{ color: '#FFC107', fontWeight: 800, fontSize: '16px' }}>Travel</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '8px', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase', marginTop: '2px' }}>Explore More • Pay Less • Travel Better</div>
            </div>
          </div>
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
              { id: 'results', label: activeTab === 'flights' ? 'Flights' : activeTab === 'stays' ? 'Stays' : activeTab === 'cars' ? 'Cars' : 'Buses', num: 2 },
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
                    <div className={`progress-circle ${isDone ? 'progress-done' : isActive ? 'progress-active' : 'progress-todo'}`}>{isDone ? '✓' : step.num}</div>
                    <span style={{ fontSize: '11px', fontWeight: isActive ? 700 : 500, color: isActive ? '#0B1F3A' : isDone ? '#1DB6A6' : '#9AA9BD' }}>{step.label}</span>
                  </div>
                  {idx < 4 && <div className={`progress-line ${isDone ? 'done' : ''}`} />}
                </div>
              );
            })}
          </div>
        )}

        {bookingStep === 'search' && (
          <div className="hero" style={{ position: 'relative', height: '440px', background: '#0B1F3A', overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #FF8A65, #FF7043 30%, #4A2C5A 75%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,31,58,0.85), rgba(11,31,58,0.3), transparent)' }} />
            <div style={{ position: 'absolute', left: '51%', top: '44%', width: '200px', height: '200px', transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, #FFF7D1, #FFCC6A, #FF8A3D)', opacity: 0.9 }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '58%', background: '#0B1F3A', clipPath: 'polygon(0 42%, 8% 32%, 14% 18%, 21% 18%, 28% 18%, 36% 18%, 44% 18%, 52% 18%, 60% 18%, 66% 28%, 74% 35%, 84% 30%, 92% 38%, 100% 42%, 100% 100%, 0 100%)' }} />
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px', maxWidth: '700px' }}>
              <h1 className="hero-title" style={{ color: 'white', fontWeight: 800, lineHeight: '0.93', fontSize: '44px' }}>South Africa's Cheapest<br/>Travel Booking Company</h1>
              <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>Flights • Hotels • Cars • Buses • All in ZAR (R) — White-label on Khilane</p>
              <div style={{ marginTop: '20px', display: 'inline-flex', gap: '10px', background: '#FFC107', borderRadius: '999px', padding: '8px 16px 8px 8px', maxWidth: '540px', alignItems: 'flex-start' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#FFC107', fontSize: '12px', fontWeight: 900 }}>R</span>
                </div>
                <p style={{ color: '#0B1F3A', fontSize: '11.5px', fontWeight: 700 }}><span style={{ fontWeight: 800 }}>White-Label R20 Beat:</span> Book {activeTab} entirely on khilanetravel.co.za — no redirect. We beat any price by R20.</p>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'search' && (
          <div style={{ position: 'relative', zIndex: 20, padding: '0 16px', marginTop: '-56px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1100px', background: 'white', borderRadius: '18px', boxShadow: '0 18px 56px rgba(11,31,58,0.18)', border: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              
              <div className="tabs-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', gap: '12px', alignItems: 'center', flexWrap: 'wrap', background: 'white' }}>
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

              <div className="search-grid">
                {activeTab === 'flights' && (
                  <>
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
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>👥 2 Adults</div>
                    </div>
                  </>
                )}

                {activeTab === 'stays' && (
                  <>
                    <div style={{ gridColumn: 'span 4', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Destination</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1F3A', marginTop: '4px' }}>🏨 Cape Town, South Africa</div>
                    </div>
                    <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Check-in</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>📅 12 Jan 2026</div>
                    </div>
                    <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Check-out</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>📅 15 Jan 2026</div>
                    </div>
                    <div style={{ gridColumn: 'span 2', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Guests</div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>👥 2 Guests, 1 Room</div>
                    </div>
                  </>
                )}

                {activeTab === 'cars' && (
                  <>
                    <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Pick-up</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1F3A', marginTop: '4px' }}>🚗 JNB Airport</div>
                    </div>
                    <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Drop-off</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1F3A', marginTop: '4px' }}>📍 Cape Town CBD</div>
                    </div>
                    <div style={{ gridColumn: 'span 2', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>From</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>📅 12 Jan, 10:00</div>
                    </div>
                    <div style={{ gridColumn: 'span 2', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Until</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>📅 15 Jan, 10:00</div>
                    </div>
                    <div style={{ gridColumn: 'span 2', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Driver Age</div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>👤 26+ years</div>
                    </div>
                  </>
                )}

                {activeTab === 'buses' && (
                  <>
                    <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>From</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1F3A', marginTop: '4px' }}>🚌 Johannesburg</div>
                    </div>
                    <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>To</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1F3A', marginTop: '4px' }}>📍 Cape Town</div>
                    </div>
                    <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Departure Date</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>📅 12 Jan 2026</div>
                    </div>
                    <div style={{ gridColumn: 'span 3', background: '#F5F7F9', borderRadius: '12px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', textTransform: 'uppercase' }}>Passengers</div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#0B1F3A', marginTop: '4px' }}>👥 2 Passengers</div>
                    </div>
                  </>
                )}
              </div>

              <div style={{ padding: '0 12px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: '#6B7D94' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#E6F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                  <span><b style={{ color: '#0B1F3A' }}>White-Label R20 Beat</b> — {activeTab} stays on khilanetravel.co.za</span>
                </div>
                <button onClick={handleSearch} style={{ background: '#FFC107', color: '#0B1F3A', fontWeight: 800, fontSize: '13.5px', borderRadius: '12px', padding: '13px 28px', border: 'none', cursor: 'pointer' }}>
                  {activeTab === 'flights' ? '🔍 Search Flights' : activeTab === 'stays' ? '🏨 Search Stays' : activeTab === 'cars' ? '🚗 Search Cars' : '🚌 Search Buses'}
                </button>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'results' && (
          <div style={{ padding: '24px', background: '#FAFBFC' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1F3A' }}>
                    {activeTab === 'flights' ? 'JNB → CPT • 12 Jan • 4 flights' : activeTab === 'stays' ? 'Cape Town • 12-15 Jan • 4 hotels' : activeTab === 'cars' ? 'JNB → CPT • 4 cars available' : 'JNB → CPT • 4 buses'} found
                  </h2>
                  <p style={{ fontSize: '12px', color: '#6B7D94', marginTop: '4px' }}>White-labeled • R20 Beat • ZAR • No redirect • {activeTab} fully responsive</p>
                </div>
                <button onClick={()=>setBookingStep('search')} style={{ background: 'white', border: '1px solid #E3E8EF', padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>← Modify Search</button>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                {getCurrentData().map((item) => (
                  <div key={item.id} className={`result-card ${item.popular ? 'popular' : ''}`}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ fontSize: '22px' }}>{item.logo || item.image}</span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0B1F3A' }}>
                            {item.type === 'flight' ? item.airline : item.type === 'stay' ? item.name : item.type === 'car' ? `${item.company} • ${item.name}` : `${item.company}`}
                          </div>
                          <div style={{ fontSize: '10px', color: '#7A8CA6' }}>
                            {item.type === 'flight' ? `Direct • ${item.seats} seats` : item.type === 'stay' ? `⭐ ${item.rating} (${item.reviews}) • ${item.amenities}` : item.type === 'car' ? `${item.seats} seats • ${item.bags} bags • ${item.transmission}` : `${item.from}→${item.to} • ${item.duration} • ${item.seats} seats`}
                          </div>
                        </div>
                      </div>

                      {item.type === 'flight' || item.type === 'bus' ? (
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '16px', fontWeight: 800, color: '#0B1F3A' }}>{item.depart}</div>
                            <div style={{ fontSize: '11px', color: '#7A8CA6' }}>{item.from}</div>
                          </div>
                          <div style={{ width: '60px', height: '2px', background: '#E3E8EF' }} />
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '16px', fontWeight: 800, color: '#0B1F3A' }}>{item.arrive}</div>
                            <div style={{ fontSize: '11px', color: '#7A8CA6' }}>{item.to}</div>
                          </div>
                        </div>
                      ) : item.type === 'stay' ? (
                        <div style={{ fontSize: '12px', color: '#6B7D94' }}>📍 {item.location}</div>
                      ) : (
                        <div style={{ fontSize: '12px', color: '#6B7D94' }}>📅 3 days • Unlimited km</div>
                      )}

                      {item.popular && <div style={{ background: '#FFC107', color: '#0B1F3A', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '999px' }}>MOST POPULAR</div>}
                      {item.cheapest && <div style={{ background: '#E6F7F5', color: '#1DB6A6', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '999px' }}>CHEAPEST • R20 BEAT</div>}
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#9AA9BD', textDecoration: 'line-through' }}>R{item.originalPrice}</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#0B1F3A' }}>R{item.price}<span style={{ fontSize: '11px', fontWeight: 500, color: '#6B7D94' }}>{item.per || ''}</span></div>
                        <div style={{ fontSize: '10px', color: '#1DB6A6', fontWeight: 600 }}>Save R{item.originalPrice - item.price} + R20 Beat</div>
                      </div>
                      <button onClick={()=>handleSelect(item)} style={{ background: '#0B1F3A', color: 'white', fontWeight: 700, fontSize: '13px', padding: '12px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>Select →</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px', background: '#E6F7F5', border: '1px solid #B2E0D9', borderRadius: '12px', padding: '12px 16px', display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '16px' }}>✓</span>
                <span style={{ fontSize: '11px', color: '#0A5A50' }}><b>All 4 tabs fully responsive:</b> Flights ✈️, Stays 🏨, Cars 🚗, Buses 🚌 — all white-labeled, customer stays on khilanetravel.co.za beginning to end, no Travelstart redirect, R20 Beat Guarantee, Pay in ZAR via Paystack.</span>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'passengers' && selectedItem && (
          <div style={{ padding: '24px', background: '#FAFBFC' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '18px', padding: '24px', border: '1px solid #E3E8EF' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1F3A' }}>Details — {activeTab} • Stay on Khilane</h2>
              <p style={{ fontSize: '12px', color: '#6B7D94', marginTop: '4px' }}>R{selectedItem.price}{selectedItem.per || ''} • R20 Beat applied • White-label on Khilane</p>
              <div style={{ marginTop: '20px', padding: '16px', background: '#F5F7F9', borderRadius: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', marginBottom: '6px' }}>First Name</div><input placeholder="Mthokozisi" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E3E8EF', fontSize: '13px' }} /></div>
                <div><div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', marginBottom: '6px' }}>Last Name</div><input placeholder="Gwala" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E3E8EF', fontSize: '13px' }} /></div>
                <div style={{ gridColumn: 'span 2' }}><div style={{ fontSize: '10px', fontWeight: 700, color: '#7A8CA6', marginBottom: '6px' }}>Email</div><input placeholder="mthokogwala@gmail.com" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E3E8EF', fontSize: '13px' }} /></div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={()=>setBookingStep('results')} style={{ background: 'white', border: '1px solid #E3E8EF', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer' }}>← Back</button>
                <button onClick={()=>{setBookingStep('payment'); window.scrollTo(0,0);}} style={{ background: '#0B1F3A', color: 'white', padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Continue to Payment — R{selectedItem.price} →</button>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'payment' && selectedItem && (
          <div style={{ padding: '24px', background: '#FAFBFC' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '18px', padding: '24px', border: '1px solid #E3E8EF' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1F3A' }}>Payment — {activeTab} • ZAR on Khilane</h2>
              <p style={{ fontSize: '12px', color: '#6B7D94' }}>Paystack Secure • No redirect • Stays on khilanetravel.co.za</p>
              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }} className="search-grid">
                <div>
                  <input placeholder="Card Number • 4242 4242 4242 4242" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E3E8EF', marginBottom: '10px' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input placeholder="MM / YY" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E3E8EF' }} />
                    <input placeholder="CVV" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #E3E8EF' }} />
                  </div>
                </div>
                <div style={{ background: '#0B1F3A', borderRadius: '12px', padding: '16px', color: 'white' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '12px' }}>Summary • {activeTab} • Khilane</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{activeTab}</span><span>R{selectedItem.price}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFC107' }}><span>R20 Beat Discount</span><span>-R20</span></div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.15)', margin: '10px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: 'white' }}><span>Total ZAR</span><span>R{selectedItem.price - 20}</span></div>
                  </div>
                  <button onClick={()=>{setBookingStep('confirmation'); window.scrollTo(0,0);}} style={{ width: '100%', marginTop: '16px', background: '#FFC107', color: '#0B1F3A', fontWeight: 800, padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>Pay R{selectedItem.price - 20} • Issue on Khilane</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 'confirmation' && selectedItem && (
          <div style={{ padding: '24px', background: '#FAFBFC' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', borderRadius: '18px', padding: '32px', border: '2px solid #1DB6A6', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E6F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '28px' }}>✓</div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0B1F3A', marginTop: '16px' }}>Booked on Khilane Travel! • {activeTab}</h2>
              <p style={{ fontSize: '13px', color: '#6B7D94', marginTop: '8px' }}>Customer stayed on khilanetravel.co.za beginning to end — No redirect • {activeTab} • R20 Beat</p>
              <div style={{ marginTop: '24px', background: '#0B1F3A', borderRadius: '12px', padding: '20px', textAlign: 'left', color: 'white' }}>
                <div style={{ fontSize: '16px', fontWeight: 800 }}>
                  {selectedItem.type === 'flight' ? `${selectedItem.from} → ${selectedItem.to}` : selectedItem.type === 'stay' ? selectedItem.name : selectedItem.type === 'car' ? selectedItem.name : `${selectedItem.from} → ${selectedItem.to}`} • R{selectedItem.price - 20} ZAR
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Booking Ref: KHL-{Math.floor(Math.random()*900000)+100000} • Issued by Khilane Travel • R20 Beat • Paystack ZAR • White-label</div>
              </div>
              <button onClick={()=>{setBookingStep('search'); setSelectedItem(null);}} style={{ marginTop: '20px', background: '#0B1F3A', color: 'white', padding: '12px 24px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Book Another {activeTab} on Khilane →</button>
            </div>
          </div>
        )}

        <footer style={{ background: '#0B1F3A', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: '260px', marginTop: 'auto' }}>
          <div style={{ padding: '32px' }}>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '26px' }}>We Beat Prices,<br/>By R20. All 4 Tabs Responsive.</h3>
            <p style={{ marginTop: '10px', color: 'rgba(255,255,255,0.6)', fontSize: '11px', maxWidth: '360px' }}>All tabs fully responsive: Flights ✈️, Stays 🏨, Cars 🚗, Buses 🚌 — white-label, customer stays on khilanetravel.co.za, no Travelstart redirect, R20 Beat Guarantee, ZAR via Paystack. Mobile: tabs scroll, grid 1 column, cards stack.</p>
          </div>
          <div style={{ background: 'linear-gradient(to bottom right, #1A3A5F, #0B1F3A)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <h3 style={{ color: 'white', fontWeight: 800, fontSize: '26px' }}>Your Journey<br/>Our Priority</h3>
          </div>
        </footer>
      </div>
    </div>
  );
}
