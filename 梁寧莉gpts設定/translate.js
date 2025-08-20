import { createI18n } from 'vue-i18n'

// 載入語系 JSON
import zhTW from './locales/zh-TW/translation.json'
import enUS from './locales/en/translation.json'
import jaJP from './locales/ja/translation.json'
import koKR from './locales/ko/translation.json'

// 自動偵測系統語言，並預設為 zh-TW（可改）
const getDefaultLocale = () => {
  const lang = navigator.language || navigator.userLanguage
  if (lang.includes('zh')) return 'zh-TW'
  if (lang.includes('en')) return 'en'
  if (lang.includes('ja')) return 'ja'
  if (lang.includes('ko')) return 'ko'
  return 'zh-TW'
}

const i18n = createI18n({
  legacy: false, // 如果你用 composition API
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-TW',
  globalInjection: true, // 可讓 `$t` 直接在 template 使用
  messages: {
    'zh-TW': zhTW,
    'en': enUS,
    'ja': jaJP,
    'ko': koKR
  }
})

export default i18n
