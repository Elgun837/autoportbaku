import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PurgeCSS } from 'purgecss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Анализ CSS файлов и выявление неиспользуемых стилей
const analyzeCSSUsage = async () => {
  console.log('🎨 АНАЛИЗ ИСПОЛЬЗОВАНИЯ CSS');
  console.log('='.repeat(50));

  const distPath = path.join(__dirname, '../../dist');
  const cssPath = path.join(distPath, 'assets/css');
  
  if (!fs.existsSync(cssPath)) {
    console.log('❌ CSS файлы не найдены. Сначала выполните npm run build');
    return;
  }

  // Получаем все CSS файлы
  const cssFiles = fs.readdirSync(cssPath)
    .filter(file => file.endsWith('.css'))
    .map(file => ({
      name: file,
      path: path.join(cssPath, file),
      size: fs.statSync(path.join(cssPath, file)).size
    }))
    .sort((a, b) => b.size - a.size);

  console.log('\n📊 РАЗМЕРЫ CSS ФАЙЛОВ (до оптимизации):');
  console.log('-'.repeat(60));
  
  let totalSize = 0;
  cssFiles.forEach((file, index) => {
    const sizeKB = (file.size / 1024).toFixed(2);
    totalSize += file.size;
    const status = file.size > 50000 ? '❌' : file.size > 20000 ? '⚠️' : '✅';
    console.log(`${index + 1}.`.padStart(3) + ` ${file.name.padEnd(35)} ${sizeKB.padStart(8)}KB ${status}`);
  });

  console.log('-'.repeat(60));
  console.log(`Общий размер CSS: ${(totalSize / 1024).toFixed(2)}KB`);

  // Анализируем каждый CSS файл с PurgeCSS
  console.log('\n🔍 АНАЛИЗ НЕИСПОЛЬЗУЕМОГО CSS:');
  console.log('-'.repeat(60));

  const srcFiles = [
    path.join(__dirname, '../../src/**/*.{js,jsx}'),
    path.join(__dirname, '../../index.html')
  ];

  for (const file of cssFiles.slice(0, 5)) { // Анализируем топ-5 файлов
    try {
      const originalContent = fs.readFileSync(file.path, 'utf8');
      
      const purgeResult = await new PurgeCSS().purge({
        content: srcFiles,
        css: [file.path],
        safelist: [
          // AOS анимации
          /^aos-/,
          /^data-aos/,
          // Swiper классы
          /^swiper-/,
          // React библиотеки
          /^react-/,
          /^image-gallery/,
          // Динамические состояния
          /^is-/,
          /^has-/,
          /^active/,
          /^loading/,
          // Utility классы
          'container',
          'row',
          /^col-/,
          // Псевдо-классы
          ':hover',
          ':focus',
          ':active'
        ]
      });

      const optimizedContent = purgeResult[0]?.css || '';
      const originalSize = originalContent.length;
      const optimizedSize = optimizedContent.length;
      const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`📄 ${file.name}:`);
      console.log(`   До:     ${(originalSize / 1024).toFixed(2)}KB`);
      console.log(`   После:  ${(optimizedSize / 1024).toFixed(2)}KB`);
      console.log(`   Сжатие: ${reduction}%`);
      console.log('');
      
    } catch (error) {
      console.log(`❌ Ошибка анализа ${file.name}:`, error.message);
    }
  }

  // Рекомендации по оптимизации
  console.log('\n💡 РЕКОМЕНДАЦИИ ПО ОПТИМИЗАЦИИ CSS:');
  console.log('-'.repeat(50));
  
  const largeFiles = cssFiles.filter(f => f.size > 20000);
  if (largeFiles.length > 0) {
    console.log('\n🔧 Файлы требующие оптимизации:');
    largeFiles.forEach(file => {
      console.log(`  • ${file.name} (${(file.size / 1024).toFixed(2)}KB)`);
    });
  }

  console.log('\n📈 Действия для оптимизации:');
  console.log('  1. Включить PurgeCSS в production build');
  console.log('  2. Оптимизировать vendor CSS библиотек');
  console.log('  3. Использовать CSS modules для изоляции');
  console.log('  4. Инлайнить критический CSS');
  console.log('  5. Lazy load некритических стилей');

  console.log('\n🚀 Ожидаемые результаты:');
  console.log('  • Сокращение CSS на 40-60%');
  console.log('  • Улучшение FCP на 200-400ms');
  console.log('  • Повышение PageSpeed Score на 10-15 пунктов');
};

analyzeCSSUsage().catch(console.error);