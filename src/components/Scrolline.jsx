import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/styles/Scrollline.scss";

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Scrollline({ maxProgress = 100 }) {
    const progressRef = useRef(null);
    const sectionRef = useRef(null);
 

    useEffect(() => {
        const progressBar = progressRef.current;
        const section = sectionRef.current;

        if (!progressBar || !section) return;

        // Функция инициализации ScrollTrigger
        const initScrollTrigger = () => {
            // Устанавливаем начальное состояние
            gsap.set(progressBar, { width: "0%" });

            // Обновляем ScrollTrigger перед созданием нового
            ScrollTrigger.refresh();

            // Создаем ScrollTrigger анимацию
            const scrollTrigger = ScrollTrigger.create({
                trigger: section,
                start: "top bottom", // Начинаем когда верх секции касается низа viewport
                end: "bottom top",   // Заканчиваем когда низ секции касается верха viewport
                scrub: 1, // Плавная анимация привязанная к скроллу
                onUpdate: (self) => {
                    // Анимируем от 0% до 100% в зависимости от прогресса
                    const progress = self.progress * 100;
                    gsap.to(progressBar, {
                        width: `${progress}%`,
                        duration: 0.1,
                        ease: "none"
                    });
                },
                onEnter: () => {
              
                },
                onLeave: () => {
                    
                },
                onEnterBack: () => {
               
                },
                onLeaveBack: () => {
                    
                },
                markers: false
            });

            return scrollTrigger;
        };

        let scrollTriggerInstance = null;

        // Проверяем состояние загрузки страницы
        if (document.readyState === 'complete') {
            // Страница уже загружена
            setTimeout(() => {
                scrollTriggerInstance = initScrollTrigger();
            }, 100); // Небольшая задержка для стабильности
        } else {
            // Ждем полной загрузки страницы
            const handleLoad = () => {
                setTimeout(() => {
                    scrollTriggerInstance = initScrollTrigger();
                }, 100);
            };

            window.addEventListener('load', handleLoad);

            // Очистка слушателя если компонент размонтируется до загрузки
            return () => {
                window.removeEventListener('load', handleLoad);
            };
        }

        // Очистка при размонтировании
        return () => {
            if (scrollTriggerInstance) {
                scrollTriggerInstance.kill();
            }
            ScrollTrigger.refresh();
        };
    }, [maxProgress]);

    return (
        <>
            <section className="loading_line" ref={sectionRef}>
                <div className="container">
                    <div className="row">
                        <div className="scroll_inner">
                            <div className="scroll_bar">
                                <div
                                    className="scroll_progress"
                                    ref={progressRef}
                                    style={{ width: '0%' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}