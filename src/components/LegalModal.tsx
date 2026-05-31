import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function LegalModal({ isOpen, onClose, type }: { isOpen: boolean, onClose: () => void, type: 'terms' | 'privacy' | 'refund' | null }) {
  const { dir } = useLanguage();

  if (!isOpen || !type) return null;

  const content = {
    terms: {
      title: "Terms and Conditions",
      text: `Welcome to Zoviq. By accessing our services, you agree to these terms.
      
1. Services
Zoviq provides premium digital services, subscriptions, and social growth packages. All services are delivered as described.

2. Payments
All payments are processed securely. Zoviq Plus subscriptions are billed monthly. You can cancel at any time through your dashboard.

3. Account Responsibilities
You are responsible for maintaining the security of your account. We will never ask for your Instagram or Netflix passwords for our services.

4. Legal Restrictions
You may not use our services for any illegal or unauthorized purpose.

Last updated: ${new Date().toLocaleDateString()}`
    },
    privacy: {
      title: "Privacy Policy",
      text: `Your privacy is important to us at Zoviq.

1. Information We Collect
We collect minimal information required to provide our services: your name and email address.

2. How We Use Information
We use your information only for account management and service delivery. We do not sell your data to third parties.

3. Data Security
Your data is securely stored using industry-standard encryption provided by Firebase.

4. Account Deletion
You have the right to request deletion of your account and all associated data at any time from your account settings.

Last updated: ${new Date().toLocaleDateString()}`
    },
    refund: {
      title: "Refund Policy",
      text: `Zoviq Refund Policy

1. Digital Services
Due to the digital nature of our services (Streaming Accounts, Social Growth), all sales are generally final once delivery has begun.

2. Exceptions
Refunds may be issued if:
- The service was not delivered as described within the promised timeframe.
- There is a technical fault on our end preventing delivery.

3. Subscription Cancellations
You can cancel your Zoviq Plus subscription at any time. Cancellations apply to the next billing cycle. Past charges will not be refunded.

Contact support for any refund requests with proof of payment.

Last updated: ${new Date().toLocaleDateString()}`
    }
  };

  const currentContent = content[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-2xl z-[110] glass-panel-heavy rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            dir={dir}
          >
            <div className={`flex justify-between items-center p-5 md:p-8 border-b border-white/10 shrink-0 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-2xl font-display font-medium text-white">{currentContent.title}</h2>
              <button 
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 md:p-8 text-white/80 font-sans text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {currentContent.text}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
