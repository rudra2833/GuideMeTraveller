import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import TripMap from '../components/map/TripMap';
import HotelSwitcher from '../components/city/HotelSwitcher';
import { CITIES } from '../data/tripData';
import { useHotelStore } from '../hooks/useHotelStore';
import { MapPin, Navigation, Building2 } from 'lucide-react';
import { calculateDistanceKm, getEstimatedTravel, getGoogleMapsDirectionsUrl } from '../utils/distance';

export default function MapPage() {
  const [selectedCityKey, setSelectedCityKey] = useState('hongKong');
  const [showHotelSwitcher, setShowHotelSwitcher] = useState(false);
  
  const { selectedHotels, setHotel, getActiveHotel } = useHotelStore();

  const city = CITIES[selectedCityKey];
  const activeHotel = getActiveHotel(selectedCityKey);

  // Combine official & optional places for map display
  const mapPlaces = [
    ...(city.officialPlaces || []),
    ...(city.optionalPlaces || [])
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Interactive Road Map"
        subtitle={`Starting from ${activeHotel.shortName || activeHotel.name}`}
        showBack={false}
      />

      <div style={{ padding: '16px 20px 32px' }}>
        
        {/* City Switcher Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          backgroundColor: '#FFFFFF',
          padding: '4px',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--color-border)',
          marginBottom: '14px'
        }}>
          {Object.values(CITIES).map((c) => {
            const active = c.id === selectedCityKey;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCityKey(c.id);
                  setShowHotelSwitcher(false);
                }}
                style={{
                  padding: '9px 10px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: active ? 'var(--color-navy)' : 'transparent',
                  color: active ? '#FFF8F1' : 'var(--color-text-main)',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {c.flag} {c.name}
              </button>
            );
          })}
        </div>

        {/* Current Active Base Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '14px'
        }}>
          <div>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-teal)', textTransform: 'uppercase' }}>
              MAP ORIGIN (HOTEL)
            </span>
            <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--color-navy)' }}>
              🏨 {activeHotel.name}
            </div>
          </div>

          <button
            onClick={() => setShowHotelSwitcher(!showHotelSwitcher)}
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              color: 'var(--color-coral-dark)',
              backgroundColor: 'var(--color-coral-light)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)'
            }}
          >
            {showHotelSwitcher ? 'Hide' : 'Switch Base ⇄'}
          </button>
        </div>

        {/* Collapsible Hotel Switcher */}
        {showHotelSwitcher && (
          <div style={{ marginBottom: '16px' }}>
            <HotelSwitcher
              cityKey={selectedCityKey}
              selectedHotelKey={selectedHotels[selectedCityKey] || 'hotel1'}
              onSelectHotel={(hKey) => {
                setHotel(selectedCityKey, hKey);
                setShowHotelSwitcher(false);
              }}
            />
          </div>
        )}

        {/* REAL ROAD MAP COMPONENT */}
        <TripMap
          activeHotel={activeHotel}
          places={mapPlaces}
          height="400px"
        />

        <p style={{
          fontSize: '0.74rem',
          color: 'var(--color-text-light)',
          textAlign: 'center',
          marginTop: '10px'
        }}>
          💡 Tap any numbered circle on the map to view distances and open Google Maps routing.
        </p>

        {/* Numbered Locations List Below Map */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            color: 'var(--color-navy)',
            marginBottom: '12px'
          }}>
            Numbered Map Locations
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mapPlaces.map((place, idx) => {
              const distKm = calculateDistanceKm(activeHotel.lat, activeHotel.lng, place.lat, place.lng);
              const estimate = getEstimatedTravel(distKm);
              const dirUrl = getGoogleMapsDirectionsUrl(activeHotel.name, activeHotel.lat, activeHotel.lng, place.name, place.lat, place.lng);

              return (
                <div
                  key={place.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-coral)',
                      color: 'var(--color-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.86rem',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>

                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                        {place.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
                        📍 {estimate.distStr} • {estimate.timeStr} ({estimate.primaryTransport})
                      </div>
                    </div>
                  </div>

                  <a
                    href={dirUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: 'var(--color-teal)',
                      padding: '5px 10px',
                      backgroundColor: 'var(--color-cream)',
                      border: '1px solid var(--color-border-hover)',
                      borderRadius: 'var(--radius-pill)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Directions ↗
                  </a>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
