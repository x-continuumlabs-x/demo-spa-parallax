import Hero from "@/app/components/hero/section";
import Services from "@/app/components/services/section";
import Expertise from "@/app/components/expertise/section";
import About from "@/app/components/about/section";
import Highlights from "@/app/components/highlights/section";
import Footer from "@/app/components/footer";
import SmoothScroll from "@/app/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Hero />
	  <Expertise />
      <Services />
      <About />
      <Highlights />
      <Footer />
    </SmoothScroll>
  );
}
