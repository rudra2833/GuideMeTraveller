import React from 'react';
import { MapPin, Clock, Utensils, AlertCircle } from 'lucide-react';
import TravellerTip from '../ui/TravellerTip';
import FavoriteBtn from '../ui/FavoriteBtn';
import GoogleMapsBtn from '../ui/GoogleMapsBtn';
import { calculateDistanceKm, getEstimatedTravel, getGoogleMapsDirectionsUrl } from '../../utils/distance';

export default function RestaurantCard({ restaurant, activeHotel, isFavorite, onToggleFavorite }) {
  // Distance from active hotel
  const activeHotelKey = activeHotel?.key;
  const precomputed = restaurant?.hotelDistances?.[activeHotelKey];

  let distKm = 0;
  let estimate;

  if (precomputed && (precomputed.dist === "0 m" || precomputed.time?.toLowerCase().includes("inside hotel"))) {
    distKm = 0;
    estimate = {
      distStr: '0 m',
      timeStr: 'Inside hotel',
      primaryTransport: '🏨 In your hotel'
    };
  } else {
    distKm = calculateDistanceKm(
      activeHotel?.lat,
      activeHotel?.lng,
      restaurant?.lat,
      restaurant?.lng
    );
    estimate = getEstimatedTravel(distKm);
  }


  const mapsUrl = activeHotel
    ? getGoogleMapsDirectionsUrl(
        activeHotel.name,
        activeHotel.lat,
        activeHotel.lng,
        restaurant.name,
        restaurant.lat,
        restaurant.lng
      )
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name)}`;

  return (
    <div
      className="planner-card"
      style={{
        padding: '18px',
        marginBottom: '18px',
        borderLeft: '4px solid var(--color-coral)'
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: 'var(--color-coral-dark)',
            backgroundColor: 'var(--color-coral-light)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-pill)',
            display: 'inline-block',
            marginBottom: '4px'
          }}>
            {restaurant.cuisine}
          </span>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: 'var(--color-navy)',
            lineHeight: 1.25
          }}>
            {restaurant.name}
          </h3>
          {restaurant.chineseName && (
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              {restaurant.chineseName}
            </span>
          )}
        </div>

        <FavoriteBtn
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(restaurant)}
          label=""
        />
      </div>

      {/* Vegetarian & Jain Status */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        margin: '8px 0 10px'
      }}>
        <span style={{
          fontSize: '0.74rem',
          fontWeight: 700,
          color: '#286B3E',
          backgroundColor: '#E8F5E9',
          padding: '3px 8px',
          borderRadius: 'var(--radius-sm)'
        }}>
          ★ {restaurant.vegStatus}
        </span>

        {restaurant.jainFriendly && (
          <span style={{
            fontSize: '0.74rem',
            fontWeight: 600,
            color: 'var(--color-teal)',
            backgroundColor: 'var(--color-teal-light)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-sm)'
          }}>
            🌱 Jain friendly: {restaurant.jainFriendly}
          </span>
        )}
      </div>

      {/* Why We Picked It */}
      {restaurant.whyWePicked && (
        <div style={{
          margin: '10px 0',
          fontSize: '0.84rem',
          color: 'var(--color-text-main)',
          lineHeight: 1.45
        }}>
          <strong style={{ color: 'var(--color-navy)' }}>Why we picked it: </strong>
          {restaurant.whyWePicked}
        </div>
      )}

      {/* Proximity from Selected Hotel */}
      {activeHotel && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 12px',
          backgroundColor: 'var(--color-cream)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.78rem',
          color: 'var(--color-navy)',
          margin: '10px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
            <MapPin size={13} color="var(--color-coral-dark)" />
            <span>{estimate.distStr}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)' }}>
            <Clock size={13} />
            <span>{estimate.timeStr}</span>
          </div>

          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginLeft: 'auto' }}>
            from {activeHotel.shortName || activeHotel.name}
          </span>
        </div>
      )}

      {/* Traveller Tip */}
      <TravellerTip tip={restaurant.travellerTip} customTitle="Family Food Note" />

      {/* Footer & Google Maps */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '12px',
        paddingTop: '10px',
        borderTop: '1px solid var(--color-border)'
      }}>
        <GoogleMapsBtn url={mapsUrl} label="Directions from Hotel" isDirections={true} />

        <span style={{
          fontSize: '0.72rem',
          color: 'var(--color-text-light)',
          fontStyle: 'italic'
        }}>
          Check hours before visiting
        </span>
      </div>
    </div>
  );
}
