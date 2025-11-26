"use client";

import { Props } from "@/types";
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
		gsap.registerPlugin(ScrollTrigger);

		const galleryContainer = sectionRef.current?.querySelector<HTMLElement>(
		"#galleryContainer"
		);
		const images = galleryContainer?.querySelectorAll<HTMLImageElement>("img");

		if (!galleryContainer || !images || images.length < 2) return;

		const galleryHeight = galleryContainer.getBoundingClientRect().height;
		const numImages = images.length;

		const smoother = ScrollSmoother.get ? ScrollSmoother.get() : null;

		// Total scroll distance for pinning: each image scrolls one full container height
		const totalScroll = galleryHeight * (numImages - 1);

		// Timeline for sequential image animation
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				pin: true,
				start: "top top",
				end: `+=${totalScroll}`,
				scroller: smoother?.content(),
				scrub: true,
				onUpdate: () => {
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
		images.forEach((img, i) => {
			if (i === 0) return; // first image stays in place
			tl.to(
				img,
				{
					y: -galleryHeight * i,
					ease: "none",
				},
				(i - 1) * 0.5 // stagger: start each after previous completes (adjust 0.5 as needed)
			);
		});

		// Store ScrollTrigger instance for tab navigation
		if (tl.scrollTrigger) {
			scrollTriggerRef.current = tl.scrollTrigger;
		}
	}, { scope: wrapperRef });
	
	return(
		<section ref={sectionRef} id="services" className="w-full h-screen overflow-hidden flex flex-col">
			<div className="py-[30px]">
				<Tabs
					selectedKey={selectedTab}
					onSelectionChange={(key) => {
						setSelectedTab(key as string);
						console.log("Tab clicked:", key);

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

							// Each image corresponds to a specific scroll progress
							// Image 0: scroll progress = 0 (start)
							// Image 1: scroll progress = 0.5 (halfway through total scroll)
							// Image 2: scroll progress = 1.0 (end)
							// This is because totalScroll = galleryHeight * (numImages - 1)
							// So each image takes up 1/(numImages-1) of the total scroll
							const targetProgress = imageIndex / (3 - 1); // 3 images total

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
						}
					}}
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
			<div 
				className="relative w-full"
				style={{ height: `calc(100vh - ${minGallerySpacing})` }}
			>
				<div
					className="absolute right-0 top-0 overflow-hidden"
					style={{
						maxWidth: `76vw`,
						height: `100%`,
						aspectRatio: `1.8154 / 1`,
					}}
				>
					<div className="relative w-full h-full">
						<div id="galleryContainer"
							className="absolute right-0 top-0 overflow-hidden"
							style={{
								height: `calc(100vh - ${minGallerySpacing})`,
								width: `calc((100vh - ${minGallerySpacing}) * 1.8154)`,
								maxWidth: "76vw",
								maxHeight: "calc(76vw / 1.8154)",
							}}
						>
							<img
								src="/local-images/section-bg-services-desktop.jpg"
								alt="Photo portrait of an old man"
								className="absolute top-0 left-0 h-full w-full object-cover opacity-50"
							/>
							<img
								src="/local-images/section-bg-services-desktop.jpg"
								alt="Photo portrait of an old man"
								className="absolute top-0 left-0 h-full w-full object-cover opacity-50"
							/>
							<img
								src="/local-images/section-bg-services-desktop.jpg"
								alt="Photo portrait of an old man"
								className="absolute left-0 h-full w-full object-cover opacity-50"
							/>
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