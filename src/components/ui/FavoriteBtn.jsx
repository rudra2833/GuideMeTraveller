import React from 'react';
import { Heart } from 'lucide-react';

export default function FavoriteBtn({ isFavorite, onToggle, label = "Save" }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isFavorite ? "Remove from Our Picks" : "Save to Our Picks"}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: isFavorite ? '#FFEBE9' : '#FFFFFF',
        border: isFavorite ? '1px solid var(--color-coral)' : '1px solid var(--color-border)',
        color: isFavorite ? 'var(--color-coral-dark)' : 'var(--color-text-muted)',
        fontSize: '0.8rem',
        fontWeight: 600,
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
    >
      <Heart
        size={15}
        fill={isFavorite ? 'var(--color-coral)' : 'transparent'}
        color={isFavorite ? 'var(--color-coral-dark)' : 'currentColor'}
      />
      <span>{isFavorite ? 'Saved' : label}</span>
    </button>
  );
}
