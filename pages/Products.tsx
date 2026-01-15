import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Search, Filter, Loader, Edit2, Trash2 } from 'lucide-react';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../services/db';
import { Product } from '../types';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        sku: '',
        description: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const productData = {
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                sku: formData.sku,
                description: formData.description,
            };

            if (editingId) {
                await updateProduct(editingId, productData);
            } else {
                await addProduct(productData);
            }

            await fetchProducts();
            closeModal();
        } catch (error) {
            console.error("Error saving product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    const openEditModal = (product: Product) => {
        setEditingId(product.id!);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            stock: product.stock.toString(),
            sku: product.sku,
            description: product.description || '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', category: '', price: '', stock: '', sku: '', description: '' });
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Inventory</h1>
                    <p className="text-gray-500">Manage your products and stock levels</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-violet-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
                >
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex gap-4 mb-6 sticky top-0 z-10 shadow-sm">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products by name, SKU, or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                    />
                </div>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                    <Filter size={20} />
                </button>
            </div>

            {/* Product List */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader className="animate-spin text-violet-600" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                                className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg transition-shadow group relative"
                            >
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => openEditModal(product)} className="p-1.5 bg-gray-100 rounded-full hover:bg-violet-100 hover:text-violet-600 transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(product.id!)} className="p-1.5 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="h-40 bg-gray-50 rounded-xl mb-4 flex items-center justify-center">
                                    {product.imageUrl ? (
                                        <img src={product.imageUrl} alt={product.name} className="h-full object-contain" />
                                    ) : (
                                        <span className="text-4xl">📦</span>
                                    )}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-violet-600 mb-1 uppercase tracking-wider">{product.category}</div>
                                    <h3 className="font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-gray-500 text-xs mb-1">SKU: {product.sku}</p>
                                            <p className={`text-xs font-bold ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                                                {product.stock} in stock
                                            </p>
                                        </div>
                                        <p className="text-lg font-black text-gray-900">${product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-500 text-lg">No products found.</p>
                    <button onClick={() => setIsModalOpen(true)} className="text-violet-600 font-bold hover:underline mt-2">
                        Add your first product
                    </button>
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-black text-gray-900">
                                    {editingId ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                                        <input
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                                            placeholder="e.g. Wireless Mouse"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">SKU</label>
                                        <input
                                            required
                                            name="sku"
                                            value={formData.sku}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                                            placeholder="e.g. WM-001"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Stock</label>
                                        <input
                                            required
                                            type="number"
                                            name="stock"
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                    <select
                                        required
                                        name="category"
                                        value={formData.category}
                                        onChange={(e: any) => handleInputChange(e)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Groceries">Groceries</option>
                                        <option value="Home">Home</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
                                        placeholder="Product details..."
                                    />
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 px-4 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200 disabled:opacity-50"
                                    >
                                        {loading ? 'Saving...' : (editingId ? 'Update Product' : 'Add Product')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Products;
