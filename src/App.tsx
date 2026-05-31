/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { TrustPolicy } from './components/TrustPolicy';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { CartItem, Product } from './types';
import { Reviews } from './components/Reviews';
import { Features } from './components/Features';
import { SettingsModal } from './components/SettingsModal';
import { AdminModal } from './components/AdminModal';
import { LegalModal } from './components/LegalModal';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Toaster, toast } from 'sonner';
import { InstagramSection } from './components/InstagramSection';
import { SubscriptionSection } from './components/SubscriptionSection';

import { AuthModal } from './components/AuthModal';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | 'refund' | null>(null);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const { dir, language } = useLanguage();

  const handleDirectLogin = () => {
    setIsAuthOpen(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
        if (docSnap.exists()) {
          setIsSubscriber(docSnap.data().isSubscriber === true);
          if (user.displayName && docSnap.data().name !== user.displayName) {
            import('firebase/firestore').then(({ updateDoc }) => {
              updateDoc(doc(db, 'users', user.uid), { name: user.displayName }).catch(() => {});
            });
          }
        } else {
          setIsSubscriber(false);
          import('firebase/firestore').then(({ setDoc }) => {
            setDoc(doc(db, 'users', user.uid), {
              email: user.email || '',
              name: user.displayName || '',
              createdAt: new Date().toISOString(),
              isSubscriber: false
            }, { merge: true }).catch(() => {});
          });
        }
      });
      return () => unsub();
    } else {
      setIsSubscriber(false);
    }
  }, [user]);

  const handleAddToCart = (product: Product) => {
    // Only add if not already in cart
    if (!cartItems.find(item => item.id === product.id)) {
      setCartItems([...cartItems, product]);
      toast.success(`${product.title} added to vault!`);
    } else {
      toast(`${product.title} is already in your vault.`);
    }
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div dir={dir} className={`relative min-h-screen bg-[#000000] text-[#f5f5f7] overflow-x-hidden flex flex-col ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <div className="bg-grain" />
      <Header 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)} 
        onDirectLogin={handleDirectLogin}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        user={user}
      />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveFromCart}
        isSubscriber={isSubscriber}
      />
      
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} user={user} />
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} user={user} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <Hero />
      <Features />
      <Products onAdd={handleAddToCart} isSubscriber={isSubscriber} />
      <InstagramSection onAdd={handleAddToCart} isSubscriber={isSubscriber} />
      <SubscriptionSection 
        isSubscriber={isSubscriber}
        onSubscribe={() => handleAddToCart({
          id: 'sub-plus',
          title: 'Zoviq Plus Subscription',
          tagline: 'Access to premium everything.',
          price: 50,
          originalPrice: 50,
          features: [
            'Monthly Subscription',
            '50% OFF All Store Items',
            'VIP Support'
          ],
          icon: 'canva',
        })}
      />
      <Reviews />
      <TrustPolicy />
      
      <Footer onOpenLegal={(type) => setLegalType(type)} />
      
      <LegalModal 
        isOpen={legalType !== null} 
        type={legalType} 
        onClose={() => setLegalType(null)} 
      />

      <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: '#0a0a0a', border: '1px solid #1a1a1a', color: '#f5f5f7' } }} />
    </div>
  );
}
