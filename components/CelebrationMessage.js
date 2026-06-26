"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CelebrationMessage({ 
  name = "Friend", 
  message = "Wishing you the happiest of birthdays filled with joy, laughter, and unforgettable moments!", 
  phase,
  photos = []
}) {
  const [introIndex, setIntroIndex] = useState(0);

  useEffect(() => {
    if (phase === 'intro' && photos.length > 0) {
      // Rapidly cycle through photos during the 4.5s intro
      const intervalTime = Math.max(150, 4500 / photos.length);
      const interval = setInterval(() => {
        setIntroIndex((prev) => (prev + 1) % photos.length);
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, [phase, photos.length]);

  return (
    <div className="glass-panel animate-fade-in-scale responsive-panel" style={{ 
      margin: '20px', 
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'all 0.5s ease'
    }}>
      <h1 className="text-gradient responsive-title">
        Happy Birthday,<br/>{name}!
      </h1>
      
      {phase === 'gallery' && (
        <p className="animate-fade-in responsive-text">
          {message}
        </p>
      )}

      {/* Intro Phase: Rapidly cycling images */}
      {phase === 'intro' && photos.length > 0 && (
        <div style={{ 
          marginTop: '0.8rem',
          borderRadius: '16px', 
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(225, 29, 72, 0.4)',
          width: '208px',
          height: '272px',
          position: 'relative'
        }}>
          {/* Using a standard img tag here instead of Next.js Image to prevent Vercel optimization lag during 150ms rapid cycles */}
          <img 
            src={photos[introIndex]} 
            alt="Rapid Memory" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Gallery Phase: Swiper Carousel */}
      {phase === 'gallery' && photos.length > 0 && (
        <div className="animate-fade-in" style={{ 
          width: '100%', 
          maxWidth: '256px', 
          marginTop: '0.8rem' 
        }}>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Navigation, Pagination]}
            navigation={true}
            pagination={{ clickable: true }}
            className="mySwiper"
            style={{ padding: '16px 0' }}
          >
            {photos.map((src, index) => (
              <SwiperSlide key={index} style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
                aspectRatio: '3/4',
                position: 'relative',
                background: '#1a0505'
              }}>
                <Image 
                  src={src} 
                  alt={`Memory ${index + 1}`} 
                  fill
                  style={{ objectFit: 'cover' }}
                  unoptimized={true}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <p style={{ marginTop: '1.2rem', fontSize: '0.85rem', opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase' }}>
            Swipe to explore
          </p>
        </div>
      )}
    </div>
  );
}
