<template>
  <div class="menu" @keydown="handleKeydown">
    <PDVDerDefaulMenu
      v-if="menuStore.activeDerMenu === DerFlowEnum.DEFAULT"
      @keydown.esc.stop="
        () => menuStore.setActiveMainMenu(PDVMenusEnum.DEFAULT)
      "
    />
    <PDVDerEntities
      v-else-if="menuStore.activeDerMenu === DerFlowEnum.ENTITIES"
    />
    <PDVDerEntityOptions
      v-else-if="menuStore.activeDerMenu === DerFlowEnum.ENTITY_OPTIONS"
    />
    <PDVCreateEntity
      v-else-if="menuStore.activeDerMenu === DerFlowEnum.NEW_ENTITY"
    />
    <PDVDerAttributes
      v-else-if="menuStore.activeDerMenu === DerFlowEnum.ATTRS"
    />
    <PDVDerAttrOptions
      v-else-if="menuStore.activeDerMenu === DerFlowEnum.ATTR_OPTIONS"
    />
    <PDVCreateAttribute
      v-else-if="menuStore.activeDerMenu === DerFlowEnum.NEW_ATTR"
    />
    <PDVDerRelationships
      v-else-if="menuStore.activeDerMenu === DerFlowEnum.RELATIONSHIPS"
    />
    <PDVDerRelationshipOptions
      v-else-if="menuStore.activeDerMenu === DerFlowEnum.RELATIONSHIP_OPTIONS"
    />
    <PDVCreateRelationship
      v-else-if="menuStore.activeDerMenu === DerFlowEnum.NEW_RELATIONSHIP"
    />
  </div>
  <TeachingAssistantMenu />
</template>
<script setup lang="ts">
import { DerFlowEnum } from '~/composables/use-diagram';
import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';
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
<style scoped lang="css">
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
