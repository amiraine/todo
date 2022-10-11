import { ListItem, TaskState } from "../types";
import { palette } from "../utils";

export const categorizeListItems = (
  listItems: ListItem[],
  hideCompleted: boolean
): { [category: string]: ListItem[] } => {
  return listItems.reduce((acc, next) => {
    const { category, status } = next;

    // short circuit here if needed
    if (hideCompleted && status === TaskState.Complete) {
      return acc;
    }

    if (!category) {
      // check if there is already an array for items with no categories
      const noCategory = acc["None"];
      // if there is, add `next`to it, otherwise initialize a new array with next as an item
      return {
        ...acc,
        None: noCategory ? [...noCategory, next] : [next],
      };
    }

    const categoryArr = acc[category];
    return {
      ...acc,
      [category]: categoryArr ? [...categoryArr, next] : [next],
    };
  }, {});
};

export const stateColorMap = {
  [TaskState.Complete]: palette.completed,
  [TaskState["In Progress"]]: palette.inProgress,
  [TaskState["Not Started"]]: palette.notStarted,
};
