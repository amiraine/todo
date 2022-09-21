import React, { useState } from "react";
import { v4 } from "uuid";
import { Reorder } from "framer-motion";
// local
import { useListData } from "../Context";
import { ListData, ListItem as ListItemType } from "../types";
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

  // get context
  const [listData, listDispatch] = useListData();
  console.log(listData);
  const { items, sort, selected } = listData;

  // helper functions
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
  useKeyboardShortcut({ key: "Enter", ctrlKey: false }, handleAddNewItem);

  const handleUpdateItem = (id: string, key: UpdateKey, newValue: any) => {
    const payload: ListItemType = { ...items[id], [key]: newValue };

    listDispatch({ type: "UPDATE", payload });
  };

  const handleSelectItem = (id: string) => {
    listDispatch({ type: "SETACTIVE", payload: id });
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
  useKeyboardShortcut({ key: "Escape" }, handleDeselectItem);
  const handleDeleteItem = (id: string) => {
    listDispatch({ type: "REMOVE", payload: id });
  };

  const handleReorder = (payload: string[]) => {
    listDispatch({ type: "REORDER", payload });
  };

  return (
    <Container>
      <Reorder.Group axis="y" values={sort} onReorder={handleReorder}>
        {sort.map((itemId) => {
          const { value, isDone } = items[itemId];
          const isSelected = itemId === selected;
          const isEditable = itemId === editable;

          return (
            <Reorder.Item key={itemId} value={itemId}>
              <ListItem
                value={value}
                isDone={isDone}
                isSelected={isSelected}
                isEditable={isEditable}
                id={itemId}
                handleSelectItem={handleSelectItem}
                handleUpdateItem={handleUpdateItem}
                setEditable={setEditable}
                handleDeleteItem={handleDeleteItem}
              />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </Container>
  );
};

export default List;
