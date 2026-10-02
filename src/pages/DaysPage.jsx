import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, Sparkles, Sun, MapPin } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { ITINERARY_DAYS, CITIES } from '../data/tripData';
import { useHotelStore } from '../hooks/useHotelStore';

export default function DaysPage() {
  const navigate = useNavigate();
  const { getActiveHotel } = useHotelStore();

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="8-Day Travel Timeline"
        subtitle="Day-by-Day Journal"
        showBack={false}
      />

      <div style={{ padding: '16px 20px 32px' }}>
        <p style={{
          fontSize: '0.84rem',
          color: 'var(--color-text-muted)',
          marginBottom: '20px',
          lineHeight: 1.45
        }}>
          Follow our daily family adventure across Hong Kong, Shenzhen, and Macau. Tap any day for timeline steps, tips, and nearby ideas!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {ITINERARY_DAYS.map((day) => {
            const city = CITIES[day.cityKey];
            const activeHotel = getActiveHotel(day.cityKey);

            return (
              <div
                key={day.dayNumber}
                onClick={() => navigate(`/day/${day.dayNumber}`)}
                className="planner-card"
                style={{
                  padding: '16px 18px',
                  cursor: 'pointer',
                  borderLeft: day.isFreeDay ? '5px solid #6E9B56' : '5px solid var(--color-coral)'
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      color: 'var(--color-navy)',
                      fontWeight: 700
                    }}>
                      DAY 0{day.dayNumber}
                    </span>

                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: 'var(--color-teal)',
                      backgroundColor: 'var(--color-teal-light)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)'
                    }}>
                      {day.date}
                    </span>
                  </div>

                  {day.isFreeDay ? (
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#3F6B28',
                      backgroundColor: '#EAF4E4',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-pill)'
                    }}>
                      🌿 Slow Day
                    </span>
                  ) : (
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--color-text-muted)'
                    }}>
                      {city.flag} {city.name}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.18rem',
                  color: 'var(--color-navy)',
                  lineHeight: 1.25,
                  marginBottom: '4px'
                }}>
                  {day.title}
                </h3>

                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-coral-dark)',
                  fontWeight: 600,
                  marginBottom: '10px'
                }}>
                  {day.subtitle}
                </p>

                {/* Highlights pill preview */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '12px'
                }}>
                  {day.officialInclusions.map((item, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        backgroundColor: 'var(--color-cream)',
                        border: '1px solid var(--color-border)',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-text-main)'
                      }}
                    >
                      • {item}
                    </span>
                  ))}
                </div>

                {/* Footer bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '8px',
                  borderTop: '1px dashed var(--color-border)',
                  fontSize: '0.74rem',
                  color: 'var(--color-text-light)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="var(--color-teal)" />
                    Base: {activeHotel?.shortName || activeHotel?.name}
                  </span>

                  <span style={{
                    color: 'var(--color-teal)',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    View Timeline <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
