import React, { createContext, useContext } from "react";
import { ListData } from "../../types";
// types

type ActionType = "ADD" | "REMOVE" | "UPDATE" | "SETACTIVE" | "REORDER";

export const ListActions: { [key in string]: ActionType } = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
  SETACTIVE: "SETACTIVE",
  REORDER: "REORDER",
};

type ListAction = {
  type: ActionType;
  payload?: any;
};

type UseListSignature = () => [ListData, React.Dispatch<ListAction>];

export const listContext = createContext<
  | {
      todoList: ListData;
      updateTodoList: React.Dispatch<ListAction>;
    }
  | undefined
>(undefined);

export const listReducer = (state: ListData, action: ListAction) => {
  switch (action.type) {
    case "REORDER": {
      return {
        ...state,
        sort: [...action.payload],
      };
    }
    case "ADD":
      return {
        ...state,
        selected: action.payload.id,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...action.payload,
          },
        },
        sort: [...state.sort, action.payload.id],
      };
    case "UPDATE": {
      const copy = { ...state.items };
      copy[action.payload.id] = action.payload;
      return {
        ...state,
        items: { ...copy },
      };
    }
    case "REMOVE":
      const copy = { ...state.items };
      delete copy[action.payload];
      const activeId = Object.keys(copy)[Object.keys(copy).length - 1];
      const sortCopy = [...state.sort];
      const itemIndex = sortCopy.findIndex((id) => id === action.payload);
      sortCopy.splice(itemIndex, 1);
      return {
        ...state,
        items: { ...copy },
        selected: activeId,
        sort: sortCopy,
      };
    case "SETACTIVE":
      return { ...state, selected: action.payload };
    default:
      return { ...state };
  }
};

export const useListData: UseListSignature = () => {
  const context = useContext(listContext);

  if (context) {
    const {
      todoList = {
        selected: "",
        items: {},
        sort: [],
      },
      updateTodoList,
    } = context;
    return [todoList, updateTodoList];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return [
    {
      selected: "",
      items: {},
      sort: [],
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
  ];
};
