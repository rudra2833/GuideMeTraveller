import React from 'react';
import { CheckCircle, Circle, MapPin, Clock, ExternalLink } from 'lucide-react';
import GoogleMapsBtn from '../ui/GoogleMapsBtn';
import { calculateDistanceKm, getEstimatedTravel, getGoogleMapsDirectionsUrl } from '../../utils/distance';

export default function FoodTryCard({ dish, restaurant, activeHotel, isTried, onToggleTried }) {
  const distKm = calculateDistanceKm(
    activeHotel?.lat,
    activeHotel?.lng,
    restaurant?.lat,
    restaurant?.lng
  );
  const estimate = getEstimatedTravel(distKm);

  const mapsUrl = activeHotel
    ? getGoogleMapsDirectionsUrl(
        activeHotel.name,
        activeHotel.lat,
        activeHotel.lng,
        restaurant.name,
        restaurant.lat,
        restaurant.lng
      )
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' ' + restaurant.area)}`;

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleTried) {
      onToggleTried(dish.id);
    }
  };

  return (
    <div
      className={`planner-card animate-fade-in ${isTried ? 'visited-card' : ''}`}
      style={{
        padding: '16px',
        marginBottom: '20px',
        backgroundColor: isTried ? '#F9FAF9' : '#FFFFFF',
        borderLeft: isTried ? '4px solid var(--color-sage)' : '4px solid #D97706',
        opacity: isTried ? 0.78 : 1,
        transition: 'all 0.25s ease'
      }}
    >
      {/* Top Image with Badges */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '180px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        marginBottom: '12px',
        backgroundColor: 'var(--color-cream-dark)'
      }}>
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Cost & Diet Badges */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'flex',
          gap: '6px',
          zIndex: 2
        }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(31, 52, 54, 0.85)',
            backdropFilter: 'blur(4px)',
            color: '#FFFFFF'
          }}>
            {dish.diet}
          </span>

          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: 'var(--radius-pill)',
            backgroundColor: '#FEF3C7',
            color: '#92400E',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            {dish.cost}
          </span>
        </div>

        {/* Tried Checkbox Button */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 2
        }}>
          <button
            type="button"
            onClick={handleToggle}
            title={isTried ? "Mark as untried" : "Mark as tasted!"}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: isTried ? '#E8F5E9' : 'rgba(255, 255, 255, 0.92)',
              border: isTried ? '1px solid #A5D6A7' : '1px solid var(--color-border)',
              backdropFilter: 'blur(6px)',
              borderRadius: 'var(--radius-pill)',
              padding: '5px 11px',
              fontSize: '0.74rem',
              fontWeight: 800,
              color: isTried ? '#2E7D32' : 'var(--color-navy)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-subtle)',
              transition: 'all 0.2s ease'
            }}
          >
            {isTried ? (
              <>
                <CheckCircle size={14} color="#2E7D32" />
                <span>Tried ✓</span>
              </>
            ) : (
              <>
                <Circle size={14} color="var(--color-text-muted)" />
                <span>To Try</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Dish Name */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.24rem',
        color: isTried ? 'var(--color-text-muted)' : 'var(--color-navy)',
        textDecoration: isTried ? 'line-through' : 'none',
        lineHeight: 1.25,
        marginBottom: '4px'
      }}>
        {dish.name}
      </h3>

      {/* Restaurant Spot & Avg Cost */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '6px',
        fontSize: '0.80rem',
        fontWeight: 700,
        color: '#B5670D',
        marginBottom: '8px'
      }}>
        <span>🍽 {restaurant.name}</span>
        <span style={{ color: 'var(--color-text-light)' }}>•</span>
        <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{restaurant.area}</span>
        {restaurant.avgCostPerPerson && (
          <>
            <span style={{ color: 'var(--color-text-light)' }}>•</span>
            <span style={{
              color: '#15803D',
              backgroundColor: '#DCFCE7',
              border: '1px solid #86EFAC',
              padding: '1px 8px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.72rem',
              fontWeight: 800
            }}>
              💰 Avg: {restaurant.avgCostPerPerson}/person
            </span>
          </>
        )}
      </div>

      {/* Note / Description */}
      <p style={{
        fontSize: '0.84rem',
        color: isTried ? 'var(--color-text-muted)' : 'var(--color-text-main)',
        lineHeight: 1.45,
        marginBottom: '12px'
      }}>
        {dish.note}
      </p>

      {/* Proximity from Active Hotel */}
      {activeHotel && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 10px',
          backgroundColor: 'var(--color-cream)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.76rem',
          color: 'var(--color-navy)',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
            <MapPin size={12} color="var(--color-coral-dark)" />
            <span>{estimate.distStr}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)' }}>
            <Clock size={12} />
            <span>{estimate.timeStr}</span>
          </div>

          <span style={{ fontSize: '0.70rem', color: 'var(--color-text-light)', marginLeft: 'auto' }}>
            from {activeHotel.shortName || activeHotel.name}
          </span>
        </div>
      )}

      {/* Footer Directions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '10px',
        borderTop: '1px solid var(--color-border)'
      }}>
        <GoogleMapsBtn url={mapsUrl} label="Directions to Restaurant" isDirections={true} />

        <span style={{ fontSize: '0.72rem', color: isTried ? '#2E7D32' : 'var(--color-text-light)', fontWeight: isTried ? 600 : 400 }}>
          {isTried ? '✓ Completed' : restaurant.price + ' • Budget Friendly'}
        </span>
      </div>
    </div>
  );
}
