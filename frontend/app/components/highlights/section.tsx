import { Props } from "@/types";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Highlights({ wrapperRef }: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const headingChar1Ref = useRef<HTMLDivElement>(null);
	const headingChar2Ref = useRef<HTMLDivElement>(null);
	const headingChar3Ref = useRef<HTMLDivElement>(null);
	const headingChar4Ref = useRef<HTMLDivElement>(null);
	const headingChar5Ref = useRef<HTMLDivElement>(null);
	const headingSeg2Ref = useRef<HTMLDivElement>(null);
	const headingSeg4Ref = useRef<HTMLDivElement>(null);
	const headingSeg5Ref = useRef<HTMLDivElement>(null);
	const headingSeg9Ref = useRef<HTMLDivElement>(null);
	const paragraphRef = useRef<HTMLParagraphElement>(null);

	useGSAP(() => {
		const ctx = gsap.context(() => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const context = canvas.getContext("2d");
			if (!context) return;
			const width = 1280;
			const height = 720;
			canvas.width = width;
			canvas.height = height;

			// --- Image Sequence Setup ---
			const startFrame = 36;
			const endFrame = 192;
			const frameCount = endFrame - startFrame + 1;
			const images: HTMLImageElement[] = [];
			const state = { frame: 0 };
			const currentFrame = (index: number) =>
			`/images/frames/frame_${String(index).padStart(5, "0")}.jpg`;

			// Preload frames
			for (let i = startFrame; i <= endFrame; i++) {
				const img = new window.Image();
				img.src = currentFrame(i);
				images.push(img);
			}

			const render = () => {
				context.clearRect(0, 0, width, height);
				const img = images[state.frame];
				if (img) {
					context.drawImage(img, 0, 0, width, height);
				}
			};

			images[0].onload = render;

			// --- GSAP Scroll Animation ---
			const section = canvas.closest('section');

			// Animation starts when entering viewport, continues through normal scroll + pin
			const scrollDuringPin = 500; // Additional scroll while pinned

			gsap.to(state, {
				frame: frameCount - 1,
				snap: "frame",
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top 85%", // Animation starts when top of section is 10% into viewport
					end: `top ${-scrollDuringPin}`, // End after scrolling past top by pin duration
					scrub: 0.2,
				},
				onUpdate: render,
			});

			// Separate ScrollTrigger for pinning only
			ScrollTrigger.create({
				trigger: section,
				pin: true,
				start: "top top", // Pin when section reaches top
				end: `+=${scrollDuringPin+350}`,
			});

			// Canvas container mask reveal animation - desktop only
			gsap.matchMedia().add("(min-width: 640px)", () => {
				gsap.fromTo(canvasContainerRef.current,
					{ clipPath: "inset(10% 5% 10% 5%)" }, // Start with 10% masked on all sides (80% visible)
					{
						clipPath: "inset(0% 0% 0% 0%)", // End with full canvas visible
						ease: "power4.inOut",
						scrollTrigger: {
							trigger: section,
							start: "top top", // Start when section pins
							end: "+=450",
							scrub: 1.5,
						}
					}
				);
			});

			// --- Heading Mask Animations ---

			// Set paragraph initial opacity
			if (paragraphRef.current) {
				gsap.set(paragraphRef.current, { opacity: 0 });
			}

			// Set headingRef to overflow hidden for masking
			if (headingRef.current) {
				gsap.set(headingRef.current, { overflow: 'hidden' });

				// Get height of headingRef for initial position
				const headingHeight = headingRef.current.offsetHeight;

				// Create timeline for character wrapper animations
				const headingTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: section,
						start: "top 0%",
						end: `top ${-(scrollDuringPin+(scrollDuringPin*0.3))}`,
						scrub: 1.5
					}
				});

				// Animate each character wrapper from top margin = headingHeight to 0
				const charConfigs = [
					{ ref: headingChar1Ref, duration: 1.4, delay: 0 },
					{ ref: headingChar2Ref, duration: 1.8, delay: 0.05 },
					{ ref: headingChar3Ref, duration: 1.4, delay: 0.15 },
					{ ref: headingChar4Ref, duration: 1.4, delay: 0.28 },
					{ ref: headingChar5Ref, duration: 1.4, delay: 0.15 }
				];

				charConfigs.forEach((config) => {
					if (config.ref.current) {
						// Set initial state - positioned below by headingHeight
						gsap.set(config.ref.current, { marginTop: headingHeight });

						// Animate to marginTop: 0
						headingTimeline.to(config.ref.current, {
							marginTop: 0,
							duration: config.duration,
							ease: "power4.inOut"
						}, config.delay);
					}
				});

				// Animate headingSeg2Ref position (starts with headingChar1Ref)
				if (headingSeg2Ref.current) {
					// Set initial position
					gsap.set(headingSeg2Ref.current, { top: "60%", left: "32%" });

					// Animate to final position
					headingTimeline.to(headingSeg2Ref.current, {
						top: "0%",
						left: "49.86%",
						duration: 1.4,
						ease: "power4.inOut"
					}, charConfigs[0].delay); // tied to headingChar1Ref delay
				}

				// Animate headingSeg4Ref position (starts with headingChar2Ref)
				if (headingSeg4Ref.current) {
					// Set initial position
					gsap.set(headingSeg4Ref.current, { left: "-22%" });

					// Animate to final position
					headingTimeline.to(headingSeg4Ref.current, {
						left: "39.4%",
						duration: 1.4,
						ease: "power4.inOut"
					}, charConfigs[1].delay); // tied to headingChar2Ref delay
				}

				// Animate headingSeg5Ref position (starts slightly after headingSeg4Ref)
				if (headingSeg5Ref.current) {
					// Set initial position
					gsap.set(headingSeg5Ref.current, { left: "-12%" });

					// Animate to final position
					headingTimeline.to(headingSeg5Ref.current, {
						left: "39.4%",
						duration: 2.0,
						ease: "power4.inOut"
					}, charConfigs[1].delay + 0); // tied to headingChar2Ref delay + offset
				}

				// Animate headingSeg9Ref width (starts with headingChar5Ref)
				if (headingSeg9Ref.current) {
					// Set initial width
					gsap.set(headingSeg9Ref.current, { width: "33.79%" });

					// Animate to final width
					headingTimeline.to(headingSeg9Ref.current, {
						width: "100%",
						duration: 0.7,
						ease: "power4.inOut"
					}, charConfigs[4].delay + 0.6); // tied to headingChar5Ref delay + offset
				}

				if (paragraphRef.current) {
					headingTimeline.to(paragraphRef.current, {
						opacity: 1,
						duration: 1.0,
						ease: "power2.out",
					}, 0.5); // Start at position 0.5 in timeline
				}
			}
		}, wrapperRef);
	return () => ctx.revert();
	}, []);

	return(
		<section className="relative w-full overflow-hidden flex items-start sm:items-center justify-center h-[100vh] bg-[#93d5c4] sm:bg-[#2c2827]">
			<div ref={canvasContainerRef} className="min-w-[200vw] w-[200vw] h-[112.5vw] sm:min-w-[100vw] sm:w-[100vw] sm:h-[56.25vw] flex justify-center">
				<canvas ref={canvasRef} className="w-full h-full object-contain" />
			</div>
			<div className="absolute top-[19vh] sm:top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center">
				<h2 className="sr-only">
					Velit
  				</h2>
				<div ref={headingRef} className="w-[98vw] aspect-[1299/351] relative flex flex-row overflow-hidden top-[10vh]">
					{/* 'V' character */}
					<div ref={headingChar1Ref} className="relative w-[27.33%] h-full mr-[0.31%] overflow-hidden">
						<div className="w-[63.24%] h-full absolute">
							<img src="/headings/highlights-h1-v1.svg" />
						</div>
						<div ref={headingSeg2Ref} className="w-[50.14%] absolute left-[49.86%]">
							<img src="/headings/highlights-h1-v2.svg" />
						</div>
					</div>

					{/* 'E' character */}
					<div ref={headingChar2Ref} className="relative w-[19.25%] h-full mr-[1.0%] overflow-hidden">
						<div className="absolute w-full h-full">
							<div className="absolute w-[39.4%] h-full bg-[#b0f3e1]"></div>
							<div className="absolute w-full h-[24.46%] right-0 bg-[#b0f3e1]"></div>
							<div className="absolute w-full h-[24.4%] bottom-0 right-0 bg-[#b0f3e1]"></div>
						</div>
						<div ref={headingSeg4Ref} className="absolute w-[60.8%] h-[24.66%] left-[39.4%] bg-[#b0f3e1]"></div>
						<div ref={headingSeg5Ref} className="absolute w-[49%] h-[23.4%] top-[38.37%] left-[39.4%] bg-[#b0f3e1]"></div>
					</div>

					{/* 'L' character */}
					<div ref={headingChar3Ref} className="relative h-full w-[19.25%] mr-[0.85%] overflow-hidden">
						<div className="absolute w-full h-full">
							<div className="absolute w-[39.4%] h-full bg-[#b0f3e1]"></div>
							<div className="absolute w-full h-[24.4%] bottom-0 bg-[#b0f3e1]"></div>
						</div>
					</div>

					{/* 'I' character */}
					<div ref={headingChar4Ref} className="relative w-[7.58%] h-full mr-[1.0%] overflow-hidden">
						<div className="absolute w-full h-full bg-[#b0f3e1]"></div>
					</div>

					{/* 'T' character */}
					<div ref={headingChar5Ref} className="relative flex flex-row w-[22.56%] h-full justify-center overflow-hidden">
						<div className="absolute w-[33.79%] h-[75.32%] top-[24.68%] left-[33.28%] bg-[#b0f3e1]"></div>
						<div ref={headingSeg9Ref} className="absolute w-full h-[24.68%] bg-[#b0f3e1]"></div>
					</div>
				</div>
				<div className="text-center flex flex-col items-center pt-[12vh]">
					<p ref={paragraphRef} className="w-2/3 text-[16px] sm:text-[20px] text-[#aff3e1] sm:text-[#7acfc8] leading-[1.2em]">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
					</p>
				</div>
			</div>
		</section>
	);
}
