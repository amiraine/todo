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
  const { items: taskItems, sort: taskSort, selected: taskSelected } = dayItems[
    daySelected
  ];
  const [filterSort, filterSortDispatch] = useFilterSortContext();
  const { categorize, filterCompleteItems } = filterSort;

  // other hooks
  useEffect(() => {
    const selectedDay = dayItems[daySelected];
    setSelectedDayData(selectedDay);
  }, [dayItems, daySelected]);

  // Day CRUD functions
  const handleAddNewDay = () => {
    const {
      sort: todaySort,
      items: todayItems,
      // selected: todaySelected,
    } = dayItems[moment().format("L")];
    // create empty basemap
    const payload: ListData = {
      items: {},
      sort: [],
      selected: "",
    };
    const unfinishedTasksFromToday = todaySort
      .map((taskId) => {
        return todayItems[taskId];
      })
      .filter((x) => x.status !== TaskState.Complete);
    const newItems = unfinishedTasksFromToday.reduce(
      (acc: { [key: string]: ListItemType }, next: ListItemType) => {
        return { ...acc, [next.id]: next };
      },
      {}
    );

    payload.items = { ...newItems };
    payload.sort = [...todaySort].filter((id) =>
      Object.keys(newItems).includes(id)
    );
    payload.selected = payload.sort[0];

    dayDispatch({
      type: "ADD_DAY",
      payload: { id: moment().add(1, "day").format("L"), ...payload },
    });
  };

  // task CRUDS
  const handleAddNewTask = () => {
    // make this work at the list level, not the day level
    const payload: ListItemType = {
      id: v4(),
      value: "",
      status: TaskState["Not Started"],
      category: null,
      created: moment().format("L"),
    };

    dayDispatch({ type: "ADD_TASK", payload });
    setEditable(payload.id);
    return;
  };

  const handleUpdateItem = (id: string, key: UpdateKey, newValue: any) => {
    const payload: ListItemType = { ...taskItems[id], [key]: newValue };

    dayDispatch({ type: "UPDATE_TASK", payload });
  };

  const handleDeselectItem = () => {
    setEditable("");
    handleSelectTask("");
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

  const handleSelectTask = (id: string) => {
    dayDispatch({ type: "SET_SELECTED_TASK", payload: id });
  };

  const handleDeleteItem = (id: string) => {
    // don't delete if there's only one item in the list
    if (taskSort.length === 1) return;
    // clear editable
    if (editable === id) {
      resetLocalState();
    }
    dayDispatch({ type: "DELETE_TASK", payload: id });
  };

  const handleReorder = (payload: string[]) => {
    dayDispatch({ type: "REORDER_TASKS", payload });
  };

  const handleGoForward = () => {
    const currentIdx = daySort.indexOf(daySelected);
    if (currentIdx + 1 === daySort.length) {
      handleAddNewDay();
    } else {
      // if editing, unfocus text input and clear editable
      if (editable !== "") {
        const activeEl = document.activeElement;
        // unfocus text input
        if (activeEl && activeEl instanceof HTMLElement) {
          activeEl.blur();
        }
        setEditable("");
      }
      // then update state
      dayDispatch({
        type: "SET_SELECTED_DAY",
        payload: daySort[currentIdx + 1],
      });
    }
  };

  const handleGoBack = () => {
    const currentIdx = daySort.indexOf(daySelected);
    // do nothing if at the beginning of the list
    if (currentIdx === 0) return;
    // if editing, unfocus text input and clear editable
    if (editable !== "") {
      const activeEl = document.activeElement;
      // unfocus text input
      if (activeEl && activeEl instanceof HTMLElement) {
        activeEl.blur();
      }
      setEditable("");
    }
    // then update state
    dayDispatch({ type: "SET_SELECTED_DAY", payload: daySort[currentIdx - 1] });
  };

  // additional helpers
  const handleCopyItem = (id: string) => {
    const payload = { ...taskItems[id] };
    // reassign the id, set to 'not done', set created to current Date obj
    payload.id = v4();
    payload.status = TaskState["Not Started"];
    payload.created = moment().format("L");
    dayDispatch({ type: "ADD_TASK", payload });
  };

  const handleDeleteItemBackspace = () => {
    const input = document.getElementById(editable) as HTMLInputElement;

    if (editable !== "") {
      const item = taskItems[editable];
      const itemIndex = taskSort.indexOf(editable);
      if (itemIndex === 0) {
        // if this item is at the top of the list, do nothing
        return;
      }
      if (input.selectionStart === 0) {
        // todo: fix backspace bug
      }
      if (item.value === "") {
        handleDeleteItem(editable);
        const prevItemId = taskSort[itemIndex - 1];
        handleSelectTask(prevItemId);
        setEditable(prevItemId);
      }
    }
  };

  // applies to tab and spacebar
  const handleLineChange = () => {
    // do nothing if not editing
    if (!editable) return;
    // check browser focus. If user is editing the textarea,
    const focusedElement = document.activeElement;
    if (focusedElement && !focusedElement.id.includes("task-item")) return;

    const editingIndex = taskSort.indexOf(editable);

    if (editingIndex === taskSort.length - 1) {
      handleAddNewTask();
    } else {
      const nextItemId = taskSort[editingIndex + 1];
      setEditable(nextItemId);
      handleSelectTask(nextItemId);
    }
  };

  const handleDownArrow = () => {
    const selectedIndex = taskSort.indexOf(taskSelected);
    if (selectedIndex === -1 || selectedIndex === taskSort.length - 1) {
      handleSelectTask(taskSort[0]);
    } else {
      handleSelectTask(taskSort[selectedIndex + 1]);
    }
    if (editable.length > 0) {
      setEditable(taskSort[selectedIndex + 1]);
    }
  };

  const handleUpArrow = () => {
    const selectedIndex = taskSort.indexOf(taskSelected);
    if (selectedIndex === -1 || selectedIndex === 0) {
      handleSelectTask(taskSort[taskSort.length - 1]);
      if (editable.length > 0) {
        setEditable(taskSort[taskSort[taskSort.length - 1]]);
      }
    } else {
      handleSelectTask(taskSort[selectedIndex - 1]);
      if (editable.length > 0) {
        setEditable(taskSort[selectedIndex - 1]);
      }
    }
  };

  // register shortcuts
  useKeyboardShortcut({ key: "Enter" }, handleLineChange, false);
  useKeyboardShortcut({ key: "Escape" }, handleDeselectItem);
  useKeyboardShortcut({ key: "Backspace" }, handleDeleteItemBackspace, false);
  useKeyboardShortcut({ key: "Tab" }, handleLineChange);
  useKeyboardShortcut({ key: "ArrowDown" }, handleDownArrow);
  useKeyboardShortcut({ key: "ArrowUp" }, handleUpArrow);

  // memos
  const disableNext = useMemo(() => {
    const tomorrow = moment().add(1, "day").format("L");
    return daySelected === tomorrow;
  }, [daySelected]);
  const disablePrev = useMemo(() => {
    const currentIdx = daySort.indexOf(daySelected);
    return currentIdx === 0;
  }, [daySort, daySelected]);

  return (
    <Container>
      <DayNavigator
        selectedDay={daySelected}
        handleGoForward={handleGoForward}
        handleGoBack={handleGoBack}
        disableNext={disableNext}
        disablePrev={disablePrev}
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
            handleSelectTask={handleSelectTask}
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
            handleSelectTask={handleSelectTask}
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
