export function useTTS() {
  const tts = useTtsStore();
  const { t } = useI18n();
  const phrasesQueue = ref<string[]>([]);

  const configUtterance = (
    utterance: SpeechSynthesisUtterance,
    lang?: string,
  ) => {
    const voices = speechSynthesis.getVoices();
    const voice = voices.filter((v) => v.lang === (lang ?? tts.speech.lang));

    utterance.lang = lang ?? utterance.lang;
    utterance.rate = tts.speech.rate;
    if (voice) {
      utterance.voice = voice[0];
    }
    speechSynthesis.speak(utterance);
  };

  const speakPhrase = (phrase: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    configUtterance(new SpeechSynthesisUtterance(phrase));
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
