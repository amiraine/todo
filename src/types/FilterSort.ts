export interface FilterSortData {
  sortKey: SortKey;
  filterCategories: string[];
  filterCompleteItems: boolean;
  categorize: boolean;
}

export enum SortKey {
  "creationAsc" = "creationAsc",
  "creationDesc" = "creationDesc",
  "dueAsc" = "dueAsc",
  "dueDesc" = "dueDesc",
}
