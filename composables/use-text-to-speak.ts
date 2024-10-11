export function useTTS() {
  const tts = useTtsStore();
  const { t } = useI18n();
  const phrasesQueue = ref<string[]>([]);

  const speakPhrase = (phrase: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(phrase);
    Object.assign(utterance, tts.speech);
    speechSynthesis.speak(utterance);
    tts.addPhraseToHistory(phrase);
  };

  const addPhraseToQueue = (phrase: string) => {
    phrasesQueue.value.push(phrase);
  };

  const speakPhraseQueue = () => {
    if (phrasesQueue.value.length > 0) {
      const phrase = phrasesQueue.value.shift();
      const utterance = new SpeechSynthesisUtterance(phrase);
      Object.assign(utterance, tts.speech);
      utterance.onend = () => {
        speakPhraseQueue();
      };

      speechSynthesis.speak(utterance);
      if (phrase) {
        tts.addPhraseToHistory(phrase);
      }
    }
  };

  const updateTTSPreferences = (increase: boolean) => {
    tts.setRate(increase ? tts.speech.rate + 2 : tts.speech.rate - 2);
    speakPhrase(t('message.speech_rate_test', { rate: tts.speech.rate / 2 }));
  };

  return {
    speakPhrase,
    addPhraseToQueue,
    speakPhraseQueue,
    updateTTSPreferences,
  };
}
