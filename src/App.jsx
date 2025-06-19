import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SortingPage from './pages/SortingPage';
import SearchingPage from './pages/SearchingPage';

export default function App() {
  return (
    <Router>
      <header>
        <h1>Algorithm Visualizer</h1>
      </header>
      <div className="navbar">
        <Link to="/">Sorting</Link>
        <Link to="/search">Searching</Link>
      </div>
      <Routes>
        <Route path="/" element={<SortingPage />} />
        <Route path="/search" element={<SearchingPage />} />
      </Routes>
    </Router>
  );
}
