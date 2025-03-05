'use client';
import { useState } from 'react';


export default function Header() {

  return (
    <header className="py-4 md:py-6">
    <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
            <div className="flex-shrink-0">
                <a href="/" title="" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                    <h3 className='text-3xl'>Decentrailz</h3>
                </a>
            </div>

            <div className="flex lg:hidden">
                <button type="button" className="text-gray-900">
                    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>


            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-8 xl:space-x-10">     
            <div className="hidden lg:flex lg:ml-10 xl:ml-16 lg:items-center lg:justify-center lg:space-x-8 xl:space-x-16">
                <a href="/clinical-trials" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Search Clinical Trails </a>

                <a href="/clinical-trials/listings" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Clinical trails listings </a>

                <a href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> About us </a>
            </div>         
                <a href="#" title="" className="px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-[#1a73e8] border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" role="button">
                    Create free account
                </a>
            </div>
        </div>
    </div>
</header>
  )
}
