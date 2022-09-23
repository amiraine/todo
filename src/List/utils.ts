import { ListItem } from "../types";

export const categorizeListItems = (
  listItems: ListItem[]
): { [category: string]: ListItem[] } => {
  return listItems.reduce((acc, next) => {
    const { category } = next;

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