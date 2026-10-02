import React, { useState } from 'react';
import { X, Sparkles, MapPin, StickyNote, Plus } from 'lucide-react';
import { CITIES } from '../../data/tripData';

export default function AddPlaceModal({ isOpen, onClose, onAddPlace, defaultCityKey = 'hongKong' }) {
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [cityKey, setCityKey] = useState(defaultCityKey);
  const [category, setCategory] = useState('Local Recommendation');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddPlace({
      name: name.trim(),
      note: note.trim(),
      cityKey,
      category
    });

    setName('');
    setNote('');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(31, 52, 54, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)',
          padding: '24px 20px 32px',
          boxShadow: 'var(--shadow-modal)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-coral-light)',
              color: 'var(--color-coral-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--color-navy)',
                lineHeight: 1.2
              }}>
                Add Place to AddsOn
              </h2>
              <p style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                Save a spot or recommendation suggested by a local
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* City Selection */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '6px' }}>
              Select City
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {Object.values(CITIES).map((c) => {
                const isSelected = c.id === cityKey;
                return (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => setCityKey(c.id)}
                    style={{
                      padding: '8px 6px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '2px solid var(--color-navy)' : '1px solid var(--color-border)',
                      backgroundColor: isSelected ? 'var(--color-navy)' : 'var(--color-cream)',
                      color: isSelected ? '#FFFFFF' : 'var(--color-text-main)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {c.flag} {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Place Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '6px' }}>
              Place / Spot Name *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Sing Heung Yuen Tomato Noodles or Temple St Stall"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-cream-light)',
                fontSize: '0.92rem',
                color: 'var(--color-text-main)',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Note / Recommendation */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '6px' }}>
              Note / Recommendation <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>(who suggested it & what to try)</span>
            </label>
            <textarea
              rows={4}
              placeholder="e.g. Concierge said come here for authentic crispy pork bun. Cash only. Best time around 2 PM."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-cream-light)',
                fontSize: '0.88rem',
                color: 'var(--color-text-main)',
                outline: 'none',
                resize: 'none',
                lineHeight: 1.5,
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Submit Actions */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '13px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'transparent',
                color: 'var(--color-text-main)',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              style={{
                flex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '13px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: name.trim() ? 'var(--color-coral-dark)' : 'var(--color-border)',
                color: '#FFFFFF',
                fontSize: '0.92rem',
                fontWeight: 700,
                cursor: name.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
              }}
            >
              <Plus size={18} />
              Add to AddsOn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
