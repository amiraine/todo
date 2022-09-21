import { BaseMap } from "./BaseMap";

export interface ListItem {
  id: string;
  value: string;
  isDone: boolean;
  marker?: Marker;
  dueDate?: string;
}

export enum Marker {
  "star" = "star",
  "zap" = "zap",
  "heart" = "heart",
  "moon" = "moon",
}

export interface ListData extends BaseMap<ListItem> {}
