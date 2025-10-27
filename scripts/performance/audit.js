#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`)
}

function runCommand(command, description) {
  log(colors.blue, `\n🚀 ${description}...`)
  try {
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' })
    log(colors.green, `✅ ${description} - Успешно`)
    return result
  } catch (error) {
    log(colors.red, `❌ ${description} - Ошибка: ${error.message}`)
    return null
  }
}

async function performanceAudit() {
  log(colors.magenta, '\n🔍 ЗАПУСК КОМПЛЕКСНОГО АУДИТА ПРОИЗВОДИТЕЛЬНОСТИ')
  log(colors.cyan, '=' * 60)
  
  // 1. Сборка проекта
  runCommand('npm run build', 'Сборка проекта')
  
  // 2. Проверка размеров бандлов
  if (fs.existsSync('dist')) {
    runCommand('npm run bundle:size', 'Проверка размеров бандлов')
  }
  
  // 3. Запуск preview сервера в фоне
  log(colors.blue, '\n🌐 Запуск preview сервера...')
  const server = execSync('npm run preview &', { stdio: 'ignore' })
  
  // Ждем запуска сервера
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  // 4. Lighthouse аудит для мобильных
  runCommand(
    'npx lighthouse http://localhost:4173 --form-factor=mobile --output=html --output-path=./reports/lighthouse-mobile.html --chrome-flags="--headless --no-sandbox"',
    'Lighthouse аудит (мобильные)'
  )
  
  // 5. Lighthouse аудит для десктопа
  runCommand(
    'npx lighthouse http://localhost:4173 --form-factor=desktop --output=html --output-path=./reports/lighthouse-desktop.html --chrome-flags="--headless --no-sandbox"',
    'Lighthouse аудит (десктоп)'
  )
  
  // 6. Lighthouse CI
  runCommand('npx lhci autorun', 'Lighthouse CI проверка')
  
  // 7. Создание сводного отчета
  generateSummaryReport()
  
  log(colors.green, '\n✨ Аудит производительности завершен!')
  log(colors.yellow, '📊 Отчеты сохранены в папке ./reports/')
  log(colors.cyan, '🔗 Откройте HTML файлы для детального анализа')
}

function generateSummaryReport() {
  const reportsDir = './reports'
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }
  
  const summaryContent = `
# 📊 Отчет об аудите производительности

Дата: ${new Date().toLocaleString('ru-RU')}

## 🔍 Проведенные проверки:

1. **Сборка проекта** - Оптимизация и минификация
2. **Размеры бандлов** - Контроль размера JavaScript/CSS файлов  
3. **Lighthouse Mobile** - Производительность на мобильных устройствах
4. **Lighthouse Desktop** - Производительность на десктопе
5. **Lighthouse CI** - Автоматизированные проверки

## 📋 Файлы отчетов:

- \`lighthouse-mobile.html\` - Детальный мобильный аудит
- \`lighthouse-desktop.html\` - Детальный десктоп аудит
- \`.lighthouseci/\` - CI отчеты и история

## 🎯 Рекомендации по оптимизации:

### 📱 Core Web Vitals:
- **LCP (Largest Contentful Paint)** - должен быть < 2.5s
- **FID (First Input Delay)** - должен быть < 100ms  
- **CLS (Cumulative Layout Shift)** - должен быть < 0.1

### ⚡ Общие рекомендации:
- Оптимизируйте изображения (WebP формат)
- Используйте lazy loading
- Минимизируйте unused CSS/JS
- Настройте кэширование
- Используйте CDN для статических ресурсов

---
*Сгенерировано автоматически скриптом performance-audit.js*
`
  
  fs.writeFileSync(path.join(reportsDir, 'summary.md'), summaryContent)
  log(colors.green, '📄 Сводный отчет создан: ./reports/summary.md')
}

// Запуск аудита
performanceAudit().catch(console.error)