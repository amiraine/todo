import React, { useState } from "react";
import { v4 } from "uuid";
import { Reorder } from "framer-motion";
// local files
import { useListData } from "../Context";
import { ListData, ListItem } from "../types";
import { Checkbox } from "../Components";
import { Container, StyledListItem, StyledTextInput, Text } from "./styled";

interface ListProps {}
type UpdateKey = keyof ListItem;

const List: React.FC<ListProps> = () => {
  // local state
  const [editable, setEditable] = useState<string>("");
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
              <StyledListItem
                selected={isSelected}
                onClick={() => handleSelectItem(itemId)}
                onDoubleClick={() => setEditable(itemId)}
              >
                {isEditable ? (
                  <StyledTextInput
                    type="text"
                    defaultValue={value}
                    onChange={(e) => {
                      console.log(e);
                      handleUpdateItem(itemId, "value", e.target.value);
                    }}
                  />
                ) : (
                  <Text isDone={isDone}>{value}</Text>
                )}
                <Checkbox name={itemId} value={isDone} />
              </StyledListItem>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </Container>
  );
};

export default List;
