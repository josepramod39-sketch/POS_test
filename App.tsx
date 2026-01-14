
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        
        {/* Simple Mid-Section Callout */}
        <section className="bg-violet-600 py-20 overflow-hidden relative">
           <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                 <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight max-w-2xl">
                    Ready to leave the dongles behind? Join 50,000+ modern merchants.
                 </h2>
                 <button className="bg-white text-violet-600 px-10 py-5 pill-button text-xl font-black shadow-2xl hover:bg-gray-50 transition-all whitespace-nowrap">
                    Start selling now
                 </button>
              </div>
           </div>
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </section>

        <Process />
        <Testimonials />
        
        {/* Secondary Product Section - Payment Links */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
             <div className="order-2 md:order-1">
                <div className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl border border-gray-100">
                   <img src="https://picsum.photos/1200/800?random=44" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Remote payments" />
                   <div className="absolute inset-0 bg-violet-600/10 hover:bg-transparent transition-colors"></div>
                </div>
             </div>
             <div className="order-1 md:order-2">
                <span className="text-violet-600 font-black text-xs uppercase tracking-widest mb-4 inline-block">FOR REMOTE SALES</span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
                  Sell from anywhere. <br />
                  <span className="text-gray-300">Get paid instantly.</span>
                </h2>
                <p className="text-xl text-gray-500 mb-8 leading-snug">
                  Send simple payment links via text, email, or social media. Your customers pay securely in their browser, you get the funds in seconds.
                </p>
                <button className="flex items-center gap-2 text-violet-600 font-black uppercase text-sm tracking-widest group">
                  Learn about payment links 
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </button>
             </div>
          </div>
        </section>

        <FAQ />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
};

export default App;
