module.exports = {
  // Настройки для аудита производительности
  ci: {
    collect: {
      // URL для аудита (локальный сервер)
      url: ['http://localhost:5173'],
      // Количество запусков для усреднения результатов
      numberOfRuns: 3,
      // Настройки Chrome
      settings: {
        chromeFlags: ['--no-sandbox', '--headless'],
        // Эмуляция медленного соединения
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        }
      }
    },
    // Бюджеты производительности
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.8}],
        'categories:accessibility': ['warn', {minScore: 0.9}],
        'categories:best-practices': ['warn', {minScore: 0.9}],
        'categories:seo': ['warn', {minScore: 0.9}],
        // Core Web Vitals
        'largest-contentful-paint': ['warn', {maxNumericValue: 2500}],
        'cumulative-layout-shift': ['warn', {maxNumericValue: 0.1}],
        'total-blocking-time': ['warn', {maxNumericValue: 300}],
        'first-contentful-paint': ['warn', {maxNumericValue: 1800}],
        'speed-index': ['warn', {maxNumericValue: 3400}],
        'interactive': ['warn', {maxNumericValue: 3800}]
      }
    },
    // Загрузка отчетов
    upload: {
      target: 'temporary-public-storage'
    }
  }
};