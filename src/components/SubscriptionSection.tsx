import React from 'react';
import { motion } from 'motion/react';
import { Check, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function SubscriptionSection({ isSubscriber, onSubscribe }: { isSubscriber: boolean, onSubscribe: () => void }) {
  const { t, dir } = useLanguage();

  return (
    <section className="px-5 md:px-12 py-24 z-10 w-full relative border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#0066ff]/30 bg-[#0066ff]/10 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-[#0066ff]" />
            <span className="font-sans text-xs font-medium text-white/90 uppercase tracking-widest">{t('subscription.badge')}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-semibold tracking-tight mb-4"
          >
            {t('subscription.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-lg mx-auto font-sans"
          >
            {t('subscription.desc')}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto glass-panel-heavy rounded-3xl p-8 relative overflow-hidden text-center border-white/10 shadow-[0_0_50px_rgba(0,102,255,0.1)]"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-[#0066ff]/20 to-[#7d2ae8]/20 blur-[80px] pointer-events-none rounded-full" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-display font-semibold mb-2">Zoviq Plus</h3>
            <p className="text-white/50 text-sm font-sans mb-8">{t('subscription.monthly')}</p>
            
            <div className="flex items-baseline justify-center gap-2 mb-8">
              <span className="text-6xl font-display font-medium tracking-tight text-white">50</span>
              <span className="text-sm text-white/40 font-mono tracking-widest uppercase">{t('subscription.currency')}</span>
            </div>

            <ul className="space-y-4 mb-8 text-left max-w-xs mx-auto">
              {[
                t('subscription.f1'),
                t('subscription.f2'),
                t('subscription.f3'),
                t('subscription.f4')
              ].map((feature, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm text-white/80 font-sans ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-5 h-5 rounded-full bg-[#0066ff]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#0066ff]" />
                  </div>
                  <span className={dir === 'rtl' ? 'text-right flex-1' : ''}>{feature}</span>
                </li>
              ))}
            </ul>

            {isSubscriber ? (
              <button 
                disabled
                className="w-full py-4 bg-white/10 text-white/50 rounded-xl font-sans text-sm font-semibold transition-all"
              >
                {t('subscription.subscribed')}
              </button>
            ) : (
              <button 
                onClick={onSubscribe}
                className="w-full py-4 bg-gradient-to-r from-[#0066ff] to-[#7d2ae8] text-white rounded-xl font-sans text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#0066ff]/20"
              >
                {t('subscription.add')}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
