<template>
  <div ref="diagramContainer" class="diagram">
    <svg v-if="lines" ref="linesLayer" class="lines-layer">
      <line
        v-for="(line, index) in lines"
        :key="index"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        stroke="black"
        stroke-width="2"
      />
    </svg>

    <PDVEntity
      v-for="entity in diagramTool.diagram.value.entities"
      :id="entity.id"
      :key="entity.id"
      :entity="entity"
      @update="updateLines"
    />
    <PDVRelationship
      v-for="relationship in diagramTool.diagram.value.relationships"
      :id="relationship.id"
      :key="relationship.id"
      :relationship="relationship"
      @update="updateLines"
    />
  </div>
</template>

<script setup lang="ts">
let internalUpdate = false;
const diagramContainer = ref(null);
const linesLayer = ref(null);
const diagramTool = useDiagram();
const lines = ref([]);

const spacing = 20;

const calculatePositions = () => {
  internalUpdate = true;
  const diagram = diagramTool.diagram.value;
  const elements = [
    ...(diagram?.entities || []),
    ...(diagram?.relationships || []),
  ];

  if (elements.length) {
    const containerRect = diagramContainer.value.getBoundingClientRect();
    const containerOffsetX = containerRect.left;
    const containerOffsetY = containerRect.top;
    let actualY = spacing;
    let actualX = spacing;
    let newLine = true;
    elements.forEach((e, index) => {
      const currentPos = e.position;
      if (!newLine) {
        const previousElementWidth = document
          .getElementById(elements[index - 1].id)
          ?.getBoundingClientRect().width;

        const actualElement = document.getElementById(e.id);

        if (previousElementWidth) {
          actualX = actualX + previousElementWidth + spacing;

          const possiblyWidth =
            actualX +
            (actualElement
              ? actualElement.getBoundingClientRect().width
              : e.name.length * 5);

          if (possiblyWidth > containerRect.width) {
            actualX = spacing;
            actualY = actualY + spacing * 10;
            newLine = true;
          }
        }
      } else {
        newLine = false;
      }

      const adjustedX = actualX + containerOffsetX;
      const adjustedY = actualY + containerOffsetY;

      if (
        !currentPos ||
        currentPos.x !== adjustedX ||
        currentPos.y !== adjustedY
      ) {
        e.position = {
          x: adjustedX,
          y: adjustedY,
        };
        diagramTool.updateEntityPosition(e.id, e.position);
      }
    });
  }

  internalUpdate = false;
};

watch(
  () => [
    diagramTool.diagram.value?.entities,
    diagramTool.diagram.value?.relationships,
  ],
  () => {
    if (!internalUpdate) {
      calculatePositions();
      updateLines();
    }
  },
  { deep: true },
);

const getClosestPoints = (rectA, rectB) => {
  const pointsA = {
    top: { x: rectA.left + rectA.width / 2, y: rectA.top },
    right: { x: rectA.right, y: rectA.top + rectA.height / 2 },
    bottom: { x: rectA.left + rectA.width / 2, y: rectA.bottom },
    left: { x: rectA.left, y: rectA.top + rectA.height / 2 },
  };

  const pointsB = {
    top: { x: rectB.left + rectB.width / 2, y: rectB.top },
    right: { x: rectB.right, y: rectB.top + rectB.height / 2 },
    bottom: { x: rectB.left + rectB.width / 2, y: rectB.bottom },
    left: { x: rectB.left, y: rectB.top + rectB.height / 2 },
  };

  let minDist = Infinity;
  let bestPointA = pointsA.top;
  let bestPointB = pointsB.top;

  Object.keys(pointsA).forEach((keyA) => {
    Object.keys(pointsB).forEach((keyB) => {
      const dist = Math.hypot(
        pointsA[keyA].x - pointsB[keyB].x,
        pointsA[keyA].y - pointsB[keyB].y,
      );
      if (dist < minDist) {
        minDist = dist;
        bestPointA = pointsA[keyA];
        bestPointB = pointsB[keyB];
      }
    });
  });

  return { bestPointA, bestPointB };
};

const updateLines = () => {
  lines.value = diagramTool.diagram.value.relationships
    .map((relationship) => {
      const entityA = document.getElementById(relationship.entityAId);
      const entityB = document.getElementById(relationship.entityBId);
      const relationshipEl = document.getElementById(relationship.id);

      if (entityA && relationshipEl && entityB) {
        const entityABox = entityA.getBoundingClientRect();
        const entityBBox = entityB.getBoundingClientRect();
        const relationshipBox = relationshipEl.getBoundingClientRect();

        const { bestPointA, bestPointB: bestPointR } = getClosestPoints(
          entityABox,
          relationshipBox,
        );
        const { bestPointA: bestPointR2, bestPointB } = getClosestPoints(
          relationshipBox,
          entityBBox,
        );

        return [
          {
            x1: bestPointA.x,
            y1: bestPointA.y,
            x2: bestPointR.x,
            y2: bestPointR.y,
          },
          {
            x1: bestPointR2.x,
            y1: bestPointR2.y,
            x2: bestPointB.x,
            y2: bestPointB.y,
          },
        ];
      }
      return null;
    })
    .flat();
};
</script>

<style scoped>
.diagram {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  height: 100dvh;
  border: var(--border-style);
  padding: 20px;
  position: relative;
  margin-top: 32px;
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
