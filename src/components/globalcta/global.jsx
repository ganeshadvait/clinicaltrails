import React from 'react';
import Image from 'next/image';
import './herostyles.css';
const Global = () => {        
    return (
       <>
       <section className='global_cta flex flex-wrap items-center mt-6'>
       <div className="globalleft-right">
        <div className='image_wrapper h-80 w-full'>
        <Image
        src='/globalcta.jpg'
        alt='globalcta'
        className='global_image'
        priority

        fill/>
        </div>
       
       </div>
       <div className="globalleft-rright">
        <div className='flex flex-col gap-2'>
            <h2 className='htwo'>Ready to Revolutionize Your Clinical Trials?</h2>
            <p className='hpara'>Join the movement towards patient-centric, technology-driven research.</p>
            <div className='flex gap-3'>
            <a href="#" className="px-5 py-2 text-base font-bold text-white hover:bg-gray-600" style={{
              background: 'hsl(208, 92%, 54%)',
              borderRadius: '14px',
              paddingBlock: "1rem",
              margin:'10px 0'
            }}>
              Contact now
            </a>
            <a href="#" className="px-5 py-2 text-base font-bold text-black hover:bg-gray-600" style={{
              border: '1px solid hsl(208, 92%, 54%)',
              borderRadius: '14px',
              paddingBlock: "1rem",
              margin:'10px 0'
            }}>
              Contact now
            </a>
            </div>
            
        </div>
       </div>
       </section>
       </>
    );
};

export default Global;
