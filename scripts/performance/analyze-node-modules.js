import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Анализ размеров node_modules для выявления тяжёлых пакетов
const analyzeNodeModules = () => {
  const nodeModulesPath = path.join(__dirname, '../../node_modules');
  const packages = [];

  if (!fs.existsSync(nodeModulesPath)) {
    console.log('node_modules не найден');
    return;
  }

  // Функция для получения размера директории
  const getDirectorySize = (dirPath) => {
    let size = 0;
    try {
      const items = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const item of items) {
        const itemPath = path.join(dirPath, item.name);
        if (item.isDirectory()) {
          size += getDirectorySize(itemPath);
        } else {
          size += fs.statSync(itemPath).size;
        }
      }
    } catch (error) {
      // Игнорируем ошибки доступа
    }
    return size;
  };

  // Анализируем все пакеты
  const packageDirs = fs.readdirSync(nodeModulesPath, { withFileTypes: true })
    .filter(item => item.isDirectory() && !item.name.startsWith('.'))
    .map(item => item.name);

  console.log('🔍 АНАЛИЗ РАЗМЕРОВ NODE_MODULES');
  console.log('='.repeat(50));

  for (const packageName of packageDirs) {
    const packagePath = path.join(nodeModulesPath, packageName);
    
    // Обрабатываем scoped packages
    if (packageName.startsWith('@')) {
      const scopedPackages = fs.readdirSync(packagePath, { withFileTypes: true })
        .filter(item => item.isDirectory())
        .map(item => item.name);
      
      for (const scopedName of scopedPackages) {
        const scopedPath = path.join(packagePath, scopedName);
        const size = getDirectorySize(scopedPath);
        packages.push({
          name: `${packageName}/${scopedName}`,
          size: size,
          sizeMB: (size / 1024 / 1024).toFixed(2)
        });
      }
    } else {
      const size = getDirectorySize(packagePath);
      packages.push({
        name: packageName,
        size: size,
        sizeMB: (size / 1024 / 1024).toFixed(2)
      });
    }
  }

  // Сортируем по размеру (убывание)
  packages.sort((a, b) => b.size - a.size);

  // Показываем топ-20 самых тяжёлых пакетов
  console.log('\n📦 ТОП-20 САМЫХ ТЯЖЁЛЫХ ПАКЕТОВ:');
  console.log('-'.repeat(50));
  
  packages.slice(0, 20).forEach((pkg, index) => {
    const status = pkg.size > 10 * 1024 * 1024 ? '❌' : 
                   pkg.size > 5 * 1024 * 1024 ? '⚠️' : '✅';
    console.log(`${index + 1}.`.padStart(3) + ` ${pkg.name.padEnd(30)} ${pkg.sizeMB.padStart(8)}MB ${status}`);
  });

  console.log('\n📊 СТАТИСТИКА:');
  console.log('-'.repeat(30));
  const totalSize = packages.reduce((sum, pkg) => sum + pkg.size, 0);
  console.log(`Общий размер: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Пакетов всего: ${packages.length}`);
  console.log(`Пакетов >10MB: ${packages.filter(p => p.size > 10 * 1024 * 1024).length}`);
  console.log(`Пакетов >5MB: ${packages.filter(p => p.size > 5 * 1024 * 1024).length}`);
};

analyzeNodeModules();