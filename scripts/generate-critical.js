/**
 * Генератор критического CSS с помощью Critical
 * Автоматически анализирует сайт и создает критический CSS
 */

import { generate } from 'critical';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = join(__dirname, '../dist');
const indexPath = join(distPath, 'index.html');

async function generateCriticalCSS() {
  console.log('🚀 Генерация критического CSS...');
  
  try {
    // Генерируем критический CSS (полная версия - multi-viewport)
    const result = await generate({
      // Источник для анализа - запущенный сервер
      base: distPath,
      src: 'http://localhost:4174',
      target: {
        html: 'index.html',
        css: 'index.html'
      },
      
      // Размеры viewport для анализа (основные разрешения)
      width: 1200,
      height: 900,
      dimensions: [
        {
          width: 320,
          height: 568,
        },
        {
          width: 768,
          height: 1024,
        },
        {
          width: 1200,
          height: 900,
        }
      ],
      
      // Настройки оптимизации
      inline: true, // Встраиваем критический CSS в HTML
      extract: false, // НЕ извлекаем некритический CSS для простоты
      minify: true, // Минифицируем
      
      // Игнорируем определенные CSS правила
      ignore: {
        atrule: ['@font-face'],
        rule: [/\.sr-only/, /\.visually-hidden/]
      }
    });

    console.log('✅ Критический CSS успешно сгенерирован!');
    
    // Показываем статистику
    if (result && result.css) {
      const criticalSize = Buffer.byteLength(result.css, 'utf8');
      console.log(`📊 Размер критического CSS: ${(criticalSize / 1024).toFixed(2)} KB`);
    }
    
    console.log('📁 Файлы обновлены в папке dist/');
    
  } catch (error) {
    console.error('❌ Ошибка при генерации критического CSS:', error);
    process.exit(1);
  }
}

// Запускаем генерацию
generateCriticalCSS();