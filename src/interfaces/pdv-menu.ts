export enum PDVMenusEnum {
  DEFAULT,
  PROJECTS,
  TTS,
}

export interface MenuItem {
  label: string;
  action?: () => void;
  infoText?: string;
}

export interface Menu {
  title: string;
  items: MenuItem[];
}

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

export const previousDerMenuMapping: Record<
  DerFlowEnum,
  DerFlowEnum | undefined
> = {
  [DerFlowEnum.DEFAULT]: undefined,
  [DerFlowEnum.ENTITIES]: DerFlowEnum.DEFAULT,
  [DerFlowEnum.ENTITY_OPTIONS]: DerFlowEnum.ENTITIES,
  [DerFlowEnum.ATTRS]: DerFlowEnum.ENTITY_OPTIONS,
  [DerFlowEnum.ATTR_OPTIONS]: DerFlowEnum.ATTRS,
  [DerFlowEnum.RELATIONSHIPS]: DerFlowEnum.DEFAULT,
  [DerFlowEnum.RELATIONSHIP_OPTIONS]: DerFlowEnum.RELATIONSHIPS,
  [DerFlowEnum.NEW_ENTITY]: DerFlowEnum.DEFAULT,
  [DerFlowEnum.NEW_ATTR]: DerFlowEnum.ENTITY_OPTIONS,
  [DerFlowEnum.NEW_RELATIONSHIP]: DerFlowEnum.DEFAULT,
};
