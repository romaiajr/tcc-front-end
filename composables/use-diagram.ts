import { v4 as uuidv4 } from 'uuid';

import { ref } from 'vue';
import { diagramMock } from '~/mock/diagram.mock';
import {
  CardinalityOptions,
  type DerAttribute,
  type DerEntity,
  type DerRelationship,
  type Diagram,
  type DiagramPosition,
  DatabaseTypeOptions,
  RelationshipTypeOptions,
  type ParsedDiagram,
  DatabaseTypeOptionsMap,
  CardinalityOptionsMap,
  RelationshipTypeOptionsMap,
  type ParsedEntity,
  type ParsedRelationship,
  type ParsedAttribute,
} from '~/src/interfaces/der-diagram';
import { DerFlowEnum } from '~/src/interfaces/pdv-menu';

type UseDiagramReturn = {
  diagram: ReturnType<typeof ref<Diagram | null>>;
  parsedDiagram: ReturnType<typeof ref<ParsedDiagram | null>>;
  createDiagram: (name: string) => void;
  parseDiagram: () => void;
  createEntity: (name: string) => void;
  editEntityName: (newName: string) => void;
  updateEntityPosition: (id: string, position: DiagramPosition) => void;
  getEntity: (parsed?: boolean) => DerEntity | ParsedEntity | undefined;
  removeEntity: () => void;
  readEntities: () => void;
  createRelationship: (props: {
    name: string;
    entityAId: string;
    entityBId: string;
    cardinality: CardinalityOptions;
    type: RelationshipTypeOptions;
  }) => void;
  editRelationship: (newData: Omit<DerRelationship, 'id'>) => void;
  updateRelationshipPosition: (id: string, position: DiagramPosition) => void;
  getRelationship: (
    parsed?: boolean,
  ) => DerRelationship | ParsedRelationship | undefined;
  removeRelationship: () => void;
  createAttribute: (props: { name: string; type: DatabaseTypeOptions }) => void;
  editAttribute: (newData: Omit<DerAttribute, 'id'>) => void;
  getAttribute: (
    parsed?: boolean,
  ) => DerAttribute | ParsedAttribute | undefined;
  removeAttribute: () => void;
  // loadDiagram: (diagramId: string) => void;
  loadDiagram: () => void;
  // updateDiagram: (diagramId: string) => void;
  // deleteDiagram: (diagramId: string) => void;
};

let instance: UseDiagramReturn | null = null;

export function useDiagram() {
  const derStore = useDerOptions();
  const menu = useMenuOptions();
  const tts = useTTS();
  const i18n = useI18n();

  if (!instance) {
    const diagram = ref<Diagram | null>(null);
    const parsedDiagram = ref<ParsedDiagram | null>(null);

    // const loadDiagram = (diagramId: string) => {
    //   /** TODO - Função de get diagram */
    // };

    const loadDiagram = () => {
      diagram.value = diagramMock;
      parseDiagram();
    };

    const parseDiagram = () => {
      if (diagram.value) {
        parsedDiagram.value = {
          ...diagram.value,
          entities: diagram.value.entities
            ? diagram.value.entities.map(({ position, ...entity }) => ({
                ...entity,
                attrs: entity.attrs
                  ? entity.attrs.map((attr) => ({
                      ...attr,
                      type: DatabaseTypeOptionsMap[attr.type], // Converte o tipo do atributo
                    }))
                  : [],
              }))
            : [],
          relationships: diagram.value.relationships
            ? diagram.value.relationships.map(
                ({ position, entityAId, entityBId, ...relationship }) => {
                  const [entityA, entityB] = getRelationshipEntities(
                    entityAId,
                    entityBId,
                  );

                  return {
                    ...relationship,
                    entityAId,
                    entityBId,
                    entityA: entityA?.name,
                    entityB: entityB?.name,
                    cardinality:
                      CardinalityOptionsMap[relationship.cardinality], // Converte a cardinalidade
                    type: RelationshipTypeOptionsMap[relationship.type], // Converte o tipo do relacionamento
                  };
                },
              )
            : [],
        };
      }
      return null;
    };

    const createDiagram = (name: string) => {
      diagram.value = {
        id: uuidv4(),
        name: name.toLowerCase(),
        entities: [] as DerEntity[],
        relationships: [] as DerRelationship[],
      };
      parsedDiagram.value = {
        name: name.toLowerCase(),
        entities: [] as ParsedEntity[],
        relationships: [] as ParsedRelationship[],
      };
    };

    // const updateDiagram = (diagramId: string) => {
    //   /** TODO - Função de update diagram */
    // };

    // const deleteDiagram = (diagramId: string) => {
    //   /** TODO - Função de delete diagram */
    // };

    const createEntity = (name: string) => {
      const id = uuidv4();
      if (diagram.value) {
        diagram.value.entities.push({
          id,
          name: name.toLowerCase(),
          attrs: [] as DerAttribute[],
          position: {
            x: null,
            y: null,
          },
        });
        parsedDiagram.value?.entities.push({
          id,
          name: name.toLowerCase(),
          attrs: [] as ParsedAttribute[],
        });
      }
      derStore.setCurrentEntityId(id);
      menu.setActiveDerMenu(DerFlowEnum.ENTITY_OPTIONS);
    };

    const editEntityName = (newName: string) => {
      if (diagram.value) {
        const entity = getEntity();
        const parsedEntity = getEntity(true);
        if (entity && parsedEntity) {
          entity.name = newName.toLowerCase();
          parsedEntity.name = newName.toLowerCase();
        }
        menu.setActiveDerMenu(DerFlowEnum.ENTITY_OPTIONS);
      }
    };

    const updateEntityPosition = (id: string, position: DiagramPosition) => {
      const entity = diagram.value?.entities.find((e) => e.id === id);
      if (entity) {
        entity.position = { ...position };
      }
    };

    const getEntity = (parsed?: boolean) => {
      if (diagram.value && parsedDiagram.value) {
        const id = derStore.currentEntityId;
        return parsed
          ? parsedDiagram.value.entities.find((e) => e.id === id)
          : diagram.value.entities.find((e) => e.id === id);
      }
    };

    const removeEntity = () => {
      if (diagram.value && parsedDiagram.value) {
        const id = derStore.currentEntityId;
        diagram.value.entities = diagram.value.entities.filter(
          (e) => e.id !== id,
        );
        parsedDiagram.value.entities = parsedDiagram.value.entities.filter(
          (e) => e.id !== id,
        );
        diagram.value.relationships = diagram.value.relationships.filter(
          (r) => {
            return r.entityAId !== id && r.entityBId !== id;
          },
        );
        parsedDiagram.value.relationships =
          parsedDiagram.value.relationships.filter((r) => {
            return r.entityAId !== id && r.entityBId !== id;
          });
        if (diagram.value.entities.length > 0) {
          menu.setActiveDerMenu(DerFlowEnum.ENTITIES);
        } else {
          menu.setActiveDerMenu(DerFlowEnum.DEFAULT);
        }
      }
    };

    const readEntities = () => {
      if (diagram.value) {
        if (diagram.value.entities) {
          let entities = '';
          diagram.value.entities.forEach((e) => {
            entities += `${e.name}, `;
          });

          tts.speakPhrase(
            i18n.t('menu.der_flow.options.entity.created_entities', {
              entities,
            }),
          );
        }
      }
    };

    const getRelationshipEntities = (idA: string, idB: string) => {
      if (diagram.value) {
        const entityA = diagram.value.entities.find((e) => e.id === idA);
        const entityB = diagram.value.entities.find((e) => e.id === idB);
        return [entityA, entityB];
      }
      return [];
    };

    const createRelationship = (props: {
      name: string;
      entityAId: string;
      entityBId: string;
      cardinality: CardinalityOptions;
      type: RelationshipTypeOptions;
    }) => {
      if (diagram.value && parsedDiagram.value) {
        const [entityA, entityB] = getRelationshipEntities(
          props.entityAId,
          props.entityBId,
        );

        if (entityA && entityB) {
          const id = uuidv4();
          diagram.value.relationships.push({
            id,
            name: props.name.toLowerCase(),
            entityAId: props.entityAId,
            entityBId: props.entityBId,
            cardinality: props.cardinality,
            type: props.type,
            position: {
              x: null,
              y: null,
            },
          });
          parsedDiagram.value.relationships.push({
            id,
            name: props.name.toLowerCase(),
            entityAId: props.entityAId,
            entityBId: props.entityBId,
            entityA: entityA.name,
            entityB: entityB.name,
            cardinality: CardinalityOptionsMap[props.cardinality],
            type: RelationshipTypeOptionsMap[props.type],
          });
          derStore.setCurrentRelationshipId(id);
          menu.setActiveDerMenu(DerFlowEnum.RELATIONSHIP_OPTIONS);
        }
      }
    };

    const editRelationship = (newData: Omit<DerRelationship, 'id'>) => {
      if (diagram.value) {
        const relationship = getRelationship() as DerRelationship;
        const parsedRelationship = getRelationship(true) as ParsedRelationship;
        if (relationship && parsedRelationship) {
          relationship.name = newData.name.toLowerCase();
          relationship.entityAId = newData.entityAId;
          relationship.entityBId = newData.entityBId;
          relationship.cardinality = newData.cardinality;
          relationship.type = newData.type;
          relationship.name = newData.name.toLowerCase();
          parsedRelationship.entityAId = newData.entityAId;
          parsedRelationship.entityBId = newData.entityBId;
          const [entityA, entityB] = getRelationshipEntities(
            newData.entityAId,
            newData.entityBId,
          );
          if (entityA && entityB) {
            parsedRelationship.entityA = entityA.name;
            parsedRelationship.entityB = entityB.name;
          }
          parsedRelationship.cardinality =
            CardinalityOptionsMap[newData.cardinality];
          parsedRelationship.type = RelationshipTypeOptionsMap[newData.type];
        }
        menu.setActiveDerMenu(DerFlowEnum.RELATIONSHIP_OPTIONS);
      }
    };

    const updateRelationshipPosition = (
      id: string,
      position: DiagramPosition,
    ) => {
      const relationship = diagram.value?.relationships.find(
        (r) => r.id === id,
      );
      if (relationship) {
        relationship.position = position;
      }
    };

    const getRelationship = (parsed?: boolean) => {
      if (diagram.value && parsedDiagram.value) {
        const id = derStore.currentRelationshipId;
        return parsed
          ? parsedDiagram.value.relationships.find((r) => r.id === id)
          : diagram.value.relationships.find((r) => r.id === id);
      }
    };

    const removeRelationship = () => {
      if (diagram.value && parsedDiagram.value) {
        const id = derStore.currentRelationshipId;
        diagram.value.relationships = diagram.value.relationships.filter(
          (r) => r.id !== id,
        );
        parsedDiagram.value.relationships =
          parsedDiagram.value.relationships.filter((r) => r.id !== id);
        menu.setActiveDerMenu(DerFlowEnum.RELATIONSHIPS);
      }
    };

    const createAttribute = (props: {
      name: string;
      type: DatabaseTypeOptions;
    }) => {
      if (diagram.value && parsedDiagram.value) {
        const entity = getEntity();
        const parsedEntity = getEntity(true);
        if (entity?.attrs && parsedEntity?.attrs) {
          const id = uuidv4();
          entity.attrs.push({
            id,
            name: props.name.toLowerCase(),
            type: props.type,
          });
          parsedEntity.attrs.push({
            id,
            name: props.name.toLowerCase(),
            type: DatabaseTypeOptionsMap[props.type],
          });
          menu.setActiveDerMenu(DerFlowEnum.ENTITY_OPTIONS);
        }
      }
    };

    const editAttribute = (newData: Omit<DerAttribute, 'id'>) => {
      if (diagram.value) {
        const attr = getAttribute();
        const parsedAttr = getAttribute(true);
        if (attr && parsedAttr) {
          attr.name = newData.name.toLowerCase();
          attr.type = newData.type;
          parsedAttr.name = newData.name.toLowerCase();
          parsedAttr.type = DatabaseTypeOptionsMap[newData.type];
        }
        menu.setActiveDerMenu(DerFlowEnum.ENTITY_OPTIONS);
      }
    };

    const getAttribute = (parsed?: boolean) => {
      const entity = getEntity();
      const parsedEntity = getEntity(true);
      if (entity && entity.attrs && parsedEntity && parsedEntity.attrs) {
        const id = derStore.currentAttrId;
        return parsed
          ? parsedEntity.attrs.find((a) => a.id === id)
          : entity.attrs.find((a) => a.id === id);
      }
    };

    const removeAttribute = () => {
      if (diagram.value) {
        const entity = getEntity();
        const parsedEntity = getEntity(true);
        if (entity && entity.attrs && parsedEntity && parsedEntity.attrs) {
          const id = derStore.currentAttrId;
          entity.attrs = entity.attrs.filter((a) => a.id !== id);
          parsedEntity.attrs = parsedEntity.attrs.filter((a) => a.id !== id);
          if (entity?.attrs?.length > 0) {
            menu.setActiveDerMenu(DerFlowEnum.ATTRS);
          } else {
            menu.setActiveDerMenu(DerFlowEnum.ENTITY_OPTIONS);
          }
        }
      }
    };

    instance = {
      diagram,
      parsedDiagram,
      createDiagram,
      parseDiagram,
      createEntity,
      editEntityName,
      updateEntityPosition,
      removeEntity,
      getEntity,
      readEntities,
      createRelationship,
      editRelationship,
      updateRelationshipPosition,
      removeRelationship,
      getRelationship,
      createAttribute,
      editAttribute,
      removeAttribute,
      getAttribute,
      loadDiagram,
      // updateDiagram,
      // deleteDiagram,
    };
  }

  return instance;
}
