import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, Calendar, Sparkles, MapPin, Building2, 
  ArrowRight, Heart, BookOpen, Compass, Coffee, 
  CheckSquare, ShieldCheck, ChevronRight, Sun
} from 'lucide-react';
import { TRIP_INFO, CITIES, ITINERARY_DAYS } from '../data/tripData';
import { useHotelStore } from '../hooks/useHotelStore';
import HotelSwitcher from '../components/city/HotelSwitcher';

export default function HomePage() {
  const navigate = useNavigate();
  const { selectedHotels, setHotel, getActiveHotel } = useHotelStore();
  
  // Selected city on home preview
  const [activeCityKey, setActiveCityKey] = useState('hongKong');
  const [showHotelModal, setShowHotelModal] = useState(false);

  const activeCity = CITIES[activeCityKey];
  const activeHotel = getActiveHotel(activeCityKey);

  // Day 1 as default current day
  const currentDay = ITINERARY_DAYS[0];

  return (
    <div className="animate-fade-in" style={{ padding: '16px 20px 32px' }}>
      
      {/* 1. TRAVEL NOTEBOOK COVER HERO */}
      <div style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '36px 24px 28px',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        textAlign: 'center',
        overflow: 'hidden',
        marginTop: '12px'
      }}>
        {/* Scrapbook Washi Tape */}
        <div className="washi-tape" />

        {/* Decorative background blobs */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-coral-light)',
          opacity: 0.5,
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-sage-light)',
          opacity: 0.5,
          zIndex: 0
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--color-cream)',
            padding: '5px 14px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--color-border)',
            marginBottom: '14px'
          }}>
            <Sparkles size={13} color="var(--color-coral-dark)" />
            <span style={{
              fontFamily: 'var(--font-script)',
              fontSize: '1.25rem',
              color: 'var(--color-teal)',
              lineHeight: 1
            }}>
              our little travel journal
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.2rem',
            color: 'var(--color-navy)',
            lineHeight: 1.15,
            letterSpacing: '-0.5px'
          }}>
            guideMeTraveller
          </h1>

          <p style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: 'var(--color-coral-dark)',
            margin: '8px 0 16px'
          }}>
            Hong Kong → Shenzhen → Macau
          </p>

          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: 'var(--color-cream)',
            borderRadius: 'var(--radius-pill)',
            border: '1px dashed var(--color-border-hover)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--color-navy)'
          }}>
            📅 07 — 14 NOV 2026 • 8 DAYS
          </div>

          {/* Dotted separator */}
          <div style={{
            margin: '22px auto 14px',
            width: '60px',
            borderBottom: '2px dashed var(--color-coral)',
            opacity: 0.8
          }} />

          <p style={{
            fontFamily: 'var(--font-script)',
            fontSize: '1.35rem',
            color: 'var(--color-teal)',
            lineHeight: 1.2
          }}>
            "8 days • 3 cities • family memories ✦"
          </p>
        </div>
      </div>

      {/* 2. QUICK CITY SELECTOR PILLS */}
      <div style={{ marginTop: '24px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <span style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--color-text-muted)'
          }}>
            Select City Destination
          </span>
          <span className="script-annotation">
            tap to preview ✈
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {Object.values(CITIES).map((c) => {
            const isSelected = c.id === activeCityKey;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCityKey(c.id)}
                style={{
                  padding: '12px 8px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--color-navy)' : '#FFFFFF',
                  color: isSelected ? '#FFF8F1' : 'var(--color-navy)',
                  border: isSelected ? '1px solid var(--color-navy)' : '1px solid var(--color-border)',
                  boxShadow: isSelected ? 'var(--shadow-subtle)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{c.flag}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{c.name}</span>
                <span style={{
                  fontSize: '0.65rem',
                  opacity: isSelected ? 0.85 : 0.6,
                  color: isSelected ? '#FFF8F1' : 'var(--color-text-muted)'
                }}>
                  {c.nights.split(' ')[0]} {c.nights.split(' ')[1]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. YOUR BASE CARD (HOTEL SWITCHER PREVIEW) */}
      <div style={{
        marginTop: '22px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: '18px',
        boxShadow: 'var(--shadow-card)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.7rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: 'var(--color-coral-dark)',
              backgroundColor: 'var(--color-coral-light)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-pill)',
              marginBottom: '6px'
            }}>
              <Building2 size={12} />
              YOUR {activeCity.name.toUpperCase()} BASE
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.22rem',
              color: 'var(--color-navy)',
              lineHeight: 1.25
            }}>
              {activeHotel.name}
            </h3>
            
            <p style={{
              fontSize: '0.78rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '4px'
            }}>
              <MapPin size={12} color="var(--color-teal)" />
              {activeHotel.area}
            </p>
          </div>

          <button
            onClick={() => setShowHotelModal(!showHotelModal)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--color-cream)',
              border: '1px solid var(--color-border-hover)',
              color: 'var(--color-navy)',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {showHotelModal ? 'Close' : 'Switch Base ⇄'}
          </button>
        </div>

        {/* Collapsible Hotel Switcher */}
        {showHotelModal ? (
          <div style={{ marginTop: '14px' }}>
            <HotelSwitcher
              cityKey={activeCityKey}
              selectedHotelKey={selectedHotels[activeCityKey] || 'hotel1'}
              onSelectHotel={(hKey) => {
                setHotel(activeCityKey, hKey);
                setShowHotelModal(false);
              }}
            />
          </div>
        ) : (
          <div style={{
            marginTop: '12px',
            padding: '10px 12px',
            backgroundColor: 'var(--color-cream)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.76rem',
            color: 'var(--color-text-main)',
            border: '1px solid var(--color-border)'
          }}>
            <strong>✨ Proximity Advantage: </strong>
            {activeHotel.bestFor[0]}
          </div>
        )}
      </div>

      {/* 4. TODAY'S LITTLE PLAN CARD (DAY 1 SHOWCASE) */}
      <div style={{
        marginTop: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        padding: '22px 20px',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: 'var(--color-coral-dark)'
            }}>
              ITINERARY KICK-OFF
            </span>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.38rem',
              color: 'var(--color-navy)',
              lineHeight: 1.2
            }}>
              Day 01: Arrival & The Peak
            </h3>
          </div>

          <span style={{
            fontSize: '0.76rem',
            fontWeight: 800,
            padding: '4px 10px',
            backgroundColor: 'var(--color-cream)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-pill)',
            color: 'var(--color-navy)'
          }}>
            7 NOV
          </span>
        </div>

        {/* Vertical mini timeline with planner aesthetic */}
        <div style={{
          position: 'relative',
          paddingLeft: '22px',
          margin: '16px 0 20px',
          borderLeft: '2px dashed var(--color-coral)'
        }}>
          {currentDay.timeline.slice(0, 4).map((step, idx) => (
            <div key={idx} style={{ position: 'relative', marginBottom: '14px' }}>
              <div style={{
                position: 'absolute',
                left: '-29px',
                top: '2px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '3px solid var(--color-coral)',
                boxShadow: '0 0 0 2px #FFFFFF'
              }} />
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-teal)' }}>
                {step.time}
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-navy)', lineHeight: 1.3 }}>
                {step.title}
              </div>
            </div>
          ))}
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
            + Dinner & Hotel Check-in
          </div>
        </div>

        {/* CTA to full day */}
        <button
          onClick={() => navigate('/day/1')}
          className="btn-primary"
          style={{ width: '100%' }}
        >
          <span>Explore Today's Full Plan</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* 5. EXPLORE SHORTCUT GRID */}
      <div style={{ marginTop: '28px' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          color: 'var(--color-navy)',
          marginBottom: '14px'
        }}>
          Travel Notebook Chapters
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <div
            onClick={() => navigate('/days')}
            className="planner-card"
            style={{ padding: '16px', cursor: 'pointer' }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-coral-light)',
              color: 'var(--color-coral-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <Calendar size={18} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--color-navy)' }}>
              8-Day Itinerary
            </h4>
            <p style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Day-by-day planner & free days
            </p>
          </div>

          <div
            onClick={() => navigate('/explore')}
            className="planner-card"
            style={{ padding: '16px', cursor: 'pointer' }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-sage-light)',
              color: 'var(--color-sage-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <Compass size={18} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--color-navy)' }}>
              Places to Wander
            </h4>
            <p style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Core & optional sights
            </p>
          </div>

          <div
            onClick={() => navigate('/map')}
            className="planner-card"
            style={{ padding: '16px', cursor: 'pointer' }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-teal-light)',
              color: 'var(--color-teal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <MapPin size={18} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--color-navy)' }}>
              Real Road Map
            </h4>
            <p style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Leaflet & hotel pins
            </p>
          </div>

          <div
            onClick={() => navigate('/more')}
            className="planner-card"
            style={{ padding: '16px', cursor: 'pointer' }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFF2DF',
              color: '#B5670D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              <Coffee size={18} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--color-navy)' }}>
              Food & Little Notes
            </h4>
            <p style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Veg restaurants & checklist
            </p>
          </div>
        </div>
      </div>

      {/* 6. TOUR OPERATOR DISCLAIMER FOOTER NOTE */}
      <div style={{
        marginTop: '32px',
        padding: '14px 16px',
        backgroundColor: 'var(--color-cream)',
        border: '1px dashed var(--color-border-hover)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start'
      }}>
        <ShieldCheck size={16} color="var(--color-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
          <strong>Tour Operator Note:</strong> {TRIP_INFO.disclaimer}
        </p>
      </div>

    </div>
  );
}
