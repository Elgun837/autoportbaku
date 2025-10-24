/**
 * Простой генератор критического CSS с помощью Critical
 * Работает напрямую с файлами без сервера
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
    // Читаем исходный HTML файл
    const originalHtml = readFileSync(indexPath, 'utf8');
    console.log('📖 HTML файл прочитан');

    // Генерируем критический CSS
    const result = await generate({
      html: originalHtml,
      base: distPath,
      
      // Размеры viewport для анализа
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
      inline: true,
      minify: true,
      
      // Игнорируем определенные CSS правила
      ignore: {
        atrule: ['@font-face'],
        rule: [/\.sr-only/, /\.visually-hidden/]
      }
    });

    // Записываем результат обратно в index.html
    writeFileSync(indexPath, result.html);

    console.log('✅ Критический CSS успешно сгенерирован!');
    
    // Показываем статистику
    if (result && result.css) {
      const criticalSize = Buffer.byteLength(result.css, 'utf8');
      console.log(`📊 Размер критического CSS: ${(criticalSize / 1024).toFixed(2)} KB`);
    }
    
    console.log('📁 Файл dist/index.html обновлен с критическим CSS');
    
  } catch (error) {
    console.error('❌ Ошибка при генерации критического CSS:', error);
    if (error.message) {
      console.error('Детали ошибки:', error.message);
    }
    process.exit(1);
  }
}

// Запускаем генерацию
generateCriticalCSS();