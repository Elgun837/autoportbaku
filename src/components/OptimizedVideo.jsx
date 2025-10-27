import React, { useState, useRef, useEffect } from 'react';

/**
 * Оптимизированный компонент видео с lazy loading и современными форматами
 * @param {Object} props - Свойства компонента
 * @param {string} props.src - Путь к видео
 * @param {string} props.poster - Постер для видео
 * @param {string} props.className - CSS классы
 * @param {number} props.width - Ширина видео
 * @param {number} props.height - Высота видео
 * @param {boolean} props.lazy - Включить lazy loading (по умолчанию true)
 * @param {boolean} props.autoPlay - Автовоспроизведение (по умолчанию false)
 * @param {boolean} props.muted - Без звука (по умолчанию true для autoplay)
 * @param {boolean} props.loop - Зацикливание (по умолчанию false)
 * @param {boolean} props.controls - Показать контролы (по умолчанию false)
 */
const OptimizedVideo = ({
  src,
  poster,
  className = '',
  width,
  height,
  lazy = true,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false,
  style = {},
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const videoRef = useRef(null);

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
        rootMargin: '100px 0px', // Загружаем за 100px до появления
        threshold: 0.1
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Обработчики загрузки
  const handleLoadedData = () => {
    setIsLoaded(true);
    setError(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  // Стили для placeholder
  const placeholderStyle = {
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '16px',
    transition: 'opacity 0.3s ease',
    width: width || '100%',
    height: height || 'auto',
    minHeight: height ? `${height}px` : '300px',
    ...style
  };

  // Стили для видео
  const videoStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.5s ease',
    width: width || '100%',
    height: height || 'auto',
    objectFit: 'cover',
    ...style
  };

  if (!isInView) {
    return (
      <div 
        ref={videoRef}
        className={className}
        style={placeholderStyle}
        {...rest}
      >
        {poster ? (
          <img 
            src={poster} 
            alt="Video poster" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' 
            }} 
          />
        ) : (
          '▶ Загрузка видео...'
        )}
      </div>
    );
  }

  return (
    <div ref={videoRef} className={className} style={{ position: 'relative', ...style }}>
      {/* Placeholder пока видео загружается */}
      {!isLoaded && (
        <div style={{
          ...placeholderStyle,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}>
          {poster ? (
            <img 
              src={poster} 
              alt="Video poster" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          ) : (
            '▶ Загрузка видео...'
          )}
        </div>
      )}
      
      {/* Основное видео */}
      <video
        width={width}
        height={height}
        style={videoStyle}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        poster={poster}
        onLoadedData={handleLoadedData}
        onError={handleError}
        preload={lazy ? "none" : "metadata"}
        playsInline
        {...rest}
      >
        {/* Поддержка современных форматов */}
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        <source src={src} type="video/mp4" />
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
      
      {/* Fallback для ошибок */}
      {error && (
        <div style={{
          ...placeholderStyle,
          color: '#ff6b6b',
          backgroundColor: '#333'
        }}>
          ❌ Ошибка загрузки видео
        </div>
      )}
    </div>
  );
};

export default OptimizedVideo;