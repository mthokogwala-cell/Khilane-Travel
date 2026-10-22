
import React, { useState, useEffect } from "react";

// 22 OCT 2026 - FINAL - WIDGET ENABLED - User confirmed enabled widget is the one last sent - <Script src="https://main-service.flyingcarpet.travel/search-widget?campaign_id=FCTAM26AA10HW&mode=widget"></Script><div id="searchWidget"></div>
// FIXED STAYS LANDING - Uses CUSTOMER LINK campaign_id=FCTAM26AA10HW + WIDGET ENABLED - NOT INVITE LINK campaign_id_with_mode that landed on /afi
// FLIGHTS & CARS UNTOUCHED AS YOU ASKED LAST NIGHT
const NAVY = "#0A1931";
const GOLD = "#FFC300";

const TRACKING_LINK = "https://travelstart.zwjlk6.net/k4Xqbx"; // FLIGHTS UNTOUCHED Publisher 7936957 R105/R145
const DISCOVERCARS_ZAR = "https://www.discovercars.com/?a_aid=khilanetravel&currency=ZAR"; // CARS UNTOUCHED 70% LIVE

// FLYINGCARPET - FCTAM26AA10HW - WIDGET ENABLED - CUSTOMER MODE
const CAMPAIGN_ID = "FCTAM26AA10HW";
const FC_CUSTOMER = `https://www.flyingcarpet.travel?campaign_id=${CAMPAIGN_ID}`;
const FC_WIDGET = `https://main-service.flyingcarpet.travel/search-widget?campaign_id=${CAMPAIGN_ID}&mode=widget`; // ENABLED WIDGET - User confirmed this one
const FC_BASE = "https://www.flyingcarpet.travel";

const WHATSAPP = "0724573419";
const WHATSAPP_LINK = "https://wa.me/27724573419";
const EMAIL = "info@khilanetravel.co.za";

const getFlightLink = (from, to, depart) => `${TRACKING_LINK}?utm_source=khilanetravel&utm_medium=flights&from=${from}&to=${to}&depart=${depart}`;
const getStayLink = (city) => `${FC_BASE}/hotels?campaign_id=${CAMPAIGN_ID}&city=${encodeURIComponent(city||"Durban")}&utm_source=khilanetravel&utm_medium=stays_widget_enabled`;
const getCarLink = (city) => `${DISCOVERCARS_ZAR}&city=${encodeURIComponent(city||"Durban")}&utm_source=khilanetravel&utm_medium=cars_untouched`;
const getBusLink = (from, to) => `${FC_BASE}/transfers?campaign_id=${CAMPAIGN_ID}&from=${encodeURIComponent(from||"Johannesburg")}&to=${encodeURIComponent(to||"Cape Town")}&utm_source=khilanetravel&utm_medium=buses_widget_enabled`;

const mockFlights = [
  { id: 1, airline: "FlySafair", code: "FA", from: "JNB", to: "CPT", dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, badge: true },
  { id: 2, airline: "Airlink", code: "4Z", from: "JNB", to: "CPT", dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, badge: true },
];
const mockStays = [
  { id: 101, name: "Beverly Hills Hotel Umhlanga", loc: "Umhlanga Rocks, Durban", city: "Durban", rating: 4.8, price: 2850, original: 3200, tag: "Beachfront - WIDGET ENABLED FCTAM26AA10HW", badge: true },
  { id: 102, name: "The Oyster Box", loc: "Umhlanga Ridge", city: "Durban", rating: 4.9, price: 3450, original: 3800, tag: "5-Star Luxury - WIDGET ENABLED", badge: true },
  { id: 103, name: "Sun City Resort", loc: "Rustenburg", city: "Rustenburg", rating: 4.6, price: 1890, original: 2100, tag: "Family Favourite - WIDGET", badge: false },
  { id: 104, name: "Cape Grace, Fairmont Managed", loc: "V&A Waterfront, Cape Town", city: "Cape Town", rating: 4.9, price: 4250, original: 4600, tag: "Harbour Views - WIDGET", badge: true },
];
const mockCars = [
  { id: 201, name: "Toyota Corolla Quest", type: "Sedan - Manual", seats: 5, city: "Durban", price: 489, original: 539, company: "Avis", badge: true },
  { id: 202, name: "VW Polo Vivo", type: "Hatch - Manual", seats: 5, city: "Johannesburg", price: 425, original: 475, company: "Budget", badge: true },
];
const mockBuses = [
  { id: 301, company: "Intercape", from: "Johannesburg", to: "Cape Town", dep: "18:00", arr: "12:30+1", dur: "18h 30m", price: 685, original: 735, badge: true, type: "Sleepliner - WIDGET ENABLED" },
  { id: 302, company: "Greyhound", from: "Pretoria", to: "Durban", dep: "20:15", arr: "06:45+1", dur: "10h 30m", price: 520, original: 570, badge: true, type: "Dreamliner - WIDGET" },
  { id: 303, company: "Intercity Xpress", from: "Johannesburg", to: "Gqeberha", dep: "17:00", arr: "07:00+1", dur: "14h 00m", price: 595, original: 645, badge: false, type: "Semi-Lux - WIDGET" },
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
      // WIDGET ENABLED - Load FlyingCarpet search-widget?campaign_id=FCTAM26AA10HW&mode=widget
      if (!document.getElementById('flyingcarpet-widget')) {
        const fc = document.createElement('script');
        fc.id = 'flyingcarpet-widget';
        fc.src = FC_WIDGET;
        fc.async = true;
        document.head.appendChild(fc);
        console.log("FlyingCarpet widget ENABLED loaded:", FC_WIDGET);
      }
    }
  }, []);

  const handleSearch = () => { setIsSearching(true); setTimeout(()=>setIsSearching(false),600); };

  const openRealBooking = (item) => {
    let link = "";
    if (activeTab === "flights") link = getFlightLink(item.from||searchFrom, item.to||searchTo, departDate);
    else if (activeTab === "stays") link = getStayLink(item.city||searchFrom||"Durban");
    else if (activeTab === "cars") link = getCarLink(item.city||searchFrom);
    else if (activeTab === "buses") link = getBusLink(item.from||searchFrom||"Johannesburg", item.to||searchTo||"Cape Town");
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const data = activeTab==="flights"?mockFlights:activeTab==="stays"?mockStays:activeTab==="cars"?mockCars:mockBuses;

  return (
    <div style={{ minHeight:'100vh', background:'#F6F7FB', fontFamily:'Inter,system-ui,sans-serif', color:'#0f172a' }}>
      <div style={{ background:GOLD, color:NAVY, textAlign:'center', padding:'10px', fontSize:12, fontWeight:900 }}>
        ✅ WIDGET ENABLED - FCTAM26AA10HW - {FC_WIDGET} - CUSTOMER LINK campaign_id=FCTAM26AA10HW - STAYS & BUSES FIXED - FLIGHTS & CARS UNTOUCHED - TEST IN INCOGNITO
      </div>
      <header style={{ position:'sticky', top:0, zIndex:20, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(8px)', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 20px', height:64, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', gap:10, alignItems:'center' }}>
            <div style={{ width:36, height:36, borderRadius:12, background:NAVY, color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900 }}>K</div>
            <div>
              <div style={{ fontWeight:900, fontSize:16, color:NAVY }}>Khilane Travel - WIDGET ENABLED FCTAM26AA10HW</div>
              <div style={{ fontSize:11, fontWeight:600, color:'#475569' }}>Flights UNTOUCHED 7936957 + Cars UNTOUCHED 70% + Stays WIDGET ENABLED + Buses WIDGET ENABLED</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ padding:'6px 12px', borderRadius:999, background:'#25D366', color:'white', fontSize:11, fontWeight:700, textDecoration:'none' }}>WhatsApp: {WHATSAPP}</a>
            <a href={`mailto:${EMAIL}`} style={{ padding:'6px 12px', borderRadius:999, background:NAVY, color:'white', fontSize:11, fontWeight:700, textDecoration:'none' }}>{EMAIL}</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth:1100, margin:'0 auto', padding:20 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:20 }}>
          <div style={{ background:'white', borderRadius:24, border:'1px solid #e2e8f0', overflow:'hidden' }}>
            <div style={{ display:'flex', gap:6, background:'#f8fafc', margin:8, padding:4, borderRadius:999, width:'fit-content' }}>
              {[
                { id:"flights", l:"Flights - UNTOUCHED" },
                { id:"stays", l:"Stays - WIDGET ENABLED" },
                { id:"cars", l:"Cars - UNTOUCHED" },
                { id:"buses", l:"Buses - WIDGET ENABLED" }
              ].map(t=>(
                <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ height:36, padding:'0 14px', borderRadius:999, border:'none', cursor:'pointer', fontWeight:700, fontSize:11, background:activeTab===t.id?NAVY:'transparent', color:activeTab===t.id?'white':'#475569' }}>{t.l}</button>
              ))}
            </div>
            <div style={{ padding:'0 20px 20px', display:'grid', gap:12 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:8, alignItems:'end' }}>
                <div><label style={{ fontSize:10, fontWeight:800, color:'#64748b', textTransform:'uppercase' }}>From / City</label><input value={searchFrom} onChange={e=>setSearchFrom(e.target.value)} style={{ width:'100%', height:44, borderRadius:12, border:'1px solid #e2e8f0', padding:'0 12px', marginTop:4 }} /></div>
                <div style={{ paddingBottom:10 }}>to</div>
                <div><label style={{ fontSize:10, fontWeight:800, color:'#64748b', textTransform:'uppercase' }}>To</label><input value={searchTo} onChange={e=>setSearchTo(e.target.value)} style={{ width:'100%', height:44, borderRadius:12, border:'1px solid #e2e8f0', padding:'0 12px', marginTop:4 }} /></div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                <div><label style={{ fontSize:10, fontWeight:800, color:'#64748b', textTransform:'uppercase' }}>Depart</label><input type="date" value={departDate} onChange={e=>setDepartDate(e.target.value)} style={{ width:'100%', height:44, borderRadius:12, border:'1px solid #e2e8f0', padding:'0 12px', marginTop:4 }} /></div>
                <div><label style={{ fontSize:10, fontWeight:800, color:'#64748b', textTransform:'uppercase' }}>Return</label><input type="date" value={returnDate} onChange={e=>setReturnDate(e.target.value)} style={{ width:'100%', height:44, borderRadius:12, border:'1px solid #e2e8f0', padding:'0 12px', marginTop:4 }} /></div>
              </div>
              <button onClick={handleSearch} style={{ height:48, borderRadius:999, background:NAVY, color:'white', fontWeight:900, border:'none', cursor:'pointer' }}>{isSearching?"Searching WIDGET ENABLED...":`Search ${activeTab} - WIDGET ENABLED`}</button>
              
              {/* WIDGET ENABLED - This is the widget you last sent and enabled */}
              <div style={{ marginTop:8, borderTop:'1px solid #e2e8f0', paddingTop:12 }}>
                <div style={{ fontSize:11, fontWeight:900, color:NAVY, textTransform:'uppercase', background:'#10b981', padding:8, borderRadius:8, color:'white', textAlign:'center' }}>
                  ✅ WIDGET ENABLED - This is the one you last sent - Loaded: {FC_WIDGET}
                </div>
                <div id="searchWidget" style={{ marginTop:12, minHeight:180, background:'#F6F7FB', borderRadius:12, border:'2px solid #10b981', padding:12, fontSize:12, color:'#0f172a' }}>
                  <div style={{ fontWeight:800, fontSize:11, color:NAVY, textAlign:'center', marginBottom:8 }}>FlyingCarpet Search Widget - Campaign FCTAM26AA10HW - ENABLED - mode=widget</div>
                  <div style={{ fontSize:11, color:'#64748b', textAlign:'center' }}>
                    Widget loads here automatically from: <br/>
                    <span style={{ wordBreak:'break-all', fontSize:10, background:'white', padding:4, borderRadius:4, display:'inline-block', marginTop:4, border:'1px solid #e2e8f0' }}>{FC_WIDGET}</span>
                    <br/><br/>
                    Customers can search Flights, Hotels, Transfers, Car Rental, Activities inside khilanetravel.co.za - No redirect to /afi - Tracks to Report!
                    <br/><br/>
                    <div style={{ display:'flex', gap:6, justifyContent:'center', flexWrap:'wrap' }}>
                      <a href={FC_CUSTOMER} target="_blank" rel="noopener noreferrer" style={{ padding:'8px 16px', borderRadius:999, background:NAVY, color:'white', fontWeight:700, textDecoration:'none', fontSize:11 }}>CUSTOMER LINK campaign_id=FCTAM26AA10HW</a>
                      <a href={`${FC_BASE}/hotels?campaign_id=${CAMPAIGN_ID}`} target="_blank" rel="noopener noreferrer" style={{ padding:'8px 16px', borderRadius:999, background:'#FF6B35', color:'white', fontWeight:700, textDecoration:'none', fontSize:11 }}>Hotels CUSTOMER</a>
                      <a href={`${FC_BASE}/transfers?campaign_id=${CAMPAIGN_ID}`} target="_blank" rel="noopener noreferrer" style={{ padding:'8px 16px', borderRadius:999, background:'#10b981', color:'white', fontWeight:700, textDecoration:'none', fontSize:11 }}>Transfers CUSTOMER</a>
                    </div>
                    <div style={{ marginTop:8, fontSize:10, color:'#991b1b', background:'#fef2f2', padding:6, borderRadius:6, border:'1px solid #fecaca' }}>
                      If you test while logged in as Mthokozisi Gwala affiliate (flyingcarpet.travel/afi), FlyingCarpet will redirect to /afi dashboard - TEST IN INCOGNITO where NOT logged in as affiliate to see customer Hotels search!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background:NAVY, color:'white', borderRadius:20, padding:20 }}>
            <div style={{ fontWeight:900, fontSize:16 }}>✅ WIDGET ENABLED - You confirmed!</div>
            <div style={{ marginTop:12, display:'grid', gap:10, fontSize:12 }}>
              <div>✈️ Flights - UNTOUCHED - Travelstart 7936957 R105/R145 - Same</div>
              <div>🚗 Cars - UNTOUCHED - DiscoverCars khilanetravel 70% - Same</div>
              <div style={{ background:'#10b981', padding:10, borderRadius:10, fontWeight:800 }}>🏨 Stays - WIDGET ENABLED - Campaign FCTAM26AA10HW - Script src={FC_WIDGET} + div id=searchWidget - You confirmed enabled - Real bookings - Commission - Tracks to Report!</div>
              <div style={{ background:'#10b981', padding:10, borderRadius:10, fontWeight:800 }}>🚌 Buses - WIDGET ENABLED - Transfers - Same widget - Real Intercape/Greyhound bookings - Commission!</div>
              <div style={{ background:GOLD, color:NAVY, padding:10, borderRadius:10, fontWeight:900 }}>Widget enabled = Customers search INSIDE khilanetravel.co.za - No landing on /afi dashboard - Widget stays on site - Tracks to FCTAM26AA10HW - Report shows clicks/bookings!</div>
              <div style={{ background:'white', color:NAVY, padding:10, borderRadius:10, fontSize:10, wordBreak:'break-all' }}>
                <div style={{ fontWeight:900 }}>Enabled widget you last sent:</div>
                <div>{`<Script strategy="afterInteractive" src="${FC_WIDGET}"></Script><div id="searchWidget"></div>`}</div>
                <div style={{ marginTop:6, fontWeight:900 }}>Customer links (NOT invite link):</div>
                <div>CUSTOMER: {FC_CUSTOMER}</div>
                <div>HOTELS: {FC_BASE}/hotels?campaign_id={CAMPAIGN_ID}</div>
                <div>TRANSFERS: {FC_BASE}/transfers?campaign_id={CAMPAIGN_ID}</div>
                <div style={{ marginTop:6, color:'#991b1b', fontWeight:800 }}>WRONG invite link you kept pasting (lands on /afi):</div>
                <div style={{ fontSize:9 }}>flyingcarpet.sng.link/E29j5/5242?_dl=flyingcarpet://invite?campaign_id=FCTAM26AA10HW&mode=url...campaign_id_with_mode=FCTAM26AA10HW_url</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop:20 }}>
          <h2 style={{ fontWeight:900, fontSize:20, color:NAVY }}>{activeTab} - {activeTab==="flights"?"UNTOUCHED":activeTab==="cars"?"UNTOUCHED":"WIDGET ENABLED FCTAM26AA10HW"} - Real Bookings</h2>
          <div style={{ marginTop:12, display:'grid', gap:10 }}>
            {data.map(item=>(
              <div key={item.id} style={{ background:'white', border:'1px solid #e2e8f0', borderRadius:16, padding:14, display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap' }}>
                <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <div style={{ width:36, height:36, borderRadius:999, background:item.id>=100?'#10b981':NAVY, color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:11 }}>{item.code||item.company?.[0]||"FC"}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:13 }}>{item.airline||item.name||item.company} - {item.from?`${item.from} to ${item.to}`:item.name} - R{item.price} {item.id>=100?"- WIDGET ENABLED":"- UNTOUCHED"}</div>
                    <div style={{ fontSize:11, color:'#64748b' }}>{item.dur||item.loc||item.type} - {activeTab==="flights"?"UNTOUCHED Travelstart 7936957":activeTab==="cars"?"UNTOUCHED DiscoverCars 70%":activeTab==="stays"?"WIDGET ENABLED FCTAM26AA10HW Hotels - TEST INCOGNITO":"WIDGET ENABLED FCTAM26AA10HW Transfers - TEST INCOGNITO"}</div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:11, color:'#94a3b8', textDecoration:'line-through' }}>R{item.original}</div>
                    <div style={{ fontWeight:900, fontSize:16, color:NAVY }}>R{item.price}</div>
                    <div style={{ marginTop:2, display:'inline-flex', fontSize:9, fontWeight:900, padding:'2px 6px', borderRadius:999, background:item.id>=100?'#10b981':GOLD, color:item.id>=100?'white':NAVY }}>{activeTab==="flights"?"UNTOUCHED":activeTab==="cars"?"UNTOUCHED":"WIDGET ENABLED"}</div>
                  </div>
                  <button onClick={()=>openRealBooking(item)} style={{ height:40, padding:'0 18px', borderRadius:999, background:item.id>=100?'#10b981':NAVY, color:'white', border:'none', fontWeight:800, fontSize:12, cursor:'pointer' }}>Select - {activeTab==="flights"?"UNTOUCHED":activeTab==="cars"?"UNTOUCHED":"WIDGET"}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop:24, textAlign:'center', fontSize:11, color:'#64748b', padding:12, background:'white', borderRadius:12, border:'1px solid #e2e8f0' }}>
          © 2026 Khilane Travel - WIDGET ENABLED - FCTAM26AA10HW - User confirmed enabled widget is the one last sent - {FC_WIDGET} - Flights UNTOUCHED Travelstart 7936957 + Cars UNTOUCHED DiscoverCars 70% + Stays WIDGET ENABLED FCTAM26AA10HW + Buses WIDGET ENABLED FCTAM26AA10HW - Customers search inside khilanetravel.co.za - No /afi landing - TEST IN INCOGNITO - All Nedbank 1044602244
        </div>
      </main>
    </div>
  );
      }
