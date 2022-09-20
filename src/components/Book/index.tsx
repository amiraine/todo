import React from "react";
import { BaseMap, ListItem } from "../../types";
import DragAndDrop from "./DragAndDrop";
import {
  Checkbox,
  StyledListItem,
  StyledTextInput,
} from "./DragAndDrop/styled";

interface ListProps {
  tasks: ListData;
}
const List: React.FC<ListProps> = (props) => {
  const { tasks } = props;
  return (
    <DragAndDrop
      dragVariants={{
        drag: {
          zIndex: 99,
          position: "relative",
          transition: {
            duration: 0,
          },
        },
        drop: {
          zIndex: 0,
        },
      }}
      positionTransition={{
        type: "spring",
        damping: 15,
        stiffness: 100,
      }}
    >
      {tasks.sort.map((taskId, i) => {
        const { value, isDone } = tasks.items[taskId];
        return (
          <StyledListItem>
            <StyledTextInput type="text" value={value} />
            <Checkbox type="checkbox" checked={isDone} />
          </StyledListItem>
        );
      })}
    </DragAndDrop>
  );
};

export default List;
