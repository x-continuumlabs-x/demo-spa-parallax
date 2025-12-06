import { Props } from "@/types";
import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Highlights({ wrapperRef }: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

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

	}, { scope: wrapperRef });
	return(
		<section className="relative w-full overflow-hidden">
			<div className="w-full h-[100vh] flex justify-center">
				<canvas ref={canvasRef} />
			</div>
			<div className="absolute top-0 left-0 w-full h-[100vh] flex flex-col items-center justify-center">
				<div className="text-center flex flex-col items-center">
					<h1 className="text-[36.0vw] text-[#b0f3ee] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.9em] m-0 ml-[-0.08em]">Velit</h1>
					<p className="w-1/2 text-[18px] text-[#b0f3ee] leading-[1.2em]">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consec.
					</p>
				</div>
			</div>
		</section>
	);
}