import Image from "next/image";
export default function Expertise(){
	return(
		<section className="relative w-full overflow-hidden">
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
			<div className="absolute bottom-0 left-0 w-full">
				<h1 className="text-[30vw] text-[#b8bc92] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.8em] text-center m-0 ml-[-0.08em]">Amet</h1>
			</div>
			<div className="absolute top-[30vw] right-[10vw] w-1/5">
					<p className="text-[16px] text-[#b8bc92] leading-[1.0em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
				</div>
		</section>
	);
}