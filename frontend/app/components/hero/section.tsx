"use client";

import { Props } from "@/types";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother, SplitText } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Input } from "@heroui/react";

export default function Hero({ wrapperRef }: Props) {
	const imageContainerRef = useRef<HTMLDivElement>(null);
	const ctaFormBgRef = useRef<HTMLDivElement>(null);
	const formHeadingH3Ref = useRef<HTMLHeadingElement>(null);
	const formHeadingContainerRef = useRef<HTMLDivElement>(null);
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
	}, { scope: wrapperRef });

	const handleCtaClick = () => {
		if (ctaFormBgRef.current && formHeadingH3Ref.current && formHeadingContainerRef.current) {
			// Animate the form expansion
			gsap.to(ctaFormBgRef.current, {
				width: 400,
				height: 400,
				duration: 0.6,
				ease: "power4.inOut"
			});

			// SplitText animation for h3
			const split = new SplitText(formHeadingH3Ref.current, { type: "chars" });

			// Animate text up and out
			gsap.to(split.chars, {
				yPercent: -100,
				opacity: 0,
				duration: 0.4,
				ease: "power2.in",
				onComplete: () => {
					// Set font size to 26px and move container
					gsap.set(formHeadingH3Ref.current, { fontSize: "26px" });
					gsap.set(formHeadingContainerRef.current, { left: "30px" });

					// Revert split to update with new size
					split.revert();

					// Split again with new size
					const newSplit = new SplitText(formHeadingH3Ref.current, { type: "chars" });

					// Set starting position (below, invisible)
					gsap.set(newSplit.chars, { yPercent: 100, opacity: 0 });

					// Animate text back in from bottom up
					gsap.to(newSplit.chars, {
						yPercent: 0,
						opacity: 1,
						duration: 0.4,
						ease: "power2.out"
					});
				}
			});

			// Scroll to center the form vertically
			const smoother = ScrollSmoother.get();
			if (smoother) {
				// Get the parent container with parallax effect
				const parallaxContainer = ctaFormBgRef.current.closest('[data-speed]');
				const parallaxSpeed = parallaxContainer ? parseFloat(parallaxContainer.getAttribute('data-speed') || '1') : 1;

				// Calculate the element's position accounting for parallax
				const rect = ctaFormBgRef.current.getBoundingClientRect();
				const currentScrollY = smoother.scrollTop();

				// Element's original position in document (before parallax transform)
				// Current position in viewport = originalTop - scrollY * speed
				// So: originalTop = current viewport position + scrollY * speed
				const elementOriginalTop = rect.top + currentScrollY * parallaxSpeed;

				// Where we want the center of the expanded form to be (viewport center)
				const viewportHeight = window.innerHeight;
				const expandedHalfHeight = 200; // Half of 500px expanded height

				// With parallax speed, element's position in viewport = originalTop - scroll * speed
				// We want: originalTop - targetScroll * speed = viewportHeight/2 - expandedHalfHeight
				// Solving for targetScroll:
				// targetScroll = (originalTop - viewportHeight/2 + expandedHalfHeight) / speed
				const targetScroll = (elementOriginalTop - viewportHeight / 2 + expandedHalfHeight) / parallaxSpeed;

				smoother.scrollTo(targetScroll, true, "power2.inOut");
			}
		}
	};

	const handleCloseClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent triggering the parent click handler
		if (ctaFormBgRef.current && formHeadingH3Ref.current && formHeadingContainerRef.current) {
			gsap.to(ctaFormBgRef.current, {
				width: 220,
				height: 76,
				duration: 0.6,
				ease: "power4.inOut"
			});

			// SplitText animation for h3
			const split = new SplitText(formHeadingH3Ref.current, { type: "chars" });

			// Animate text up and out
			gsap.to(split.chars, {
				yPercent: -100,
				opacity: 0,
				duration: 0.4,
				ease: "power2.in",
				onComplete: () => {
					// Set font size back to 14px and reset container position
					gsap.set(formHeadingH3Ref.current, { fontSize: "14px" });
					gsap.set(formHeadingContainerRef.current, { left: "0px" });

					// Revert split to update with new size
					split.revert();

					// Split again with new size
					const newSplit = new SplitText(formHeadingH3Ref.current, { type: "chars" });

					// Set starting position (below, invisible)
					gsap.set(newSplit.chars, { yPercent: 100, opacity: 0 });

					// Animate text back in from bottom up
					gsap.to(newSplit.chars, {
						yPercent: 0,
						opacity: 1,
						duration: 0.4,
						ease: "power2.out"
					});
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

		<div className="absolute top-[35vw] left-[10vw] w-1/5" data-speed="0.5">
			<p className="text-[15px] text-[#b082db] leading-[1.0em]">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
			<div className="relative">
				<div id="ctaFormBg" ref={ctaFormBgRef} className="absolute bg-[#2b2827] w-[220px] h-[76px] rounded-[20px] flex items-start justify-end">
					<button onClick={handleCloseClick} className="cursor-pointer">X</button>
				</div>
				<div ref={formHeadingContainerRef} className="absolute w-[220px] h-[76px]">
					<div id="formHeading" className="w-full h-full relative flex justify-between items-center">
						<h3 ref={formHeadingH3Ref} className="text-[14px] uppercase font-nominee font-black tracking-[-0.06em] leading-[0.6em] relative overflow-hidden py-[2px] pr-[1px]">Contact Us</h3>
						<div id="ctaIcon">iii</div>
						<p id="formPhone" className="absolute top-[50px]">+34 612 345 678</p>
					</div>
				</div>
				<div id="ctaClick" onClick={handleCtaClick} className="absolute w-[220px] h-[76px] cursor-pointer"></div>
				<div className="form absolute top-[150px] px-[30px]">
					<div id="fieldName" className="w-[340px] mb-[15px]">
						<Input
							label="Name"
							placeholder=" "
							type="text"
							classNames={{
							label: [
								"!text-[#645f5b]", 
								"group-data-[focus=true]:!text-[#877f78]"
							],
							inputWrapper: "bg-[#322f2e]",
							input: "text-[#d7cec4]"
							}}
						/>
					</div>
					<div id="fieldEmail" className="w-[340px] mb-[25px]">
						<Input
							label="Email"
							placeholder=" "
							type="email"
							classNames={{
							label: [
								"!text-[#645f5b]", 
								"group-data-[focus=true]:!text-[#877f78]"
							],
							inputWrapper: "bg-[#322f2e]",
							input: "text-[#d7cec4]"
							}}
						/>
					</div>
					<div id="fieldCta">cta</div>
				</div>
			</div>
		</div>
      </div>
    </section>
  );
}