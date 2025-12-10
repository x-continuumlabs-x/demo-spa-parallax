import { Props } from "@/types";
import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Highlights({ wrapperRef }: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	const headingChar1Ref = useRef<HTMLDivElement>(null);
	const headingChar2Ref = useRef<HTMLDivElement>(null);
	const headingChar3Ref = useRef<HTMLDivElement>(null);
	const headingChar4Ref = useRef<HTMLDivElement>(null);
	const headingChar5Ref = useRef<HTMLDivElement>(null);
	const headingSeg1Ref = useRef<HTMLDivElement>(null);
	const headingSeg2Ref = useRef<HTMLDivElement>(null);
	const headingSeg3Ref = useRef<HTMLDivElement>(null);
	const headingSeg4Ref = useRef<HTMLDivElement>(null);
	const headingSeg5Ref = useRef<HTMLDivElement>(null);
	const headingSeg6Ref = useRef<HTMLDivElement>(null);
	const headingSeg7Ref = useRef<HTMLDivElement>(null);
	const headingSeg8Ref = useRef<HTMLDivElement>(null);
	const headingSeg9Ref = useRef<HTMLDivElement>(null);

	useGSAP(() => {
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
		`/local-images/frames/frame_${String(index).padStart(5, "0")}.jpg`;

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
		const scrollDuringPin = 1000; // Additional scroll while pinned

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
			end: `+=${scrollDuringPin}`, // Unpin after 1000px
		});

		// --- Heading Mask Animations ---

		// Set headingRef to overflow hidden for masking
		if (headingRef.current) {
			gsap.set(headingRef.current, { overflow: 'hidden' });

			// Get height of headingRef for initial position
			const headingHeight = headingRef.current.offsetHeight;

			// Create timeline for character wrapper animations
			const headingTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: "top 20%",
					toggleActions: "play none none none"
				}
			});

			// Animate each character wrapper from top margin = headingHeight to 0
			const charConfigs = [
				{ ref: headingChar1Ref, duration: 1.4, delay: 0 },
				{ ref: headingChar2Ref, duration: 1.4, delay: 0.2 },
				{ ref: headingChar3Ref, duration: 1.4, delay: 0.1 },
				{ ref: headingChar4Ref, duration: 1.4, delay: 0.05 },
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
				}, 0); // delay: 0 to start with headingChar1Ref
			}

			// Animate headingSeg4Ref position (starts slightly after headingSeg5Ref)
			if (headingSeg4Ref.current) {
				// Set initial position
				gsap.set(headingSeg4Ref.current, { left: "-22%" });

				// Animate to final position
				headingTimeline.to(headingSeg4Ref.current, {
					left: "39.4%",
					duration: 1.4,
					ease: "power4.inOut"
				}, 0.2);
			}

			// Animate headingSeg5Ref position (starts with headingChar2Ref)
			if (headingSeg5Ref.current) {
				// Set initial position
				gsap.set(headingSeg5Ref.current, { left: "-12%" });

				// Animate to final position
				headingTimeline.to(headingSeg5Ref.current, {
					left: "39.4%",
					duration: 1.4,
					ease: "power4.inOut"
				}, 0.35); // delay: 0.2 to start with headingChar2Ref
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
				}, 0.75); // delay: 0.15 to start with headingChar5Ref
			}
		}

	}, { scope: wrapperRef });
	return(
		<section className="relative w-full overflow-hidden">
			<div className="w-full h-[100vh] flex justify-center">
				<canvas ref={canvasRef} />
			</div>
			<div className="absolute top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center">
				<div ref={headingRef} className="w-[98vw] aspect-[1299/351] relative flex flex-row overflow-hidden">
					
					<div ref={headingChar1Ref} className="relative w-[27.33%] h-full mr-[0.31%] overflow-hidden">
						<div ref={headingSeg1Ref} className="w-[63.24%] h-full absolute">
							<img
								src="/headings/highlights-h1-v1.svg"
							/>
						</div>
						<div ref={headingSeg2Ref} className="w-[50.14%] absolute left-[49.86%]">
							<img
								src="/headings/highlights-h1-v2.svg"
							/>
						</div>
					</div>
					
					<div ref={headingChar2Ref} className="relative w-[19.25%] h-full mr-[1.0%] overflow-hidden">
						<div ref={headingSeg3Ref} className="absolute w-full h-full">
							<img
								src="/headings/highlights-h1-e1.svg"
							/>
						</div>
						<div ref={headingSeg4Ref} className="absolute w-[60.8%] left-[39.4%]">
							<img
								src="/headings/highlights-h1-e2.svg"
							/>
						</div>
						<div ref={headingSeg5Ref} className="absolute w-[49%] top-[38.37%] left-[39.4%]">
							<img
								src="/headings/highlights-h1-e3.svg"
							/>
						</div>
					</div>
					
					<div ref={headingChar3Ref} className="relative h-full w-[19.25%] mr-[0.85%] overflow-hidden">
						<div ref={headingSeg6Ref} className="absolute w-full h-full">
							<img
								src="/headings/highlights-h1-l1.svg" 
								className="w-full h-full"
							/>
						</div>
					</div>
					
					<div ref={headingChar4Ref} className="relative w-[7.58%] h-full mr-[1.0%] overflow-hidden">
						<div ref={headingSeg7Ref} className="absolute w-full h-full">
							<img
								src="/headings/highlights-h1-i1.svg"
							/>
						</div>
					</div>
					
					<div ref={headingChar5Ref} className="relative flex flex-row w-[22.56%] h-full justify-center overflow-hidden">
						<div ref={headingSeg8Ref} className="absolute w-[33.79%] top-[24.68%] left-[33.28%]">
							<img
								src="/headings/highlights-h1-t1.svg"
							/>
						</div>
						<div ref={headingSeg9Ref} className="absolute w-full h-[24.68%] bg-[#b0f3e1]">
							{/* <img
								src="/headings/highlights-h1-t2.svg"
							/> */}
						</div>
					</div>
				</div>
				<div className="text-center flex flex-col items-center">
					{/* <h1 className="text-[36.0vw] text-[#b0f3ee] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.9em] m-0 mt-[-5vh] ml-[-0.08em]">Velit</h1> */}
					<p className="w-1/2 text-[18px] text-[#b0f3ee] leading-[1.2em]">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consec.
					</p>
				</div>
			</div>
		</section>
	);
}