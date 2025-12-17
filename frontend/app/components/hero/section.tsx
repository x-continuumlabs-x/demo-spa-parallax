"use client";

import { Props } from "@/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollSmoother, SplitText } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Input, Button, Label } from "@heroui/react";

export default function Hero({ wrapperRef }: Props) {
	const imageContainerRef = useRef<HTMLDivElement>(null);
	const formWrapperRef = useRef<HTMLDivElement>(null);
	const ctaFormBgRef = useRef<HTMLDivElement>(null);
	const formHeadingSmallRef = useRef<HTMLDivElement>(null);
	const contactHeadingLargeRef = useRef<HTMLHeadingElement>(null);
	const formHeadingContainerRef = useRef<HTMLDivElement>(null);
	const contactPhoneRef = useRef<HTMLParagraphElement>(null);
	const fieldNameRef = useRef<HTMLDivElement>(null);
	const fieldEmailRef = useRef<HTMLDivElement>(null);
	const fieldCtaRef = useRef<HTMLDivElement>(null);
	const ctaFormIconRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const ctaClickRef = useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = useState(false);
	const imgWidthLandscape = 3200;
	const imgHeightLandscape = 2883;
	const heightRatioLandscape = imgHeightLandscape / imgWidthLandscape;
	const imgWidthPortrait = 1170;
	const imgHeightPortrait = 2532;
	const heightRatioPortrait = imgHeightPortrait / imgWidthPortrait;

	useGSAP(() => {
		gsap.fromTo(
		imageContainerRef.current,
		{ width: "107vw" },
		{ width: "100vw", duration: 3.5, ease: "expo.out" }
		);

		// Set initial opacity for form elements
		gsap.set([fieldNameRef.current, fieldEmailRef.current, fieldCtaRef.current], {
			opacity: 0
		});

		// Set initial state for close button
		gsap.set(closeButtonRef.current, { opacity: 0, display: "none" });

		// Set initial visibility states for headings
		gsap.set(formHeadingSmallRef.current, { display: "flex" });
		gsap.set([contactHeadingLargeRef.current, contactPhoneRef.current], { display: "none" });
	}, { scope: wrapperRef });

	// Viewport detection for responsive data-speed values
	useGSAP(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};

		// Check on mount
		checkMobile();

		// Update on resize
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, { scope: wrapperRef });

	const handleCtaClick = () => {
		if (ctaFormBgRef.current && formHeadingSmallRef.current && contactHeadingLargeRef.current && formHeadingContainerRef.current) {
			// Hide the click target
			gsap.set(ctaClickRef.current, { display: "none" });

			// Calculate responsive width: 90vw on mobile, max 460px on desktop
			const viewportWidth = window.innerWidth;
			const targetWidth = Math.min(460, Math.floor(viewportWidth * 0.9));

			// Calculate responsive top position: -400 on mobile, -113 on desktop (sm breakpoint = 640px)
			const targetTop = viewportWidth < 640 ? -400 : -113;

			// Animate the form expansion
			gsap.to(ctaFormBgRef.current, {
				width: targetWidth,
				height: 425,
				duration: 0.6,
				ease: "power4.inOut"
			});

			// Animate form wrapper up
			gsap.to(formWrapperRef.current, {
				top: targetTop,
				duration: 0.6,
				ease: "power4.inOut"
			});

			// Fade out icon
			gsap.to(ctaFormIconRef.current, {
				opacity: 0,
				duration: 0.4,
				ease: "power2.in"
			});

			// Get the h3 element inside formHeadingSmallRef
			const smallH3 = formHeadingSmallRef.current.querySelector('h3');
			if (!smallH3) return;

			// SplitText animation for small h3 - animate out
			const splitSmall = new SplitText(smallH3, { type: "chars" });

			// Animate small text up and out
			gsap.to(splitSmall.chars, {
				yPercent: -100,
				opacity: 0,
				duration: 0.4,
				ease: "power2.in",
				onComplete: () => {
					// Hide small heading
					gsap.set(formHeadingSmallRef.current, { display: "none" });

					// Show large heading and phone
					gsap.set(contactHeadingLargeRef.current, { display: "block" });
					gsap.set(contactPhoneRef.current, { display: "block", opacity: 0 });

					// Fade in phone number
					gsap.to(contactPhoneRef.current, {
						opacity: 1,
						duration: 0.5,
						ease: "power2.out"
					});

					// SplitText animation for large heading - animate in
					const splitLarge = new SplitText(contactHeadingLargeRef.current, { type: "chars" });

					// Set starting position (below, invisible)
					gsap.set(splitLarge.chars, { yPercent: 100, opacity: 0 });

					// Animate large text in from bottom up
					gsap.to(splitLarge.chars, {
						yPercent: 0,
						opacity: 1,
						duration: 0.4,
						ease: "power2.out"
					});

					// Show close button
					gsap.set(closeButtonRef.current, { display: "block" });

					// Fade in form fields with stagger (including close button)
					gsap.to([fieldNameRef.current, fieldEmailRef.current, fieldCtaRef.current, closeButtonRef.current], {
						opacity: 1,
						duration: 0.5,
						stagger: 0.1,
						ease: "power2.out"
					});

					// Clean up small split
					splitSmall.revert();
				}
			});

			// Scroll so section bottom aligns with viewport bottom
			const smoother = ScrollSmoother.get();
			if (smoother) {
				// Get the section element
				const section = ctaFormBgRef.current.closest('section');
				if (section) {
					const rect = section.getBoundingClientRect();
					const currentScrollY = smoother.scrollTop();
					const viewportHeight = window.innerHeight;

					// Calculate the bottom of the section in document coordinates
					const sectionBottom = rect.bottom + currentScrollY;

					// Scroll position to align section bottom with viewport bottom
					const targetScroll = sectionBottom - viewportHeight;

					smoother.scrollTo(targetScroll, true, "power2.inOut");
				}
			}
		}
	};

	const handleCloseClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent triggering the parent click handler
		if (ctaFormBgRef.current && formHeadingSmallRef.current && contactHeadingLargeRef.current && formHeadingContainerRef.current) {
			// SplitText animation for large heading - animate out
			const splitLarge = new SplitText(contactHeadingLargeRef.current, { type: "chars" });

			// Animate large text up and out
			gsap.to(splitLarge.chars, {
				yPercent: -100,
				opacity: 0,
				duration: 0.4,
				ease: "power2.in"
			});

			// Fade out form elements (including close button) and phone
			gsap.to([contactPhoneRef.current, fieldNameRef.current, fieldEmailRef.current, fieldCtaRef.current, closeButtonRef.current], {
				opacity: 0,
				duration: 0.2,
				ease: "power2.in",
				onComplete: () => {
					// Hide close button and large heading/phone after fade out
					gsap.set(closeButtonRef.current, { display: "none" });
					gsap.set([contactHeadingLargeRef.current, contactPhoneRef.current], { display: "none" });

					// Clean up large split
					splitLarge.revert();

					// Get the h3 element inside formHeadingSmallRef
					const smallH3 = formHeadingSmallRef.current!.querySelector('h3');
					if (!smallH3) return;

					// Show small heading
					gsap.set(formHeadingSmallRef.current, { display: "flex" });

					// SplitText animation for small h3 - animate in
					const splitSmall = new SplitText(smallH3, { type: "chars" });

					// Set starting position (below, invisible)
					gsap.set(splitSmall.chars, { yPercent: 100, opacity: 0 });

					// Fade in icon
					gsap.to(ctaFormIconRef.current, {
						opacity: 1,
						duration: 0.4,
						ease: "power2.out"
					});

					// Animate small text in from bottom up
					gsap.to(splitSmall.chars, {
						yPercent: 0,
						opacity: 1,
						duration: 0.4,
						ease: "power2.out",
						onComplete: () => {
							// Show the click target after animation completes
							gsap.set(ctaClickRef.current, { display: "block" });
						}
					});
				}
			});

			gsap.to(ctaFormBgRef.current, {
				width: 220,
				height: 68,
				duration: 0.6,
				ease: "power4.inOut"
			});

			// Animate form wrapper back to original position
			gsap.to(formWrapperRef.current, {
				top: 0,
				duration: 0.6,
				ease: "power4.inOut"
			});
		}
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
						src="/local-images/section-bg-hero.jpg"
						alt="Hero"
						width={imgWidthLandscape}
						height={imgHeightLandscape}
						style={{ width: "100%", height: "auto" }}
						className="portrait:hidden"
						priority
					/>
					<Image
						src="/local-images/section-bg-hero-portrait.jpg"
						alt="Hero portrait"
						width={imgWidthPortrait}
						height={imgHeightPortrait}
						style={{ width: "100%", height: "auto" }}
						className="hidden portrait:block"
						priority
					/>
				</div>
				
				<div
					className="absolute top-[76vh] sm:top-[-13vh] w-full"
					data-speed={isMobile ? "0.8" : "0.7"}
				>
					<h1 className="text-[30vw] text-[#b082db] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.6em] text-center m-0 ml-[-0.08em]">
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
							<button ref={closeButtonRef} onClick={handleCloseClick} className="cursor-pointer">
								<Image
									src="/icon-close.png"
									alt="Close form"
									width="45"
									height="45"
									style={{
										opacity: "50%",
										padding: "16px",
									}}
									priority
								/>
							</button>
						</div>

						<div ref={formHeadingContainerRef} className="absolute w-[220px] h-[68px]">
							<div id="formHeading" className="w-full h-full relative flex justify-between items-center uppercase font-nominee font-black tracking-[-0.06em] leading-[0.6em] overflow-hidden py-[2px] pr-[1px]">
								<div ref={formHeadingSmallRef} className="flex justify-center w-full">
									<h3 className="text-[12px] relative overflow-hidden py-[2px] pr-[1px]">Contact Us</h3>
								</div>
								<div ref={ctaFormIconRef} className="mr-[8px] bg-black/30 px-[14px] py-[8px] rounded-xl">
									<Image
										src="/icon-phone.png"
										alt="Phone icon"
										width="28"
										height="49"
										style={{ opacity: "50%" }}
										priority
									/>
								</div>
							</div>
						</div>

						<div ref={ctaClickRef} id="ctaClick" onClick={handleCtaClick} className="absolute w-[220px] h-[68px] cursor-pointer"></div>

						<div className="absolute w-full uppercase font-nominee tracking-[-0.06em] leading-[1.4em] mt-[28px] text-center sm:text-left sm:ml-[30px]">
							<h3 ref={contactHeadingLargeRef} className="font-black text-[26px] tracking-[-0.07em]">Contact Us</h3>
							<p ref={contactPhoneRef} className="text-[#d7cec4]/50 font-nominee tracking-[-0.04em]">+34 123 456 789</p>
						</div>

						<div className="form absolute w-full top-[200px] px-[30px]">
							<div ref={fieldNameRef} id="fieldName" className="w-full mb-[15px]">
								<Input aria-label="Name" className="w-full py-[1.3em] px-[1.5em] bg-[#322f2e] placeholder:text-[#d7cec4]/30 text-[#d7cec4] shadow-none" placeholder="Name" type="text" />
							</div>
							<div ref={fieldEmailRef} id="fieldEmail" className="w-full mb-[15px]">
								<Input aria-label="Email" className="w-full py-[1.3em] px-[1.5em] bg-[#322f2e] placeholder:text-[#d7cec4]/30 text-[#d7cec4] shadow-none" placeholder="Email" type="email" />
							</div>
							<div ref={fieldCtaRef} id="fieldCta" className="w-full flex justify-center sm:justify-end">
								<Button
									className="font-nominee font-black tracking-[-0.06em] uppercase w-[200px] py-[2em] px-[1.5em] rounded-2xl bg-[#b7b0a8] text-[12px] text-[#1e1c1b] justify-between"
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