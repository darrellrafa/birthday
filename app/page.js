"use client";
import { useState, useEffect } from 'react';
import TriggerButton from '@/components/TriggerButton';
import CelebrationMessage from '@/components/CelebrationMessage';
import Confetti from '@/components/Confetti';

export default function Home() {
  const [phase, setPhase] = useState('waiting'); // 'waiting', 'intro', 'gallery'
  const [isLocked, setIsLocked] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Replace this with the ID of your YouTube video!
  // For example, if your link is https://www.youtube.com/watch?v=dQw4w9WgXcQ
  // The ID is: dQw4w9WgXcQ
  const youtubeVideoId = "o_UfJHtmFOY";

  const myPhotos = [
    '/image-1.jpeg',
    '/image-2.jpeg',
    '/image-3.jpeg',
    '/image-4.jpeg',
    '/image-5.jpeg',
    '/image-6.jpeg',
    '/image-7.jpeg',
    '/image-8.jpeg',
    '/image-9.jpeg',
    '/image-10.jpeg',
    '/wleee.jpeg',
    '/image-11.jpeg',
    '/image-12.jpeg',
    '/image-13.jpeg',
    '/image-14.jpeg',
    '/image-15.jpeg',
    '/image-16.jpeg',
    '/image-17.jpeg',
    '/image-18.jpeg',
    '/image-19.jpeg',
    '/image-20.jpeg',
    '/image-21.jpeg',
    '/image-22.jpeg',
    '/image-23.jpeg'
  ];

  useEffect(() => {
    setIsMounted(true);
    
    // Target time: June 27, 2026 at 00:00:00 (GMT+7)
    const targetDate = new Date('2026-06-27T00:00:00+07:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsLocked(false);
        clearInterval(interval);
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Pad with zeros for cleaner look
        const h = String(hours).padStart(2, '0');
        const m = String(minutes).padStart(2, '0');
        const s = String(seconds).padStart(2, '0');

        setTimeLeft(`${h}:${m}:${s}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === 'intro') {
      // Confetti runs for ~4 seconds. We wait 4.5s to show the photos.
      const timer = setTimeout(() => {
        setPhase('gallery');
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleStart = () => {
    // Send a message to the pre-loaded YouTube iframe to start playing instantly
    const player = document.getElementById('yt-player');
    if (player && player.contentWindow) {
      player.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    setPhase('intro');
  };

  if (!isMounted) return null;

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {isLocked ? (
        <div className="glass-panel animate-fade-in-scale responsive-panel" style={{ textAlign: 'center', zIndex: 10 }}>
          <h1 className="text-gradient responsive-title">
            Not Yet!
          </h1>
          <p className="responsive-text">
            The surprise will unlock on June 27th at exactly midnight. Come back in:
          </p>
          <div style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            letterSpacing: '4px',
            color: 'var(--primary)',
            textShadow: '0 0 20px rgba(225, 29, 72, 0.5)',
            fontFamily: 'monospace'
          }}>
            {timeLeft}
          </div>
        </div>
      ) : (
        <>
          <Confetti trigger={phase === 'intro'} />

          {/* The iframe is rendered with opacity 0 instead of display: none to force the browser to fully preload it without throttling */}
          <iframe
            id="yt-player"
            width="10"
            height="10"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&controls=0`}
            title="YouTube Background Music"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            style={{ opacity: 0, position: 'absolute', top: 0, left: 0, zIndex: -9999, pointerEvents: 'none' }}
          ></iframe>

          {phase === 'waiting' ? (
            <TriggerButton onClick={handleStart} />
          ) : (
            <CelebrationMessage
              name="My Dearest 'Friend'"
              message="May this year bring you as much happiness and joy as you've brought into my life. Keep shining brightly!"
              phase={phase}
              photos={myPhotos}
            />
          )}
        </>
      )}
    </main>
  );
}
