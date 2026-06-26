"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function StackedCarousel({ photos = [] }) {
  const [cards, setCards] = useState(photos);

  const handleDragEnd = (event, info) => {
    // Threshold for a swipe to be considered 'complete'
    const swipeThreshold = 50; 
    if (info.offset.x > swipeThreshold || info.offset.x < -swipeThreshold) {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        const topCard = newCards.shift();
        newCards.push(topCard);
        return newCards;
      });
    }
  };

  if (cards.length === 0) return null;

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%',
      maxWidth: '256px',
      aspectRatio: '3/4', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      margin: '1.5rem auto',
      perspective: '1000px'
    }}>
      {cards.map((src, index) => {
        const isTop = index === 0;
        // Dynamically calculate scale, position, and rotation for organic stacking
        const scale = Math.max(1 - index * 0.05, 0.85);
        const yOffset = index * 12;
        const zIndex = cards.length - index;
        const rotate = index === 0 ? 0 : (index % 2 === 0 ? 3 : -3) * index;

        return (
          <motion.div
            key={src}
            layout
            className="glass-panel"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: isTop ? '0 15px 35px rgba(225, 29, 72, 0.4)' : '0 8px 20px rgba(0, 0, 0, 0.4)',
              background: '#1a0505',
              zIndex: zIndex,
              cursor: isTop ? 'grab' : 'auto',
              transformOrigin: 'bottom center'
            }}
            animate={{ 
              scale: scale, 
              y: yOffset, 
              rotate: rotate,
              opacity: index < 4 ? 1 - index * 0.15 : 0 
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={isTop ? handleDragEnd : undefined}
            whileDrag={{ scale: 1.05, rotate: 5, cursor: 'grabbing', boxShadow: '0 20px 40px rgba(225, 29, 72, 0.6)' }}
            whileTap={{ cursor: 'grabbing' }}
          >
            <Image 
              src={src} 
              alt="Polaroid Memory" 
              fill
              style={{ objectFit: 'cover' }}
              unoptimized={true}
              draggable="false"
              priority={isTop}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
