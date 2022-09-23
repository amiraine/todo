import React, { createContext, useContext } from "react";
import { FilterSortData, SortKey } from "../../types";
// types

type ActionType = "UPDATE_CATEGORIES" | "UPDATE_SORT" | "UPDATE_DONE";

export const FilterSortActions: { [key in string]: ActionType } = {
  UPDATE_CATEGORIES: "UPDATE_CATEGORIES",
  UPDATE_SORT: "UPDATE_SORT",
  UPDATE_DONE: "UPDATE_DONE",
};

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
      // takes array of categories as payload
      return {
        ...state,
        filterCategories: action.payload,
      };
    case "UPDATE_SORT":
      return {
        ...state,
        sortKey: action.payload,
      };
    case "UPDATE_DONE":
      return {
        ...state,
        filterCompleteItems: action.payload,
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
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
  ];
};
