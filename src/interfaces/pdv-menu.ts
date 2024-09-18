export enum PDVMenusEnum {
  MAIN,
  PROJECTS,
  TTS,
  LANGUAGE,
  DER,
}

export interface MenuItem {
  label: string;
  targetMenu?: PDVMenusEnum;
  action?: () => void;
}

export interface Menu {
  id: number;
  title: string;
  items: MenuItem[];
}
