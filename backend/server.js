/**
 * Khilane Travel Backend v2.4 — On-Site Booking Only — No kiwi.com redirect
 * Bank: Nedbank MG. Gwala 1044602244 Branch 198765 CA
 * All bookings completed on khilanetravel.co.za
 */

const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: ['https://khilanetravel.co.za', 'https://www.khilanetravel.co.za', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// In-memory store (replace with Supabase/Postgres later)
const bookings = [];
const EFT_DETAILS = {
  bank: "Nedbank",
  holder: "MG. Gwala",
  account: "1044602244",
  branch: "198765",
  type: "Current Account (CA)",
  swift: "NEDSZAJJ"
};

// Health
app.get('/', (req, res) => {
  res.json({ 
    status: "Khilane Travel API Live v2.4",
    message: "ZAR Live • R50 Beat • On-Site Booking • No Kiwi",
    bank: EFT_DETAILS,
    domain: "khilanetravel.co.za",
    noRedirect: true,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, version: "2.4", zar: true, kiwiRedirect: false, bank: EFT_DETAILS });
});

// ===== SEARCH ENDPOINTS - ALL ZAR, NO EXTERNAL REDIRECT =====

// Flights - returns ZAR prices with R50 beat, stays on your site
app.post('/api/search/flights', (req, res) => {
  const { from = "JNB", to = "CPT", departDate = "2026-10-15", passengers = 1 } = req.body;
  
  // Mock ZAR data - NO kiwi.com call, NO redirect URL
  const results = [
    { id: 1, airline: "FlySafair", code: "FA", from, to, dep: "06:15", arr: "08:25", dur: "2h 10m", stops: "Direct", price: 864, original: 914, currency: "ZAR", beat: 50, seats: 3, onSite: true },
    { id: 2, airline: "Airlink", code: "4Z", from, to, dep: "08:40", arr: "10:55", dur: "2h 15m", stops: "Direct", price: 902, original: 952, currency: "ZAR", beat: 50, seats: 5, onSite: true },
    { id: 3, airline: "CemAir", code: "5Z", from, to, dep: "11:10", arr: "13:30", dur: "2h 20m", stops: "Direct", price: 945, original: 995, currency: "ZAR", beat: 50, seats: 2, onSite: true },
    { id: 4, airline: "LIFT", code: "GE", from, to, dep: "14:05", arr: "16:20", dur: "2h 15m", stops: "Direct", price: 989, original: 1039, currency: "ZAR", beat: 50, seats: 6, onSite: true },
  ];

  res.json({
    success: true,
    query: { from, to, departDate, passengers },
    results,
    note: "All bookings completed on khilanetravel.co.za — No kiwi.com redirect — ZAR only",
    bank: EFT_DETAILS
  });
});

// Stays - real hotels, not flights
app.post('/api/search/stays', (req, res) => {
  const { destination = "Umhlanga", checkin, checkout, guests = 2 } = req.body;
  const results = [
    { id: 101, name: "Beverly Hills Hotel Umhlanga", location: "Umhlanga Rocks, Durban", rating: 4.8, price: 2850, original: 3200, per: "night", currency: "ZAR", tag: "Beachfront", beat: 50, onSite: true },
    { id: 102, name: "The Oyster Box", location: "Umhlanga Ridge", rating: 4.9, price: 3450, original: 3800, per: "night", currency: "ZAR", tag: "5-Star", beat: 50, onSite: true },
    { id: 103, name: "Sun City Resort", location: "Rustenburg", rating: 4.6, price: 1890, original: 2100, per: "night", currency: "ZAR", tag: "Family", beat: 50, onSite: true },
  ];
  res.json({ success: true, destination, results, note: "Stay bookings on khilanetravel.co.za — No external site", bank: EFT_DETAILS });
});

// Cars
app.post('/api/search/cars', (req, res) => {
  const results = [
    { id: 201, company: "Avis", name: "Toyota Corolla Quest", type: "Sedan Manual", price: 489, original: 539, per: "day", currency: "ZAR", beat: 50, onSite: true },
    { id: 202, company: "Budget", name: "VW Polo Vivo", type: "Hatch Manual", price: 425, original: 475, per: "day", currency: "ZAR", beat: 50, onSite: true },
    { id: 203, company: "Hertz", name: "Toyota Fortuner", type: "SUV Auto", price: 1150, original: 1220, per: "day", currency: "ZAR", beat: 50, onSite: true },
  ];
  res.json({ success: true, results, bank: EFT_DETAILS });
});

// Buses
app.post('/api/search/buses', (req, res) => {
  const results = [
    { id: 301, company: "Intercape", from: "JNB", to: "CPT", dep: "18:00", arr: "12:30+1", price: 685, original: 735, currency: "ZAR", type: "Sleepliner", beat: 50, onSite: true },
    { id: 302, company: "Greyhound", from: "Pretoria", to: "Durban", dep: "20:15", arr: "06:45+1", price: 520, original: 570, currency: "ZAR", type: "Dreamliner", beat: 50, onSite: true },
  ];
  res.json({ success: true, results, bank: EFT_DETAILS });
});

// ===== BOOKING ENDPOINT — ON-SITE ONLY =====

app.post('/api/bookings', (req, res) => {
  const { 
    item, // flight/hotel/car/bus selected
    traveller, // { firstName, lastName, idNumber OR passportNum, nationality, email, phone, docType }
    paymentMethod = "nedbank", // nedbank | paystack | payfast | ozow | capitec
    amount,
    tab = "flights"
  } = req.body;

  if (!item || !traveller || !traveller.email) {
    return res.status(400).json({ success: false, error: "Missing item or traveller details" });
  }

  // Generate booking ref
  const ref = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const booking = {
    ref,
    tab,
    item,
    traveller,
    paymentMethod,
    amount: amount || item.price,
    currency: "ZAR",
    status: paymentMethod === "nedbank" ? "PENDING_EFT" : "PENDING_CARD",
    bank: EFT_DETAILS,
    createdAt: new Date().toISOString(),
    onSite: true,
    kiwiRedirect: false,
    instructions: paymentMethod === "nedbank" 
      ? `Pay R${amount || item.price} to Nedbank ${EFT_DETAILS.holder} ${EFT_DETAILS.account} Branch ${EFT_DETAILS.branch} Ref: ${ref}`
      : `Card payment of R${amount || item.price} processed on khilanetravel.co.za via ${paymentMethod}`
  };

  bookings.push(booking);

  console.log(`[BOOKING] ${ref} | ${tab} | R${booking.amount} | ${paymentMethod} | ${traveller.email} | ON-SITE NO KIWI`);

  res.json({
    success: true,
    booking,
    message: paymentMethod === "nedbank"
      ? `Booking ${ref} created. Please EFT R${booking.amount} to Nedbank MG. Gwala 1044602244 Branch 198765 CA with ref ${ref}. Ticket issued on khilanetravel.co.za within 15 min.`
      : `Booking ${ref} confirmed. R${booking.amount} paid via ${paymentMethod} on khilanetravel.co.za. E-ticket sent to ${traveller.email}. No kiwi.com.`,
    nextSteps: [
      `Booking ref: ${ref}`,
      `All management on khilanetravel.co.za / My Trips — No kiwi.com login`,
      `Support: WhatsApp via khilanetravel.co.za`,
      `EFT Bank: Nedbank ${EFT_DETAILS.holder} ${EFT_DETAILS.account} Branch ${EFT_DETAILS.branch}`
    ]
  });
});

// List bookings (admin)
app.get('/api/bookings', (req, res) => {
  res.json({ success: true, count: bookings.length, bookings, bank: EFT_DETAILS, note: "All bookings on-site, no kiwi.com" });
});

// Get single booking
app.get('/api/bookings/:ref', (req, res) => {
  const booking = bookings.find(b => b.ref === req.params.ref);
  if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
  res.json({ success: true, booking });
});

// EFT proof upload (mock)
app.post('/api/payments/eft-proof', (req, res) => {
  const { ref, proofUrl } = req.body;
  const booking = bookings.find(b => b.ref === ref);
  if (!booking) return res.status(404).json({ success: false, error: "Booking ref not found" });
  
  booking.status = "PAID_EFT";
  booking.proofUrl = proofUrl;
  booking.paidAt = new Date().toISOString();

  res.json({ 
    success: true, 
    message: `EFT proof received for ${ref}. Ticket will be issued in 15 min on khilanetravel.co.za to ${booking.traveller.email}`,
    booking 
  });
});

// Commission / Bank Balance (where your profit stays)
app.get('/api/admin/balance', (req, res) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const estimatedSupplierCost = Math.round(totalRevenue * 0.78); // example 78% supplier cost
  const gatewayFees = Math.round(totalRevenue * 0.03);
  const profit = totalRevenue - estimatedSupplierCost - gatewayFees;

  res.json({
    bank: EFT_DETAILS,
    stats: {
      totalBookings: bookings.length,
      totalRevenue: `R${totalRevenue}`,
      supplierCost: `R${estimatedSupplierCost}`,
      gatewayFees: `R${gatewayFees}`,
      yourCommission_Profit: `R${profit}`, // This stays in your Nedbank
      settlementAccount: `${EFT_DETAILS.bank} ${EFT_DETAILS.account} Branch ${EFT_DETAILS.branch}`
    },
    message: "Commission = Revenue - Supplier - Fees. All settles to your Nedbank 1044602244. No FNB."
  });
});

app.listen(PORT, () => {
  console.log(`✅ Khilane Travel API v2.4 running on port ${PORT}`);
  console.log(`✅ Bank: Nedbank MG. Gwala 1044602244 Branch 198765 CA`);
  console.log(`✅ Mode: On-Site Booking Only — No kiwi.com redirect`);
  console.log(`✅ Domain: khilanetravel.co.za • ZAR Live • R50 Beat`);
});
