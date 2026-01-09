'use client'
import { useState, useEffect } from 'react';

export function useImagePreloader(imagePaths: string[]) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset state when effect runs
    setLoadedCount(0);
    setIsLoading(true);

    if (imagePaths.length === 0) {
      setIsLoading(false);
      return;
    }

    let loaded = 0;
    const imageHandlers: Array<{ img: HTMLImageElement; onLoad: () => void; onError: () => void }> = [];

    imagePaths.forEach((path) => {
      const img = new Image();

      const handleLoad = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === imagePaths.length) {
          setIsLoading(false);
        }
      };

      const handleError = () => {
        // Count errors as "loaded" to prevent infinite loading
        loaded++;
        setLoadedCount(loaded);
        if (loaded === imagePaths.length) {
          setIsLoading(false);
        }
      };

      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);
      img.src = path;

      // Handle synchronously loaded cached images
      if (img.complete) {
        if (img.naturalWidth > 0) {
          handleLoad();
        } else {
          handleError();
        }
      }

      imageHandlers.push({ img, onLoad: handleLoad, onError: handleError });
    });

    return () => {
      imageHandlers.forEach(({ img, onLoad, onError }) => {
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onError);
      });
    };
  }, [imagePaths]);

  return {
    isLoading,
    progress: imagePaths.length > 0 ? (loadedCount / imagePaths.length) * 100 : 100
  };
}
