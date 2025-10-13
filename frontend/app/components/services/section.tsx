import Image from "next/image";
export default function Services(){
	return(
		<section className="relative w-full overflow-hidden">
			<div data-speed="0.9">
				<Image
					src="/local-images/section-bg-services.jpg"
					alt="Photo portrait of an old woman"
					width={2235}
					height={1468}
					style={{
						width: '100%',
						height: 'auto',
						opacity: '0.5',
					}}
					priority
				/>
			</div>
			<div className="absolute top-0 left-0" data-speed="1.15">
				<h1>$599 Ut architecto voluptatem</h1>
			</div>
		</section>
	);
}