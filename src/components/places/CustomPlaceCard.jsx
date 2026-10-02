import React, { useState } from 'react';
import { MapPin, Trash2, StickyNote, Sparkles, CheckCircle, Circle, Check } from 'lucide-react';
import GoogleMapsBtn from '../ui/GoogleMapsBtn';
import { getGoogleMapsPlaceUrl } from '../../utils/distance';

export default function CustomPlaceCard({ place, cityName, onDelete, isVisited, onToggleVisited, canDelete = true }) {
  const [confirming, setConfirming] = useState(false);
  const mapsUrl = getGoogleMapsPlaceUrl(place.name, cityName);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirming) {
      onDelete(place.id);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3500);
    }
  };

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleVisited) {
      onToggleVisited(place.id);
    }
  };

  return (
    <div
      className={`planner-card animate-fade-in ${isVisited ? 'visited-card' : ''}`}
      style={{
        padding: '16px 18px',
        marginBottom: '16px',
        backgroundColor: isVisited ? '#F8FAF9' : '#FFFFFF',
        borderLeft: isVisited ? '4px solid var(--color-sage)' : '4px solid var(--color-coral-dark)',
        opacity: isVisited ? 0.78 : 1,
        transition: 'all 0.25s ease',
        position: 'relative'
      }}
    >
      {/* Header with Tick Checklist & Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Checkbox Tick Button */}
          <button
            type="button"
            onClick={handleToggle}
            title={isVisited ? "Mark as unvisited" : "Mark as visited"}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: isVisited ? '#E8F5E9' : 'var(--color-cream)',
              border: isVisited ? '1px solid #A5D6A7' : '1px solid var(--color-border)',
              borderRadius: 'var(--radius-pill)',
              padding: '4px 10px',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: isVisited ? '#2E7D32' : 'var(--color-text-main)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isVisited ? (
              <>
                <CheckCircle size={14} color="#2E7D32" />
                <span>Visited ✓</span>
              </>
            ) : (
              <>
                <Circle size={14} color="var(--color-text-muted)" />
                <span>To Visit</span>
              </>
            )}
          </button>

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '0.70rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: isVisited ? 'var(--color-text-muted)' : 'var(--color-coral-dark)',
            backgroundColor: isVisited ? 'var(--color-border)' : 'var(--color-coral-light)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-pill)'
          }}>
            <Sparkles size={11} />
            {place.category || 'AddsOn'}
          </span>
        </div>

        {canDelete && onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            title={confirming ? "Click to confirm removal" : "Delete place"}
            style={{
              background: confirming ? '#FEE2E2' : 'transparent',
              border: confirming ? '1px solid #EF4444' : 'none',
              color: confirming ? '#DC2626' : 'var(--color-text-light)',
              cursor: 'pointer',
              padding: confirming ? '4px 10px' : '6px',
              borderRadius: 'var(--radius-pill)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              fontWeight: confirming ? 700 : 500,
              transition: 'all 0.2s ease'
            }}
          >
            <Trash2 size={confirming ? 13 : 15} />
            {confirming && <span>Tap to Delete</span>}
          </button>
        )}
      </div>

      {/* Place Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.22rem',
        color: isVisited ? 'var(--color-text-muted)' : 'var(--color-navy)',
        textDecoration: isVisited ? 'line-through' : 'none',
        marginBottom: '8px',
        lineHeight: 1.25,
        transition: 'color 0.2s ease'
      }}>
        {place.name}
      </h3>

      {/* Note / Tip */}
      {place.note && (
        <div style={{
          backgroundColor: isVisited ? '#F1F4F3' : 'var(--color-cream)',
          border: '1px dashed var(--color-border-hover)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 12px',
          marginTop: '6px',
          marginBottom: '14px',
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-start'
        }}>
          <StickyNote size={15} color={isVisited ? "var(--color-sage-dark)" : "var(--color-coral-dark)"} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{
            fontSize: '0.85rem',
            color: isVisited ? 'var(--color-text-muted)' : 'var(--color-text-main)',
            lineHeight: 1.45,
            whiteSpace: 'pre-wrap'
          }}>
            {place.note}
          </p>
        </div>
      )}

      {/* Footer with Google Maps quick search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '10px',
        borderTop: '1px solid var(--color-border)'
      }}>
        <GoogleMapsBtn url={mapsUrl} label="Search on Google Maps" isDirections={false} />

        <span style={{ fontSize: '0.72rem', color: isVisited ? '#2E7D32' : 'var(--color-text-light)', fontWeight: isVisited ? 600 : 400 }}>
          {isVisited ? '✓ Completed' : '📍 ' + cityName}
        </span>
      </div>
    </div>
  );
}
