// src/context/CartContext.tsx
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';import type { Product } from '../mocks/products';

export type CartItem = Product & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  changeQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, qty: number = 1) => {
    setItems((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const changeQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addToCart, changeQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
