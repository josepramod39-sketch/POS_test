import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle, RefreshCw, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { signInWithGoogle, signInWithEmail } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await signInWithEmail(email, password);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to log in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await signInWithGoogle();
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in with Google.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            {/* Left Panel - Login */}
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
                            <h1 className="text-4xl font-black tracking-tighter mb-2 text-gray-900">Welcome Back</h1>
                            <p className="text-gray-500">Sign in to your EDITH dashboard.</p>
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleEmailLogin}>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-violet-600 focus:ring-2 focus:ring-violet-600/20 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400 font-medium"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                                    <a href="#" className="text-xs text-violet-600 font-bold hover:text-violet-700">Forgot password?</a>
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-violet-600 focus:ring-2 focus:ring-violet-600/20 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-400 font-medium"
                                />
                            </div>

                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-violet-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-violet-200 hover:bg-violet-700 hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Signing In...' : 'Sign In'}
                                </button>

                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-gray-100"></div>
                                    <span className="flex-shrink-0 mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or</span>
                                    <div className="flex-grow border-t border-gray-100"></div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    className="w-full bg-white hover:bg-gray-50 text-gray-600 py-3 rounded-xl font-bold text-sm border border-gray-100 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Sign in with Google
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                            <p className="text-gray-500 text-sm mb-4">New to EDITH?</p>
                            <Link to="/signup" className="text-violet-600 font-bold hover:text-violet-700 transition-colors">
                                Create an Account
                            </Link>
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
                            Everything you need to <span className="text-violet-500">grow.</span>
                        </h2>

                        <div className="space-y-10">
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                                    <RefreshCw className="text-violet-400 w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Real-time Sync</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Instantly sync your inventory across all devices. Never oversell again with always-up-to-date stock levels.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                                    <ShieldCheck className="text-violet-400 w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Secure Local Storage</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Your data stays on your device with military-grade local encryption. Cloud backup is optional and fully encrypted.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                                    <Zap className="text-violet-400 w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        Built for speed. Process transactions and update inventory in milliseconds, even when you're offline.
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

export default Login;
