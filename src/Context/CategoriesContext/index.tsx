import React, { createContext, useContext } from "react";
// types

type ActionType = "ADD" | "REMOVE";

export const CategoryActions: { [key in string]: ActionType } = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};

type CategoryAction = {
  type: ActionType;
  payload?: any;
};

type UseCategoriesSignature = () => [string[], React.Dispatch<CategoryAction>];

export const categoriesContext = createContext<
  | {
      categories: string[];
      updateCategories: React.Dispatch<CategoryAction>;
    }
  | undefined
>(undefined);

export const categoriesReducer = (state: string[], action: CategoryAction) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE":
      const copy = [...state].filter((x) => x !== action.payload);
      return [...copy];
    default:
      return [...state];
  }
};

export const useCategoriesContext: UseCategoriesSignature = () => {
  const context = useContext(categoriesContext);

  if (context) {
    const { categories = [], updateCategories } = context;
    return [categories, updateCategories];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return [
    [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
  ];
};
