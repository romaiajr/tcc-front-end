<template>
  <PDVMenu v-if="menu" :menu="menu" @keydown.esc.stop="handleKeydown" />
</template>
<script setup lang="ts">
import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';

const { t } = useI18n();
const menu = ref();
const tts = useTTS();
const menuStore = useMenuOptions();

const handleKeydown = () => {
  menuStore.setActiveMainMenu(PDVMenusEnum.DEFAULT);
};

onBeforeMount(() => {
  menu.value = {
    title: t('menu.tts.title'),
    items: [
      {
        label: t('menu.tts.options.increase'),
        action: () => {
          tts.updateTTSPreferences(true);
        },
      },
      {
        label: t('menu.tts.options.decrease'),
        action: () => {
          tts.updateTTSPreferences(false);
        },
      },
    ],
  };
});
</script>
