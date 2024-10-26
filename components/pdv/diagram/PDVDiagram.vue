<template>
  <div ref="diagramContainer" class="diagram">
    <vueDraggableResizable
      v-for="entity in diagramTool.diagram.value.entities"
      :id="entity.id"
      :key="entity.id"
      :parent="true"
      :resizable="false"
      :x="entity.position.x"
      :y="entity.position.y"
      :w="'auto'"
      :h="'auto'"
      :disable-user-select="true"
      class="draggable"
      @drag-stop="(...event) => handleEntityDragStop(entity.id, event)"
    >
      <PDVEntity :entity="entity" />
    </vueDraggableResizable>
    <vueDraggableResizable
      v-for="relationship in diagramTool.diagram.value.relationships"
      :id="relationship.id"
      :key="relationship.id"
      :parent="true"
      :resizable="false"
      :x="relationship.position.x"
      :y="relationship.position.y"
      :w="'auto'"
      :h="'auto'"
      :disable-user-select="true"
      class="draggable"
      @drag-stop="
        (...event) => handleRelationshipDragStop(relationship.id, event)
      "
    >
      <PDVRelationship :relationship="relationship" />
    </vueDraggableResizable>
  </div>
</template>

<script setup lang="ts">
import type {
  DerEntity,
  DerRelationship,
  DiagramPosition,
} from '~/src/interfaces/der-diagram';

const diagramContainer = ref(null);
const diagramTool = useDiagram();

let entitiesLength = 0;
let relationshipsLength = 0;
let lastElementId: string;
const spacing = 16;
let actualY = spacing;
let actualX = spacing;

const calculateEntityPosition = (entity: DerEntity) => {
  calculatePositionForElement(entity, diagramTool.updateEntityPosition);
};

const calculateRelationshipPosition = (relationship: DerRelationship) => {
  calculatePositionForElement(
    relationship,
    diagramTool.updateRelationshipPosition,
  );
};

const calculatePositionForElement = (
  element: DerEntity | DerRelationship,
  updateFn: (id: string, pos: DiagramPosition) => void,
) => {
  const newPosition = calculatePosition(element.position);
  lastElementId = element.id;
  if (newPosition !== element.position) {
    updateFn(element.id, newPosition);
  }
};

const calculatePosition = (position: DiagramPosition): DiagramPosition => {
  const currentPos = position;
  const containerRect = diagramContainer.value?.getBoundingClientRect();
  if (currentPos?.x !== null && currentPos?.y !== null) {
    return position;
  }

  if (lastElementId) {
    const previousElement = document.getElementById(lastElementId);
    if (previousElement) {
      const previousElementWidth =
        previousElement.getBoundingClientRect().width;
      actualX = actualX + (previousElementWidth ?? 0) + spacing * 8;
    }

    if (shouldStartNewLine(containerRect.width)) {
      actualX = spacing;
      actualY = actualY + spacing * 15;
    }
  }

  return {
    x: actualX,
    y: actualY,
  };
};

const shouldStartNewLine = (containerWidth: number): boolean => {
  return actualX + 250 > containerWidth;
};

const handleEntityDragStop = (id: string, position: number[]) => {
  diagramTool.updateEntityPosition(id, { x: position[0], y: position[1] });
};

const handleRelationshipDragStop = (id: string, position: number[]) => {
  diagramTool.updateRelationshipPosition(id, {
    x: position[0],
    y: position[1],
  });
};

watch(
  () => ({
    entities: diagramTool.diagram.value?.entities,
    relationships: diagramTool.diagram.value?.relationships,
  }),
  async ({ entities, relationships }) => {
    if (entities && entities?.length > entitiesLength) {
      calculateEntityPosition(entities[entities.length - 1] as DerEntity);
      entitiesLength = entities.length;
    }
    if (relationships && relationships?.length > relationshipsLength) {
      calculateRelationshipPosition(
        relationships[relationships.length - 1] as DerRelationship,
      );
      relationshipsLength = relationships.length;
    }
    await nextTick();
  },
  { deep: true },
);

onMounted(async () => {
  const diagram = diagramTool.diagram.value;
  entitiesLength = diagram?.entities.length ?? 0;
  relationshipsLength = diagram?.relationships.length ?? 0;
  diagram?.entities.forEach((e) => {
    calculateEntityPosition(e as DerEntity);
  });
  diagram?.relationships.forEach((r) => {
    calculateRelationshipPosition(r as DerRelationship);
  });

  await nextTick();
});
</script>

<style scoped>
.diagram {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  height: 100dvh;
  border: var(--border-style);
  margin-top: 32px;
  .draggable {
    border: none;
  }
}

.lines-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
