import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Calculator,
    Camera,
    Upload,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Receipt,
    X,
    Aperture
} from 'lucide-react';
import { extractLotteryReport, LotteryReport } from '../services/geminiService';

const Lottery: React.FC = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reportImage, setReportImage] = useState<string | null>(null);

    // Camera State
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

    // Form Data
    const [data, setData] = useState<LotteryReport>({
        onlineSales: 0,
        onlineCashes: 0,
        instantSales: 0,
        instantCashes: 0
    });

    // Cleanup camera on unmount
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            setCameraStream(stream);
            setIsCameraOpen(true);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera Error:", err);
            setError("Could not access camera. Please double check permissions.");
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
        }
        setIsCameraOpen(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context) {
                // Set canvas dimensions to match video
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Draw frame
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Get base64
                const base64 = canvas.toDataURL('image/jpeg');
                setReportImage(base64);
                stopCamera();
                processImage(base64);
            }
        }
    };

    const processImage = async (base64: string) => {
        setLoading(true);
        setError(null);

        try {
            const extracted = await extractLotteryReport(base64);
            setData({
                onlineSales: extracted.onlineSales || 0,
                onlineCashes: extracted.onlineCashes || 0,
                instantSales: extracted.instantSales || 0,
                instantCashes: extracted.instantCashes || 0
            });
        } catch (err) {
            console.error(err);
            setError("Could not read the report. Please enter values manually.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setReportImage(base64);
            processImage(base64);
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const netDue = (data.onlineSales + data.instantSales) - (data.onlineCashes + data.instantCashes);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col relative w-full">

            {/* Camera Modal */}
            <AnimatePresence>
                {isCameraOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black flex flex-col"
                    >
                        <div className="p-4 flex justify-between items-center bg-black/50 backdrop-blur-md absolute top-0 left-0 right-0 z-10">
                            <button onClick={stopCamera} className="p-2 bg-white/10 rounded-full text-white">
                                <X size={24} />
                            </button>
                            <span className="text-white font-bold">Scan Report</span>
                            <div className="w-10" />
                        </div>

                        <div className="flex-1 relative flex items-center justify-center bg-black">
                            <video
                                ref={element => {
                                    videoRef.current = element;
                                    if (element && cameraStream) element.srcObject = cameraStream;
                                }}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Guides */}
                            <div className="absolute inset-0 border-[40px] border-black/50 pointer-events-none">
                                <div className="w-full h-full border-2 border-white/50 relative">
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-violet-500 -mt-1 -ml-1"></div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-violet-500 -mt-1 -mr-1"></div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-violet-500 -mb-1 -ml-1"></div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-violet-500 -mb-1 -mr-1"></div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-black/50 backdrop-blur-md flex justify-center pb-12">
                            <button
                                onClick={capturePhoto}
                                className="w-20 h-20 bg-white rounded-full border-4 border-violet-500 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-105 transition-transform"
                            >
                                <div className="w-16 h-16 bg-violet-600 rounded-full"></div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden Canvas for Capture */}
            <canvas ref={canvasRef} className="hidden" />

            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ArrowLeft size={20} className="text-gray-500" />
                        </button>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                            <Receipt className="text-violet-600" /> Maryland Lottery Settlement
                        </h1>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-6">

                {/* Scanner Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Daily Report Scanner</h2>
                    <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                        Choose how you want to scan your end-of-day lottery report.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        {/* Open Camera Button */}
                        <button
                            onClick={startCamera}
                            disabled={loading}
                            className="bg-violet-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-violet-200 hover:bg-violet-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 min-w-[200px]"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Aperture />}
                            Open Camera
                        </button>

                        {/* Upload Button */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                            className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-violet-600 hover:text-violet-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 min-w-[200px]"
                        >
                            <Upload size={20} />
                            Upload Photo
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
                        >
                            <AlertCircle size={18} /> {error}
                        </motion.div>
                    )}

                    {reportImage && !loading && !error && !isCameraOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex flex-col items-center gap-4">
                            <p className="text-green-600 font-bold flex items-center justify-center gap-2">
                                <CheckCircle2 size={18} /> Report Scanned Successfully
                            </p>
                            <img src={reportImage} alt="Scanned Report" className="h-40 rounded-xl border-2 border-green-100 shadow-sm object-contain bg-gray-100" />
                            <button onClick={() => setReportImage(null)} className="text-xs text-red-500 font-bold hover:underline">Remove Image</button>
                        </motion.div>
                    )}
                </div>

                {/* Settlement Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs border-b border-gray-100 pb-2">Draw Games (Online)</h3>

                        <div>
                            <label className="block text-sm font-bold text-gray-500 mb-1">Online Sales</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                <input
                                    type="number"
                                    name="onlineSales"
                                    value={data.onlineSales}
                                    onChange={handleInputChange}
                                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-violet-600 font-bold text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-500 mb-1">Online Cashes (Payouts)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                <input
                                    type="number"
                                    name="onlineCashes"
                                    value={data.onlineCashes}
                                    onChange={handleInputChange}
                                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-violet-600 font-bold text-red-600"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs border-b border-gray-100 pb-2">Scratch-Offs (Instant)</h3>

                        <div>
                            <label className="block text-sm font-bold text-gray-500 mb-1">Instant Sales</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                <input
                                    type="number"
                                    name="instantSales"
                                    value={data.instantSales}
                                    onChange={handleInputChange}
                                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-violet-600 font-bold text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-500 mb-1">Instant Cashes (Payouts)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                <input
                                    type="number"
                                    name="instantCashes"
                                    value={data.instantCashes}
                                    onChange={handleInputChange}
                                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-violet-600 font-bold text-red-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Card */}
                <div className="bg-gray-900 text-white rounded-3xl p-8 shadow-xl shadow-violet-200/50">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-black">Net Due</h2>
                            <p className="text-gray-400 text-sm">Amount owed to Lottery</p>
                        </div>
                        <div className="p-3 bg-gray-800 rounded-2xl">
                            <Calculator className="text-violet-400" />
                        </div>
                    </div>

                    <div className="text-5xl font-black tracking-tighter mb-2">
                        ${netDue.toFixed(2)}
                    </div>

                    <div className="flex gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <span>Total Sales: ${(data.onlineSales + data.instantSales).toFixed(2)}</span>
                        <span>•</span>
                        <span>Total Payouts: ${(data.onlineCashes + data.instantCashes).toFixed(2)}</span>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default Lottery;
