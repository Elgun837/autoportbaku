import React, { useState, useRef, useEffect, useMemo } from 'react';

/**
 * Продвинутый компонент изображений с оптимизацией производительности
 * @param {Object} props - Свойства компонента
 * @param {string} props.src - Путь к изображению
 * @param {string} props.alt - Alt текст
 * @param {boolean} props.lazy - Включить lazy loading (по умолчанию true)
 * @param {boolean} props.responsive - Responsive изображения (по умолчанию true)
 * @param {Array} props.sizes - Массив размеров для responsive изображений
 * @param {string} props.placeholder - Цвет или изображение placeholder
 * @param {boolean} props.blur - Blur эффект при загрузке
 * @param {Function} props.onLoad - Callback при загрузке изображения
 * @param {Function} props.onError - Callback при ошибке загрузки
 * @param {number} props.quality - Качество изображения (для WebP)
 * @param {Object} rest - Остальные props передаются напрямую в img тег
 */
const OptimizedImage = ({
  src,
  alt = '',
  lazy = true,
  responsive = false,
  sizes = [400, 800, 1200, 1600],
  placeholder = '#f0f0f0',
  blur = true,
  onLoad,
  onError,
  quality = 80,
  ...rest
}) => {
  const [isInView, setIsInView] = useState(!lazy);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Генерируем WebP и fallback источники
  const imageSources = useMemo(() => {
    if (!src) return { webp: '', fallback: src };
    
    const basePath = src.replace(/\.[^/.]+$/, ''); // Убираем расширение
    const ext = src.split('.').pop()?.toLowerCase();
    
    // Если уже WebP, используем как есть
    if (ext === 'webp') {
      return { webp: src, fallback: src };
    }
    
    // Генерируем WebP версию
    const webpSrc = `${basePath}.webp`;
    
    return { webp: webpSrc, fallback: src };
  }, [src]);

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
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Обработчики загрузки
  const handleLoad = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError = (event) => {
    setHasError(true);
    onError?.(event);
  };

  // Стили для container
  const containerStyle = {
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: placeholder,
    ...rest.style
  };

  // Стили для изображения
  const imageStyle = {
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 1 : 0,
    filter: (!isLoaded && blur) ? 'blur(4px)' : 'none',
    width: '100%',
    height: 'auto'
  };

  // Если не в области видимости и lazy loading включен
  if (!isInView) {
    return (
      <div 
        ref={imgRef} 
        style={containerStyle}
        {...rest}
        aria-label={alt}
      />
    );
  }

  // При ошибке загрузки
  if (hasError) {
    return (
      <div 
        style={{
          ...containerStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '14px'
        }}
        {...rest}
      >
        Изображение недоступно
      </div>
    );
  }

  // Простая версия без picture element (для совместимости)
  return (
    <div style={containerStyle}>
      <img
        ref={imgRef}
        src={imageSources.webp || imageSources.fallback}
        alt={alt}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        {...rest}
      />
      
      {/* Placeholder/skeleton пока загружается */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, ${placeholder} 0%, #e0e0e0 50%, ${placeholder} 100%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;