<template>
  <FocusableInput
    v-if="step === AttrFormSteps.NAME"
    v-model="attributeForm.name"
    :title="$t('menu.der_flow.options.entity.attribute.name')"
    @submit="saveAttrName"
  />
  <FocusableSelect
    v-else
    :items="sqlTypes"
    :title="$t('menu.der_flow.options.entity.attribute.type')"
    shift-flag
    :should-translate="false"
    @submit="createAttr"
    @keydown.esc.stop="() => (step = AttrFormSteps.NAME)"
  />
</template>

<script setup lang="ts">
import { SqlDataType, sqlDataTypeInfo } from '~/src/interfaces/der-diagram';

const diagramTool = useDiagram();
const { scope, isEditScope } = useMenuOptions();

const sqlTypes = Object.values(sqlDataTypeInfo).map((data) => ({
  title: data.title,
  infotext: data.infoText,
}));

const attributeForm = reactive({
  name: '',
  type: '' as SqlDataType,
});

enum AttrFormSteps {
  NAME,
  TYPE,
}

const step = ref(AttrFormSteps.NAME);

const saveAttrName = (attrName: string) => {
  attributeForm.name = attrName;
  step.value = AttrFormSteps.TYPE;
};

const createAttr = (index: number) => {
  attributeForm.type = sqlTypes[index].title;

  if (scope === FormScope.CREATE) {
    diagramTool.createAttribute(attributeForm);
  } else {
    diagramTool.editAttribute(attributeForm);
  }
};

onMounted(() => {
  if (isEditScope()) {
    attributeForm.name = diagramTool?.getAttribute()?.name ?? '';
  }
});
</script>
