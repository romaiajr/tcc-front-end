<template>
  <v-text-field
    v-model="inputValue"
    class="pdv-input"
    :label="title"
    hide-details
    variant="underlined"
    :tabindex="computedTabindex"
    :title="title"
    color="primary"
    @focus="handleFocus"
    @update:model-value="handleInput"
    @keydown.enter="handleSubmit"
  />
</template>
<script setup lang="ts">
interface PDVInputProps {
  title: string;
  tabindex?: number;
  submit: (fieldValue: string) => any;
}

const { tabindex, submit } = defineProps<PDVInputProps>();

const inputValue = ref();

const computedTabindex = computed(() =>
  tabindex !== undefined ? tabindex : 0,
);

const { speak } = useTTS();

// REVIEW - Qual retorno é melhor? Necessário?

const handleInput = (value: string) => {
  speak(value);
};

// const handleBlur = (event: any) => {
//   speak(event.target.value);
// };

const handleFocus = (event: any) => {
  speak(event.target.title);
};

const handleSubmit = () => {
  submit(inputValue.value);
};
</script>
