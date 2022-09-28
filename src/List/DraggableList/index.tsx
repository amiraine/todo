import { Reorder } from "framer-motion";
import React from "react";
import { UpdateKey } from "..";
import { ListData, TaskState } from "../../types";
import ListItem from "../ListItem";

interface DraggableListProps {
  listData: ListData;
  editable: string;
  filterCompleteItems: boolean;
  handleReorder: (arr: string[]) => void;
  handleSelectItem: (id: string) => void;
  handleUpdateItem: (id: string, key: UpdateKey, val: any) => void;
  setEditable: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  handleCopyItem: (id: string) => void;
}

const DraggableList: React.FC<DraggableListProps> = (props) => {
  const {
    listData: { items, selected, sort },
    handleReorder,
    editable,
    handleSelectItem,
    handleUpdateItem,
    setEditable,
    handleDeleteItem,
    handleCopyItem,
    filterCompleteItems,
  } = props;

  return (
    <Reorder.Group
      axis="y"
      values={sort}
      onReorder={handleReorder}
      layoutScroll
    >
      {sort.map((id) => {
        const listItem = items[id];
        const isSelected = id === selected;
        const isEditable = id === editable;
        if (filterCompleteItems) {
          return listItem.status === TaskState.Complete ? null : (
            <Reorder.Item value={id} key={id}>
              <ListItem
                key={id}
                isSelected={isSelected}
                isEditable={isEditable}
                handleSelectItem={handleSelectItem}
                handleUpdateItem={handleUpdateItem}
                setEditable={setEditable}
                handleDeleteItem={handleDeleteItem}
                handleCopyItem={handleCopyItem}
                listItem={listItem}
                isDraggable
              />
            </Reorder.Item>
          );
        }
        return (
          <Reorder.Item value={id} key={id}>
            <ListItem
              key={id}
              isSelected={isSelected}
              isEditable={isEditable}
              handleSelectItem={handleSelectItem}
              handleUpdateItem={handleUpdateItem}
              setEditable={setEditable}
              handleDeleteItem={handleDeleteItem}
              handleCopyItem={handleCopyItem}
              listItem={listItem}
              isDraggable
            />
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
};

export default DraggableList;
