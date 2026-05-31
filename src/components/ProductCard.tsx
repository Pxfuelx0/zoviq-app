import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const ProductCard: React.FC<{ product: Product, onAdd: (p: Product) => void, isSubscriber: boolean }> = ({ product, onAdd, isSubscriber }) => {
  const { t } = useLanguage();
  const displayPrice = isSubscriber ? Math.round(product.originalPrice * 0.5) : product.price;
  const badgeText = isSubscriber ? "50% OFF (PLUS)" : "10% OFF";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-panel rounded-[2.5rem] p-8 md:p-12 w-full flex flex-col md:flex-row gap-8 justify-between transition-all hover:bg-white/[0.02] shadow-lg hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="flex-1">
        <div className="flex justify-between items-start mb-8">
          <span className="font-mono text-[10px] text-white/40 uppercase">00{product.id.replace('p', '')} / {product.icon}</span>
          
          <div className="bg-white text-black font-sans text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-2 uppercase shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <span className="w-2 h-2 bg-[#ff3b30] rounded-full block animate-pulse"></span> {badgeText}
          </div>
        </div>
        
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 shrink-0 shadow-inner">
            {product.icon === 'google' && (
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-10 h-10 object-contain" />
            )}
            {product.icon === 'canva' && (
              <span className="font-display font-bold text-xl tracking-tight text-white/90">Canva</span>
            )}
            {product.icon === 'apple' && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="32" height="32" fill="currentColor" className="text-white/90">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
            )}
            {product.icon === 'instagram' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e1306c]">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-3xl font-display font-semibold tracking-tight text-[#f5f5f7] mb-2">{product.title}</h3>
            <p className="text-base text-white/50 leading-relaxed font-sans">{product.tagline}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 space-y-4 flex-1 flex flex-col justify-between">
        <ul className="space-y-4 mb-8 glass-panel-heavy p-6 md:p-8 rounded-[2rem]">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-center gap-4 text-sm text-white/70 font-sans">
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full flex-shrink-0"></span> {f}
            </li>
          ))}
        </ul>
        
        <div className="pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-6 mt-auto">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-sm text-[#ff453a] line-through mb-1">{product.originalPrice} DH</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-semibold text-white">{displayPrice}</span>
              <span className="text-xs text-white/40 font-mono tracking-widest uppercase">DH</span>
            </div>
          </div>
          
          <button 
            onClick={() => onAdd(product)}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-sans text-sm font-bold hover:bg-white/90 active:scale-95 transition-all text-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {t('product.add')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
