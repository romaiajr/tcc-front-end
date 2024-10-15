<template>
  <component
    :is="tag"
    v-bind="$attrs"
    ref="focusableRef"
    class="focusable-element"
    :title="title"
    @focus="handleFocus"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
const { shiftFlag, complementText } = defineProps({
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'button',
  },
  shiftFlag: {
    type: Boolean,
    default: false,
  },
  complementText: {
    type: String,
    default: '',
  },
});

const { speakPhrase, speakPhraseQueue, addPhraseToQueue } = useTTS();
const { t } = useI18n();

const handleFocus = (event: any) => {
  const phrase = event.target.title;
  if (!shiftFlag && !complementText) {
    speakPhrase(phrase);
    return;
  }
  addPhraseToQueue(phrase);
  if (shiftFlag) {
    addPhraseToQueue(t('message.shift_helper'));
  } else if (complementText) {
    addPhraseToQueue(complementText);
  }
  speakPhraseQueue();
};

const focusableRef = ref<HTMLElement | null>(null);
defineExpose({ focusableRef });
</script>
