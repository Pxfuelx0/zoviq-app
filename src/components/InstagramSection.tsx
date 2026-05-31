import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Instagram, TrendingUp, Heart } from 'lucide-react';

export function InstagramSection({ onAdd, isSubscriber }: { onAdd: (p: Product) => void, isSubscriber: boolean }) {
  const { t } = useLanguage();
  const [type, setType] = useState<'followers' | 'likes'>('followers');
  const [amount, setAmount] = useState<number>(1);

  const pricePerK = type === 'followers' ? 80 : 60;
  const originalPricePerK = type === 'followers' ? 88 : 66;

  const currentPrice = pricePerK * amount;
  const currentOriginalPrice = originalPricePerK * amount;

  const displayPrice = isSubscriber ? Math.round(currentOriginalPrice * 0.5) : currentPrice;
  const badgeText = isSubscriber ? "50% OFF (PLUS)" : "10% OFF";

  const handleAdd = () => {
    onAdd({
      id: `ig-${type}-${amount}`,
      title: `INSTAGRAM ${amount}K ${type.toUpperCase()}`,
      tagline: `Premium organic ${type} for Instagram.`,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      features: [
        'Non-drop guarantee',
        'Organic delivery',
        'Instant start',
        'No password required'
      ],
      icon: 'instagram',
    });
  };

  return (
    <section id="growth" className="px-5 md:px-12 py-24 z-10 w-full relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#9d00ff]/30 bg-[#9d00ff]/10 rounded-full mb-6"
          >
            <Instagram className="w-4 h-4 text-[#e1306c]" />
            <span className="font-sans text-xs font-medium text-white/90 uppercase tracking-widest">Social Growth</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-semibold tracking-tight mb-4"
          >
            Boost Your Digital Presence.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-lg mx-auto font-sans"
          >
            High-quality Instagram engagement delivered organically. Scale your brand instantly.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel-heavy rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#e1306c]/10 to-[#9d00ff]/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-10">
              {/* Type Selection */}
              <div>
                <h3 className="text-sm font-mono tracking-widest text-white/50 uppercase mb-4">Select Service</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setType('followers')}
                    className={`flex-1 py-4 px-4 rounded-2xl border flex items-center justify-center gap-3 transition-all ${type === 'followers' ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-[#1a1a1a] text-white/50 hover:bg-white/5'}`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold font-sans">Followers</span>
                  </button>
                  <button
                    onClick={() => setType('likes')}
                    className={`flex-1 py-4 px-4 rounded-2xl border flex items-center justify-center gap-3 transition-all ${type === 'likes' ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-[#1a1a1a] text-white/50 hover:bg-white/5'}`}
                  >
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold font-sans">Likes</span>
                  </button>
                </div>
              </div>

              {/* Amount Slider */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-sm font-mono tracking-widest text-white/50 uppercase">Quantity</h3>
                  <span className="text-2xl font-display font-medium text-white">{amount}K</span>
                </div>
                
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  className="w-full h-2 glass-panel rounded-full appearance-none cursor-pointer accent-white"
                />
                
                <div className="flex justify-between mt-3 text-xs font-mono text-white/30">
                  <span>1K</span>
                  <span>50K</span>
                </div>
              </div>
            </div>

            {/* Price Preview */}
            <div className="flex flex-col justify-center items-start md:items-end">
              <div className="text-left md:text-right w-full bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                <div className="flex justify-between md:justify-end gap-3 items-center mb-6">
                  <span className="text-sm font-sans text-white/60">Total Investment</span>
                  <div className="bg-white/10 text-white font-sans text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 uppercase border border-white/10">
                    <span className="w-1.5 h-1.5 bg-[#ff3b30] rounded-full block animate-pulse"></span> {badgeText}
                  </div>
                </div>

                <div className="flex items-baseline md:justify-end gap-2 mb-2">
                  <span className="text-xs text-[#ff453a] line-through mr-2">{currentOriginalPrice} DH</span>
                </div>
                <div className="flex items-baseline md:justify-end gap-2 mb-8">
                  <AnimatePresence mode="popLayout">
                    <motion.span 
                      key={displayPrice}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="text-6xl font-display font-medium tracking-tight text-white"
                    >
                      {displayPrice}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm text-white/40 font-mono tracking-widest uppercase">DH</span>
                </div>

                <button 
                  onClick={handleAdd}
                  className="w-full py-4 bg-white text-black rounded-xl font-sans text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  {t('product.add')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
