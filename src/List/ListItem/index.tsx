import React from "react";
import {
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
import { Trash, Copy, MoreHorizontal } from "react-feather";

interface ListItemProps {
  id: string;
  isDone: boolean;
  isEditable: boolean;
  isSelected: boolean;
  value: string;
  handleSelectItem: (id: string) => void;
  setEditable: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  handleCopyItem: (id: string) => void;
  handleUpdateItem: (id: string, key: UpdateKey, value: any) => void;
  setOpenSubMenu: (id: string) => void;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const {
    id,
    isDone,
    isEditable,
    isSelected,
    handleCopyItem,
    handleDeleteItem,
    handleSelectItem,
    handleUpdateItem,
    setEditable,
    value,
    setOpenSubMenu,
  } = props;

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
  return (
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
            type="text"
            defaultValue={value}
            onChange={(e) => handleUpdateItem(id, "value", e.target.value)}
            autoFocus={isEditable}
          />
        ) : (
          <Text isDone={isDone}>{value}</Text>
        )}
        <IconContainer isEditable={isEditable}>
          <IconButton onClick={() => handleCopyItem(id)}>
            <Copy />
          </IconButton>
          <IconButton onClick={() => handleDeleteItem(id)}>
            <Trash />
          </IconButton>
          <IconButton onClick={() => setOpenSubMenu(id)}>
            <MoreHorizontal />
          </IconButton>
        </IconContainer>
      </ListItemContent>
      <Checkbox name={id} value={isDone} />
    </StyledListItem>
  );
};

export default ListItem;
