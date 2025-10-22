import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/Accordion.scss";
import { getFaqsData } from "../api/index";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "../context/LanguageContext";

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);
  useEffect(() => {
    if (activeIndex !== null && contentRefs.current[activeIndex]) {
      const element = contentRefs.current[activeIndex];
      // Небольшая задержка для корректного расчета
      setTimeout(() => {
        element.style.maxHeight = `${element.scrollHeight}px`;
      }, 10);
    }
  }, [activeIndex]);
  const { lang } = useLanguage();

  const { data, isLoading, error } = useQuery({    
    queryKey: ["faqs", lang],
    queryFn: () => getFaqsData(lang),    
   });
  //  console.log("Fetched FAQs:", data);


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading FAQs 😢</p>;

  // API cavabı birbaşa array-dir
  const faqs = Array.isArray(data) ? data : [];

  if (faqs.length === 0) {
    return (
      <div className="accordion">
        <p>No FAQ items available</p>
      </div>
    );
  }

  // Проверяем, есть ли элементы
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return (
      <div className="accordion">
        <p>No FAQ items available</p>
      </div>
    );
  }

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Пересчитываем высоту при изменении активного элемента

  return (
    <div className="accordion">
      {faqs.map((item, index) => (
        <div
          key={index}
          className={`accordion_item ${activeIndex === index ? "active" : ""}`}
        >
          <div
            className="accordion_header"
            onClick={() => toggleAccordion(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleAccordion(index);
              }
            }}
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-content-${index}`}
          >
            <h6 className="accordion_title">{item.question}</h6>
            <div className="accordion_icon">
              <svg className={`chevron ${activeIndex === index ? "rotated" : ""}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L12.354 20.354L12 20.707L11.646 20.354L12 20ZM11.5 5.00003C11.5 4.86742 11.5527 4.74024 11.6465 4.64648C11.7402 4.55271 11.8674 4.50003 12 4.50003C12.1326 4.50003 12.2598 4.55271 12.3536 4.64648C12.4473 4.74024 12.5 4.86742 12.5 5.00003H11.5ZM18.354 14.354L12.354 20.354L11.646 19.646L17.646 13.646L18.354 14.354ZM11.646 20.354L5.646 14.354L6.354 13.646L12.354 19.646L11.646 20.354ZM11.5 20L11.5 5.00003H12.5L12.5 20H11.5Z" fill="black" />
              </svg>
            </div>
          </div>
          <div
            id={`accordion-content-${index}`}
            className={`accordion_content ${activeIndex === index ? "active" : ""
              }`}
            ref={(el) => (contentRefs.current[index] = el)}
            style={{
              maxHeight:
                activeIndex === index
                  ? `${contentRefs.current[index]?.scrollHeight || 0}px`
                  : "0px",
            }}
          >
            <div className="accordion_body">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
