"use client";

import { Props } from "@/types";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother, SplitText } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Input, Button, Label } from "@heroui/react";

export default function Hero({ wrapperRef }: Props) {
	const imageContainerRef = useRef<HTMLDivElement>(null);
	const formWrapperRef = useRef<HTMLDivElement>(null);
	const ctaFormBgRef = useRef<HTMLDivElement>(null);
	const formHeadingSmallRef = useRef<HTMLDivElement>(null);
	const formHeadingLargeRef = useRef<HTMLDivElement>(null);
	const formHeadingContainerRef = useRef<HTMLDivElement>(null);
	const formPhoneRef = useRef<HTMLParagraphElement>(null);
	const fieldNameRef = useRef<HTMLDivElement>(null);
	const fieldEmailRef = useRef<HTMLDivElement>(null);
	const fieldCtaRef = useRef<HTMLDivElement>(null);
	const ctaFormIconRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const ctaClickRef = useRef<HTMLDivElement>(null);
	const imgWidthLandscape = 3200;
	const imgHeightLandscape = 2883;
	const heightRatioLandscape = imgHeightLandscape / imgWidthLandscape;
	const imgWidthPortrait = 3200;
	const imgHeightPortrait = 5803;
	const heightRatioPortrait = imgHeightPortrait / imgWidthPortrait;

	useGSAP(() => {
		gsap.fromTo(
		imageContainerRef.current,
		{ width: "107vw" },
		{ width: "100vw", duration: 3.5, ease: "expo.out" }
		);

		// Set initial opacity for form elements
		gsap.set([formPhoneRef.current, fieldNameRef.current, fieldEmailRef.current, fieldCtaRef.current], {
			opacity: 0
		});

		// Set initial state for close button
		gsap.set(closeButtonRef.current, { opacity: 0, display: "none" });

		// Set initial visibility states for headings
		gsap.set(formHeadingSmallRef.current, { display: "flex" });
		gsap.set(formHeadingLargeRef.current, { display: "none" });
	}, { scope: wrapperRef });

	const handleCtaClick = () => {
		if (ctaFormBgRef.current && formHeadingSmallRef.current && formHeadingLargeRef.current && formHeadingContainerRef.current) {
			// Hide the click target
			gsap.set(ctaClickRef.current, { display: "none" });

			// Animate the form expansion
			gsap.to(ctaFormBgRef.current, {
				width: 460,
				height: 425,
				duration: 0.6,
				ease: "power4.inOut"
			});

			// Animate form wrapper up
			gsap.to(formWrapperRef.current, {
				top: -140,
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
					// Hide small heading and show large heading
					gsap.set(formHeadingSmallRef.current, { display: "none" });
					gsap.set(formHeadingLargeRef.current, { display: "flex" });

					// Fade in phone number (starts at same time as form fields)
					gsap.to(formPhoneRef.current, {
						opacity: 1,
						duration: 0.5,
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

					// Get the h3 element inside formHeadingLargeRef
					const largeH3 = formHeadingLargeRef.current!.querySelector('h3');
					if (!largeH3) return;

					// SplitText animation for large h3 - animate in
					const splitLarge = new SplitText(largeH3, { type: "chars" });

					// Set starting position (below, invisible)
					gsap.set(splitLarge.chars, { yPercent: 100, opacity: 0 });

					// Animate large text in from bottom up
					gsap.to(splitLarge.chars, {
						yPercent: 0,
						opacity: 1,
						duration: 0.4,
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
		if (ctaFormBgRef.current && formHeadingSmallRef.current && formHeadingLargeRef.current && formHeadingContainerRef.current) {
			// Fade out form elements (including close button)
			gsap.to([formPhoneRef.current, fieldNameRef.current, fieldEmailRef.current, fieldCtaRef.current, closeButtonRef.current], {
				opacity: 0,
				duration: 0.2,
				ease: "power2.in",
				onComplete: () => {
					// Hide close button after fade out
					gsap.set(closeButtonRef.current, { display: "none" });
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

			// Get the h3 element inside formHeadingLargeRef
			const largeH3 = formHeadingLargeRef.current.querySelector('h3');
			if (!largeH3) return;

			// SplitText animation for large h3 - animate out
			const splitLarge = new SplitText(largeH3, { type: "chars" });

			// Animate large text up and out
			gsap.to(splitLarge.chars, {
				yPercent: -100,
				duration: 0.4,
				ease: "power2.in",
				onComplete: () => {
					// Hide large heading and show small heading
					gsap.set(formHeadingLargeRef.current, { display: "none" });
					gsap.set(formHeadingSmallRef.current, { display: "flex" });

					// Get the h3 element inside formHeadingSmallRef
					const smallH3 = formHeadingSmallRef.current!.querySelector('h3');
					if (!smallH3) return;

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

					// Clean up large split
					splitLarge.revert();
				}
			});
		}
	};

  return (
    <section className="w-full overflow-hidden" data-speed="0.9">
      <div
        className="relative w-full h-[var(--height-landscape)] portrait:h-[var(--height-portrait)]"
        style={
          {
            "--height-landscape": `calc(${heightRatioLandscape} * 100vw)`,
            "--height-portrait": `calc(${heightRatioPortrait} * 100vw)`,
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
          className="absolute top-[-13vh] left-0 w-full"
          data-speed="0.7"
        >
          <h1 className="text-[30vw] text-[#b082db] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.6em] text-center m-0 ml-[-0.08em]">
            Nomin
          </h1>
        </div>

		<div className="absolute top-[35vw] left-[10vw] w-[25%]" data-speed="0.5">
			<div className="w-[203px] mb-2">
				<Image
					src="/logo-1.png"
					alt="XyZ Photography Logo"
					width="1016"
					height="158"
					priority
				/>
			</div>
			<p className="text-[18px] text-[#b082db] leading-[1.2em]">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consec.
			</p>
			<div ref={formWrapperRef} className="relative mt-[40px]">
				<div id="ctaFormBg" ref={ctaFormBgRef} className="absolute bg-[#2b2827] w-[220px] h-[68px] rounded-[20px] flex items-start justify-end">
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
						<div ref={formHeadingLargeRef} className="w-full mt-[20px]">
							<h3 className="relative overflow-hidden w-[200px] ml-[30px] py-[8px] pr-[1px] text-[26px] tracking-[-0.07em]">Contact Us</h3>
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
					<p ref={formPhoneRef} id="formPhone" className="absolute top-[54px] left-[30px] text-[#d7cec4]/50 font-nominee tracking-[-0.04em]">+34 612 345 678</p>
				</div>
				
				<div ref={ctaClickRef} id="ctaClick" onClick={handleCtaClick} className="absolute w-[220px] h-[68px] cursor-pointer"></div>

				<div className="form absolute top-[200px] w-[460px] px-[30px]">
					<div ref={fieldNameRef} id="fieldName" className="w-full mb-[15px]">
						<Input aria-label="Name" className="w-full py-[1.3em] px-[1.5em] bg-[#322f2e] placeholder:text-[#d7cec4]/30 text-[#d7cec4] shadow-none" placeholder="Name" type="text" />
					</div>
					<div ref={fieldEmailRef} id="fieldEmail" className="w-full mb-[15px]">
						<Input aria-label="Email" className="w-full py-[1.3em] px-[1.5em] bg-[#322f2e] placeholder:text-[#d7cec4]/30 text-[#d7cec4] shadow-none" placeholder="Email" type="email" />
					</div>
					<div ref={fieldCtaRef} id="fieldCta" className="w-full flex justify-end">
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