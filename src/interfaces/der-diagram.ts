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

export interface DiagramPosition {
  x: number | null;
  y: number | null;
}

export interface DerEntity {
  id: string;
  name: string;
  attrs?: DerAttribute[];
  position: DiagramPosition;
}

export interface DerRelationship {
  id: string;
  name: string;
  entityAId: string;
  entityBId: string;
  cardinality: CardinalityOptions;
  type: TypeOptions;
  position: DiagramPosition;
}

export interface Diagram {
  id: string;
  name: string;
  entities: DerEntity[];
  relationships: DerRelationship[];
}
