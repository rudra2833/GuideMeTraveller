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

      {/* Vegetarian & Jain Status & Avg Cost */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        margin: '8px 0 10px',
        alignItems: 'center'
      }}>
        {restaurant.avgCostPerPerson && (
          <span style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#15803D',
            backgroundColor: '#DCFCE7',
            border: '1px solid #86EFAC',
            padding: '3px 10px',
            borderRadius: 'var(--radius-pill)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 1px 3px rgba(21, 128, 61, 0.08)'
          }}>
            💰 Avg: {restaurant.avgCostPerPerson} / person
          </span>
        )}

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

      {/* Signature Must-Try Dish Spotlight */}
      {restaurant.mustTryDish && (
        <div style={{
          display: 'flex',
          gap: '12px',
          backgroundColor: '#FFFBF5',
          border: '1px solid #F1E5D5',
          borderRadius: 'var(--radius-sm)',
          padding: '12px',
          margin: '12px 0',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(181, 103, 13, 0.06)'
        }}>
          <img
            src={restaurant.mustTryDish.image}
            alt={restaurant.mustTryDish.name}
            loading="lazy"
            style={{
              width: '74px',
              height: '74px',
              borderRadius: 'var(--radius-xs)',
              objectFit: 'cover',
              flexShrink: 0,
              border: '1px solid var(--color-border)'
            }}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80';
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: 'var(--color-coral-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                ★ MUST-TRY DISH
              </span>
              <span style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#92400E',
                backgroundColor: '#FEF3C7',
                padding: '2px 8px',
                borderRadius: 'var(--radius-pill)',
                whiteSpace: 'nowrap'
              }}>
                {restaurant.mustTryDish.cost}
              </span>
            </div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              color: 'var(--color-navy)',
              margin: '2px 0 3px',
              lineHeight: 1.25
            }}>
              {restaurant.mustTryDish.name}
            </h4>
            <p style={{
              fontSize: '0.76rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {restaurant.mustTryDish.note}
            </p>
          </div>
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
