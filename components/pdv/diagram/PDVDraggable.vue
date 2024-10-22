<template>
  <div ref="el" class="draggable" :style="style" style="position: fixed">
    <slot />
  </div>
</template>
<script setup lang="ts">
interface PDVDraggable {
  initialX: number;
  initialY: number;
}

const el = ref<HTMLElement | null>(null);
const { initialX, initialY } = defineProps<PDVDraggable>();
const emit = defineEmits(['update']);

const { x, y, style } = useDraggable(el, {
  initialValue: { x: initialX, y: initialY },
  preventDefault: true,
  onMove: () => {
    const container = document.querySelector('.diagram') as HTMLElement;
    if (!el.value || !container) return;

    const bounds = container.getBoundingClientRect();
    const elRect = el.value.getBoundingClientRect();

    if (x.value < 0) x.value = 0;
    if (x.value + elRect.width > bounds.width)
      x.value = bounds.width - elRect.width;

    if (y.value < 0) y.value = 0;
    if (y.value + elRect.height > bounds.height)
      y.value = bounds.height - elRect.height;

    el.value.style.transform = `translate(${x}px, ${y}px)`;
    emit('update', { x: x.value, y: y.value });
  },
});
</script>
<style scoped lang="css">
.draggable {
  padding: 12px;
  user-select: none;
  cursor: move;
  position: fixed;
}
</style>
