import {
 
    BLOG_POSTS,
  
  } from '../../app/data';
  import Link from 'next/link';

import './bstyles.css';
export default function Blogs () {
    return(
        <>
        <section className="blogs_section mb-6">
        <h2 className=' text-2xl font-500 leading-tight mb-6 text-black sm:text-4xl lg:text-5xl text-center'>Blogs & Research</h2>
            <div className="inner_blogs">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="blof_cards"
                href={post.link}
                data-id={post.uid}
              >
                <div className="thumb_nail">
    <img className='thumbnails_poster' src={post.thumbnail} />
</div>
                <div className="flex flex-col space-y-1 gap-2">
                  <h4 className=" blogs_post_title">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                  <p className='flex gap-2 learnmore_button'>Learn more<span><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
<path d="M11.4283 2.94922L18.479 9.99994L11.4283 17.0507" stroke="#024DE5" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.4789 10L3.479 10" stroke="#024DE5" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span></p>
                </div>
              </Link>
            ))}


                
            </div>
        </section>
        </>
    )
}

{/* <div className="blof_cards">
<div className="thumb_nail">
    <img className='thumbnails_poster' src="/Container.png" />
</div>
<div className='blog_content'>
    <h3 className=' '>Decentralized Clinical Trials: A Paradigm Shift in Global Clinical Research</h3>
    <p>Overview of how DCTs are disrupting traditional clinical research methods globally.</p>
    <p className='flex gap-2 learnmore_button'>Learn more<span><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
<path d="M11.4283 2.94922L18.479 9.99994L11.4283 17.0507" stroke="#024DE5" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.4789 10L3.479 10" stroke="#024DE5" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg></span></p>
</div>
</div> */}