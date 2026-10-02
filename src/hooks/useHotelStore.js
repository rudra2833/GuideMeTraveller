import { useState, useEffect } from 'react';
import { CITIES } from '../data/tripData';

const STORAGE_KEY = 'guidemetraveller_selected_hotels';

const defaultHotels = {
  hongKong: 'hotel1',
  shenzhen: 'hotel1',
  macau: 'hotel1'
};

export function useHotelStore() {
  const [selectedHotels, setSelectedHotels] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultHotels, ...JSON.parse(saved) } : defaultHotels;
    } catch {
      return defaultHotels;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedHotels));
    } catch (e) {
      console.error('Failed to save hotel selection to localStorage', e);
    }
  }, [selectedHotels]);

  const setHotel = (cityKey, hotelKey) => {
    setSelectedHotels(prev => ({
      ...prev,
      [cityKey]: hotelKey
    }));
  };

  const getActiveHotel = (cityKey) => {
    const key = selectedHotels[cityKey] || 'hotel1';
    return CITIES[cityKey]?.hotels?.[key] || CITIES[cityKey]?.hotels?.hotel1;
  };

  return {
    selectedHotels,
    setHotel,
    getActiveHotel
  };
}
