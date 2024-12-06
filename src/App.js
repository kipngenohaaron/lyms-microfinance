import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoanApplication from './pages/LoanApplication';
import UserDashboard from './pages/UserDashboard';
import './styles/main.css';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/apply" element={<LoanApplication />} />
      <Route path="/dashboard" element={<UserDashboard />} />
    </Routes>
  </Router>
);

export default App;
