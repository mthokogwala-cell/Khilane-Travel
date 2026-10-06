import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

const OWNER_PASSWORD = process.env.ADMIN_PASSWORD || "Bongumenzi1@";
const STAFF_PASSWORD = process.env.STAFF_PASSWORD || "Bongumenzi1@";
const API_PASSWORD = process.env.API_PASSWORD || "Bongumenzi1@";

// Simple auth middleware for API
const apiAuth = (req,res,next)=>{
  const auth = req.headers['x-api-key'] || req.headers['authorization'] || req.query.key || "";
  const key = auth.replace('Bearer ','').trim();
  if(key === OWNER_PASSWORD || key === API_PASSWORD || key === STAFF_PASSWORD){
    req.userRole = (key === STAFF_PASSWORD && req.headers['x-role']==='staff') ? 'staff' : 'owner';
    // For simplicity, if key matches staff but request is from staff login, role is staff
    // Owner password gives owner role
    if(key === OWNER_PASSWORD || key === API_PASSWORD) req.userRole='owner';
    return next();
  }
  return res.status(401).json({error:'Unauthorized — Invalid API password. Use x-api-key: Bongumenzi1@'});
};

app.get('/', (req,res)=>res.json({status:'Khilane API Live v3.2 Secure', domain:'khilanetravel.co.za', auth:'Password protected with Bongumenzi1@', endpoints:['/api/bookings','/api/finance/summary','/api/payroll','/api/sars']}));

app.post('/api/auth/login', (req,res)=>{
  const {username,password}=req.body;
  const u=(username||'').toLowerCase();
  if(password===OWNER_PASSWORD && (u==='owner'||u==='admin'||u==='mthoko'||u==='mthokozisi'||u==='mg gwala'||u==='')){
    return res.json({success:true, role:'owner', token:OWNER_PASSWORD, message:'Owner login — full access'});
  }
  if(password===STAFF_PASSWORD && (u==='staff'||u==='agent'||u==='bookings')){
    return res.json({success:true, role:'staff', token:STAFF_PASSWORD, message:'Staff login — bookings only'});
  }
  // Allow owner password with any username as fallback owner
  if(password===OWNER_PASSWORD){
    return res.json({success:true, role:'owner', token:OWNER_PASSWORD, message:'Owner login — full access'});
  }
  if(password===STAFF_PASSWORD){
    return res.json({success:true, role:'staff', token:STAFF_PASSWORD, message:'Staff login — bookings only'});
  }
  return res.status(401).json({success:false, error:'Invalid username or password. Use Bongumenzi1@'});
});

// Protected routes — require password
app.get('/api/bookings', apiAuth, (req,res)=>res.json([{id:1,type:'Flight',route:'JNB-CPT',amount:1299,ref:'BK-2026-4521',pax:'2A 1C',status:'Confirmed'},{id:2,type:'Stay',hotel:'Premier Richards Bay',amount:3900,ref:'BK-2026-4520',nights:2},{id:3,type:'Bus',route:'JHB-CPT',amount:685,ref:'BK-2026-4519'}]));
app.get('/api/finance/summary', apiAuth, (req,res)=>{
  if(req.userRole==='staff') return res.status(403).json({error:'Forbidden — Staff can only view bookings'});
  res.json({revenue:12450,expenses:8200,profit:4250,vat:1870,payroll:18000,fnb_balance:45200,bank:'Nedbank 1044602244 MG Gwala Branch 198765 CA',priceBeat:'R20'});
});
app.get('/api/payroll', apiAuth, (req,res)=>{
  if(req.userRole==='staff') return res.status(403).json({error:'Forbidden'});
  res.json({staff:[{name:'Mthoko Owner',role:'CEO',salary:15000,access:'Owner - full'},{name:'Agent',role:'Support',salary:8000,access:'Staff - bookings only'}],paye:2400});
});
app.get('/api/sars', apiAuth, (req,res)=>{
  if(req.userRole==='staff') return res.status(403).json({error:'Forbidden'});
  res.json({vat201:{collected:1870,paid:1200,due:670},emp201:{paye:2400,uif:240,sdl:150}});
});
app.get('/api/stays', (req,res)=>{ // public for frontend search
  res.json([{city:'Durban'},{city:'Richards Bay'},{city:'Cape Town'}]);
});

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Khilane Secure API running on ${PORT} — password Bongumenzi1@ protected`));
