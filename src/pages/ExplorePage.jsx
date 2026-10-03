import React, { useState, useMemo } from 'react';
import PageHeader from '../components/layout/PageHeader';
import HotelSwitcher from '../components/city/HotelSwitcher';
import PlaceCard from '../components/places/PlaceCard';
import RestaurantCard from '../components/food/RestaurantCard';
import CustomPlaceCard from '../components/places/CustomPlaceCard';
import FoodTryCard from '../components/food/FoodTryCard';
import AddPlaceModal from '../components/places/AddPlaceModal';
import { CITIES } from '../data/tripData';
import { useHotelStore } from '../hooks/useHotelStore';
import { useFavorites } from '../hooks/useFavorites';
import { useCustomPlaces } from '../hooks/useCustomPlaces';
import { useVisitedPlaces } from '../hooks/useVisitedPlaces';
import { useFoodTry } from '../hooks/useFoodTry';
import { calculateDistanceKm } from '../utils/distance';
import { Sparkles, Utensils, Compass, Plus, PlusCircle, ArrowUpDown, CheckCircle2, Flame } from 'lucide-react';

export default function ExplorePage() {
  const [selectedCityKey, setSelectedCityKey] = useState('hongKong');
  const [selectedFilter, setSelectedFilter] = useState('official'); // 'official', 'optional', 'food', 'foodTry', 'addsOn'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  
  const { selectedHotels, setHotel, getActiveHotel } = useHotelStore();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addCustomPlace, removeCustomPlace, getCustomPlacesForCity } = useCustomPlaces();
  const { visitedIds, isVisited, toggleVisited } = useVisitedPlaces();
  const { triedIds, isTried, toggleTried } = useFoodTry();

  const city = CITIES[selectedCityKey];
  const activeHotel = getActiveHotel(selectedCityKey);

  // Filter items
  const officialPlaces = city.officialPlaces || [];
  const optionalPlaces = city.optionalPlaces || [];
  const restaurants = city.restaurants || [];
  
  // Combine pre-baked addsOn from tripData.js + user manual additions
  const prebakedAddsOn = city.addsOn || [];
  const customPlacesForCity = getCustomPlacesForCity(selectedCityKey);
  const allAddsOn = useMemo(() => {
    const combined = [...prebakedAddsOn, ...customPlacesForCity];
    // Sort: Unvisited on top, Visited on bottom (like a to-do list!)
    return combined.sort((a, b) => {
      const aDone = isVisited(a.id) ? 1 : 0;
      const bDone = isVisited(b.id) ? 1 : 0;
      return aDone - bDone;
    });
  }, [prebakedAddsOn, customPlacesForCity, visitedIds]);

  // FoodTry dishes extracted from restaurants for this city
  const allFoodTry = useMemo(() => {
    const list = restaurants
      .filter((r) => r.mustTryDish)
      .map((r) => ({
        dish: r.mustTryDish,
        restaurant: r
      }));

    // Sort: Untried on top, Tried on bottom; within that, sort by proximity to hotel
    return list.sort((a, b) => {
      const aDone = isTried(a.dish.id) ? 1 : 0;
      const bDone = isTried(b.dish.id) ? 1 : 0;
      if (aDone !== bDone) return aDone - bDone;

      const distA = calculateDistanceKm(activeHotel?.lat, activeHotel?.lng, a.restaurant.lat, a.restaurant.lng);
      const distB = calculateDistanceKm(activeHotel?.lat, activeHotel?.lng, b.restaurant.lat, b.restaurant.lng);
      return distA - distB;
    });
  }, [restaurants, activeHotel, triedIds]);



  // Distance-based sorting: Closest to active hotel first!
  const sortedOptionalPlaces = useMemo(() => {
    if (!activeHotel) return optionalPlaces;
    return [...optionalPlaces].sort((a, b) => {
      const distA = calculateDistanceKm(activeHotel.lat, activeHotel.lng, a.lat, a.lng);
      const distB = calculateDistanceKm(activeHotel.lat, activeHotel.lng, b.lat, b.lng);
      return distA - distB;
    });
  }, [optionalPlaces, activeHotel]);

  const sortedRestaurants = useMemo(() => {
    if (!activeHotel) return restaurants;
    return [...restaurants].sort((a, b) => {
      const isInsideA = a.hotelDistances?.[activeHotel.key]?.dist === "0 m" ||
        a.hotelDistances?.[activeHotel.key]?.time?.toLowerCase().includes("inside hotel");
      const isInsideB = b.hotelDistances?.[activeHotel.key]?.dist === "0 m" ||
        b.hotelDistances?.[activeHotel.key]?.time?.toLowerCase().includes("inside hotel");
      
      const distA = isInsideA ? 0 : calculateDistanceKm(activeHotel.lat, activeHotel.lng, a.lat, a.lng);
      const distB = isInsideB ? 0 : calculateDistanceKm(activeHotel.lat, activeHotel.lng, b.lat, b.lng);
      return distA - distB;
    });
  }, [restaurants, activeHotel]);

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

        {/* Quick Add Place Banner & Distance Sort Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          marginBottom: '14px',
          padding: '10px 14px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--color-teal)', fontWeight: 600 }}>
            <ArrowUpDown size={14} />
            <span>Sorted closest to <strong>{activeHotel?.shortName || activeHotel?.name}</strong></span>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-coral-dark)',
              color: '#FFFFFF',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(212, 123, 115, 0.25)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Plus size={14} />
            Add Place
          </button>
        </div>

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
            🌿 Free & Optional ({sortedOptionalPlaces.length})
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
            🍽 Food & Dining ({sortedRestaurants.length})
          </button>

          <button
            onClick={() => setSelectedFilter('foodTry')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.78rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: selectedFilter === 'foodTry' ? '#D97706' : '#FFFFFF',
              color: selectedFilter === 'foodTry' ? '#FFFFFF' : '#D97706',
              border: '1px solid #F59E0B'
            }}
          >
            🥟 FoodTry ({allFoodTry.length})
          </button>

          <button
            onClick={() => setSelectedFilter('addsOn')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.78rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              backgroundColor: selectedFilter === 'addsOn' ? 'var(--color-navy)' : '#FFFFFF',
              color: selectedFilter === 'addsOn' ? '#FFF8F1' : 'var(--color-coral-dark)',
              border: selectedFilter === 'addsOn' ? '1px solid var(--color-navy)' : '1px dashed var(--color-coral-dark)'
            }}
          >
            ✨ AddsOn ({allAddsOn.length})
          </button>
        </div>

        {/* Section: FoodTry (Iconic Dishes to Taste with Checklist) */}
        {selectedFilter === 'foodTry' && allFoodTry.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: 'var(--color-navy)'
                }}>
                  🥟 FoodTry • Iconic Dishes to Taste
                </h3>
                <p style={{ fontSize: '0.76rem', color: '#B5670D', fontWeight: 700 }}>
                  Must-eat dishes for Vegetarians & Eggetarians • Tap "Tried" to check off ({city.name})
                </p>
              </div>
            </div>

            {/* Untried Dishes First */}
            {allFoodTry.filter((item) => !isTried(item.dish.id)).map((item) => (
              <FoodTryCard
                key={item.dish.id}
                dish={item.dish}
                restaurant={item.restaurant}
                activeHotel={activeHotel}
                isTried={false}
                onToggleTried={toggleTried}
              />
            ))}

            {/* Tried Dishes at the Bottom */}
            {allFoodTry.filter((item) => isTried(item.dish.id)).length > 0 && (
              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px dashed var(--color-border)' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  marginBottom: '12px'
                }}>
                  <CheckCircle2 size={15} color="#2E7D32" />
                  <span>Tasted & Checked Off ({allFoodTry.filter((item) => isTried(item.dish.id)).length})</span>
                </div>

                {allFoodTry.filter((item) => isTried(item.dish.id)).map((item) => (
                  <FoodTryCard
                    key={item.dish.id}
                    dish={item.dish}
                    restaurant={item.restaurant}
                    activeHotel={activeHotel}
                    isTried={true}
                    onToggleTried={toggleTried}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state when viewing FoodTry tab and list is empty */}
        {selectedFilter === 'foodTry' && allFoodTry.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '36px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '2px dashed var(--color-border)',
            marginBottom: '32px'
          }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-navy)', marginBottom: '6px' }}>
              No dishes listed for {city.name} yet
            </h4>
          </div>
        )}


        {/* Section: AddsOn (Manual / Local Recommendations with To-Do Checklist) */}
        {selectedFilter === 'addsOn' && allAddsOn.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  color: 'var(--color-navy)'
                }}>
                  ✨ AddsOn & Local Notes
                </h3>
                <p style={{ fontSize: '0.76rem', color: 'var(--color-coral-dark)', fontWeight: 700 }}>
                  Tap the circle to tick off visited places • Unvisited stay at top ({city.name})
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-coral-dark)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Plus size={14} /> Add
              </button>
            </div>

            {/* Unvisited Items First */}
            {allAddsOn.filter((p) => !isVisited(p.id)).map((place) => (
              <CustomPlaceCard
                key={place.id}
                place={place}
                cityName={city.name}
                isVisited={false}
                onToggleVisited={toggleVisited}
                canDelete={Boolean(place.id?.startsWith('addon_'))}
                onDelete={removeCustomPlace}
              />
            ))}

            {/* Visited / Completed Items at the Bottom */}
            {allAddsOn.filter((p) => isVisited(p.id)).length > 0 && (
              <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: '1px dashed var(--color-border)' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  marginBottom: '12px'
                }}>
                  <CheckCircle2 size={15} color="#2E7D32" />
                  <span>Visited / Completed ({allAddsOn.filter((p) => isVisited(p.id)).length})</span>
                </div>

                {allAddsOn.filter((p) => isVisited(p.id)).map((place) => (
                  <CustomPlaceCard
                    key={place.id}
                    place={place}
                    cityName={city.name}
                    isVisited={true}
                    onToggleVisited={toggleVisited}
                    canDelete={Boolean(place.id?.startsWith('addon_'))}
                    onDelete={removeCustomPlace}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state when viewing AddsOn tab and list is empty */}
        {selectedFilter === 'addsOn' && allAddsOn.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '36px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '2px dashed var(--color-border)',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-coral-light)',
              color: 'var(--color-coral-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <Sparkles size={24} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-navy)', marginBottom: '6px' }}>
              No AddsOn in {city.name} yet
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', maxWidth: '320px', margin: '0 auto 16px' }}>
              Did a local, driver, or fellow traveller recommend an amazing cafe, market, or secret spot? Add it here with a quick note!
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--color-coral-dark)',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 18px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <Plus size={16} />
              Add Your First Place
            </button>
          </div>
        )}

        {/* Section 1: Official Itinerary Places */}
        {selectedFilter === 'official' && (
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

        {/* Section 2: Optional Discovery / Free Day Ideas (Sorted by distance!) */}
        {selectedFilter === 'optional' && (
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
                  Sorted closest to {activeHotel?.shortName || activeHotel?.name}
                </p>
              </div>
            </div>

            {sortedOptionalPlaces.map((place) => (
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

        {/* Section 3: Food & Restaurants Near Active Hotel (Sorted by distance!) */}
        {selectedFilter === 'food' && (
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
                  Sorted closest to {activeHotel?.shortName || activeHotel?.name} • 🥬 Veg • 🇮🇳 Indian • ☕ Cafes
                </p>
              </div>
            </div>

            {sortedRestaurants.map((res) => (
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

      {/* Add Place Modal */}
      <AddPlaceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPlace={addCustomPlace}
        defaultCityKey={selectedCityKey}
      />
    </div>
  );
}
