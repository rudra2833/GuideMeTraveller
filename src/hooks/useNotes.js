import { useState, useEffect, useRef } from 'react';
import { db, ref, onValue, set } from '../services/firebase';

const STORAGE_KEY = 'guidemetraveller_notes';

const defaultNotes = `Packing reminders:
• Keep passports in crossbody pouch
• Carry power bank in hand luggage
• Download offline Google Maps

Family wish list:
• Take family photo at Victoria Peak Sky Terrace
• Buy fresh Portuguese egg tarts at Lord Stow's
• Watch Disney Momentous castle fireworks`;

export function useNotes() {
  const [notes, setNotesState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? saved : defaultNotes;
    } catch {
      return defaultNotes;
    }
  });

  const isLocalEdit = useRef(false);

  // Real-time listener for shared notes from Firebase
  useEffect(() => {
    try {
      const notesRef = ref(db, 'sharedNotes');
      const unsubscribe = onValue(notesRef, (snapshot) => {
        const val = snapshot.val();
        if (typeof val === 'string' && !isLocalEdit.current) {
          setNotesState(val);
          try {
            localStorage.setItem(STORAGE_KEY, val);
          } catch (e) {
            console.error(e);
          }
        }
      }, (err) => {
        console.warn('Firebase notes sync warning:', err.message);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn('Firebase unavailable, using local mode:', e);
    }
  }, []);

  const setNotes = (newContent) => {
    isLocalEdit.current = true;
    setNotesState(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, newContent);
    } catch (e) {
      console.error(e);
    }

    // Debounce or sync to Firebase
    if (window._notesTimeout) clearTimeout(window._notesTimeout);
    window._notesTimeout = setTimeout(async () => {
      try {
        await set(ref(db, 'sharedNotes'), newContent);
      } catch (err) {
        console.error('Failed to sync notes to Firebase:', err);
      } finally {
        isLocalEdit.current = false;
      }
    }, 800);
  };

  return {
    notes,
    setNotes
  };
}
