#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

console.log('📦 АНАЛИЗ ЗАВИСИМОСТЕЙ И РАЗМЕРОВ БАНДЛОВ')
console.log('=' * 50)

// Читаем package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

console.log('\n📋 УСТАНОВЛЕННЫЕ ЗАВИСИМОСТИ:')
console.log('-'.repeat(30))

const deps = packageJson.dependencies || {}
const devDeps = packageJson.devDependencies || {}

console.log('\n🔷 Production зависимости:')
Object.entries(deps).forEach(([name, version]) => {
  console.log(`  • ${name}: ${version}`)
})

console.log(`\n📊 Всего production зависимостей: ${Object.keys(deps).length}`)

// Анализируем размеры собранных файлов
console.log('\n📁 АНАЛИЗ РАЗМЕРОВ ФАЙЛОВ:')
console.log('-'.repeat(30))

if (fs.existsSync('./dist')) {
  const distFiles = []
  
  function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      if (stat.isDirectory()) {
        getFiles(filePath, fileList)
      } else {
        const size = stat.size
        const relativePath = path.relative('./dist', filePath)
        fileList.push({ path: relativePath, size, ext: path.extname(file) })
      }
    })
    return fileList
  }
  
  const files = getFiles('./dist')
  
  // Группируем по типам файлов
  const fileTypes = {}
  files.forEach(file => {
    const ext = file.ext || 'other'
    if (!fileTypes[ext]) fileTypes[ext] = []
    fileTypes[ext].push(file)
  })
  
  // Показываем топ JS файлов
  const jsFiles = files.filter(f => f.ext === '.js').sort((a, b) => b.size - a.size)
  
  console.log('\n🔥 ТОП-10 САМЫХ БОЛЬШИХ JS ФАЙЛОВ:')
  jsFiles.slice(0, 10).forEach((file, i) => {
    const sizeKB = (file.size / 1024).toFixed(1)
    const status = file.size > 500000 ? '❌' : file.size > 200000 ? '⚠️' : '✅'
    console.log(`  ${i + 1}. ${file.path} - ${sizeKB}KB ${status}`)
  })
  
  // Показываем общую статистику
  const totalSize = files.reduce((sum, file) => sum + file.size, 0)
  const jsSize = jsFiles.reduce((sum, file) => sum + file.size, 0)
  const cssFiles = files.filter(f => f.ext === '.css')
  const cssSize = cssFiles.reduce((sum, file) => sum + file.size, 0)
  
  console.log('\n📊 ОБЩАЯ СТАТИСТИКА:')
  console.log(`  📦 Общий размер: ${(totalSize / 1024 / 1024).toFixed(2)}MB`)
  console.log(`  📜 JavaScript: ${(jsSize / 1024 / 1024).toFixed(2)}MB (${jsFiles.length} файлов)`)
  console.log(`  🎨 CSS: ${(cssSize / 1024).toFixed(1)}KB (${cssFiles.length} файлов)`)
  
} else {
  console.log('❌ Папка dist не найдена. Запустите npm run build')
}

// Анализируем проблемные зависимости
console.log('\n⚠️ ПОТЕНЦИАЛЬНО ТЯЖЕЛЫЕ ЗАВИСИМОСТИ:')
console.log('-'.repeat(30))

const heavyLibraries = [
  'react-image-gallery', 'swiper', 'gsap', 'animate.css', 
  'react-datepicker', 'react-phone-input-2', 'react-select',
  'axios', '@tanstack/react-query'
]

const found = heavyLibraries.filter(lib => deps[lib])
found.forEach(lib => {
  console.log(`  ⚠️ ${lib}: ${deps[lib]}`)
})

console.log('\n💡 РЕКОМЕНДАЦИИ ПО ОПТИМИЗАЦИИ:')
console.log('-'.repeat(30))

console.log('\n🔧 Немедленные действия:')
console.log('  1. Настроить code splitting в Vite')
console.log('  2. Проверить tree shaking для неиспользуемого кода')
console.log('  3. Lazy loading для тяжелых компонентов')
console.log('  4. Заменить тяжелые библиотеки на легкие аналоги')

console.log('\n📈 Средний срок:') 
console.log('  1. Настроить dynamic imports для страниц')
console.log('  2. Оптимизировать изображения (WebP, размеры)')
console.log('  3. Настроить preloading критичных ресурсов')
console.log('  4. Удалить неиспользуемые зависимости')

console.log('\n🚀 Ожидаемый результат:')
console.log('  • Сокращение initial bundle на 60-70%')
console.log('  • Улучшение LCP с 4-5s до 2-2.5s')
console.log('  • Performance Score с 30-40 до 80-90')

console.log('\n📄 Для детального анализа запустите:')
console.log('  npm run bundle:analyze')