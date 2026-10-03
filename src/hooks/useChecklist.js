import { useState, useEffect } from 'react';
import { db, ref, onValue, set, remove } from '../services/firebase';
import { CHECKLIST_ITEMS } from '../data/tripData';

const STORAGE_KEY = 'guidemetraveller_shared_checklist';

export function useChecklist() {
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : CHECKLIST_ITEMS;
    } catch {
      return CHECKLIST_ITEMS;
    }
  });

  // Real-time Firebase Sync listener
  useEffect(() => {
    try {
      const checklistRef = ref(db, 'sharedChecklist');
      const unsubscribe = onValue(checklistRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const list = Object.values(data);
          // Preserve order if index or id is present
          setChecklist(list);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
          } catch (e) {
            console.error('Failed to save checklist to localStorage', e);
          }
        } else {
          // First time initialization in Firebase: seed with initial CHECKLIST_ITEMS
          const initialMap = {};
          CHECKLIST_ITEMS.forEach((item, idx) => {
            initialMap[item.id] = { ...item, order: idx };
          });
          set(ref(db, 'sharedChecklist'), initialMap).catch(err => {
            console.warn('Could not seed checklist to Firebase:', err);
          });
        }
      }, (err) => {
        console.warn('Firebase checklist sync warning, using local cache:', err.message);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase connection unavailable, using local mode:', e);
    }
  }, []);

  const toggleCheck = async (id) => {
    const item = checklist.find((c) => c.id === id);
    if (!item) return;

    const updated = !item.completed;

    // Optimistic local update
    setChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: updated } : c))
    );

    // Sync to Firebase
    try {
      await set(ref(db, `sharedChecklist/${id}/completed`), updated);
    } catch (err) {
      console.error('Failed to sync checklist toggle to Firebase:', err);
    }
  };

  const addChecklistItem = async ({ text, category = 'General' }) => {
    if (!text || !text.trim()) return null;

    const newItem = {
      id: `chk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      text: text.trim(),
      category: category.trim() || 'General',
      completed: false,
      createdAt: new Date().toISOString()
    };

    // Optimistic local update
    setChecklist((prev) => [...prev, newItem]);

    // Sync to Firebase
    try {
      await set(ref(db, `sharedChecklist/${newItem.id}`), newItem);
    } catch (err) {
      console.error('Failed to add checklist item to Firebase:', err);
    }

    return newItem;
  };

  const removeChecklistItem = async (id) => {
    // Optimistic local update
    setChecklist((prev) => prev.filter((c) => c.id !== id));

    // Sync to Firebase
    try {
      await remove(ref(db, `sharedChecklist/${id}`));
    } catch (err) {
      console.error('Failed to remove checklist item from Firebase:', err);
    }
  };

  return {
    checklist,
    toggleCheck,
    addChecklistItem,
    removeChecklistItem
  };
}
