export default function App() {
  const packages = [
    { id: 1, title: "Cape Town Escape", loc: "Cape Town • 5 Days", price: "R 8,999", img: "https://images.unsplash.com/photo-1580060868583-83b5f33a0a4a?w=600", desc: "Table Mountain, Robben Island & Winelands" },
    { id: 2, title: "Kruger Safari Adventure", loc: "Kruger National Park • 4 Days", price: "R 12,500", img: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600", desc: "Big 5 game drives & luxury lodge" },
    { id: 3, title: "Durban Beach & Culture", loc: "Durban • 3 Days", price: "R 5,999", img: "https://images.unsplash.com/photo-1576485290814-1c72c0bbea4a?w=600", desc: "Golden Mile, uShaka & Township tour" },
    { id: 4, title: "Drakensberg Hiking", loc: "Drakensberg • 3 Days", price: "R 6,500", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600", desc: "Mountains, waterfalls & Basotho culture" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
        * { font-family: 'Outfit', system-ui, sans-serif; box-sizing: border-box; margin:0; padding:0 }
        .hero {
          background: linear-gradient(105deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.25) 100%), url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600') center/cover;
          min-height: 88vh;
        }
      `}</style>

      <div style={{background:'#f8fafc', minHeight:'100vh'}}>
        <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 5%', background:'white', position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 20px rgba(0,0,0,0.06)'}}>
          <div style={{display:'flex', alignItems:'center', gap:'10px', fontWeight:800, fontSize:'22px', color:'#0f172a'}}>
            <span style={{background:'#0f172a', color:'white', width:'36px', height:'36px', display:'grid', placeItems:'center', borderRadius:'10px'}}>K</span>
            KHILANE TRAVEL
          </div>
          <div style={{display:'flex', gap:'24px', fontWeight:600, color:'#334155'}}>
            <span>Home</span><span>Packages</span><span>Destinations</span><span>Contact</span>
          </div>
          <a href="https://khilane-api.onrender.com" target="_blank" style={{background:'#0f172a', color:'white', padding:'10px 20px', borderRadius:'999px', textDecoration:'none', fontWeight:600}}>API Live ✓</a>
        </nav>

        <div className="hero" style={{display:'flex', alignItems:'center', padding:'5%'}}>
          <div style={{maxWidth:'620px', color:'white'}}>
            <div style={{background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', display:'inline-block', padding:'8px 16px', borderRadius:'999px', fontSize:'14px', letterSpacing:'1px'}}>YOUR GATEWAY TO AFRICA 🌍</div>
            <h1 style={{fontSize:'64px', lineHeight:'0.95', fontWeight:800, marginTop:'20px'}}>Discover South Africa With Khilane</h1>
            <p style={{fontSize:'19px', marginTop:'18px', opacity:0.9, lineHeight:1.5}}>From Cape Town to Kruger, Durban to Drakensberg — handcrafted tours, trusted guides, and unforgettable memories.</p>
            <div style={{display:'flex', gap:'12px', marginTop:'28px'}}>
              <button onClick={()=>document.getElementById('packages').scrollIntoView({behavior:'smooth'})} style={{background:'white', color:'#0f172a', padding:'14px 28px', borderRadius:'999px', fontWeight:700, border:'none', fontSize:'16px', cursor:'pointer'}}>Explore Packages</button>
              <button onClick={()=>window.open('https://wa.me/27821234567?text=Hi%20Khilane%20Travel%20-%20I%20want%20to%20book%20a%20tour','_blank')} style={{background:'rgba(255,255,255,0.15)', color:'white', padding:'14px 28px', borderRadius:'999px', fontWeight:600, border:'1px solid rgba(255,255,255,0.3)', fontSize:'16px', cursor:'pointer'}}>WhatsApp Us</button>
            </div>
          </div>
        </div>

        <div id="packages" style={{padding:'70px 5%'}}>
          <div style={{textAlign:'center', marginBottom:'40px'}}>
            <h2 style={{fontSize:'42px', fontWeight:800, color:'#0f172a'}}>Popular Packages</h2>
            <p style={{color:'#64748b', fontSize:'18px', marginTop:'10px'}}>Best-selling tours this month — all inclusive, no hidden fees</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'24px'}}>
            {packages.map(p => (
              <div key={p.id} style={{background:'white', borderRadius:'22px', overflow:'hidden', boxShadow:'0 10px 30px rgba(0,0,0,0.06)'}}>
                <div style={{height:'200px', background:`url(${p.img}) center/cover`}}></div>
                <div style={{padding:'20px'}}>
                  <div style={{fontSize:'13px', color:'#64748b', fontWeight:600}}>{p.loc}</div>
                  <h3 style={{fontSize:'20px', fontWeight:700, marginTop:'6px', color:'#0f172a'}}>{p.title}</h3>
                  <p style={{color:'#64748b', marginTop:'6px', fontSize:'14px'}}>{p.desc}</p>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'18px'}}>
                    <span style={{fontSize:'22px', fontWeight:800, color:'#0f172a'}}>{p.price}</span>
                    <button style={{background:'#0f172a', color:'white', border:'none', padding:'10px 18px', borderRadius:'999px', fontWeight:600}}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{margin:'0 5% 70px', background:'#0f172a', borderRadius:'28px', padding:'50px', color:'white', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'20px'}}>
          <div>
            <h2 style={{fontSize:'36px', fontWeight:800}}>Ready to travel?</h2>
            <p style={{opacity:0.8, marginTop:'8px', fontSize:'17px'}}>Your website is LIVE. Now connect bookings to your backend API.</p>
          </div>
          <button style={{background:'white', color:'#0f172a', padding:'14px 28px', borderRadius:'999px', fontWeight:700, border:'none'}}>Contact Us</button>
        </div>

        <footer style={{textAlign:'center', padding:'30px', color:'#94a3b8', fontSize:'14px'}}>
          © 2025 Khilane Travel • Durban, KZN, South Africa • Frontend + Backend LIVE on Render
        </footer>
      </div>
    </>
  )
}
