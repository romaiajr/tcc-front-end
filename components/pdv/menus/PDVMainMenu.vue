<template>
  <PDVMenu v-if="menu" :menu="menu" @keydown="handleKeydown" />
</template>
<script setup lang="ts">
import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';

const { t } = useI18n();
const menuStore = useMenuOptions();
const menu = ref();
const { hotkeys } = useKeyboardNavigation();

const handleKeydown = (event: KeyboardEvent) => {
  hotkeys(event);
};

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
