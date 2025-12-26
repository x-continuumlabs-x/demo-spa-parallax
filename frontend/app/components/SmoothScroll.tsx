"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, gsap } from "@/app/lib/gsap";
import { isTouchLowPowerDevice } from "@/app/utils/deviceCapability";

interface SmoothScrollProps {
	children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
	const smoothWrapper = useRef<HTMLDivElement>(null);
	const smoothContent = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (isTouchLowPowerDevice()) {
			// Mobile: Create manual parallax for data-speed elements
			const PARALLAX_INTENSITY = 0.5; // Adjust this value (0.1 = subtle, 1.0 = full viewport)
			const dataSpeedElements = document.querySelectorAll<HTMLElement>('[data-speed]');

			// Calculate total scrollable distance
			const pageHeight = document.body.scrollHeight;
			const viewportHeight = window.innerHeight;
			const scrollDistance = pageHeight - viewportHeight;

			dataSpeedElements.forEach((element) => {
				// Check for mobile-specific speed first, fall back to desktop speed
			const mobileSpeedAttr = element.getAttribute('data-speed-mobile');
			const speed = parseFloat(mobileSpeedAttr || element.getAttribute('data-speed') || '1');

				// Calculate total movement over entire page scroll
				// Positive Y offset makes elements lag behind (slower scroll)
				const movement = (scrollDistance * (1 - speed) * PARALLAX_INTENSITY);

				gsap.fromTo(element,
					{ y: 0 },  // Explicitly set starting position
					{
						y: movement,
						ease: "none",
						scrollTrigger: {
							trigger: document.body,
							start: "top top",
							end: "bottom bottom",
							scrub: true,
							invalidateOnRefresh: true
						}
					}
				);
			});
		} else {
			// Desktop: Use ScrollSmoother
			const smoother = ScrollSmoother.create({
				wrapper: smoothWrapper.current!,
				content: smoothContent.current!,
				smooth: 1.0,
				effects: true,
			});

			return () => {
				smoother.kill();
			};
		}
	}, []);

	return (
		<div ref={smoothWrapper} id="smooth-wrapper">
			<div ref={smoothContent} id="smooth-content">
				{children}
			</div>
		</div>
	);
}