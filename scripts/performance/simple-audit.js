#!/usr/bin/env node

import { execSync } from 'child_process'
import fs from 'fs'

console.log('🔍 Запуск базового аудита производительности...')

try {
  // Создаем папку для отчетов если её нет
  if (!fs.existsSync('./reports')) {
    fs.mkdirSync('./reports', { recursive: true })
  }

  console.log('📊 Запуск Lighthouse аудита...')
  
  // Простой Lighthouse аудит
  const result = execSync(
    'npx lighthouse http://localhost:4173 --output=html --output-path=./reports/lighthouse-report.html --chrome-flags="--no-sandbox" --quiet', 
    { 
      encoding: 'utf8',
      timeout: 60000 // 60 секунд
    }
  )
  
  console.log('✅ Lighthouse аудит завершен!')
  console.log('📄 Отчет сохранен: ./reports/lighthouse-report.html')
  
  // Также создадим JSON версию для программного анализа
  const jsonResult = execSync(
    'npx lighthouse http://localhost:4173 --output=json --output-path=./reports/lighthouse-data.json --chrome-flags="--no-sandbox" --quiet',
    { 
      encoding: 'utf8',
      timeout: 60000
    }
  )
  
  console.log('📊 JSON данные сохранены: ./reports/lighthouse-data.json')
  
  // Читаем и анализируем JSON результаты
  const data = JSON.parse(fs.readFileSync('./reports/lighthouse-data.json', 'utf8'))
  
  console.log('\n🎯 РЕЗУЛЬТАТЫ АУДИТА:')
  console.log('==================')
  
  const scores = data.lhr.categories
  console.log(`📈 Performance: ${Math.round(scores.performance.score * 100)}/100`)
  console.log(`♿ Accessibility: ${Math.round(scores.accessibility.score * 100)}/100`)
  console.log(`🔧 Best Practices: ${Math.round(scores['best-practices'].score * 100)}/100`)
  console.log(`🔍 SEO: ${Math.round(scores.seo.score * 100)}/100`)
  
  // Core Web Vitals
  const audits = data.lhr.audits
  console.log('\n🌐 CORE WEB VITALS:')
  console.log('==================')
  
  if (audits['largest-contentful-paint']) {
    const lcp = audits['largest-contentful-paint'].numericValue
    console.log(`🎨 LCP (Largest Contentful Paint): ${(lcp/1000).toFixed(2)}s ${lcp > 2500 ? '❌' : lcp > 1800 ? '⚠️' : '✅'}`)
  }
  
  if (audits['cumulative-layout-shift']) {
    const cls = audits['cumulative-layout-shift'].numericValue
    console.log(`📐 CLS (Cumulative Layout Shift): ${cls.toFixed(3)} ${cls > 0.1 ? '❌' : cls > 0.05 ? '⚠️' : '✅'}`)
  }
  
  if (audits['total-blocking-time']) {
    const tbt = audits['total-blocking-time'].numericValue
    console.log(`⏱️ TBT (Total Blocking Time): ${tbt.toFixed(0)}ms ${tbt > 300 ? '❌' : tbt > 150 ? '⚠️' : '✅'}`)
  }
  
  // Проблемы производительности
  console.log('\n⚡ ОСНОВНЫЕ ПРОБЛЕМЫ:')
  console.log('===================')
  
  const opportunities = data.lhr.audits
  const issues = []
  
  if (opportunities['unused-javascript'] && opportunities['unused-javascript'].score < 1) {
    issues.push(`🗑️ Неиспользуемый JavaScript: ${opportunities['unused-javascript'].details?.overallSavingsMs || 'N/A'}ms`)
  }
  
  if (opportunities['unused-css-rules'] && opportunities['unused-css-rules'].score < 1) {
    issues.push(`🎨 Неиспользуемый CSS: ${opportunities['unused-css-rules'].details?.overallSavingsMs || 'N/A'}ms`)
  }
  
  if (opportunities['efficiently-encode-images'] && opportunities['efficiently-encode-images'].score < 1) {
    issues.push(`🖼️ Неоптимизированные изображения`)
  }
  
  if (opportunities['modern-image-formats'] && opportunities['modern-image-formats'].score < 1) {
    issues.push(`📷 Устаревшие форматы изображений`)
  }
  
  if (issues.length > 0) {
    issues.forEach(issue => console.log(issue))
  } else {
    console.log('🎉 Серьезных проблем не найдено!')
  }
  
  console.log('\n📖 Откройте ./reports/lighthouse-report.html для детального анализа')
  
} catch (error) {
  console.error('❌ Ошибка при выполнении аудита:', error.message)
  process.exit(1)
}