import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Reviews() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const reviewsList = [
    { name: t('reviews.r1_name'), text: t('reviews.r1_text') },
    { name: t('reviews.r2_name'), text: t('reviews.r2_text') },
    { name: t('reviews.r3_name'), text: t('reviews.r3_text') },
    { name: t('reviews.r4_name'), text: t('reviews.r4_text') }
  ];

  return (
    <section id="reviews" className="px-5 md:px-12 max-w-7xl mx-auto mb-32 relative z-20 w-full mt-20 overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute inset-x-0 top-1/4 bottom-0 z-0 flex items-center justify-center pointer-events-none opacity-50">
        <div className="w-[300px] h-[300px] bg-white/[0.02] blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight mb-16 text-center text-white"
        >
          {t('reviews.title') || 'Trusted by professionals.'}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviewsList.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between min-h-[220px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-500 pointer-events-none" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-white text-white" />)}
              </div>
              <p className="text-base text-white/70 leading-relaxed font-sans mb-8">"{review.text}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <span className="text-white font-medium text-lg">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-display font-medium text-sm text-white">{review.name}</div>
                  <div className="font-sans text-[11px] text-white/40 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#00c4cc]" />
                    {t('reviews.verified') || 'مشتري مؤكد'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
