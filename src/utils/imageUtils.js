// Простая функция для замены сломанных изображений серым фоном
export const initImageFallback = () => {
  const addImageErrorHandlers = () => {
    const images = document.querySelectorAll('img:not([data-fallback-init])');
    
    images.forEach(img => {
      const handleError = () => {
        // Создаем замещающий div с серым фоном
        const placeholder = document.createElement('div');
        placeholder.style.backgroundColor = '#f0f0f0';
        placeholder.style.border = '1px solid #ddd';
        placeholder.style.borderRadius = '8px';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.flexDirection = 'column';
        placeholder.style.gap = '8px';
        placeholder.style.color = '#888';
        placeholder.style.fontSize = '14px';
        placeholder.style.textAlign = 'center';
        placeholder.style.padding = '20px';
        
        // Копируем размеры оригинального изображения
        const computedStyle = window.getComputedStyle(img);
        placeholder.style.width = computedStyle.width !== 'auto' ? computedStyle.width : '200px';
        placeholder.style.height = computedStyle.height !== 'auto' ? computedStyle.height : '150px';
        placeholder.style.minWidth = '100%';
        placeholder.style.minHeight = '25svh';
        placeholder.style.maxWidth = computedStyle.maxWidth;
        placeholder.style.maxHeight = computedStyle.maxHeight;
        
        // Добавляем содержимое
        placeholder.innerHTML = `
          <div style="font-size: 24px; opacity: 0.5;">📷</div>
          
        `;
        
        // Заменяем изображение на placeholder
        img.parentNode.replaceChild(placeholder, img);
      };
      
      // Проверяем состояние изображения
      if (img.complete && img.naturalWidth === 0) {
        handleError();
      }
      
      img.addEventListener('error', handleError);
      img.setAttribute('data-fallback-init', 'true');
    });
  };
  
  // Запускаем обработчик
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addImageErrorHandlers);
  } else {
    addImageErrorHandlers();
  }
  
  // Отслеживаем новые изображения
  const observer = new MutationObserver(() => {
    setTimeout(addImageErrorHandlers, 100);
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  return () => observer.disconnect();
};