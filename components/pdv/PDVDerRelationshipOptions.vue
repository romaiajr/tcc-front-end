<template>
  <PDVMenu :menu="menu" />
</template>
<script setup lang="ts">
const { t } = useI18n();

const menu = ref({
  title: t('menu.der_flow.titles.relationship_options'),
  items: [
    {
      label: t('menu.der_flow.options.relationship.elementA'),
    },
    {
      label: t('menu.der_flow.options.relationship.elementB'),
    },
    {
      label: t('menu.der_flow.options.relationship.cardinality'),
    },
    {
      label: t('menu.der_flow.options.relationship.update_name'),
    },
    {
      label: t('menu.der_flow.options.relationship.delete'),
    },
  ],
});
</script>
