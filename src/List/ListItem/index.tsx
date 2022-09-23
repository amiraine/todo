import React from "react";
import {
  DragHandleContainer,
  DueDateWarning,
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
import { Trash, Copy, CornerDownRight } from "react-feather";
import { ListItem as ListItemType } from "../../types";
import moment from "moment";
import { evaluateTime } from "../../utils";
import { Reorder, useMotionValue } from "framer-motion";
import { useBoxShadow } from "./util";

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
  const y = useMotionValue(0);
  const boxShadow = useBoxShadow(y);
  const handleToggleDone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    handleUpdateItem(id, "isDone", checked);
  };

  const fromNow = moment(due).fromNow();
  const distance = evaluateTime(fromNow);

  return (
    <Reorder.Item
      value={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ boxShadow, y }}
    >
      <StyledListItem
        selected={isSelected}
        onClick={() => handleSelectItem(id)}
        onDoubleClick={() => setEditable(id)}
      >
        <DragHandleContainer>
          <Drag />
        </DragHandleContainer>
        <ListItemContent dueDate={due ? fromNow : ""} distance={distance}>
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
          {!!due && (
            <DueDateWarning fromNow={fromNow} distance={distance}>
              <CornerDownRight size={14} />
              {fromNow}
            </DueDateWarning>
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
    </Reorder.Item>
  );
};

export default ListItem;
