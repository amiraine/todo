import styled from "styled-components";

export const InfoLine = styled.div<{
  label: string;
  onClick?: any;
  onDoubleClick?: any;
}>`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid #1e1e1e;
  color: #1e1e1e;
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
  padding: 4px 8px 0;
  margin: 0 8px 4px 0;

  &:active {
    background: #debcfa50;
  }
  &:disabled {
    user-select: none;
  }
`;

export const Title = styled.span`
  padding: 4px 8px;
  user-select: none;
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
  &:hover {
    color: pink;
  }
`;
