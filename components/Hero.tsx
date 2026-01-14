
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <span className="inline-block px-3 py-1 bg-violet-100 text-violet-700 text-xs font-black uppercase tracking-widest rounded-full mb-6">
            1.99% PER SALE
          </span>
          <h1 className="text-7xl lg:text-9xl font-black text-display mb-8 tracking-tighter leading-none">
            Your phone <br /> 
            <span className="text-violet-600">is your POS.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-lg leading-tight">
            Accept contactless card payments in seconds using just your smartphone. No hardware, no waiting, no hidden fees with E.D.I.T.H Rp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-violet-600 text-white px-10 py-5 pill-button text-lg font-bold shadow-xl shadow-violet-200 hover:bg-violet-700">
              Get started now
            </button>
            <div className="flex -space-x-3 items-center mt-4 sm:mt-0 sm:ml-6">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i}
                  src={`https://picsum.photos/100/100?random=${i}`} 
                  className="w-10 h-10 rounded-full border-2 border-white grayscale hover:grayscale-0 transition-all cursor-pointer"
                  alt="User"
                />
              ))}
              <span className="ml-6 text-sm font-bold text-gray-500">JOIN 50K+ SELLERS</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Mockup Container */}
          <div className="relative z-10 mx-auto w-full max-w-[320px] aspect-[9/19] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800">
             <div className="h-full w-full bg-gray-900 rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-6">
                <div className="mt-8">
                  <div className="text-gray-400 text-xs font-bold uppercase mb-1">Enter Amount</div>
                  <div className="text-white text-5xl font-black">$45.00</div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center items-center gap-4">
                   <div className="w-20 h-20 bg-violet-600 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                   </div>
                   <div className="text-center">
                     <div className="text-white font-bold text-lg">Waiting for tap</div>
                     <div className="text-gray-500 text-xs">Hold card near back of phone</div>
                   </div>
                </div>

                <div className="mb-4 pt-4 border-t border-gray-800 flex justify-between text-xs font-bold text-gray-500">
                   <span>EDITH PAY</span>
                   <div className="flex gap-1">
                      <div className="w-4 h-2 bg-gray-700 rounded-full"></div>
                      <div className="w-4 h-2 bg-violet-600 rounded-full"></div>
                      <div className="w-4 h-2 bg-gray-700 rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>
          {/* Background Decorative Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-violet-50 rounded-full -z-10 blur-3xl opacity-50"></div>
        </motion.div>
      </div>
      
      {/* Logos Bar */}
      <div className="absolute bottom-0 left-0 right-0 py-8 bg-gray-50 border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-6 overflow-hidden">
            <div className="flex items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none">
               <span className="font-black text-xl italic">VISA</span>
               <span className="font-black text-xl italic">Mastercard</span>
               <span className="font-black text-xl italic">Apple Pay</span>
               <span className="font-black text-xl italic">Google Pay</span>
            </div>
         </div>
      </div>
    </section>
  );
};

export default Hero;
