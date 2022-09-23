import styled from "styled-components";

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
  background: ${({ selected }) => (selected ? "#debcfa50" : "#ffffff50")};
  border-bottom: 2px dashed
    ${({ selected }) => (selected ? "#debcfa75" : "#ffffff75")};
  color: ${({ selected }) => (selected ? "white" : "#1e1e1e")};
  height: 45px;
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
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 100%;
`;

export const ListItemContent = styled.div<{
  dueDate: string;
  distance: string;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  max-width: calc(100% - 70px);

  &:after {
    font-family: sans-serif;
    position: absolute;
    top: 28px;
    color: ${({ distance }) =>
      distance === "NEAR_FUTURE"
        ? "#FFD596"
        : distance === "PAST"
        ? "#FF707A"
        : "inherit"};
    content: "${({ dueDate }) => dueDate}";
    font-size: 10px;
  }
  span {
    margin-bottom: 2px;
  }
`;

export const DragHandleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  svg,
  svg * {
    fill: #afafaf;
    stroke: #afafaf;
  }
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
`;
