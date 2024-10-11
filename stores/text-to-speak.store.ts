export type SpeechPreferences = {
  rate: number;
  lang: string;
};

export const useTtsStore = defineStore('tts', {
  state: (): { speech: SpeechPreferences; history: string[] } => ({
    speech: {
      rate: 4,
      lang: 'pt-BR',
    },
    history: [],
  }),
  actions: {
    setSpeechPreferences(preferences: Partial<SpeechPreferences>) {
      this.speech = {
        ...this.speech,
        ...preferences,
      };
    },
    addPhraseToHistory(phrase: string) {
      if (this.history.length === 50) {
        this.history.shift();
      }
      this.history.push(phrase);
    },
    setRate(rate: number) {
      this.speech.rate = rate <= 0 ? 2 : rate;
    },
  },
  persist: {
    paths: ['speech'],
  },
});
