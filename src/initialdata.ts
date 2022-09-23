import { FilterSortData, ListData, SortKey, TaskState } from "./types";
import moment from "moment";

export const initialCategories: string[] = [
  "Home",
  "Work",
  "Hobby",
  "Urgent",
  "Cleaning",
];

export const initialData: ListData = {
  items: {
    "a711664b-e246-4108-a058-84fe00fb98a1": {
      id: "a711664b-e246-4108-a058-84fe00fb98a1",
      value: "Water plants",
      status: TaskState["Not Started"],
      category: initialCategories[0],
      created: moment("2022-09-20", "YYYY-MM-DD").format(),
    },
    "648ff21c-16c3-4e9d-b67a-97a78f8acaca": {
      id: "648ff21c-16c3-4e9d-b67a-97a78f8acaca",
      value: "Feed cats",
      status: TaskState["Complete"],
      category: initialCategories[3],
      created: moment().format(),
    },
    "21e7fd54-1d90-4322-9d13-7b10296eea19": {
      id: "21e7fd54-1d90-4322-9d13-7b10296eea19",
      value: "Send cousin birthday card",
      created: new Date().toDateString(),
      status: TaskState["Not Started"],
      category: initialCategories[3],
      due: moment().add(2, "day").format(),
    },
  },
  sort: [
    "a711664b-e246-4108-a058-84fe00fb98a1",
    "648ff21c-16c3-4e9d-b67a-97a78f8acaca",
    "21e7fd54-1d90-4322-9d13-7b10296eea19",
  ],
  selected: "a711664b-e246-4108-a058-84fe00fb98a1",
};

export const initialFilters: FilterSortData = {
  sortKey: SortKey.creationAsc,
  filterCategories: [],
  filterCompleteItems: false,
  categorize: false,
};
