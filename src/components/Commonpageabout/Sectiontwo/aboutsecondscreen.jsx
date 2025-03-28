import './aboutsecond.css';
export default function Aboutsecond () {
    return(
        <>
        <section className='w-full mt-20 mt-20'>
         <div className='w-full flex gap-4 align_itemsc'>
           <div className="images_box_one images_boxess">
            <img src='/ABOUTone.jpg' />
           </div>
           <div className="images_box_two images_boxess">
            <div className='flex flex-col justify-between gap-4 h-[100%]'>
                <div className='w-full h-full here_border_16'>
                    <img src='/abouttwo.jpg ' />
                </div>
                <div className='flex flex-col items-center justify-center gap-2 middle_content_box'>
                    <h2>15+</h2>
                    <p>Years of Experience in clinical patient recruiting</p>
                </div>
            </div>
           </div>
           <div className="images_box_three images_boxess">
            <div className='w-full h-full flex flex-col justify-center gap-4 alluris'>
            <span>About Decentrialz Clinical Trials</span>
            <h2>Revolutionizing Medical Research</h2>
            <p>At Decentrialz, we are pioneering the future of clinical trials by leveraging cutting-edge technology to make medical research more accessible, efficient, and patient-centric. Our decentralize approach breaks down traditional barriers, 
                connecting researchers, healthcare professionals, and participants worldwide. </p>
            </div>
            
           </div>

         </div>
        </section>
        </>
    )
}