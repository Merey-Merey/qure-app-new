import { create } from 'zustand';
import type { Product } from '../mocks/products';

type FavoritesStore = {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavorites = create<FavoritesStore>((set, get) => ({
  favorites: [],
  addFavorite: (product: Product) =>
    set((state) => ({
      favorites: [...state.favorites, product],
    })),
  removeFavorite: (productId: string) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== productId),
    })),
  isFavorite: (id: string) => get().favorites.some((p) => p.id === id),
}));
