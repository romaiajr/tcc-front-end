export function useTTS() {
  const config = useConfigStore();
  const phrasesQueue = ref<string[]>([]);

  // REVIEW - Nomenclatura da função
  const speak = (phrase: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(phrase);
    Object.assign(utterance, config.speech);
    speechSynthesis.speak(utterance);
  };

  const addPhraseToQueue = (phrase: string) => {
    phrasesQueue.value.push(phrase);
  };

  const speakPhraseQueue = () => {
    if (phrasesQueue.value.length > 0) {
      const utterance = new SpeechSynthesisUtterance(
        phrasesQueue.value.shift(),
      );
      Object.assign(utterance, config.speech);
      utterance.onend = () => {
        speakPhraseQueue();
      };

      speechSynthesis.speak(utterance);
    }
  };

  // TODO - Permitir configuração do rate

  return {
    speak,
    addPhraseToQueue,
    speakPhraseQueue,
  };
}
