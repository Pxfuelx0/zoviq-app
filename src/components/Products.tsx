import React from 'react';
import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

export function Products({ onAdd, isSubscriber }: { onAdd: (p: Product) => void, isSubscriber: boolean }) {
  const { t } = useLanguage();
  return (
    <section id="collections" className="flex-grow px-5 md:px-12 pb-12 z-10 max-w-7xl mx-auto w-full">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl md:text-5xl font-display font-semibold tracking-[-0.04em] text-[#f5f5f7] mb-12"
      >
        {t('products.title') || 'The Collections'}
      </motion.h2>
      
      <div className="flex justify-center max-w-3xl mx-auto">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} isSubscriber={isSubscriber} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 text-center border-t border-[#1a1a1a] pt-16 flex flex-col items-center"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full glass-panel shadow-sm mb-6">
          <span className="font-sans font-light text-xl text-white/70">+</span>
        </div>
        <h3 className="font-display font-medium text-xl text-[#f5f5f7] mb-2">{t('products.start') || 'This is just a start.'}</h3>
        <p className="text-white/50 font-sans text-sm">{t('products.more') || 'Way more is coming soon.'}</p>
      </motion.div>
    </section>
  );
}
