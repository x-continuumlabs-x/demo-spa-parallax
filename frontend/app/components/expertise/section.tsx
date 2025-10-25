import Image from "next/image";
export default function Expertise(){
	const imgWidthLandscape = 3200;
	const imgHeightLandscape = 2863;
	const heightRatioLandscape = imgHeightLandscape / imgWidthLandscape;
	const imgWidthPortrait = 3200;
	const imgHeightPortrait = 6197;
	const heightRatioPortrait = imgHeightPortrait / imgWidthPortrait;
	return(
		<section className="z-10 relative w-full overflow-hidden top-[-20vw]">
			<div data-speed="1.3"
				className="relative w-full h-[var(--height-landscape)] portrait:h-[var(--height-portrait)]"
				style={{
					'--height-landscape': `calc(${heightRatioLandscape} * 100vw)`,
					'--height-portrait': `calc(${heightRatioPortrait} * 100vw)`,
				} as React.CSSProperties}
			>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full">
					{/* Landscape image */}
					<Image
						src="/local-images/section-bg-expertise.jpg"
						alt="Photo portrait of a young man"
						width={imgWidthLandscape}
						height={imgHeightLandscape}
						style={{
							width: '100%',
							height: 'auto',
						}}
						className="portrait:hidden"
						priority
					/>
					{/* Portrait image */}
					<Image
						src="/local-images/section-bg-expertise-portrait.jpg"
						alt="Photo portrait of a young man"
						width={imgWidthPortrait}
						height={imgHeightPortrait}
						style={{
							width: '100%',
							height: 'auto',
						}}
						className="hidden portrait:block"
						priority
					/>
				</div>
				<div className="w-full" data-speed="0.7">
					<h1 className="text-[30vw] text-[#b8bc92] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.8em] text-center m-0 ml-[-0.08em]">Amet</h1>
				</div>
				<div className="absolute top-[25vw] right-[10vw] w-1/5" data-speed="0.6">
						<p className="text-[15px] text-[#b8bc92] leading-[1.0em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
				</div>
			</div>
		</section>
	);
}