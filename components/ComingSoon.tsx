import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComingSoon: React.FC = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleBack}
                className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-violet-600 font-bold uppercase tracking-widest text-sm transition-colors z-20"
            >
                <ArrowLeft size={18} />
                Go Back
            </motion.button>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center relative z-10 max-w-2xl"
            >
                <div className="w-24 h-24 bg-violet-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-violet-600">
                    <Construction size={48} />
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter">
                    Coming <span className="text-violet-600">Soon.</span>
                </h1>

                <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto">
                    We're busy building this feature to help you run your business better. Check back soon for updates!
                </p>

                <button
                    onClick={handleBack}
                    className="bg-black text-white px-8 py-4 pill-button font-bold shadow-xl hover:bg-gray-800 transition-all"
                >
                    Return to Home
                </button>
            </motion.div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>
    );
};

export default ComingSoon;
