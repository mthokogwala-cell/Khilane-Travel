const searchFlights = () => {
    // FORCE ZAR — South African Rands only
    const departClean = depart.replace(/-/g,'').slice(2); // 261015
    const retClean = ret.replace(/-/g,'').slice(2);
    const aviasalesUrl = `https://www.aviasales.com/search/${from}${departClean}${to}${retClean}1?marker=650123&currency=zar&locale=en-ZA&with_request=true`;
    
    // Also call your backend for R20 beat calculation in Rands
    fetch(`${API}/api/flights/search?from=${from}&to=${to}&depart=${depart}&return=${ret}&currency=ZAR&priceBeat=20`)
      .then(r=>r.json())
      .then(d=>console.log("ZAR Price:", d.khilane?.price));

    window.open(aviasalesUrl,"_blank");
  };
