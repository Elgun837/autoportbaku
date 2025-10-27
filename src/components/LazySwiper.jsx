import React, { lazy, Suspense } from 'react'

// Lazy load Swiper только когда он действительно нужен
const SwiperComponent = lazy(() => import('swiper/react').then(module => ({
  default: module.Swiper
})))

const SwiperSlide = lazy(() => import('swiper/react').then(module => ({
  default: module.SwiperSlide
})))

// Простой fallback компонент
const SwiperFallback = ({ children, ...props }) => (
  <div className="swiper-fallback" {...props}>
    <div style={{ display: 'flex', overflowX: 'auto', gap: '16px' }}>
      {children}
    </div>
  </div>
)

const SlideFallback = ({ children, ...props }) => (
  <div className="swiper-slide-fallback" {...props} style={{ minWidth: '300px', flexShrink: 0 }}>
    {children}
  </div>
)

// Обертка для lazy Swiper
export const LazySwiper = ({ children, fallback, ...props }) => (
  <Suspense fallback={fallback || <SwiperFallback {...props}>{children}</SwiperFallback>}>
    <SwiperComponent {...props}>
      {children}
    </SwiperComponent>
  </Suspense>
)

// Обертка для lazy SwiperSlide
export const LazySwiperSlide = ({ children, fallback, ...props }) => (
  <Suspense fallback={fallback || <SlideFallback {...props}>{children}</SlideFallback>}>
    <SwiperSlide {...props}>
      {children}
    </SwiperSlide>
  </Suspense>
)

export default LazySwiper