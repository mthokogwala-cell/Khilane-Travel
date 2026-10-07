
import { useState, useEffect } from 'react';

// ===== YOUR REAL AFFILIATE LINKS (from your screenshots) =====
const AFFILIATE = {
  MARKER: '582539',
  // From your screenshots - all LIVE!
  AVIASALES: 'https://aviasales.tpm.li/VEgNTCDq', // Flights
  TRIPCOM: 'https://tpm.li/wmATAoyL', // Flights + Hotels - main
  LOCALRENT: 'https://localrent.tpm.li/mchV5bRb', // Car rentals
  KIWITAXI: 'https://kiwitaxi.tpm.li/SWTYWJD3', // Airport transfers
  YESIM: 'https://yesim.tpm.li/3dLRV8Ha', // eSIM
  KLOOK: 'https://klook.tpm.li/IsLqe3G6', // Activities
  WEGOTRIP: 'https://wegotrip.tpm.li/yps5iBGG', // Tours
  // Booking.com will be auto when approved, fallback to Hotellook for now
  HOTELLOOK: 'https://search.hotellook.com/hotels?marker=582539&language=en',
};

function App() {
  const [tab, setTab] = useState('stays');
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  // Track clicks for Travelpayouts
  const handleAffiliateClick = (type, url) => {
    console.log(`Affiliate click: ${type} -> ${url}`);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Khilane Travel</h1>
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">EARNING MODE: 582539</span>
      </header>

      {/* Navigation */}
      <div className="flex gap-2 p-4 justify-center flex-wrap">
        {['stays','flights','cars','activities','esim'].map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-6 py-2 rounded-full font-medium capitalize ${tab===t?'bg-blue-600 text-white':'bg-white border'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* FLIGHTS */}
      {tab==='flights' && (
        <div className="max-w-5xl mx-auto p-4">
          <h2 className="text-3xl font-bold mb-4">Flights - Earn 1.5% per booking</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-blue-600">
              <h3 className="font-bold text-lg">✈️ Aviasales (Cheap Flights)</h3>
              <p className="text-sm text-gray-600 my-2">Best for domestic SA: JNB-CPT, DUR-JNB, etc. Your link: {AFFILIATE.AVIASALES}</p>
              <button onClick={()=>handleAffiliateClick('aviasales', AFFILIATE.AVIASALES)}
                className="w-full mt-3 bg-blue-600 text-white py-3 rounded-xl font-bold">Search Flights on Aviasales →</button>
              <p className="text-xs text-green-600 mt-2">✅ LIVE - Clicks already tracking for source 582539</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-green-600">
              <h3 className="font-bold text-lg">🌍 Trip.com (International)</h3>
              <p className="text-sm text-gray-600 my-2">Best for international + hotels bundle. Your link: {AFFILIATE.TRIPCOM}</p>
              <button onClick={()=>handleAffiliateClick('tripcom', AFFILIATE.TRIPCOM)}
                className="w-full mt-3 bg-green-600 text-white py-3 rounded-xl font-bold">Search on Trip.com →</button>
              <p className="text-xs text-green-600 mt-2">✅ LIVE</p>
            </div>
          </div>
        </div>
      )}

      {/* STAYS */}
      {tab==='stays' && (
        <div className="max-w-5xl mx-auto p-4">
          <h2 className="text-3xl font-bold mb-2">Stays - Earn 5% (Booking.com pending)</h2>
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl mb-4 text-sm">
            ⏳ <b>Booking.com</b> is In review (ID 582539). While waiting, your bookings earn via Hotellook + Trip.com (same hotels!).
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold">🏨 Hotellook (Booking.com inventory)</h3>
              <button onClick={()=>handleAffiliateClick('hotellook', AFFILIATE.HOTELLOOK)}
                className="w-full mt-3 bg-blue-600 text-white py-3 rounded-xl font-bold">Search Hotels (Hotellook) →</button>
              <p className="text-xs text-green-600 mt-2">✅ LIVE - marker 582539</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold">🏨 Trip.com Hotels</h3>
              <button onClick={()=>handleAffiliateClick('tripcom-hotels', AFFILIATE.TRIPCOM)}
                className="w-full mt-3 bg-indigo-600 text-white py-3 rounded-xl font-bold">Search Hotels (Trip.com) →</button>
            </div>
          </div>
        </div>
      )}

      {/* CARS */}
      {tab==='cars' && (
        <div className="max-w-5xl mx-auto p-4">
          <h2 className="text-3xl font-bold mb-4">Cars & Transfers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold">🚗 Localrent - Car Rental</h3>
              <button onClick={()=>handleAffiliateClick('localrent', AFFILIATE.LOCALRENT)}
                className="w-full mt-3 bg-orange-500 text-white py-3 rounded-xl font-bold">Rent a Car →</button>
              <p className="text-xs mt-2">Link: {AFFILIATE.LOCALRENT}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold">🚕 KiwiTaxi - Airport Taxi</h3>
              <button onClick={()=>handleAffiliateClick('kiwitaxi', AFFILIATE.KIWITAXI)}
                className="w-full mt-3 bg-yellow-500 text-black py-3 rounded-xl font-bold">Book Transfer →</button>
              <p className="text-xs mt-2">Link: {AFFILIATE.KIWITAXI}</p>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVITIES */}
      {tab==='activities' && (
        <div className="max-w-5xl mx-auto p-4">
          <h2 className="text-3xl font-bold mb-4">Activities & eSIM</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold">🎢 Klook</h3>
              <button onClick={()=>handleAffiliateClick('klook', AFFILIATE.KLOOK)} className="w-full mt-3 bg-purple-600 text-white py-3 rounded-xl font-bold">Find Activities →</button>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold">🎧 WeGoTrip</h3>
              <button onClick={()=>handleAffiliateClick('wegotrip', AFFILIATE.WEGOTRIP)} className="w-full mt-3 bg-teal-600 text-white py-3 rounded-xl font-bold">Audio Tours →</button>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold">📱 Yesim eSIM</h3>
              <button onClick={()=>handleAffiliateClick('yesim', AFFILIATE.YESIM)} className="w-full mt-3 bg-black text-white py-3 rounded-xl font-bold">Buy eSIM →</button>
            </div>
          </div>
        </div>
      )}

      {tab==='esim' && (
        <div className="max-w-5xl mx-auto p-4">
          <h2 className="text-3xl font-bold mb-4">eSIM - Earn $3 per sale</h2>
          <div className="bg-white p-6 rounded-2xl shadow max-w-md">
            <h3 className="font-bold">📱 Yesim</h3>
            <p className="text-sm my-2">Travelers need data. Earn $3-$10 per eSIM.</p>
            <button onClick={()=>handleAffiliateClick('yesim', AFFILIATE.YESIM)} className="w-full mt-3 bg-black text-white py-3 rounded-xl font-bold">Get eSIM →</button>
            <p className="text-xs mt-2 break-all">{AFFILIATE.YESIM}</p>
          </div>
        </div>
      )}

      <div className="text-center p-8 text-xs text-gray-500">
        Traffic Source: 582539 | Khilanetravel | 7 programs LIVE | Booking.com pending approval<br/>
        Payout: Payoneer → FNB | All links track automatically
      </div>
    </div>
  );
}
export default App;
