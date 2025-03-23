"use client";
import React, { useState, useEffect, useRef } from 'react';
import './chatstyles.css';

export default function ChatWindow() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [defaultContent, setDefaultContent]  = useState(false);
  const [messages, setMessages] = useState([
    { content: 'Hi there 👋 How can I help you today?', type: 'incoming' },
  ]);

  const chatInputRef = useRef(null);
  const chatboxRef = useRef(null);
  const inputInitHeight = useRef(chatInputRef.current ? chatInputRef.current.scrollHeight : 0);

  const API_KEY = 'your-api-key-here'; // Secure the API key properly

  const createChatLi = (message, type) => {
    return { content: message, type };
  };

  const generateResponse = (userMessage) => {
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      }),
    };

    fetch(API_URL, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const botMessage = data.choices[0].message.content.trim();
        setMessages((prevMessages) => [
          ...prevMessages,
          createChatLi(botMessage, 'incoming'),
        ]);
      })
      .catch(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          createChatLi('Oops! Something went wrong. Please try again.', 'error'),
        ]);
      });
  };

  const handleChat = () => {
    if (!userMessage.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      createChatLi(userMessage, 'outgoing'),
    ]);
    setUserMessage('');
    chatInputRef.current.style.height = `${inputInitHeight.current}px`;

    setTimeout(() => {
      const incomingMessage = createChatLi('Thinking...', 'incoming');
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      generateResponse(userMessage);
    }, 600);
  };

  const handleChange = (e) => {
    setUserMessage(e.target.value);
    chatInputRef.current.style.height = `${inputInitHeight.current}px`;
    chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <div>
      
      <button className="chatbubble" onClick={toggleChatbot}>
        chat with us
      </button>
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        <span className="material-symbols-rounded">
          <img
            className= {`chatbot-log ${showChatbot ? "hidden" : 'flex'}`}
            src="/favicon.ico"
            alt="chatbot-logo"
          />
        </span>
        <span className= {`material-symbols-outlined ${showChatbot ? "flex" : 'hidden'}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="m3 3 10 10M13 3 3 13"/></svg></span>
      </button>
      {showChatbot && (
        <div className={`chatbot ${showChatbot ? "show" : ''}`}>
            <div className='for_default'>
            <header className='chat-box_header'>
            <div className='trails_association flex items-center gap-2'>
                <div className='w-[44px] h-[44px] bg-white rounded-full'></div>
                <div className='w-[44px] h-[44px] bg-white rounded-full'></div>
                <p className='trust_texxt'>Trus logo</p>
            </div>
            <div>
            <h2>Hi there 👋 <br></br> How can we help?</h2>
            </div>
          </header>

          <div className='chatbody_chat'>
            <ul className='chatbody_options_box flex flex-col'>
                <li className='chatbody_optiosn_box_item flex items-center justify-between'> <p className='font-600 text_l'>chat with us</p> <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="M5.5 2.5 11 8l-5.5 5.5"/></svg></span></li>
            </ul>
            <ul className='chatbody_options_box _second flex flex-col gap-2 mt-2'>
                <li className='chatbody_optiosn_box_item flex items-center justify-between'><input placeholder='search' /> <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5.5" stroke="currentColor"/><path stroke="currentColor" d="m11 11 4 4"/></svg></span></li>
            <li className='chatbody_optiosn_box_item flex items-center justify-between'> <p className='font-600 text_l'>How many trails</p> <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="M5.5 2.5 11 8l-5.5 5.5"/></svg></span></li>
            <li className='chatbody_optiosn_box_item flex items-center justify-between'> <p className='font-600 text_l'>How to join as Volunteer</p> <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="M5.5 2.5 11 8l-5.5 5.5"/></svg></span></li>
            <li className='chatbody_optiosn_box_item flex items-center justify-between'> <p className='font-600 text_l'>what is age limit</p> <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="M5.5 2.5 11 8l-5.5 5.5"/></svg></span></li>
            <li className='chatbody_optiosn_box_item flex items-center justify-between'> <p className='font-600 text_l'>what is age limit</p> <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" d="M5.5 2.5 11 8l-5.5 5.5"/></svg></span></li>
            </ul>
            </div>
            </div>
          
        </div>
      )}
    </div>
  );
}

// <ul className="chatbox" ref={chatboxRef}>
//             {messages.map((msg, index) => (
//               <li key={index} className={`chat ${msg.type}`}>
//                 <span className="material-symbols-outlined">
//                   <img
//                     className="chatbot-logo"
//                     src="https://advaithealth.com/wp-content/uploads/2024/05/Untitled-1-e1717074923828.png"
//                     alt="chatbot-logo"
//                   />
//                 </span>
//                 <p>{msg.content}</p>
//               </li>
//             ))}
//           </ul>
//           <div className="chat-input">
//             <textarea
//               ref={chatInputRef}
//               placeholder="Enter a message..."
//               value={userMessage}
//               onChange={handleChange}
//               onKeyDown={handleKeyDown}
//               spellCheck="false"
//               required
//             />
//             <span id="send-btn" className="material-symbols-rounded" onClick={handleChat}>
//               send
//             </span>
//           </div>