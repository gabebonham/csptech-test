import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FavoritesState = {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [] as number[],

      toggleFavorite: (id: number) => {
        const current = get().favoriteIds;
        const exists = current.includes(id);

        set({
          favoriteIds: exists
            ? current.filter((favId) => favId !== id)
            : [...current, id],
        });
      },

      isFavorite: (id: number) => get().favoriteIds.includes(id),

      clearFavorites: () => set({ favoriteIds: [] }),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);