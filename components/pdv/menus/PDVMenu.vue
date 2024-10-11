<template>
  <div class="pdv-menu-summary">
    <ul>
      <li class="menu-title">
        <FocusableElement ref="tableTitle" :title="menu.title">
          {{ menu.title }}
        </FocusableElement>
      </li>
      <li v-for="item in menu.items" :key="item.label" class="menu-item">
        <FocusableElement :title="item.label" @click="item.action">
          {{ item.label }}
        </FocusableElement>
      </li>
    </ul>
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

const handleInitalFocus = () => {
  tableTitle.value.focusableRef.focus();
  tts.addPhraseToQueue(menu.title);
  tts.speakPhraseQueue();
};

onMounted(async () => {
  await nextTick();
  handleInitalFocus();
});
</script>

<style scoped>
.pdv-menu-summary {
  display: table;
  width: 50%;
  text-align: center;
  border-spacing: 0;
  border-collapse: collapse;
}

.pdv-menu-summary ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  display: table-row-group;
  margin-bottom: 16px;
}

.pdv-menu-summary li {
  display: table-row;
  width: 100%;
}

.menu-title {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 16px !important;
  cursor: default;
  display: table-cell;
}

.menu-item {
  display: table-cell;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.focusable-element {
  outline: none;
  border: none;
  display: block;
  width: 100%;
  padding: 10px;
}

.focusable-element:focus {
  border: 1px solid #ff7043;
  background-color: #ffe0b2;
}
</style>
