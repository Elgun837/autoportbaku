import critical from 'critical';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Генерация критического CSS для быстрой загрузки
const generateCriticalCSS = async () => {
  console.log('⚡ ГЕНЕРАЦИЯ КРИТИЧЕСКОГО CSS');
  console.log('='.repeat(50));

  const distPath = path.join(__dirname, '../../dist');
  const indexPath = path.join(distPath, 'index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.log('❌ index.html не найден. Сначала выполните npm run build');
    return;
  }

  try {
    console.log('🔍 Анализируем критические стили для главной страницы...');
    
    // Критический CSS для десктопа
    const desktopResult = await critical.generate({
      inline: false, // не встраиваем сразу, сначала проанализируем
      base: distPath,
      src: 'index.html',
      width: 1300,
      height: 900,
      penthouse: {
        timeout: 30000,
        renderWaitTime: 1000,
        blockJSRequests: false
      }
    });

    // Критический CSS для мобильных
    const mobileResult = await critical.generate({
      inline: false,
      base: distPath,
      src: 'index.html', 
      width: 375,
      height: 667,
      penthouse: {
        timeout: 30000,
        renderWaitTime: 1000,
        blockJSRequests: false
      }
    });

    // Сохраняем критические стили
    const criticalDir = path.join(__dirname, '../critical-css');
    if (!fs.existsSync(criticalDir)) {
      fs.mkdirSync(criticalDir, { recursive: true });
    }

    fs.writeFileSync(path.join(criticalDir, 'critical-desktop.css'), desktopResult.css);
    fs.writeFileSync(path.join(criticalDir, 'critical-mobile.css'), mobileResult.css);

    console.log('✅ Критический CSS сгенерирован:');
    console.log(`   Десктоп: ${(desktopResult.css.length / 1024).toFixed(2)}KB`);
    console.log(`   Мобильный: ${(mobileResult.css.length / 1024).toFixed(2)}KB`);

    // Создаём компонент для инлайн CSS
    const criticalComponent = `
import React from 'react';

// Критический CSS - инлайнится в <head> для быстрой загрузки
const CriticalCSS = () => {
  React.useEffect(() => {
    // Проверяем размер экрана и выбираем соответствующий CSS
    const isMobile = window.innerWidth < 768;
    const criticalCSS = isMobile ? 
      \`${mobileResult.css.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` :
      \`${desktopResult.css.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
    
    // Добавляем критические стили в head
    const style = document.createElement('style');
    style.setAttribute('data-critical', 'true');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    // Помечаем, что критический CSS загружен
    document.documentElement.classList.add('critical-css-loaded');
  }, []);

  return null;
};

export default CriticalCSS;
`;

    fs.writeFileSync(path.join(criticalDir, 'CriticalCSS.jsx'), criticalComponent);

    console.log('\n📊 АНАЛИЗ КРИТИЧЕСКОГО CSS:');
    console.log('-'.repeat(40));
    
    // Анализируем какие селекторы входят в критический CSS
    const desktopSelectors = desktopResult.css.match(/[.#][\w-]+/g) || [];
    const mobileSelectors = mobileResult.css.match(/[.#][\w-]+/g) || [];
    
    console.log(`Селекторов в десктопном CSS: ${desktopSelectors.length}`);
    console.log(`Селекторов в мобильном CSS: ${mobileSelectors.length}`);
    
    // Топ селекторы
    const selectorCount = {};
    [...desktopSelectors, ...mobileSelectors].forEach(sel => {
      selectorCount[sel] = (selectorCount[sel] || 0) + 1;
    });
    
    const topSelectors = Object.entries(selectorCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
    
    console.log('\n🔝 Топ-10 критических селекторов:');
    topSelectors.forEach(([selector, count]) => {
      console.log(`   ${selector} (${count}x)`);
    });

    console.log('\n💡 РЕКОМЕНДАЦИИ:');
    console.log('1. Добавьте <CriticalCSS /> в App.jsx');
    console.log('2. Лениво загружайте некритические стили');
    console.log('3. Используйте preload для шрифтов');
    console.log('4. Оптимизируйте порядок CSS правил');

  } catch (error) {
    console.error('❌ Ошибка генерации критического CSS:', error.message);
    
    if (error.message.includes('Chrome')) {
      console.log('\n💡 Подсказка: Убедитесь что Chrome установлен или попробуйте:');
      console.log('npm install -D puppeteer');
    }
  }
};

generateCriticalCSS().catch(console.error);