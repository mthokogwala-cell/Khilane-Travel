import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>res.json({status:'Khilane API Live v2.0 Real OS', domain:'khilanetravel.co.za'}));

app.get('/api/flights/search', (req,res)=>{
  const {from,to} = req.query;
  // TODO: Replace with real Amadeus call:
  // const response = await amadeus.shopping.flightOffersSearch.get({originLocationCode: from, destinationLocationCode: to, departureDate: req.query.depart, adults: '1'})
  res.json({count:3, flights:[{from,to,airline:'FlySafair',price:'R899',note:'Amadeus live here'}, {from,to,airline:'Airlink',price:'R1299'}]});
});

app.get('/api/bookings',(req,res)=>res.json([{id:1,type:'Flight',route:'JNB-CPT',amount:1299},{id:2,type:'Stay',hotel:'Durban Beach',amount:1200}]));
app.get('/api/finance/summary',(req,res)=>res.json({revenue:12450,expenses:8200,profit:4250,vat:1870,payroll:18000,fnb_balance:45200}));
app.get('/api/payroll',(req,res)=>res.json({staff:[{name:'Mthoko',role:'CEO',salary:15000},{name:'Agent',role:'Support',salary:8000}],paye:2400}));
app.get('/api/sars',(req,res)=>res.json({vat201:{collected:1870,paid:1200,due:670},emp201:{paye:2400,uif:240,sdl:150}}));

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Khilane REAL OS running on ${PORT}`));
