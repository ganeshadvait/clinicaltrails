"use client";
import React, { useState } from "react";

import './fastyles.css';

export default function Faqs() {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I find a clinical trial that’s right for me?",
      answer: "Use our search tool to filter trials by condition, location, age, and study type. You can also answer a quick pre-screening to check your eligibility."
    },
    {
      question: "What are the benefits of joining a clinical trial?",
      answer: "You may gain early access to new treatments, contribute to medical research, and sometimes receive compensation for your time and travel."
    },
    {
      question: "Are clinical trials safe?",
      answer: "All trials follow strict ethical and regulatory guidelines. Risks and safeguards are explained upfront in the informed consent process."
    },
    {
      question: "Can I leave a trial after joining?",
      answer: "Yes, participation is always voluntary, and you can withdraw at any time."
    },
    {
      question: "Will I be paid for participating?",
      answer: "Some trials offer compensation, while others focus on providing treatment access. Always check the 'Compensation' details."
    },
    {
      question: "How do I know if I qualify?",
      answer: "Each trial has clear eligibility criteria (such as health status, age, etc.). Pre-screening questions help you check your fit before applying."
    },
    {
      question: "How do I list my site on your platform?",
      answer: "Register as a Site Partner, complete the verification process, and showcase your capabilities to attract sponsors and participants."
    },
    {
      question: "How do you ensure participant quality?",
      answer: "Our pre-screening tools and eligibility checks reduce no-shows and improve enrollment rates."
    },
    {
      question: "How can your platform accelerate our trial timeline?",
      answer: "We connect you with pre-qualified sites and participants, reducing startup delays by up to 30%."
    },
    {
      question: "Do you help with trial design or protocol advice?",
      answer: "Yes! We provide recruitment feasibility insights and protocol optimization tips based on past trial data."
    },
    {
      question: "What if the experimental treatment doesn’t work or has side effects?",
      answer: "You’ll be monitored closely, and standard care is provided if complications arise. You can leave the trial at any time."
    },
    {
      question: "Do you help with regulatory/IRB documentation?",
      answer: "Yes! We provide templates, checklists, and compliance guidance to speed up approvals."
    },
    {
      question: "What makes your recruitment model faster?",
      answer: "We combine a global volunteer database with SEO-optimized trial listings, so eligible patients can find your study organically."
    }
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
