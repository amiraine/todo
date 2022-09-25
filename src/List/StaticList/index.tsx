import React from "react";
import { UpdateKey } from "..";
import { ListItem as ListItemType } from "../../types";
import ListItem from "../ListItem";
import { GroupWrapper, CategoryTitle } from "./styled";

interface StaticListProps {
  localKeys: string[];
  categoryListMap: { [category: string]: ListItemType[] };
  selected: string;
  editable: string;
  handleSelectItem: (id: string) => void;
  handleUpdateItem: (id: string, key: UpdateKey, val: any) => void;
  setEditable: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  handleCopyItem: (id: string) => void;
}

const StaticList: React.FC<StaticListProps> = (props) => {
  const {
    localKeys,
    categoryListMap,
    handleCopyItem,
    handleSelectItem,
    handleUpdateItem,
    setEditable,
    handleDeleteItem,
    selected,
    editable,
  } = props;
  return (
    <>
      {localKeys.map((key) => {
        const showTitle = localKeys.length > 1;

        return (
          <GroupWrapper key={key}>
            {showTitle && (
              <CategoryTitle
                initial={{ opacity: 0, height: "0px" }}
                animate={{ opacity: 1, height: "12px" }}
                exit={{ opacity: 0, height: "0px" }}
              >
                {key}
              </CategoryTitle>
            )}

            {categoryListMap[key].map((listItem) => {
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
            })}
          </GroupWrapper>
        );
      })}
    </>
  );
};

export default StaticList;
