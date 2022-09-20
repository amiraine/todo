import React, { useCallback } from "react";
import { v4 } from "uuid";
import { useListData } from "../../Context";
import { ListData, ListItem } from "../../types";
import DragAndDrop from "./DragAndDrop";
import { Checkbox, Container, StyledListItem, StyledTextInput } from "./styled";

interface ListProps {}
type UpdateKey = keyof ListItem;

const List: React.FC<ListProps> = () => {
  // local state
  // get context
  const [listData, listDispatch] = useListData();
  const { items, sort, selected } = listData;

  // helper functions
  const handleAddNewItem = () => {
    const newItem: ListItem = {
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

  const handleUpdateItem = (id: string, key: UpdateKey, newValue: any) => {
    const itemCopy: ListItem = { ...items[id], [key]: newValue };
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

  const handleReorder = useCallback(
    (from: number, to: number) => {
      const tempItems = [...sort];
      tempItems.splice(to, 0, tempItems.splice(from, 1)[0]);
      listDispatch({ type: "REORDER", payload: tempItems });
    },
    [listDispatch, sort]
  );

  return (
    <Container>
      <DragAndDrop
        dragVariants={{
          drag: {
            zIndex: 99,
            position: "relative",
            transition: {
              duration: 0,
            },
          },
          drop: {
            zIndex: 0,
          },
        }}
        onDragEnd={handleReorder}
      >
        {sort.map((itemId, i) => {
          const { value, isDone } = items[itemId];
          const isSelected = itemId === selected;
          return (
            <StyledListItem
              key={itemId}
              selected={isSelected}
              onClick={() => handleSelectItem(itemId)}
            >
              {isSelected ? (
                <StyledTextInput type="text" defaultValue={value} />
              ) : (
                <span>{value}</span>
              )}
              <Checkbox type="checkbox" defaultChecked={isDone} />
            </StyledListItem>
          );
        })}
        {/* <button onClick={handleAddNewItem}>add</button> */}
      </DragAndDrop>
    </Container>
  );
};

export default List;
