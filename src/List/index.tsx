import React, { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
// local
import { useDayData } from "../Context";
import { ListData, ListItem as ListItemType, TaskState } from "../types";
import { useKeyboardShortcut } from "../hooks";
// components and styles
import { Container, ListWrapper } from "./styled";
import { useFilterSortContext } from "../Context";
// import { categorizeListItems } from "./utils";
import FilterSortSettings from "./FilterSortSettings";
import DraggableList from "./DraggableList";
import StaticList from "./StaticList";
import DayNavigator from "./DayNavigator";
import moment from "moment";

interface ListProps {}

export type UpdateKey = keyof ListItemType;

const List: React.FC<ListProps> = () => {
  // local state
  const [editable, setEditable] = useState<string>("");
  const [selectedDayData, setSelectedDayData] = useState<ListData>({
    items: {},
    sort: [],
    selected: "",
  });
  // get context and destructure
  const [day, dayDispatch] = useDayData();
  const { items: dayItems, sort: daySort, selected: daySelected } = day;
  const [filterSort, filterSortDispatch] = useFilterSortContext();
  const { categorize, filterCompleteItems } = filterSort;

  // other hooks
  useEffect(() => {
    const selectedDay = dayItems[daySelected];
    setSelectedDayData(selectedDay);
  }, [dayItems, daySelected]);
  // vars

  // Basic CRUD helpers
  const handleAddNewItem = () => {
    // make this worka t the list level, not the day level
    const payload: ListItemType = {
      id: v4(),
      value: "",
      status: TaskState["Not Started"],
      category: null,
      created: moment().format("L"),
    };

    // listDispatch({ type: "ADD", payload });
    setEditable(payload.id);
    return;
  };

  // todo make all basic helpers for the day thing
  const handleAddNewDay = () => {
    const todayData = dayItems[moment().format("L")];
    // create empty basemap
    const payload: ListData = {
      items: {},
      sort: [],
      selected: "",
    };
    const unfinishedTasksFromToday = todayData.sort
      .map((taskId) => {
        return todayData.items[taskId];
      })
      .filter((x) => x.status !== TaskState.Complete);
    const newItems = unfinishedTasksFromToday.reduce(
      (acc: { [key: string]: ListItemType }, next: ListItemType) => {
        return { ...acc, [next.id]: next };
      },
      {}
    );
    payload.items = { ...newItems };
    payload.sort = [...daySort].filter((id) =>
      Object.keys(newItems).includes(id)
    );
    payload.selected = daySelected;

    dayDispatch({
      type: "ADD_DAY",
      payload: { id: moment().add(1, "day").format("L"), ...payload },
    });
  };

  const handleUpdateItem = (id: string, key: UpdateKey, newValue: any) => {
    // const payload: ListItemType = { ...items[id], [key]: newValue };
    // listDispatch({ type: "UPDATE", payload });
  };

  const handleDeselectItem = () => {
    // todo fix for nested data
    // if (daySelected && daySelected !== "") {
    setEditable("");
    handleSelectItem("");
    // }
  };

  const handleToggleCategorize = (payload: boolean) => {
    filterSortDispatch({
      type: "UPDATE_CATEGORIZE",
      payload,
    });
  };

  const handleToggleFilterComplete = (payload: boolean) => {
    filterSortDispatch({
      type: "UPDATE_DONE",
      payload,
    });
  };

  // Other basic helpers
  const resetLocalState = () => {
    setEditable("");
  };

  const handleSelectItem = (id: string) => {
    // listDispatch({ type: "SETACTIVE", payload: id });
  };

  const handleDeleteItem = (id: string) => {
    // don't delete if there's only one item in the list
    // if (sort.length === 1) return;
    // clear editable
    if (editable === id) {
      resetLocalState();
    }
    // listDispatch({ type: "REMOVE", payload: id });
  };

  const handleReorder = (payload: string[]) => {
    // listDispatch({ type: "REORDER", payload });
  };

  const handleGoForward = () => {
    const currentIdx = daySort.indexOf(daySelected);
    if (currentIdx + 1 === daySort.length) {
      handleAddNewDay();
    } else {
      dayDispatch({ type: "SET_ACTIVE", payload: daySort[currentIdx + 1] });
    }
  };

  // additional helpers
  const handleCopyItem = (id: string) => {
    // const payload = { ...items[id] };
    // reassign the id, set to 'not done', set created to current Date obj
    // payload.id = v4();
    // payload.status = TaskState["Not Started"];
    // payload.created = new Date().toDateString();
    // listDispatch({ type: "ADD", payload });
  };

  const handleDeleteItemBackspace = () => {
    const input = document.getElementById(editable) as HTMLInputElement;

    if (editable !== "") {
      // const item = items[editable];
      // const itemIndex = sort.indexOf(editable);
      // if (itemIndex === 0) {
      //   // if this item is at the top of the list, do nothing
      //   return;
      // }
      if (input.selectionStart === 0) {
        // todo: fix backspace bug
      }
      // if (item.value === "") {
      //   handleDeleteItem(editable);
      //   const prevItemId = sort[itemIndex - 1];
      //   handleSelectItem(prevItemId);
      //   setEditable(prevItemId);
      // }
    }
  };
  // applies to tab and spacebar
  const handleLineChange = () => {
    // do nothing if not editing
    if (!editable) return;
    //todo refactor for day mode
    // // check browser focus. If user is editing the textarea,
    // const focusedElement = document.activeElement;
    // if (focusedElement && !focusedElement.id.includes("task-item")) return;

    // const editingIndex = sort.indexOf(editable);

    // if (editingIndex === sort.length - 1) {
    //   handleAddNewItem();
    // } else {
    //   const nextItemId = sort[editingIndex + 1];
    //   setEditable(nextItemId);
    //   handleSelectItem(nextItemId);
    // }
  };

  // register shortcuts
  useKeyboardShortcut({ key: "Enter" }, handleLineChange, false);
  useKeyboardShortcut({ key: "Escape" }, handleDeselectItem);
  useKeyboardShortcut({ key: "Backspace" }, handleDeleteItemBackspace, false);
  useKeyboardShortcut({ key: "Tab" }, handleLineChange);

  const disableNext = useMemo(() => {
    const tomorrow = moment().add(1, "day").format("L");
    const latestDay = moment(daySort[daySort.length - 1]).format("L");
    return tomorrow === latestDay;
  }, [daySort]);

  return (
    <Container>
      <DayNavigator
        selectedDay={daySelected}
        handleGoForward={handleGoForward}
        handleGoBack={() => {}}
        disableNext={disableNext}
      />
      <FilterSortSettings
        handleToggleCategorize={handleToggleCategorize}
        handleToggleFilterComplete={handleToggleFilterComplete}
      />
      <ListWrapper>
        {categorize ? (
          <StaticList
            listData={selectedDayData}
            editable={editable}
            handleCopyItem={handleCopyItem}
            handleSelectItem={handleSelectItem}
            handleDeleteItem={handleDeleteItem}
            handleUpdateItem={handleUpdateItem}
            setEditable={setEditable}
            filterCompleteItems={filterCompleteItems}
          />
        ) : (
          <DraggableList
            listData={selectedDayData}
            editable={editable}
            handleCopyItem={handleCopyItem}
            handleReorder={handleReorder}
            handleSelectItem={handleSelectItem}
            handleDeleteItem={handleDeleteItem}
            handleUpdateItem={handleUpdateItem}
            setEditable={setEditable}
            filterCompleteItems={filterCompleteItems}
          />
        )}
      </ListWrapper>
    </Container>
  );
};

export default List;
