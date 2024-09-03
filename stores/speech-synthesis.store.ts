export type SpeechPreferences = {
  rate: number;
  lang: string;
  voice: SpeechSynthesisVoice | null;
};

export const useConfigStore = defineStore('config', {
  state: (): { speech: SpeechPreferences } => ({
    speech: {
      rate: 3,
      lang: 'pt-BR',
      voice: null,
    },
  }),
  actions: {
    setSpeechPreferences(preferences: Partial<SpeechPreferences>) {
      this.speech = {
        ...this.speech,
        ...preferences,
      };
    },
  },
  persist: true,
});
