"use client";

import { Props } from "@/types";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother, SplitText } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Input, Button } from "@heroui/react";

const ANIMATION_DURATIONS = {
	imageZoom: 3.5,
	formExpand: 0.6,
	textSplit: 0.4,
	fadeIn: 0.5,
	fadeOut: 0.2,
} as const;

const FORM_DIMENSIONS = {
	closedWidth: 220,
	closedHeight: 68,
	expandedHeight: 425,
	maxExpandedWidth: 460,
} as const;

const MOBILE_BREAKPOINT = 640;

const FORM_POSITIONS = {
	desktop: -113,
	mobile: -400,
} as const;

const IMAGE_DIMENSIONS = {
	landscape: { width: 3200, height: 2883 },
	portrait: { width: 1170, height: 2111 },
} as const;

const animateSplitTextOut = (element: HTMLElement, onComplete?: () => void) => {
	const split = new SplitText(element, { type: "chars" });
	gsap.to(split.chars, {
		yPercent: -100,
		opacity: 0,
		duration: ANIMATION_DURATIONS.textSplit,
		ease: "power2.in",
		onComplete: () => {
			split.revert();
			onComplete?.();
		}
	});
};

const animateSplitTextIn = (element: HTMLElement, onComplete?: () => void) => {
	const split = new SplitText(element, { type: "chars" });
	gsap.set(split.chars, { yPercent: 100, opacity: 0 });
	gsap.to(split.chars, {
		yPercent: 0,
		opacity: 1,
		duration: ANIMATION_DURATIONS.textSplit,
		ease: "power2.out",
		onComplete
	});
};

const getResponsiveFormDimensions = () => {
	const viewportWidth = window.innerWidth;
	return {
		width: Math.min(FORM_DIMENSIONS.maxExpandedWidth, Math.floor(viewportWidth * 0.9)),
		top: viewportWidth < MOBILE_BREAKPOINT ? FORM_POSITIONS.mobile : FORM_POSITIONS.desktop,
	};
};

const scrollSectionToBottom = (element: HTMLElement) => {
	const smoother = ScrollSmoother.get();
	if (!smoother) return;

	const section = element.closest('section');
	if (!section) return;

	const rect = section.getBoundingClientRect();
	const currentScrollY = smoother.scrollTop();
	const viewportHeight = window.innerHeight;
	const sectionBottom = rect.bottom + currentScrollY;

	const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
	const offset = isMobile ? 100 : 0;
	const targetScroll = sectionBottom - viewportHeight - offset;

	smoother.scrollTo(targetScroll, true, "power2.inOut");
};

export default function Hero({ wrapperRef }: Props) {
	const imageContainerRef = useRef<HTMLDivElement>(null);
	const formWrapperRef = useRef<HTMLDivElement>(null);
	const ctaFormBgRef = useRef<HTMLDivElement>(null);
	const formHeadingSmallRef = useRef<HTMLDivElement>(null);
	const contactHeadingLargeRef = useRef<HTMLHeadingElement>(null);
	const contactPhoneRef = useRef<HTMLParagraphElement>(null);
	const fieldNameRef = useRef<HTMLDivElement>(null);
	const fieldEmailRef = useRef<HTMLDivElement>(null);
	const fieldCtaRef = useRef<HTMLDivElement>(null);
	const ctaFormIconRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const ctaClickRef = useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = useState(false);

	const heightRatioLandscape = IMAGE_DIMENSIONS.landscape.height / IMAGE_DIMENSIONS.landscape.width;
	const heightRatioPortrait = IMAGE_DIMENSIONS.portrait.height / IMAGE_DIMENSIONS.portrait.width;

	useGSAP(() => {
		gsap.fromTo(
			imageContainerRef.current,
			{ width: "107vw" },
			{ width: "100vw", duration: ANIMATION_DURATIONS.imageZoom, ease: "expo.out" }
		);
	}, { scope: wrapperRef });

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		// Check on mount
		checkMobile();

		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, []);

	const handleCtaClick = () => {
		if (!ctaFormBgRef.current || !formHeadingSmallRef.current || !contactHeadingLargeRef.current) return;

		gsap.set(ctaClickRef.current, { display: "none" });

		const { width: targetWidth, top: targetTop } = getResponsiveFormDimensions();

		gsap.to(ctaFormBgRef.current, {
			width: targetWidth,
			height: FORM_DIMENSIONS.expandedHeight,
			duration: ANIMATION_DURATIONS.formExpand,
			ease: "power4.inOut"
		});

		gsap.to(formWrapperRef.current, {
			top: targetTop,
			duration: ANIMATION_DURATIONS.formExpand,
			ease: "power4.inOut"
		});

		gsap.to(ctaFormIconRef.current, {
			opacity: 0,
			duration: ANIMATION_DURATIONS.textSplit,
			ease: "power2.in"
		});

		const smallH3 = formHeadingSmallRef.current.querySelector('h3');
		if (!smallH3) return;

		animateSplitTextOut(smallH3, () => {
			if (!contactHeadingLargeRef.current) return;

			gsap.set(formHeadingSmallRef.current, { display: "none" });
			gsap.set(contactHeadingLargeRef.current, { display: "block" });
			gsap.set(contactPhoneRef.current, { display: "block", opacity: 0 });

			gsap.to(contactPhoneRef.current, {
				opacity: 1,
				duration: ANIMATION_DURATIONS.fadeIn,
				ease: "power2.out"
			});

			animateSplitTextIn(contactHeadingLargeRef.current);

			gsap.set(closeButtonRef.current, { display: "block" });

			gsap.to([fieldNameRef.current, fieldEmailRef.current, fieldCtaRef.current, closeButtonRef.current], {
				opacity: 1,
				duration: ANIMATION_DURATIONS.fadeIn,
				stagger: 0.1,
				ease: "power2.out"
			});
		});

		scrollSectionToBottom(ctaFormBgRef.current);
	};

	const handleCloseClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!ctaFormBgRef.current || !formHeadingSmallRef.current || !contactHeadingLargeRef.current) return;

		animateSplitTextOut(contactHeadingLargeRef.current);

		gsap.to([contactPhoneRef.current, fieldNameRef.current, fieldEmailRef.current, fieldCtaRef.current, closeButtonRef.current], {
			opacity: 0,
			duration: ANIMATION_DURATIONS.fadeOut,
			ease: "power2.in",
			onComplete: () => {
				gsap.set(closeButtonRef.current, { display: "none" });
				gsap.set([contactHeadingLargeRef.current, contactPhoneRef.current], { display: "none" });

				const smallH3 = formHeadingSmallRef.current!.querySelector('h3');
				if (!smallH3) return;

				gsap.set(formHeadingSmallRef.current, { display: "flex" });

				gsap.to(ctaFormIconRef.current, {
					opacity: 1,
					duration: ANIMATION_DURATIONS.textSplit,
					ease: "power2.out"
				});

				animateSplitTextIn(smallH3, () => {
					gsap.set(ctaClickRef.current, { display: "block" });
				});
			}
		});

		gsap.to(ctaFormBgRef.current, {
			width: FORM_DIMENSIONS.closedWidth,
			height: FORM_DIMENSIONS.closedHeight,
			duration: ANIMATION_DURATIONS.formExpand,
			ease: "power4.inOut"
		});

		gsap.to(formWrapperRef.current, {
			top: 0,
			duration: ANIMATION_DURATIONS.formExpand,
			ease: "power4.inOut"
		});
	};

	return (
		<section className="w-full overflow-hidden bg-[#b5aca3]">
			<div
				className="relative w-full h-[var(--height-landscape)] portrait:h-[var(--height-portrait)]"
				style={
					{
						"--height-landscape": `calc(${heightRatioLandscape} * 100vw)`,
						"--height-portrait": `calc((${heightRatioPortrait} * 100vw) + 350px)`,
					} as React.CSSProperties
				}
			>
				<div
					ref={imageContainerRef}
					className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full" 
				>
					<Image
						src="/images/section-bg-hero.jpg"
						alt="Hero"
						width={IMAGE_DIMENSIONS.landscape.width}
						height={IMAGE_DIMENSIONS.landscape.height}
						style={{ width: "100%", height: "auto" }}
						className="portrait:hidden"
						priority
					/>
					<Image
						src="/images/section-bg-hero-portrait.jpg"
						alt="Hero portrait"
						width={IMAGE_DIMENSIONS.portrait.width}
						height={IMAGE_DIMENSIONS.portrait.height}
						style={{ width: "100%", height: "auto" }}
						className="hidden portrait:block"
						priority
					/>
				</div>
				
				<div
					className="absolute top-[76vh] sm:top-[-13vh] w-full"
					data-speed={isMobile ? "0.8" : "0.7"}
				>
					<h1 className="text-[30vw] text-[#b082db] uppercase font-mainfont font-black tracking-[-0.08em] leading-[0.6em] text-center m-0 ml-[-0.08em]">
						Nomin
					</h1>
				</div>

				<div className="absolute top-[92vh] sm:top-[35vw] sm:left-[10vw] w-full flex flex-col items-center sm:block" data-speed={isMobile ? "0.8" : "0.5"}>
					<div className="w-[65vw] max-w-[203px] mb-2">
						<Image
							src="/logo-1.png"
							alt="XyZ Photography Logo"
							width="1016"
							height="158"
							priority
						/>
					</div>
					<p className="w-7/8 sm:w-[25%] text-[16px] sm:text-[18px] text-[#b082db] leading-[1.2em] text-center sm:text-left">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consec.
					</p>
					<div ref={formWrapperRef} className="relative w-[90vw] sm:w-auto max-w-[460px] flex justify-center sm:justify-start sm:block mt-[40px]">
						
						<div id="ctaFormBg" ref={ctaFormBgRef} className="absolute bg-[#2b2827] w-[220px] h-[68px] rounded-[20px] flex items-start justify-end max-w-[90vw] sm:max-w-none">
							<button ref={closeButtonRef} onClick={handleCloseClick} className="cursor-pointer opacity-0 hidden">
								<Image
									src="/icon-close.png"
									alt="Close form"
									width="45"
									height="45"
									className="opacity-50 p-4"
									priority
								/>
							</button>
						</div>

						<div className="absolute w-[220px] h-[68px]">
							<div id="formHeading" className="w-full h-full relative flex justify-between items-center uppercase font-mainfont font-black tracking-[-0.06em] leading-[0.6em] overflow-hidden py-[2px] pr-[1px]">
								<div ref={formHeadingSmallRef} className="flex justify-center w-full">
									<h3 className="text-[12px] relative overflow-hidden py-[2px] pr-[1px]">Contact Us</h3>
								</div>
								<div ref={ctaFormIconRef} className="mr-[8px] bg-black/30 px-[14px] py-[8px] rounded-xl">
									<Image
										src="/icon-phone.png"
										alt="Phone icon"
										width="28"
										height="49"
										className="opacity-50"
										priority
									/>
								</div>
							</div>
						</div>

						<div ref={ctaClickRef} id="ctaClick" onClick={handleCtaClick} className="absolute w-[220px] h-[68px] cursor-pointer"></div>

						<div className="absolute w-full uppercase font-mainfont tracking-[-0.06em] leading-[1.4em] mt-[28px] text-center sm:text-left sm:ml-[30px]">
							<h3 ref={contactHeadingLargeRef} className="font-black text-[26px] tracking-[-0.07em] hidden">Contact Us</h3>
							<p ref={contactPhoneRef} className="text-[#d7cec4]/50 font-mainfont tracking-[-0.04em] hidden">+34 123 456 789</p>
						</div>

						<div className="form absolute w-full top-[180px] sm:top-[200px] px-[30px]">
							<div ref={fieldNameRef} id="fieldName" className="w-full mb-[15px] opacity-0">
								<Input aria-label="Name" className="w-full py-[1.3em] px-[1.5em] bg-[#322f2e] text-[16px] placeholder:text-[#d7cec4]/30 text-[#d7cec4] shadow-none" placeholder="Name" type="text" />
							</div>
							<div ref={fieldEmailRef} id="fieldEmail" className="w-full mb-[15px] opacity-0">
								<Input aria-label="Email" className="w-full py-[1.3em] px-[1.5em] bg-[#322f2e] text-[16px] placeholder:text-[#d7cec4]/30 text-[#d7cec4] shadow-none" placeholder="Email" type="email" />
							</div>
							<div ref={fieldCtaRef} id="fieldCta" className="w-full flex justify-center sm:justify-end opacity-0">
								<Button
									className="font-mainfont font-black tracking-[-0.06em] uppercase w-[200px] py-[2em] px-[1.5em] rounded-2xl bg-[#b7b0a8] text-[12px] text-[#1e1c1b] justify-between"
									>
									Submit
									<Image
										src="/icon-arrow-submit.png"
										alt="Phone icon"
										width="29"
										height="10"
										priority
									/>
								</Button>
							</div>
						</div>

					</div>
				</div>
				
			</div>
		</section>
	);
}