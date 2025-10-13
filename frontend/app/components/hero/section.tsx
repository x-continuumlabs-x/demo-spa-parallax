import Image from "next/image";

export default function Hero() {
	return (
		<section className="relative w-full overflow-hidden">
		<div className="relative w-full h-[100vh]">
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-full">
				<Image
					src="/local-images/section-bg-hero.jpg"
					alt="Photo portrait of a young woman"
					width={3200}
					height={2196}
					style={{
						width: '100%',
						height: 'auto',
					}}
					priority
				/>
			</div>
			<div className="absolute top-0 left-0 w-full">
				<h1 className="text-[30vw] text-[#b082db] uppercase font-black tracking-[-0.08em] leading-[0.6em] text-center m-0 ml-[-0.08em]">Nomin</h1>
			</div>
			<div className="absolute top-[30vw] left-0 w-1/2">
				<p className="text-[16px] text-[#b082db] leading-[1.0em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
			</div>
		</div>
		</section>
	);
}