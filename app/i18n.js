'use srict'
import config from './config'
import i18n from 'i18next'
// browser
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
const pathDetector = {
  name: 'path',
  lookup (options) {
    // options -> are passed in options
    const matches = /^\/(ru|en)(\/|$)/.exec(window.location.pathname)
    if (matches && matches[1]) {
      return matches[1]
    } else if (options.fallbackLng) {
      alert(options.fallbackLng)
      return options.fallbackLng;
    }
  }
  // cacheUserLanguage(lng, options) {
  // options -> are passed in options
  // lng -> current language, will be called after init and on changeLanguage
  // store it
  // }
}
const languageDetector = new LanguageDetector()
languageDetector.addDetector(pathDetector)
// for browser use xhr backend to load translations and browser lng detector
if (process.browser) {
  i18n
    .use(XHR)
    // .use(Cache)
    .use(languageDetector)
}
// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n.init({
    ...config.i18n,
    detection: {
      fallbackLng: config.i18n.fallbackLng,
      // from defaults prepended by "path"
      order: ['path', 'querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',

      // cache user language
      caches: false, // ['localStorage'],
      excludeCacheFor: ['cimode']
      //cookieMinutes: 10,
      //cookieDomain: 'myDomain'
    },
    backend: {
      loadPath: '/translations/{{lng}}/{{ns}}.json',
      addPath: '/translations/post/{{lng}}/{{ns}}'
    }

  })
}
// a simple helper to getInitialProps passed on loaded i18n data
i18n.getInitialProps = (req, namespaces) => {
  if (!namespaces) {
    namespaces = i18n.options.defautlNS
  } else if (typeof namespaces === 'string') {
    namespaces = [namespaces]
  }
  req.i18n.toJSON = () => null // do not serialize i18next instance and send to client
  const initialI18nStore = {}
  req.i18n.languages.forEach((l) => {
    initialI18nStore[l] = {}
    namespaces.forEach((ns) => {
      initialI18nStore[l][ns] = req.i18n.services.resourceStore.data[l]
        ? req.i18n.services.resourceStore.data[l][ns] || {}
        : {}
    })
  })

  return {
    i18n: req.i18n, // use the instance on req - fixed language on request (avoid issues in race conditions with lngs of different users)
    initialI18nStore,
    initialLanguage: req.i18n.language
  }
}

module.exports = i18n
