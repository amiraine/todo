import styled from "styled-components";
import { stateColorMap } from "../../List/utils";
import { TaskState } from "../../types";
import { palette } from "../../utils";

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${TitleGroup} {
    &:first-of-type {
      flex: 2;
      margin-right: 10px;
    }
  }
`;

export const InfoLine = styled.div<{
  label: string;
  onClick?: any;
  onDoubleClick?: any;
}>`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid ${palette.darkText};
  color: ${palette.darkText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 34px;
  margin: 28px 0 0 0;
  position: relative;
  font-size: 12px;
  z-index: 50;

  &:before {
    position: absolute;
    content: "${({ label }) => label}";
    top: -10px;
    font-size: 10px;
    left: 5px;
  }

  cursor: ${({ onClick, onDoubleClick }) =>
    onClick !== undefined || onDoubleClick !== undefined
      ? "pointer"
      : "default"};
  input {
    &:hover {
      cursor: inherit;
    }
    &:active,
    &:focus {
      cursor: text;
    }
  }
`;

export const Container = styled.div`
  padding: 24px;
  position: relative;
  z-index: 20;

  ${InfoLine} {
    &:first-of-type {
      margin-top: 10px;
    }
  }
`;

export const Input = styled.input`
  border: 0;
  padding: 0;
  outline: 0;
  font-family: inherit;
  font-size: inherit;
  height: 100%;
  width: 100%;
  background: transparent;
  margin: 0 15px 0 0;
  font-weight: bold;
  font-size: 1.1rem;

  &:active,
  &:focus {
    background: #debcfa50;
  }
  &:disabled {
    user-select: none;
    color: palette.darkText;
  }
`;

export const Text = styled.span<{ state?: TaskState }>`
  padding: 4px 8px;
  user-select: none;
  color: ${({ state }) => (!!state ? "#FFF" : palette.darkText)};
  background: ${({ state }) =>
    !!state ? stateColorMap[state] : "transparent"};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  button:first-of-type {
    margin-right: 5px;
  }
`;

export const IconButton = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover {
    color: ${palette.iconHover};
  }
  &:active {
    &:before {
      content: "";
      position: absolute;
      height: calc(100% + 4px);
      width: calc(100% + 4px);
      left: -4px;
      top: -4px;
      border: 2px solid ${palette.focusOutline};
      border-radius: 3px;
    }
  }
`;

export const StatusText = styled.span<{ state: TaskState }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  user-select: none;
  color: ${({ state }) => (!!state ? palette.lightText : palette.darkText)};
  background: ${({ state }) =>
    !!state ? stateColorMap[state] : "transparent"};
  border-radius: 3px;

  > div {
    margin-left: 10px;
    border-color: #fff;
    svg {
      stroke: white;
    }
  }
`;
