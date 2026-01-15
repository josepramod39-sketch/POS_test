import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    CreditCard,
    Package,
    TrendingUp,
    Settings,
    LogOut,
    Plus,
    BarChart3,
    Users,
    Zap
} from 'lucide-react';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Get display name or email
    const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
    const userInitial = displayName.charAt(0).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Dashboard Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <a href="/" className="text-2xl font-black tracking-tighter text-violet-600">
                            EDITH.Rp
                        </a>
                        <nav className="hidden md:flex gap-6">
                            <a href="#" className="text-sm font-semibold text-violet-600 uppercase tracking-wider">Dashboard</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="text-sm font-semibold text-gray-500 hover:text-violet-600 transition-colors uppercase tracking-wider">Sales</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="text-sm font-semibold text-gray-500 hover:text-violet-600 transition-colors uppercase tracking-wider">Inventory</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/coming-soon'); }} className="text-sm font-semibold text-gray-500 hover:text-violet-600 transition-colors uppercase tracking-wider">Reports</a>
                        </nav>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Settings size={20} className="text-gray-500" />
                        </button>

                        <div className="flex items-center gap-3">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={displayName}
                                    className="w-10 h-10 rounded-full border-2 border-violet-200"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {userInitial}
                                </div>
                            )}
                            <div className="hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{displayName}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                            title="Logout"
                        >
                            <LogOut size={20} className="text-gray-500 group-hover:text-red-500" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 mb-2">
                        Welcome back, {displayName}! 👋
                    </h1>
                    <p className="text-gray-500">Here's what's happening with your business today.</p>
                </motion.div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Today's Sales", value: '$0.00', icon: CreditCard, color: 'violet', change: '+0%' },
                        { label: 'Total Products', value: '0', icon: Package, color: 'blue', change: '0 items' },
                        { label: 'Revenue (MTD)', value: '$0.00', icon: TrendingUp, color: 'green', change: '+0%' },
                        { label: 'Transactions', value: '0', icon: BarChart3, color: 'orange', change: 'this month' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100`}>
                                    <stat.icon className={`text-${stat.color}-600`} size={24} />
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase">{stat.change}</span>
                            </div>
                            <p className="text-2xl font-black text-gray-900 mb-1">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100"
                    >
                        <h2 className="text-xl font-black text-gray-900 mb-6">Quick Actions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'New Sale', icon: Plus, color: 'violet', action: () => navigate('/coming-soon') },
                                { label: 'Add Product', icon: Package, color: 'blue', action: () => navigate('/products') },
                                { label: 'View Reports', icon: BarChart3, color: 'green', action: () => navigate('/coming-soon') },
                                { label: 'Manage Team', icon: Users, color: 'orange', action: () => navigate('/coming-soon') },
                            ].map((action) => (
                                <button
                                    key={action.label}
                                    onClick={action.action}
                                    className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${action.color}-100 group-hover:scale-110 transition-transform`}>
                                        <action.icon className={`text-${action.color}-600`} size={24} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-violet-600 to-violet-800 p-6 rounded-2xl text-white"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Zap size={24} />
                            <h2 className="text-xl font-black">Get Started</h2>
                        </div>
                        <p className="text-violet-100 text-sm mb-6 leading-relaxed">
                            Complete your setup to start accepting payments and managing inventory.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">✓</div>
                                <span className="text-sm">Create account</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">2</div>
                                <span className="text-sm text-violet-200">Add your first product</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">3</div>
                                <span className="text-sm text-violet-200">Make your first sale</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white p-6 rounded-2xl border border-gray-100"
                >
                    <h2 className="text-xl font-black text-gray-900 mb-6">Recent Activity</h2>
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BarChart3 size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No activity yet</h3>
                        <p className="text-gray-500 text-sm mb-6">Your recent transactions and updates will appear here.</p>
                        <button
                            onClick={() => navigate('/coming-soon')}
                            className="bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors"
                        >
                            Make Your First Sale
                        </button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;
