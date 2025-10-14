import Image from "next/image";
export default function Services(){
	const fullWidth = 2235;
	const fullHeight = 1468;
	return(
		<section className="top-[-30vh] relative w-full overflow-hidden" >
			<div className="flex justify-end">
				<Image
					src="/local-images/section-bg-services.jpg"
					alt="Photo portrait of an old man"
					width={fullWidth}
					height={fullHeight}
					style={{
						width: 'auto',
						height: 'auto',
						maxWidth: '80vw',
						maxHeight: '80vh',
						opacity: '0.5',
					}}
					priority
				/>
			</div>
			<div className="absolute top-0 left-0" data-speed="0.8">
				<h1>$599 Ut architecto voluptatem</h1>
			</div>
		</section>
	);
}