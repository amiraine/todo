import React from "react";
import { UpdateKey } from "..";
import { ListData, ListItem as ListItemType } from "../../types";
import ListItem from "../ListItem";
import { categorizeListItems } from "../utils";
import { GroupWrapper, CategoryTitle } from "./styled";

interface StaticListProps {
  listData: ListData;
  editable: string;
  filterCompleteItems: boolean;
  handleSelectItem: (id: string) => void;
  handleUpdateItem: (id: string, key: UpdateKey, val: any) => void;
  setEditable: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  handleCopyItem: (id: string) => void;
}

const StaticList: React.FC<StaticListProps> = (props) => {
  const {
    listData: { sort, items, selected: listSelected },
    handleCopyItem,
    handleSelectItem,
    handleUpdateItem,
    setEditable,
    handleDeleteItem,
    editable,
  } = props;
  console.log(sort, items);
  const listItems = sort.map((id) => items[id]);
  const listItemsByCategory = categorizeListItems(listItems);

  // todo make this a collapsible drawer
  return (
    <>
      {Object.keys(listItemsByCategory).map((key, i) => {
        return (
          <GroupWrapper key={key}>
            {Object.keys(listItemsByCategory).length > 1 && (
              <CategoryTitle
                initial={{ opacity: 0, height: "0px" }}
                animate={{ opacity: 1, height: "12px" }}
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
                  handleSelectItem={handleSelectItem}
                  handleUpdateItem={handleUpdateItem}
                  setEditable={setEditable}
                  handleDeleteItem={handleDeleteItem}
                  handleCopyItem={handleCopyItem}
                  listItem={task}
                />
              );
            })}
            {/* {categoryListMap[key].map((listItem) => {
              const { id } = listItem;
              const isSelected = id === selected;
              const isEditable = id === editable;

              return (
                <ListItem
                  key={id}
                  isDraggable={false}
                  isSelected={isSelected}
                  isEditable={isEditable}
                  handleSelectItem={handleSelectItem}
                  handleUpdateItem={handleUpdateItem}
                  setEditable={setEditable}
                  handleDeleteItem={handleDeleteItem}
                  handleCopyItem={handleCopyItem}
                  listItem={listItem}
                />
              );
            })} */}
          </GroupWrapper>
        );
      })}
    </>
  );
};

export default StaticList;
// {
/* {localKeys.map((key) => {
        const showTitle = localKeys.length > 1;

        return (
          <GroupWrapper key={key}>
            {/* {categoryListMap[key].map((listItem) => {
              const { id } = listItem;
              const isSelected = id === selected;
              const isEditable = id === editable;

              return (
                <ListItem
                  key={id}
                  isDraggable={false}
                  isSelected={isSelected}
                  isEditable={isEditable}
                  handleSelectItem={handleSelectItem}
                  handleUpdateItem={handleUpdateItem}
                  setEditable={setEditable}
                  handleDeleteItem={handleDeleteItem}
                  handleCopyItem={handleCopyItem}
                  listItem={listItem}
                />
              );
            })} */
// }
// {
/* </GroupWrapper> */
// }
// {
/* ); */
// }
// })} */}
//
