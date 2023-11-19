import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/MainPage/Main";
import CountryDetail from "./components/CountryDetail";
import FestivalDetail from "./components/FestivalDetail";
import SearchList from "./components/SearchList";
import TabPrint from "./components/TabPrint";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/CountryDetail" element={<CountryDetail />} />
        <Route path="/festival_detail/:id" element={<FestivalDetail />} />
        <Route path="/searchList" element={<SearchList />} />
        <Route path="/TabPrint" element={<TabPrint />} />
      </Routes>
    </Router>
  );
}

export default App;