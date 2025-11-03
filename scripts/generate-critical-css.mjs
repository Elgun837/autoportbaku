#!/usr/bin/env node

/**
 * Скрипт для извлечения и оптимизации критического CSS
 * Использует Critical library для генерации критического CSS
 */

import { generate } from 'critical';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:5173'; // URL dev сервера
const OUTPUT_DIR = './dist';

// Конфигурация для критического CSS
const criticalConfig = {
  // Размеры viewport для анализа
  dimensions: [
    {
      height: 900,
      width: 375, // Mobile
    },
    {
      height: 900,
      width: 1280, // Desktop
    },
  ],
  // Настройки
  penthouse: {
    blockJSRequests: false,
    timeout: 60000,
  },
  inline: false, // Не встраиваем автоматически
  extract: true, // Извлекаем критический CSS
  minify: true, // Минифицируем
};

async function generateCriticalCSS() {
  console.log('🚀 Генерация критического CSS...\n');

  try {
    // Генерируем критический CSS для главной страницы
    const { css, html, uncritical } = await generate({
      ...criticalConfig,
      base: OUTPUT_DIR,
      src: 'index.html',
      target: {
        css: 'critical.css',
        uncritical: 'uncritical.css',
      },
    });

    console.log('✅ Критический CSS сгенерирован!');
    console.log(`📊 Размер критического CSS: ${(css.length / 1024).toFixed(2)} KB`);
    console.log(`📊 Размер некритического CSS: ${(uncritical.length / 1024).toFixed(2)} KB`);

    // Сохраняем критический CSS отдельно для reference
    writeFileSync(
      join(OUTPUT_DIR, 'assets/css/critical-generated.css'),
      css,
      'utf-8'
    );

    console.log('\n✨ Готово! Критический CSS сохранен в dist/assets/css/critical-generated.css');
    console.log('💡 Скопируйте содержимое в <style> тег в index.html');
    
  } catch (error) {
    console.error('❌ Ошибка при генерации критического CSS:', error);
    process.exit(1);
  }
}

// Запуск
generateCriticalCSS();
