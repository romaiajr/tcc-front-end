<template>
  <FocusableInput
    v-if="step === RelationshipFormStep.NAME"
    v-model="relationshipForm.name"
    :title="$t('menu.der_flow.options.relationship.name')"
    @submit="saveRelationshipName"
  />
  <FocusableSelect
    v-else-if="step === RelationshipFormStep.ENTITYA"
    :items="entitiesAOptions"
    :title="$t('menu.der_flow.options.relationship.elementA')"
    @submit="saveRelationshipEntityAId"
    @keydown.esc.stop="() => (step = AttrFormSteps.NAME)"
  />
  <FocusableSelect
    v-else-if="step === RelationshipFormStep.ENTITYB"
    :items="entitiesBOptions"
    :title="$t('menu.der_flow.options.relationship.elementB')"
    @submit="saveRelationshipEntityBId"
    @keydown.esc.stop="() => (step = AttrFormSteps.CARDINALITY)"
  />
  <FocusableSelect
    v-else-if="step === RelationshipFormStep.CARDINALITY"
    :items="cardinalityOptions"
    :title="$t('menu.der_flow.options.relationship.cardinality')"
    shift-flag
    @submit="saveRelationshipCardinality"
    @keydown.esc.stop="() => (step = AttrFormSteps.ENTITYB)"
  />
</template>

<script setup lang="ts">
import { cardinalityInfo } from '~/composables/use-diagram';
const diagramTool = useDiagram();
const { scope, isEditScope, setActiveMenu } = useMenuOptions();

const entitiesAOptions = Object.values(diagramTool.diagram.value.entities).map(
  (data) => ({
    id: data.id,
    title: data.name,
  }),
);

const entitiesBOptions = computed(() => {
  return entitiesAOptions.filter(
    (entity) => entity.id !== relationshipForm.entityAId,
  );
});

const relationshipForm = reactive({
  name: '',
  entityAId: '',
  entityBId: '',
  cardinalityA: '',
  cardinalityB: '',
});

enum RelationshipFormStep {
  NAME,
  ENTITYA,
  ENTITYB,
  CARDINALITY,
}

const cardinalityOptions = Object.values(cardinalityInfo).map(
  (data, index) => ({
    id: index,
    title: data.title,
    infotext: data.infoText,
  }),
);

const step = ref(RelationshipFormStep.NAME);

const saveRelationshipName = (relationshipName: string) => {
  relationshipForm.name = relationshipName;
  step.value = RelationshipFormStep.ENTITYA;
};

const saveRelationshipEntityAId = (index: number) => {
  relationshipForm.entityAId = entitiesAOptions[index].id;

  step.value = RelationshipFormStep.ENTITYB;
};

const saveRelationshipEntityBId = (index: number) => {
  relationshipForm.entityBId = entitiesBOptions.value[index].id;
  step.value = RelationshipFormStep.CARDINALITY;
};

const saveRelationshipCardinality = (index: number) => {
  relationshipForm.cardinality = cardinalityOptions[index].id;
  createRelationship();
};

const createRelationship = () => {
  if (scope === FormScope.CREATE) {
    diagramTool.createRelationship(relationshipForm);
  } else {
    diagramTool.editRelationship(relationshipForm);
  }
  setActiveMenu(DerFlowEnum.RELATIONSHIP_OPTIONS);
};

onMounted(() => {
  if (isEditScope()) {
    const relationship = diagramTool?.getRelationship();
    relationshipForm.name = relationship.name;
    relationshipForm.entityAId = relationship.entityAId;
    relationshipForm.entityBId = relationship.entityBId;
    relationshipForm.cardinality = relationship.cardinality;
  }
});
</script>
