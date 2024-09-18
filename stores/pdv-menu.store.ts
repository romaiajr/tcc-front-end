import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';

export const usePDVMenuStore = defineStore('pdvMenu', {
  state: (): { activeMenu: PDVMenusEnum } => ({
    activeMenu: PDVMenusEnum.MAIN,
  }),
  actions: {
    setActiveMenu(index: PDVMenusEnum) {
      this.activeMenu = index;
    },
  },
});
