import { v4 as uuidv4 } from 'uuid';

import { ref } from 'vue';

export enum DERFlowEnum {
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

/** TODO - Adicionar ao JSON de tradução uma descrição do que é cada tipo de atributo  */
export enum SqlDataType {
  VARCHAR = 'VARCHAR',
  CHAR = 'CHAR',
  TEXT = 'TEXT',
  INT = 'INT',
  BIGINT = 'BIGINT',
  SMALLINT = 'SMALLINT',
  TINYINT = 'TINYINT',
  DECIMAL = 'DECIMAL',
  NUMERIC = 'NUMERIC',
  FLOAT = 'FLOAT',
  DOUBLE = 'DOUBLE',
  DATE = 'DATE',
  TIME = 'TIME',
  TIMESTAMP = 'TIMESTAMP',
  DATETIME = 'DATETIME',
  BOOLEAN = 'BOOLEAN',
  BLOB = 'BLOB',
  JSON = 'JSON',
  UUID = 'UUID',
}

export interface Attribute {
  id: string;
  name: string;
  type: SqlDataType;
}

export interface Entity {
  id: string;
  name: string;
  attrs?: Attribute[];
}

export interface Relationship {
  id: string;
  name: string;
  entityA: string;
  entityB: string;
  cardinalityA: string;
  cardinalityB: string;
}

export interface Diagram {
  id: string;
  name: string;
  entities: Entity[];
  relationships: Relationship[];
}

type UseDiagramReturn = {
  diagram: ReturnType<typeof ref<Diagram | null>>;
  createDiagram: (name: string) => void;
  createEntity: (name: string) => void;
  editEntityName: (entityId: string, newName: string) => void;
  removeEntity: (entityId: string) => void;
  createRelationship: (
    name: string,
    entityAId: string,
    entityBId: string,
    cardinalityA: string,
    cardinalityB: string,
  ) => void;
  editRelationship: (
    relationshipId: string,
    newData: Partial<Omit<Relationship, 'id'>>,
  ) => void;
  removeRelationship: (relationshipId: string) => void;
  createAttribute: (
    entityId: string,
    attrName: string,
    attrType: SqlDataType,
  ) => void;
  editAttribute: (
    entityId: string,
    attributeId: string,
    newData: Partial<Omit<Attribute, 'id'>>,
  ) => void;
  removeAttribute: (entityId: string, attributeId: string) => void;
  loadDiagram: (diagramId: string) => void;
  updateDiagram: (diagramId: string) => void;
  deleteDiagram: (diagramId: string) => void;
};

let instance: UseDiagramReturn | null = null;

export function useDiagram() {
  if (!instance) {
    const diagram = ref<Diagram | null>(null);

    const loadDiagram = (diagramId: string) => {
      /** TODO - Função de get diagram */
    };

    const createDiagram = (name: string) => {
      diagram.value = {
        id: uuidv4(),
        name,
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
      if (diagram.value) {
        diagram.value.entities.push({
          id: uuidv4(),
          name,
          attrs: [],
        });
      }
    };

    const editEntityName = (entityId: string, newName: string) => {
      if (diagram.value) {
        const entity = diagram.value.entities.find((e) => e.id === entityId);
        if (entity) {
          entity.name = newName;
        }
      }
    };

    const removeEntity = (entityId: string) => {
      if (diagram.value) {
        diagram.value.entities = diagram.value.entities.filter(
          (e) => e.id !== entityId,
        );
      }
    };

    const createRelationship = (
      name: string,
      entityAId: string,
      entityBId: string,
      cardinalityA: string,
      cardinalityB: string,
    ) => {
      if (diagram.value) {
        const entityAExists = diagram.value.entities.some(
          (e) => e.id === entityAId,
        );
        const entityBExists = diagram.value.entities.some(
          (e) => e.id === entityBId,
        );

        if (entityAExists && entityBExists) {
          diagram.value.relationships.push({
            id: uuidv4(),
            name,
            entityA: entityAId,
            entityB: entityBId,
            cardinalityA,
            cardinalityB,
          });
        }
      }
    };

    const editRelationship = (
      relationshipId: string,
      newData: Partial<Omit<Relationship, 'id'>>,
    ) => {
      if (diagram.value) {
        const relationship = diagram.value.relationships.find(
          (r) => r.id === relationshipId,
        );
        if (relationship) {
          relationship.name = newData.name ?? relationship.name;
          relationship.entityA = newData.entityA ?? relationship.entityA;
          relationship.entityB = newData.entityB ?? relationship.entityB;
          relationship.cardinalityA =
            newData.cardinalityA ?? relationship.cardinalityA;
          relationship.cardinalityB =
            newData.cardinalityB ?? relationship.cardinalityB;
        }
      }
    };

    const removeRelationship = (relationshipId: string) => {
      if (diagram.value) {
        diagram.value.relationships = diagram.value.relationships.filter(
          (r) => r.id !== relationshipId,
        );
      }
    };

    const createAttribute = (
      entityId: string,
      attrName: string,
      attrType: SqlDataType,
    ) => {
      if (diagram.value) {
        const entity = diagram.value.entities.find((e) => e.id === entityId);
        if (entity?.attrs) {
          entity.attrs.push({
            id: uuidv4(),
            name: attrName,
            type: attrType,
          });
        }
      }
    };

    const editAttribute = (
      entityId: string,
      attributeId: string,
      newData: Partial<Omit<Attribute, 'id'>>,
    ) => {
      if (diagram.value) {
        const entity = diagram.value.entities.find((e) => e.id === entityId);
        if (entity && entity.attrs) {
          const attr = entity.attrs.find((a) => a.id === attributeId);
          if (attr) {
            attr.name = newData.name ?? attr.name;
            attr.type = newData.type ?? attr.type;
          }
        }
      }
    };

    const removeAttribute = (entityId: string, attributeId: string) => {
      if (diagram.value) {
        const entity = diagram.value.entities.find((e) => e.id === entityId);
        if (entity && entity.attrs) {
          entity.attrs = entity.attrs.filter((a) => a.id !== attributeId);
        }
      }
    };

    instance = {
      diagram,
      createDiagram,
      createEntity,
      editEntityName,
      removeEntity,
      createRelationship,
      editRelationship,
      removeRelationship,
      createAttribute,
      editAttribute,
      removeAttribute,
      loadDiagram,
      updateDiagram,
      deleteDiagram,
    };
  }

  return instance;
}
