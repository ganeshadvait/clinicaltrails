"use client";
import './howstyles.css';
import React, { useState } from 'react';

const HowItWorks = () => {
    const [tabActive, setTabActive] = useState('volunteers');

    return (
        <section className="py-10 bg-white sm:py-16 lg:py-24">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">How does it work?</h2>
                
            </div>
            <div className='tabs-bar' style={{ margin: '20px auto' }}>
                <div 
                    className={`tabs_forcontent ${tabActive === 'volunteers' ? 'active' : ''}`} 
                    onClick={() => setTabActive('volunteers')}
                >
                    Participants
                </div>
                <div 
                    className={`tabs_forcontent ${tabActive === 'researchers' ? 'active' : ''}`} 
                    onClick={() => setTabActive('researchers')}
                >
                    Sites
                </div>
                <div 
                    className={`tabs_forcontent ${tabActive === 'sponsors' ? 'active' : ''}`} 
                    onClick={() => setTabActive('sponsors')}
                >
                    Sponsors
                </div>
            </div>
            <div className={`tab-content ${tabActive === 'volunteers' ? 'active' : ''} px-4 mx-auto max-w-7xl sm:px-6 lg:px-8`}>
            <div className= "px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              

              <div className="relative mt-12 lg:mt-20">
                  <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                      <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                  </div>
              
                  <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                      <div>
                          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#1a73e8] border-2 border-gray-200 rounded-full shadow">
                              <span className="text-xl text-white font-semibold text-gray-700 cursor-pointer"> 1 </span>
                          </div>
                          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Discover Trials Near You</h3>
                          <p className="mt-4 text-base text-gray-600">Search 66,000+ clinical trials worldwide by condition, location, or treatment type. Filter by phase, study type (paid/volunteer), or eligibility.</p>
                      </div>
              
                      <div>
                          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#1a73e8] border-2 border-gray-200 rounded-full shadow">
                              <span className="text-xl text-white font-semibold text-gray-700 cursor-pointer"> 2 </span>
                          </div>
                          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Check Eligibility</h3>
                          <p className="mt-4 text-base text-gray-600">Get clear, jargon-free details on what the trial involves. Pre-screen yourself with simple questions before applying.</p>
                      </div>
              
                      <div>
                          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#1a73e8] border-2 border-gray-200 rounded-full shadow">
                              <span className="text-xl text-white font-semibold text-gray-700 cursor-pointer"> 3 </span>
                          </div>
                          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Join & Contribute</h3>
                          <p className="mt-4 text-base text-gray-600">One-click applications or guided onboarding. Get matched with nearest sites for in-person/virtual visits.</p>
                      </div>
                  </div>
              </div>
              </div>
            </div>
            <div className={`tab-content ${tabActive === 'researchers' ? 'active' : ''} px-4 mx-auto max-w-7xl sm:px-6 lg:px-8`}>
            <div className= "px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              

              <div className="relative mt-12 lg:mt-20">
                  <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                      <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                  </div>
              
                  <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                      <div>
                          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#1a73e8] border-2 border-gray-200 rounded-full shadow">
                              <span className="text-xl text-white font-semibold text-gray-700 cursor-pointer"> 1 </span>
                          </div>
                          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Partner with Us</h3>
                          <p className="mt-4 text-base text-gray-600">Join our network of trusted research sites and institutions to access a global pool of volunteers and cutting-edge trials.</p>
                      </div>
              
                      <div>
                          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#1a73e8] border-2 border-gray-200 rounded-full shadow">
                              <span className="text-xl text-white font-semibold text-gray-700 cursor-pointer"> 2 </span>
                          </div>
                          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Discover Trials & Collaborate</h3>
                          <p className="mt-4 text-base text-gray-600">Browse 66,000+ active clinical trials and connect with sponsors looking for sites like yours.</p>
                      </div>
              
                      <div>
                          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#1a73e8] border-2 border-gray-200 rounded-full shadow">
                              <span className="text-xl text-white font-semibold text-gray-700 cursor-pointer"> 3 </span>
                          </div>
                          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Manage Volunteers Efficiently</h3>
                          <p className="mt-4 text-base text-gray-600">Get matched with eligible participants from our organic traffic and streamline study enrollment.</p>
                      </div>
                  </div>
              </div>
              </div>
            </div>
            <div className={`tab-content ${tabActive === 'sponsors' ? 'active' : ''} px-4 mx-auto max-w-7xl sm:px-6 lg:px-8`}>
            <div className= "px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              

              <div className="relative mt-12 lg:mt-20">
                  <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                      <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                  </div>
              
                  <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                      <div>
                          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#1a73e8] border-2 border-gray-200 rounded-full shadow">
                              <span className="text-xl text-white font-semibold text-gray-700 cursor-pointer"> 1 </span>
                          </div>
                          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Find the Right Trial & Sites</h3>
                          <p className="mt-4 text-base text-gray-600">Search from thousands of clinical trials and identify ideal sites with proven recruitment potential.</p>
                      </div>
              
                      <div>
                          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#1a73e8] border-2 border-gray-200 rounded-full shadow">
                              <span className="text-xl text-white font-semibold text-gray-700 cursor-pointer"> 2 </span>
                          </div>
                          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Recruit Participants Effortlessly</h3>
                          <p className="mt-4 text-base text-gray-600">Tap into our organic traffic and participant database to accelerate enrollment.</p>
                      </div>
              
                      <div>
                          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#1a73e8] border-2 border-gray-200 rounded-full shadow">
                              <span className="text-xl text-white font-semibold text-gray-700 cursor-pointer"> 3 </span>
                          </div>
                          <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Close Studies Efficiently</h3>
                          <p className="mt-4 text-base text-gray-600">Track progress, manage site performance, and complete studies on time with our support.</p>
                      </div>
                  </div>
              </div>
              </div>
            </div>
        </section>
    );
}

export default HowItWorks;
