<template>
  <PDVMenu :menu="menu" />
</template>
<script setup lang="ts">
import { DerFlowEnum } from '~/src/interfaces/pdv-menu';
import { FormScope } from '~/stores/menu.store';

const diagramTool = useDiagram();
const menuStore = useMenuOptions();
const { t } = useI18n();
const tts = useTTS();

const menu = ref();

onBeforeMount(() => {
  menu.value = {
    title: t('menu.der_flow.titles.default'),
    items: [
      {
        label: t('menu.der_flow.options.entity.create'),
        action: () => {
          menuStore.setActiveDerMenu(DerFlowEnum.NEW_ENTITY);
          menuStore.setScope(FormScope.CREATE);
        },
        infoText: t('sql.explanation.entity'),
      },
      {
        label: t('menu.der_flow.options.entity.navigate', {
          diagram: diagramTool.diagram.value?.name,
        }),
        action: () => {
          if (hasEntities()) {
            menuStore.setActiveDerMenu(DerFlowEnum.ENTITIES);
          }
        },
      },
      {
        label: t('menu.der_flow.options.entity.read', {
          diagram: diagramTool.diagram.value?.name,
        }),
        action: () => {
          if (hasEntities()) {
            diagramTool.readEntities();
          }
        },
      },
      {
        label: t('menu.der_flow.options.relationship.create'),
        action: createRelationships,
        infoText: t('sql.explanation.relationship'),
      },
      {
        label: t('menu.der_flow.options.relationship.navigate'),
        action: () => {
          if (hasRelationships()) {
            menuStore.setActiveDerMenu(DerFlowEnum.RELATIONSHIPS);
          }
        },
      },
      {
        label: t('menu.der_flow.options.relationship.read'),
        action: () => {
          if (hasRelationships()) {
            // TODO - Read relationships
          }
        },
      },
      {
        label: t('menu.der_flow.options.diagram.read'),
      },
    ],
  };
});

function hasEntities() {
  if (
    diagramTool.diagram.value &&
    diagramTool.diagram.value?.entities.length === 0
  ) {
    tts.speakPhrase(t('message.has_no_entities'));
    return false;
  }
  return true;
}

function hasRelationships() {
  if (
    diagramTool.diagram.value &&
    diagramTool.diagram.value?.relationships.length === 0
  ) {
    tts.speakPhrase(t('message.has_no_relationships'));
    return false;
  }
  return true;
}

function createRelationships() {
  if (
    diagramTool.diagram.value &&
    diagramTool.diagram.value?.entities.length < 2
  ) {
    tts.speakPhrase(t('message.has_not_two_entites'));
  } else {
    menuStore.setActiveDerMenu(DerFlowEnum.NEW_RELATIONSHIP);
    menuStore.setScope(FormScope.CREATE);
  }
}
</script>
