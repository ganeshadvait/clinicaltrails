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

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
    }
  }, [messages]);

  const generateResponse = async (message) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';

    try {
      const res = await axios.get(`${backendUrl}/ai?query=${encodeURIComponent(message)}`, {
        headers: { accept: 'application/json' },
      });

      const botMessage = res.data || 'Oops! No message received.';
      setMessages(prev => [...prev.slice(0, -1), { content: botMessage, type: 'incoming' }]);
    } catch (error) {
      setMessages(prev => [...prev.slice(0, -1), { content: 'Oops! Something went wrong. Please try again.', type: 'incoming' }]);
    }
  };

  const handleChat = () => {
    if (!userMessage.trim()) return;

    setMessages(prev => [
      ...prev,
      { content: userMessage, type: 'outgoing' },
      { content: 'Thinking...', type: 'incoming', loading: true },
    ]);

    generateResponse(userMessage);
    setUserMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  const toggleChatbot = () => setShowChatbot(prev => !prev);

  return (
    <div>
      <button className="chatbot-toggler" onClick={toggleChatbot}>
        {showChatbot ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff">
        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          d="M18 6 6 18M6 6l12 12" />
      </svg> : <span className="material-symbols-rounded">
      <img
        className="chatbot-logo"
        src="/favicon.ico"  // your AI chatbot logo
        alt="AI Logo"
      />
    </span>}
      </button>
      {showChatbot && (
        <div className="chatbot show">
          <div className="chatbox" ref={chatboxRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`intercom-13kg6np ekd1qb42 flex ${
                  msg.type === 'outgoing' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="intercom-comment intercom-18ciyg5 ekd1qb41">
                  <div className={`intercom-avtrru e1jqii293 ${msg.type === 'outgoing' ? 'justify-end' : ''}`}>
                    <div className="intercom-hiupyl e1jqii290">
                      <div className="intercom-3xwhyz e2rn66r0">
                        <img
                          src={
                            msg.type === 'outgoing'
                              ? '/chat user img.png'
                              : '/favicon.ico'
                          }
                          alt={msg.type === 'outgoing' ? 'You' : 'Kodee'}
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    </div>
                    <span className="intercom-11cvbht e1jqii292">
                      {msg.type === 'outgoing' ? 'You' : 'Kodee'}
                    </span>
                  </div>
                  <div tabIndex="-1" className="intercom-18ztwyf er4a1r20">
                    <div className="intercom-block-paragraph e16pl8n50 intercom-ks2cl1">
                      {msg.loading ? 'Thinking...' : msg.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <textarea
              ref={chatInputRef}
              placeholder="Enter a message..."
              value={userMessage}
              onChange={e => setUserMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              required
            />
            <button className="send-btn" onClick={handleChat}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


