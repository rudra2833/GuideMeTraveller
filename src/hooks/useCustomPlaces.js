import { useState, useEffect } from 'react';
import { db, ref, onValue, set, remove } from '../services/firebase';

const STORAGE_KEY = 'guidemetraveller_custom_places';

export function useCustomPlaces() {
  const [customPlaces, setCustomPlaces] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse custom places from local storage', e);
      return [];
    }
  });

  // Real-time Firebase Sync listener
  useEffect(() => {
    try {
      const placesRef = ref(db, 'customPlaces');
      const unsubscribe = onValue(placesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert firebase object dictionary { id1: place1, id2: place2 } to array
          const list = Object.values(data).sort((a, b) => {
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
          });
          setCustomPlaces(list);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
          } catch (e) {
            console.error('Failed to save to localStorage', e);
          }
        } else {
          // Empty in firebase
          setCustomPlaces([]);
          localStorage.removeItem(STORAGE_KEY);
        }
      }, (err) => {
        console.warn('Firebase realtime sync warning, running with local storage cache:', err.message);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase connection unavailable, using local mode:', e);
    }
  }, []);

  const addCustomPlace = async ({ name, note, cityKey = 'hongKong', category = 'Local Suggestion' }) => {
    if (!name || !name.trim()) return null;

    const newPlace = {
      id: `addon_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      note: note ? note.trim() : '',
      cityKey,
      category,
      badge: 'ADDS_ON',
      createdAt: new Date().toISOString()
    };

    // Optimistic local update
    setCustomPlaces((prev) => [newPlace, ...prev]);

    // Push to Firebase Realtime Database
    try {
      await set(ref(db, `customPlaces/${newPlace.id}`), newPlace);
    } catch (err) {
      console.error('Failed to sync new place to Firebase:', err);
    }

    return newPlace;
  };

  const removeCustomPlace = async (id) => {
    // Optimistic local removal
    setCustomPlaces((prev) => prev.filter((p) => p.id !== id));

    // Remove from Firebase Realtime Database
    try {
      await remove(ref(db, `customPlaces/${id}`));
    } catch (err) {
      console.error('Failed to delete place from Firebase:', err);
    }
  };

  const getCustomPlacesForCity = (cityKey) => {
    return customPlaces.filter((p) => p.cityKey === cityKey);
  };

  return {
    customPlaces,
    addCustomPlace,
    removeCustomPlace,
    getCustomPlacesForCity
  };
}
