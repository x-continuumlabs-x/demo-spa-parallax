import Image from "next/image";
export default function Services(){
	return(
		<>
			<div className="relative w-full overflow-hidden">
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
				<div className="absolute top-0 left-0">
					<h1>$599 Ut architecto voluptatem</h1>
				</div>
			</div>
		</>);
}