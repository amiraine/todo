import React from "react";
import { UpdateKey } from "..";
import { ListData } from "../../types";
import ListItem from "../ListItem";
import { categorizeListItems } from "../utils";
import { GroupWrapper, CategoryTitle } from "./styled";

interface StaticListProps {
  listData: ListData;
  editable: string;
  filterCompleteItems: boolean;
  handleSelectTask: (id: string) => void;
  handleUpdateItem: (id: string, key: UpdateKey, val: any) => void;
  setEditable: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  handleCopyItem: (id: string) => void;
}

const StaticList: React.FC<StaticListProps> = (props) => {
  const {
    listData: { sort, items, selected: listSelected },
    handleCopyItem,
    handleSelectTask,
    handleUpdateItem,
    setEditable,
    handleDeleteItem,
    editable,
    filterCompleteItems,
  } = props;

  const listItems = sort.map((id) => items[id]);
  const listItemsByCategory = categorizeListItems(
    listItems,
    filterCompleteItems
  );

  // todo make this a collapsible drawer
  return (
    <>
      {Object.keys(listItemsByCategory).map((key, i) => {
        return (
          <GroupWrapper key={key}>
            {Object.keys(listItemsByCategory).length > 1 && (
              <CategoryTitle
                initial={{ opacity: 0, height: "0px", marginTop: "0" }}
                animate={{ opacity: 1, height: "12px", marginTop: "15px" }}
                exit={{ opacity: 0, height: "0px" }}
              >
                {key}
              </CategoryTitle>
            )}
            {listItemsByCategory[key].map((task) => {
              const { id } = task;
              const isSelected = id === listSelected;
              const isEditable = id === editable;

              return (
                <ListItem
                  key={id}
                  isDraggable={false}
                  isSelected={isSelected}
                  isEditable={isEditable}
                  handleSelectTask={handleSelectTask}
                  handleUpdateItem={handleUpdateItem}
                  setEditable={setEditable}
                  handleDeleteItem={handleDeleteItem}
                  handleCopyItem={handleCopyItem}
                  listItem={task}
                />
              );
            })}
          </GroupWrapper>
        );
      })}
    </>
  );
};

export default StaticList;
