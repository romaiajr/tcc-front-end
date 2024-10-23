<template>
  <PDVDraggable
    :initial-x="relationship.position?.x"
    :initial-y="relationship.position?.y"
  >
    <svg :width="width" :height="height">
      <!-- Renderiza a forma correta dependendo do tipo de relacionamento -->
      <template v-if="relationship.type === TypeOptions.COMMON">
        <polygon
          :points="getDiamondPoints(width, height)"
          class="shape common"
        />
      </template>
      <template v-else-if="relationship.type === TypeOptions.ASSOCIATIVE">
        <rect :width="width" :height="height" class="shape associative" />
      </template>
      <template v-else-if="relationship.type === TypeOptions.INHERITANCE">
        <polygon
          :points="getTrianglePoints(width, height)"
          class="shape inheritance"
        />
      </template>
      <template v-else-if="relationship.type === TypeOptions.WEAK">
        <!-- Dois losangos sobrepostos com mais espaço entre eles -->
        <polygon :points="getDiamondPoints(width, height)" class="shape weak" />
        <polygon
          :points="getDiamondPoints(width - 14, height - 14)"
          class="shape weak-overlay"
          :transform="`translate(7, 7)`"
        />
      </template>
      <text
        x="50%"
        :y="relationship.type === TypeOptions.INHERITANCE ? '80%' : '50%'"
        text-anchor="middle"
        dominant-baseline="middle"
        class="relationship-text"
      >
        {{ relationship.name.toLowerCase() }}
      </text>
    </svg>
  </PDVDraggable>
</template>

<script setup lang="ts">
import {
  TypeOptions,
  type DerRelationship,
} from '~/src/interfaces/der-diagram';

interface PDVRelationshipProps {
  relationship: DerRelationship;
}

const props = defineProps<PDVRelationshipProps>();
const { relationship } = toRefs(props);

const getDiamondPoints = (width: number, height: number) => {
  return `${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2}`;
};

const getTrianglePoints = (width: number, height: number) => {
  return `0,${height} ${width / 2},0 ${width},${height}`;
};

const textLength = relationship.value.name.length;
const fontSize = 14;
const width = textLength * 10 > 100 ? textLength * 10 : 100;
const height = Math.max(60, fontSize * 2);
</script>

<style scoped>
.shape {
  fill: #fff;
  stroke: #000;
  stroke-width: 1;
}

.weak-overlay {
  fill: #fff;
  stroke-width: 1;
  stroke: #000;
}

.relationship-text {
  font-size: 14px;
  fill: #333;
}

.lines-layer {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none; /* Para não interferir no comportamento de arrastar */
}

line {
  stroke-width: 2;
  stroke: #000;
}
</style>
