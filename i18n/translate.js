import { createI18n } from 'vue-i18n'
import zh from './locales/zh.json'
import en from './locales/en.json'
import jp from './locales/jp.json'
import kr from './locales/kr.json'

const messages = { zh, en, jp, kr }

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
})

export default i18n

