import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, PlayCircle } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (view: 'landing' | 'coming-soon') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    } else if (sectionId === 'coming-soon') {
      if (onNavigate) {
        onNavigate('coming-soon');
      }
    }
  };

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
          <button onClick={() => navigate('/login')} className="bg-violet-600 text-white px-6 py-2 pill-button text-sm font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all">
            Login
          </button>
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
          <a href="#how-it-works" className="text-lg font-bold" onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, 'coming-soon'); }}>How it works</a>
          <a href="#pricing" className="text-lg font-bold" onClick={(e) => { setMobileMenuOpen(false); handleNavClick(e, 'coming-soon'); }}>Pricing</a>
          <hr />
          <button className="flex items-center gap-2 font-bold py-2" onClick={() => { setMobileMenuOpen(false); if (onNavigate) onNavigate('coming-soon'); }}>
            <PlayCircle className="text-violet-600" />
            Watch Demo
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
