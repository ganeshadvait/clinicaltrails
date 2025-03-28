export default function SingleHeader () {
    return (
        <>
            <section style={{
            width:'100%',
            height:'60px',
            background:'#1946da',
            position:'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
        }}>
         <div className="headerfor_chatbots single_header">
            <div className="chatbot_header_parent_containers">
                <div className='header_imagebox'>
                <img src="/favicon.ico"  alt="decentrialzai"/>
                <div className="flex items-center gap-1">
                    <span className='w-[5px] h-[5px] rounded bg-white'>

                    </span>
                    <p className="text-white" style={{
                        color:'white'
                    }}>Online</p>
                </div>
                </div>
                
            </div>
            <div className="chatbot_header_parent_containers"></div>
         </div>
        </section>
        </>
    )
}