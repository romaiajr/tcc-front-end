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
    },
    {
      id: 'entity2',
      name: 'Department',
      attrs: [
        { id: 'attr1', name: 'DepartmentID', type: SqlDataType.UUID },
        { id: 'attr2', name: 'DepartmentName', type: SqlDataType.VARCHAR },
        { id: 'attr3', name: 'ManagerID', type: SqlDataType.UUID },
      ],
    },
    {
      id: 'entity3',
      name: 'Project',
      attrs: [
        { id: 'attr1', name: 'ProjectID', type: SqlDataType.UUID },
        { id: 'attr2', name: 'ProjectName', type: SqlDataType.VARCHAR },
        { id: 'attr3', name: 'Budget', type: SqlDataType.DOUBLE },
      ],
    },
    {
      id: 'entity4',
      name: 'Client',
      attrs: [
        { id: 'attr1', name: 'ClientID', type: SqlDataType.UUID },
        { id: 'attr2', name: 'ClientName', type: SqlDataType.VARCHAR },
        { id: 'attr3', name: 'ContactInfo', type: SqlDataType.TEXT },
      ],
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
    },
  ],
  relationships: [
    {
      id: 'relationship1',
      name: 'EmployeeDepartment',
      entityAId: 'entity1', // Employee
      entityBId: 'entity2', // Department
      cardinality: CardinalityOptions.OneToMany,
      type: TypeOptions.COMMON,
    },
    {
      id: 'relationship2',
      name: 'EmployeeProject',
      entityAId: 'entity1', // Employee
      entityBId: 'entity3', // Project
      cardinality: CardinalityOptions.ManyToMany,
      type: TypeOptions.ASSOCIATIVE,
    },
    {
      id: 'relationship3',
      name: 'ClientProject',
      entityAId: 'entity4', // Client
      entityBId: 'entity3', // Project
      cardinality: CardinalityOptions.OneToOne,
      type: TypeOptions.INHERITANCE,
    },
    {
      id: 'relationship4',
      name: 'ProjectTask',
      entityAId: 'entity3', // Project
      entityBId: 'entity5', // Task
      cardinality: CardinalityOptions.OneToOne,
      type: TypeOptions.WEAK,
    },
  ],
};
