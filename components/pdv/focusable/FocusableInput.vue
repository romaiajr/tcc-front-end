<template>
  <div class="pdv-input-container">
    <p class="pdv-input-title">
      {{ title }}
    </p>
    <input
      ref="focusableInput"
      v-model="inputValue"
      class="pdv-input"
      :tabindex="computedTabindex"
      :title="title"
      @focus="handleFocus"
      @input="handleInput"
      @keydown.enter="handleSubmit"
    />
  </div>
</template>
<script setup lang="ts">
interface PDVInputProps {
  title: string;
  modelValue?: string;
  tabindex?: number;
}

const props = defineProps<PDVInputProps>();

const inputValue = ref(props.modelValue);
let isInternalUpdate = false;

const computedTabindex = computed(() =>
  props.tabindex !== undefined ? props.tabindex : 0,
);

const { addPhraseToQueue, speakPhraseQueue, speakPhrase } = useTTS();

const emit = defineEmits(['submit', 'update:modelValue']);

const handleInput = (event: any) => {
  speakPhrase(event.target.value.charAt(inputValue.value.length - 1));
  addPhraseToQueue(event.target.value);
  speakPhraseQueue();
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
.pdv-input-container {
  display: flex;
  flex-direction: column;
}

.pdv-input-title {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px;
  cursor: default;
}

.pdv-input {
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
