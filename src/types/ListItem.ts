import { BaseMap } from "./BaseMap";

export interface ListItem {
  id: string;
  value: string;
  isDone: boolean;
  created: Date;
  // marker?: Marker;
  due?: string;
  categories: string[];
}

export enum Marker {
  "star" = "star",
  "zap" = "zap",
  "heart" = "heart",
  "moon" = "moon",
}

export interface ListData extends BaseMap<ListItem> {}
