import React, { useState, useRef, useEffect } from 'react';


/**
 * Упрощенный компонент изображений с lazy loading
 * @param {Object} props - Свойства компонента
 * @param {string} props.src - Путь к изображению
 * @param {string} props.alt - Alt текст
 * @param {boolean} props.lazy - Включить lazy loading (по умолчанию true)
 * @param {Object} rest - Остальные props передаются напрямую в img тег
 */
const OptimizedImage = ({
  src,
  alt = '',
  lazy = true,
  ...rest
}) => {
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef(null);

  // Intersection Observer для lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px', // Загружаем за 50px до появления
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Если изображение еще не в зоне видимости, показываем пустой div
  if (!isInView) {
    return <div ref={imgRef} {...rest} />;
  }

  // Возвращаем обычный img тег со всеми переданными props
  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
      {...rest}
    />
  );
};

export default OptimizedImage;