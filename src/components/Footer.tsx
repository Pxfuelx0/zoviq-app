import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Footer({ onOpenLegal }: { onOpenLegal: (type: 'terms' | 'privacy' | 'refund') => void }) {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-white/10 py-12 px-5 md:px-12 mt-20 relative z-10 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-black rounded-full block"></span>
            </span>
            <span className="font-display tracking-tight font-medium text-lg text-white">Zoviq</span>
          </div>
          <p className="text-white/40 text-sm font-sans text-center md:text-left">
            {t('footer.rights').replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-6 text-white/60">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-center md:text-right text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-white/40 font-medium tracking-wide uppercase text-xs mb-1">{t('footer.contact')}</span>
              <a href="mailto:yassineharzami19@gmail.com" className="hover:text-white transition-colors">yassineharzami19@gmail.com</a>
              <a href="tel:+212627130042" className="hover:text-white transition-colors">06 27 13 00 42</a>
              <a href="https://instagram.com/xnoviq" className="hover:text-white transition-colors">@xnoviq (Tech/Bugs)</a>
              <a href="https://instagram.com/zoviq" className="hover:text-white transition-colors">@zoviq (Business)</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white/40 font-medium tracking-wide uppercase text-xs mb-1">{t('footer.legal')}</span>
              <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors text-left md:text-right">{t('footer.terms')}</button>
              <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors text-left md:text-right">{t('footer.privacy')}</button>
              <button onClick={() => onOpenLegal('refund')} className="hover:text-white transition-colors text-left md:text-right">{t('footer.refund')}</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
