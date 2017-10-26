export default {
  i18n: {
      fallbackLng: 'en',
      load: 'languageOnly', // we only provide en, de -> no region specific locals like en-US, de-DE

      // have a common namespace used around the full app
      ns: ['common'],
      defaultNS: 'common',

      debug: false,
      saveMissing: true,

      interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ',',
        format: (value, format, lng) => {
          if (format === 'uppercase') return value.toUpperCase();
          return value;
        }
      },

  }
}
