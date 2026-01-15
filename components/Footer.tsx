
import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('coming-soon');
    }
  };

  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="text-4xl font-black tracking-tighter mb-8">EDITH.</div>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Transforming smartphones into powerful business tools. Payments, inventory, and insights in one app.
            </p>
            <div className="flex gap-4">
              <a href="#" onClick={handleLinkClick} className="p-2 bg-gray-900 rounded-full hover:bg-violet-600 transition-colors"><Instagram size={18} /></a>
              <a href="#" onClick={handleLinkClick} className="p-2 bg-gray-900 rounded-full hover:bg-violet-600 transition-colors"><Twitter size={18} /></a>
              <a href="#" onClick={handleLinkClick} className="p-2 bg-gray-900 rounded-full hover:bg-violet-600 transition-colors"><Facebook size={18} /></a>
              <a href="#" onClick={handleLinkClick} className="p-2 bg-gray-900 rounded-full hover:bg-violet-600 transition-colors"><Youtube size={18} /></a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="p-2 bg-gray-900 rounded-full hover:bg-violet-600 transition-colors"><Instagram size={18} /></a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="p-2 bg-gray-900 rounded-full hover:bg-violet-600 transition-colors"><Twitter size={18} /></a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="p-2 bg-gray-900 rounded-full hover:bg-violet-600 transition-colors"><Facebook size={18} /></a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="p-2 bg-gray-900 rounded-full hover:bg-violet-600 transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-violet-500">Products</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="text-gray-400 hover:text-white transition-colors">POS & Inventory App</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="text-gray-400 hover:text-white transition-colors">Analytics Dashboard</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="text-gray-400 hover:text-white transition-colors">Hardware</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="text-gray-400 hover:text-white transition-colors">Mobile App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-violet-500">Support</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-600 font-bold uppercase tracking-widest">
            INSTANT PAYMENTS. INSTANT MONEY. © 2024 E.D.I.T.H Rp.
          </div>
          <div className="flex gap-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            <a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" onClick={handleLinkClick} className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-900/50 rounded-2xl text-[10px] text-gray-700 leading-relaxed uppercase tracking-tighter">
          E.D.I.T.H Rp IS A TECHNOLOGY PLATFORM, NOT A BANK. BANKING SERVICES PROVIDED BY LEAD BANK, MEMBER FDIC. THE EDITH VISA® PREPAID CARD IS ISSUED BY LEAD BANK PURSUANT TO A LICENSE FROM VISA U.S.A. INC. AND MAY BE USED EVERYWHERE VISA DEBIT CARDS ARE ACCEPTED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
