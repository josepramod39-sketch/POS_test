import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Scan, TrendingUp, Zap, X, CheckCircle2 } from 'lucide-react';

const InventoryFeature: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'stock' | 'activity'>('stock');
    const [isScanning, setIsScanning] = useState(false);
    const [lastScanned, setLastScanned] = useState<{ name: string; sku: string } | null>(null);
    const [highlightedRow, setHighlightedRow] = useState<number | null>(null);

    // Initial State - Defined inside component to be reset-able or managed
    const [products, setProducts] = useState([
        { name: "Diplomatico Rum Mantuano 6B 750ML", sku: "9256794", pack: 6, bt: 14, cs: 2, color: "amber" },
        { name: "Don Fulano Teo Rep 6B 750ML", sku: "9438613", pack: 6, bt: 8, cs: 1, color: "amber" },
        { name: "J Walker Blk 1L", sku: "9000588", pack: 12, bt: 3, cs: 0, color: "amber" },
        { name: "Caravella Limoncello 6B 750ML", sku: "9115008", pack: 6, bt: 22, cs: 3, color: "rose" },
    ]);

    // Mock Real-Time Sync
    useEffect(() => {
        let scanInterval: NodeJS.Timeout;

        if (isScanning) {
            // Scan every 3 seconds
            scanInterval = setInterval(() => {
                // 1. Pick a random product index
                const randomIndex = Math.floor(Math.random() * products.length);
                const product = products[randomIndex];

                // 2. "Detect" it
                setLastScanned({ name: product.name, sku: product.sku });

                // 3. Update Sync: Increment stock in Real-Time
                setProducts(prev => {
                    const newProducts = [...prev];
                    const target = newProducts[randomIndex];
                    // Create a new object for immutability
                    newProducts[randomIndex] = { ...target, bt: target.bt + 1 };
                    return newProducts;
                });

                // 4. Highlight the row
                setHighlightedRow(randomIndex);

                // Clear highlight after 1s
                setTimeout(() => setHighlightedRow(null), 1000);

                // Clear popup after 1.8s
                setTimeout(() => setLastScanned(null), 1800);

            }, 3000);
        } else {
            setLastScanned(null);
            setHighlightedRow(null);
        }

        return () => clearInterval(scanInterval);
    }, [isScanning]); // Dependencies: only isScanning. Accessing 'products' inside setInterval needs refs if we want *current* state without restarting interval, but here we can just pick a random index (0-3) which is constant. We DO need to update based on 'prev' state in setProducts, which we do. The 'product' variable inside might be stale if we don't use a ref, but for name/sku it's constant so it's fine.

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left Content */}
                    <div className="flex-1 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <span className="text-violet-600 font-bold tracking-wider text-sm uppercase mb-4 block">Retail Edge Module</span>
                            <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6 leading-none">
                                Inventory <br />
                                <span className="text-violet-200">In Real-Time.</span>
                            </h2>
                            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
                                Modeled after global wholesale standards. Track bottles, cases, and breakage instantly via mobile.
                            </p>
                        </motion.div>

                        {/* Interactive List mock */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 rounded-3xl p-2 md:p-8 relative shadow-2xl shadow-gray-100"
                        >
                            <div className="flex justify-end mb-6">
                                <div className="bg-white rounded-full p-1 flex shadow-sm border border-gray-100">
                                    <button
                                        onClick={() => setActiveTab('stock')}
                                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'stock' ? 'bg-violet-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        STOCK
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('activity')}
                                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${activeTab === 'activity' ? 'bg-violet-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        ACTIVITY
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {products.map((item, i) => (
                                    <motion.div
                                        key={i} // Use index as key since order doesn't change
                                        initial={false} // Don't re-animate entry on re-renders
                                        animate={{
                                            scale: highlightedRow === i ? 1.02 : 1,
                                            boxShadow: highlightedRow === i ? "0 10px 25px -5px rgba(139, 92, 246, 0.3)" : "none",
                                            borderColor: highlightedRow === i ? "rgba(139, 92, 246, 0.5)" : "rgba(243, 244, 246, 1)"
                                        }}
                                        className={`p-4 rounded-xl flex items-center justify-between border transition-all duration-300 group ${highlightedRow === i ? 'bg-violet-50' : 'bg-white border-gray-100 hover:border-violet-100 hover:shadow-lg'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 ${item.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'} rounded-lg flex items-center justify-center`}>
                                                <Box size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                                                <div className="flex gap-3 mt-1">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SKU: {item.sku}</span>
                                                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">•</span>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PACK: {item.pack}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-6 text-right">
                                            <div>
                                                <span className="text-[10px] font-bold text-gray-400 block uppercase mb-0.5">Bottles</span>
                                                <div className="h-7 overflow-hidden relative">
                                                    {/* Animated Number Counter Effect */}
                                                    <motion.span
                                                        key={item.bt}
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        className={`text-lg font-black block ${highlightedRow === i ? 'text-violet-600' : 'text-gray-900'}`}
                                                    >
                                                        {item.bt}
                                                    </motion.span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-bold text-gray-400 block uppercase mb-0.5">Cases</span>
                                                <span className="text-lg font-black text-gray-900">{item.cs}</span>
                                            </div>
                                            <div className="flex items-center text-gray-300 group-hover:text-violet-600 transition-colors">
                                                <Box size={16} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content - Cards */}
                    <div className="flex-1 w-full max-w-md relative">
                        {/* Scanned Item Popup - Moved Here */}
                        <AnimatePresence>
                            {lastScanned && (
                                <motion.div
                                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                                    className="absolute -top-6 -right-6 md:-right-12 z-50 w-72 bg-white text-black p-5 rounded-2xl shadow-2xl border-4 border-violet-100"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <CheckCircle2 size={16} />
                                        </div>
                                        <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Scanned Successfully</span>
                                    </div>
                                    <h4 className="font-bold text-sm leading-tight mb-1">{lastScanned.name}</h4>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-gray-400 font-mono">SKU: {lastScanned.sku}</p>
                                        <span className="text-xs font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded-md">+1 Stock</span>
                                    </div>

                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        className="mt-3 h-1 bg-green-500 rounded-full"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Scanner Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-black text-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden mb-8"
                        >
                            {/* Scanning Animation & Overlay */}
                            <AnimatePresence>
                                {isScanning && (
                                    <>
                                        {/* Background Tint */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-gray-900/90 z-10 backdrop-blur-sm"
                                        />

                                        {/* Laser Scan Line */}
                                        <motion.div
                                            className="absolute left-0 right-0 h-0.5 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] z-20"
                                            initial={{ top: '10%' }}
                                            animate={{ top: ['10%', '90%', '10%'] }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        />

                                        {/* Viewfinder Corners */}
                                        <div className="absolute inset-8 z-20 pointer-events-none">
                                            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white/50 rounded-tl-3xl"></div>
                                            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white/50 rounded-tr-3xl"></div>
                                            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white/50 rounded-bl-3xl"></div>
                                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white/50 rounded-br-3xl"></div>
                                        </div>
                                    </>
                                )}
                            </AnimatePresence>

                            <div className="relative z-30">
                                <div className="flex justify-between items-start">
                                    <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-900/50">
                                        <Scan size={28} className="text-white" />
                                    </div>
                                    {isScanning && (
                                        <button
                                            onClick={() => setIsScanning(false)}
                                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                        >
                                            <X size={20} className="text-white" />
                                        </button>
                                    )}
                                </div>

                                <h3 className="text-3xl font-black mb-4">Tap to Scan</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed text-sm font-medium">
                                    Point at any label or UPC. Stock updates in 200ms across all terminals.
                                </p>

                                {!isScanning ? (
                                    <button
                                        onClick={() => setIsScanning(true)}
                                        className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                    >
                                        LAUNCH SCANNER
                                    </button>
                                ) : (
                                    <div className="w-full py-4 bg-transparent border-2 border-white/20 text-white rounded-xl font-bold flex items-center justify-center gap-3">
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]" />
                                        Scanning Active...
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Analytics Pulse Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Analytics Pulse</span>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            </div>
                            <div className="mt-4">
                                <span className="text-xs font-bold text-gray-400 uppercase block mb-1">Sales Today</span>
                                <div className="flex items-end gap-3">
                                    <h3 className="text-4xl font-black text-gray-900 tracking-tight">₹42,850</h3>
                                    <div className="flex items-center text-green-500 font-bold text-sm mb-1.5 bg-green-50 px-2 py-0.5 rounded-lg">
                                        <TrendingUp size={14} className="mr-1" />
                                        +14.2%
                                    </div>
                                </div>

                                {/* Progress Bar Mock */}
                                <div className="mt-6 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '70%' }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-violet-600 rounded-full relative"
                                    >
                                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 skew-x-12"></div>
                                    </motion.div>
                                </div>
                                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-red-500 bg-red-50 w-fit px-3 py-1.5 rounded-lg">
                                    <Zap size={12} fill="currentColor" />
                                    3 ITEMS BELOW REORDER LEVEL
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default InventoryFeature;
