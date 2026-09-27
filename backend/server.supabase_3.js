import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// For production, replace in-memory with Supabase client
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

let bookings = [];
let ledger = [];

function calculatePrice(competitor, supplier){
  return Math.max(competitor - 50, supplier * 1.12);
}

app.post('/api/bookings', async (req,res)=>{
  try{
    const { type, route, travelers, idType, contact, competitorPrice, supplierCost, gateway } = req.body;
    const ourPrice = calculatePrice(competitorPrice, supplierCost);
    const fees = { paystack: ourPrice*0.029+1, payfast: ourPrice*0.035+2, ozow: ourPrice*0.015, capitec: ourPrice*0.025+1, eft: 0 };
    const gatewayFee = fees[gateway] || 0;
    const total = ourPrice + gatewayFee;
    const ref = `BK-2026-${Math.floor(1000+Math.random()*9000)}`;
    
    const booking = { ref, type, route, travelers, id_type: idType, contact, competitor_price: competitorPrice, supplier_cost: supplierCost, our_price: ourPrice, gateway_fee: gatewayFee, total, gateway, status:'PAID', created_at: new Date().toISOString() };
    
    // TODO: Insert to Supabase
    // const { data } = await supabase.from('bookings').insert(booking).select().single();
    
    bookings.unshift(booking);
    const entries = [
      { ref, account_code:'4000', account_name:'Income Travel Sales', debit:0, credit:ourPrice, description:`Booking ${ref} - ${type}` },
      { ref, account_code:'5000', account_name:'Supplier Cost', debit:supplierCost, credit:0, description:`Supplier payout ${ref}` },
      { ref, account_code:'5010', account_name:'Gateway Fees', debit:gatewayFee, credit:0, description:`${gateway} fee ${ref}`, gateway },
      { ref, account_code:'1000', account_name:'Bank FNB 6284123456', debit:total-gatewayFee, credit:0, description:`Net bank ${ref}` }
    ];
    ledger.push(...entries);
    // await supabase.from('ledger').insert(entries);
    
    res.json({ success:true, booking, ledgerEntries: entries });
  }catch(e){ res.status(500).json({error:e.message}); }
});

app.get('/api/bookings', (req,res)=> res.json(bookings));
app.get('/api/ledger', (req,res)=> res.json(ledger));
app.get('/api/health', (req,res)=> res.json({ ok:true, count:bookings.length }));

// Webhooks
app.post('/api/webhooks/paystack', (req,res)=>{ console.log('Paystack webhook', req.body); res.sendStatus(200); });
app.post('/api/webhooks/payfast', (req,res)=>{ console.log('PayFast ITN', req.body); res.sendStatus(200); });
app.post('/api/webhooks/ozow', (req,res)=>{ console.log('Ozow webhook', req.body); res.sendStatus(200); });

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`Khilane API live on ${PORT}`));
