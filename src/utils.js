/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale) {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


export function pages(current_page, last_page, onSides = 0) {
  let pages = [];
  for (let i = 1; i <= last_page; i++) {
      let offset = (i == 1 || last_page) ? onSides + 1 : onSides;
      if (i == 1 || (current_page - offset <= i && current_page + offset >= i) || 
          i == current_page || i == last_page) {
          pages.push(i);
      } else if (i == current_page - (offset + 1) || i == current_page + (offset + 1)) {
          pages.push('...');
      }
  }
  return pages;
}

export function translate(dict, lang, word) {
  return dict[lang][word];
}