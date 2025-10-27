import React, { useState, useRef, useEffect, useMemo } from 'react';

// Добавляем CSS стили для shimmer анимации и спиннера
const shimmerCSS = `
  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .image-spinner {
    width: 10px;
    height: 10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
`;

// Инжектируем стили только один раз
if (typeof document !== 'undefined' && !document.querySelector('#shimmer-styles')) {
  const style = document.createElement('style');
  style.id = 'shimmer-styles';
  style.textContent = shimmerCSS;
  document.head.appendChild(style);
}

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
    
    // Исключаем SVG из конвертации в WebP
    if (ext === 'svg') {
      return { webp: '', fallback: src };
    }
    
    // Генерируем WebP версию только для растровых изображений
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
    
    // Отладочная информация в консоли
    console.error('🖼️ OptimizedImage: Ошибка загрузки изображения', {
      'Исходный src': src,
      'WebP путь': imageSources.webp,
      'Fallback путь': imageSources.fallback,
      'Alt текст': alt,
      'Событие ошибки': event
    });
    
    onError?.(event);
  };

  // Стили для container (только для загрузки и ошибок)
  const containerStyle = {
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent', // Убираем серый фон
    ...rest.style
  };

  // Стили для изображения при загрузке
  const loadingImageStyle = {
    opacity: isLoaded ? 1 : 0,
    filter: (!isLoaded && blur) ? 'blur(4px)' : 'none',
    transition: 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out'
  };

  // Если не в области видимости и lazy loading включен
  if (!isInView) {
    return (
      <div 
        ref={imgRef} 
        style={{
          ...containerStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(248, 248, 248, 0.02)',
          minHeight: '100px',
        }}
        {...rest}
        aria-label={alt}
      >
        <div className="image-spinner" />
      </div>
    );
  }

  // При ошибке загрузки - показываем обычный img тег с broken image иконкой
  // Это позволяет видеть путь в DevTools и отлаживать проблемы
  if (hasError) {
    return (
      <img
        ref={imgRef}
        src={imageSources.webp || imageSources.fallback}
        alt={`❌ ОШИБКА ЗАГРУЗКИ: ${alt || 'изображение'} | Путь: ${imageSources.webp || imageSources.fallback}`}
        title={`Не удалось загрузить: ${imageSources.webp || imageSources.fallback}`}
        onError={handleError}
        style={{
         
        }}
        {...rest}
      />
    );
  }

  // Простая версия - при успешной загрузке возвращаем только img без контейнера
  if (isLoaded && !hasError) {
    return (
      <img
        ref={imgRef}
        src={imageSources.webp || imageSources.fallback}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        {...rest}
      />
    );
  }

  // Во время загрузки или при ошибке используем контейнер
  return (
    <div style={containerStyle}>
      <img
        ref={imgRef}
        src={imageSources.webp || imageSources.fallback}
        alt={alt}
        style={loadingImageStyle}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        {...rest}
      />
      
      {/* Крутящийся прелоадер пока загружается */}
      {!isLoaded && !hasError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(248, 248, 248, 0.02)',
            backdropFilter: 'blur(2px)',
          }}
        >
          <div className="image-spinner" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;