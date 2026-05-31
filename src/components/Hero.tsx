import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MoveRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={containerRef} className="relative min-h-[85vh] flex flex-col justify-center px-5 md:px-12 max-w-7xl mx-auto pt-32 pb-8 z-10 w-full overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full" />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 glass"
        >
          <Sparkles className="w-[14px] h-[14px] text-white/70" />
          <span className="font-sans text-[11px] font-medium text-white/70 tracking-wide uppercase">{t('hero.badge')}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] font-display font-bold tracking-tight mb-8"
        >
          <span className="text-gradient block">{t('hero.title.1')}</span>
          <span className="text-white relative z-10">{t('hero.title.2')}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl text-center leading-relaxed mb-6 font-sans"
        >
          {t('hero.subtitle')}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-xs font-mono text-white/30 uppercase tracking-widest mb-12"
        >
          Made by Yassine Harzami
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-5 items-center"
        >
          <a onClick={(e) => { e.preventDefault(); document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }); }} href="#collections" className="relative cursor-pointer bg-white text-black font-medium text-lg px-8 py-4 rounded-xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center text-center">
            <span className="relative z-10">{t('hero.cta')}</span>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
          </a>
          <a onClick={(e) => { e.preventDefault(); document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }); }} href="#reviews" className="cursor-pointer glass px-8 py-4 rounded-xl font-sans text-lg font-medium text-white hover:bg-white/5 active:scale-[0.98] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group">
            {t('nav.trust')} 
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-70" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
