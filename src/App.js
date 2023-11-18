import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchList from './components/SearchList';
import FestivalDetail from './components/FestivalDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchList />} />
        <Route path="/festival_detail/:id" element={<FestivalDetail />} />
      </Routes>
    </Router>
  );
};

export default App;