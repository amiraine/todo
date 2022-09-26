import React, { createContext, useContext } from "react";
import { DayData } from "../../types";

type ActionType = "ADD_DAY" | "UPDATE_DAY" | "SET_ACTIVE" | "REORDER_TASKS";

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

  switch (action.type) {
    case "ADD_DAY":
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
    case "UPDATE_DAY":
      // payload isa ListData
      const copy = { ...state.items };
      copy[payload.id] = payload;
      return { ...state, items: { ...copy } };
    case "SET_ACTIVE":
      // payload is id string
      return {
        ...state,
        selected: payload,
      };
    case "REORDER_TASKS":
    // payload is
    default:
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
