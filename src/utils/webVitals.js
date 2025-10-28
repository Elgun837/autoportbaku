import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

// Функция для отправки метрик (можно интегрировать с аналитикой)
function sendToAnalytics(metric) {
  // console.log('📊 Web Vital:', metric)
  
  // Здесь можно отправить данные в Google Analytics, Sentry или другой сервис
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      non_interaction: true,
    })
  }
}

// Инициализация мониторинга Web Vitals
export function initWebVitals() {
  // Core Web Vitals
  onCLS(sendToAnalytics)  // Cumulative Layout Shift
  onINP(sendToAnalytics)  // Interaction to Next Paint (заменил FID)
  onLCP(sendToAnalytics)  // Largest Contentful Paint
  
  // Дополнительные метрики
  onFCP(sendToAnalytics)  // First Contentful Paint
  onTTFB(sendToAnalytics) // Time to First Byte
}

// Функция для отображения метрик в консоли (для разработки)
export function logWebVitals() {
  if (process.env.NODE_ENV === 'development') {
    onCLS(console.log)
    onINP(console.log)
    onFCP(console.log)
    onLCP(console.log)
    onTTFB(console.log)
  }
}