import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Car, Train, Footprints, ChevronRight } from 'lucide-react';
import BadgeChip from '../ui/BadgeChip';
import TravellerTip from '../ui/TravellerTip';
import FavoriteBtn from '../ui/FavoriteBtn';
import GoogleMapsBtn from '../ui/GoogleMapsBtn';
import { calculateDistanceKm, getEstimatedTravel, getGoogleMapsDirectionsUrl } from '../../utils/distance';

export default function PlaceCard({ place, activeHotel, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  // Calculate distance & travel time dynamically from active hotel
  const distKm = calculateDistanceKm(
    activeHotel?.lat,
    activeHotel?.lng,
    place?.lat,
    place?.lng
  );
  const estimate = getEstimatedTravel(distKm);

  const googleMapsUrl = activeHotel
    ? getGoogleMapsDirectionsUrl(
        activeHotel.name,
        activeHotel.lat,
        activeHotel.lng,
        place.name,
        place.lat,
        place.lng
      )
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`;

  return (
    <div
      className="planner-card"
      onClick={() => navigate(`/place/${place.id}`)}
      style={{
        cursor: 'pointer',
        marginBottom: '20px',
        padding: '16px'
      }}
    >
      {/* Top Image with Scrapbook feel */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '180px',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        marginBottom: '14px',
        backgroundColor: 'var(--color-cream-dark)'
      }}>
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80';
          }}
        />

        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 2
        }}>
          <BadgeChip type={place.badge} />
        </div>

        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 2
        }}>
          <FavoriteBtn
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(place)}
            label=""
          />
        </div>

        {place.category && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: 'rgba(31, 52, 54, 0.75)',
            backdropFilter: 'blur(6px)',
            color: '#FFFFFF',
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '3px 9px',
            borderRadius: 'var(--radius-sm)',
            letterSpacing: '0.4px'
          }}>
            {place.category}
          </div>
        )}
      </div>

      {/* Main Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.24rem',
            color: 'var(--color-navy)',
            lineHeight: 1.25
          }}>
            {place.name}
          </h3>
          {place.chineseName && (
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              {place.chineseName}
            </span>
          )}
        </div>

        <div style={{
          color: 'var(--color-teal)',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          fontSize: '0.8rem',
          fontWeight: 700
        }}>
          <span>Details</span>
          <ChevronRight size={16} />
        </div>
      </div>

      <p style={{
        fontSize: '0.86rem',
        color: 'var(--color-text-main)',
        marginTop: '8px',
        lineHeight: 1.45,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {place.whyGo || place.description}
      </p>

      {/* Hotel Proximity Box */}
      {activeHotel && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          backgroundColor: 'var(--color-cream)',
          borderRadius: 'var(--radius-sm)',
          marginTop: '12px',
          fontSize: '0.78rem',
          border: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-navy)', fontWeight: 700 }}>
            <MapPin size={13} color="var(--color-coral-dark)" />
            <span>{estimate.distStr}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)' }}>
            <Clock size={13} />
            <span>{estimate.timeStr}</span>
          </div>

          <div style={{ color: 'var(--color-teal)', fontWeight: 600 }}>
            {estimate.primaryTransport}
          </div>

          <span style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginLeft: 'auto' }}>
            from {activeHotel.shortName || activeHotel.name}
          </span>
        </div>
      )}

      {/* Traveller Tip */}
      <TravellerTip tip={place.travellerTip} />

      {/* Action Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '14px',
        paddingTop: '10px',
        borderTop: '1px solid var(--color-border)'
      }}>
        <GoogleMapsBtn url={googleMapsUrl} label="Directions from Hotel" isDirections={true} />

        {place.duration && (
          <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            ⏱ {place.duration}
          </span>
        )}
      </div>
    </div>
  );
}
