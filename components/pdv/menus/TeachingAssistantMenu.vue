<template>
  <div class="teaching-assistant-menu">
    <vueJsonPretty
      v-if="diagramTool.diagram.value"
      :data="diagramTool.diagram.value"
      class="der-json"
    />
    <div ref="phraseHistory" class="phrase-history">
      <ul v-if="ttsStore.history.length">
        <li v-for="(phrase, index) in ttsStore.history" :key="index">
          {{ phrase }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const diagramTool = useDiagram();
const ttsStore = useTtsStore();
const phraseHistory = ref();

watch(
  ttsStore.history,
  async () => {
    await nextTick();
    if (phraseHistory.value) {
      phraseHistory.value.scrollTop = phraseHistory.value.scrollHeight;
    }
  },
  { deep: true },
);
</script>
<style scoped css>
.teaching-assistant-menu {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 32px;
  height: 200px;
}
.der-json,
.phrase-history {
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  flex: 1 1 50%;
  padding: 8px;
}

.phrase-history li:last-child {
  font-weight: bold;
}
</style>
