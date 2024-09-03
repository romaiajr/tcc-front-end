export function useTTS() {
  const config = useConfigStore();
  const utterance = ref();

  // REVIEW - Nomenclatura da função
  const speak = (text: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    utterance.value = new SpeechSynthesisUtterance(text);
    Object.assign(utterance.value, config.speech);
    speechSynthesis.speak(utterance.value);
  };

  // TODO - Permitir configuração do rate

  return {
    speak,
  };
}
