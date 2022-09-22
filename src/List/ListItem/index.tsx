import React, { useState } from "react";
import {
  // Container,
  DragHandleContainer,
  IconButton,
  IconContainer,
  ListItemContent,
  StyledListItem,
  StyledTextInput,
  Text,
} from "./styled";
import { Checkbox } from "../../Components";
import { UpdateKey } from "..";
import { Drag } from "../../assets/Drag";
import { Trash, Copy, Flag } from "react-feather";
import { ListItem as ListItemType } from "../../types";
import SubMenu from "../SubMenu";

interface ListItemProps {
  isEditable: boolean;
  isSelected: boolean;
  listItem: ListItemType;
  handleSelectItem: (id: string) => void;
  setEditable: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  handleCopyItem: (id: string) => void;
  handleUpdateItem: (id: string, key: UpdateKey, value: any) => void;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const {
    listItem,
    isEditable,
    isSelected,
    handleCopyItem,
    handleDeleteItem,
    handleSelectItem,
    handleUpdateItem,
    setEditable,
  } = props;
  const { id, value, isDone, due } = listItem;
  const [submenuIsOpen, setSubmenuIsOpen] = useState<boolean>(false);
  // deselect todo item on outside click
  // useEffect(() => {
  //   window.addEventListener("click", () => {
  //     handleSelectItem("");
  //   });
  //   return () => {
  //     window.removeEventListener("click", () => {
  //       handleSelectItem("");
  //     });
  //   };
  // }, []);
  const handleToggleDone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    handleUpdateItem(id, "isDone", checked);
  };
  const dueDate = due?.toDateString();
  const now = new Date().toDateString();

  return (
    <>
      <StyledListItem
        selected={isSelected}
        onClick={() => handleSelectItem(id)}
        onDoubleClick={() => setEditable(id)}
      >
        <DragHandleContainer>
          <Drag />
        </DragHandleContainer>
        <ListItemContent>
          {isEditable ? (
            <StyledTextInput
              id={`task-item-${id}`}
              type="text"
              defaultValue={value}
              onChange={(e) => handleUpdateItem(id, "value", e.target.value)}
              autoFocus={isEditable}
            />
          ) : (
            <Text isDone={isDone}>{value}</Text>
          )}
          {due && dueDate === now && (
            <IconButton>
              <Flag />
            </IconButton>
          )}
          <IconContainer isEditable={isEditable}>
            <IconButton onClick={() => handleCopyItem(id)}>
              <Copy />
            </IconButton>
            <IconButton onClick={() => handleDeleteItem(id)}>
              <Trash />
            </IconButton>
          </IconContainer>
        </ListItemContent>
        <Checkbox name={id} value={isDone} onChange={handleToggleDone} />
      </StyledListItem>
      <SubMenu
        listItem={listItem}
        isOpen={submenuIsOpen}
        handleUpdateItem={handleUpdateItem}
      />
    </>
  );
};

export default ListItem;
