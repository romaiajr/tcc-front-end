export default defineNuxtPlugin((nuxtApp) => {
  const setupSpeechPreferences = () => {
    const i18n = useI18n();
    const { setSpeechPreferences } = useConfigStore();

    const onVoicesChanged = () => {
      const voices = speechSynthesis.getVoices();
      const voice = voices.find((v) => v.lang === i18n.locale.value) || null;

      setSpeechPreferences({
        lang: i18n.locale.value,
        voice,
      });

      speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
    };

    speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);

    if (speechSynthesis.getVoices().length) {
      onVoicesChanged();
    }
  };

  onMounted(() => {
    setupSpeechPreferences();
  });

  nuxtApp.provide('setupSpeechPreferences', setupSpeechPreferences);
});
