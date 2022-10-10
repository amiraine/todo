import { DayData, FilterSortData, ListData, SortKey, TaskState } from "./types";
import moment from "moment";

export const initialCategories: string[] = [
  "Home",
  "Work",
  "Hobby",
  "Urgent",
  "Cleaning",
];

export const yesterdayData: ListData = {
  items: {
    "a711664b-e246-4108-a058-84fe00fb98a1": {
      id: "a711664b-e246-4108-a058-84fe00fb98a1",
      value: "Water plants",
      status: TaskState["Not Started"],
      category: initialCategories[0],
      created: moment().subtract(1, "day").format(),
    },
    "648ff21c-16c3-4e9d-b67a-97a78f8acaca": {
      id: "648ff21c-16c3-4e9d-b67a-97a78f8acaca",
      value: "Feed cats",
      status: TaskState["Complete"],
      category: initialCategories[0],
      created: moment().format(),
    },
    "21e7fd54-1d90-4322-9d13-7b10296eea19": {
      id: "21e7fd54-1d90-4322-9d13-7b10296eea19",
      value: "Send cousin birthday card",
      created: moment().format(),
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

export const todayData: ListData = {
  items: {
    "a711664b-e246-4108-a058-84fe00fb98a1": {
      id: "a711664b-e246-4108-a058-84fe00fb98a1",
      value: "Water plants",
      status: TaskState["Done"],
      category: initialCategories[0],
      created: moment().subtract(1, "day").format(),
    },
    "21e7fd54-1d90-4322-9d13-7b10296eea19": {
      id: "21e7fd54-1d90-4322-9d13-7b10296eea19",
      value: "Send cousin birthday card",
      created: moment().format(),
      status: TaskState["Complete"],
      category: initialCategories[3],
      due: moment().add(2, "day").format(),
    },
    "b2e4fa15-81cf-4f67-b85d-86c90dcb9f54": {
      id: "b2e4fa15-81cf-4f67-b85d-86c90dcb9f54",
      value: "Meal prep",
      created: moment().format(),
      status: TaskState["In Progress"],
      category: initialCategories[0],
      due: moment().add(1, "day").format(),
    },
    "17746fec-3a20-4395-a6f5-457569d17b2a": {
      id: "17746fec-3a20-4395-a6f5-457569d17b2a",
      value: "Take out trash",
      created: moment().format(),
      status: TaskState["Not Started"],
      category: initialCategories[0],
    },
    "93596b9f-8bbb-412b-86b1-4800d6787586": {
      id: "93596b9f-8bbb-412b-86b1-4800d6787586",
      value: "Work on ticket 17465",
      created: moment().format(),
      status: TaskState["In Progress"],
      category: initialCategories[1],
      due: moment().add(3, "day").format(),
    },
  },
  sort: [
    "a711664b-e246-4108-a058-84fe00fb98a1",
    "21e7fd54-1d90-4322-9d13-7b10296eea19",
    "b2e4fa15-81cf-4f67-b85d-86c90dcb9f54",
    "17746fec-3a20-4395-a6f5-457569d17b2a",
    "93596b9f-8bbb-412b-86b1-4800d6787586",
  ],
  selected: "a711664b-e246-4108-a058-84fe00fb98a1",
};

export const tomorrowData: ListData = {
  items: {
    "b2e4fa15-81cf-4f67-b85d-86c90dcb9f54": {
      id: "b2e4fa15-81cf-4f67-b85d-86c90dcb9f54",
      value: "Meal prep",
      created: moment().format("L"),
      status: TaskState["In Progress"],
      category: initialCategories[0],
      due: moment().add(1, "day").format("L"),
    },
    "17746fec-3a20-4395-a6f5-457569d17b2a": {
      id: "17746fec-3a20-4395-a6f5-457569d17b2a",
      value: "Take out trash",
      created: moment().format("L"),
      status: TaskState["Not Started"],
      category: initialCategories[0],
    },
    "93596b9f-8bbb-412b-86b1-4800d6787586": {
      id: "93596b9f-8bbb-412b-86b1-4800d6787586",
      value: "Work on ticket 17465",
      created: moment().format(),
      status: TaskState["In Progress"],
      category: initialCategories[1],
      due: moment().add(2, "day").format("L"),
    },
  },
  sort: [
    "b2e4fa15-81cf-4f67-b85d-86c90dcb9f54",
    "17746fec-3a20-4395-a6f5-457569d17b2a",
    "93596b9f-8bbb-412b-86b1-4800d6787586",
  ],
  selected: "b2e4fa15-81cf-4f67-b85d-86c90dcb9f54",
};

const yesterday = moment().subtract(1, "day").format("MM-DD-YYYY");
const today = moment().format("MM-DD-YYYY");
const tomorrow = moment().add(1, "day").format("MM-DD-YYYY");

export const initialData: DayData = {
  items: {
    [yesterday]: yesterdayData,
    [today]: todayData,
    // [tomorrow]: tomorrowData,
  },
  sort: [yesterday, today, tomorrow],
  selected: today,
};

export const initialFilters: FilterSortData = {
  sortKey: SortKey.creationAsc,
  filterCategories: [],
  filterCompleteItems: false,
  categorize: false,
};
