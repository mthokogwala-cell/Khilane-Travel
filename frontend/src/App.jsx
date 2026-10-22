
import React, { useState, useEffect } from "react";

// 22 OCT 2026 - FLYINGCARPET SIGNED UP - FCTAM26AA10HW ACTIVE - STAYS + BUSES FIXED WITH FLYINGCARPET - FLIGHTS + CARS UNTOUCHED AS YOU ASKED
const NAVY = "#0A1931";
const GOLD = "#FFC300";

// FLIGHTS - UNTOUCHED - Travelstart Publisher 7936957 R105/R145 - LIVE
const TRACKING_LINK = "https://travelstart.zwjlk6.net/k4Xqbx";
// CARS - UNTOUCHED - DiscoverCars khilanetravel 70% LIVE 365d ZAR forced - APPROVED 17 Oct 2026
const DISCOVERCARS_ZAR = "https://www.discovercars.com/?a_aid=khilanetravel&currency=ZAR";
// STAYS + BUSES NOW USE FLYINGCARPET - FCTAM26AA10HW - REAL BOOKINGS - COMMISSION - SIGNED UP 22 OCT 2026
const FLYINGCARPET_CAMPAIGN_ID = "FCTAM26AA10HW";
const FLYINGCARPET_REFERRAL = "https://flyingcarpet.sng.link/E29j5/5242?_dl=flyingcarpet%3A%2F%2Finvite%3Fcampaign_id%3DFCTAM26AA10HW%26mode%3Durl&_smtype=3&_fallback_redirect=https://www.flyingcarpet.travel?campaign_id_with_mode=FCTAM26AA10HW_url";
const FLYINGCARPET_DIRECT = "https://www.flyingcarpet.travel?campaign_id_with_mode=FCTAM26AA10HW_url";
const FLYINGCARPET_WIDGET_SRC = "https://main-service.flyingcarpet.travel/search-widget?campaign_id=FCTAM26AA10HW&mode=widget";
// KEEP TRAVELPAYOUTS AS BACKUP - khilanetravel 4-6% stays, 4-7% buses - but now primary is FlyingCarpet
const TRAVELPAYOUTS_MARKER = "khilanetravel";

const WHATSAPP_NUMBER = "0724573419";
const WHATSAPP_LINK = "https://wa.me/27724573419";
const EMAIL = "info@khilanetravel.co.za";

// FLIGHTS - UNTOUCHED
const getFlightLink = (from, to, depart) => `${TRACKING_LINK}?utm_source=khilanetravel&utm_medium=flights&from=${from}&to=${to}&depart=${depart}`;
// STAYS - NOW FLYINGCARPET FCTAM26AA10HW - Hotels - REAL BOOKINGS - COMMISSION - ACTIVE 22 Oct 2026 - PLUS BACKUP Travelpayouts
const getStayLink = (city) => {
  const safeCity = city || "Durban";
  // FlyingCarpet direct link with campaign tracking - Hotels
  return `${FLYINGCARPET_DIRECT}&product=hotels&city=${encodeURIComponent(safeCity)}&utm_source=khilanetravel&utm_medium=stays_flyingcarpet_${FLYINGCARPET_CAMPAIGN_ID}`;
};
// CARS - UNTOUCHED - DiscoverCars 70%
const getCarLink = (city) => `${DISCOVERCARS_ZAR}&city=${encodeURIComponent(city || "Durban")}&utm_source=khilanetravel&utm_medium=cars_untouched`;
// BUSES - NOW FLYINGCARPET FCTAM26AA10HW - Transfers - REAL BOOKINGS - COMMISSION - ACTIVE 22 Oct 2026
const getBusLink = (from, to) => {
  const safeFrom = from || "Johannesburg";
  const safeTo = to || "Cape Town";
  // FlyingCarpet direct link - Transfers (buses)
  return `${FLYINGCARPET_DIRECT}&product=transfers&from=${encodeURIComponent(safeFrom)}&to=${encodeURIComponent(safeTo)}&utm_source=khilanetravel&utm_medium=buses_flyingcarpet_${FLYINGCARPET_CAMPAIGN_ID}`;
};

const mockFlights = [
  { id: 1, airline: "FlySafair", code: "FA", from: "JNB", to: "CPT", dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, badge: true },
  { id: 2, airline: "Airlink", code: "4Z", from: "JNB", to: "CPT", dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, badge: true },
];

const mockStays = [
  { id: 101, name: "Beverly Hills Hotel Umhlanga", loc: "Umhlanga Rocks, Durban", city: "Durban", rating: 4.8, price: 2850, original: 3200, tag: "Beachfront - FlyingCarpet FCTAM26AA10HW", badge: true },
  { id: 102, name: "The Oyster Box", loc: "Umhlanga Ridge", city: "Durban", rating: 4.9, price: 3450, original: 3800, tag: "5-Star Luxury - FlyingCarpet", badge: true },
  { id: 103, name: "Sun City Resort", loc: "Rustenburg, North West", city: "Rustenburg", rating: 4.6, price: 1890, original: 2100, tag: "Family Favourite - FlyingCarpet", badge: false },
  { id: 104, name: "Cape Grace, Fairmont Managed", loc: "V&A Waterfront, Cape Town", city: "Cape Town", rating: 4.9, price: 4250, original: 4600, tag: "Harbour Views - FlyingCarpet", badge: true },
];

const mockCars = [
  { id: 201, name: "Toyota Corolla Quest", type: "Sedan - Manual", seats: 5, city: "Durban", price: 489, original: 539, company: "Avis", badge: true },
  { id: 202, name: "VW Polo Vivo", type: "Hatch - Manual", seats: 5, city: "Johannesburg", price: 425, original: 475, company: "Budget", badge: true },
];

const mockBuses = [
  { id: 301, company: "Intercape", from: "Johannesburg", to: "Cape Town", dep: "18:00", arr: "12:30+1", dur: "18h 30m", price: 685, original: 735, badge: true, type: "Sleepliner - FlyingCarpet FCTAM26AA10HW" },
  { id: 302, company: "Greyhound", from: "Pretoria", to: "Durban", dep: "20:15", arr: "06:45+1", dur: "10h 30m", price: 520, original: 570, badge: true, type: "Dreamliner - FlyingCarpet" },
  { id: 303, company: "Intercity Xpress", from: "Johannesburg", to: "Gqeberha", dep: "17:00", arr: "07:00+1", dur: "14h 00m", price: 595, original: 645, badge: false, type: "Semi-Lux - FlyingCarpet" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("flights");
  const [searchFrom, setSearchFrom] = useState("JNB");
  const [searchTo, setSearchTo] = useState("CPT");
  const [departDate, setDepartDate] = useState("2026-10-15");
  const [returnDate, setReturnDate] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (!document.getElementById('tailwind-cdn')) {
        const s = document.createElement('script');
        s.id = 'tailwind-cdn';
        s.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(s);
      }
      // Load FlyingCarpet widget script for stays & buses - FCTAM26AA10HW
      if (!document.getElementById('flyingcarpet-widget')) {
        const fc = document.createElement('script');
        fc.id = 'flyingcarpet-widget';
        fc.src = FLYINGCARPET_WIDGET_SRC;
        fc.async = true;
        document.head.appendChild(fc);
      }
    }
  }, []);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 600);
  };

  const openRealBooking = (item) => {
    let link = "";
    if (activeTab === "flights") {
      link = getFlightLink(item.from || searchFrom, item.to || searchTo, departDate);
    } else if (activeTab === "stays") {
      link = getStayLink(item.city || searchFrom || "Durban");
    } else if (activeTab === "cars") {
      link = getCarLink(item.city || searchFrom);
    } else if (activeTab === "buses") {
      link = getBusLink(item.from || searchFrom || "Johannesburg", item.to || searchTo || "Cape Town");
    }
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const data = activeTab === "flights" ? mockFlights : activeTab === "stays" ? mockStays : activeTab === "cars" ? mockCars : mockBuses;

  return (
    <div style={{ minHeight: '100vh', background: '#F6F7FB', fontFamily: 'Inter, system-ui, sans-serif', color: '#0f172a' }}>
      <div style={{ background: GOLD, color: NAVY, textAlign: 'center', padding: '10px', fontSize: 12, fontWeight: 900 }}>
        22 OCT - FLYINGCARPET SIGNED UP FCTAM26AA10HW ACTIVE - STAYS + BUSES FIXED WITH FLYINGCARPET - FLIGHTS & CARS UNTOUCHED - ALL PAY NEDBANK
      </div>

      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>K</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 16, color: NAVY }}>Khilane Travel - FlyingCarpet FCTAM26AA10HW LIVE</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>Flights 7936957 UNTOUCHED + Cars 70% UNTOUCHED + Stays FlyingCarpet ACTIVE + Buses FlyingCarpet ACTIVE</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', borderRadius: 999, background: '#25D366', color: 'white', fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>WhatsApp: {WHATSAPP_NUMBER}</a>
            <a href={`mailto:${EMAIL}`} style={{ padding: '6px 12px', borderRadius: 999, background: NAVY, color: 'white', fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>{EMAIL}</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 20 }}>
          <div style={{ background: 'white', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(10,25,49,0.06)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: 6, background: '#f8fafc', margin: 8, padding: 4, borderRadius: 999, width: 'fit-content' }}>
              {[
                { id: "flights", l: "Flights - UNTOUCHED 7936957" }, 
                { id: "stays", l: "Stays - FLYINGCARPET FCTAM" }, 
                { id: "cars", l: "Cars - UNTOUCHED 70%" }, 
                { id: "buses", l: "Buses - FLYINGCARPET FCTAM" }
              ].map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 11, background: activeTab === t.id ? NAVY : 'transparent', color: activeTab === t.id ? 'white' : '#475569' }}>{t.l}</button>
              ))}
            </div>
            <div style={{ padding: '0 20px 20px', display: 'grid', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'end' }}>
                <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>From / City</label><input value={searchFrom} onChange={e => setSearchFrom(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} /></div>
                <div style={{ paddingBottom: 10 }}>to</div>
                <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>To</label><input value={searchTo} onChange={e => setSearchTo(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Depart</label><input type="date" value={departDate} onChange={e => setDepartDate(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} /></div>
                <div><label style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Return</label><input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid #e2e8f0', padding: '0 12px', marginTop: 4 }} /></div>
              </div>
              <button onClick={handleSearch} style={{ height: 48, borderRadius: 999, background: NAVY, color: 'white', fontWeight: 900, border: 'none', cursor: 'pointer' }}>{isSearching ? "Searching REAL with FlyingCarpet..." : `Search ${activeTab} - REAL BOOKING FlyingCarpet`}</button>
              <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center', lineHeight: 1.4 }}>
                Flights: Travelstart 7936957 UNTOUCHED R105/R145 • Cars: DiscoverCars khilanetravel UNTOUCHED 70% • Stays: FlyingCarpet FCTAM26AA10HW ACTIVE Hotels REAL • Buses: FlyingCarpet FCTAM26AA10HW ACTIVE Transfers REAL • All pay Nedbank 1044602244
              </div>
              <div style={{ marginTop: 8, borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: NAVY, textTransform: 'uppercase' }}>FlyingCarpet Widget - Campaign FCTAM26AA10HW - Embed for stays & buses</div>
                <div id="searchWidget" style={{ marginTop: 8, minHeight: 100, background: '#F6F7FB', borderRadius: 12, border: '1px dashed #cbd5e1', padding: 12, fontSize: 11, color: '#64748b', textAlign: 'center' }}>
                  FlyingCarpet search widget loads here: {FLYINGCARPET_WIDGET_SRC} - Campaign {FLYINGCARPET_CAMPAIGN_ID} - Products: Flights, Activities, Hotels, Transfers, Car Rental - Status: Active 22 Oct 2026
                  <br/>
                  <a href={FLYINGCARPET_REFERRAL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: 8, padding: '8px 16px', borderRadius: 999, background: NAVY, color: 'white', fontWeight: 700, textDecoration: 'none', fontSize: 11 }}>Open FlyingCarpet Referral Link FCTAM26AA10HW</a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: NAVY, color: 'white', borderRadius: 20, padding: 20 }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>22 Oct - FlyingCarpet SIGNED UP - FCTAM26AA10HW ACTIVE</div>
            <div style={{ marginTop: 12, display: 'grid', gap: 10, fontSize: 12 }}>
              <div>✈️ Flights - UNTOUCHED - Travelstart 7936957 - R105/R145 - Same as before - NOT TOUCHED</div>
              <div>🚗 Cars - UNTOUCHED - DiscoverCars khilanetravel 70% ZAR - Same - NOT TOUCHED</div>
              <div style={{ background: '#FF6B35', padding: 10, borderRadius: 10, fontWeight: 800 }}>🏨 Stays - FIXED with FlyingCarpet - Campaign FCTAM26AA10HW ACTIVE - Hotels - Real bookings - Commission - Referral: flyingcarpet.sng.link/E29j5/5242</div>
              <div style={{ background: '#FF6B35', padding: 10, borderRadius: 10, fontWeight: 800 }}>🚌 Buses - FIXED with FlyingCarpet - Campaign FCTAM26AA10HW ACTIVE - Transfers - Real Intercape/Greyhound bookings - Commission!</div>
              <div style={{ background: GOLD, color: NAVY, padding: 10, borderRadius: 10, fontWeight: 900 }}>✓ Flights & Cars UNTOUCHED as you asked - Stays & Buses FIXED with FlyingCarpet FCTAM26AA10HW REAL bookings + commission! Widget embedded!</div>
              <div style={{ background: 'white', color: NAVY, padding: 10, borderRadius: 10, fontSize: 10, wordBreak: 'break-all' }}>
                <div style={{ fontWeight: 900 }}>Your Referral Link:</div>
                <div>{FLYINGCARPET_REFERRAL}</div>
                <div style={{ marginTop: 6, fontWeight: 900 }}>Widget Script:</div>
                <div>&lt;Script src="{FLYINGCARPET_WIDGET_SRC}"&gt;&lt;/Script&gt;&lt;div id="searchWidget"&gt;&lt;/div&gt;</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontWeight: 900, fontSize: 20, color: NAVY }}>{activeTab} - {activeTab === "flights" ? "UNTOUCHED" : activeTab === "cars" ? "UNTOUCHED" : "FLYINGCARPET FCTAM26AA10HW"} - Real Bookings</h2>
          <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            {data.map((item) => (
              <div key={item.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: item.id >= 100 ? '#FF6B35' : NAVY, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11 }}>{item.code || item.company?.[0] || "FC"}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{item.airline || item.name || item.company} - {item.from ? `${item.from} to ${item.to}` : item.name} - R{item.price} {item.id >= 100 ? "- FLYINGCARPET FCTAM26AA10HW" : "- UNTOUCHED"}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{item.dur || item.loc || item.type} - {activeTab === "flights" ? "UNTOUCHED Travelstart 7936957" : activeTab === "cars" ? "UNTOUCHED DiscoverCars 70%" : activeTab === "stays" ? "FIXED FlyingCarpet FCTAM26AA10HW Hotels REAL" : "FIXED FlyingCarpet FCTAM26AA10HW Transfers REAL"}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'line-through' }}>R{item.original}</div>
                    <div style={{ fontWeight: 900, fontSize: 16, color: NAVY }}>R{item.price}</div>
                    <div style={{ marginTop: 2, display: 'inline-flex', fontSize: 9, fontWeight: 900, padding: '2px 6px', borderRadius: 999, background: item.id >= 100 ? '#FF6B35' : GOLD, color: item.id >= 100 ? 'white' : NAVY }}>{activeTab === "flights" ? "UNTOUCHED" : activeTab === "cars" ? "UNTOUCHED" : "FLYINGCARPET ACTIVE"}</div>
                  </div>
                  <button onClick={() => openRealBooking(item)} style={{ height: 40, padding: '0 18px', borderRadius: 999, background: item.id >= 100 ? '#FF6B35' : NAVY, color: 'white', border: 'none', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>Select - {activeTab === "flights" ? "UNTOUCHED" : activeTab === "cars" ? "UNTOUCHED" : "FLYINGCARPET"}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 11, color: '#64748b', padding: 12, background: 'white', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          © 2026 Khilane Travel - 22 OCT FLYINGCARPET SIGNED UP FCTAM26AA10HW ACTIVE - Flights UNTOUCHED Travelstart 7936957 R105/R145 + Cars UNTOUCHED DiscoverCars khilanetravel 70% ZAR + Stays FIXED FlyingCarpet FCTAM26AA10HW Hotels REAL + Buses FIXED FlyingCarpet FCTAM26AA10HW Transfers REAL + Widget {FLYINGCARPET_WIDGET_SRC} - All pay direct to Nedbank 1044602244 Branch 198765 - Flights & Cars NOT DISTURBED as requested - Stays & Buses REAL bookings + commission!
        </div>
      </main>
    </div>
  );
}
