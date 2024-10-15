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
