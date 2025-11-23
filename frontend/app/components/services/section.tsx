"use client";

import { Props } from "@/types";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Tabs, Tab } from "@heroui/react";
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

	const imgWidthLandscape: number = 2665;
	const imgHeightLandscape: number = 1468;
	const imgWidthPortrait: number = 2235;
	const imgHeightPortrait: number = 1468;
	const widthRatioLandscape: number = imgWidthLandscape / imgHeightLandscape;
	const widthRatioPortrait: number = imgWidthPortrait / imgHeightPortrait;
	const heightRatioLandscape: number = imgHeightLandscape / imgWidthLandscape;
	const heightRatioPortrait: number = imgHeightPortrait / imgWidthPortrait;

	// Required spacing: 30px (top) + 72px (tabs) + 30px (spacing) + 50px (bottom)
	const requiredSpacing = 182;
	const availableHeight = vh - requiredSpacing;

	// Calculate container dimensions based on viewport and aspect ratio
	// Start with 76vw width, but scale down if height would exceed available space
	const [containerDimensions, setContainerDimensions] = useState({
		widthLandscape: 76,
		heightLandscape: 76 * heightRatioLandscape,
		widthPortrait: 76,
		heightPortrait: 76 * heightRatioPortrait,
	});

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const calculateContainerSize = (heightRatio: number) => {
			const idealWidth = 76; // 76vw
			const idealHeight = idealWidth * heightRatio; // in vw units

			// Convert available height from px to vw
			const availableHeightVw = (availableHeight / window.innerWidth) * 100;

			if (idealHeight <= availableHeightVw) {
				// Image fits at 76vw width
				return { width: idealWidth, height: idealHeight };
			} else {
				// Scale down to fit available height
				const scaledWidth = availableHeightVw / heightRatio;
				return { width: scaledWidth, height: availableHeightVw };
			}
		};

		const landscape = calculateContainerSize(heightRatioLandscape);
		const portrait = calculateContainerSize(heightRatioPortrait);

		setContainerDimensions({
			widthLandscape: landscape.width,
			heightLandscape: landscape.height,
			widthPortrait: portrait.width,
			heightPortrait: portrait.height,
		});
	}, [vh, availableHeight, heightRatioLandscape, heightRatioPortrait]);

	useGSAP( () => {
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.create({
			trigger: '#services',
			pin: true,
			start: 'center center',
			end: '+=800',
		});
		},
		{
			scope: wrapperRef,// Check if this is needed
		}
	);

	// useEffect(() => {
	// 	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

	// 	// Wait until ScrollSmoother exists
	// 	const checkSmoother = () => {
	// 		const smoother = ScrollSmoother.get();
	// 		if (!smoother) {
	// 			requestAnimationFrame(checkSmoother);
	// 			return;
	// 		}

	// 		// Calculate animation durations
	// 		const wrapperHeight = imgWrapperRef.current?.offsetHeight || 2000;
	// 		const animationDuration = wrapperHeight / 2; // Each image animates over half the wrapper height
	// 		const totalDuration = animationDuration * 2; // Total pin duration for both animations

	// 		// Animate img2 scrolling up to reveal
	// 		gsap.fromTo(img2Ref.current,
	// 			{ y: "100%" },
	// 			{
	// 				y: "0%",
	// 				ease: "none",
	// 				scrollTrigger: {
	// 					trigger: sectionRef.current,
	// 					start: "top top",
	// 					end: () => `+=${animationDuration}`,
	// 					scrub: 1,
	// 				}
	// 			}
	// 		);

	// 		// Animate img3 scrolling up to reveal
	// 		gsap.fromTo(img3Ref.current,
	// 			{ y: "100%" },
	// 			{
	// 				y: "0%",
	// 				ease: "none",
	// 				scrollTrigger: {
	// 					trigger: sectionRef.current,
	// 					start: () => `top+=${animationDuration} top`,
	// 					end: () => `+=${animationDuration}`,
	// 					scrub: 1,
	// 				}
	// 			}
	// 		);

	// 		// Pin the Services section until img3 finishes
	// 		ScrollTrigger.create({
	// 			trigger: sectionRef.current,
	// 			start: "top top",
	// 			end: () => `+=${totalDuration}`,
	// 			pin: true,
	// 			pinSpacing: true,
	// 		});

	// 		// Update selected tab based on scroll position
	// 		ScrollTrigger.create({
	// 			trigger: sectionRef.current,
	// 			start: "top top",
	// 			end: () => `+=${totalDuration}`,
	// 			onUpdate: (self) => {
	// 				// Don't update tab if user is manually clicking
	// 				if (isUserClickingTab.current) return;

	// 				const progress = self.progress;

	// 				console.log(progress);

	// 				// Determine which tab should be selected based on scroll progress
	// 				let newTab;
	// 				if (progress < 0.35) {
	// 					newTab = "img1";
	// 				} else if (progress < 0.68) {
	// 					newTab = "img2";
	// 				} else {
	// 					newTab = "img3";
	// 				}

	// 				// Only update if tab actually changes
	// 				if (newTab !== selectedTab) {
	// 					setSelectedTab(newTab);
	// 				}
	// 			},
	// 		});

	// 		ScrollTrigger.refresh();
	// 	};

	// 	checkSmoother();
	// }, []);

	// // Handle tab selection and scroll to the selected image
	// useEffect(() => {
	// 	if (!sectionRef.current) return;

	// 	const smoother = ScrollSmoother.get();
	// 	if (!smoother) return;

	// 	// Clear any pending timeout from previous clicks
	// 	if (scrollTimeoutRef.current) {
	// 		clearTimeout(scrollTimeoutRef.current);
	// 	}

	// 	// Set flag to prevent scroll-based tab updates during manual click
	// 	isUserClickingTab.current = true;

	// 	// Wait for cursor animation to start and progress before scrolling
	// 	requestAnimationFrame(() => {
	// 		requestAnimationFrame(() => {
	// 			scrollTimeoutRef.current = setTimeout(() => {
	// 				const wrapperHeight = imgWrapperRef.current?.offsetHeight || 2000;
	// 				const animationDuration = wrapperHeight / 2;

	// 				// Calculate scroll position based on selected tab
	// 				let scrollPosition = 0;

	// 				if (selectedTab === "img1") {
	// 					scrollPosition = smoother.offset(sectionRef.current, "top top");
	// 				} else if (selectedTab === "img2") {
	// 					scrollPosition = smoother.offset(sectionRef.current, "top top") + animationDuration;
	// 				} else if (selectedTab === "img3") {
	// 					scrollPosition = smoother.offset(sectionRef.current, "top top") + (animationDuration * 2);
	// 				}

	// 				smoother.scrollTo(scrollPosition, true, "power2.inOut");

	// 				// Reset flag after scroll animation completes
	// 				scrollTimeoutRef.current = setTimeout(() => {
	// 					isUserClickingTab.current = false;
	// 					scrollTimeoutRef.current = null;
	// 				}, 1200);
	// 			}, 200);
	// 		});
	// 	});
	// }, [selectedTab]);

	return(
		<section ref={sectionRef} id="services" className="w-full h-screen overflow-hidden flex flex-col">
			<div className="pt-[30px]">
				<Tabs
					selectedKey={selectedTab}
					onSelectionChange={(key) => setSelectedTab(key as string)}
					variant="light"
					aria-label="Service options"
					classNames={{
						base: "w-full flex justify-center",
						tabList: "gap-2 rounded-2xl p-3 bg-[#1e1c1b]",
						cursor: "bg-[#b7b0a8] rounded-xl",
						tab: "px-6 h-12 text-left data-[hover-unselected=true]:opacity-80",
						tabContent: "group-data-[selected=true]:text-[#1e1c1b] text-[#b7b0a8] uppercase font-nominee font-black text-[13px]"
					}}
				>
					<Tab key="img1" title="Service 1" />
					<Tab key="img2" title="Service 2" />
					<Tab key="img3" title="Service 3" />
				</Tabs>
			</div>
			<div className="relative flex justify-end w-full pt-[30px] pb-[50px]">
				<div
					ref={imgWrapperRef}
					id="img-wrapper"
					style={{
						'--width-landscape': `${containerDimensions.widthLandscape}vw`,
						'--height-landscape': `${containerDimensions.heightLandscape}vw`,
						'--width-portrait': `${containerDimensions.widthPortrait}vw`,
						'--height-portrait': `${containerDimensions.heightPortrait}vw`,
					} as React.CSSProperties}
					className="relative w-[var(--width-landscape)] h-[var(--height-landscape)] portrait:w-[var(--width-portrait)] portrait:h-[var(--height-portrait)] overflow-hidden"
				>
					<div ref={img2Ref} id="img1" className="absolute top-0 left-0 w-full h-full">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-services-desktop.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/local-images/section-bg-services.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthPortrait}
							height={imgHeightPortrait}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="hidden portrait:block"
							priority
						/>
					</div>
				
					<div ref={img2Ref} id="img2" className="absolute top-0 left-0 w-full h-full">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-services-desktop.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/local-images/section-bg-services.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthPortrait}
							height={imgHeightPortrait}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="hidden portrait:block"
							priority
						/>
					</div>

					<div ref={img3Ref} id="img3" className="absolute top-0 left-0 w-full h-full">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-services-desktop.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/local-images/section-bg-services.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthPortrait}
							height={imgHeightPortrait}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="hidden portrait:block"
							priority
						/>
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