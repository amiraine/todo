import React from "react";
import { BaseMap, ListItem } from "../../types";
import DragAndDrop from "./DragAndDrop";
import { Checkbox, Container, StyledListItem, StyledTextInput } from "./styled";

interface ListProps {
  tasks: BaseMap<ListItem>;
}
const List: React.FC<ListProps> = (props) => {
  const {
    tasks: { items, sort, selected },
  } = props;
  return (
    <Container>
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
        {sort.map((taskId, i) => {
          const { value, isDone } = items[taskId];
          const isSelected = taskId === selected;
          return (
            <StyledListItem onDoubleClick={() => console.log("clicked!")}>
              {isSelected ? (
                <StyledTextInput type="text" value={value} />
              ) : (
                <span>{value}</span>
              )}
              <Checkbox type="checkbox" defaultChecked={isDone} />
            </StyledListItem>
          );
        })}
      </DragAndDrop>
    </Container>
  );
};

export default List;
