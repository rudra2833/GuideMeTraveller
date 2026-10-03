import { useState, useEffect } from 'react';
import { db, ref, onValue, set, remove } from '../services/firebase';

const STORAGE_KEY = 'guidemetraveller_tried_food';

export function useFoodTry() {
  const [triedIds, setTriedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse tried food items from localStorage', e);
      return [];
    }
  });

  // Real-time Firebase Sync listener for tried dishes
  useEffect(() => {
    try {
      const triedRef = ref(db, 'triedFood');
      const unsubscribe = onValue(triedRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const ids = Object.keys(data);
          setTriedIds(ids);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
          } catch (e) {
            console.error('Failed to save tried dishes to localStorage', e);
          }
        } else {
          setTriedIds([]);
          localStorage.removeItem(STORAGE_KEY);
        }
      }, (err) => {
        console.warn('Firebase food try sync warning, using local cache:', err.message);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase connection unavailable, using local mode:', e);
    }
  }, []);

  const isTried = (dishId) => triedIds.includes(dishId);

  const toggleTried = async (dishId) => {
    const currentlyTried = isTried(dishId);

    // Optimistic local state update
    setTriedIds((prev) =>
      currentlyTried ? prev.filter((item) => item !== dishId) : [...prev, dishId]
    );

    // Sync to Firebase Realtime Database
    try {
      if (currentlyTried) {
        await remove(ref(db, `triedFood/${dishId}`));
      } else {
        await set(ref(db, `triedFood/${dishId}`), {
          triedAt: Date.now()
        });
      }
    } catch (err) {
      console.error('Failed to sync tried food status to Firebase:', err);
    }
  };

  return {
    triedIds,
    isTried,
    toggleTried
  };
}
