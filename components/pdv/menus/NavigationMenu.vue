<template>
  <div class="menu">
    <div class="button-group">
      <FocusableElement
        v-for="(option, index) in options"
        :key="index"
        :title="option.title"
        class="option"
        @click="option.action"
      >
        {{ option.title }}
      </FocusableElement>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';

const options = ref([
  {
    title: 'Voltar',
    action: handleBack,
  },
  {
    title: 'Início',
    action: handleStart,
  },
  {
    title: 'Ajuda',
    action: handleHelp,
  },
]);
const menu = useMenuOptions();
const tts = useTTS();
const { t } = useI18n();

function handleBack() {
  if (menu.activeMainMenu === PDVMenusEnum.PROJECTS) {
    if (menu.previousDerMenu !== undefined) {
      menu.setActiveDerMenu(menu.previousDerMenu);
    } else {
      menu.setActiveMainMenu(PDVMenusEnum.DEFAULT);
    }
  } else if (menu.activeMainMenu === PDVMenusEnum.TTS) {
    menu.setActiveMainMenu(PDVMenusEnum.DEFAULT);
  }
}

function handleStart() {
  menu.setActiveMainMenu(PDVMenusEnum.DEFAULT);
}

function handleHelp() {
  tts.speakPhrase(t('message.navigation_helper'));
}
</script>

<style scoped lang="css">
.menu {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-group {
  display: inline-flex;
  width: 50%;
  text-align: center;
  justify-content: center;
}

.option {
  display: inline-flex;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc !important;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.focusable-element {
  outline: none;
  border: none;
  display: block;
  width: 100%;
  padding: 10px;
}

.focusable-element:focus {
  border: 1px solid #ff7043 !important;
  background-color: #ffe0b2;
}
</style>
