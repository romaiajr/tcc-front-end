<script setup lang="ts">
import FocusableSelect from '~/components/FocusableSelect.vue';
const items = Object.values(sqlDataTypeInfo).map((data) => ({
  title: data.title,
  infotext: data.infoText,
}));
</script>

<template>
  <v-container>
    <FocusableSelect :items="items" title="teste" />
  </v-container>
</template>
