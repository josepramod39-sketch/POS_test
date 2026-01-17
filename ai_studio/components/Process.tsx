
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Enter amount",
    desc: "Type the sale amount directly into the app.",
    img: "https://picsum.photos/600/800?random=11"
  },
  {
    number: "02",
    title: "Tap to sell",
    desc: "Customer taps their card or phone to your phone.",
    img: "https://picsum.photos/600/800?random=12"
  },
  {
    number: "03",
    title: "Get paid",
    desc: "Funds hit your JIM card in seconds. Done.",
    img: "https://picsum.photos/600/800?random=13"
  }
];

const Process: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
              One tap and done: <br />
              <span className="text-violet-500">you just got paid.</span>
            </h2>
            <p className="text-xl text-gray-400">
              Forget hardware setup. If you can use a smartphone, you can take card payments today.
            </p>
          </div>
          <button className="bg-white text-black px-8 py-4 pill-button font-black uppercase text-sm tracking-widest hover:bg-violet-500 hover:text-white mb-2 transition-all">
            Try it now
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group"
            >
              <div className="relative aspect-[3/4] bg-gray-900 rounded-[2rem] overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={step.img} alt={step.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-5xl font-black text-violet-500 mb-2">{step.number}</div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-snug">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
