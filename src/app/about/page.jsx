import AboutHero from '../../components/Commonpageabout/AboutPage/Abouthero';
import Aboutsecond from '../../components/Commonpageabout/Sectiontwo/aboutsecondscreen';
import HMV from '../../components/Commonpageabout/hmv/hmv';
import AboutinNumbers from "@/components/about/about";
import MeetourTeam from '../../components/Commonpageabout/meetteam/meetourteam';

export default function About () {
    return (
        <>
        <section style={{
            width:'100%',
            height:"100%"
        }}>
         <AboutHero />
         <div className='common_page_body mb-10'>
         <Aboutsecond />
         <HMV />
         <AboutinNumbers />
         </div>

         <MeetourTeam />
       
        </section>
        
        </>
    )
}