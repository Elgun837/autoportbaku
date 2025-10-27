import { useEffect, useRef } from 'react'

// Hook для lazy loading AOS
export const useLazyAOS = (enabled = true) => {
  const initialized = useRef(false)

  useEffect(() => {
    if (!enabled || initialized.current) return

    const initAOS = async () => {
      try {
        // Lazy load AOS только когда пользователь начинает скроллить
        const AOS = await import('aos')
        await import('aos/dist/aos.css')
        
        AOS.default.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          mirror: true,
          anchorPlacement: 'center-bottom',
          offset: 200,
          disable: false,
          startEvent: 'DOMContentLoaded',
          animatedClassName: 'aos-animate',
          initClassName: 'aos-init',
          useClassNames: false,
          disableMutationObserver: false,
          debounceDelay: 50,
          throttleDelay: 99,
        })

        AOS.default.refresh()
        initialized.current = true
      } catch (error) {
        console.log('AOS loading failed, animations disabled:', error)
      }
    }

    // Инициализируем AOS после небольшой задержки или при первом скролле
    let scrollListener
    let timeoutId

    const initOnScroll = () => {
      initAOS()
      window.removeEventListener('scroll', scrollListener)
    }

    // Инициализация при скролле или через 2 секунды
    scrollListener = initOnScroll
    window.addEventListener('scroll', scrollListener, { once: true, passive: true })
    timeoutId = setTimeout(initAOS, 2000)

    return () => {
      window.removeEventListener('scroll', scrollListener)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [enabled])
}

// Компонент для инициализации AOS
const LazyAOS = ({ enabled = true }) => {
  useLazyAOS(enabled)
  return null
}

export default LazyAOS