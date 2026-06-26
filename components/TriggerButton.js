"use client";

export default function TriggerButton({ onClick }) {
  return (
    <div className="animate-float animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      <button className="glow-button animate-pulse-glow" onClick={onClick}>
        Unlock Celebration
      </button>
      <p style={{ opacity: 0.6, fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase' }}>
        A special gift awaits
      </p>
    </div>
  );
}
