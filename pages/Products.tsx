import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Plus,
    Filter,
    MoreVertical,
    Package,
    Trash2,
    Edit2,
    X,
    Scan,
    Box,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, addProduct, recordStockMovement } from '../services/db';
import { Product } from '../types';
import ScannerOverlay from '../components/ScannerOverlay';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { BorderBeam } from "../components/ui/border-beam"

const Products: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        category: 'Spirits',
        price: 0,
        stock_bt: 0,
        stock_cs: 0,
        pack: 6,
        sku: '',
        upc: '',
        description: ''
    });

    useEffect(() => {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[];
            setProducts(productsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleScan = async (code: string) => {
        setIsScannerOpen(false);
        // Find product by UPC or SKU
        const product = products.find(p => p.upc === code || p.sku === code);

        if (product && product.id) {
            alert(`Scanned: ${product.name}\nStock: ${product.stock_cs} CS / ${product.stock_bt} BT`);
        } else {
            if (confirm(`UPC ${code} not found. Add new product?`)) {
                setFormData(prev => ({ ...prev, upc: code, sku: code }));
                setIsAddModalOpen(true);
            }
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addProduct(formData as Product);
            setIsAddModalOpen(false);
            setFormData({
                name: '',
                category: 'Spirits',
                price: 0,
                stock_bt: 0,
                stock_cs: 0,
                pack: 6,
                sku: '',
                upc: '',
                description: ''
            });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteDoc(doc(db, "products", id));
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const adjustStock = async (product: Product, unit: 'BT' | 'CS', delta: number) => {
        if (!product.id) return;

        try {
            const updates: any = {};
            if (unit === 'BT') updates.stock_bt = (product.stock_bt || 0) + delta;
            else updates.stock_cs = (product.stock_cs || 0) + delta;

            await updateDoc(doc(db, "products", product.id), updates);

            await recordStockMovement({
                productId: product.id,
                productName: product.name,
                type: delta > 0 ? 'ADJ' : 'SALE',
                quantity: Math.abs(delta),
                unit,
                userId: 'current-user'
            });
        } catch (err) {
            console.error(err);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ArrowLeft className="text-gray-500" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-black tracking-tighter text-gray-900">Inventory</h1>
                                <p className="text-gray-500 text-sm">Manage stock, prices, and catalog.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                            >
                                <Plus size={18} />
                                <span className="hidden sm:inline">Add Product</span>
                            </button>
                            <button
                                onClick={() => setIsScannerOpen(true)}
                                className="flex items-center gap-2 bg-violet-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
                            >
                                <Scan size={18} />
                                <span className="hidden sm:inline">Scan</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, SKU, UPC..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-violet-600 transition-all font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            {['All', 'Spirits', 'Wine', 'Beer', 'Mixers'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${selectedCategory === cat
                                        ? 'bg-black text-white'
                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
                                >
                                    <BorderBeam size={250} duration={12} delay={9} />
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${product.category === 'Spirits' ? 'bg-amber-50 text-amber-600' :
                                                product.category === 'Wine' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 leading-tight">{product.name}</h3>
                                                <p className="text-xs text-gray-500 font-medium mt-1">SKU: {product.sku}</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <button
                                                onClick={() => product.id && handleDelete(product.id)}
                                                className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Stock Level</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className={`text-lg font-black ${product.stock_bt < 5 ? 'text-red-500' : 'text-gray-900'}`}>
                                                    {product.stock_bt} <span className="text-xs font-normal text-gray-400">BT</span>
                                                </span>
                                                <span className="text-gray-300">/</span>
                                                <span className="text-lg font-black text-gray-900">
                                                    {product.stock_cs} <span className="text-xs font-normal text-gray-400">CS</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => adjustStock(product, 'BT', 1)}
                                                className="p-2 rounded-lg bg-gray-50 hover:bg-violet-50 text-gray-600 hover:text-violet-600 transition-colors"
                                                title="Add Bottle"
                                            >
                                                <Plus size={16} />
                                            </button>
                                            <button
                                                onClick={() => adjustStock(product, 'CS', 1)}
                                                className="p-2 rounded-lg bg-gray-50 hover:bg-violet-50 text-gray-600 hover:text-violet-600 transition-colors"
                                                title="Add Case"
                                            >
                                                <Box size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Add Product Modal */}
                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogContent className="sm:max-w-lg bg-white rounded-3xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black tracking-tight">Add New Product</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleAddProduct} className="space-y-4 py-4">
                            <div>
                                <Label className="text-sm font-bold text-gray-700 mb-1">Product Name</Label>
                                <Input required className="bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-violet-600"
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-sm font-bold text-gray-700 mb-1">SKU</Label>
                                    <Input required className="bg-gray-50 border-gray-200 rounded-xl"
                                        value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} />
                                </div>
                                <div>
                                    <Label className="text-sm font-bold text-gray-700 mb-1">UPC (Barcode)</Label>
                                    <Input className="bg-gray-50 border-gray-200 rounded-xl"
                                        value={formData.upc} onChange={e => setFormData({ ...formData, upc: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label className="text-sm font-bold text-gray-700 mb-1">Price</Label>
                                    <Input type="number" required className="bg-gray-50 border-gray-200 rounded-xl"
                                        value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <Label className="text-sm font-bold text-gray-700 mb-1">Category</Label>
                                    <select className="flex h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option>Spirits</option>
                                        <option>Wine</option>
                                        <option>Beer</option>
                                        <option>Mixers</option>
                                    </select>
                                </div>
                                <div>
                                    <Label className="text-sm font-bold text-gray-700 mb-1">Pack Size</Label>
                                    <select className="flex h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.pack} onChange={e => setFormData({ ...formData, pack: Number(e.target.value) })}>
                                        <option value={6}>6</option>
                                        <option value={12}>12</option>
                                        <option value={24}>24</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div>
                                    <Label className="text-xs font-bold text-gray-500 uppercase mb-1">Initial Bottles</Label>
                                    <Input type="number" className="bg-white border-gray-200 rounded-lg p-2 font-bold"
                                        value={formData.stock_bt} onChange={e => setFormData({ ...formData, stock_bt: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <Label className="text-xs font-bold text-gray-500 uppercase mb-1">Initial Cases</Label>
                                    <Input type="number" className="bg-white border-gray-200 rounded-lg p-2 font-bold"
                                        value={formData.stock_cs} onChange={e => setFormData({ ...formData, stock_cs: Number(e.target.value) })} />
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-black text-white font-bold py-6 rounded-xl hover:bg-gray-900 mt-4">
                                Save Product
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Scanner Overlay */}
                <AnimatePresence>
                    {isScannerOpen && (
                        <ScannerOverlay
                            isOpen={isScannerOpen}
                            onClose={() => setIsScannerOpen(false)}
                            onScan={handleScan}
                        />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Products;
