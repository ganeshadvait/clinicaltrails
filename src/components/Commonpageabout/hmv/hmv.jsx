import './hmvstyles.css';
export default function HMV () {
    return(
        <>
        <section className='w-full h-full mt-15 mb-15 flex gap-4 items-stretch items_in_HML'>
         <div className="lefts_columns flex flex-col gap-4">
            <div className="vision_misson_boxex flex flex-col gap-3 items-start justify-center"><h3>Our Vision</h3><p>
            Our vision is a world where clinical research is universally accessible, driven by innovation, and empowered by communities. We aim to break down barriers, harness technology, and create a future where every individual can contribute to and benefit from life-saving medical discoveries.</p></div>
            <div className="vision_misson_boxex flex flex-col gap-3 items-start justify-center"><h3>Our Mission</h3><p>
            Our mission is to revolutionize clinical trials by making them decentralized, transparent, and inclusive. We connect patients, researchers, and innovators globally, leveraging cutting-edge solutions to accelerate healthcare breakthroughs while prioritizing trust, privacy, and equity.</p></div>
            <div className="vision_misson_boxex flex flex-col gap-3 items-start justify-center"><h3>Our History</h3><p>
            Decentraliz was founded with a bold vision to revolutionize clinical trials, leveraging over 15 years of expertise in research and innovation. From our early days, we’ve pioneered decentralized approaches, growing into a global platform that connects communities to cutting-edge medical discoveries.</p></div>
         </div>
         <div className="columns_right">
            <h2>
            Clinical trials are the backbone of medical progress, turning hope into evidence and uncertainty into knowledge.
            </h2>
            <p>Through rigorous testing and systematic research, clinical trials provide the critical data needed to validate treatments, improve patient outcomes, and advance scientific discovery.</p>
            <button>Contact us</button>
         </div>
        </section>
        </>
    )
}