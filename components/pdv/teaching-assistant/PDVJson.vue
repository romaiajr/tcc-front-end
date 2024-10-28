<template>
  <vueJsonPretty :data="diagramWithoutIds" />
</template>
<script setup lang="ts">
const diagramTool = useDiagram();
const { t } = useI18n();

function omitIds(data: any) {
  return {
    ...data,
    entities: data.entities.map(({ id, ...entity }: any) => ({
      ...entity,
      attrs: entity.attrs.map(({ id, ...attr }: any) => attr),
    })),
    relationships: data.relationships.map(
      ({
        id,
        entityAId,
        entityBId,
        type,
        cardinality,
        ...relationship
      }: any) => ({
        ...relationship,
        type: t(type),
        cardinality: t(cardinality),
      }),
    ),
  };
}

const diagramWithoutIds = computed(() => {
  return diagramTool.parsedDiagram.value
    ? omitIds(diagramTool.parsedDiagram.value)
    : null;
});
</script>
