
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, ShieldCheck, Zap, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            {/* Left Panel - Signup Form */}
            <div className="w-full lg:w-1/2 flex flex-col p-8 sm:p-16 xl:p-24 relative bg-white z-10">
                <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-400 hover:text-violet-600 font-bold uppercase tracking-widest text-xs transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to home
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-gray-400 hover:text-violet-600 font-bold uppercase tracking-widest text-xs transition-colors"
                    >
                        <HelpCircle size={16} />
                        Help
                    </motion.button>
                </div>

                <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full mt-12 lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-10">
                            <h1 className="text-4xl font-black tracking-tighter mb-2 text-gray-900">Create Account</h1>
                            <p className="text-gray-500">Join EDITH and start selling smarter.</p>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border-gray-200 focus:border-violet-600 focus:ring-violet-600 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400 font-medium" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                                <input type="email" placeholder="you@company.com" className="w-full bg-gray-50 border-gray-200 focus:border-violet-600 focus:ring-violet-600 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400 font-medium" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
                                <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border-gray-200 focus:border-violet-600 focus:ring-violet-600 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400 font-medium" />
                            </div>

                            <button type="button" className="w-full bg-violet-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-violet-200 hover:bg-violet-700 hover:shadow-2xl hover:-translate-y-1 transition-all">
                                Create Account
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                            <p className="text-gray-500 text-sm mb-4">Already have an account?</p>
                            <button onClick={() => navigate('/login')} className="text-violet-600 font-bold hover:text-violet-700 transition-colors">
                                Sign In
                            </button>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* Right Panel - Features Highlight */}
            <div className="w-full lg:w-1/2 bg-gray-900 flex flex-col p-8 sm:p-16 xl:p-24 relative overflow-hidden justify-center">
                {/* Abstract geometric background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-violet-600/20 blur-3xl"></div>
                    <div className="absolute top-[20%] -left-[20%] w-[60%] h-[60%] rounded-full bg-blue-600/20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-12 leading-tight">
                            Start your journey with <span className="text-violet-500">EDITH.</span>
                        </h2>

                        <div className="space-y-10">
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                                    <RefreshCw className="text-violet-400 w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Seamless Transition</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Import your existing inventory in minutes. We support all major formats.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                                    <ShieldCheck className="text-violet-400 w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Bank-Level Security</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Your business data is encrypted and stored locally. You own your data, always.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                                    <Zap className="text-violet-400 w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Instant Setup</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Get up and running in less than 5 minutes. No credit card required for the free tier.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
