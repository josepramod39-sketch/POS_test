
import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">Why EDITH?</h2>
          <p className="text-xl text-gray-500 max-w-lg leading-snug">
            We stripped away the complexity of traditional POS systems to give you what you actually need: speed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-gray-50 rounded-3xl hover:bg-violet-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-violet-600 shadow-sm group-hover:scale-110 transition-transform mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-2 tracking-tight">{feature.title}</h3>
              <p className="text-gray-500 leading-tight">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
