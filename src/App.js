import React from "react";
import CountryDetail from "./components/CountryDetail";
import FestivalsData from "./data/FestivalsData";
function App() {
  return (
    <div>
      <CountryDetail data={FestivalsData} />
    </div>
  );
}

export default App;
