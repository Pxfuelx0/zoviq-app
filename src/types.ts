export type Product = {
  id: string;
  title: string;
  tagline: string;
  price: number;
  originalPrice: number;
  features: string[];
  badge?: string;
  icon: 'google' | 'canva' | 'apple' | 'instagram';
  logoUrl?: string;
};

export type CartItem = Product;
