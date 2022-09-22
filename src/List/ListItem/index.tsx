import React from "react";
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
import moment from "moment";
import { momentFormat } from "../../utils";

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

  const handleToggleDone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    handleUpdateItem(id, "isDone", checked);
  };
  const dueDate = moment(due).format(momentFormat);
  const now = moment(new Date().toString()).format(momentFormat);
  console.log(dueDate === now);
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
          {dueDate === now && (
            <IconButton>
              <Flag color="#E7749A" />
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
    </>
  );
};

export default ListItem;
