import { useState, useEffect } from 'react';

const STORAGE_KEY = 'guidemetraveller_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const isFavorite = (id) => {
    return favorites.some(item => item.id === id);
  };

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      if (prev.some(x => x.id === item.id)) {
        return prev.filter(x => x.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite
  };
}
