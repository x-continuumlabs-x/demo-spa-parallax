'use client';
import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 640;

export function useIsMobile() {
	// Initialize with correct value on client side to avoid hydration mismatch
	const [isMobile, setIsMobile] = useState(() => {
		if (typeof window !== 'undefined') {
			return window.innerWidth < MOBILE_BREAKPOINT;
		}
		return false;
	});

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		// Check again on mount in case window was resized
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return isMobile;
}
