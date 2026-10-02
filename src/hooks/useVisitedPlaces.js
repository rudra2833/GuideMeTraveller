import { useState, useEffect } from 'react';
import { db, ref, onValue, set, remove } from '../services/firebase';

const STORAGE_KEY = 'guidemetraveller_visited_places';

export function useVisitedPlaces() {
  const [visitedIds, setVisitedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse visited places from local storage', e);
      return [];
    }
  });

  // Real-time Firebase Sync listener for ticks
  useEffect(() => {
    try {
      const visitedRef = ref(db, 'visitedPlaces');
      const unsubscribe = onValue(visitedRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const ids = Object.keys(data);
          setVisitedIds(ids);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
          } catch (e) {
            console.error('Failed to save visited places to localStorage', e);
          }
        } else {
          setVisitedIds([]);
          localStorage.removeItem(STORAGE_KEY);
        }
      }, (err) => {
        console.warn('Firebase visited sync warning, using local cache:', err.message);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase connection unavailable, using local mode:', e);
    }
  }, []);

  const isVisited = (id) => visitedIds.includes(id);

  const toggleVisited = async (id) => {
    const currentlyVisited = isVisited(id);

    // Optimistic local state update
    setVisitedIds((prev) =>
      currentlyVisited ? prev.filter((item) => item !== id) : [...prev, id]
    );

    // Sync to Firebase Realtime Database
    try {
      if (currentlyVisited) {
        await remove(ref(db, `visitedPlaces/${id}`));
      } else {
        await set(ref(db, `visitedPlaces/${id}`), {
          visitedAt: Date.now()
        });
      }
    } catch (err) {
      console.error('Failed to sync visited status to Firebase:', err);
    }
  };

  return {
    visitedIds,
    isVisited,
    toggleVisited
  };
}
