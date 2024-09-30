export enum PDVMenusEnum {
  MAIN,
  PROJECTS,
  TTS,
  LANGUAGE,
  Der,
}

export interface MenuItem {
  label: string;
  targetMenu?: PDVMenusEnum;
  action?: () => void;
}

export interface Menu {
  title: string;
  items: MenuItem[];
}
