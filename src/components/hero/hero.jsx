import React from 'react';
import './herostyles.css';

const HeroSection = () => {
    return (
       <>
       <section className='section home-hero_image py-10 bg-gray-50 sm:pt-16 lg:pt-24'>
       <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
  <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">    
    <div className="left flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:w-1/2">
      <h2 className="text-white text-3xl font-bold sm:text-4xl xl:text-5xl" style={{
        marginBottom: '14px'
      }}>
        Science-First GMP Manufacturing
      </h2>
      <p className="text-lg text-gray-300" style={{
        marginBottom:'8px'
      }}>
        A modern approach to delivering advanced therapies
      </p>
      <a
        href="#"
        className="text-sm font-semibold text-[#4d41e3] px-6 py-4 mt-3 bg-white rounded-md transition-all duration-200 hover:text-white hover:bg-blue-700 focus:bg-blue-700"
      >
        Contact now <span aria-hidden="true">&rarr;</span>
      </a>
    </div>

    
    <div className="right flex lg:w-1/2 space-x-6 ">
    <a href="#" className="flex space-x-6  mobile-box">
  
  <div className="box1 flex-1 justify-between gap-[12px] bg-[#372EA5] p-6 rounded-md shadow-lg cursor-pointer" style={{
    border: '1px solid #fff'
  }}>
    <div className='boxes'>
      {/* Add content for the box here */}
    </div>

    <p className="text-white font-semibold">New Expansion Automation</p>
    <p className="text-gray-300" style={{
      fontSize: '14px',
      marginTop: '8px',
      marginBottom : '12px'
    }}>
      Decades of breakthroughs in manufacturing, analytical and process development have equipped us to identify
    </p>
    <a
        href="#"
        className="text-sm font-semibold text-[#4d41e3] px-6 py-4 mt-3 bg-white rounded-md transition-all duration-200 hover:text-white hover:bg-blue-700 focus:bg-blue-700"
      >
        Sponser Info <span aria-hidden="true">&rarr;</span>
      </a>
  </div>

  
  <div className="box2 flex-1 justify-between gap-[12px] bg-[#372EA5] p-6 rounded-md shadow-lg cursor-pointer" style={{
    border: '1px solid #fff'
  }}>
    <div className='boxes'>
      {/* Add content for the box here */}
    </div>

    <p className="text-white font-semibold">Innovation is Built not bought</p>
    <p className="text-gray-300" style={{
      fontSize: '14px',
      marginTop: '8px',
      marginBottom : '12px'
    }}>
      Delighted to announce The Medicine Accelerator's €100M campus expansion with the creation of 300 new jobs.
    </p>
    <a
        href="#"
        className="text-sm font-semibold text-[#4d41e3] px-6 py-4 mt-3 bg-white rounded-md transition-all duration-200 hover:text-white hover:bg-blue-700 focus:bg-blue-700"
      >
        Patient Info <span aria-hidden="true">&rarr;</span>
      </a>
  </div>
</a>

    </div>
  </div>
</div>

       </section>
       </>
    );
};

export default HeroSection;
