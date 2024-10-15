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
const { shiftFlag } = defineProps({
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
});

const { speakPhrase } = useTTS();
const { t } = useI18n();

const handleFocus = (event: any) => {
  let phrase = event.target.title;
  phrase += shiftFlag ? `, ${t('message.shift_helper')}` : '';
  speakPhrase(phrase);
};

const focusableRef = ref<HTMLElement | null>(null);
defineExpose({ focusableRef });
</script>
