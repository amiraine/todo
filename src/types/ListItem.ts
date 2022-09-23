import { BaseMap } from "./BaseMap";

export enum TaskState {
  "Complete" = "Complete",
  "In Progress" = "In Progress",
  "Not Started" = "Not Started",
}
export interface ListItem {
  id: string;
  value: string;
  status: TaskState;
  created: string;
  due?: string;
  categories: string[];
  note?: string;
}
export interface ListData extends BaseMap<ListItem> {}
