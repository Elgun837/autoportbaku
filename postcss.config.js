import { PurgeCSS } from 'purgecss';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';

// Создаём функцию PurgeCSS plugin
const purgeCSSPlugin = () => {
  return {
    postcssPlugin: 'purgecss',
    Once(root, { result }) {
      // PurgeCSS обработка будет здесь
    }
  };
};
purgeCSSPlugin.postcss = true;

export default {
  plugins: [
    postcssImport(),
    // Упрощённая минификация без PurgeCSS пока
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        colormin: true,
        convertValues: true,
        discardDuplicates: true,
        discardEmpty: true,
        mergeRules: true,
        minifySelectors: true,
        normalizeUrl: true,
        reduceIdents: false, // сохраняем имена анимаций
      }]
    })
  ]
};