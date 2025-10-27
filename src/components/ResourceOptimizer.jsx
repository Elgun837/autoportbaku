import { useEffect } from 'react'

// Hook для preloading критичных ресурсов
export const usePreloadCriticalResources = () => {
  useEffect(() => {
    // Preload критичных шрифтов
    const preloadFont = (fontPath, fontDisplay = 'swap') => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = fontPath
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    }

    // Preload критичных изображений (логотип, первое изображение hero)
    const preloadImage = (imagePath) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = imagePath
      link.as = 'image'
      document.head.appendChild(link)
    }

    // Preload критичных CSS
    const preloadCSS = (cssPath) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = cssPath
      link.as = 'style'
      document.head.appendChild(link)
    }

    // Preload критичных шрифтов
    preloadFont('/assets/fonts/Bitter-Regular.woff2')
    preloadFont('/assets/fonts/Bitter-Bold.woff2')

    // Preload логотипа
    preloadImage('/logo.webp')

    // DNS prefetch для внешних доменов
    const dnsPrefetch = (domain) => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = domain
      document.head.appendChild(link)
    }

    // API домен
    dnsPrefetch('https://admin.autoportbaku.com')
    
    // Возможные CDN
    dnsPrefetch('https://fonts.googleapis.com')
    dnsPrefetch('https://fonts.gstatic.com')

  }, [])
}

// Компонент для preload критичных страниц
export const usePreloadPages = (routes = []) => {
  useEffect(() => {
    // Preload страниц с задержкой для не блокирования основной загрузки
    const timer = setTimeout(() => {
      routes.forEach(route => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = route
        document.head.appendChild(link)
      })
    }, 2000) // 2 секунды после загрузки

    return () => clearTimeout(timer)
  }, [routes])
}

// Компонент для preload следующей страницы при hover
export const usePrefetchOnHover = () => {
  useEffect(() => {
    const prefetchedLinks = new Set()

    const handleMouseEnter = (event) => {
      const link = event.target.closest('a')
      if (link && link.href && !prefetchedLinks.has(link.href)) {
        prefetchedLinks.add(link.href)
        
        const prefetchLink = document.createElement('link')
        prefetchLink.rel = 'prefetch'
        prefetchLink.href = link.href
        document.head.appendChild(prefetchLink)
      }
    }

    // Добавляем слушатель на все ссылки
    document.addEventListener('mouseenter', handleMouseEnter, true)

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true)
    }
  }, [])
}

// Главный компонент для оптимизации ресурсов
const ResourceOptimizer = ({ criticalRoutes = [] }) => {
  usePreloadCriticalResources()
  usePreloadPages(criticalRoutes)
  usePrefetchOnHover()
  
  return null // Этот компонент не рендерит UI
}

export default ResourceOptimizer