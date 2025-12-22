'use client'
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useState, useEffect } from 'react';
import { ScrollSmoother } from '@/app/lib/gsap';

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

    // Restore scrollbar when loading completes (CSS hides it by default)
    useEffect(() => {
        if (!isLoading) {
            // Add CSS to show scrollbar (override globals.css)
            const style = document.createElement('style');
            style.id = 'show-scrollbar';
            style.innerHTML = `
                html {
                    scrollbar-width: auto !important;
                    -ms-overflow-style: auto !important;
                }
                html::-webkit-scrollbar {
                    display: block !important;
                }
            `;
            document.head.appendChild(style);
        }
    }, [isLoading]);

    useEffect(() => {
        if (!isLoading) {
            // Get ScrollSmoother instance and scroll to top instantly (no animation)
            const smoother = ScrollSmoother.get();
            if (smoother) {
                smoother.scrollTo(0, false); // false = instant, no animation
            }

            // Fallback: also directly set scroll positions
            window.scrollTo({ top: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            const smoothWrapper = document.getElementById('smooth-wrapper');
            const smoothContent = document.getElementById('smooth-content');
            if (smoothWrapper) smoothWrapper.scrollTop = 0;
            if (smoothContent) smoothContent.scrollTop = 0;

            // Re-enable overflow
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            // Then fade out the loading screen
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 bg-background z-[9999] flex items-center justify-center transition-opacity duration-500 ${
                isLoading ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ touchAction: 'none' }}
        >
            <div className="font-mainfont font-black tracking-[-0.06em] uppercase text-[14px] text-center">
				<div className="flex flex-row items-center">
					<svg
						className="mr-2"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 13 50 33.34"
						width="32"
						height="32"
						>
						<g fill="none" stroke="#b7b0a8" strokeLinecap="round" strokeLinejoin="round">
						<rect
							x="0.688"
							y="16.84"
							width="48.625"
							height="28.5"
						/>

						<polyline
							points="14.688,16.822 14.688,13.697 4.062,13.697 4.062,16.822"
						/>

						<circle
							cx="24"
							cy="31.09"
							r="9.375"
						/>

						<line
							x1="45.625"
							y1="21.232"
							x2="37.875"
							y2="21.232"
						/>
						</g>
					</svg>
					<span className="mr-1">Loading</span>
					<span className="w-[35px] text-left"> {Math.round(progress)}%</span>
				</div>
            </div>
        </div>
    );
}
