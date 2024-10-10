<template>
  <PDVMainMenu v-if="menu.activeMainMenu === PDVMenusEnum.DEFAULT" />
  <PDVDerMenu v-else-if="menu.activeMainMenu === PDVMenusEnum.PROJECTS" />
</template>
<script setup lang="ts">
import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';

definePageMeta({
  layout: 'pdv',
});
const menu = useMenuOptions();
</script>
