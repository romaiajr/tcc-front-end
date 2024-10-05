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
  ManyToOne,
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
  [CardinalityOptions.ManyToOne]: {
    title: 'sql.cardinality.ManyToOne',
    infoText: 'sql.explanation.ManyToOne',
  },
  [CardinalityOptions.ManyToMany]: {
    title: 'sql.cardinality.ManyToMany',
    infoText: 'sql.explanation.ManyToMany',
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
  entityA: string;
  entityB: string;
  cardinality: CardinalityOptions;
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
  createRelationship: (props: {
    name: string;
    entityAId: string;
    entityBId: string;
    cardinality: CardinalityOptions;
  }) => void;
  editRelationship: (newData: Partial<Omit<DerRelationship, 'id'>>) => void;
  getRelationship: () => DerRelationship | undefined;
  removeRelationship: () => void;
  createAttribute: (props: { name: string; type: SqlDataType }) => void;
  editAttribute: (newData: Partial<Omit<DerAttribute, 'id'>>) => void;
  getAttribute: () => DerAttribute | undefined;
  removeAttribute: () => void;
  loadDiagram: (diagramId: string) => void;
  updateDiagram: (diagramId: string) => void;
  deleteDiagram: (diagramId: string) => void;
};

let instance: UseDiagramReturn | null = null;

export function useDiagram() {
  const derStore = useDerOptions();
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
        return diagram.value.entities.find(
          (e) => e.id === derStore.currentEntityId,
        );
      }
    };

    const removeEntity = () => {
      if (diagram.value) {
        diagram.value.entities = diagram.value.entities.filter(
          (e) => e.id !== derStore.currentEntityId,
        );
      }
    };

    const createRelationship = (props: {
      name: string;
      entityAId: string;
      entityBId: string;
      cardinality: CardinalityOptions;
    }) => {
      if (diagram.value) {
        const entityAExists = diagram.value.entities.some(
          (e) => e.id === props.entityAId,
        );
        const entityBExists = diagram.value.entities.some(
          (e) => e.id === props.entityBId,
        );

        console.log(entityAExists, entityBExists, props);

        if (entityAExists && entityBExists) {
          const id = uuidv4();
          diagram.value.relationships.push({
            id,
            name: props.name.toLowerCase(),
            entityA: props.entityAId,
            entityB: props.entityBId,
            cardinality: props.cardinality,
          });
          derStore.setCurrentRelationshipId(id);
        }
      }
    };

    const editRelationship = (
      newData: Partial<Omit<DerRelationship, 'id'>>,
    ) => {
      if (diagram.value) {
        const relationship = diagram.value.relationships.find(
          (r) => r.id === derStore.currentRelationshipId,
        );
        if (relationship) {
          relationship.name = (newData.name ?? relationship.name).toLowerCase();
          relationship.entityA = newData.entityA ?? relationship.entityA;
          relationship.entityB = newData.entityB ?? relationship.entityB;
          relationship.cardinality =
            newData.cardinality ?? relationship.cardinality;
        }
      }
    };

    const getRelationship = () => {
      if (diagram.value) {
        return diagram.value.relationships.find(
          (r) => r.id === derStore.currentRelationshipId,
        );
      }
    };

    const removeRelationship = () => {
      if (diagram.value) {
        diagram.value.relationships = diagram.value.relationships.filter(
          (r) => r.id !== derStore.currentRelationshipId,
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

    const editAttribute = (newData: Partial<Omit<DerAttribute, 'id'>>) => {
      if (diagram.value) {
        const attr = getAttribute();

        if (attr) {
          attr.name = (newData.name ?? attr.name).toLowerCase();
          attr.type = newData.type ?? attr.type;
        }
      }
    };

    const getAttribute = () => {
      const entity = getEntity();
      if (entity && entity.attrs) {
        return entity.attrs.find((a) => a.id === derStore.currentAttrId);
      }
    };

    const removeAttribute = () => {
      if (diagram.value) {
        const entity = getEntity();
        if (entity && entity.attrs) {
          entity.attrs = entity.attrs.filter(
            (a) => a.id !== derStore.currentAttrId,
          );
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
