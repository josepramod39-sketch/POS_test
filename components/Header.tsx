
import React, { useState, useEffect } from 'react';
import { Menu, X, PlayCircle } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="#" className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
            EDITH.Rp
          </a>
          <div className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-semibold hover:text-violet-600 transition-colors uppercase tracking-wider">Features</a>
            <a href="#how-it-works" className="text-sm font-semibold hover:text-violet-600 transition-colors uppercase tracking-wider">How it works</a>
            <a href="#pricing" className="text-sm font-semibold hover:text-violet-600 transition-colors uppercase tracking-wider">Pricing</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 hover:opacity-70 transition-opacity">
            <PlayCircle size={20} className="text-violet-600" />
            <span className="text-xs font-bold uppercase tracking-widest">Watch Demo</span>
          </button>
          <button className="bg-violet-600 text-white px-6 py-2 pill-button text-sm font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all">
            Get started
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
          <a href="#features" className="text-lg font-bold" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-lg font-bold" onClick={() => setMobileMenuOpen(false)}>How it works</a>
          <a href="#pricing" className="text-lg font-bold" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <hr />
          <button className="flex items-center gap-2 font-bold py-2">
            <PlayCircle className="text-violet-600" />
            Watch Demo
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
