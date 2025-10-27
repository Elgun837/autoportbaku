import React, { lazy, Suspense } from 'react'

// Lazy load React Image Gallery
const ImageGallery = lazy(() => import('react-image-gallery'))

// Простой fallback для галереи
const GalleryFallback = ({ items = [] }) => (
  <div className="gallery-fallback">
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '16px',
      padding: '16px'
    }}>
      {items.slice(0, 6).map((item, index) => (
        <div key={index} style={{ 
          aspectRatio: '16/9', 
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={item.thumbnail || item.original} 
            alt={item.originalAlt || `Image ${index + 1}`}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
)

// Обертка для lazy React Image Gallery
const LazyImageGallery = ({ items, fallback, ...props }) => (
  <Suspense fallback={fallback || <GalleryFallback items={items} />}>
    <ImageGallery items={items} {...props} />
  </Suspense>
)

export default LazyImageGallery