<template>
  <v-container>
    <div class="menu" @keydown="handleKeydown">
      <PDVMainMenu v-if="menu.activeMainMenu === PDVMenusEnum.DEFAULT" />
      <PDVDerMenu v-else-if="menu.activeMainMenu === PDVMenusEnum.PROJECTS" />
      <PDVTtsMenu v-else-if="menu.activeMainMenu === PDVMenusEnum.TTS" />
    </div>
    <TeachingAssistantMenu />
  </v-container>
</template>
<script setup lang="ts">
import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';
const menu = useMenuOptions();
const { hotkeys } = useKeyboardNavigation();

const handleKeydown = (event: KeyboardEvent) => {
  hotkeys(event);
};
</script>
<style lang="css" scoped>
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
