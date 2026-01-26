import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import {
    Calendar,
    TrendingUp,
    DollarSign,
    ShoppingBag,
    CreditCard,
    ArrowUpRight,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateSalesTrend, generateTopProducts, getSummaryStats, SalesData, TopProduct } from '../utils/mockData';
import { Button } from '../components/ui/button';

const Reports: React.FC = () => {
    const navigate = useNavigate();
    const [salesData, setSalesData] = useState<SalesData[]>([]);
    const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
    const [summary, setSummary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setSalesData(generateSalesTrend(30));
            setTopProducts(generateTopProducts());
            setSummary(getSummaryStats());
            setLoading(false);
        }, 800);
    }, []);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-xl">
                    <p className="text-sm font-bold text-gray-500 mb-1">{label}</p>
                    <p className="text-lg font-black text-violet-600">
                        ${payload[0].value.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                        {payload[0].payload.orders} orders
                    </p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <ArrowLeft className="text-gray-500" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-black tracking-tighter text-gray-900">Reports</h1>
                                <p className="text-gray-500 text-sm font-medium">Analytics & Performance Insights</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="hidden sm:flex items-center gap-2 border-gray-200">
                                <Calendar size={16} />
                                <span>Last 30 Days</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Summary Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-violet-50 rounded-2xl group-hover:bg-violet-100 transition-colors">
                                <DollarSign className="text-violet-600" size={24} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                +{summary.growth}% <ArrowUpRight size={14} />
                            </span>
                        </div>
                        <h3 className="text-gray-500 font-bold text-sm">Total Revenue</h3>
                        <p className="text-3xl font-black text-gray-900 mt-1 tracking-tight">
                            ${summary.totalRevenue.toLocaleString()}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors">
                                <ShoppingBag className="text-blue-600" size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 font-bold text-sm">Total Transactions</h3>
                        <p className="text-3xl font-black text-gray-900 mt-1 tracking-tight">
                            {summary.totalTransactions.toLocaleString()}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-amber-50 rounded-2xl group-hover:bg-amber-100 transition-colors">
                                <CreditCard className="text-amber-600" size={24} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 font-bold text-sm">Avg. Order Value</h3>
                        <p className="text-3xl font-black text-gray-900 mt-1 tracking-tight">
                            ${summary.avgOrderValue}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Revenue Trend</h2>
                                <p className="text-sm text-gray-500 font-medium">Daily revenue over the last 30 days</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded-lg">
                                <TrendingUp size={20} className="text-gray-400" />
                            </div>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        dy={10}
                                        minTickGap={30}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        tickFormatter={(value) => `$${value}`}
                                        dx={-10}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#7c3aed"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Top Products */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                    >
                        <h2 className="text-xl font-black text-gray-900 mb-2">Top Products</h2>
                        <p className="text-sm text-gray-500 font-medium mb-6">Best selling items by revenue</p>

                        <div className="space-y-6">
                            {topProducts.map((product, index) => (
                                <div key={product.id} className="relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-500">
                                                {index + 1}
                                            </span>
                                            <span className="font-bold text-gray-800 text-sm">{product.name}</span>
                                        </div>
                                        <span className="font-bold text-gray-900 text-sm">
                                            ${product.revenue.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(product.revenue / 6000) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                                            className="h-full bg-black rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Reports;
