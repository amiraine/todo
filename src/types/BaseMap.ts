export interface BaseMap<T> {
  items: {
    [key: string]: T;
  };
  sort: string[];
  selected: string;
}
