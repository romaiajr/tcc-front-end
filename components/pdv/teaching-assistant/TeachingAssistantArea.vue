<template>
  <div class="teaching-assistant-menu">
    <PDVJson v-if="diagramTool.parsedDiagram.value" class="assistant-item" />
    <PDVTtsHistory class="assistant-item" />
  </div>
  <PDVDiagram v-if="diagramTool.diagram.value" />
</template>
<script setup lang="ts">
const diagramTool = useDiagram();
</script>
<style scoped css>
.teaching-assistant-menu {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 32px;
  height: 200px;
}
.assistant-item {
  height: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  flex: 1 1 50%;
  padding: 8px;
}
</style>
