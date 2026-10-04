import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PRICE_BEAT = 20;
const API_VERSION = "v2.1 - ZAR Fixed";

app.get('/', (req,res)=> {
  res.json({
    status: "Khilane API Live v2.1 Real OS",
    domain: "khilanetravel.co.za",
    currency: "ZAR",
    symbol: "R",
    priceBeat: "R20 on ALL",
    version: API_VERSION,
    live: true
  });
});

app.get('/api/flights/search', (req,res)=>{
  const competitor = 1299;
  res.json({
    success: true,
    currency: "ZAR",
    symbol: "R",
    priceBeatGuarantee: `R${PRICE_BEAT}`,
    competitor: { price: competitor, source: "Travelstart" },
    khilane: { 
      price: competitor - PRICE_BEAT, 
      finalPrice: `R${competitor - PRICE_BEAT}`,
      saving: `R${PRICE_BEAT}`,
      message: `We beat Travelstart by R${PRICE_BEAT}` 
    }
  });
});

app.get('/api/stays/search', (req,res)=>{
  res.json({ success: true, currency: "ZAR", priceBeat: "R20", price: 1180 });
});

app.get('/api/cars/search', (req,res)=>{
  res.json({ success: true, currency: "ZAR", priceBeat: "R20", price: 430 });
});

app.get('/api/buses/search', (req,res)=>{
  res.json({ success: true, currency: "ZAR", priceBeat: "R20", price: 380 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Khilane v2.1 ZAR Live on ${PORT}`));
