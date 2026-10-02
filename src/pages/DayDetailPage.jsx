import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, MapPin, Building2, 
  Sparkles, Coffee, Clock, Compass, ShieldCheck 
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import TravellerTip from '../components/ui/TravellerTip';
import BadgeChip from '../components/ui/BadgeChip';
import { ITINERARY_DAYS, CITIES } from '../data/tripData';
import { useHotelStore } from '../hooks/useHotelStore';
import PlaceCard from '../components/places/PlaceCard';
import { useFavorites } from '../hooks/useFavorites';

export default function DayDetailPage() {
  const { dayNumber } = useParams();
  const navigate = useNavigate();
  const num = parseInt(dayNumber, 10);
  const { getActiveHotel } = useHotelStore();
  const { isFavorite, toggleFavorite } = useFavorites();

  const day = ITINERARY_DAYS.find(d => d.dayNumber === num) || ITINERARY_DAYS[0];
  const city = CITIES[day.cityKey];
  const activeHotel = getActiveHotel(day.cityKey);

  // Get places belonging to this day or optional recommendations
  const dayPlaces = city.officialPlaces.filter(p => p.dayNumber === day.dayNumber);
  const optionalPlaces = city.optionalPlaces.slice(0, 2);

  const prevDay = num > 1 ? num - 1 : null;
  const nextDay = num < 8 ? num + 1 : null;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={`Day 0${day.dayNumber}: ${day.title}`}
        subtitle={`${day.date} • ${city.name}`}
      />

      <div style={{ padding: '16px 20px 32px' }}>
        
        {/* Hero image card with journal vibe */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          marginBottom: '20px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--color-border)'
        }}>
          <img
            src={day.heroImage}
            alt={day.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px 16px 14px',
            background: 'linear-gradient(to top, rgba(31,52,54,0.92) 0%, rgba(31,52,54,0.4) 60%, transparent 100%)',
            color: '#FFF8F1'
          }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--color-coral)'
            }}>
              {city.flag} {city.name} {day.isFreeDay ? '• 🌿 Free Day' : '• Tour Itinerary'}
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              lineHeight: 1.2,
              marginTop: '2px'
            }}>
              {day.title}
            </h2>
            <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>
              {day.subtitle}
            </p>
          </div>
        </div>

        {/* Free Day Banner if applicable */}
        {day.isFreeDay && (
          <div style={{
            backgroundColor: '#EAF4E4',
            border: '1px solid #C8E2BC',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 18px',
            marginBottom: '22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '1.3rem' }}>🌿</span>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                color: '#2F541E'
              }}>
                Slow Day Mode
              </h4>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#3A6326', lineHeight: 1.45 }}>
              No fixed tour sightseeing today! Sleep in, wander near your hotel, explore shopping streets, or check out our handpicked free-day ideas below.
            </p>
          </div>
        )}

        {/* Active Hotel Base Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--color-teal)'
            }}>
              YOUR BASE FOR THIS DAY
            </span>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.02rem',
              color: 'var(--color-navy)',
              marginTop: '1px'
            }}>
              {activeHotel.name}
            </h4>
            <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>
              {activeHotel.area}
            </span>
          </div>

          <button
            onClick={() => navigate('/explore')}
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              color: 'var(--color-coral-dark)',
              backgroundColor: 'var(--color-coral-light)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-pill)'
            }}
          >
            Change Base ⇄
          </button>
        </div>

        {/* Day Timeline Section */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: 'var(--color-navy)'
            }}>
              Today's Schedule
            </h3>
            <span className="script-annotation">
              step-by-step ✦
            </span>
          </div>

          <div style={{
            position: 'relative',
            paddingLeft: '28px',
            borderLeft: '2px dashed var(--color-coral)',
            marginLeft: '8px'
          }}>
            {day.timeline.map((item, idx) => (
              <div key={idx} style={{ position: 'relative', marginBottom: '22px' }}>
                {/* Numbered node circle */}
                <div style={{
                  position: 'absolute',
                  left: '-37px',
                  top: '0px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '3px solid var(--color-coral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: 'var(--color-navy)',
                  boxShadow: '0 0 0 2px #FFFFFF'
                }}>
                  {idx + 1}
                </div>

                <div style={{
                  display: 'inline-block',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--color-teal)',
                  backgroundColor: 'var(--color-cream)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '4px',
                  border: '1px solid var(--color-border)'
                }}>
                  ⏱ {item.time}
                </div>

                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.08rem',
                  color: 'var(--color-navy)',
                  lineHeight: 1.25,
                  marginBottom: '4px'
                }}>
                  {item.title}
                </h4>

                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Day's Featured Places (if any official) */}
        {dayPlaces.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              color: 'var(--color-navy)',
              marginBottom: '14px'
            }}>
              Featured Official Attractions
            </h3>

            {dayPlaces.map(place => (
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

        {/* Day Traveller Tip */}
        <div style={{ marginBottom: '28px' }}>
          <TravellerTip tip={day.tips} customTitle="Day Advice from Tour Notes" />
        </div>

        {/* Navigation Buttons: Previous / Next Day */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)'
        }}>
          {prevDay ? (
            <button
              onClick={() => navigate(`/day/${prevDay}`)}
              className="btn-secondary"
            >
              <ArrowLeft size={16} />
              <span>Day 0{prevDay}</span>
            </button>
          ) : <div />}

          {nextDay && (
            <button
              onClick={() => navigate(`/day/${nextDay}`)}
              className="btn-primary"
            >
              <span>Day 0{nextDay}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
