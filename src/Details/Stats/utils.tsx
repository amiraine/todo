import { ListItem } from "../../types";

export const calculateDoneData = (items: ListItem[]) => {
  const done: number = items.filter((item) => item.isDone).length;
  const notDone = items.filter((item) => !item.isDone).length;

  return [
    { name: "done", value: done },
    { name: "notDone", value: notDone },
  ];
};
