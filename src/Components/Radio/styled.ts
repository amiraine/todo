import styled from "styled-components";

export const Container = styled.label<{ isChecked?: boolean }>`
  position: relative;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ isChecked }) => (isChecked ? "#cb9cf2" : "#afafaf")};
  border-radius: 50%;
  padding: 5px;
  overflow: hidden;
  cursor: pointer;
`;

export const Input = styled.input`
  opacity: 0;
  height: 0px;
  width: 0px;
`;

export const ChildWrapper = styled.span`
  height: inherit;
  width: inherit;
  position: absolute;
`;
