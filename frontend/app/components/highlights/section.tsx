import { Props } from "@/types";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function Highlights({ wrapperRef }: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);
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
		gsap.to(state, {
		frame: frameCount - 1,
		snap: "frame",
		ease: "none",
		scrollTrigger: {
			trigger: canvas,
			start: "bottom bottom",
			end: "bottom+=2000 top",
			scrub: 0.5,
		},
		onUpdate: render,
		});

	}, { scope: wrapperRef });
	return(
		<section className="relative w-full overflow-hidden">
			<div className="w-full flex justify-center">
				<canvas ref={canvasRef} />
			</div>
			<div data-speed="1.2">
				<Image
					src="/local-images/section-bg-highlights.jpg"
					alt="Photo portrait of a young woman"
					width={3200}
					height={3177}
					style={{
						width: '100%',
						height: 'auto',
					}}
					priority
				/>
			</div>
			<div className="absolute top-[30vh] left-0 w-full" data-speed="1">
				<h1 className="text-[30vw] text-[#b0f3ee] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.6em] text-center m-0 ml-[-0.08em]">Velit</h1>
			</div>
		</section>
	);
}