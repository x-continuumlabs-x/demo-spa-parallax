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
			<div className="absolute top-0 left-0">
				<h1>Nomin</h1>
			</div>
		</div>
		</section>
	);
}