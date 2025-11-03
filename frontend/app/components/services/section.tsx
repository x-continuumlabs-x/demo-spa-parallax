import Image from "next/image";
export default function Services(){
	const imgWidthLandscape = 2665;
	const imgHeightLandscape = 1468;
	const imgWidthPortrait = 2235;
	const imgHeightPortrait = 1468;
	const heightRatioLandscape = imgHeightLandscape / imgWidthLandscape;
	const heightRatioPortrait = imgHeightPortrait / imgWidthPortrait;
	return(
		<section className="top-[-30vh] relative w-full overflow-hidden flex justify-end">
			<div
				id="img-wrapper"
				className="relative w-[70vw] h-[var(--height-landscape)] portrait:h-[var(--height-portrait)]"
				style={{
					'--height-landscape': `calc(${heightRatioLandscape} * 70vw)`,
					'--height-portrait': `calc(${heightRatioPortrait} * 70vw)`,
				} as React.CSSProperties}
			>
				<div id="img-container" className="absolute top-0 right-0">
					<div id="img1">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-services-desktop.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: 'auto',
								height: 'auto',
								// maxWidth: '80vw',
								// maxHeight: '70vh',
								opacity: '0.5',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/local-images/section-bg-services.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthPortrait}
							height={imgHeightPortrait}
							style={{
								width: 'auto',
								height: 'auto',
								// maxWidth: '80vw',
								// maxHeight: '70vh',
								opacity: '0.5',
							}}
							className="hidden portrait:block"
							priority
						/>
					</div>
				
					<div id="img2">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-services-desktop.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/local-images/section-bg-services.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthPortrait}
							height={imgHeightPortrait}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="hidden portrait:block"
							priority
						/>
					</div>

					<div id="img3">
						{/* Landscape image */}
						<Image
							src="/local-images/section-bg-services-desktop.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthLandscape}
							height={imgHeightLandscape}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="portrait:hidden"
							priority
						/>
						{/* Portrait image */}
						<Image
							src="/local-images/section-bg-services.jpg"
							alt="Photo portrait of an old man"
							width={imgWidthPortrait}
							height={imgHeightPortrait}
							style={{
								width: 'auto',
								height: 'auto',
								opacity: '0.5',
							}}
							className="hidden portrait:block"
							priority
						/>
					</div>
				</div>
			</div>
			<div className="absolute top-[20vh] left-[15vw]" data-speed="0.9">
				<h1 className="text-[3vw] uppercase font-nominee font-black tracking-[-0.08em] leading-[1.0em] mb-[15px]">$599 Ut <br />architecto <br />voluptatem</h1>
				<p className="w-[25vw] max-w-[410px] text-[15px] leading-[1.0em] opacity-60">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
			</div>
		</section>
	);
}