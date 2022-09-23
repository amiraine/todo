import styled, { css } from "styled-components";

type CheckedProps = {
  disabled: boolean;
};

export const Container = styled.div<CheckedProps>`
  display: flex;
  position: relative;
  cursor: pointer;
  user-select: none;
  align-items: center;
  border: 2px solid #1e1e1e;
  border-radius: 3px;
  transition: 0.2s all ease-in;
  width: min-content;
  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.5;
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;
          opacity: 1;
        `};
`;

export const PseudoCheckbox = styled.button`
  height: 19px;
  width: 19px;
  background: transparent;
  border: 0;
  padding: 0;
  display: flex;
  align-items: center;
  margin: 0;

  svg {
    height: inherit;
    width: inherit;
    stroke-width: 3;
  }
`;

export const IconWrapper = styled.div`
  border: 2px solid #1e1e1e;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 16px;
  width: 16px;
`;
