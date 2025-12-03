"use client";

import { Props } from "@/types";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/app/lib/gsap";
import { Tabs } from "@heroui/react";
import { useViewportHeight } from "@/app/utils/useViewportHeight";

export default function Services({ wrapperRef }: Props) {
	const vh: number = useViewportHeight();

	const [selectedTab, setSelectedTab] = useState("img1");
	const isUserClickingTab = useRef(false);
	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const imgWrapperRef = useRef<HTMLDivElement>(null);
	const img2Ref = useRef<HTMLDivElement>(null);
	const img3Ref = useRef<HTMLDivElement>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

	const imgWidthLandscape: number = 2665;
	const imgHeightLandscape: number = 1468;
	const imgWidthPortrait: number = 2235;
	const imgHeightPortrait: number = 1468;
	const widthRatioLandscape: number = imgWidthLandscape / imgHeightLandscape;
	const widthRatioPortrait: number = imgWidthPortrait / imgHeightPortrait;
	const heightRatioLandscape: number = imgHeightLandscape / imgWidthLandscape;
	const heightRatioPortrait: number = imgHeightPortrait / imgWidthPortrait;
	const minGallerySpacing: string = '182px';

	useGSAP(() => {
		const galleryContainer = sectionRef.current?.querySelector<HTMLElement>(
		"#galleryContainer"
		);
		const images = galleryContainer?.querySelectorAll<HTMLImageElement>("img");

		if (!galleryContainer || !images || images.length < 2) return;

		const galleryHeight = galleryContainer.getBoundingClientRect().height;
		const numImages = images.length;

		const smoother = ScrollSmoother.get ? ScrollSmoother.get() : null;

		// Total scroll distance for pinning
		// No stagger overlap: photoA animates from 0-1, photoB animates from 1-2
		// Total timeline duration = 2, each "unit" represents galleryHeight of scroll
		const timelineDuration = numImages - 1; // 2 animations, each duration 1
		const totalScroll = galleryHeight * timelineDuration;

		// Timeline for sequential image animation
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				pin: true,
				start: "top top",
				end: `+=${totalScroll}`,
				scroller: smoother?.content(),
				scrub: true,
				onLeave: () => {
					// When scrolling past the end, ensure last tab is selected
					console.log('ScrollTrigger: onLeave');
					setSelectedTab("img3");
				},
				onLeaveBack: () => {
					// When scrolling back past the start, ensure first tab is selected
					console.log('ScrollTrigger: onLeaveBack');
					setSelectedTab("img1");
				},
				onUpdate: (self) => {
					// Skip automatic tab updates if user is clicking tabs
					if (isUserClickingTab.current) {
						return;
					}

					// Determine which image is currently most visible and update the selected tab
					const progress = self.progress;

					// Convert scroll progress to timeline time
					const currentTime = progress * timelineDuration;

					// Determine which image based on timeline time
					// photoA visible: timeline 0 to 1 (as it animates out)
					// photoB visible: timeline 1 to 2 (as it animates out)
					// photoC visible: timeline 2 (both animations complete)
					// Use 1/3 transitions for balanced switching:
					// - Switch to photoB at 0.33 (1/3 through photoA animation)
					// - Switch to photoC at 1.33 (1/3 through photoB animation)
					let currentImageIndex = 0;
					if (currentTime >= 1.33) {
						currentImageIndex = 2;
					} else if (currentTime >= 0.33) {
						currentImageIndex = 1;
					}

					// Map image index to tab key
					const tabKeys = ["img1", "img2", "img3"];
					const newTab = tabKeys[currentImageIndex];

					// Debug log
					console.log('currentTime:', currentTime.toFixed(2), 'currentImageIndex:', currentImageIndex, 'newTab:', newTab, 'selectedTab:', selectedTab);

					// Update selected tab if it changed
					if (newTab !== selectedTab) {
						setSelectedTab(newTab);
					}

					// Calculate progress based on visibility in container, not total animation
					for (let i = 1; i < numImages; i++) {
						const currentY = gsap.getProperty(images[i], "y") as number;

						// An image becomes visible when it starts moving (y < 0)
						// It's fully visible when it has moved galleryHeight pixels up
						// For all images, visibility is based on moving one galleryHeight
						const visibilityStart = 0;
						const visibilityEnd = -galleryHeight;

						// Clamp currentY to the visibility range
						const clampedY = Math.max(Math.min(currentY, visibilityStart), visibilityEnd);
						const distanceIntoView = Math.abs(clampedY - visibilityStart);
						const totalVisibilityDistance = Math.abs(visibilityEnd - visibilityStart);
						const progress = (distanceIntoView / totalVisibilityDistance) * 100;

						// Only log if image is actively moving into view (between 0% and 100%)
						if (progress > 0 && progress < 100) {
							console.log(`Image ${i} is animating - ${progress.toFixed(1)}% complete`);
						}
					}
				},
			},
		});

		// Animate images one after another
		// Images in DOM: [photoC, photoB, photoA] (reverse order)
		// photoC (images[0]) = bottom layer, stays static
		// photoB (images[1]) = middle layer, animates second
		// photoA (images[2]) = top layer, animates first
		// We need to animate in reverse order: photoA first, then photoB

		// Animate photoA (last image in DOM, index 2) first
		if (images[2]) {
			tl.fromTo(
				images[2],
				{ y: 0 },
				{
					y: -galleryHeight,
					ease: "none",
					duration: 1,
				},
				0 // Start at timeline time 0
			);
		}

		// Animate photoB (middle image in DOM, index 1) second
		// Start AFTER photoA finishes (at timeline time 1)
		if (images[1]) {
			tl.fromTo(
				images[1],
				{ y: 0 },
				{
					y: -galleryHeight,
					ease: "none",
					duration: 1,
				},
				1 // Start at timeline time 1 (after photoA completes)
			);
		}

		// photoC (first image in DOM, index 0) stays static - no animation

		// Store ScrollTrigger instance for tab navigation
		if (tl.scrollTrigger) {
			scrollTriggerRef.current = tl.scrollTrigger;
		}
	}, { scope: wrapperRef });
	
	return(
		<section ref={sectionRef} id="services" className="w-full h-screen overflow-hidden flex flex-col">
			<div className="py-[30px] w-full flex justify-center">
				<Tabs
					selectedKey={selectedTab}
					onSelectionChange={(key) => {
						setSelectedTab(key as string);
						console.log("Tab clicked:", key);

						// Set flag to prevent onUpdate from changing tab during animation
						isUserClickingTab.current = true;

						// Clear any existing timeout
						if (scrollTimeoutRef.current) {
							clearTimeout(scrollTimeoutRef.current);
						}

						// Map tab key to image index
						const tabMap: { [key: string]: number } = {
							img1: 0,
							img2: 1,
							img3: 2,
						};
						const imageIndex = tabMap[key as string];

						// Calculate scroll position for this image
						if (scrollTriggerRef.current && sectionRef.current) {
							const st = scrollTriggerRef.current;

							// Calculate target timeline time for each image
							// Image 0 (photoA showing): timeline time = 0
							// Image 1 (photoB showing): timeline time = 1.0 (photoA finished, photoB at midpoint)
							// Image 2 (photoC showing): timeline time = 2.0 (both finished)
							let targetTimelineTime = 0;
							if (imageIndex === 1) {
								targetTimelineTime = 1.0; // photoB at midpoint
							} else if (imageIndex === 2) {
								targetTimelineTime = 2.0; // both animations complete
							}

							// Timeline duration is 2 (no overlap)
							const timelineDuration = 2;
							const targetProgress = targetTimelineTime / timelineDuration;

							// Calculate actual scroll position
							const scrollStart = st.start;
							const scrollEnd = st.end;
							const scrollDistance = scrollEnd - scrollStart;
							const targetScroll = scrollStart + scrollDistance * targetProgress;

							// Scroll to position using ScrollSmoother
							const smoother = ScrollSmoother.get();
							if (smoother) {
								smoother.scrollTo(targetScroll, true, "power2.inOut");
							}

							// Re-enable automatic tab updates after animation completes
							// ScrollSmoother default duration is ~1 second with power2.inOut easing
							scrollTimeoutRef.current = setTimeout(() => {
								isUserClickingTab.current = false;
								console.log("Tab click animation complete - re-enabling auto tab updates");
							}, 1200); // Slightly longer than animation duration to be safe
						}
					}}
				>
					<Tabs.ListContainer className="rounded-2xl ">
						<Tabs.List
							aria-label="Service options"
							className="
								flex flex-row justify-center gap-2 p-3 bg-[#1e1c1b]

								*:rounded-2xl 
								*:bg-[#b7b0a8]/5
								*:flex 
								*:items-center 
								*:min-w-[220px] 
								*:px-6 
								*:h-14 
								*:text-left 
								*:text-[13px] 
								*:uppercase 
								*:font-nominee 
								*:font-black 
								
								*:data-[hover=true]:opacity-80
								"
						>
							<Tabs.Tab id="img1" className="text-[#b7b0a8] data-[selected=true]:text-[#1e1c1b] before:w-0">
								Service 1
								<Tabs.Indicator className="bg-[#b7b0a8] rounded-2xl" />
							</Tabs.Tab>
							<Tabs.Tab id="img2" className="text-[#b7b0a8] data-[selected=true]:text-[#1e1c1b] before:w-0">
								Service 2
								<Tabs.Indicator className="bg-[#b7b0a8] rounded-2xl" />
							</Tabs.Tab>
							<Tabs.Tab id="img3" className="text-[#b7b0a8] data-[selected=true]:text-[#1e1c1b] before:w-0">
								Service 3
								<Tabs.Indicator className="bg-[#b7b0a8] rounded-2xl" />
							</Tabs.Tab>
						</Tabs.List>
					</Tabs.ListContainer>
				</Tabs>
			</div>
			<div 
				className="relative w-full"
				style={{ height: `calc(100vh - ${minGallerySpacing})` }}
			>
				<div
					className="absolute right-0 top-0 overflow-hidden [--ar:1.5225] lg:[--ar:1.8154]"
					style={{
						maxWidth: `76vw`,
						height: `100%`,
						aspectRatio: `var(--ar) / 1`,
					}}
				>
					<div className="relative w-full h-full">
						<div id="galleryContainer"
							className="absolute right-0 top-0 overflow-hidden"
							style={{
								height: `calc(100vh - ${minGallerySpacing})`,
								width: `calc((100vh - ${minGallerySpacing}) * var(--ar))`,
								maxWidth: "76vw",
								maxHeight: "calc(76vw / var(--ar))",
							}}
						>
							<picture>
								<source
									media="(min-width: 640px)"
									srcSet="/local-images/services-gallery-desktop-3.jpg"
								/>
								<img
									src="/local-images/services-gallery-3.jpg"
									id="photoC" 
									alt="Photo portrait of an old man" 
									className="absolute top-0 left-0 h-full w-full object-cover"
								/>
							</picture>
							<picture>
								<source
									media="(min-width: 640px)"
									srcSet="/local-images/services-gallery-desktop-2.jpg"
								/>
								<img
									src="/local-images/services-gallery-2.jpg"
									id="photoB" 
									alt="Photo portrait of an old man" 
									className="absolute top-0 left-0 h-full w-full object-cover"
								/>
							</picture>
							<picture>
								<source
									media="(min-width: 640px)"
									srcSet="/local-images/services-gallery-desktop-1.jpg"
								/>
								<img
									src="/local-images/services-gallery-1.jpg"
									id="photoA" 
									alt="Photo portrait of an old man" 
									className="absolute top-0 left-0 h-full w-full object-cover"
								/>
							</picture>
						</div>
						
						
					</div>
				</div>
				
				<div className="absolute top-[20vh] left-[15vw]" data-speed="0.9">
					<h1 className="text-[3vw] uppercase font-nominee font-black tracking-[-0.08em] leading-[1.0em] mb-[15px]">$599 Ut <br />architecto <br />voluptatem</h1>
					<p className="w-[25vw] max-w-[410px] text-[15px] leading-[1.0em] opacity-60">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
				</div>
			</div>
		</section>
	);
}