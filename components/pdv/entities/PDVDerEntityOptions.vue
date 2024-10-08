<template>
  <PDVMenu :menu="menu" />
</template>
<script setup lang="ts">
import { FormScope } from '~/stores/menu.store';

const diagramTool = useDiagram();
const menuStore = useMenuOptions();
const { t } = useI18n();

const menu = ref({
  title: t('menu.der_flow.titles.entity_options', {
    diagram: diagramTool.getEntity()?.name,
  }),
  items: [
    {
      label: t('menu.der_flow.options.entity.attribute.create'),
      action: () => {
        menuStore.setActiveDerMenu(DerFlowEnum.NEW_ATTR);
        menuStore.setScope(FormScope.CREATE);
      },
    },
    {
      label: t('menu.der_flow.options.entity.attribute.navigate'),
      action: () => {
        menuStore.setActiveDerMenu(DerFlowEnum.ATTRS);
      },
    },
    {
      label: t('menu.der_flow.options.entity.attribute.read'),
    },
    {
      label: t('menu.der_flow.options.entity.update_name'),
      action: () => {
        menuStore.setActiveDerMenu(DerFlowEnum.NEW_ENTITY);
        menuStore.setScope(FormScope.EDIT);
      },
    },
    {
      label: t('menu.der_flow.options.entity.delete'),
      action: () => {
        diagramTool?.removeEntity();
        menuStore.setActiveDerMenu(DerFlowEnum.ENTITIES);
      },
    },
  ],
});
</script>
