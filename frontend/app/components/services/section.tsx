import Image from "next/image";
export default function Services(){
	const imgWidthLandscape = 2665;
	const imgHeightLandscape = 1468;
	const imgWidthPortrait = 2235;
	const imgHeightPortrait = 1468;
	return(
		<section className="top-[-30vh] relative w-full overflow-hidden flex justify-end" >
			<div className="relative mr-[-5vw]">
				{/* Landscape image */}
				<Image
					src="/local-images/section-bg-services-desktop.jpg"
					alt="Photo portrait of an old man"
					width={imgWidthLandscape}
					height={imgHeightLandscape}
					style={{
						width: 'auto',
						height: 'auto',
						maxWidth: '80vw',
						maxHeight: '80vh',
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
						maxWidth: '80vw',
						maxHeight: '80vh',
						opacity: '0.5',
					}}
					className="hidden portrait:block"
					priority
				/>
				<div className="absolute top-[25vh] left-[-9vw]" data-speed="0.9">
					<h1 className="text-[3vw] uppercase font-nominee font-black tracking-[-0.08em] leading-[1.0em] mb-[15px]">$599 Ut <br />architecto <br />voluptatem</h1>
					<p className="w-[25vw] max-w-[410px] text-[15px] leading-[1.0em] opacity-60">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
				</div>
			</div>
			{/* <div className="absolute top-0 left-0" data-speed="0.8">
				<h1>$599 Ut architecto voluptatem</h1>
			</div> */}
		</section>
	);
}