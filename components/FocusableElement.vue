<template>
  <component
    :is="tag"
    v-bind="$attrs"
    ref="focusableRef"
    class="focusable-element"
    :tabindex="computedTabindex"
    :title="title"
    @focus="handleFocus"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'button',
  },
  tabindex: {
    type: [Number, String],
    default: 0,
  },
});

const computedTabindex = computed(() =>
  props.tabindex !== undefined ? props.tabindex : 0,
);

const { speak } = useTTS();

const handleFocus = (event: any) => {
  speak(event.target.title);
};

const focusableRef = ref<HTMLElement | null>(null);
defineExpose({ focusableRef });
</script>
