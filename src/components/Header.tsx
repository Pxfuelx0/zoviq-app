import React from 'react';
import { ShoppingBag, User as UserIcon, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { User } from 'firebase/auth';
import { useLanguage } from '../context/LanguageContext';

export function Header({ cartCount, onOpenCart, onDirectLogin, onOpenSettings, onOpenAdmin, user }: { cartCount: number, onOpenCart: () => void, onDirectLogin: () => void, onOpenSettings: () => void, onOpenAdmin: () => void, user: User | null }) {
  const { t } = useLanguage();
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-5xl z-50 liquid-glass-nav rounded-full px-5 md:px-8 py-3 md:py-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full hover:scale-105 transition-transform cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)] bg-gradient-to-tr from-white/20 to-white/5 border border-white/10">
          <div className="w-4 h-4 bg-white transform rotate-45 rounded-sm shadow-inner opacity-90"></div>
        </div>
        <span className="font-display tracking-tight font-medium text-sm text-white hover:text-white/80 transition-colors cursor-pointer">ZOVIQ</span>
      </div>
      <div className="hidden md:flex gap-8 items-center cursor-pointer">
        <a href="#collections" onClick={(e) => { e.preventDefault(); document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' }); }} className="font-sans text-xs font-medium text-white/50 hover:text-white transition-opacity">{t('nav.products')}</a>
        <a href="#growth" onClick={(e) => { e.preventDefault(); document.getElementById('growth')?.scrollIntoView({ behavior: 'smooth' }); }} className="font-sans text-xs font-medium text-white/50 hover:text-white transition-opacity">Growth</a>
        <a href="#reviews" onClick={(e) => { e.preventDefault(); document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }); }} className="font-sans text-xs font-medium text-white/50 hover:text-white transition-opacity">{t('nav.trust')}</a>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        {user?.email === 'yassineharzami19@gmail.com' && (
          <button onClick={onOpenAdmin} className="flex items-center gap-2 px-2 md:px-3 py-1.5 border border-red-500/30 rounded-full hover:bg-red-500/10 active:scale-95 transition-all text-red-400">
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden md:inline font-sans font-medium text-xs">{t('nav.admin')}</span>
          </button>
        )}
        {user ? (
          <button onClick={onOpenSettings} className="flex items-center gap-2 px-2 md:px-3 py-1.5 border border-white/10 rounded-full hover:bg-white/5 active:scale-95 transition-all w-8 md:w-auto overflow-hidden justify-center">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-5 h-5 rounded-full" />
            ) : (
              <UserIcon className="w-4 h-4 text-white/70" />
            )}
            <span className="hidden md:inline font-sans font-medium text-xs text-white/80 shrink-0">{user.displayName?.split(' ')[0] || 'User'}</span>
          </button>
        ) : (
          <button onClick={onDirectLogin} className="px-3 md:px-4 py-2 border border-white/10 rounded-full font-sans text-xs font-medium text-white/80 hover:bg-white/5 active:scale-95 transition-all flex items-center justify-center">
            <span className="hidden md:inline">{t('nav.login')}</span>
            <UserIcon className="w-4 h-4 md:hidden text-white/80" />
          </button>
        )}
        <div className="hidden md:block h-4 w-[1px] bg-white/10"></div>
        <button 
          onClick={onOpenCart}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full font-sans text-xs font-medium bg-white text-black hover:bg-white/90 active:scale-95 transition-all shadow-sm"
        >
          {t('nav.cart')} <span className="opacity-50">({cartCount})</span>
        </button>
      </div>
    </motion.nav>
  );
}
