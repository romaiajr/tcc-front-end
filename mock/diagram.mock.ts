import {
  CardinalityOptions,
  SqlDataType,
  TypeOptions,
  type Diagram,
} from '~/src/interfaces/der-diagram';

export const diagramMock: Diagram = {
  id: 'diagram1',
  name: 'Company Management Diagram',
  entities: [
    {
      id: 'entity1',
      name: 'Employee',
      attrs: [
        { id: 'attr1', name: 'EmployeeID', type: SqlDataType.UUID },
        { id: 'attr2', name: 'FirstName', type: SqlDataType.VARCHAR },
        { id: 'attr3', name: 'LastName', type: SqlDataType.VARCHAR },
        { id: 'attr4', name: 'DateOfBirth', type: SqlDataType.TIMESTAMP },
        { id: 'attr5', name: 'Salary', type: SqlDataType.FLOAT },
      ],
      position: { x: 244, y: 510 },
    },
    {
      id: 'entity2',
      name: 'Department',
      attrs: [
        { id: 'attr1', name: 'DepartmentID', type: SqlDataType.UUID },
        { id: 'attr2', name: 'DepartmentName', type: SqlDataType.VARCHAR },
        { id: 'attr3', name: 'ManagerID', type: SqlDataType.UUID },
      ],
      position: { x: 468.859375, y: 510 },
    },
    {
      id: 'entity3',
      name: 'Project',
      attrs: [
        { id: 'attr1', name: 'ProjectID', type: SqlDataType.UUID },
        { id: 'attr2', name: 'ProjectName', type: SqlDataType.VARCHAR },
        { id: 'attr3', name: 'Budget', type: SqlDataType.DOUBLE },
      ],
      position: { x: 710.65625, y: 510 },
    },
    {
      id: 'entity4',
      name: 'Client',
      attrs: [
        { id: 'attr1', name: 'ClientID', type: SqlDataType.UUID },
        { id: 'attr2', name: 'ClientName', type: SqlDataType.VARCHAR },
        { id: 'attr3', name: 'ContactInfo', type: SqlDataType.TEXT },
      ],
      position: { x: 919.53125, y: 510 },
    },
    {
      id: 'entity5',
      name: 'Task',
      attrs: [
        { id: 'attr1', name: 'TaskID', type: SqlDataType.UUID },
        { id: 'attr2', name: 'TaskName', type: SqlDataType.VARCHAR },
        { id: 'attr3', name: 'DueDate', type: SqlDataType.TIMESTAMP },
        { id: 'attr4', name: 'Status', type: SqlDataType.VARCHAR },
      ],
      position: { x: 1117.75, y: 510 },
    },
  ],
  relationships: [
    {
      id: 'relationship1',
      name: 'EmployeeDepartment',
      entityAId: 'entity1',
      entityBId: 'entity2',
      cardinality: CardinalityOptions.OneToMany,
      type: TypeOptions.COMMON,
      position: { x: 244, y: 710 },
    },
    {
      id: 'relationship2',
      name: 'EmployeeProject',
      entityAId: 'entity1',
      entityBId: 'entity3',
      cardinality: CardinalityOptions.OneToOne,
      type: TypeOptions.WEAK,
      position: { x: 244, y: 710 },
    },
    {
      id: 'relationship3',
      name: 'ClientProject',
      entityAId: 'entity4',
      entityBId: 'entity3',
      cardinality: CardinalityOptions.OneToOne,
      type: TypeOptions.INHERITANCE,
      position: { x: 438, y: 710 },
    },
    {
      id: 'relationship4',
      name: 'ProjectTask',
      entityAId: 'entity3',
      entityBId: 'entity5',
      cardinality: CardinalityOptions.ManyToMany,
      type: TypeOptions.ASSOCIATIVE,
      position: { x: 612, y: 710 },
    },
  ],
};
