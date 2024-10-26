export function useTTS() {
  const tts = useTtsStore();
  const { t, locale } = useI18n();
  const phrasesQueue = ref<string[]>([]);
  const voice = ref();
  const voicesReady = ref(false);

  const loadVoices = () => {
    return new Promise<void>((resolve) => {
      const voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        voicesReady.value = true;
        resolve();
      } else {
        speechSynthesis.onvoiceschanged = () => {
          voicesReady.value = true;
          resolve();
        };
      }
    });
  };

  const configSpeech = (phrase: string) => {
    const voices = speechSynthesis.getVoices();
    voice.value = voices.find((v) => v.lang === locale.value);
    const speech = useSpeechSynthesis(phrase, {
      voice,
      rate: tts.speech.rate,
    });
    return speech;
  };

  const speakPhrase = async (phrase: string) => {
    if (!voicesReady.value) await loadVoices(); // Aguarda até que as vozes estejam prontas

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      phrasesQueue.value = [];
    }
    const speech = configSpeech(phrase);
    speech.speak();
    tts.addPhraseToHistory(phrase);
  };

  const addPhraseToQueue = (phrase: string) => {
    phrasesQueue.value.push(phrase);
  };

  const speakPhraseQueue = async () => {
    if (!voicesReady.value) await loadVoices();

    if (phrasesQueue.value.length > 0) {
      const phrase = phrasesQueue.value.shift();
      const speech = configSpeech(phrase as string);
      speech.utterance.value.onend = () => {
        speakPhraseQueue();
      };

      speech.speak();
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
    voicesReady,
    loadVoices,
    speakPhrase,
    addPhraseToQueue,
    speakPhraseQueue,
    updateTTSPreferences,
  };
}
