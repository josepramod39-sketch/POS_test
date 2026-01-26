
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Lottery from './pages/Lottery';
import Reports from './pages/Reports';
import ComingSoon from './components/ComingSoon';

const App: React.FC = () => {
   return (
      <AuthProvider>
         <Router>
            <Routes>
               {/* Public Routes */}
               <Route path="/" element={<LandingPage />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/coming-soon" element={<ComingSoon />} />

               {/* Protected Routes */}
               <Route
                  path="/dashboard"
                  element={
                     <ProtectedRoute>
                        <Dashboard />
                     </ProtectedRoute>
                  }
               />

               <Route
                  path="/products"
                  element={
                     <ProtectedRoute>
                        <Products />
                     </ProtectedRoute>
                  }
               />

               <Route
                  path="/lottery"
                  element={
                     <ProtectedRoute>
                        <Lottery />
                     </ProtectedRoute>
                  }
               />

               <Route
                  path="/reports"
                  element={
                     <ProtectedRoute>
                        <Reports />
                     </ProtectedRoute>
                  }
               />
            </Routes>
         </Router>
      </AuthProvider>
   );
};

export default App;
