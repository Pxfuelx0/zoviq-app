import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Monitor, LogOut, Package, CreditCard, Globe, Save } from 'lucide-react';
import { signOut, User, deleteUser } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useLanguage, Language } from '../context/LanguageContext';
import { toast } from 'sonner';

export function SettingsModal({ isOpen, onClose, user }: { isOpen: boolean, onClose: () => void, user: User | null }) {
  const { language, setLanguage, t, dir } = useLanguage();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedLang, setSelectedLang] = useState<Language>(language);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState('');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  useEffect(() => {
    setSelectedLang(language);
    if (user?.displayName) {
      setName(user.displayName);
    }
  }, [language, isOpen, user]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme as 'dark' | 'light');
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  useEffect(() => {
    if (user && isOpen) {
      getDoc(doc(db, 'users', user.uid)).then(d => {
        if (d.exists()) {
          setUserData(d.data());
        }
      }).catch(err => {
        console.warn('Failed to fetch user data:', err);
      });
    }
  }, [user, isOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (user && name.trim() !== '' && name !== user.displayName) {
        const { updateProfile } = await import('firebase/auth');
        const { doc, updateDoc } = await import('firebase/firestore');
        await updateProfile(user, { displayName: name });
        await updateDoc(doc(db, 'users', user.uid), { name: name });
      }
      setLanguage(selectedLang);
      toast.success(t?.('settings.save') + ' ✓' || 'Saved');
    } catch (error: any) {
      toast.error('Error saving settings: ' + (error.message || 'Unknown error'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  if (!user) return null;

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl glass-panel-heavy rounded-3xl shadow-2xl flex flex-col max-h-[90vh] glass"
            dir={dir}
          >
            <div className={`p-5 md:p-8 border-b border-white/10 shrink-0 flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-2xl font-display font-medium text-white">{t('header.settings') || 'Settings'}</h2>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 md:p-8">
              <div className={`flex items-center gap-4 mb-8 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}>
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-16 h-16 rounded-full border border-white/20" />
              ) : (
                <div className="w-16 h-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0">
                  <UserIcon className="w-8 h-8 text-white/50" />
                </div>
              )}
              <div className={dir === 'rtl' ? 'mr-auto ml-0' : ''}>
                <h2 className="text-2xl font-medium tracking-tight text-white mb-1">{name || user.displayName || t('admin.anonymous')}</h2>
                <p className="text-white/40 text-sm font-mono">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className={`flex items-center justify-between mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <h3 className="text-sm font-mono tracking-widest uppercase text-white/70">{t('settings.plan')}</h3>
                  <CreditCard className="w-4 h-4 text-[#00c4cc]" />
                </div>
                {userData?.isSubscriber ? (
                  <div className={dir === 'rtl' ? 'text-right' : ''}>
                    <div className="text-lg font-bold text-[#00c4cc] mb-1">{t('settings.zoviqPlus')}</div>
                    <div className="text-xs text-white/40">{t('settings.activeSub')}</div>
                  </div>
                ) : (
                  <div className={dir === 'rtl' ? 'text-right' : ''}>
                    <div className="text-lg font-bold text-white mb-1">{t('settings.standard')}</div>
                    <div className="text-xs text-white/40 mb-3">{t('settings.noSub')}</div>
                    <button onClick={onClose} className="text-[10px] font-mono tracking-widest uppercase bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">{t('settings.upgrade')}</button>
                  </div>
                )}
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div className={`flex items-center justify-between mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <h3 className="text-sm font-mono tracking-widest uppercase text-white/70">{t('settings.title')}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className={`flex flex-col gap-2 ${dir === 'rtl' ? 'text-right' : ''}`}>
                    <label className="text-sm text-white/80">{t('auth.fullName') || 'Name'}</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className={`w-full bg-white/10 border border-white/20 text-white font-sans text-base px-3 py-2 rounded-lg focus:outline-none focus:border-white/40 transition-colors ${dir === 'rtl' ? 'text-right' : ''}`}
                    />
                  </div>

                  <div className={`flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <Monitor className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/80">{t('settings.theme')}</span>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      className="px-3 py-1 bg-white/10 rounded text-xs font-mono uppercase tracking-widest hover:bg-white/20"
                    >
                      {theme}
                    </button>
                  </div>

                  <div className={`flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <Globe className="w-4 h-4 text-white/60" />
                      <span className="text-sm text-white/80">{t('settings.language')}</span>
                    </div>
                    <select 
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value as Language)}
                      className="px-3 py-1 bg-white/10 rounded text-xs font-mono uppercase tracking-widest hover:bg-white/20 outline-none appearance-none cursor-pointer text-white"
                      dir={dir}
                    >
                      <option value="en" className="bg-[#080809]">English</option>
                      <option value="fr" className="bg-[#080809]">Français</option>
                      <option value="ar" className="bg-[#080809]">العربية</option>
                    </select>
                  </div>
                  
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-sans font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? t('auth.wait') : t('settings.save')}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <div className={`flex items-center justify-between mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <h3 className="text-sm font-mono tracking-widest uppercase text-white/70">{t('settings.orders') || 'Orders & Security'}</h3>
                <Package className="w-4 h-4 text-white/40" />
              </div>
              {!user.emailVerified && (
                <div className={`flex flex-col gap-3 py-4 border-b border-white/10 text-sm ${dir === 'rtl' ? 'text-right' : ''}`}>
                  <p className="text-[#ff9f0a]">Your email is not verified.</p>
                  <button 
                    onClick={async () => {
                      try {
                        const { sendEmailVerification } = await import('firebase/auth');
                        await sendEmailVerification(user);
                        alert('Verification email sent! Please check your inbox and spam folder.');
                      } catch (err: any) {
                        alert('Error sending email: ' + err.message);
                      }
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors w-fit rounded-lg font-medium text-white/90"
                  >
                    Resend Verification Email
                  </button>
                </div>
              )}
              <div className="text-center py-6 text-white/40 text-sm italic">
                {t('settings.noOrders')}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex justify-between items-center">
              <button 
                onClick={handleLogout}
                className={`flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors font-medium ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}
              >
                <LogOut className="w-4 h-4" />
                {t('settings.logout')}
              </button>
              {isConfirmingDelete ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50">Are you sure?</span>
                  <button 
                    onClick={() => setIsConfirmingDelete(false)}
                    className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 text-white"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={async () => {
                      try {
                        const userDocRef = doc(db, 'users', user.uid);
                        let backupData: any = null;
                        
                        try {
                          const userDocSnap = await getDoc(userDocRef);
                          backupData = userDocSnap.data();
                          // Attempt to delete firestore doc first (while they still have auth)
                          await deleteDoc(userDocRef);
                        } catch (firestoreError: any) {
                          console.warn('Firestore deletion skipped or failed (offline or permissions):', firestoreError);
                        }
                        
                        try {
                          // Delete Auth user
                          const { deleteUser } = await import('firebase/auth');
                          await deleteUser(user);
                          toast.success('Account completely deleted');
                          onClose();
                        } catch (authError: any) {
                          // Restore the doc if auth deletion failed and we have a backup
                          if (backupData) {
                            try {
                              const { setDoc } = await import('firebase/firestore');
                              await setDoc(userDocRef, backupData);
                            } catch (restoreError) {
                              console.error('Failed to restore document:', restoreError);
                            }
                          }
                          throw authError; // throw down to outer catch
                        }
                      } catch (error: any) {
                        if (error.code === 'auth/requires-recent-login' || (error.message && error.message.includes('requires-recent-login'))) {
                          toast.error('Security requirement: Please sign in again to verify your identity before deleting your account.');
                          try {
                             await signOut(auth);
                             onClose();
                          } catch(e) {}
                        } else {
                          toast.error('Error deleting account: ' + (error.message || 'Unknown error'));
                        }
                      } finally {
                        setIsConfirmingDelete(false);
                      }
                    }}
                    className="text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 font-medium whitespace-nowrap"
                  >
                    Confirm Delete
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsConfirmingDelete(true)}
                  className={`flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors font-medium ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}
                >
                  Delete Account
                </button>
              )}
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
