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
defineProps({
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'button',
  },
});

const { speakPhrase } = useTTS();

const handleFocus = (event: any) => {
  speakPhrase(event.target.title);
};

const focusableRef = ref<HTMLElement | null>(null);
defineExpose({ focusableRef });
</script>
