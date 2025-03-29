import './gptstyles.css';
import Image from 'next/image';
import Link from "next/link";
export default function GptChat () {
    return (
        <>
         {/* <Link href="/decentrialzAI/" className=" rounder text-black text-center flex items-center justify-center mb-2" > Chat with DecentrialzAI</Link> */}
         <section>
            <div className="flex items-center justify-between bg-[#1A73E8] makechat_gpt">
             <div className="for-left">
                <h2 className=''>
                Decentrialz AI :Your AI-Powered Clinical Trial Navigator – Find, Join & Simplify Research
                </h2>
                <p>Instantly discover decentralized trials, verify eligibility, or ask industry questions with our 24/7 AI companion. 
                    Whether you're a patient seeking treatment access or a researcher optimizing studies, get precise answers on trial sites, protocols, and participation—all through a single chat.
                     No jargon, just faster, smarter clinical trial solutions.</p>
                     <div className='w-[300px] h-[60px] flex items-center justify-between bg-white p-2 rounded '>
                     <input
  className="h-full  bg-transparent outline-none border-none cursor-pointer"
  placeholder="Top Recruitment in Trialz"
  
/>
                      <Link href='/decentrialzAI/' className='rotate-180' >
                      <span className='rotate_please'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
</span>
</Link>
                     </div>
             </div>
             <div className="for_right">
             <Image src="/decentrialzai.png" 
             className='relative_image'
             fill />
             </div>
            </div>
         </section>
        </>
    )
}