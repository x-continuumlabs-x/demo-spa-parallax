"use client";

import { Props } from "@/types";
import { useRef, useState, useEffect } from "react";
import Image  from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, ScrollSmoother } from "@/app/lib/gsap";
import { Tabs } from "@heroui/react";
import { isTouchLowPowerDevice } from "@/app/utils/deviceCapability";

const ANIMATION_DURATIONS = {
	contentFade: 2.0,
	splitText: 0.8,
	splitTextStagger: 0.1,
	paragraphFade: 0.6,
	paragraphDelay: 0.4,
} as const;

const TIMING = {
	resizeDebounce: 50,
	tabClickTimeout: 1200,
} as const;

const TAB_SWITCH_THRESHOLDS = {
	first: 0.33,
	second: 1.33,
} as const;

const TIMELINE_DURATION = 2;

const TAB_MAP: { [key: string]: number } = {
	img1: 0,
	img2: 1,
	img3: 2,
};

const TAB_KEYS = ["img1", "img2", "img3"];

const createImageAnimations = (
	tl: gsap.core.Timeline,
	images: HTMLImageElement[],
	galleryHeight: number
) => {
	if (images[2]) {
		tl.fromTo(
			images[2],
			{ y: 0 },
			{
				y: -galleryHeight,
				ease: "none",
				duration: 1,
			},
			0
		);
	}
	if (images[1]) {
		tl.fromTo(
			images[1],
			{ y: 0 },
			{
				y: -galleryHeight,
				ease: "none",
				duration: 1,
			},
			1
		);
	}
};

const calculateTargetTimelineTime = (imageIndex: number): number => {
	if (imageIndex === 1) {
		return 1.0;
	} else if (imageIndex === 2) {
		return 2.0;
	}
	return 0;
};

export default function Services({ wrapperRef }: Props) {
	const [selectedTab, setSelectedTab] = useState("img1");
	const isUserClickingTab = useRef(false);
	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const sectionRef = useRef<HTMLElement>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const contentRef1 = useRef<HTMLDivElement>(null);
	const contentRef2 = useRef<HTMLDivElement>(null);
	const contentRef3 = useRef<HTMLDivElement>(null);
	const previousTabRef = useRef<string>("img1");
	const [galleryHeight, setGalleryHeight] = useState<number>(0);

	useGSAP(() => {
		const galleryContainer = sectionRef.current?.querySelector<HTMLElement>(
		"#galleryContainer"
		);
		// Get all images, then filter to only visible ones (not display: none)
		const allImages = galleryContainer?.querySelectorAll<HTMLImageElement>("img");
		const images = allImages ? Array.from(allImages).filter(img => {
			// offsetParent is null for elements with display: none
			return img.offsetParent !== null;
		}) : [];

		if (!galleryContainer || images.length < 2) return;

		const galleryHeight = galleryContainer.getBoundingClientRect().height;
		setGalleryHeight(galleryHeight);
		const numImages = images.length;
		const smoother = ScrollSmoother.get ? ScrollSmoother.get() : null;
		const timelineDuration = numImages - 1;
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
					setSelectedTab("img3");
				},
				onLeaveBack: () => {
					setSelectedTab("img1");
				},
				onUpdate: (self) => {
					if (isUserClickingTab.current) {
						return;
					}

					const progress = self.progress;
					const currentTime = progress * timelineDuration;

					let currentImageIndex = 0;
					if (currentTime >= TAB_SWITCH_THRESHOLDS.second) {
						currentImageIndex = 2;
					} else if (currentTime >= TAB_SWITCH_THRESHOLDS.first) {
						currentImageIndex = 1;
					}

					const newTab = TAB_KEYS[currentImageIndex];

					if (newTab !== selectedTab) {
						setSelectedTab(newTab);
					}
				},
			},
		});

		createImageAnimations(tl, images, galleryHeight);

		timelineRef.current = tl;
		if (tl.scrollTrigger) {
			scrollTriggerRef.current = tl.scrollTrigger;
		}
	}, { scope: wrapperRef });

	// Tab content animations
	useEffect(() => {
		if (!contentRef1.current || !contentRef2.current || !contentRef3.current) return;

		const contentMap = {
			img1: { ref: contentRef1, key: "t1" },
			img2: { ref: contentRef2, key: "t2" },
			img3: { ref: contentRef3, key: "t3" }
		};

		const prevContent = contentMap[previousTabRef.current as keyof typeof contentMap];
		const newContent = contentMap[selectedTab as keyof typeof contentMap];

		if (previousTabRef.current === selectedTab) return;

		// HIDE PREVIOUS (instant - no animation)
		if (prevContent?.ref.current) {
			gsap.set(prevContent.ref.current, { display: "none" });
			const prevPara = prevContent.ref.current.querySelector("p");
			if (prevPara) gsap.set(prevPara, { opacity: 0 });

		}

		// SHOW & ANIMATE NEW
		if (newContent?.ref.current) {
			const contentEl = newContent.ref.current;
			const h2 = contentEl.querySelector("h2");
			const p = contentEl.querySelector("p");

			gsap.killTweensOf([contentEl, h2, p]);
			gsap.set(contentEl, { display: "block", opacity: 0 });

			gsap.to(contentEl, {
				opacity: 1,
				duration: ANIMATION_DURATIONS.contentFade,
				ease: "power2.out"
			});

			if (h2 && p) {
				gsap.set(h2, { opacity: 0 });

				gsap.to(h2, {
					opacity: 1,
					duration: ANIMATION_DURATIONS.splitText,
					ease: "power2.out"
				});

				gsap.to(p, {
					opacity: 0.6,
					duration: ANIMATION_DURATIONS.paragraphFade,
					ease: "power2.out",
					delay: ANIMATION_DURATIONS.paragraphDelay
				});
			}
		}

		previousTabRef.current = selectedTab;
	}, [selectedTab]);

	useEffect(() => {
		if (!timelineRef.current) return;

		const timer = setTimeout(() => {
			const galleryContainer = sectionRef.current?.querySelector<HTMLElement>("#galleryContainer");
			const allImages = galleryContainer?.querySelectorAll<HTMLImageElement>("img");
			const images = allImages ? Array.from(allImages).filter(img => {
				return img.offsetParent !== null;
			}) : [];
			const tl = timelineRef.current;

			if (!galleryContainer || images.length < 2 || !tl) return;

			const newGalleryHeight = galleryContainer.getBoundingClientRect().height;
			setGalleryHeight(newGalleryHeight);

			tl.clear();
			createImageAnimations(tl, images, newGalleryHeight);

			ScrollTrigger.refresh();
		}, TIMING.resizeDebounce);

		return () => clearTimeout(timer);
	}, []);

	return(
		<section ref={sectionRef} id="services" className="w-full h-screen overflow-hidden flex flex-col">
			<div className="pt-[30px] pb-[20px] sm:py-[30px] w-full flex justify-center">
				<Tabs
					id="tabs" 
					className="flex-col" 
					selectedKey={selectedTab}
					onSelectionChange={(key) => {
						setSelectedTab(key as string);

						isUserClickingTab.current = true;

						if (scrollTimeoutRef.current) {
							clearTimeout(scrollTimeoutRef.current);
						}

						const imageIndex = TAB_MAP[key as string];

						if (scrollTriggerRef.current && sectionRef.current) {
							const st = scrollTriggerRef.current;

							const targetTimelineTime = calculateTargetTimelineTime(imageIndex);
							const targetProgress = targetTimelineTime / TIMELINE_DURATION;

							const scrollStart = st.start;
							const scrollEnd = st.end;
							const scrollDistance = scrollEnd - scrollStart;
							const targetScroll = scrollStart + scrollDistance * targetProgress;

							if (isTouchLowPowerDevice()) {
								// Mobile: Use native scroll
								window.scrollTo({ top: targetScroll, behavior: 'smooth' });
							} else {
								// Desktop: Use ScrollSmoother
								const smoother = ScrollSmoother.get();
								if (smoother) {
									smoother.scrollTo(targetScroll, true, "power2.inOut");
								}
							}

							scrollTimeoutRef.current = setTimeout(() => {
								isUserClickingTab.current = false;
							}, TIMING.tabClickTimeout);
						}
					}}
				>
					<Tabs.ListContainer className="rounded-2xl ">
						<Tabs.List
							aria-label="Service options"
							className="
								flex flex-col sm:flex-row justify-center gap-2 p-3 bg-[#1e1c1b]

								*:rounded-2xl 
								*:bg-[#b7b0a8]/5
								*:flex 
								*:items-center 
								*:min-w-[82vw] 
								*:sm:min-w-[220px] 
								*:px-6 
								*:h-[30px] 
								*:sm:h-14 
								*:text-left 
								*:text-[12px] 
								*:sm:text-[13px] 
								*:uppercase 
								*:font-mainfont 
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
				className="relative flex justify-end w-full h-auto"
			>
				<div
					className="
						
						overflow-hidden 
						h-auto 
						w-full
						max-w-[88vw] 
						mx-[6vw] 
						sm:max-w-[76vw] 
						sm:mx-0 
						"
				>
					<div 
						id="galleryContainer"
						className="
							relative overflow-hidden 
							w-full 
							aspect-2235/1468 
							sm:aspect-2665/1468 
							sm:max-h-[calc(100vh-168px)]
						"
					>
						<Image
							src="/images/preloaded/services-gallery-3.jpg"
							id="photoC"
							width={2235} 
							height={1468} 
							alt="Photo of a young woman" 
							className="block sm:hidden absolute top-0 left-0 h-full w-full object-cover"
						/>
						<Image
							src="/images/preloaded/services-gallery-desktop-3.jpg"
							id="photoC"
							width={2665} 
							height={1468} 
							alt="Photo of a young woman" 
							className="hidden sm:block absolute top-0 left-0 h-full w-full object-cover"
						/>
						<Image
							src="/images/preloaded/services-gallery-2.jpg"
							id="photoB"
							width={2235} 
							height={1468} 
							alt="Photo of a young man" 
							className="block sm:hidden absolute top-0 left-0 h-full w-full object-cover"
						/>
						<Image
							src="/images/preloaded/services-gallery-desktop-2.jpg"
							id="photoB" 
							width={2665} 
							height={1468} 
							alt="Photo of a young man" 
							className="hidden sm:block absolute top-0 left-0 h-full w-full object-cover"
						/>
						<Image
							src="/images/preloaded/services-gallery-1.jpg"
							id="photoA"
							width={2235} 
							height={1468} 
							alt="Photo portrait of an old man" 
							className="block sm:hidden absolute top-0 left-0 h-full w-full object-cover"
						/>
						<Image
							src="/images/preloaded/services-gallery-desktop-1.jpg"
							id="photoA" 
							width={2665} 
							height={1468} 
							alt="Photo portrait of an old man" 
							className="hidden sm:block absolute top-0 left-0 h-full w-full object-cover"
						/>
					</div>
				</div>
			</div>
			<div
				id="contentContainer" 
				className="
					mx-[6vw]
					mt-[25px]
					sm:mt-0
					sm:mx-0
					sm:absolute 
					sm:top-[32vh] 
					sm:left-[15vw]
				"
			>
				<div ref={contentRef1} className="absolute w-[88vw]">
					<h2 className="text-[34px] sm:text-[56px] uppercase font-mainfont font-black tracking-[-0.08em] leading-[0.9em] mb-[15px]">$95 Ut <br className="hidden sm:inline" />architecto <br className="hidden sm:inline" />voluptatem</h2>
					<p className="w-full sm:w-[25vw] sm:max-w-[360px] text-[18px] leading-[1.2em] opacity-60">Nesciunt repellat pariatur voluptas facilis nisi alias. Repellat magni sit deserunt corporis odit. Eaque ad amet nam qui.</p>
				</div>
				<div ref={contentRef2} className="absolute w-[88vw] hidden">
					<h2 className="text-[34px] sm:text-[56px] uppercase font-mainfont font-black tracking-[-0.08em] leading-[0.9em] mb-[15px]">$195 Ut <br className="hidden sm:inline" />consecte <br className="hidden sm:inline" />sed do</h2>
					<p className="w-full sm:w-[25vw] sm:max-w-[360px] text-[18px] leading-[1.2em] opacity-0">Mollitia dolores ea mollitia a qui mollitia sit alias. Similique mollitia doloremque fuga qui. Labore consequatur delectus fugiat.</p>
				</div>
				<div ref={contentRef3} className="absolute w-[88vw] hidden">
					<h2 className="text-[34px] sm:text-[56px] uppercase font-mainfont font-black tracking-[-0.08em] leading-[0.9em] mb-[15px]">$595 Ut <br className="hidden sm:inline" />adipiscing <br className="hidden sm:inline" />eiusmod</h2>
					<p className="w-full sm:w-[25vw] sm:max-w-[360px] text-[18px] leading-[1.2em] opacity-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore magna aliqua ut enim ad minim.</p>
				</div>
			</div>
		</section>
	);
}