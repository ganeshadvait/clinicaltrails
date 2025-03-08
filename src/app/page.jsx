import Image from "next/image";
import HowItWorks from '../components/How/how';
import HeroSection from '../components/hero/hero';
import About from "@/components/about/about";

export default function Home() {
  return (
    <>
    <HeroSection />
    <HowItWorks />
    <About />
    </>
  );
}
