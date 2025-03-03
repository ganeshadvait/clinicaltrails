import Image from "next/image";
import About from '../components/about/about';
import Contact from '../components/contact/contact';
import Global from '../components/globalcta/global';
import HowItWorks from '../components/How/how';
import HeroSection from '../components/hero/hero'

export default function Home() {
  return (
    <>
    <HeroSection />
    <About />
    <HowItWorks />
    <Global />
    <Contact />
    </>
  );
}
