import { useState, useEffect } from 'react';

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
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? saved : defaultNotes;
    } catch {
      return defaultNotes;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, notes);
    } catch (e) {
      console.error('Failed to save notes to localStorage', e);
    }
  }, [notes]);

  return {
    notes,
    setNotes
  };
}
