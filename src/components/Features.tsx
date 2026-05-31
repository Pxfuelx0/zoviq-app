import React from 'react';
import { motion } from 'motion/react';
import { Blocks, RotateCcw, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Features() {
  const { t } = useLanguage();

  const getFeatures = () => [
    {
      icon: <Zap className="w-5 h-5 text-white" />,
      title: t('features.f1_title'),
      text: t('features.f1_text')
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      title: t('features.f2_title'),
      text: t('features.f2_text')
    },
    {
      icon: <Blocks className="w-5 h-5 text-white" />,
      title: t('features.f3_title'),
      text: t('features.f3_text')
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-white" />,
      title: t('features.f4_title'),
      text: t('features.f4_text')
    }
  ];

  return (
    <section className="px-5 md:px-12 max-w-7xl mx-auto mb-32 relative z-20 w-full mt-12 border-t border-white/5 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {getFeatures().map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
              {React.cloneElement(feature.icon as React.ReactElement, { className: "w-5 h-5 text-white/90" })}
            </div>
            <h3 className="font-display font-medium text-[#f5f5f7] text-xl tracking-tight">{feature.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed font-sans">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
