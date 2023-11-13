import React from "react";
import CountryDetail from "./components/CountryDetail";
import festivalsData from "./data/festivalsData";
function App() {
  return (
    <div>
      <CountryDetail data={festivalsData} />
    </div>
  );
}

export default App;
