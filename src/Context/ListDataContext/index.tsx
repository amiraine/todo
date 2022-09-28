import React, { createContext, useContext } from "react";
import { DayData, ListData, ListItem } from "../../types";

type ActionType =
  | "ADD_DAY"
  | "ADD_TASK"
  | "UPDATE_TASK"
  | "SET_SELECTED_DAY"
  | "SET_SELECTED_TASK"
  | "DELETE_TASK"
  | "REORDER_TASKS";

type Action = {
  type: ActionType;
  payload: any;
};

type UseDataSignature = () => [DayData, React.Dispatch<Action>];

export const DayContext = createContext<
  | {
      data: DayData;
      updateData: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export const dayReducer = (state: DayData, action: Action): DayData => {
  const { payload } = action;
  const selectedDay = { ...state.items[state.selected] };

  switch (action.type) {
    // Day Level
    case "ADD_DAY":
      // takes a ListData obk
      return {
        ...state,
        selected: payload.id,
        items: {
          ...state.items,
          [payload.id]: {
            ...payload,
          },
        },
        sort: [...state.sort, payload.id],
      };
    case "SET_SELECTED_DAY":
      // payload: id string
      return {
        ...state,
        selected: payload,
      };
    // Task Level
    case "ADD_TASK":
      // payload: ListItem
      selectedDay.items = { ...selectedDay.items, [payload.id]: payload };
      selectedDay.sort = [...selectedDay.sort, payload.id];
      selectedDay.selected = payload.id;

      return {
        ...state,
        items: { ...state.items, [state.selected]: selectedDay },
      };
    case "REORDER_TASKS":
      // payload: array of id strings
      selectedDay.sort = payload;
      return {
        ...state,
        items: { ...state.items, [state.selected]: selectedDay },
      };
    case "UPDATE_TASK":
      //  payload: list item
      const todayItems: { [key: string]: ListItem } = {
        ...state.items[state.selected].items,
      };
      todayItems[payload.id] = payload;
      const updatedList: ListData = {
        items: todayItems,
        sort: selectedDay.sort,
        selected: selectedDay.selected,
      };
      return {
        ...state,
        items: { ...state.items, [state.selected]: updatedList },
      };
    case "DELETE_TASK":
      // payload: string id
      const newSort = selectedDay.sort.filter((id) => {
        return id !== payload;
      });
      selectedDay.sort = newSort;
      const newItems = newSort.reduce((acc, next) => {
        const task = selectedDay.items[next];
        return {
          ...acc,
          [task.id]: task,
        };
      }, {});
      selectedDay.items = newItems;
      return {
        ...state,
        items: { ...state.items, [state.selected]: selectedDay },
      };
    case "SET_SELECTED_TASK": {
      selectedDay.selected = payload;
      return {
        ...state,
        items: { ...state.items, [state.selected]: selectedDay },
      };
    }
    default:
      console.error("Unexpected action type: ", action.type);
      return { ...state };
  }
};

export const useDayData: UseDataSignature = () => {
  const context = useContext(DayContext);

  if (context) {
    const {
      data = {
        selected: "",
        items: {},
        sort: [],
      },
      updateData,
    } = context;
    return [data, updateData];
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
