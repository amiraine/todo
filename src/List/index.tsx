import React, { useState } from "react";
import { v4 } from "uuid";
import { Reorder, AnimatePresence } from "framer-motion";
// local
import { useListData } from "../Context";
import { ListItem as ListItemType } from "../types";
import { useKeyboardShortcut } from "../hooks";
// components and styles
import ListItem from "./ListItem";
import { Container } from "./styled";

interface ListProps {}
export type UpdateKey = keyof ListItemType;

const List: React.FC<ListProps> = () => {
  // local state
  const [editable, setEditable] = useState<string>("");
  // hooks

  // get context and destructure
  const [listData, listDispatch] = useListData();
  const { items, sort, selected } = listData;

  // Basic CRUD helpers
  const handleAddNewItem = () => {
    const payload: ListItemType = {
      id: v4(),
      value: "",
      isDone: false,
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
      // if the selected item is also editable, deselect there as well
      if (selected === editable) {
        setEditable("");
      }
      handleSelectItem("");
    }
  };

  // Other basic helpers
  const resetLocalState = () => {
    setEditable("");
  };

  const handleSelectItem = (id: string) => {
    listDispatch({ type: "SETACTIVE", payload: id });
  };

  const handleDeleteItem = (id: string) => {
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
    // reassign the id and set it to "not done"
    payload.id = v4();
    payload.isDone = false;
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
  // register shortcuts
  useKeyboardShortcut({ key: "Enter", ctrlKey: false }, handleAddNewItem);
  useKeyboardShortcut({ key: "Escape" }, handleDeselectItem);
  useKeyboardShortcut({ key: "Backspace" }, handleDeleteItemBackspace);

  return (
    <Container>
      <Reorder.Group
        axis="y"
        values={sort}
        onReorder={handleReorder}
        layoutScroll
      >
        <AnimatePresence>
          {sort.map((itemId) => {
            const listItem = items[itemId];
            const isSelected = itemId === selected;
            const isEditable = itemId === editable;
            return (
              <Reorder.Item
                key={itemId}
                value={itemId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ListItem
                  isSelected={isSelected}
                  isEditable={isEditable}
                  handleSelectItem={handleSelectItem}
                  handleUpdateItem={handleUpdateItem}
                  setEditable={setEditable}
                  handleDeleteItem={handleDeleteItem}
                  handleCopyItem={handleCopyItem}
                  listItem={listItem}
                />
              </Reorder.Item>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>
    </Container>
  );
};

export default List;
