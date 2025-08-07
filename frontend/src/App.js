import React from 'react';
// import Navbar from './components/Navbar';
import Navbar from './components/navbar';
import Home from './components/home';
import Upload from './components/upload';
import MacroResult from './components/macroResult';
import Login from './components/login';
import Signup from './components/signup';
import Profile from './components/profile';
import DashboardCardView from './components/dashboardRingView';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload/>} />
        <Route path="/result" element={<MacroResult />} />
        <Route path="/suggestions" element={<div>Suggestions</div>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dash" element={<DashboardCardView />} />
      </Routes>
    </Router>
  );
}

export default App;
