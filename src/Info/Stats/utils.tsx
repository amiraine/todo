import { ListItem, TaskState } from "../../types";

export const calculateDoneData = (items: ListItem[]) => {
  const done: number = items.filter(
    (item) => item.status === TaskState.Complete
  ).length;
  const notDone = items.filter((item) => item.status !== TaskState.Complete)
    .length;

  return [
    { name: "done", value: done },
    { name: "notDone", value: notDone },
  ];
};
