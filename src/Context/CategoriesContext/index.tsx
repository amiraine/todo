import React, { createContext, useContext } from "react";
// types

type ActionType = "ADD" | "REMOVE";

export const ListActions: { [key in string]: ActionType } = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};

type ListAction = {
  type: ActionType;
  payload?: any;
};

type UseCategoriesSignature = () => [string[], React.Dispatch<ListAction>];

export const categoryContext = createContext<
  | {
      categories: string[];
      updateCategories: React.Dispatch<ListAction>;
    }
  | undefined
>(undefined);

export const listReducer = (state: string[], action: ListAction) => {
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
  const context = useContext(categoryContext);

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
