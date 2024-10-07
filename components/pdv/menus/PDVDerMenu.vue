<template>
  <div class="menu" @keydown="handleKeydown">
    <PDVDerDefaulMenu v-if="menuStore.activeMenu === DerFlowEnum.DEFAULT" />
    <PDVDerEntities v-else-if="menuStore.activeMenu === DerFlowEnum.ENTITIES" />
    <PDVDerEntityOptions
      v-else-if="menuStore.activeMenu === DerFlowEnum.ENTITY_OPTIONS"
    />
    <PDVCreateEntity
      v-else-if="menuStore.activeMenu === DerFlowEnum.NEW_ENTITY"
    />
    <PDVDerAttributes v-else-if="menuStore.activeMenu === DerFlowEnum.ATTRS" />
    <PDVDerAttrOptions
      v-else-if="menuStore.activeMenu === DerFlowEnum.ATTR_OPTIONS"
    />
    <PDVCreateAttribute
      v-else-if="menuStore.activeMenu === DerFlowEnum.NEW_ATTR"
    />
    <PDVDerRelationships
      v-else-if="menuStore.activeMenu === DerFlowEnum.RELATIONSHIPS"
    />
    <PDVDerRelationshipOptions
      v-else-if="menuStore.activeMenu === DerFlowEnum.RELATIONSHIP_OPTIONS"
    />
    <PDVCreateRelationship
      v-else-if="menuStore.activeMenu === DerFlowEnum.NEW_RELATIONSHIP"
    />
  </div>
  <TeachingAssistantMenu />
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
