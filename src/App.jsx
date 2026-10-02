import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import HomePage from './pages/HomePage';
import DaysPage from './pages/DaysPage';
import DayDetailPage from './pages/DayDetailPage';
import ExplorePage from './pages/ExplorePage';
import PlaceDetailPage from './pages/PlaceDetailPage';
import MapPage from './pages/MapPage';
import MorePage from './pages/MorePage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  // Register Service Worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
          console.log('SW registration failed: ', err);
        });
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/days" element={<DaysPage />} />
          <Route path="/day/:dayNumber" element={<DayDetailPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/place/:placeId" element={<PlaceDetailPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/more" element={<MorePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
