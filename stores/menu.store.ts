export enum FormScope {
  CREATE,
  EDIT,
}

interface MenuOptions {
  activeMenu: DerFlowEnum;
  previousMenu?: DerFlowEnum;
  scope: FormScope;
}

export const previousMenuMapping: Record<DerFlowEnum, DerFlowEnum | undefined> =
  {
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

export const useMenuOptions = defineStore('menu', {
  state: (): MenuOptions => ({
    activeMenu: DerFlowEnum.DEFAULT,
    previousMenu: undefined,
    scope: FormScope.CREATE,
  }),
  actions: {
    setActiveMenu(menu: DerFlowEnum) {
      this.activeMenu = menu;
      this.setPrevious();
    },
    setPrevious() {
      this.previousMenu = previousMenuMapping[this.activeMenu];
    },
    setScope(scope: FormScope) {
      this.scope = scope;
    },
    isEditScope() {
      return this.scope === FormScope.EDIT;
    },
    isCreateScope() {
      return this.scope === FormScope.CREATE;
    },
  },
});
