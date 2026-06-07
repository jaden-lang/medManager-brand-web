// 對應 jdnsite/schemaTypes/supportedLanguages.ts
export const SUPPORTED_LOCALES = ['zhTW', 'en']
export const DEFAULT_LOCALE = 'zhTW'

/**
 * 取多語字串值；找不到目前語言時退回預設語言（zhTW）。
 * @param {object|null|undefined} field localeString / localeText 物件
 * @param {string} [locale]
 * @returns {string}
 */
export function t(field, locale = DEFAULT_LOCALE) {
  if (!field) return ''
  return field[locale] ?? field[DEFAULT_LOCALE] ?? field.en ?? ''
}
