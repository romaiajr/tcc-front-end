<template>
  <div class="menu" @keydown="handleKeydown">
    <PDVMenu :menu="menu" />
  </div>
  <TeachingAssistantMenu />
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
          menuStore.setActiveMainMenu(PDVMenusEnum.TTS_CONFIG);
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
          menuStore.setActiveMainMenu(PDVMenusEnum.HELP);
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
