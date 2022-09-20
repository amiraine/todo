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
  const { items, sort, selected } = listData;

  // helper functions
  const handleAddNewItem = () => {
    const newItem: ListItemType = {
      id: v4(),
      value: "",
      isDone: false,
    };

    const payload: ListData = {
      items: { ...items, [newItem.id]: newItem },
      sort: [...sort, newItem.id],
      selected: newItem.id,
    };

    listDispatch({ type: "ADD", payload });
  };
  useKeyboardShortcut({ key: "Enter", ctrlKey: false }, handleAddNewItem);

  const handleUpdateItem = (id: string, key: UpdateKey, newValue: any) => {
    const itemCopy: ListItemType = { ...items[id], [key]: newValue };
    const payload: ListData = {
      ...listData,
      items: { ...items, [id]: itemCopy },
    };
    listDispatch({ type: "UPDATE", payload });
  };

  const handleSelectItem = (id: string) => {
    listDispatch({ type: "SETACTIVE", payload: id });
  };

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
              />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </Container>
  );
};

export default List;
