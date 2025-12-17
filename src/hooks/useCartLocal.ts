import { useState, useEffect } from 'react';
import { type Product } from '../mocks/products';

interface CartItem extends Product {
  quantity: number;
}

export function useCartLocal() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let newCart: CartItem[];
      if (existing) {
        newCart = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prev, { ...product, quantity: 1 }];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) => {
      const newCart = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ).filter((item) => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const toggleFavorite = (product: Product) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const existingIndex = favorites.findIndex((item: Product) => item.id === product.id);
    
    let newFavorites: Product[];
    if (existingIndex >= 0) {
      newFavorites = favorites.filter((item: Product) => item.id !== product.id);
    } else {
      newFavorites = [...favorites, product];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = JSON.parse(localStorage.getItem('favorites') || '[]').length;

  return {
    cart,
    addToCart,
    changeQty,
    removeFromCart,
    toggleFavorite,
    cartCount,
    favoritesCount,
  };
}
