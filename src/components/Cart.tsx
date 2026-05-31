import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

import { toast } from 'sonner';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  isSubscriber: boolean;
}

export function Cart({ isOpen, onClose, items, onRemove, isSubscriber }: CartProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { t } = useLanguage();
  
  const getPrice = (item: CartItem) => isSubscriber ? Math.round(item.originalPrice * 0.5) : item.price;
  const subtotal = items.reduce((sum, item) => sum + getPrice(item), 0);

  const handleCheckout = () => {
    if (!name || !email) {
      toast.error(t('cart.fillDetails'));
      return;
    }
    const orderItems = items.map(i => `- ${i.title} (${getPrice(i)} DH)`).join('%0A');
    const message = `*NEW ZOVIQ ORDER*%0A%0A*Customer:* ${name}%0A*Email:* ${email}%0A%0A*Requested Vaults:*%0A${orderItems}%0A%0A*Total Investment:* ${subtotal} DH`;
    window.open(`https://wa.me/212627130042?text=${message}`, '_blank');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 250, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[480px] z-[60] glass-panel-heavy shadow-2xl flex flex-col p-6 sm:p-8"
          >
            <div className="flex justify-between items-center mb-6 sm:mb-12">
              <h2 className="text-2xl font-display font-medium tracking-tight text-[#f5f5f7]">{t('cart.title')}</h2>
              <button onClick={onClose} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                <X strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-white/40 text-sm mt-32 font-sans"
                  >
                    {t('cart.empty')}
                  </motion.div>
                ) : (
                  items.map((item, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={`${item.id}-${index}`}
                      className="flex justify-between items-center glass-panel p-5 rounded-2xl group hover:bg-white/[0.04] transition-colors"
                    >
                      <div>
                        <div className="font-display font-medium text-[#f5f5f7] text-[15px]">{item.title}</div>
                        <div className="text-white/40 text-[13px] mt-1">{getPrice(item)} DH</div>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-4"
              >
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder={t('auth.fullName')} 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-panel text-[#f5f5f7] font-sans text-base px-5 py-4 rounded-xl focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/30"
                  />
                  <input 
                    type="email" 
                    placeholder={t('auth.email')} 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-panel text-[#f5f5f7] font-sans text-base px-5 py-4 rounded-xl focus:outline-none focus:border-white/20 transition-colors placeholder:text-white/30"
                  />
                </div>

                <div className="pt-6 border-t border-[#1a1a1a] mt-6">
                  <div className="flex justify-between font-sans text-sm mb-6 text-white/50">
                    <span>{t('cart.subtotal')}</span>
                    <span className="text-[#f5f5f7] font-medium">{subtotal} DH</span>
                  </div>
                  <a 
                    href={(!name || !email) ? '#' : `https://wa.me/212627130042?text=${encodeURIComponent(`*NEW ZOVIQ ORDER*\n\n*Customer:* ${name}\n*Email:* ${email}\n\n*Requested Vaults:*\n${items.map(i => `- ${i.title} (${getPrice(i)} DH)`).join('\n')}\n\n*Total Investment:* ${subtotal} DH`)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      if (!name || !email) {
                        e.preventDefault();
                        toast.error(t('cart.fillDetails'));
                      }
                    }}
                    className="flex items-center justify-center w-full py-4 bg-white text-black rounded-xl text-sm font-sans font-semibold hover:bg-white/90 active:scale-95 transition-all text-center"
                  >
                    {t('cart.checkout')}
                  </a>
                </div>
              </motion.div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
