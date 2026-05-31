import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function TrustPolicy() {
  const [openIndex, setIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const getPolicies = () => [
    {
      title: t('trust.t1_title'),
      content: t('trust.t1_text')
    },
    {
      title: t('trust.t2_title'),
      content: t('trust.t2_text')
    },
    {
      title: t('trust.t3_title'),
      content: t('trust.t3_text')
    },
    {
      title: t('trust.t4_title'),
      content: t('trust.t4_text')
    }
  ];

  return (
    <section className="px-5 md:px-12 max-w-3xl mx-auto mb-32 relative z-20 w-full pt-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl md:text-5xl font-display font-semibold tracking-[-0.04em] mb-12 text-center text-[#f5f5f7]"
      >
        {t('trust.title')}
      </motion.h2>

      <div className="space-y-3">
        {getPolicies().map((policy, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="glass-panel rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-all"
            >
              <button 
                onClick={() => setIndex(isOpen ? null : index)}
                className="w-full px-8 py-6 flex justify-between items-center text-left"
              >
                <span className="font-display font-medium text-[15px] text-[#f5f5f7] tracking-tight">{policy.title}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white/50"
                >
                  <span className="block w-3 h-[1.5px] bg-[#a1a1a6] absolute"></span>
                  {!isOpen && <span className="block w-[1.5px] h-3 bg-[#a1a1a6] absolute"></span>}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-8 pb-8 pt-0 font-sans text-sm text-white/50 leading-relaxed max-w-2xl">
                      {policy.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
