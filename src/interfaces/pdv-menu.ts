export enum PDVMenusEnum {
  DEFAULT,
  PROJECTS,
  TTS,
  LANGUAGE,
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
