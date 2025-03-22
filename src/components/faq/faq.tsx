"use client";
import React, { useState } from "react";

import './fastyles.css';

export default function Faqs() {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, expedita incidunt fuga vitae sit eligendi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, expedita incidunt fuga vitae sit eligendi!" },
    { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?", answer: "Dignissimos commodi magni eveniet officia maiores rem neque corrupti recusandae fugit, quis, ad alias quisquam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, expedita incidunt fuga vitae sit eligendi!" },
    { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
       answer: "Recusandae fugit, quis, ad alias quisquam? Error, expedita incidunt fuga vitae sit eligendi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, expedita incidunt fuga vitae sit eligendi!" },
       { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
        answer: "Recusandae fugit, quis, ad alias quisquam? Error, expedita incidunt fuga vitae sit eligendi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, expedita incidunt fuga vitae sit eligendi!" },
        { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
          answer: "Recusandae fugit, quis, ad alias quisquam? Error, expedita incidunt fuga vitae sit eligendi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, expedita incidunt fuga vitae sit eligendi!" },
          { question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
            answer: "Recusandae fugit, quis, ad alias quisquam? Error, expedita incidunt fuga vitae sit eligendi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, expedita incidunt fuga vitae sit eligendi!" }
  ];

  return (
    <section className="faqs_section" >
   
        <>
          <h2 className="text-[#252B61] mt-4 mb-8 text-center faq_title">
            FAQ’s (Frequently Asked Questions)
          </h2>
          <div className={`faq_wrapper inner_section "fade-in" : "opacity-0"}`}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`accordion ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleAccordion(index)}
              >
                {/* Accordion Header */}
                <div className="accordion_head">
                  <span>{faq.question}</span>
                  <p className={`icon ${activeIndex === index ? "rotate" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path stroke="currentColor" d="M13.5 5.5 8 11 2.5 5.5" />
                    </svg>
                  </p>
                </div>

                {/* Accordion Content */}
                <div
                  className="accordion_content"
                  style={{
                    maxHeight: activeIndex === index ? "200px" : "0px",
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? "translateY(0)" : "translateY(-10px)",
                  }}
                >
                  <p className="faq_answer">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      
    </section>
  );
}
