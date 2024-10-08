import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';

export enum FormScope {
  CREATE,
  EDIT,
}

interface MenuOptions {
  activeMainMenu: PDVMenusEnum;
  activeDerMenu: DerFlowEnum;
  previousDerMenu?: DerFlowEnum;
  scope: FormScope;
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

export const useMenuOptions = defineStore('menu', {
  state: (): MenuOptions => ({
    activeMainMenu: PDVMenusEnum.DEFAULT,
    activeDerMenu: DerFlowEnum.DEFAULT,
    previousDerMenu: undefined,
    scope: FormScope.CREATE,
  }),
  actions: {
    setActiveMainMenu(menu: PDVMenusEnum) {
      this.activeMainMenu = menu;
    },
    setActiveDerMenu(menu: DerFlowEnum) {
      this.activeDerMenu = menu;
      this.setPreviousDerMenu();
    },
    setPreviousDerMenu() {
      this.previousDerMenu = previousDerMenuMapping[this.activeDerMenu];
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
