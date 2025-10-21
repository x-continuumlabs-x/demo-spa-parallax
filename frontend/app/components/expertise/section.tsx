import Image from "next/image";
export default function Expertise(){
	return(
		<section className="z-10 relative w-full overflow-hidden top-[-20vw] sm:top-[-12vw]" data-speed="1.2">
			<div>
				<Image
					src="/local-images/section-bg-expertise.jpg"
					alt="Photo portrait of a young man"
					width={3200}
					height={2863}

					style={{
						width: '100%',
						height: 'auto',
					}}
					priority
				/>
			</div>
			<div className="absolute bottom-[16vw] left-0 w-full" data-speed="0.8">
				<h1 className="text-[30vw] text-[#b8bc92] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.8em] text-center m-0 ml-[-0.08em]">Amet</h1>
			</div>
			<div className="absolute top-[25vw] right-[10vw] w-1/5" data-speed="0.6">
					<p className="text-[15px] text-[#b8bc92] leading-[1.0em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
				</div>
		</section>
	);
}