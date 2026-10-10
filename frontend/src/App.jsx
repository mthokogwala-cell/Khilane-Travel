import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('return');
  const [from, setFrom] = useState({ city: 'Johannesburg', code: 'JNB' });
  const [to, setTo] = useState({ city: 'Cape Town', code: 'CPT' });
  const [tabFeedback, setTabFeedback] = useState('Flights active • R20 guarantee applies');

  const AFFILIATE_URL = 'https://www.travelstart.co.za/?affId=PLACEHOLDER';

  const handleSearch = () => {
    window.open(AFFILIATE_URL, '_blank', 'noopener,noreferrer');
  };

  const destinations = [
    { name: 'Cape Town', country: 'South Africa', price: 'R2,850', sub: 'Table Mountain & Beaches', grad: 'from-[#2C5F8A] via-[#4A8FC0] to-[#B8D4E8]', emoji: '⛰️' },
    { name: 'Johannesburg', country: 'South Africa', price: 'R1,950', sub: 'City of Gold', grad: 'from-[#8B6A2B] via-[#C19A4B] to-[#F5D76E]', emoji: '🌆' },
    { name: 'Durban', country: 'South Africa', price: 'R2,150', sub: 'Golden Mile', grad: 'from-[#0E7C7B] via-[#2FBF9A] to-[#A8E6CF]', emoji: '🌊' },
    { name: 'Kruger Park', country: 'South Africa', price: 'R4,250', sub: 'Big Five Safari', grad: 'from-[#4A5D23] via-[#7A9E4B] to-[#C4D7A0]', emoji: '🦁' },
    { name: 'Mauritius', country: 'Indian Ocean', price: 'R8,450', sub: 'Island Paradise', grad: 'from-[#0AA6B0] via-[#1ECFD6] to-[#D9F9FA]', emoji: '🌴' },
    { name: 'Dubai', country: 'UAE', price: 'R9,750', sub: 'Future City', grad: 'from-[#1C2A44] via-[#4B5D7A] to-[#A8B2C0]', emoji: '🏙️' },
  ];

  return (
    <div className="min-h-screen bg-[#E9EEF3] flex justify-center p-[10px] md:p-5 antialiased selection:bg-[#FFC107]/30">
      <style>{`
        * { font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
        .serif { font-family: Georgia, 'Times New Roman', serif; font-style: italic; }
      `}</style>

      <div className="w-full max-w-[1280px] bg-white rounded-[28px] md:rounded-[32px] border-[5px] md:border-[6px] border-[#0B1F3A] overflow-hidden shadow-[0_20px_80px_rgba(11,31,58,0.18)] flex flex-col">

        {/* HEADER - #0B1F3A */}
        <header className="bg-[#0B1F3A] h-[66px] md:h-[72px] flex items-center justify-between px-5 md:px-8 shrink-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FFC107] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#0B1F3A]" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/><path d="M3 12h18"/></svg>
            </div>
            <div className="leading-[1.05]">
              <div className="flex items-baseline gap-[1px]">
                <span className="text-white font-extrabold text-[15.5px] md:text-[16px] tracking-tight">Khilane</span>
                <span className="text-[#FFC107] font-extrabold text-[15.5px] md:text-[16px] tracking-tight">Travel</span>
              </div>
              <div className="hidden sm:block text-[8.5px] tracking-[0.13em] text-white/45 font-semibold uppercase mt-[2px]">Explore More • Pay Less • Travel Better</div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            {['Home','Flights','Stays','Cars','Buses','Deals','About Us'].map(l => (
              <span key={l} className={`text-[13px] font-medium tracking-wide ${l==='Home' ? 'text-white relative after:absolute after:-bottom-[6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#FFC107] after:rounded-full' : 'text-white/65'}`}>{l}</span>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <div className="hidden md:flex items-center gap-2 bg-white/[0.08] border border-white/10 rounded-full px-3 py-[6px]">
              <span className="text-white text-[11px] font-bold">ZAR</span>
              <span className="text-[11px]">🇿🇦</span>
            </div>
            <div className="bg-white rounded-full px-3.5 py-[6px] text-[12px] font-bold text-[#0B1F3A]">My Account</div>
          </div>
        </header>

        {/* HERO - Table Mountain Sunset - CSS only */}
        <div className="relative h-[430px] md:h-[440px] w-full shrink-0 overflow-hidden bg-[#0B1F3A]">
          {/* Sky - sunset over Cape Town */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FF8A65] via-[#FF7043] via-30% to-[#4A2C5A] to-75%" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/85 via-[#0B1F3A]/30 to-transparent" />
          {/* Sun behind Table Mountain */}
          <div className="absolute left-[46%] md:left-[51%] top-[44%] w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#FFF7D1] via-[#FFCC6A] to-[#FF8A3D] blur-[0.5px] opacity-90 shadow-[0_0_80px_rgba(255,184,80,0.6)]" />
          <div className="absolute left-[46%] md:left-[51%] top-[44%] w-[260px] h-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFB74D]/20 blur-[24px]" />
          
          {/* Table Mountain - iconic flat top */}
          <div className="absolute bottom-0 left-0 right-0 h-[58%] opacity-[0.95]" style={{background:'#0B1F3A', clipPath:'polygon(0 42%, 8% 32%, 14% 18%, 21% 18%, 28% 18%, 36% 18%, 44% 18%, 52% 18%, 60% 18%, 66% 28%, 74% 35%, 84% 30%, 92% 38%, 100% 42%, 100% 100%, 0 100%)'}} />
          {/* Secondary ridge - Lion's Head / Signal Hill hint */}
          <div className="absolute bottom-0 left-0 right-0 h-[38%] opacity-80" style={{background:'#132D52', clipPath:'polygon(0 68%, 12% 52%, 22% 58%, 35% 42%, 48% 55%, 62% 38%, 75% 48%, 88% 35%, 100% 50%, 100% 100%, 0 100%)'}} />
          {/* Stadium - Green Point */}
          <div className="absolute bottom-[18%] left-[11%] w-[18%] max-w-[140px] h-[46px] rounded-t-[100%] border border-white/20 bg-white/[0.06] backdrop-blur-[1px]" />
          <div className="absolute bottom-[18%] left-[11%] w-[18%] max-w-[140px] h-[12px] bg-white/10 rounded-t-[40px]" />
          {/* Ocean / city lights reflection */}
          <div className="absolute bottom-0 left-0 right-0 h-[22%] bg-gradient-to-t from-[#0B1F3A]/80 to-transparent" />
          <div className="absolute bottom-[6%] left-[20%] right-[10%] h-[1px] bg-white/10 blur-[0.5px]" />

          <div className="absolute top-5 right-6 md:right-8 hidden md:block z-10">
            <span className="serif text-white/85 text-[13px] tracking-wide drop-shadow">Table Mountain, Cape Town — Discover South Africa and the World</span>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-10 lg:px-12 max-w-[700px]">
            <h1 className="text-white font-extrabold leading-[0.93] text-[32px] md:text-[44px] tracking-[-0.02em] drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]">
              South Africa's Cheapest<br/>Travel Booking Company
            </h1>
            <p className="mt-3 text-white/80 text-[13px] md:text-[14px] font-medium tracking-[0.02em]">Flights • Hotels • Cars • Buses • More — All in ZAR (R)</p>
            
            {/* R20 Badge - in hero */}
            <div className="mt-5 inline-flex items-start gap-2.5 bg-[#FFC107] rounded-full pl-2 pr-4 py-2 max-w-[540px] shadow-[0_6px_20px_rgba(0,0,0,0.2)]">
              <div className="w-6 h-6 rounded-full bg-[#0B1F3A] flex items-center justify-center shrink-0">
                <span className="text-[#FFC107] text-[12px] font-black">R</span>
              </div>
              <p className="text-[#0B1F3A] text-[11px] md:text-[11.5px] leading-[1.35] font-bold">
                <span className="font-extrabold">Price Beat Guarantee — R20:</span> Find a lower price? We'll beat it by at least R20. No suppliers named. Just cheaper flights.
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH CARD - with R20 badge */}
        <div className="relative z-20 px-4 md:px-6 -mt-[56px] flex justify-center">
          <div className="w-full max-w-[1100px] bg-white rounded-[18px] shadow-[0_18px_56px_rgba(11,31,58,0.18),0_2px_10px_rgba(11,31,58,0.08)] border border-black/[0.05] overflow-hidden">
            {/* Tabs + R20 inline */}
            <div className="flex items-center justify-between gap-2 p-2.5 flex-wrap bg-white">
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { id:'flights', label:'Flights', icon:'✈️', note:'Flights active • R20 Price Beat Guarantee' },
                  { id:'stays', label:'Stays', icon:'🏨', note:'Stays — R20 beat guarantee applies • Search via Flights' },
                  { id:'cars', label:'Cars', icon:'🚗', note:'Cars — R20 beat guarantee applies • Search via Flights' },
                  { id:'buses', label:'Buses', icon:'🚌', note:'Buses — R20 beat guarantee applies • Search via Flights' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={()=>{
                      setActiveTab(tab.id);
                      setTabFeedback(tab.note);
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-[11px] text-[13px] font-bold transition ${activeTab===tab.id?'bg-[#0B1F3A] text-white shadow-sm ring-2 ring-[#FFC107]/40':'bg-[#F3F5F7] text-[#5A6A7F] hover:bg-[#E9EEF3]'}`}
                  >
                    <span className="text-[13px]">{tab.icon}</span>{tab.label}
                  </button>
                ))}
              </div>
              <div className="hidden md:inline-flex items-center gap-2 bg-[#0B1F3A] text-white text-[10.5px] font-bold px-3 py-1.5 rounded-full">
                <span className="w-4 h-4 rounded-full bg-[#FFC107] text-[#0B1F3A] flex items-center justify-center text-[10px]">R</span>
                Price Beat Guarantee: We beat any price by R20
              </div>
            </div>

            <div className="h-[1px] bg-[#EEF2F6]" />

            <div className="flex flex-wrap items-center gap-5 px-5 py-3 bg-[#FAFBFC]">
              {[{id:'return',label:'Return'},{id:'oneway',label:'One Way'},{id:'multi',label:'Multi-City'}].map(opt=>(
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-[18px] h-[18px] rounded-full border-[1.8px] flex items-center justify-center transition ${tripType===opt.id?'border-[#0B1F3A] bg-white':'border-[#C2CAD6] group-hover:border-[#8FA0B8]'}`}>
                    {tripType===opt.id && <div className="w-[8px] h-[8px] rounded-full bg-[#0B1F3A]" />}
                  </div>
                  <input type="radio" className="hidden" checked={tripType===opt.id} onChange={()=>setTripType(opt.id)} />
                  <span className={`text-[12.5px] font-semibold ${tripType===opt.id?'text-[#0B1F3A]':'text-[#6B7D94]'}`}>{opt.label}</span>
                </label>
              ))}
              <span className="ml-auto flex items-center gap-2">
                <span className="hidden sm:inline text-[11px] font-bold text-[#0B1F3A] bg-[#FFC107]/20 border border-[#FFC107]/30 px-2.5 py-1 rounded-full">{tabFeedback}</span>
                <span className="md:hidden text-[10px] font-bold bg-[#0B1F3A] text-white px-2.5 py-1 rounded-full">R20 Beat</span>
              </span>
            </div>
            <div className="sm:hidden px-5 pb-2 -mt-1">
              <span className="text-[10.5px] font-bold text-[#0B1F3A] bg-[#FFC107]/20 border border-[#FFC107]/30 px-2.5 py-1 rounded-full inline-block">{tabFeedback}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 px-3 pb-3 bg-white">
              <div className="md:col-span-3 bg-[#F5F7F9] rounded-[12px] px-3.5 py-3 flex flex-col gap-1 border border-black/[0.02]">
                <span className="text-[10px] font-bold tracking-[0.08em] text-[#7A8CA6] uppercase">From</span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#9AA9BD] text-[14px]">📍</span>
                    <div>
                      <div className="text-[13.5px] font-bold text-[#0B1F3A] leading-none">{from.city}</div>
                      <div className="text-[11px] text-[#7A8CA6] font-medium mt-[2px]">{from.code}</div>
                    </div>
                  </div>
                  <button
                    onClick={()=>{const tmp=from; setFrom(to); setTo(tmp);}}
                    className="w-7 h-7 rounded-full bg-white border border-[#E3E8EF] flex items-center justify-center hover:bg-[#0B1F3A] hover:text-white transition text-[12px]"
                    aria-label="Swap"
                  >⇄</button>
                </div>
              </div>
              <div className="md:col-span-3 bg-[#F5F7F9] rounded-[12px] px-3.5 py-3 flex flex-col gap-1 border border-black/[0.02]">
                <span className="text-[10px] font-bold tracking-[0.08em] text-[#7A8CA6] uppercase">To</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#9AA9BD] text-[14px]">📍</span>
                  <div>
                    <div className="text-[13.5px] font-bold text-[#0B1F3A] leading-none">{to.city}</div>
                    <div className="text-[11px] text-[#7A8CA6] font-medium mt-[2px]">{to.code}</div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 bg-[#F5F7F9] rounded-[12px] px-3.5 py-3 flex flex-col gap-1 border border-black/[0.02]">
                <span className="text-[10px] font-bold tracking-[0.08em] text-[#7A8CA6] uppercase">Departure</span>
                <div className="flex items-center gap-2"><span className="text-[#9AA9BD]">📅</span><span className="text-[13px] font-semibold text-[#0B1F3A]">12 Jan 2026</span></div>
              </div>
              <div className="md:col-span-2 bg-[#F5F7F9] rounded-[12px] px-3.5 py-3 flex flex-col gap-1 border border-black/[0.02]">
                <span className="text-[10px] font-bold tracking-[0.08em] text-[#7A8CA6] uppercase">Return</span>
                <div className="flex items-center gap-2"><span className="text-[#9AA9BD]">📅</span><span className="text-[13px] font-semibold text-[#0B1F3A]">19 Jan 2026</span></div>
              </div>
              <div className="md:col-span-2 flex gap-2">
                <div className="flex-1 bg-[#F5F7F9] rounded-[12px] px-3.5 py-3 flex flex-col gap-1 border border-black/[0.02]">
                  <span className="text-[10px] font-bold tracking-[0.08em] text-[#7A8CA6] uppercase">Travelers</span>
                  <div className="flex items-center gap-2"><span className="text-[#9AA9BD]">👥</span><span className="text-[11px] font-semibold text-[#0B1F3A] leading-tight">2 Adults, 1 Child</span></div>
                </div>
              </div>
            </div>

            <div className="px-3 pb-3 flex flex-col md:flex-row items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-2 text-[11px] font-medium text-[#6B7D94]">
                <span className="w-5 h-5 rounded-full bg-[#E6F7F5] flex items-center justify-center">✓</span>
                <span><b className="text-[#0B1F3A]">R20 Price Beat Guarantee</b> — applied at checkout • All prices in ZAR</span>
              </div>
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-[#FFC107] hover:bg-[#FFB300] text-[#0B1F3A] font-extrabold text-[13.5px] tracking-wide rounded-[12px] px-7 py-[13px] flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(255,193,7,0.35)] active:scale-[0.98] transition"
              >
                <span>🔍</span> Search Flights
              </button>
            </div>
          </div>
        </div>

        {/* TRUST ROW */}
        <div className="px-6 md:px-10 lg:px-12 mt-8 md:mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 py-6 border-y border-[#EAF0F6]">
            {[
              { title: 'Price Beat Guarantee R20', desc: 'Beat by R20 or more — ZAR' },
              { title: 'Secure Payments', desc: 'ZAR safe checkout' },
              { title: '24/7 Customer Support', desc: "We're here to help, anytime" },
              { title: 'Trusted Travel Partners', desc: 'Global & local coverage' },
              { title: 'Sustainable Travel', desc: 'A better tomorrow' },
            ].map((item,i)=>(
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E6F7F5] flex items-center justify-center shrink-0 text-[#1DB6A6] font-bold text-[13px]">✓</div>
                <div className="leading-tight">
                  <div className="text-[12px] font-bold text-[#0B1F3A]">{item.title}</div>
                  <div className="text-[11px] text-[#6B7D94] mt-[2px] font-medium">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR DESTINATIONS - 6 with R prices */}
        <div className="px-6 md:px-10 lg:px-12 mt-8 pb-10">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <h2 className="text-[22px] md:text-[24px] font-extrabold text-[#0B1F3A] tracking-[-0.01em]">Popular Destinations</h2>
              <p className="text-[12.5px] text-[#6B7D94] font-medium mt-1">All prices in ZAR (R) • R20 Price Beat Guarantee on every booking</p>
            </div>
            <span className="hidden md:flex items-center gap-1 text-[12px] font-bold text-[#0B1F3A]">View All Destinations →</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {destinations.map(dest=>(
              <div key={dest.name} className="group relative rounded-[16px] overflow-hidden h-[192px] cursor-pointer shadow-[0_2px_12px_rgba(11,31,58,0.08)] hover:shadow-[0_8px_24px_rgba(11,31,58,0.16)] transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${dest.grad} group-hover:scale-[1.06] transition-transform duration-700`} />
                <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 80%, white 1px, transparent 1px)', backgroundSize:'18px 18px'}} />
                <div className="absolute top-3 left-3 text-[20px] drop-shadow">{dest.emoji}</div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[#0B1F3A] text-[10px] font-extrabold px-2 py-1 rounded-full">R20 BEAT</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <div className="text-white font-bold text-[13.5px] leading-tight">{dest.name}</div>
                  <div className="text-white/70 text-[11px] font-medium">{dest.sub}</div>
                  <div className="text-white text-[11px] font-bold mt-1">From {dest.price} • {dest.country}</div>
                </div>
                <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/95 flex items-center justify-center shadow-sm">↗</div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER - R20 Guarantee, no suppliers */}
        <footer className="mt-auto bg-[#0B1F3A] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] min-h-[360px]">
            <div className="px-8 md:px-12 lg:px-12 py-10 lg:py-14 flex flex-col justify-between">
              <div>
                <h3 className="text-white font-extrabold text-[28px] md:text-[34px] leading-[0.95] tracking-[-0.02em] max-w-[380px]">We Beat Prices,<br/>By R20. Automatically.</h3>
                <p className="mt-4 text-white/60 text-[12.5px] leading-[1.6] max-w-[380px] font-medium">
                  Khilane Travel compares millions of fares in real-time. If you find a cheaper price elsewhere, we don't just match it — we beat it by R20. Guaranteed. All prices displayed in South African Rand (R). No supplier names, just the cheapest fare for khilanetravel.co.za.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 bg-[#FFC107] rounded-full px-4 py-2">
                  <span className="w-5 h-5 rounded-full bg-[#0B1F3A] text-[#FFC107] flex items-center justify-center text-[11px] font-black">R</span>
                  <span className="text-[#0B1F3A] text-[11px] font-extrabold">Price Beat Guarantee R20 • ZAR Only • No Hidden Suppliers</span>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-white/30 text-[11px] font-semibold uppercase tracking-wide">Production Build</span>
                  <span className="text-white/15">•</span>
                  <span className="text-white/40 text-[11px]">Affiliate: {AFFILIATE_URL.replace('https://','')}</span>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-6 text-[11px] font-semibold tracking-wide">
                <span className="text-white/40 uppercase">About Us</span>
                <span className="text-white/40 uppercase">Contact Us</span>
                <span className="text-white/40 uppercase">Terms • R20 Guarantee</span>
              </div>
            </div>
            <div className="relative min-h-[300px] lg:min-h-auto overflow-hidden bg-gradient-to-br from-[#1A3A5F] via-[#0B1F3A] to-[#132D52]">
              <div className="absolute inset-0 opacity-30" style={{backgroundImage:'linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.05) 50%, transparent 52%)', backgroundSize:'24px 24px'}} />
              <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-white/10 bg-white/[0.02]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-white/[0.06]" />
              <div className="relative h-full flex flex-col justify-end p-8 md:p-10 lg:p-12">
                <h3 className="text-white font-extrabold text-[30px] md:text-[36px] leading-[0.95] tracking-[-0.02em]">Your Journey<br/>Our Priority</h3>
                <p className="mt-3 text-white/55 text-[12px] max-w-[300px] leading-[1.5]">Curated experiences, local expertise, and best-price assurance for every trip. All in ZAR. R20 Price Beat Guarantee on khilanetravel.co.za</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="bg-white text-[#0B1F3A] text-[11px] font-bold px-3 py-1.5 rounded-full">🇿🇦 Proudly South African</div>
                  <div className="text-white/40 text-[11px]">R Prices Only</div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.08] px-8 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <span className="text-[11px] text-white/35 font-medium">© {new Date().getFullYear()} Khilane Travel (Pty) Ltd. All rights reserved. Prices in ZAR (R) only. Price Beat Guarantee R20.</span>
            <div className="flex items-center gap-2 text-[10px] text-white/25">
              <span>khilanetravel.co.za</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Secure • Trusted • Cheapest • R20 Beat</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
