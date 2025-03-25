"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useState, useRef, useEffect } from "react";
import ChatLoader from '../../components/cahtloader/chatsloaders';
import '../../components/cglobalstyles.css';
import axios from "axios";

const ChatUIUserResultLayout = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]); 
  const [airesponse, setAiResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };
  
  const handleSendMessage = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  
    if (!backendUrl) {
      alert("Something went wrong, check back later.");
      return;
    }
  
    const trimmedMessage = userMessage.trim();
    if (trimmedMessage === "") return;
  
    setMessages((prevMessages) => [...prevMessages, { text: trimmedMessage, type: "user" },
      { text: "", type: "ai", loading: true },
    ]);
    setUserMessage("");

    setIsLoading(true);
  
    try {
      const response = await axios.get(`${backendUrl}/ai?query=${encodeURIComponent(trimmedMessage)}`, {
        headers: { accept: "application/json" },
      });
      console.log('current response', response.data);
      const aiText = response.data?.trim() || "Sorry, I didn't understand that.";
      startTypingEffect(aiText);
    } catch (error) {
      console.error("Error fetching data:", error);
    setMessages(prevMessages => {
      const updated = [...prevMessages];
      updated[updated.length - 1] = {
        text: "AI is not responding. Please try again.",
        type: "ai",
        loading: false
      };
      return updated;
    });
  
    } finally{
      setIsLoading(false);
    }
  };
  const typingIntervalRef = useRef(null);

  const startTypingEffect = (fullText) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
  
    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        const lastIndex = updatedMessages.length - 1;
        const lastMessage = updatedMessages[lastIndex];
  
        if (lastMessage && lastMessage.type === "ai") {
          if (lastMessage.loading) lastMessage.loading = false;
  
          
          if (i < fullText.length) {
            lastMessage.text += fullText.charAt(i);
            i += 1;
          }
        }
  
        return updatedMessages;
      });
  
      if (i >= fullText.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        scrollToBottom();
      }
    }, 30);
  };
  
  
  

  return (
    <div className="min-h-screen bg-[#Fff] flex flex-col justify-between">
      {/* Chat Messages */}
      <div  ref={chatContainerRef} className="inner_chat_body p-4 sm:p-6 flex flex-col items-center">
      {messages.map((msg, index) => (
        <div key={index} className={`intercom-13kg6np ekd1qb42 flex ${msg.type === "user" ? "justify-end self-end" : "justify-start self-start"}`}>
          <div className="intercom-comment intercom-18ciyg5 ekd1qb41">
            <div className={`intercom-avtrru e1jqii293 ${msg.type === "user" ? "justify-end" : ""}`}>
              <div className={`intercom-hiupyl e1jqii290 ${msg.type === "user" ? "justify-end" : ""}`}>
                <div size="20" shape="squircle" className="intercom-3xwhyz e2rn66r0">
                  <img 
                    src={msg.type === "user" ? "/chat user img.png" : "/favicon.ico"} 
                    alt={`Profile image for ${msg.type === "user" ? "You" : "AI"}`} 
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              </div>
              <span className={`intercom-11cvbht e1jqii292`}>
                {msg.type === "user" ? "You" : "AI"}
              </span>
            </div>
            <div tabIndex="-1" className={`intercom-18ztwyf er4a1r20 ${msg.type === "user" ? "flex justify-end " : ""}`}>
              <div className={`intercom-block-paragraph e16pl8n50 intercom-ks2cl1 p-2 rounded-lg max-w-[75%] text-black`}>
                {/* <p className={` ${msg.type === "user" ? "text-right" : "ai_reponse leading-[1.8em]"}`}>
                  {msg.text}
                </p> */}
                  <p className={`${msg.type === "user" ? "text-right" : "ai_response leading-[1.8em]"}`}>
                  {msg.loading ? <ChatLoader /> : msg.text}
                </p>
                
              </div>
            </div>
          </div>
        </div>
      ))}
       
                               
      

        {/* Input and Send Button */}
        <div className=" flex flex-col items-center justify-center py-6 fixing_bottom">
          <div className="flex flex-col sm:flex-row items-center w-[90%] max-w-[900px] space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              style={{ height: '60px', minHeight: '60px', background: '#fff' }}
              type="text"
              placeholder="Type your message"
              value={userMessage}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              
              className="flex-1 h-[60px] rounded-full border border-gray-200 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A5AE0] w-full sm:w-auto"
            />
            <button
            
              onClick={handleSendMessage}
              className="w-full sm:w-[192px] h-[54px] bg-gradient-to-r from-[#4A25E1] to-[#7B5AFF] rounded-full text-white font-semibold shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)] hover:opacity-90 transition"
            >
              Submit
            </button>
          </div>
          <div className="easy-option-prompts px-11 flex justify-start">
            <span className="flex items-center gap-2 w-[auto] prompt_option">    <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 256 256"
             focusable="false"
             style={{
               userSelect: "none",
               width: "16",
               height: "16",
               display: "inline-block",
               fill: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
               color: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
               flexShrink: 0,
             }}
           >
             <g
               color="var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))"
               weight="light"
             >
               <path d="M123.76,108.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48l-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48ZM128,32.49,159.51,64,128,95.51,96.49,64Zm4.24,115.27a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48ZM128,223.51,96.49,192,128,160.49,159.51,192Zm108.24-99.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,236.24,123.76ZM192,159.51,160.49,128,192,96.49,223.51,128Zm-83.76-35.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,108.24,123.76ZM64,159.51,32.49,128,64,96.49,95.51,128Z"></path>
             </g>
           </svg><p>what are trialz</p></span>
           <span className="flex items-center gap-2 w-[auto] prompt_option">    <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 256 256"
             focusable="false"
             style={{
               userSelect: "none",
               width: "16",
               height: "16",
               display: "inline-block",
               fill: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
               color: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
               flexShrink: 0,
             }}
           >
             <g
               color="var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))"
               weight="light"
             >
               <path d="M123.76,108.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48l-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48ZM128,32.49,159.51,64,128,95.51,96.49,64Zm4.24,115.27a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48ZM128,223.51,96.49,192,128,160.49,159.51,192Zm108.24-99.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,236.24,123.76ZM192,159.51,160.49,128,192,96.49,223.51,128Zm-83.76-35.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,108.24,123.76ZM64,159.51,32.49,128,64,96.49,95.51,128Z"></path>
             </g>
           </svg><p>what are trialz</p></span>
           <span className="flex items-center gap-2 w-[auto] prompt_option">    <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 256 256"
             focusable="false"
             style={{
               userSelect: "none",
               width: "16",
               height: "16",
               display: "inline-block",
               fill: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
               color: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
               flexShrink: 0,
             }}
           >
             <g
               color="var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))"
               weight="light"
             >
               <path d="M123.76,108.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48l-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48ZM128,32.49,159.51,64,128,95.51,96.49,64Zm4.24,115.27a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48ZM128,223.51,96.49,192,128,160.49,159.51,192Zm108.24-99.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,236.24,123.76ZM192,159.51,160.49,128,192,96.49,223.51,128Zm-83.76-35.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,108.24,123.76ZM64,159.51,32.49,128,64,96.49,95.51,128Z"></path>
             </g>
           </svg><p>what are trialz</p></span>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ChatUIUserResultLayout;

// <div ref={chatContainerRef} className="inner_chat_body p-4 sm:p-6 flex flex-col items-center">
// {messages.map((msg, index) => (
//   <div key={index} className={`intercom-13kg6np ekd1qb42 flex ${msg.type === "user" ? "justify-end self-end" : "justify-start self-start"}`}>
//     <div className="intercom-comment intercom-18ciyg5 ekd1qb41">
//       <div className={`intercom-avtrru e1jqii293 ${msg.type === "user" ? "justify-end" : ""}`}>
//         <div className={`intercom-hiupyl e1jqii290 ${msg.type === "user" ? "justify-end" : ""}`}>
//           <div size="20" shape="squircle" className="intercom-3xwhyz e2rn66r0">
//             <img 
//               src={msg.type === "user" ? "/chat user img.png" : "/favicon.ico"} 
//               alt={`Profile image for ${msg.type === "user" ? "You" : "AI"}`} 
//               className="w-8 h-8 rounded-full"
//             />
//           </div>
//         </div>
//         <span className={`intercom-11cvbht e1jqii292`}>
//           {msg.type === "user" ? "You" : "AI"}
//         </span>
//       </div>
//       <div tabIndex="-1" className={`intercom-18ztwyf er4a1r20 ${msg.type === "user" ? "flex justify-end " : ""}`}>
//         <div className={`intercom-block-paragraph e16pl8n50 intercom-ks2cl1 p-2 rounded-lg max-w-[75%] text-black`}>
//           <p className={` ${msg.type === "user" ? "text-right" : "ai_reponse leading-[1.8em]"}`}>
//             {msg.text}
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// ))}
 
                         


//   {/* Input and Send Button */}
//   <div className=" flex flex-col items-center justify-center py-6 fixing_bottom">
//     <div className="flex flex-col sm:flex-row items-center w-[90%] max-w-[900px] space-y-4 sm:space-y-0 sm:space-x-4">
//       <input
//         style={{ height: '60px', minHeight: '60px', background: '#fff' }}
//         type="text"
//         placeholder="Type your message"
//         value={userMessage}
//         onChange={handleInputChange}
//         onKeyDown={(e) => {
//           if (e.key === 'Enter') {
//             e.preventDefault();
//             handleSendMessage();
//           }
//         }}
        
//         className="flex-1 h-[60px] rounded-full border border-gray-200 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#6A5AE0] w-full sm:w-auto"
//       />
//       <button
      
//         onClick={handleSendMessage}
//         className="w-full sm:w-[192px] h-[54px] bg-gradient-to-r from-[#4A25E1] to-[#7B5AFF] rounded-full text-white font-semibold shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)] hover:opacity-90 transition"
//       >
//         Submit
//       </button>
//     </div>
//     <div className="easy-option-prompts px-11 flex justify-start">
//       <span className="flex items-center gap-2 w-[auto] prompt_option">    <svg
//        xmlns="http://www.w3.org/2000/svg"
//        viewBox="0 0 256 256"
//        focusable="false"
//        style={{
//          userSelect: "none",
//          width: "16",
//          height: "16",
//          display: "inline-block",
//          fill: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
//          color: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
//          flexShrink: 0,
//        }}
//      >
//        <g
//          color="var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))"
//          weight="light"
//        >
//          <path d="M123.76,108.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48l-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48ZM128,32.49,159.51,64,128,95.51,96.49,64Zm4.24,115.27a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48ZM128,223.51,96.49,192,128,160.49,159.51,192Zm108.24-99.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,236.24,123.76ZM192,159.51,160.49,128,192,96.49,223.51,128Zm-83.76-35.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,108.24,123.76ZM64,159.51,32.49,128,64,96.49,95.51,128Z"></path>
//        </g>
//      </svg><p>what are trialz</p></span>
//      <span className="flex items-center gap-2 w-[auto] prompt_option">    <svg
//        xmlns="http://www.w3.org/2000/svg"
//        viewBox="0 0 256 256"
//        focusable="false"
//        style={{
//          userSelect: "none",
//          width: "16",
//          height: "16",
//          display: "inline-block",
//          fill: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
//          color: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
//          flexShrink: 0,
//        }}
//      >
//        <g
//          color="var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))"
//          weight="light"
//        >
//          <path d="M123.76,108.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48l-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48ZM128,32.49,159.51,64,128,95.51,96.49,64Zm4.24,115.27a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48ZM128,223.51,96.49,192,128,160.49,159.51,192Zm108.24-99.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,236.24,123.76ZM192,159.51,160.49,128,192,96.49,223.51,128Zm-83.76-35.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,108.24,123.76ZM64,159.51,32.49,128,64,96.49,95.51,128Z"></path>
//        </g>
//      </svg><p>what are trialz</p></span>
//      <span className="flex items-center gap-2 w-[auto] prompt_option">    <svg
//        xmlns="http://www.w3.org/2000/svg"
//        viewBox="0 0 256 256"
//        focusable="false"
//        style={{
//          userSelect: "none",
//          width: "16",
//          height: "16",
//          display: "inline-block",
//          fill: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
//          color: "var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))",
//          flexShrink: 0,
//        }}
//      >
//        <g
//          color="var(--token-f13593df-dadd-4c3b-9fbc-02d9fbe98bf9, rgb(0, 0, 0))"
//          weight="light"
//        >
//          <path d="M123.76,108.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48l-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48ZM128,32.49,159.51,64,128,95.51,96.49,64Zm4.24,115.27a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0,0-8.48ZM128,223.51,96.49,192,128,160.49,159.51,192Zm108.24-99.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,236.24,123.76ZM192,159.51,160.49,128,192,96.49,223.51,128Zm-83.76-35.75-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,0,8.48l40,40a6,6,0,0,0,8.48,0l40-40A6,6,0,0,0,108.24,123.76ZM64,159.51,32.49,128,64,96.49,95.51,128Z"></path>
//        </g>
//      </svg><p>what are trialz</p></span>
//     </div>
   
//   </div>
// </div>

//   const handleSendMessage = async () => {
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  
//     if (!backendUrl) {
//       alert("Something went wrong, check back later.");
//       return;
//     }
  
//     if (userMessage.trim() !== "") {
//       const newUserMessage = { text: userMessage, type: "user" };
//       setMessages((prevMessages) => [...prevMessages, newUserMessage]);
  
//       try {
//         const query = userMessage.trim(); // Define query here
//         const response = await axios.get(`${backendUrl}/ai?query=${encodeURIComponent(query)}`, {
//           headers: {
//             accept: "application/json",
//           },
//         });
  
//         console.log("AI Response:", response.data);
//         setAiResponse(response.data);
  
//         const aiMessage = { text: response.data.response || "No response from AI", type: "ai" };
//         setMessages((prevMessages) => [...prevMessages, aiMessage]);
  
//         startTypingEffect(`AI Response to: "${response.data.response || "No response"}"`);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         const errorMessage = { text: "AI is not responding. Please try again.", type: "ai" };
//         setMessages((prevMessages) => [...prevMessages, errorMessage]);
//       }
  
//       setUserMessage(""); 
//     }
//   };