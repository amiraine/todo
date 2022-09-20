import { BaseMap } from "./BaseMap";

export interface ListItem {
  id: string;
  value: string;
  isDone: boolean;
  category?: Marker;
  dueDate?: string;
}

export type Marker = "star" | "zap";

export interface ListData extends BaseMap<ListItem> {}
