
import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic">
            "The reviews are wild."
          </h2>
          <p className="text-xl text-gray-500">The results? Even better.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#8B5CF6" className="text-violet-600" />
                  ))}
                </div>
                <p className="text-lg font-medium text-gray-800 mb-8 leading-tight">"{t.content}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img src={`https://picsum.photos/100/100?random=${idx + 20}`} alt={t.name} className="w-12 h-12 rounded-full grayscale" />
                <div>
                  <div className="font-black text-sm uppercase tracking-wider">{t.name}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
