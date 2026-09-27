import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

let bookings = [];
let ledger = [];

// Price Beat Logic
function calculatePrice(competitorPrice, supplierCost){
  const beatPrice = competitorPrice - 50;
  const minPrice = supplierCost * 1.12;
  return Math.max(beatPrice, minPrice);
}

// POST /api/bookings - Front-end calls this
app.post('/api/bookings', (req,res)=>{
  const { type, route, amount, competitorPrice, supplierCost, travelers, idType, gateway } = req.body;
  const ourPrice = calculatePrice(competitorPrice || amount+50, supplierCost || amount/1.12);
  const gatewayFee = gateway==='paystack'? ourPrice*0.029+1 : gateway==='payfast'? ourPrice*0.035+2 : gateway==='ozow'? ourPrice*0.015 : 0;
  const booking = {
    id: `BK-${Date.now()}`,
    ref: `BK-2026-${Math.floor(1000+Math.random()*9000)}`,
    type, route, travelers, idType, gateway,
    competitorPrice, ourPrice, gatewayFee, total: ourPrice+gatewayFee,
    status: 'PAID',
    createdAt: new Date().toISOString()
  };
  bookings.unshift(booking);
  // Auto ledger post 4 entries
  const ledgerEntries = [
    { account: '4000', name: 'Income Travel Sales', debit:0, credit: booking.ourPrice, ref: booking.ref },
    { account: '5000', name: 'Supplier Cost', debit: supplierCost||booking.ourPrice/1.12, credit:0, ref: booking.ref },
    { account: '5010', name: 'Gateway Fees', debit: gatewayFee, credit:0, ref: booking.ref },
    { account: '1000', name: 'Bank FNB', debit: booking.ourPrice-gatewayFee, credit:0, ref: booking.ref }
  ];
  ledger.push(...ledgerEntries.map(e=>({...e, date: new Date().toISOString()})));
  console.log(`Booked ${booking.ref} → Posted to Ledger`);
  res.json({ booking, ledgerEntries });
});

app.get('/api/bookings', (req,res)=> res.json(bookings));
app.get('/api/ledger', (req,res)=> res.json(ledger));
app.get('/api/health', (req,res)=> res.json({ status:'ok', bookings: bookings.length }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`Khilane API running on :${PORT}`));
