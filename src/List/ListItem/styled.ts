import styled from "styled-components";
import { palette } from "../../utils";

export const IconContainer = styled.div<{ isEditable: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  opacity: ${({ isEditable }) => (isEditable ? 1 : 0)};
  transition: 0.25 all linear;
`;

export const StyledListItem = styled.div<{ selected: boolean }>`
  height: 60px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: ${({ selected }) => (selected ? "#debcfa50" : "#ffffff50")};
  border-top: 2px solid
    ${({ selected }) => (selected ? "#debcfa75" : "#ffffff75")};
  border-bottom: 3px dashed
    ${({ selected }) => (selected ? "#debcfa75" : "#ffffff75")};
  color: ${({ selected }) => (selected ? "white" : palette.darkText)};
  z-index: 2;
  border-radius: 5px;
  font-size: 14px;
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
  font-size: 14px;
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
  user-select: none;
`;

export const DueDateWarning = styled.span<{
  dueDate: string;
  distance: string;
}>`
  position: absolute;
  top: 24px;
  left: 8px;
  font-size: 11px;
  background: #ffffff80;
  padding: 2px 0 4px;
  border-top: 1px solid #ffd00080;
  border-bottom: 1px solid #ffd00080;
  color: ${({ distance }) =>
    distance === "NEAR_FUTURE"
      ? "#ffe46f"
      : distance === "PAST"
      ? "#FF707A"
      : "inherit"};
  text-shadow: 1px 1px 1px #c7a20050;
  svg {
    margin-right: 5px;
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 8px;
    top: 0;
    bottom: 0;
    border-top: 1px solid #ffd00080;
    border-bottom: 1px solid #ffd00080;

    background: #ffffff80;
  }
  &:before {
    left: -9px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    border-left: 1px solid #ffd00080;
  }
  &:after {
    right: -9px;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-right: 1px solid #ffd00080;
  }
`;

export const ListItemContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  max-width: calc(100% - 70px);

  ${Text} {
    margin-bottom: 2px;
  }
`;

export const DragHandleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  height: 16px;
  width: 16px;
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
