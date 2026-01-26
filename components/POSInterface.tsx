import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingCart, Search, CreditCard, Box, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { getProducts, createTransaction, CartItem } from '../services/db';
import { useAuth } from '../context/AuthContext';

const POSInterface: React.FC = () => {
    const { currentUser } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Fetch products on mount
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Filter products
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku?.includes(searchTerm)
    );

    // Cart Logic
    const addToCart = (product: Product) => {
        if ((product.stock_bt || 0) <= 0) {
            setError(`Out of Stock: ${product.name}`);
            setTimeout(() => setError(null), 3000);
            return;
        }

        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                // Check stock limit for existing item
                if (existing.quantity + 1 > (product.stock_bt || 0)) {
                    setError(`Cannot add more. Only ${product.stock_bt} available.`);
                    setTimeout(() => setError(null), 3000);
                    return prev;
                }
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;
                    if (newQty <= 0) return item; // Don't remove here, use delete button

                    // Validate upper limit
                    if (delta > 0 && newQty > (item.stock_bt || 0)) {
                        setError(`Limit Reached: Only ${item.stock_bt} items in stock.`);
                        setTimeout(() => setError(null), 2000);
                        return item;
                    }
                    return { ...item, quantity: newQty };
                }
                return item;
            });
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((sum, item) => sum + ((item.price_bt || 0) * item.quantity), 0);

    // Checkout
    const handleCheckout = async () => {
        if (!currentUser) return;
        setProcessing(true);
        setError(null);

        try {
            await createTransaction(cart, cartTotal, currentUser.uid);
            setSuccess("Transaction Completed! 🎉");
            setCart([]);
            await loadProducts(); // Refresh stock
            setTimeout(() => setSuccess(null), 3000);
        } catch (err: any) {
            setError(err.message || "Transaction failed");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-100px)] gap-6 p-6 bg-gray-50 overflow-hidden">

            {/* LEFT: Product Grid */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex items-center gap-3">
                    <Search className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search items by name or SKU..."
                        className="flex-1 outline-none text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-4">
                    {filteredProducts.map(product => {
                        const outOfStock = (product.stock_bt || 0) <= 0;
                        return (
                            <motion.div
                                key={product.id}
                                whileHover={{ y: -2 }}
                                layoutId={product.id}
                                onClick={() => !outOfStock && addToCart(product)}
                                className={`bg-white p-4 rounded-xl border ${outOfStock ? 'border-gray-200 opacity-60 cursor-not-allowed' : 'border-gray-100 cursor-pointer hover:border-violet-300 hover:shadow-lg'} transition-all`}
                            >
                                <div className={`aspect-square rounded-lg mb-3 flex items-center justify-center ${product.category === 'spirits' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                                    <Box size={32} />
                                </div>
                                <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                                <div className="flex justify-between items-end mt-2">
                                    <div>
                                        <p className="text-xs text-gray-400 font-mono">{product.sku}</p>
                                        <p className={`text-xs font-bold ${outOfStock ? 'text-red-500' : 'text-green-600'}`}>
                                            {outOfStock ? 'Out of Stock' : `${product.stock_bt} Available`}
                                        </p>
                                    </div>
                                    <span className="font-black text-violet-600">₹{product.price_bt}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT: Cart & Checkout */}
            <div className="w-96 bg-white rounded-3xl shadow-xl flex flex-col border border-gray-100 h-full">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-black flex items-center gap-2">
                        <ShoppingCart className="text-violet-600" />
                        Current Sale
                    </h2>
                    <span className="bg-violet-100 text-violet-700 font-bold px-3 py-1 rounded-full text-sm">
                        {cart.length} Items
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    <AnimatePresence>
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-300 gap-4">
                                <ShoppingCart size={48} />
                                <p>Cart is empty</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="p-3 rounded-xl border border-gray-100 bg-gray-50 flex justify-between items-center"
                                >
                                    <div className="flex-1 min-w-0 mr-3">
                                        <h4 className="font-bold text-sm truncate">{item.name}</h4>
                                        <p className="text-xs text-gray-500">₹{item.price_bt} / unit</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-white rounded-lg border border-gray-200">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100"><Minus size={14} /></button>
                                            <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100"><Plus size={14} /></button>
                                        </div>
                                        <div className="min-w-[50px] text-right">
                                            <p className="font-bold text-gray-900">₹{(item.price_bt || 0) * item.quantity}</p>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 mt-1">
                                                <Trash2 size={12} className="ml-auto" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 rounded-b-3xl border-t border-gray-100">
                    {error && (
                        <div className="mb-4 bg-red-100 text-red-600 p-3 rounded-xl text-sm font-bold flex items-center gap-2">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 bg-green-100 text-green-600 p-3 rounded-xl text-sm font-bold flex items-center gap-2">
                            Transaction Successful!
                        </div>
                    )}

                    <div className="flex justify-between items-end mb-6">
                        <span className="text-gray-500 font-bold uppercase text-sm">Total</span>
                        <span className="text-4xl font-black text-gray-900">₹{cartTotal.toLocaleString()}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0 || processing}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${cart.length === 0 || processing
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-200'
                            }`}
                    >
                        {processing ? (
                            "Processing..."
                        ) : (
                            <>
                                <CreditCard size={20} /> CHARGE ₹{cartTotal.toLocaleString()}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default POSInterface;
