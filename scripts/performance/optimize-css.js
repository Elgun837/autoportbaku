import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PurgeCSS } from 'purgecss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ручная оптимизация CSS файлов с помощью PurgeCSS
const optimizeCSS = async () => {
  console.log('🧹 ОПТИМИЗАЦИЯ CSS ФАЙЛОВ');
  console.log('='.repeat(50));

  const distPath = path.join(__dirname, '../../dist');
  const cssPath = path.join(distPath, 'assets/css');
  
  if (!fs.existsSync(cssPath)) {
    console.log('❌ CSS файлы не найдены. Сначала выполните npm run build');
    return;
  }

  // Исходные файлы для анализа
  const contentFiles = [
    path.join(__dirname, '../../src/**/*.{js,jsx}'),
    path.join(__dirname, '../../index.html'),
    path.join(__dirname, '../../public/**/*.html')
  ];

  // Получаем CSS файлы для оптимизации
  const cssFiles = fs.readdirSync(cssPath)
    .filter(file => file.endsWith('.css'))
    .filter(file => !file.includes('vendor')) // Пока не трогаем vendor CSS
    .map(file => ({
      name: file,
      path: path.join(cssPath, file)
    }));

  console.log(`\n📋 Найдено ${cssFiles.length} CSS файлов для оптимизации:`);
  cssFiles.forEach(file => console.log(`   • ${file.name}`));

  let totalBefore = 0;
  let totalAfter = 0;
  let optimizedCount = 0;

  // Оптимизируем каждый CSS файл
  for (const file of cssFiles) {
    try {
      const originalContent = fs.readFileSync(file.path, 'utf8');
      const originalSize = originalContent.length;
      
      console.log(`\n🔄 Оптимизация ${file.name}...`);
      
      // Настройки PurgeCSS
      const purgeOptions = {
        content: contentFiles,
        css: [file.path],
        safelist: [
          // AOS анимации
          /^aos-/,
          /^data-aos/,
          'aos-init',
          'aos-animate',
          
          // Swiper классы
          /^swiper/,
          
          // React библиотеки
          /^react-/,
          /^image-gallery/,
          
          // Динамические состояния
          /^is-/,
          /^has-/,
          /^active/,
          /^loading/,
          /^shimmer/,
          /^error/,
          /^success/,
          /^invalid/,
          /^valid/,
          
          // Layout классы
          'container',
          'row',
          /^col-/,
          /^grid/,
          /^flex/,
          
          // Псевдо-классы и состояния
          ':hover',
          ':focus',
          ':active',
          ':visited',
          ':before',
          ':after',
          
          // Responsive классы
          /^sm:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          
          // Utility классы
          /^text-/,
          /^bg-/,
          /^border-/,
          /^p-/,
          /^m-/,
          /^w-/,
          /^h-/
        ],
        defaultExtractor: content => {
          // Улучшенный экстрактор для лучшего распознавания классов
          const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
          const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
          const jsMatches = content.match(/(?:className|class)\s*[:=]\s*["'`]([^"'`]*)["'`]/g) || [];
          
          const jsClasses = jsMatches.map(match => 
            match.replace(/(?:className|class)\s*[:=]\s*["'`]([^"'`]*)["'`]/, '$1')
          ).join(' ').split(/\s+/);
          
          return [...broadMatches, ...innerMatches, ...jsClasses];
        }
      };

      const result = await new PurgeCSS().purge(purgeOptions);
      const optimizedContent = result[0]?.css || '';
      const optimizedSize = optimizedContent.length;
      
      if (optimizedSize < originalSize) {
        // Создаём backup
        const backupPath = file.path + '.backup';
        fs.writeFileSync(backupPath, originalContent);
        
        // Сохраняем оптимизированную версию
        fs.writeFileSync(file.path, optimizedContent);
        
        const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        
        console.log(`   ✅ ${file.name}:`);
        console.log(`      До:     ${(originalSize / 1024).toFixed(2)}KB`);
        console.log(`      После:  ${(optimizedSize / 1024).toFixed(2)}KB`);
        console.log(`      Сжатие: ${reduction}%`);
        console.log(`      Backup: ${path.basename(backupPath)}`);
        
        totalBefore += originalSize;
        totalAfter += optimizedSize;
        optimizedCount++;
      } else {
        console.log(`   ⚠️ ${file.name}: без изменений`);
        totalBefore += originalSize;
        totalAfter += originalSize;
      }
      
    } catch (error) {
      console.log(`   ❌ Ошибка оптимизации ${file.name}:`, error.message);
    }
  }

  // Итоговая статистика
  console.log('\n📊 РЕЗУЛЬТАТЫ ОПТИМИЗАЦИИ:');
  console.log('='.repeat(50));
  console.log(`Оптимизировано файлов: ${optimizedCount}/${cssFiles.length}`);
  console.log(`Размер до:             ${(totalBefore / 1024).toFixed(2)}KB`);
  console.log(`Размер после:          ${(totalAfter / 1024).toFixed(2)}KB`);
  
  if (totalBefore > 0) {
    const totalReduction = ((totalBefore - totalAfter) / totalBefore * 100).toFixed(1);
    console.log(`Общее сжатие:          ${totalReduction}%`);
    console.log(`Сэкономлено:           ${((totalBefore - totalAfter) / 1024).toFixed(2)}KB`);
  }

  console.log('\n💡 СЛЕДУЮЩИЕ ШАГИ:');
  console.log('   1. Протестируйте сайт на правильность отображения');
  console.log('   2. Если есть проблемы, восстановите из backup файлов');
  console.log('   3. Для отката: for file in dist/assets/css/*.backup; do mv "$file" "${file%.backup}"; done');
  console.log('   4. Оптимизируйте vendor CSS файлы отдельно');
};

optimizeCSS().catch(console.error);