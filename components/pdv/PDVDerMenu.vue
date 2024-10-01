<template>
  <div class="menu" @keydown="handleKeydown">
    <PDVDerDefaulMenu v-if="menuStore.activeMenu === DerFlowEnum.DEFAULT" />
    <PDVDerEntities v-else-if="menuStore.activeMenu === DerFlowEnum.ENTITIES" />
    <PDVDerEntityOptions
      v-else-if="menuStore.activeMenu === DerFlowEnum.ENTITY_OPTIONS"
    />
    <PDVDerAttributes v-else-if="menuStore.activeMenu === DerFlowEnum.ATTRS" />
    <PDVDerAttrOptions
      v-else-if="menuStore.activeMenu === DerFlowEnum.ATTR_OPTIONS"
    />
    <PDVDerRelationshipOptions
      v-else-if="menuStore.activeMenu === DerFlowEnum.RELATIONSHIP_OPTIONS"
    />
    <PDVCreateEntity
      v-else-if="menuStore.activeMenu === DerFlowEnum.NEW_ENTITY"
    />
    <PDVCreateAttribute
      v-else-if="menuStore.activeMenu === DerFlowEnum.NEW_ATTR"
    />
  </div>
  <vueJsonPretty :data="diagramTool.diagram.value" />
</template>
<script setup lang="ts">
import { DerFlowEnum } from '~/composables/use-diagram';

const diagramTool = useDiagram();
const menuStore = useMenuOptions();
const { hotkeys } = useKeyboardNavigation();

const handleKeydown = (event: KeyboardEvent) => {
  hotkeys(event);
};

onBeforeMount(() => {
  diagramTool.createDiagram('teste');
});
</script>
<style scoped>
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
