export interface ListItem {
  id: string;
  value: string;
  isDone: boolean;
  category?: Marker;
}

export type Marker = "star" | "zap";
