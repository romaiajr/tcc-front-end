<script setup lang="ts">
import FocusableInput from '../FocusableInput.vue';

const diagramTool = useDiagram();
</script>

<template>
  <FocusableInput
    :title="$t('menu.der_flow.options.entity.name')"
    :submit="diagramTool.createEntity"
  />
</template>
