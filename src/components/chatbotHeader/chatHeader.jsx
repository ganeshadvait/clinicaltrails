import './cheader.css';
export default function ChatHeader () {
    return(
        <>
        <section style={{
            width:'100%',
            height:'auto'
        }}>
         <div className="headerfor_chatbots">
            <div className="chatbot_header_parent_containers">
                <div className='header_imagebox'>
                <img src="/favicon.ico"  alt="decentrialzai"/>
                <div className="flex items-center gap-1">
                    <span className='w-[5px] h-[5px] rounded bg-[#1946da]'>

                    </span>
                    <p>Online</p>
                </div>
                </div>
                
            </div>
            <div className="chatbot_header_parent_containers"></div>
         </div>
        </section>
        </>
    )
}