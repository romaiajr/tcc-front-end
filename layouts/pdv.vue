<template>
  <v-container>
    <div class="menu">
      <slot />
    </div>
    <TeachingAssistantMenu />
  </v-container>
</template>
<style scoped lang="css">
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
