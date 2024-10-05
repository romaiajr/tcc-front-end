export type SpeechPreferences = {
  rate: number;
  lang: string;
  voice: SpeechSynthesisVoice | null;
};

export const useTtsStore = defineStore('tts', {
  state: (): { speech: SpeechPreferences; history: string[] } => ({
    speech: {
      rate: 3,
      lang: 'pt-BR',
      voice: null,
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
  },
  persist: {
    paths: ['speech'],
  },
});
