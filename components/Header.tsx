import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, PlayCircle, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setUserMenuOpen(false);
    if (userMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [userMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (sectionId === 'landing') {
      if (location.pathname !== '/') {
        navigate('/');
      }
      window.scrollTo(0, 0);
    } else if (sectionId.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(sectionId);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get display name or email
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="#" onClick={(e) => handleNavClick(e, 'landing')} className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
            EDITH.Rp
          </a>
          <div className="hidden md:flex gap-6">
            <a href="#features" onClick={(e) => handleNavClick(e, '#features')} className="text-sm font-semibold hover:text-violet-600 transition-colors uppercase tracking-wider">Features</a>
            <a href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')} className="text-sm font-semibold hover:text-violet-600 transition-colors uppercase tracking-wider">How it works</a>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="text-sm font-semibold hover:text-violet-600 transition-colors uppercase tracking-wider">Pricing</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/coming-soon')} className="hidden sm:flex items-center gap-2 hover:opacity-70 transition-opacity">
            <PlayCircle size={20} className="text-violet-600" />
            <span className="text-xs font-bold uppercase tracking-widest">Watch Demo</span>
          </button>

          {user ? (
            /* Logged In State */
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    className="w-10 h-10 rounded-full border-2 border-violet-200"
                  />
                ) : (
                  <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    {userInitial}
                  </div>
                )}
                <span className="hidden sm:block text-sm font-bold">{displayName}</span>
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900">{displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setUserMenuOpen(false); navigate('/dashboard'); }}
                    className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <User size={16} />
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out State */
            <button onClick={() => navigate('/login')} className="bg-violet-600 text-white px-6 py-2 pill-button text-sm font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all">
              Login
            </button>
          )}

          <button className="hidden sm:flex items-center gap-2 hover:opacity-70 transition-opacity">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Help</span>
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4">
          <a href="#features" className="text-lg font-bold" onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, '#features'); }}>Features</a>
          <a href="#how-it-works" className="text-lg font-bold" onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, '#how-it-works'); }}>How it works</a>
          <a href="#" className="text-lg font-bold" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); navigate('/coming-soon'); }}>Pricing</a>
          <hr />
          {user ? (
            <>
              <div className="flex items-center gap-3 py-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={displayName} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                    {userInitial}
                  </div>
                )}
                <div>
                  <p className="font-bold">{displayName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}
                className="flex items-center gap-2 font-bold py-2"
              >
                <User size={20} className="text-violet-600" />
                Dashboard
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="flex items-center gap-2 font-bold py-2 text-red-600"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button className="flex items-center gap-2 font-bold py-2" onClick={() => { setMobileMenuOpen(false); navigate('/coming-soon'); }}>
                <PlayCircle className="text-violet-600" />
                Watch Demo
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                className="bg-violet-600 text-white py-3 rounded-xl font-bold text-center"
              >
                Login
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
