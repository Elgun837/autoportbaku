import React, { useEffect, useRef, useId } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/styles/Scrollline.scss";

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Scrollline({ maxProgress = 50 }) {
    const progressRef = useRef(null);
    const sectionRef = useRef(null);
    const scrollTriggerRef = useRef(null);
    const uniqueId = useId(); // Уникальный ID для каждого экземпляра
 

    useEffect(() => {
        const progressBar = progressRef.current;
        const section = sectionRef.current;

        if (!progressBar || !section) return;

        // Очищаем предыдущие ScrollTriggers при hot reload
        ScrollTrigger.refresh();

        // Создаем уникальную анимацию прогресс-бара для каждого экземпляра
        const scrollTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top bottom-=150px", // Начинаем когда секция почти появляется
            end: "bottom top+100px",     // Заканчиваем когда секция почти исчезает
            scrub: 0.5,
            id: `scrollline-${uniqueId}`, // Уникальный ID
            onUpdate: (self) => {
                // Рассчитываем прогресс от 0% до maxProgress (по умолчанию 50%)
                const progress = Math.min(self.progress * maxProgress, maxProgress);
                gsap.to(progressBar, {
                    width: `${progress}%`,
                    duration: 0.3,
                    ease: "power2.out"
                });
            },
            onEnter: () => {
                // Начальная анимация появления
                gsap.fromTo(progressBar,
                    { width: '0%' },
                    { width: '0%', duration: 0.1 }
                );
            },
            onLeave: () => {
                // Когда элемент покидает область видимости
                gsap.to(progressBar, {
                    width: `${maxProgress}%`,
                    duration: 0.3,
                    ease: "power2.out"
                });
            },
            markers: false // Установите true для отладки
        });

        // Сохраняем ссылку на ScrollTrigger
        scrollTriggerRef.current = scrollTrigger;

        // Очистка при размонтировании - убиваем только этот конкретный trigger
        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            // Обновляем ScrollTrigger после изменений
            ScrollTrigger.refresh();
        };
    }, [maxProgress, uniqueId]);

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