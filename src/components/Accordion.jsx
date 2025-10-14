import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/Accordion.scss";

export default function Accordion({ items }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const contentRefs = useRef([]);

  

    // Проверяем, есть ли элементы
    if (!items || !Array.isArray(items) || items.length === 0) {
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
    useEffect(() => {
        if (activeIndex !== null && contentRefs.current[activeIndex]) {
            const element = contentRefs.current[activeIndex];
            // Небольшая задержка для корректного расчета
            setTimeout(() => {
                element.style.maxHeight = `${element.scrollHeight}px`;
            }, 10);
        }
    }, [activeIndex]);

    return (
        <div className="accordion">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`accordion_item ${activeIndex === index ? 'active' : ''}`}
                >
                    <div
                        className="accordion_header"
                        onClick={() => toggleAccordion(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleAccordion(index);
                            }
                        }}
                        aria-expanded={activeIndex === index}
                        aria-controls={`accordion-content-${index}`}
                    >
                        <h6 className="accordion_title">{item.question}</h6>
                        <div className="accordion_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none"
                                className={`chevron ${activeIndex === index ? 'rotated' : ''}`}>
                                <path d="M1.54632 7.21729H6.14174V11.8127C6.14174 12.2798 6.52595 12.6715 7.00056 12.6715C7.47517 12.6715 7.85937 12.2798 7.85937 11.8127V7.21729H12.4548C12.9219 7.21729 13.3136 6.83308 13.3136 6.35847C13.3136 5.88386 12.9219 5.49965 12.4548 5.49965H7.85937V0.904227C7.85937 0.437151 7.47517 0.0454102 7.00056 0.0454102C6.52595 0.0454102 6.14174 0.437151 6.14174 0.904227V5.49965H1.54632C1.07924 5.49965 0.6875 5.88386 0.6875 6.35847C0.6875 6.83308 1.07924 7.21729 1.54632 7.21729Z" fill="black" />
                            </svg>
                        </div>
                    </div>
                    <div
                        id={`accordion-content-${index}`}
                        className={`accordion_content ${activeIndex === index ? 'active' : ''}`}
                        ref={el => contentRefs.current[index] = el}
                        style={{
                            maxHeight: activeIndex === index 
                                ? `${contentRefs.current[index]?.scrollHeight || 0}px` 
                                : '0px',
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