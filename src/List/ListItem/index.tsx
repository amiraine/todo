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
import { IndeterminateCheckbox } from "../../Components";
import { UpdateKey } from "..";
import { Drag } from "../../assets/Drag";
import { Trash, Copy, CornerDownRight } from "react-feather";
import { ListItem as ListItemType, TaskState } from "../../types";
import moment from "moment";
import { evaluateTime } from "../../utils";
import { useMotionValue } from "framer-motion";
import { useBoxShadow } from "./util";
import { ConditionalReorderItem } from "../ConditionalReorderWrappers";

interface ListItemProps {
  isEditable: boolean;
  isDraggable: boolean;
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
    isDraggable,
  } = props;
  const { id, value, status, due } = listItem;
  const y = useMotionValue(0);
  const boxShadow = useBoxShadow(y);

  const handleUpdateTaskState = (state: TaskState) => {
    handleUpdateItem(id, "status", TaskState);
  };

  const fromNow = moment(due).fromNow();
  const distance = evaluateTime(fromNow);
  const displayedDueDate =
    distance === "FUTURE" ? moment(due).format("dddd Do MMMM YY") : fromNow;

  return (
    <ConditionalReorderItem
      useReorder={isDraggable}
      value={value}
      style={{ boxShadow, y }}
    >
      <StyledListItem
        selected={isSelected}
        onClick={() => handleSelectItem(id)}
        onDoubleClick={() => setEditable(id)}
      >
        <DragHandleContainer>{isDraggable && <Drag />}</DragHandleContainer>
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
            <Text isDone={status === TaskState.Complete}>{value}</Text>
          )}
          {!!due && (
            <DueDateWarning fromNow={fromNow} distance={distance}>
              <CornerDownRight size={14} />
              {displayedDueDate}
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
        <IndeterminateCheckbox
          value={status}
          onChange={handleUpdateTaskState}
        />
      </StyledListItem>
    </ConditionalReorderItem>
  );
};

export default ListItem;
