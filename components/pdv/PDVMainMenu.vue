<template>
  <PDVMenu :menu="menu" />
</template>
<script setup lang="ts">
import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';
const { t } = useI18n();
const emit = defineEmits(['updateMenu']);

const menu = {
  id: PDVMenusEnum.MAIN,
  title: t('menu.main.title'),
  items: [
    {
      label: t('menu.main.options.my_projects'),
      action: () => emit('updateMenu', PDVMenusEnum.PROJECTS),
    },
    {
      label: t('menu.main.options.tts_options'),
      action: () => emit('updateMenu', PDVMenusEnum.TTS),
    },
    {
      label: t('menu.main.options.language'),
      action: () => emit('updateMenu', PDVMenusEnum.LANGUAGE),
    },
    {
      label: t('menu.main.options.help'),
      action: () => console.log('Leitura de ajuda'),
    },
  ],
};
</script>
