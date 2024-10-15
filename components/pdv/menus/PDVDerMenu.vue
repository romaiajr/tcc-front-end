<template>
  <PDVDerDefaulMenu v-if="menuStore.activeDerMenu === DerFlowEnum.DEFAULT" />
  <PDVDerEntities
    v-else-if="menuStore.activeDerMenu === DerFlowEnum.ENTITIES"
  />
  <PDVDerEntityOptions
    v-else-if="menuStore.activeDerMenu === DerFlowEnum.ENTITY_OPTIONS"
  />
  <PDVCreateEntity
    v-else-if="menuStore.activeDerMenu === DerFlowEnum.NEW_ENTITY"
  />
  <PDVDerAttributes v-else-if="menuStore.activeDerMenu === DerFlowEnum.ATTRS" />
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
</template>
<script setup lang="ts">
import { DerFlowEnum } from '~/src/interfaces/pdv-menu';

const diagramTool = useDiagram();
const menuStore = useMenuOptions();

onBeforeMount(() => {
  diagramTool.createDiagram('teste');
});
</script>
<style scoped lang="css">
.teste {
  width: 100%;
}
</style>
