<template>
  <div class="focusable-input-container">
    <p class="focusable-input-title">
      {{ title }}
    </p>
    <input
      ref="focusableInput"
      v-model="inputValue"
      class="focusable-input"
      :title="title"
      @focus="handleFocus"
      @input="handleInput"
      @keydown.enter="handleSubmit"
    />
  </div>
</template>
<script setup lang="ts">
interface FocusableInputProps {
  title: string;
  modelValue?: string;
}

const props = defineProps<FocusableInputProps>();

const inputValue = ref(props.modelValue);
let isInternalUpdate = false;

const { addPhraseToQueue, speakPhraseQueue, speakPhrase } = useTTS();

const emit = defineEmits(['submit', 'update:modelValue']);

const handleInput = (event: any) => {
  if (inputValue.value) {
    speakPhrase(event.target.value.charAt(inputValue.value.length - 1));
    addPhraseToQueue(event.target.value);
    speakPhraseQueue();
  }
};

const handleFocus = (event: any) => {
  speakPhrase(event.target.title);
};

const handleSubmit = () => {
  emit('submit', inputValue.value);
};

watch(inputValue, (newValue) => {
  if (!isInternalUpdate) {
    emit('update:modelValue', newValue);
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== inputValue.value) {
      isInternalUpdate = true;
      inputValue.value = newValue;
      isInternalUpdate = false;
    }
  },
  { deep: true },
);

const focusableInput = ref<HTMLElement | null>(null);
onMounted(async () => {
  await nextTick();
  focusableInput.value?.focus();
});
</script>
<style scoped>
.focusable-input-container {
  display: flex;
  flex-direction: column;
}

.focusable-input-title {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px;
  cursor: default;
}

.focusable-input {
  padding: 10px;
  background-color: var(--neutral-color);
  border: var(--border-style);
  border-radius: 8px;
  cursor: pointer;
}

input:focus {
  background-color: var(--focus-background-color);
  outline: var(--focus-border-style);
}
</style>
