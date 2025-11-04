/**
 * Утилита для асинхронной загрузки некритических CSS файлов
 * Это позволяет избежать блокировки рендеринга страницы
 */

/**
 * Загружает CSS файл асинхронно
 * @param {string} href - Путь к CSS файлу
 * @param {string} id - Уникальный ID для ссылки (опционально)
 * @returns {Promise<void>}
 */
export const loadCSS = (href, id = null) => {
  return new Promise((resolve, reject) => {
    // Проверяем, не загружен ли уже этот файл
    if (id && document.getElementById(id)) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    if (id) link.id = id;

    link.onload = function() {
      this.onload = null;
      this.rel = 'stylesheet';
      resolve();
    };

    link.onerror = reject;

    document.head.appendChild(link);

    // Fallback для браузеров без поддержки preload
    const noscript = document.createElement('noscript');
    const fallbackLink = document.createElement('link');
    fallbackLink.rel = 'stylesheet';
    fallbackLink.href = href;
    noscript.appendChild(fallbackLink);
    document.head.appendChild(noscript);
  });
};

/**
 * Загружает массив CSS файлов параллельно
 * @param {Array<{href: string, id?: string}>} cssFiles - Массив объектов с путями к CSS
 * @returns {Promise<void[]>}
 */
export const loadMultipleCSS = (cssFiles) => {
  return Promise.all(
    cssFiles.map(({ href, id }) => loadCSS(href, id))
  );
};

/**
 * Загружает CSS только когда элемент становится видимым
 * @param {string} selector - CSS селектор элемента
 * @param {string} href - Путь к CSS файлу
 * @param {string} id - Уникальный ID
 */
export const loadCSSOnView = (selector, href, id) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadCSS(href, id);
        observer.disconnect();
      }
    });
  }, { rootMargin: '200px' });

  const element = document.querySelector(selector);
  if (element) {
    observer.observe(element);
  }
};

/**
 * Загружает некритические стили после полной загрузки страницы
 * @param {Array<{href: string, id?: string}>} cssFiles - Массив CSS файлов
 */
export const loadDeferredCSS = (cssFiles) => {
  if (document.readyState === 'complete') {
    loadMultipleCSS(cssFiles);
  } else {
    window.addEventListener('load', () => {
      // Добавляем небольшую задержку для приоритета основного контента
      setTimeout(() => {
        loadMultipleCSS(cssFiles);
      }, 100);
    });
  }
};

export default {
  loadCSS,
  loadMultipleCSS,
  loadCSSOnView,
  loadDeferredCSS
};
