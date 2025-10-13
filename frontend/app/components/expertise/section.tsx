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
			<div className="absolute top-0 left-0 w-full">
				<h1 className="text-[30vw] text-[#b8bc92] uppercase font-nominee font-black tracking-[-0.08em] leading-[0.6em] text-center m-0 ml-[-0.08em]">Amet</h1>
			</div>
		</section>
	);
}