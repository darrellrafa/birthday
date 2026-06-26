"use client";
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Confetti({ trigger }) {
  useEffect(() => {
    if (trigger) {
      const duration = 4000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#e11d48', '#9f1239', '#fb7185']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#e11d48', '#9f1239', '#fb7185']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else {
            // A final burst
            confetti({
                particleCount: 100,
                spread: 160,
                origin: { y: 0.6 },
                colors: ['#e11d48', '#9f1239', '#fb7185', '#ffffff']
            });
        }
      };
      frame();
    }
  }, [trigger]);

  return null;
}
