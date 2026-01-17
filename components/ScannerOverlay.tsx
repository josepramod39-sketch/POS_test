import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scan, X } from 'lucide-react';

interface ScannerOverlayProps {
    onScan: (code: string) => void;
    onClose: () => void;
    isOpen: boolean;
}

const ScannerOverlay: React.FC<ScannerOverlayProps> = ({ onScan, onClose, isOpen }) => {
    const [simulatedCode, setSimulatedCode] = useState('');

    // Simulate scanning effect
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                // In a real app, this would be camera logic.
                // For now, we simulate a scan event after 2 seconds.
                const mockCodes = ['1005202542', '1005202543', '1005202544'];
                const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)];
                onScan(randomCode);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onScan]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
            <button
                onClick={onClose}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
                <X size={32} />
            </button>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center w-full max-w-md p-8"
            >
                <div className="w-72 h-72 border-2 border-violet-500/30 rounded-3xl relative flex items-center justify-center overflow-hidden bg-gray-900/50">
                    {/* Scanning Animation */}
                    <div className="absolute inset-0 bg-violet-600/5 animate-pulse"></div>
                    <Scan size={64} className="text-violet-500 animate-pulse relative z-10" />

                    {/* Laser Line */}
                    <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.8)] z-20"
                    />

                    {/* Corner Markers */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-violet-500"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-violet-500"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-violet-500"></div>
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-violet-500"></div>
                </div>

                <div className="mt-8 text-center">
                    <h3 className="text-xl font-black text-white tracking-tight mb-2">SCANNING...</h3>
                    <p className="text-gray-400 text-sm uppercase tracking-widest">
                        Align barcode within frame
                    </p>
                </div>

                {/* Manual Input Fallback */}
                <div className="mt-8 w-full">
                    <input
                        type="text"
                        placeholder="Or type SKU/UPC manually"
                        className="w-full bg-gray-800 border-none rounded-xl py-3 px-4 text-white text-center text-sm focus:ring-2 focus:ring-violet-600"
                        value={simulatedCode}
                        onChange={(e) => setSimulatedCode(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onScan(simulatedCode);
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default ScannerOverlay;
