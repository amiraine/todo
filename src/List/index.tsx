import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
// local
import { useListData } from "../Context/ListDataContext";
import { ListItem as ListItemType, TaskState } from "../types";
import { useKeyboardShortcut } from "../hooks";
// components and styles
import ListItem from "./ListItem";
import { Container, ListWrapper } from "./styled";
import { useFilterSortContext } from "../Context";
import { categorizeListItems } from "./utils";
import FilterSortSettings from "./FilterSortSettings";
import DraggableList from "./DraggableList";
import StaticList from "./StaticList";

interface ListProps {}

export type UpdateKey = keyof ListItemType;

const List: React.FC<ListProps> = () => {
  // local state
  const [editable, setEditable] = useState<string>("");
  const [categoryListMap, setCategoryListMap] = useState<{
    [category: string]: ListItemType[];
  }>({});

  // get context and destructure
  const [listData, listDispatch] = useListData();
  const { items, sort, selected } = listData;
  const [filterSort, filterSortDispatch] = useFilterSortContext();
  const { categorize } = filterSort;

  // Hooks
  useEffect(() => {
    const listItems: ListItemType[] = sort.map((id) => items[id]);
    const sortedListData: { [category: string]: ListItemType[] } = categorize
      ? categorizeListItems(listItems)
      : { None: [...listItems] };
    setCategoryListMap(sortedListData);
  }, [categorize, sort, items]);

  // Basic CRUD helpers
  const handleAddNewItem = () => {
    const payload: ListItemType = {
      id: v4(),
      value: "",
      status: TaskState["Not Started"],
      category: null,
      created: new Date().toDateString(),
    };

    listDispatch({ type: "ADD", payload });
    setEditable(payload.id);
    return;
  };

  const handleUpdateItem = (id: string, key: UpdateKey, newValue: any) => {
    const payload: ListItemType = { ...items[id], [key]: newValue };

    listDispatch({ type: "UPDATE", payload });
  };

  const handleDeselectItem = () => {
    if (selected && selected !== "") {
      setEditable("");
      handleSelectItem("");
    }
  };

  const handleToggleCategorize = (payload: boolean) => {
    filterSortDispatch({
      type: "UPDATE_CATEGORIZE",
      payload,
    });
  };

  // Other basic helpers
  const resetLocalState = () => {
    setEditable("");
  };

  const handleSelectItem = (id: string) => {
    listDispatch({ type: "SETACTIVE", payload: id });
  };

  const handleDeleteItem = (id: string) => {
    // don't delete if there's only one item in the list
    if (sort.length === 1) return;
    // clear editable
    if (editable === id) {
      resetLocalState();
    }
    listDispatch({ type: "REMOVE", payload: id });
  };

  const handleReorder = (payload: string[]) => {
    listDispatch({ type: "REORDER", payload });
  };

  // additional helpers
  const handleCopyItem = (id: string) => {
    const payload = { ...items[id] };
    // reassign the id, set to 'not done', set created to current Date obj
    payload.id = v4();
    payload.status = TaskState["Not Started"];
    payload.created = new Date().toDateString();

    listDispatch({ type: "ADD", payload });
  };

  const handleDeleteItemBackspace = () => {
    const input = document.getElementById(editable) as HTMLInputElement;

    if (editable !== "") {
      const item = items[editable];
      const itemIndex = sort.indexOf(editable);
      if (itemIndex === 0) {
        // if this item is at the top of the list, do nothing
        return;
      }
      if (input.selectionStart === 0) {
        // todo: fix backspace bug
      }
      if (item.value === "") {
        handleDeleteItem(editable);
        const prevItemId = sort[itemIndex - 1];
        handleSelectItem(prevItemId);
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

    const editingIndex = sort.indexOf(editable);

    if (editingIndex === sort.length - 1) {
      handleAddNewItem();
    } else {
      const nextItemId = sort[editingIndex + 1];
      setEditable(nextItemId);
      handleSelectItem(nextItemId);
    }
  };

  // register shortcuts
  useKeyboardShortcut({ key: "Enter" }, handleLineChange, false);
  useKeyboardShortcut({ key: "Escape" }, handleDeselectItem);
  useKeyboardShortcut({ key: "Backspace" }, handleDeleteItemBackspace, false);
  useKeyboardShortcut({ key: "Tab" }, handleLineChange);

  const localKeys = Object.keys(categoryListMap);

  return (
    <Container>
      <FilterSortSettings handleToggleCategorize={handleToggleCategorize} />
      <ListWrapper>
        {categorize ? (
          <StaticList
            localKeys={localKeys}
            categoryListMap={categoryListMap}
            editable={editable}
            selected={selected}
            handleCopyItem={handleCopyItem}
            handleSelectItem={handleSelectItem}
            handleDeleteItem={handleDeleteItem}
            handleUpdateItem={handleUpdateItem}
            setEditable={setEditable}
          />
        ) : (
          <DraggableList
            listData={listData}
            editable={editable}
            handleCopyItem={handleCopyItem}
            handleReorder={handleReorder}
            handleSelectItem={handleSelectItem}
            handleDeleteItem={handleDeleteItem}
            handleUpdateItem={handleUpdateItem}
            setEditable={setEditable}
          />
        )}
      </ListWrapper>
    </Container>
  );
};

export default List;
