import React from 'react';
import { ExternalLink, Navigation } from 'lucide-react';

export default function GoogleMapsBtn({ url, label = "Open in Google Maps", isDirections = false }) {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.8rem',
        fontWeight: 700,
        color: 'var(--color-navy)',
        backgroundColor: 'var(--color-cream)',
        border: '1px solid var(--color-border-hover)',
        padding: '8px 14px',
        borderRadius: 'var(--radius-pill)',
        textDecoration: 'none',
        transition: 'all 0.15s ease'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {isDirections ? <Navigation size={13} color="var(--color-teal)" /> : <ExternalLink size={13} />}
      <span>{label}</span>
    </a>
  );
}
