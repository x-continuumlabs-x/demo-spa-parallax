'use client'
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useState, useEffect } from 'react';
import { ScrollSmoother } from '@/app/lib/gsap';

interface LoadingScreenProps {
    staticImages: string[];
    frameImages: string[];
}

export default function LoadingScreen({ staticImages, frameImages }: LoadingScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const allImages = [...staticImages, ...frameImages];
    const { isLoading, progress } = useImagePreloader(allImages);

    // Restore scrollbar when loading completes
    useEffect(() => {
        if (!isLoading) {
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
            // Try to get ScrollSmoother instance (desktop only)
            const smoother = ScrollSmoother.get();
            if (smoother) {
                smoother.scrollTo(0, false); // false = no animation
            } else {
                // Mobile: use native scroll
                window.scrollTo({ top: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }

            // Desktop: reset smooth wrapper scroll positions
            const smoothWrapper = document.getElementById('smooth-wrapper');
            const smoothContent = document.getElementById('smooth-content');
            if (smoothWrapper) smoothWrapper.scrollTop = 0;
            if (smoothContent) smoothContent.scrollTop = 0;

            // Re-enable overflow
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            // Fade out the loading screen
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
