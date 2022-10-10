import styled, { css } from "styled-components";

type CheckedProps = {
  checked: boolean;
  disabled: boolean;
};

export const Container = styled.label<CheckedProps>`
  display: flex;
  position: relative;
  cursor: pointer;
  user-select: none;
  align-items: center;
  color: #171717;
  transition: 0.2s all ease-in;
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
export const Input = styled.input`
  opacity: 0;
  position: relative;
  height: 0;
  width: 0;
  margin: 0;
`;

interface IIndicatorContainerProps {
  hasLabel: boolean;
}
export const IndicatorContainer = styled.div<IIndicatorContainerProps>`
  margin: 0 10px 0 0;
  display: flex;
  align-items: center;
  border: 2px solid #171717;
  height: 18px;
  width: 18px;
  border-radius: 3px;
  position: relative;

  svg {
    position: absolute;
    stroke-width: 3px;
  }
`;
