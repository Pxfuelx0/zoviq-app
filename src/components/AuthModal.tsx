import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Mail, Lock } from 'lucide-react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { dir, t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (!res.user.emailVerified) {
          toast.warning('Please verify your email. A new link has been sent if needed.');
        } else {
          toast.success('Logged in successfully');
        }
      } else {
        if (!name.trim()) throw new Error('Name is required');
        const res = await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(res.user, { displayName: name }).catch(console.warn);
        setDoc(doc(db, 'users', res.user.uid), {
          name: name,
          email: email,
          createdAt: new Date().toISOString(),
          isSubscriber: false
        }, { merge: true }).catch(console.warn);
        sendEmailVerification(res.user).catch(console.warn);
        toast.success('Account created! A verification link has been sent to your email.');
      }
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        toast.error('Email/Password login is not enabled. Please enable it in Firebase Console.');
      } else if (err.code === 'auth/email-already-in-use') {
        toast.error('An account already exists with this email. Please log in.');
      } else {
        toast.error(err.message || 'Authentication error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-sm glass rounded-3xl shadow-2xl flex flex-col max-h-[90vh]"
            dir={dir}
          >
            <div className={`p-5 md:p-8 border-b border-white/10 shrink-0 flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-2xl font-display font-medium text-white">
                {isLogin ? t('auth.signIn') : t('auth.signUp')}
              </h2>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <UserIcon className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} w-5 h-5 text-white/40`} />
                    <input
                      type="text"
                      placeholder={t('auth.fullName')}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full bg-white/[0.03] border border-white/10 text-white font-sans text-base ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 rounded-xl focus:outline-none focus:border-white/30 placeholder:text-white/30 transition-colors`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="relative">
                <Mail className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} w-5 h-5 text-white/40`} />
                <input
                  type="email"
                  placeholder={t('auth.email')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-white/[0.03] border border-white/10 text-white font-sans text-base ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 rounded-xl focus:outline-none focus:border-white/30 placeholder:text-white/30 transition-colors`}
                />
              </div>
              
              <div className="relative">
                <Lock className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} w-5 h-5 text-white/40`} />
                <input
                  type="password"
                  placeholder={t('auth.password')}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-white/[0.03] border border-white/10 text-white font-sans text-base ${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3.5 rounded-xl focus:outline-none focus:border-white/30 placeholder:text-white/30 transition-colors`}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-medium py-3.5 rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
              >
                {loading ? t('auth.wait') : (isLogin ? t('auth.signIn') : t('auth.signUp'))}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button onClick={() => setIsLogin(!isLogin)} className="text-sm font-sans text-white/50 hover:text-white transition-colors">
                {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}
              </button>
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
