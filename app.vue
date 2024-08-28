<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { setSpeechPreferences } = useConfigStore();
const i18n = useI18n();

const setupSpeechPreferences = () => {
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
  navigateTo(Routes.WELCOME);
});
</script>
