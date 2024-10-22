<template>
  <div ref="diagramContainer" class="diagram">
    <!-- Camada para linhas -->
    <svg ref="linesLayer" class="lines-layer">
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

    <!-- Entidades e Relacionamentos -->
    <PDVEntity
      v-for="(entity, index) in diagramMock.entities"
      :id="entity.id"
      :key="entity.id"
      :entity="entity"
      :initial-x="positions[index].x"
      :initial-y="positions[index].y"
      @update="updateLines"
    />
    <PDVRelationship
      v-for="(relationship, index) in diagramMock.relationships"
      :id="relationship.id"
      :key="relationship.id"
      :relationship="relationship"
      :initial-x="positions[index].x"
      :initial-y="positions[index].y"
      @update="updateLines"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { diagramMock } from '~/mock/diagram.mock';

const diagramContainer = ref(null);
const linesLayer = ref(null);
const positions = ref([]);
const lines = ref([]); // Armazena as coordenadas das linhas
const window = useWindowSize();

const spacing = 50;
const itemWidth = 250;
const itemHeight = 250;

// Função para calcular as posições iniciais das entidades e relacionamentos
const calculatePositions = () => {
  const itemsInRow = Math.floor(window.width.value / (itemWidth + spacing));

  positions.value = diagramMock.entities.map((_, index) => {
    const x = (index % itemsInRow) * (itemWidth + spacing); // Posição x
    const y = Math.floor(index / itemsInRow) * (itemHeight + spacing); // Posição y
    return { x, y };
  });
};

// Função para calcular as coordenadas das extremidades entre os elementos
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

  // Encontrar a distância mínima entre os pontos das bordas de A e B
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

// Função para calcular as coordenadas das linhas entre entidades e relacionamentos
const updateLines = () => {
  lines.value = diagramMock.relationships
    .map((relationship) => {
      const entityA = document.getElementById(relationship.entityAId);
      const entityB = document.getElementById(relationship.entityBId);
      const relationshipEl = document.getElementById(relationship.id);

      if (entityA && relationshipEl && entityB) {
        const entityABox = entityA.getBoundingClientRect();
        const entityBBox = entityB.getBoundingClientRect();
        const relationshipBox = relationshipEl.getBoundingClientRect();

        // Obter os pontos de conexão mais próximos entre os elementos
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
          }, // Linha de A para relacionamento
          {
            x1: bestPointR2.x,
            y1: bestPointR2.y,
            x2: bestPointB.x,
            y2: bestPointB.y,
          }, // Linha do relacionamento para B
        ];
      }
      return null;
    })
    .flat();
};

onMounted(() => {
  updateLines();
});

onBeforeMount(() => {
  calculatePositions();
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
  padding: 20px;
  position: relative;
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
