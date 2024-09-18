<template>
  <v-table class="pdv-menu-summary" @keydown="handleKeydown">
    <thead>
      <tr>
        <th class="text-center">
          <FocusableElement ref="titleElement" :title="menu.title" tag="text">
            {{ menu.title }}
          </FocusableElement>
        </th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr v-for="item in menu.items" :key="item.label">
        <td>
          <FocusableElement :title="item.label" @click="item.action">
            {{ item.label }}
          </FocusableElement>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup lang="ts">
import FocusableElement from '../FocusableElement.vue';
import type { Menu } from '~/src/interfaces/pdv-menu';

interface PDVMenuProps {
  menu: Menu;
}

const { menu } = defineProps<PDVMenuProps>();

const { hotkeys } = useKeyboardNavigation();

const handleKeydown = (event: KeyboardEvent) => {
  hotkeys(event);
};

const titleElement = ref<typeof FocusableElement | null>(null);

onMounted(async () => {
  await nextTick();
  if (titleElement.value) {
    titleElement.value.focusableRef.focus();
  }
});
</script>

<style scoped>
.pdv-menu-summary {
  display: flex;
  justify-content: center;
  align-items: center;
}

.focusable-element {
  display: inline-block;
  width: 100%;
  padding: 10px;
  text-align: center;
  transition: background-color 0.3s ease;
}

.menu-item:nth-child(n + 2) .focusable-element {
  cursor: pointer;
}

.focusable-element:focus {
  outline: none;
  background-color: #e6e6ff;
}
</style>
