'use client'; 
import { useState } from 'react';
import Image from 'next/image';
import GoesOutComesInUnderline from '../GoesOutComesInUnderline'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  

  return (
    <header className="py-4 md:py-6 headers" style={{
        borderBottom: '1px solid #e0e0e0'
    }}>
      <div className="container px-0 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="/" title="" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
              <Image
                src="/Decen logo.svg"
                width={160}
                height={60}
                alt="Logo"
                 layout="responsive"
                loading="lazy"
              />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button type="button" className="text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16"></path>
              </svg>
            </button>
          </div>

          <div className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col lg:hidden absolute bg-white w-full left-0 top-[100px] z-1000 shadow-md transition-all duration-3000 ease-in-out`}>            
            <a href='/' className='p-4 text-gray-900 hover:bg-gray-100'>
            <GoesOutComesInUnderline label="Home" />
            </a>
            <a href='/' className='p-4 text-gray-900 hover:bg-gray-100'> How it works</a>
          
            <a href="/clinical-trials" className="p-4 text-gray-900 hover:bg-gray-100">Find Clinical Trails</a>
            <a href="/clinical-trials/listings" className="p-4 text-gray-900 hover:bg-gray-100">Clinical Trialz Listings</a>
            <a href='/' className='p-4 text-gray-900 hover:bg-gray-100'>Blogs</a>
          </div>

          
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <a href='/' className='text-base font-medium text-gray-900 hover:text-opacity-50'>
            <GoesOutComesInUnderline label="Home" /></a>
            <a href='/' className='text-base font-medium text-gray-900 hover:text-opacity-50'>
            <GoesOutComesInUnderline label="How it works" />
             </a>
          
            <a href="/clinical-trials" className="text-base font-medium text-gray-900 hover:text-opacity-50">
            <GoesOutComesInUnderline label="Find Clinical Trails" />
            </a>
            <a href="/clinical-trials/listings" className="text-base font-medium text-gray-900 hover:text-opacity-50">
            <GoesOutComesInUnderline label='Clinical Trialz Listings' />
          </a>
            <a href='/' className='text-base font-medium text-gray-900 hover:text-opacity-50'>
            <GoesOutComesInUnderline label='Blogs' />
            </a>
            <a href="#" className="text-base font-medium text-gray-900 hover:text-opacity-50">
              <GoesOutComesInUnderline label='About Us' />
              </a>
            <a href="#" className="px-5 py-2 text-base font-bold text-white  header_contact_cta" style={{
              
              borderRadius: '14px',
              paddingBlock: "1rem"
            }}>
              <GoesOutComesInUnderline label='Contact now' />
              
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
