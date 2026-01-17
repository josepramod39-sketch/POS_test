
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import InventoryFeature from '../components/InventoryFeature';
import Features from '../components/Features';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import AIChat from '../components/AIChat';
import ComingSoon from '../components/ComingSoon';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Hero />
                <InventoryFeature />
                <Features />

                {/* Simple Mid-Section Callout */}
                <section className="bg-violet-600 py-20 overflow-hidden relative">
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight max-w-2xl">
                                Ready to leave the dongles behind? Master your inventory.
                            </h2>
                            <button onClick={() => navigate('/login')} className="bg-white text-violet-600 px-10 py-5 pill-button text-xl font-black shadow-2xl hover:bg-gray-50 transition-all whitespace-nowrap">
                                Start selling now
                            </button>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </section>

                {/* Invoice Scanning Highlight Section */}
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-1">
                            <span className="text-violet-600 font-black text-xs uppercase tracking-widest mb-4 inline-block">AI-POWERED AUTOMATION</span>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
                                Restock in seconds. <br />
                                <span className="text-gray-400">Just scan your invoice.</span>
                            </h2>
                            <p className="text-xl text-gray-500 mb-8 leading-snug">
                                Our AI reads your paper invoices and updates your inventory automatically. No data entry required. Just point, shoot, and you're done.
                            </p>
                            <button onClick={() => navigate('/coming-soon')} className="flex items-center gap-2 text-violet-600 font-black uppercase text-sm tracking-widest group">
                                See how it works
                                <span className="group-hover:translate-x-2 transition-transform">→</span>
                            </button>
                        </div>
                        <div className="order-2">
                            <div className="relative rounded-[2.5rem] bg-white p-4 shadow-2xl border border-gray-100 max-w-md mx-auto rotate-1 hover:rotate-0 transition-transform duration-500">
                                <div className="aspect-[4/5] bg-gray-900 rounded-[2rem] overflow-hidden relative">
                                    {/* UI Mockup for Invoice Scanning */}
                                    <div className="absolute inset-0 opacity-50">
                                        <img src="https://picsum.photos/800/1000?random=invoice" alt="Invoice Background" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

                                    {/* Scanning Overlay */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="w-64 h-80 border-2 border-violet-500 rounded-lg relative overflow-hidden">
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                                            <div className="absolute inset-0 bg-violet-600/10"></div>
                                        </div>
                                        <div className="mt-8 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-white font-bold text-sm">Processing Invoice...</span>
                                        </div>
                                    </div>

                                    {/* Detected Items Popups */}
                                    <div className="absolute bottom-8 left-6 right-6 space-y-3">
                                        <div className="bg-white p-3 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-bottom-4 fade-in duration-700">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">📦</div>
                                                <div>
                                                    <div className="font-bold text-sm">Espresso Beans</div>
                                                    <div className="text-xs text-gray-500">SKU: 88291 • Qty: 50</div>
                                                </div>
                                            </div>
                                            <div className="bg-green-100 text-green-700 p-1 rounded-full">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                        </div>
                                        <div className="bg-white p-3 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">🥛</div>
                                                <div>
                                                    <div className="font-bold text-sm">Oat Milk</div>
                                                    <div className="text-xs text-gray-500">SKU: 44212 • Qty: 24</div>
                                                </div>
                                            </div>
                                            <div className="bg-green-100 text-green-700 p-1 rounded-full">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                Sell & Manage <br />
                                <span className="text-gray-300">from anywhere.</span>
                            </h2>
                            <p className="text-xl text-gray-500 mb-8 leading-snug">
                                Send simple payment links via text, email, or social media. Your customers pay securely in their browser, you get the funds in seconds.
                            </p>
                            <button onClick={() => navigate('/coming-soon')} className="flex items-center gap-2 text-violet-600 font-black uppercase text-sm tracking-widest group">
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

export default LandingPage;
