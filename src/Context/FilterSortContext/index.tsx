import React, { createContext, useContext } from "react";
import { FilterSortData, SortKey } from "../../types";
// types

type ActionType =
  | "UPDATE_CATEGORIES"
  | "UPDATE_SORT"
  | "UPDATE_DONE"
  | "UPDATE_CATEGORIZE";

type FilterSortAction = {
  type: ActionType;
  payload?: any;
};

type UseFilterSortSignature = () => [
  FilterSortData,
  React.Dispatch<FilterSortAction>
];

export const filterSortContext = createContext<
  | {
      filterSort: FilterSortData;
      updateFilterSort: React.Dispatch<FilterSortAction>;
    }
  | undefined
>(undefined);

export const filterSortReducer = (
  state: FilterSortData,
  action: FilterSortAction
) => {
  switch (action.type) {
    case "UPDATE_CATEGORIES":
      // takes c
      return {
        ...state,
        filterCategories: action.payload,
      };
    case "UPDATE_SORT":
      // takes SortKey
      return {
        ...state,
        sortKey: action.payload,
      };
    case "UPDATE_DONE":
      // takes boolean
      return {
        ...state,
        filterCompleteItems: action.payload,
      };
    case "UPDATE_CATEGORIZE":
      return {
        ...state,
        categorize: action.payload,
      };
    default:
      return { ...state };
  }
};

export const useFilterSortContext: UseFilterSortSignature = () => {
  const context = useContext(filterSortContext);

  if (context) {
    const {
      filterSort = {
        sortKey: SortKey.creationAsc,
        filterCategories: [],
        filterCompleteItems: false,
        categorize: false,
      },
      updateFilterSort,
    } = context;
    return [filterSort, updateFilterSort];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return [
    {
      sortKey: SortKey.creationAsc,
      filterCategories: [],
      filterCompleteItems: false,
      categorize: false,
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
  ];
};
