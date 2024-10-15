<template>
  <PDVMenu :menu="menu" />
</template>
<script setup lang="ts">
import { DerFlowEnum } from '~/src/interfaces/pdv-menu';
import { FormScope } from '~/stores/menu.store';

const diagramTool = useDiagram();
const menuStore = useMenuOptions();
const { t } = useI18n();

const menu = ref({
  title: t('menu.der_flow.titles.attribute_options', {
    attribute: diagramTool.getRelationship()?.name,
  }),
  items: [
    {
      label: t('menu.der_flow.options.relationship.edit'),
      action: () => {
        menuStore.setActiveDerMenu(DerFlowEnum.NEW_RELATIONSHIP);
        menuStore.setScope(FormScope.EDIT);
      },
    },
    {
      label: t('menu.der_flow.options.relationship.delete'),
      action: () => {
        diagramTool?.removeRelationship();
        menuStore.setActiveDerMenu(DerFlowEnum.RELATIONSHIPS);
      },
    },
  ],
});
</script>
