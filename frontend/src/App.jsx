import { useState } from 'react'

function App() {
  const [from, setFrom] = useState('JNB')
  const [to, setTo] = useState('CPT')
  const [depart, setDepart] = useState('2026-10-15')
  const [ret, setRet] = useState('2026-10-22')

  const searchFlights = () => {
    const d = depart.replace(/-/g,'').slice(2)
    const r = ret.replace(/-/g,'').slice(2)
    const url = `https://www.aviasales.co.za/search/${from}${d}${to}${r}1?marker=650123&currency=ZAR&locale=en-ZA`
    window.open(url, '_blank')
  }

  const searchHotels = () => {
    window.open(`https://www.hotellook.com/?marker=650123&currency=ZAR&locale=en&city=Cape%20Town&checkIn=${depart}&checkOut=${ret}`, '_blank')
  }

  return (
    <div style={{fontFamily:'Outfit', padding:20, background:'#0a1931', color:'white', minHeight:'100vh'}}>
      <h1 style={{color:'#facc15'}}>Khilane Travel ✈️ — ZAR Live v2.1</h1>
      <p>Price Beat: R20 OFF on ALL • Currency: R (ZAR)</p>
      
      <div style={{background:'white', color:'black', padding:20, borderRadius:12, maxWidth:400, marginTop:20}}>
        <label>From: </label>
        <input value={from} onChange={e=>setFrom(e.target.value)} style={{margin:5}} />
        <br/>
        <label>To: </label>
        <input value={to} onChange={e=>setTo(e.target.value)} style={{margin:5}} />
        <br/>
        <label>Depart: </label>
        <input type="date" value={depart} onChange={e=>setDepart(e.target.value)} style={{margin:5}} />
        <br/>
        <label>Return: </label>
        <input type="date" value={ret} onChange={e=>setRet(e.target.value)} style={{margin:5}} />
        <br/><br/>
        <button onClick={searchFlights} style={{background:'#facc15', padding:'12px 20px', border:'none', borderRadius:8, fontWeight:'bold', width:'100%', cursor:'pointer'}}>
          Search Flights in ZAR (R) → Beat by R20
        </button>
        <br/><br/>
        <button onClick={searchHotels} style={{background:'#0a1931', color:'white', padding:'10px 20px', border:'none', borderRadius:8, width:'100%', cursor:'pointer'}}>
          Search Hotels in ZAR
        </button>
      </div>

      <p style={{marginTop:20, color:'#facc15'}}>Backend: khilane-api.onrender.com — v2.1 ZAR Fixed • Live</p>
    </div>
  )
}

export default App
