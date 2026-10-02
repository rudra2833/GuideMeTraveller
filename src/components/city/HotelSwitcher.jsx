import React from 'react';
import { Building2, Check, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { CITIES } from '../../data/tripData';

export default function HotelSwitcher({ cityKey, selectedHotelKey, onSelectHotel }) {
  const city = CITIES[cityKey];
  if (!city || !city.hotels) return null;

  const { hotel1, hotel2 } = city.hotels;

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border)',
      padding: '20px 18px',
      boxShadow: 'var(--shadow-card)',
      margin: '16px 0 24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--color-teal)',
            display: 'block'
          }}>
            Your {city.name} Base
          </span>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.24rem',
            color: 'var(--color-navy)',
            marginTop: '2px'
          }}>
            Choose Your Hotel
          </h3>
        </div>

        <span className="script-annotation" style={{ transform: 'rotate(-4deg)', fontSize: '1.15rem' }}>
          tap to switch! ✦
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Hotel Option 1 */}
        <div
          onClick={() => onSelectHotel('hotel1')}
          style={{
            border: selectedHotelKey === 'hotel1'
              ? '2px solid var(--color-coral)'
              : '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            backgroundColor: selectedHotelKey === 'hotel1' ? 'var(--color-cream)' : '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  backgroundColor: 'var(--color-navy)',
                  color: '#FFFFFF',
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-pill)'
                }}>
                  OPTION 1
                </span>
                {hotel1.officialNote && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-teal)', fontWeight: 700 }}>
                    {hotel1.officialNote}
                  </span>
                )}
              </div>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.08rem',
                color: 'var(--color-navy)',
                lineHeight: 1.25
              }}>
                {hotel1.name}
              </h4>
              <p style={{
                fontSize: '0.78rem',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '4px'
              }}>
                <MapPin size={12} color="var(--color-teal)" />
                {hotel1.area}
              </p>
            </div>

            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: selectedHotelKey === 'hotel1' ? 'none' : '2px solid var(--color-border)',
              backgroundColor: selectedHotelKey === 'hotel1' ? 'var(--color-coral)' : 'transparent',
              color: '#FFFFFF',
              flexShrink: 0
            }}>
              {selectedHotelKey === 'hotel1' && <Check size={16} strokeWidth={3} />}
            </div>
          </div>

          {/* Quick Best For Chips */}
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {hotel1.bestFor.slice(0, 2).map((item, idx) => (
              <span key={idx} style={{
                fontSize: '0.72rem',
                color: 'var(--color-text-main)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid var(--color-border)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)'
              }}>
                ✓ {item}
              </span>
            ))}
          </div>
        </div>

        {/* Hotel Option 2 */}
        <div
          onClick={() => onSelectHotel('hotel2')}
          style={{
            border: selectedHotelKey === 'hotel2'
              ? '2px solid var(--color-coral)'
              : '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            backgroundColor: selectedHotelKey === 'hotel2' ? 'var(--color-cream)' : '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, paddingRight: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  backgroundColor: 'var(--color-teal)',
                  color: '#FFFFFF',
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-pill)'
                }}>
                  OPTION 2
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                  Alternative base
                </span>
              </div>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.08rem',
                color: 'var(--color-navy)',
                lineHeight: 1.25
              }}>
                {hotel2.name}
              </h4>
              <p style={{
                fontSize: '0.78rem',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '4px'
              }}>
                <MapPin size={12} color="var(--color-teal)" />
                {hotel2.area}
              </p>
            </div>

            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: selectedHotelKey === 'hotel2' ? 'none' : '2px solid var(--color-border)',
              backgroundColor: selectedHotelKey === 'hotel2' ? 'var(--color-coral)' : 'transparent',
              color: '#FFFFFF',
              flexShrink: 0
            }}>
              {selectedHotelKey === 'hotel2' && <Check size={16} strokeWidth={3} />}
            </div>
          </div>

          {/* Quick Best For Chips */}
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {hotel2.bestFor.slice(0, 2).map((item, idx) => (
              <span key={idx} style={{
                fontSize: '0.72rem',
                color: 'var(--color-text-main)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid var(--color-border)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)'
              }}>
                ✓ {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {cityKey === 'macau' && (
        <div style={{
          marginTop: '12px',
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-start',
          fontSize: '0.74rem',
          color: 'var(--color-text-muted)',
          backgroundColor: 'var(--color-cream)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-sm)',
          border: '1px dashed var(--color-border-hover)'
        }}>
          <AlertCircle size={14} color="var(--color-teal)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            <strong>Note for Macau:</strong> The Venetian is officially listed in the tour operator PDF. The Parisian is provided as an alternate planning base for dual exploration.
          </span>
        </div>
      )}

      <p style={{
        fontSize: '0.74rem',
        color: 'var(--color-text-light)',
        textAlign: 'center',
        marginTop: '12px'
      }}>
        ✨ All distances, travel times, and maps below calculate from your chosen hotel!
      </p>
    </div>
  );
}
