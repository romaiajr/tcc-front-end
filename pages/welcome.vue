<template>
  <v-container>
    <PDVMainMenu v-if="menu.activeMainMenu === PDVMenusEnum.DEFAULT" />
    <PDVDerMenu v-else-if="menu.activeMainMenu === PDVMenusEnum.PROJECTS" />
  </v-container>
</template>
<script setup lang="ts">
import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';
const menu = useMenuOptions();
</script>
