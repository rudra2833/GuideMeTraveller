import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PageHeader({ title, subtitle, showBack = true, rightAction = null }) {
  const navigate = useNavigate();

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px 12px',
      position: 'sticky',
      top: 0,
      backgroundColor: 'rgba(255, 248, 241, 0.96)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 100,
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-navy)',
              boxShadow: 'var(--shadow-subtle)',
              cursor: 'pointer'
            }}
            aria-label="Go Back"
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <div>
          {subtitle && (
            <span style={{
              display: 'block',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: 'var(--color-teal)'
            }}>
              {subtitle}
            </span>
          )}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.28rem',
            color: 'var(--color-navy)',
            lineHeight: 1.2
          }}>
            {title}
          </h1>
        </div>
      </div>

      {rightAction && (
        <div>{rightAction}</div>
      )}
    </header>
  );
}
