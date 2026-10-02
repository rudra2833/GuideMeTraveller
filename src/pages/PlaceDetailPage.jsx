import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Clock, Navigation, 
  ExternalLink, Heart, Footprints, ShieldCheck, 
  Sparkles, Camera, Umbrella, Users 
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import BadgeChip from '../components/ui/BadgeChip';
import TravellerTip from '../components/ui/TravellerTip';
import FavoriteBtn from '../components/ui/FavoriteBtn';
import GoogleMapsBtn from '../components/ui/GoogleMapsBtn';
import { CITIES } from '../data/tripData';
import { useHotelStore } from '../hooks/useHotelStore';
import { useFavorites } from '../hooks/useFavorites';
import { calculateDistanceKm, getEstimatedTravel, getGoogleMapsDirectionsUrl } from '../utils/distance';

export default function PlaceDetailPage() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const { getActiveHotel } = useHotelStore();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Find place across all cities
  let place = null;
  let cityKey = 'hongKong';

  for (const [cKey, cityData] of Object.entries(CITIES)) {
    const foundOfficial = cityData.officialPlaces.find(p => p.id === placeId);
    if (foundOfficial) {
      place = foundOfficial;
      cityKey = cKey;
      break;
    }
    const foundOptional = cityData.optionalPlaces.find(p => p.id === placeId);
    if (foundOptional) {
      place = foundOptional;
      cityKey = cKey;
      break;
    }
  }

  if (!place) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>Place not found.</p>
        <button onClick={() => navigate(-1)} className="btn-secondary" style={{ marginTop: '16px' }}>
          Go Back
        </button>
      </div>
    );
  }

  const city = CITIES[cityKey];
  const activeHotel = getActiveHotel(cityKey);

  // Dynamic distance calculation
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
    <div className="animate-fade-in">
      <PageHeader
        title={place.name}
        subtitle={`${city.name} • ${place.category}`}
        rightAction={
          <FavoriteBtn
            isFavorite={isFavorite(place.id)}
            onToggle={() => toggleFavorite(place)}
            label="Save"
          />
        }
      />

      <div style={{ padding: '16px 20px 40px' }}>
        {/* Large Hero Photo */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '240px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          marginBottom: '20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--color-border)'
        }}>
          <img
            src={place.image}
            alt={place.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
            <BadgeChip type={place.badge} />
          </div>
        </div>

        {/* Title & Chinese Header */}
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.65rem',
            color: 'var(--color-navy)',
            lineHeight: 1.2
          }}>
            {place.name}
          </h2>
          {place.chineseName && (
            <span style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              {place.chineseName}
            </span>
          )}
        </div>

        {/* Family Tags Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '22px'
        }}>
          {place.duration && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'var(--color-cream)',
              border: '1px solid var(--color-border)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.76rem',
              color: 'var(--color-navy)',
              fontWeight: 600
            }}>
              <Clock size={13} color="var(--color-teal)" />
              {place.duration}
            </span>
          )}

          {place.walkingLevel && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'var(--color-cream)',
              border: '1px solid var(--color-border)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.76rem',
              color: 'var(--color-navy)',
              fontWeight: 600
            }}>
              <Footprints size={13} color="var(--color-coral-dark)" />
              {place.walkingLevel}
            </span>
          )}

          {place.familyFriendly && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#EAF4E4',
              border: '1px solid #C8E2BC',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.76rem',
              color: '#3F6B28',
              fontWeight: 600
            }}>
              <Users size={13} />
              Family Friendly
            </span>
          )}

          {place.photoSpot && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'var(--color-coral-light)',
              border: '1px solid rgba(239, 167, 160, 0.4)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.76rem',
              color: 'var(--color-coral-dark)',
              fontWeight: 600
            }}>
              <Camera size={13} />
              Photo Spot
            </span>
          )}
        </div>

        {/* Why Go Editorial Paragraph */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          padding: '18px',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.18rem',
            color: 'var(--color-navy)',
            marginBottom: '8px'
          }}>
            Why Visit
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.55 }}>
            {place.whyGo}
          </p>
          <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginTop: '10px' }}>
            {place.description}
          </p>
        </div>

        {/* Dynamic Distance From Hotel Box */}
        {activeHotel && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            padding: '18px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '20px',
            borderLeft: '5px solid var(--color-teal)'
          }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--color-teal)',
              display: 'block',
              marginBottom: '2px'
            }}>
              TRANSIT FROM YOUR HOTEL
            </span>

            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.12rem',
              color: 'var(--color-navy)',
              marginBottom: '10px'
            }}>
              {activeHotel.name}
            </h4>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              padding: '10px 14px',
              backgroundColor: 'var(--color-cream)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.84rem',
              border: '1px solid var(--color-border)'
            }}>
              <div>
                <strong>Distance: </strong>
                {estimate.distStr}
              </div>
              <div>
                <strong>Approx Time: </strong>
                {estimate.timeStr}
              </div>
              <div style={{ color: 'var(--color-teal)', fontWeight: 700 }}>
                {estimate.primaryTransport}
              </div>
            </div>

            {place.hotelNotes && place.hotelNotes[activeHotel.key] && (
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '10px', fontStyle: 'italic' }}>
                💡 {place.hotelNotes[activeHotel.key]}
              </p>
            )}

            <div style={{ marginTop: '14px' }}>
              <GoogleMapsBtn url={googleMapsUrl} label="Get Turn-by-Turn Directions in Google Maps" isDirections={true} />
            </div>
          </div>
        )}

        {/* Traveller Tip */}
        <div style={{ marginBottom: '24px' }}>
          <TravellerTip tip={place.travellerTip} />
        </div>

        {/* Disclaimer Note */}
        <p style={{
          fontSize: '0.74rem',
          color: 'var(--color-text-light)',
          textAlign: 'center',
          fontStyle: 'italic',
          marginTop: '20px'
        }}>
          * Typical travel times are approximate and vary with traffic, MTR queues, and crowd conditions.
        </p>

      </div>
    </div>
  );
}
