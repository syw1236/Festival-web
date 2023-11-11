import React from "react";
import CountryDetail from "./components/CountryDetail";
import FestivalsData from "./data/FestivalsData";
function App() {
  return (
    <div>
      <img src="/image/DaeguBig.jpg" alt="daegu" />
      <CountryDetail data={FestivalsData} />
    </div>
  );
}

export default App;
