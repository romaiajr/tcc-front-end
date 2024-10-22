<template>
  <div class="pdv-menu-summary">
    <table>
      <thead>
        <tr class="menu-item">
          <th colspan="2">
            <FocusableElement ref="tableTitle" :title="menu.title">
              {{ menu.title }}
            </FocusableElement>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in menu.items" :key="item.label" class="menu-item">
          <td colspan="2">
            <FocusableElement
              :title="item.label"
              :shift-flag="Boolean(item.infoText)"
              :complement-text="item.complementText"
              @click="item.action"
              @keydown.shift="() => readInfoText($t(item.infoText ?? ''))"
            >
              {{ item.label }}
            </FocusableElement>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '~/src/interfaces/pdv-menu';

interface PDVMenuProps {
  menu: Menu;
}

const { menu } = defineProps<PDVMenuProps>();
const tts = useTTS();

const tableTitle = ref();

const readInfoText = (infoText: string) => {
  if (infoText) {
    tts.speakPhrase(infoText);
  }
};

onMounted(async () => {
  await nextTick();
  tableTitle.value.focusableRef.focus();
});
</script>

<style scoped>
.pdv-menu-summary {
  width: 50%;
  text-align: center;
  border-collapse: collapse;
}

table {
  border-spacing: 0;
  width: 100%;
}

th {
  border: var(--border-style);
  font-size: 1.5rem;
  font-weight: bold;
  background-color: var(--neutral-color);
  cursor: default;
}

.menu-item td {
  background-color: var(--neutral-color);
  border: var(--border-style);
  cursor: pointer;
}

.menu-item td:focus-within,
.menu-item th:focus-within {
  border: var(--focus-border-style);
  background-color: var(--focus-background-color);
}
</style>
