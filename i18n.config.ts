export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'pt-br',
  fallbackLocale: 'pt-br',
  datetimeFormats: {
    'en-us': {
      short: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    },
    'pt-br': {
      short: {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      },
      long: {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
    },
  },
}));
