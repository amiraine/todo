import { BaseMap } from "./BaseMap";

export interface ListItem {
  id: string;
  value: string;
  isDone: boolean;
  created: string;
  due?: string;
  categories: string[];
  note?: string;
}
export interface ListData extends BaseMap<ListItem> {}
