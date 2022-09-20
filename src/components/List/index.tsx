import React from "react";
import { v4 } from "uuid";
import { useListData } from "../../Context";
import { ListData, ListItem } from "../../types";
import DragAndDrop from "./DragAndDrop";
import { Checkbox, Container, StyledListItem, StyledTextInput } from "./styled";

interface ListProps {}
const List: React.FC<ListProps> = () => {
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

  const handleUpdateItemValue = (id: string, newValue: string) => {
    const itemCopy: ListItem = { ...items[id], value: newValue };
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
        positionTransition={{
          type: "spring",
          damping: 15,
          stiffness: 100,
        }}
      >
        {sort.map((itemId, i) => {
          const { value, isDone } = items[itemId];
          const isSelected = itemId === selected;
          return (
            <StyledListItem onDoubleClick={() => handleSelectItem(itemId)}>
              {isSelected ? (
                <StyledTextInput type="text" value={value} />
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
