import './cglobalstyles.css';
export default function Message () {
    return(
        <>
        <div className="intercom-13kg6np ekd1qb42">
            <div className="intercom-comment intercom-18ciyg5 ekd1qb41">
                <div className="intercom-avtrru e1jqii293">
                    <div className="intercom-hiupyl e1jqii290">
                        <div size="20" shape="squircle" class="intercom-3xwhyz e2rn66r0">
                            <img src="https://static.intercomassets.com/avatars/1802765/square_128/custom_avatar-1726655063.png" alt="Profile image for Kodee" /></div>
                            </div>
                            <span className="intercom-11cvbht e1jqii292">Kodee</span>
                            <span className="intercom-vvzfff e1jqii291"></span></div>
                            <div tabindex="-1" className="intercom-18ztwyf er4a1r20">
                                <div className="intercom-block-paragraph e16pl8n50 intercom-ks2cl1">Hello 👋! Please briefly describe your issue so we can help you better.</div></div></div>
                                </div>
                                </>
    )
}

"use client";
import React, { useState, useEffect, useRef } from 'react';
import './chatstyles.css';
import axios from 'axios';

export default function ChatWindow() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [userMessage, setUserMessage] = useState('');  
  const [messages, setMessages] = useState([
    { content: 'Hi there 👋 How can I help you today?', type: 'incoming' },
  ]);

  const chatInputRef = useRef(null);
  const chatboxRef = useRef(null);
  const inputInitHeight = useRef(chatInputRef.current ? chatInputRef.current.scrollHeight : 0);


  const createChatLi = (message, type) => {
    return { content: message, type };
  };

  const generateResponse = async (userMessage) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    
    try {
      const response = await axios.get(`${backendUrl}/ai?query=${userMessage}`, {
        headers: { accept: "application/json" },
      });

      console.log("API Response:", response.data); // Debugging

      // Extract the bot's response from 'message'
      const botMessage = response.data || "Oops! No message received.";

      setMessages((prevMessages) => [
        ...prevMessages,
        createChatLi(botMessage, 'incoming'),
      ]);

    } catch (error) {
      console.error("ChatWindow Error:", error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        createChatLi('Oops! Something went wrong. Please try again.', 'error'),
      ]);
    }
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
    if (e.key === 'Enter' && !e.shiftKey) {
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
          <ul className="chatbox" ref={chatboxRef}>
            {messages.map((msg, index) => (
              <li key={index} className={`chat ${msg.type}`}>
                <span className="material-symbols-outlined">
                  <img
                    className="chatbot-logo"
                    src="/favicon.ico"
                    alt="chatbot-logo"
                  />
                </span>
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
          <div className="chat-input">
            <textarea
              ref={chatInputRef}
              placeholder="Enter a message..."
              value={userMessage}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              required
            />
            <span id="send-btn" className="material-symbols-rounded"           
            onClick={handleChat}>
              send
            </span>
          </div>
          
        </div>
      )}
    </div>
  );
}

