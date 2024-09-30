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
    @submit="createAttr"
  />
</template>

<script setup lang="ts">
import FocusableInput from '../FocusableInput.vue';
import FocusableSelect from '../FocusableSelect.vue';

import { SqlDataType } from '~/composables/use-diagram';

const diagramTool = useDiagram();
const { scope, isEditScope, setActiveMenu } = useMenuOptions();

const sqlTypes = Object.values(sqlDataTypeInfo).map((data) => ({
  title: data.title,
  infotext: data.infoText,
}));

const attributeForm = reactive({
  name: '',
  type: '',
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

const createAttr = (attrType: SqlDataType) => {
  attributeForm.type = attrType;

  if (scope === FormScope.CREATE) {
    diagramTool.createAttribute(attributeForm);
  } else {
    diagramTool.editAttribute(attributeForm);
  }
  setActiveMenu(DerFlowEnum.ENTITY_OPTIONS);
};

onMounted(() => {
  if (isEditScope()) {
    attributeForm.name = diagramTool?.getAttribute()?.name ?? '';
  }
});
</script>
