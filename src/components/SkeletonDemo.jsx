import React, { useState } from 'react';
import Slide from './Slide';
import Page_big_banner from './Page_big_banner';
import Page_small_banner from './Page_small_banner';
import SkeletonSlide from './SkeletonSlide';
import SkeletonPageBigBanner from './SkeletonPageBigBanner';
import SkeletonPageSmallBanner from './SkeletonPageSmallBanner';

/**
 * Демонстрационный компонент для тестирования skeleton loading
 * Показывает все типы баннеров и их skeleton версии
 */
export default function SkeletonDemo() {
  const [showSkeletons, setShowSkeletons] = useState(false);

  const toggleSkeletons = () => {
    setShowSkeletons(!showSkeletons);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        position: 'fixed', 
        top: '20px', 
        right: '20px', 
        zIndex: 9999,
        background: '#fff',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={toggleSkeletons}
          style={{
            padding: '8px 16px',
            backgroundColor: showSkeletons ? '#ef4444' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showSkeletons ? 'Показать контент' : 'Показать Skeleton'}
        </button>
      </div>

      <h2>Skeleton Loading Demo</h2>
      
      {/* Главный слайд */}
      <section style={{ marginBottom: '40px' }}>
        <h3>1. Главный слайд (Slide)</h3>
        {showSkeletons ? (
          <SkeletonSlide />
        ) : (
          <Slide />
        )}
      </section>

      {/* Большой баннер */}
      <section style={{ marginBottom: '40px' }}>
        <h3>2. Большой баннер (Page Big Banner)</h3>
        {showSkeletons ? (
          <SkeletonPageBigBanner />
        ) : (
          <Page_big_banner 
            title="Большой заголовок страницы"
            subtitle="Подзаголовок для большого баннера"
            bannerImageSrc="/bg_block.webp"
          />
        )}
      </section>

      {/* Маленький баннер */}
      <section style={{ marginBottom: '40px' }}>
        <h3>3. Маленький баннер (Page Small Banner)</h3>
        {showSkeletons ? (
          <SkeletonPageSmallBanner />
        ) : (
          <Page_small_banner 
            title="Заголовок страницы"
            subtitle="Подзаголовок для маленького баннера"
            bannerImageSrc="/bg_block.webp"
          />
        )}
      </section>

      <div style={{ 
        padding: '20px', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        marginTop: '40px'
      }}>
        <h4>Инструкции по тестированию:</h4>
        <ul>
          <li>Нажмите кнопку выше для переключения между skeleton и реальным контентом</li>
          <li>Откройте Developer Tools → Network → поставьте "Slow 3G" для имитации медленного соединения</li>
          <li>Обновите страницу, чтобы увидеть skeleton loading в действии</li>
          <li>Каждый тип баннера имеет свои настройки времени и размеров</li>
        </ul>
      </div>
    </div>
  );
}