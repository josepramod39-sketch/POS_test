import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Box, ArrowUpRight, ArrowDownLeft, AlertCircle, ShoppingCart, History, Package } from 'lucide-react';
import { InventoryItem, StockMovement } from '../types';

// Data from the provided Breakthru Beverage Invoice
const LIQUOR_INVENTORY: InventoryItem[] = [
  { id: '1', sku: '9256794', upc: '1005202542', name: 'Diplomatico Rum Mantuano 6B 750ML', stock_bt: 14, stock_cs: 2, pack: 6, price: 25.83, category: 'Spirits' },
  { id: '2', sku: '9438613', upc: '1005202543', name: 'Don Fulano Teo Rep 6B 750ML', stock_bt: 8, stock_cs: 1, pack: 6, price: 54.90, category: 'Spirits' },
  { id: '3', sku: '9000588', upc: '1005202544', name: 'J Walker Blk 1L', stock_bt: 3, stock_cs: 0, pack: 12, price: 46.00, category: 'Spirits' },
  { id: '4', sku: '9115008', upc: '1005202545', name: 'Caravella Limoncello 6B 750ML', stock_bt: 22, stock_cs: 3, pack: 6, price: 89.58, category: 'Wine' },
];

const InventoryModule: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(LIQUOR_INVENTORY);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [activeTab, setActiveTab] = useState<'stock' | 'scan' | 'logs'>('stock');
  const [lastScanned, setLastScanned] = useState<InventoryItem | null>(null);

  const handleScan = () => {
    // Simulate mobile camera scan delay
    setActiveTab('scan');
    setTimeout(() => {
      const item = items[Math.floor(Math.random() * items.length)];
      setLastScanned(item);
      processMovement(item.id, -1, 'SALE', 'BT');
      setActiveTab('stock');
    }, 1200);
  };

  const processMovement = (id: string, delta: number, type: StockMovement['type'], unit: 'BT' | 'CS') => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const movement: StockMovement = {
          id: Math.random().toString(36).substr(2, 9),
          productName: item.name,
          type,
          quantity: Math.abs(delta),
          unit,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMovements(m => [movement, ...m].slice(0, 15));
        
        if (unit === 'BT') return { ...item, stock_bt: Math.max(0, item.stock_bt + delta) };
        return { ...item, stock_cs: Math.max(0, item.stock_cs + delta) };
      }
      return item;
    }));
  };

  return (
    <section className="py-24 bg-gray-50" id="inventory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-xl">
            <span className="text-violet-600 font-black text-xs uppercase tracking-[0.2em] mb-4 inline-block">Retail Edge Module</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-black mb-6">
              Inventory <br />
              <span className="text-violet-300">In Real-Time.</span>
            </h2>
            <p className="text-lg text-gray-500 font-medium">
              Modeled after global wholesale standards. Track bottles, cases, and breakage instantly via mobile.
            </p>
          </div>
          
          <div className="flex bg-white p-1.5 rounded-full shadow-lg border border-gray-100">
            <button 
              onClick={() => setActiveTab('stock')}
              className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${activeTab === 'stock' ? 'bg-violet-600 text-white' : 'text-gray-400'}`}
            >STOCK</button>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`px-6 py-2.5 rounded-full text-xs font-black transition-all ${activeTab === 'logs' ? 'bg-violet-600 text-white' : 'text-gray-400'}`}
            >ACTIVITY</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === 'stock' ? (
                <motion.div 
                  key="stock-grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100"
                >
                  <div className="grid gap-4">
                    {items.map(item => (
                      <div key={item.id} className="group flex items-center justify-between p-5 rounded-3xl hover:bg-violet-50 transition-all border border-transparent hover:border-violet-100">
                        <div className="flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
                            item.category === 'Spirits' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                          }`}>
                            <Package size={24} />
                          </div>
                          <div>
                            <div className="font-black text-lg tracking-tight">{item.name}</div>
                            <div className="flex items-center gap-3 text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
                              <span>SKU: {item.sku}</span>
                              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                              <span>Pack: {item.pack}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <div className="flex gap-4">
                              <div>
                                <div className="text-xs font-black text-gray-400 uppercase tracking-tighter">Bottles</div>
                                <div className={`text-xl font-black ${item.stock_bt < 5 ? 'text-red-500' : 'text-black'}`}>{item.stock_bt}</div>
                              </div>
                              <div>
                                <div className="text-xs font-black text-gray-400 uppercase tracking-tighter">Cases</div>
                                <div className="text-xl font-black">{item.stock_cs}</div>
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => processMovement(item.id, 1, 'PURCHASE', 'BT')}
                            className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-violet-600 shadow-sm hover:scale-110 active:scale-95 transition-all"
                          >
                            <Box size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : activeTab === 'logs' ? (
                <motion.div 
                  key="logs-grid"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 min-h-[500px]"
                >
                  <div className="space-y-6">
                    {movements.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <History size={48} strokeWidth={1} className="mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest text-xs">No scan history yet</p>
                      </div>
                    ) : (
                      movements.map(m => (
                        <div key={m.id} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${m.type === 'SALE' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
                              {m.type === 'SALE' ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                            </div>
                            <div>
                              <div className="font-black text-sm">{m.productName}</div>
                              <div className="text-[10px] font-black uppercase text-gray-400">{m.type} • {m.quantity} {m.unit}</div>
                            </div>
                          </div>
                          <div className="text-[10px] font-black text-gray-300">{m.timestamp}</div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="scan-overlay"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-black rounded-[2.5rem] p-12 flex flex-col items-center justify-center min-h-[500px] text-white overflow-hidden relative"
                >
                  <div className="w-64 h-64 border-2 border-violet-500/30 rounded-3xl relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-violet-600/5 animate-pulse"></div>
                    <Scan size={64} className="text-violet-500 animate-pulse" />
                    {/* Scanner Line */}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.8)] z-10"
                    />
                  </div>
                  <p className="mt-8 font-black uppercase tracking-[0.3em] text-violet-500 text-sm">Initializing Camera...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-8">
            <div className="bg-black text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center mb-6">
                  <Scan size={24} />
                </div>
                <h3 className="text-3xl font-black tracking-tighter mb-4">Tap to Scan</h3>
                <p className="text-gray-400 text-sm mb-8 font-medium leading-relaxed uppercase tracking-tight">
                  Point at any RuPay or Liquor UPC. Stock updates in 200ms across all terminals.
                </p>
                <button 
                  onClick={handleScan}
                  disabled={activeTab === 'scan'}
                  className="w-full bg-white text-black py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-violet-500 hover:text-white transition-all shadow-xl shadow-white/5 disabled:opacity-50"
                >
                  LAUNCH SCANNER
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-3xl rounded-full"></div>
            </div>

            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
              <h4 className="font-black uppercase tracking-widest text-xs text-gray-400 mb-6">Analytics Pulse</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase">Sales Today</div>
                    <div className="text-3xl font-black">₹42,850</div>
                  </div>
                  <div className="text-green-500 text-xs font-black">+14.2%</div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    className="h-full bg-violet-600"
                  />
                </div>
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle size={14} />
                  <span className="text-[10px] font-black uppercase">3 Items below reorder level</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InventoryModule;