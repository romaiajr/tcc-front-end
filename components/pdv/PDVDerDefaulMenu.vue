<template>
  <PDVMenu :menu="menu" />
</template>
<script setup lang="ts">
import { FormScope } from '~/stores/menu.store';

const diagramTool = useDiagram();
const menuStore = useMenuOptions();
const { t } = useI18n();

const menu = ref();

onBeforeMount(() => {
  menu.value = {
    title: t('menu.der_flow.titles.default'),
    items: [
      {
        label: t('menu.der_flow.options.entity.create'),
        action: () => {
          menuStore.setActiveMenu(DerFlowEnum.NEW_ENTITY);
          menuStore.setScope(FormScope.CREATE);
        },
      },
      {
        label: t('menu.der_flow.options.entity.navigate', {
          diagram: diagramTool.diagram.value?.name,
        }),
        action: () => {
          menuStore.setActiveMenu(DerFlowEnum.ENTITIES);
        },
      },
      {
        label: t('menu.der_flow.options.entity.read', {
          diagram: diagramTool.diagram.value?.name,
        }),
      },
      {
        label: t('menu.der_flow.options.relationship.create'),
        action: () => {
          menuStore.setActiveMenu(DerFlowEnum.NEW_RELATIONSHIP);
          menuStore.setScope(FormScope.CREATE);
        },
      },
      {
        label: t('menu.der_flow.options.relationship.navigate'),
        action: () => {
          menuStore.setActiveMenu(DerFlowEnum.RELATIONSHIPS);
        },
      },
      {
        label: t('menu.der_flow.options.relationship.read'),
      },
      {
        label: t('menu.der_flow.options.diagram.read'),
      },
    ],
  };
});
</script>
