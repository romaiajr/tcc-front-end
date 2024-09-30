<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
