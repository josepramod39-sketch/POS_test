
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ComingSoon from './components/ComingSoon';

const App: React.FC = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
         </Routes>
      </Router>
   );
};

export default App;
