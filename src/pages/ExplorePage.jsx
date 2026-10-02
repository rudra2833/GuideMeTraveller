import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import HotelSwitcher from '../components/city/HotelSwitcher';
import PlaceCard from '../components/places/PlaceCard';
import RestaurantCard from '../components/food/RestaurantCard';
import { CITIES } from '../data/tripData';
import { useHotelStore } from '../hooks/useHotelStore';
import { useFavorites } from '../hooks/useFavorites';
import { Sparkles, Utensils, Compass, Sun, MapPin } from 'lucide-react';

export default function ExplorePage() {
  const [selectedCityKey, setSelectedCityKey] = useState('hongKong');
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'official', 'optional', 'food'
  
  const { selectedHotels, setHotel, getActiveHotel } = useHotelStore();
  const { isFavorite, toggleFavorite } = useFavorites();

  const city = CITIES[selectedCityKey];
  const activeHotel = getActiveHotel(selectedCityKey);

  // Filter items
  const officialPlaces = city.officialPlaces || [];
  const optionalPlaces = city.optionalPlaces || [];
  const restaurants = city.restaurants || [];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Places & Flavors"
        subtitle="Explore by City"
        showBack={false}
      />

      <div style={{ padding: '16px 20px 32px' }}>
        
        {/* City Segmented Control */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          backgroundColor: '#FFFFFF',
          padding: '4px',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--color-border)',
          marginBottom: '16px'
        }}>
          {Object.values(CITIES).map((c) => {
            const active = c.id === selectedCityKey;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCityKey(c.id)}
                style={{
                  padding: '9px 12px',
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

        {/* Dynamic Hotel Switcher for this City */}
        <HotelSwitcher
          cityKey={selectedCityKey}
          selectedHotelKey={selectedHotels[selectedCityKey] || 'hotel1'}
          onSelectHotel={(hKey) => setHotel(selectedCityKey, hKey)}
        />

        {/* Filter Chips Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '18px',
          WebkitOverflowScrolling: 'touch'
        }}>
          <button
            onClick={() => setSelectedFilter('all')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.78rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: selectedFilter === 'all' ? 'var(--color-navy)' : '#FFFFFF',
              color: selectedFilter === 'all' ? '#FFF8F1' : 'var(--color-navy)',
              border: '1px solid var(--color-border)'
            }}
          >
            All In {city.name}
          </button>

          <button
            onClick={() => setSelectedFilter('official')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.78rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: selectedFilter === 'official' ? 'var(--color-coral-dark)' : '#FFFFFF',
              color: selectedFilter === 'official' ? '#FFFFFF' : 'var(--color-navy)',
              border: '1px solid var(--color-border)'
            }}
          >
            ★ Tour Itinerary ({officialPlaces.length})
          </button>

          <button
            onClick={() => setSelectedFilter('optional')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.78rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: selectedFilter === 'optional' ? 'var(--color-sage-dark)' : '#FFFFFF',
              color: selectedFilter === 'optional' ? '#FFFFFF' : 'var(--color-navy)',
              border: '1px solid var(--color-border)'
            }}
          >
            🌿 Free & Optional ({optionalPlaces.length})
          </button>

          <button
            onClick={() => setSelectedFilter('food')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.78rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: selectedFilter === 'food' ? '#B5670D' : '#FFFFFF',
              color: selectedFilter === 'food' ? '#FFFFFF' : 'var(--color-navy)',
              border: '1px solid var(--color-border)'
            }}
          >
            🍽 Food & Dining ({restaurants.length})
          </button>
        </div>

        {/* Section 1: Official Itinerary Places */}
        {(selectedFilter === 'all' || selectedFilter === 'official') && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: 'var(--color-navy)'
                }}>
                  Official Tour Sightseeing
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--color-coral-dark)', fontWeight: 700 }}>
                  Confirmed inclusions in tour operator PDF
                </p>
              </div>
            </div>

            {officialPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                activeHotel={activeHotel}
                isFavorite={isFavorite(place.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Section 2: Optional Discovery / Free Day Ideas */}
        {(selectedFilter === 'all' || selectedFilter === 'optional') && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: 'var(--color-navy)'
                }}>
                  Optional Wanderings & Free Day Ideas
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--color-sage-dark)', fontWeight: 700 }}>
                  Researched nearby ideas around {activeHotel.name}
                </p>
              </div>
            </div>

            {optionalPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                activeHotel={activeHotel}
                isFavorite={isFavorite(place.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Section 3: Food & Restaurants Near Active Hotel */}
        {(selectedFilter === 'all' || selectedFilter === 'food') && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: 'var(--color-navy)'
                }}>
                  Where Should We Eat?
                </h3>
                <p style={{ fontSize: '0.76rem', color: '#B5670D', fontWeight: 700 }}>
                  🥬 Vegetarian • 🇮🇳 Indian • 🌱 Vegan • ☕ Cafes
                </p>
              </div>
            </div>

            {restaurants.map((res) => (
              <RestaurantCard
                key={res.id}
                restaurant={res}
                activeHotel={activeHotel}
                isFavorite={isFavorite(res.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
