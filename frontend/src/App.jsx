const API = "https://khilane-api.onrender.com";
const PRICE_BEAT = 20; // R20

const searchFlights = () => {
  const departClean = depart.replace(/-/g,'').slice(2); // 261015
  const retClean = ret.replace(/-/g,'').slice(2); // 261022
  const departFull = depart.replace(/-/g,'');
  const retFull = ret.replace(/-/g,'');
  
  // FINAL ZAR FIX - .co.za domain forces Rands
  const zarUrl = `https://www.aviasales.co.za/search/${from}${departClean}${to}${retClean}1?marker=650123&currency=ZAR&locale=en-ZA&with_request=true&origin_iata=${from}&destination_iata=${to}&depart_date=${departFull}&return_date=${retFull}`;
  
  window.open(zarUrl, "_blank");
};

// Same for Hotels and Cars - force ZAR
const searchHotels = () => {
  window.open(`https://www.hotellook.com/hotels?marker=650123&currency=ZAR&locale=en&city=${encodeURIComponent(city)}&checkIn=${depart}&checkOut=${ret}`, "_blank");
};
