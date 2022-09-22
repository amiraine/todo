import styled from "styled-components";

export const Container = styled.div<{ isExpanded?: boolean }>`
  position: relative;
  display: grid;
  grid-template-rows: 50px ${({ isExpanded }) => (isExpanded ? "220px" : "0")};
`;
export const IconContainer = styled.div<{ isEditable: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${({ isEditable }) => (isEditable ? 1 : 0)};
  transition: 0.25 all linear;
`;

export const StyledListItem = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: ${({ selected }) =>
    selected ? "rgba(161, 148, 255, .5)" : "transparent"};
  height: 39px;
  max-height: 39px;
  z-index: 2;
  &:hover {
    ${IconContainer} {
      opacity: 1;
      transition: 0.25 all linear;
    }
  }
`;

export const StyledTextInput = styled.input`
  width: 100%;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  padding: 0;
  border-bottom: 2px solid black;
  height: 100%;

  &:focus {
    outline: 0;
  }
`;

export const Text = styled.span<{ isDone: boolean }>`
  width: 100%;
  height: 100%;
  text-decoration: ${({ isDone }) => (isDone ? "line-through" : "none")};
`;

export const ListItemContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  span {
    margin-bottom: 2px;
  }
`;

export const DragHandleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  &:hover {
    cursor: grab;
  }
`;

export const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  &:hover {
    svg {
      stroke: purple;
    }
  }
  &:focus {
    outline: 1px;
  }
`;
