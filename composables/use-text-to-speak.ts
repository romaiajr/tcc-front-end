export function useTTS() {
  const tts = useTtsStore();
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

  // TODO - Permitir configuração do rate

  return {
    speakPhrase,
    addPhraseToQueue,
    speakPhraseQueue,
  };
}
