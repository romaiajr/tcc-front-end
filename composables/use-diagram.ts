import { v4 as uuidv4 } from 'uuid';

import { ref } from 'vue';

export enum DerFlowEnum {
  DEFAULT,
  ENTITIES,
  ENTITY_OPTIONS,
  ATTRS,
  ATTR_OPTIONS,
  RELATIONSHIPS,
  RELATIONSHIP_OPTIONS,
  NEW_ENTITY,
  NEW_ATTR,
  NEW_RELATIONSHIP,
}

export enum SqlDataType {
  VARCHAR = 'VARCHAR',
  TEXT = 'TEXT',
  INT = 'INT',
  FLOAT = 'FLOAT',
  DOUBLE = 'DOUBLE',
  TIMESTAMP = 'TIMESTAMP',
  BOOLEAN = 'BOOLEAN',
  BLOB = 'BLOB',
  JSON = 'JSON',
  UUID = 'UUID',
}

export const sqlDataTypeInfo = {
  [SqlDataType.VARCHAR]: {
    title: SqlDataType.VARCHAR,
    infoText: 'sql.explanation.VARCHAR',
  },
  [SqlDataType.TEXT]: {
    title: SqlDataType.TEXT,
    infoText: 'sql.explanation.TEXT',
  },
  [SqlDataType.INT]: {
    title: SqlDataType.INT,
    infoText: 'sql.explanation.INT',
  },
  [SqlDataType.FLOAT]: {
    title: SqlDataType.FLOAT,
    infoText: 'sql.explanation.FLOAT',
  },
  [SqlDataType.DOUBLE]: {
    title: SqlDataType.DOUBLE,
    infoText: 'sql.explanation.DOUBLE',
  },
  [SqlDataType.TIMESTAMP]: {
    title: SqlDataType.TIMESTAMP,
    infoText: 'sql.explanation.TIMESTAMP',
  },
  [SqlDataType.BOOLEAN]: {
    title: SqlDataType.BOOLEAN,
    infoText: 'sql.explanation.BOOLEAN',
  },
  [SqlDataType.BLOB]: {
    title: SqlDataType.BLOB,
    infoText: 'sql.explanation.BLOB',
  },
  [SqlDataType.JSON]: {
    title: SqlDataType.JSON,
    infoText: 'sql.explanation.JSON',
  },
  [SqlDataType.UUID]: {
    title: SqlDataType.UUID,
    infoText: 'sql.explanation.UUID',
  },
};

export enum CardinalityOptions {
  OneToOne,
  OneToMany,
  ManyToMany,
}

export const cardinalityInfo = {
  [CardinalityOptions.OneToOne]: {
    title: 'sql.cardinality.OneToOne',
    infoText: 'sql.explanation.OneToOne',
  },
  [CardinalityOptions.OneToMany]: {
    title: 'sql.cardinality.OneToMany',
    infoText: 'sql.explanation.OneToMany',
  },
};

export enum TypeOptions {
  COMMON,
  WEAK,
  INHERITANCE,
  ASSOCIATIVE,
}

export const typeInfo = {
  [TypeOptions.COMMON]: {
    title: 'sql.relationship_type.common',
    infoText: 'sql.explanation.common',
  },
  [TypeOptions.WEAK]: {
    title: 'sql.relationship_type.weak',
    infoText: 'sql.explanation.weak',
  },
  [TypeOptions.INHERITANCE]: {
    title: 'sql.relationship_type.inheritance',
    infoText: 'sql.explanation.inheritance',
  },
  [TypeOptions.ASSOCIATIVE]: {
    title: 'sql.relationship_type.associative',
    infoText: 'sql.explanation.associative',
  },
};

export interface DerAttribute {
  id: string;
  name: string;
  type: SqlDataType;
}

export interface DerEntity {
  id: string;
  name: string;
  attrs?: DerAttribute[];
}

export interface DerRelationship {
  id: string;
  name: string;
  entityAId: string;
  entityBId: string;
  cardinality: CardinalityOptions;
  type: TypeOptions;
}

export interface Diagram {
  id: string;
  name: string;
  entities: DerEntity[];
  relationships: DerRelationship[];
}

type UseDiagramReturn = {
  diagram: ReturnType<typeof ref<Diagram | null>>;
  createDiagram: (name: string) => void;
  createEntity: (name: string) => void;
  editEntityName: (newName: string) => void;
  getEntity: () => DerEntity | undefined;
  removeEntity: () => void;
  readEntities: () => void;
  createRelationship: (props: {
    name: string;
    entityAId: string;
    entityBId: string;
    cardinality: CardinalityOptions;
    type: TypeOptions;
  }) => void;
  editRelationship: (newData: Omit<DerRelationship, 'id'>) => void;
  getRelationship: () => DerRelationship | undefined;
  removeRelationship: () => void;
  createAttribute: (props: { name: string; type: SqlDataType }) => void;
  editAttribute: (newData: Omit<DerAttribute, 'id'>) => void;
  getAttribute: () => DerAttribute | undefined;
  removeAttribute: () => void;
  loadDiagram: (diagramId: string) => void;
  updateDiagram: (diagramId: string) => void;
  deleteDiagram: (diagramId: string) => void;
};

let instance: UseDiagramReturn | null = null;

export function useDiagram() {
  const derStore = useDerOptions();
  const tts = useTTS();
  const i18n = useI18n();

  if (!instance) {
    const diagram = ref<Diagram | null>(null);

    const loadDiagram = (diagramId: string) => {
      /** TODO - Função de get diagram */
    };

    const createDiagram = (name: string) => {
      diagram.value = {
        id: uuidv4(),
        name: name.toLowerCase(),
        entities: [],
        relationships: [],
      };
    };

    const updateDiagram = (diagramId: string) => {
      /** TODO - Função de update diagram */
    };

    const deleteDiagram = (diagramId: string) => {
      /** TODO - Função de delete diagram */
    };

    const createEntity = (name: string) => {
      const id = uuidv4();
      if (diagram.value) {
        diagram.value.entities.push({
          id,
          name: name.toLowerCase(),
          attrs: [],
        });
      }
      derStore.setCurrentEntityId(id);
    };

    const editEntityName = (newName: string) => {
      if (diagram.value) {
        const entity = getEntity();
        if (entity) {
          entity.name = newName.toLowerCase();
        }
      }
    };

    const getEntity = () => {
      if (diagram.value) {
        const id = derStore.currentEntityId;
        return diagram.value.entities.find((e) => e.id === id);
      }
    };

    const removeEntity = () => {
      if (diagram.value) {
        const id = derStore.currentEntityId;
        diagram.value.entities = diagram.value.entities.filter(
          (e) => e.id !== id,
        );
        diagram.value.relationships = diagram.value.relationships.filter(
          (r) => {
            return r.entityAId !== id && r.entityBId !== id;
          },
        );
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

    const createRelationship = (props: {
      name: string;
      entityAId: string;
      entityBId: string;
      cardinality: CardinalityOptions;
      type: TypeOptions;
    }) => {
      if (diagram.value) {
        const entityAExists = diagram.value.entities.some(
          (e) => e.id === props.entityAId,
        );
        const entityBExists = diagram.value.entities.some(
          (e) => e.id === props.entityBId,
        );

        if (entityAExists && entityBExists) {
          const id = uuidv4();
          diagram.value.relationships.push({
            id,
            name: props.name.toLowerCase(),
            entityAId: props.entityAId,
            entityBId: props.entityBId,
            cardinality: props.cardinality,
            type: props.type,
          });
          derStore.setCurrentRelationshipId(id);
        }
      }
    };

    const editRelationship = (newData: Omit<DerRelationship, 'id'>) => {
      if (diagram.value) {
        const id = derStore.currentRelationshipId;
        const relationship = diagram.value.relationships.find(
          (r) => r.id === id,
        );
        if (relationship) {
          relationship.name = newData.name.toLowerCase();
          relationship.entityAId = newData.entityAId;
          relationship.entityBId = newData.entityBId;
          relationship.cardinality = newData.cardinality;
          relationship.type = newData.type;
        }
      }
    };

    const getRelationship = () => {
      if (diagram.value) {
        const id = derStore.currentRelationshipId;
        return diagram.value.relationships.find((r) => r.id === id);
      }
    };

    const removeRelationship = () => {
      if (diagram.value) {
        const id = derStore.currentRelationshipId;
        diagram.value.relationships = diagram.value.relationships.filter(
          (r) => r.id !== id,
        );
      }
    };

    const createAttribute = (props: { name: string; type: SqlDataType }) => {
      if (diagram.value) {
        const entity = getEntity();
        if (entity?.attrs) {
          const id = uuidv4();
          entity.attrs.push({
            id,
            name: props.name.toLowerCase(),
            type: props.type,
          });
          derStore.setCurrentAttrId(id);
        }
      }
    };

    const editAttribute = (newData: Omit<DerAttribute, 'id'>) => {
      if (diagram.value) {
        const attr = getAttribute();

        if (attr) {
          attr.name = newData.name.toLowerCase();
          attr.type = newData.type;
        }
      }
    };

    const getAttribute = () => {
      const entity = getEntity();
      if (entity && entity.attrs) {
        const id = derStore.currentAttrId;
        return entity.attrs.find((a) => a.id === id);
      }
    };

    const removeAttribute = () => {
      if (diagram.value) {
        const entity = getEntity();
        if (entity && entity.attrs) {
          const id = derStore.currentAttrId;
          entity.attrs = entity.attrs.filter((a) => a.id !== id);
        }
      }
    };

    instance = {
      diagram,
      createDiagram,
      createEntity,
      editEntityName,
      removeEntity,
      getEntity,
      readEntities,
      createRelationship,
      editRelationship,
      removeRelationship,
      getRelationship,
      createAttribute,
      editAttribute,
      removeAttribute,
      getAttribute,
      loadDiagram,
      updateDiagram,
      deleteDiagram,
    };
  }

  return instance;
}
