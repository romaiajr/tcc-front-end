<template>
  <PDVMenu :menu="menu" />
</template>
<script setup lang="ts">
import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';

const { t } = useI18n();
const menuStore = useMenuOptions();
const menu = ref();

onBeforeMount(() => {
  menu.value = {
    title: t('menu.main.title'),
    items: [
      {
        label: t('menu.main.options.my_projects'),
        action: () => {
          menuStore.setActiveMainMenu(PDVMenusEnum.PROJECTS);
        },
      },
      {
        label: t('menu.main.options.tts_options'),
        action: () => {
          menuStore.setActiveMainMenu(PDVMenusEnum.TTS);
        },
      },
      {
        label: t('menu.main.options.language'),
        action: () => {
          menuStore.setActiveMainMenu(PDVMenusEnum.LANGUAGE);
        },
      },
      {
        label: t('menu.main.options.help'),
        action: () => {
          menuStore.setActiveMainMenu(PDVMenusEnum.DEFAULT);
        },
      },
    ],
  };
});
</script>
<style scoped lang="css">
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
