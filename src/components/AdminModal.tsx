import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Calendar, User as UserIcon } from 'lucide-react';
import { User } from 'firebase/auth';
import { collection, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useLanguage } from '../context/LanguageContext';

export function AdminModal({ isOpen, onClose, user }: { isOpen: boolean, onClose: () => void, user: User | null }) {
  const { t, dir } = useLanguage();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void;
    if (isOpen && user?.email === 'yassineharzami19@gmail.com') {
      try {
        unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
          const usersList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setUsers(usersList.sort((a: any, b: any) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          }));
          setLoading(false);
        }, (error) => {
          console.error('Error fetching users:', error);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error setting up onSnapshot:', error);
        setLoading(false);
      }
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isOpen, user]);

  if (!user || user.email !== 'yassineharzami19@gmail.com') return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-4xl z-[110] glass-panel-heavy rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            <div className="flex justify-between items-center p-5 md:p-8 border-b border-white/10 shrink-0">
              <h2 className="text-2xl font-display font-medium text-white">{t('admin.title') || 'Admin Dashboard'}</h2>
              <button 
                onClick={onClose}
                className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-[#00c4cc] rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse" dir={dir}>
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 text-sm font-sans">
                        <th className="pb-4 font-normal">{t('admin.name') || 'Name'}</th>
                        <th className="pb-4 font-normal">{t('admin.email') || 'Email'}</th>
                        <th className="pb-4 font-normal">Subscription</th>
                        <th className="pb-4 font-normal">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {users.map((u) => (
                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                <UserIcon className="w-4 h-4 text-white/40" />
                              </div>
                              <span className="text-white font-medium">{u.name || t('admin.anonymous')}</span>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2 text-white/70">
                              <Mail className="w-4 h-4 text-white/30" />
                              {u.email || t('admin.noEmail')}
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              {u.isSubscriber ? (
                                <span className="px-2 py-1 bg-[#00c4cc]/20 text-[#00c4cc] rounded text-xs font-medium">Subscribed</span>
                              ) : (
                                <span className="px-2 py-1 bg-white/10 text-white/50 rounded text-xs font-medium">Standard</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4">
                            <button 
                              onClick={async () => {
                                try {
                                  await updateDoc(doc(db, 'users', u.id), {
                                    isSubscriber: !u.isSubscriber
                                  });
                                  setUsers(users.map(user => user.id === u.id ? { ...user, isSubscriber: !user.isSubscriber } : user));
                                } catch (error) {
                                  console.error('Error updating user:', error);
                                }
                              }}
                              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs transition-colors whitespace-nowrap"
                            >
                              {u.isSubscriber ? 'Revoke Access' : 'Give Access'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
