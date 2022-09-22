import { ListData } from "./types";

export const initialData: ListData = {
  items: {
    "a711664b-e246-4108-a058-84fe00fb98a1": {
      id: "a711664b-e246-4108-a058-84fe00fb98a1",
      value: "Water plants",
      isDone: true,
    },
    "648ff21c-16c3-4e9d-b67a-97a78f8acaca": {
      id: "648ff21c-16c3-4e9d-b67a-97a78f8acaca",
      value: "Feed cats",
      isDone: false,
    },
  },
  sort: [
    "a711664b-e246-4108-a058-84fe00fb98a1",
    "648ff21c-16c3-4e9d-b67a-97a78f8acaca",
  ],
  selected: "",
};

export const initialCategories: string[] = [
  "Home",
  "Work",
  "Hobby",
  "Urgent",
  "Cleaning",
];
