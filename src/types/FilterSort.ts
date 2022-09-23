export interface FilterSortData {
  sortKey: SortKey;
  filterCategories: string[];
  filterCompleteItems: boolean;
}

export type SortKey = "creationAsc" | "creationDesc" | "dueAsc" | "dueDesc";
