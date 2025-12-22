'use client'
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  // Build array of all critical image paths
  const staticImages = [
    '/images/section-bg-hero.jpg',
    '/images/section-bg-hero-portrait.jpg',
    '/images/section-bg-expertise.jpg',
    '/images/section-bg-expertise-portrait.jpg',
    '/images/section-bg-highlights.jpg',
    '/images/card-ai.jpg',
    '/images/card-casting.jpg',
    '/images/card-lighting.jpg',
    '/images/services-gallery-1.jpg',
    '/images/services-gallery-2.jpg',
    '/images/services-gallery-3.jpg',
    '/images/services-gallery-desktop-1.jpg',
    '/images/services-gallery-desktop-2.jpg',
    '/images/services-gallery-desktop-3.jpg',
  ];

  // First 20 frames (frame_00036 through frame_00055)
  const frameImages = Array.from({ length: 20 }, (_, i) => {
    const frameNumber = 36 + i; // Start at 36
    return `/images/frames/frame_${String(frameNumber).padStart(5, '0')}.jpg`;
  });

  const allImages = [...staticImages, ...frameImages]; // 14 + 20 = 34 total

  const { isLoading, progress } = useImagePreloader(allImages);

  useEffect(() => {
    if (!isLoading) {
      // Add small delay before fade out for smoother UX
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div
      id="loading"
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-white text-center">
        <div className="text-2xl mb-4">Loading...</div>
        <div className="text-lg">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}
