import React, { createContext, useContext } from "react";
// import { Settings } from "../../types";

// // types
// type ActionType = "D";

// type Action = {
//   type: ActionType;
//   payload?: any;
// };

// type UseListSignature = () => [Settings, React.Dispatch<Action>];

// export const listContext = createContext<
//   | {
//       todoList: Settings;
//       updateSettings: React.Dispatch<Action>;
//     }
//   | undefined
// >(undefined);

// export const listReducer = (state: Settings, action: Action) => {
//   switch (action.type) {
//     default:
//       return { ...state };
//   }
// };

// export const useSettings: UseListSignature = () => {
//   const context = useContext(listContext);

//   if (context) {
//     const {
//       settings = {
//         nightMode: false,
//       },
//       updateSettings,
//     } = context;
//     return [settings, updateSettings];
//   }
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   return [
//     {
//       nightMode: false,
//     },
//     // eslint-disable-next-line @typescript-eslint/no-empty-function
//     () => {},
//   ];
// };
