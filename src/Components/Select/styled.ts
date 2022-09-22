import styled, { css } from "styled-components";
import { components } from "react-select";

export const Control = styled(components.Control)`
  background-color: ${(props) => props.theme.colors.background[0]} !important;
  border: 1px solid ${(props) => props.theme.layout.border.primary} !important;
  border-radius: 5px !important;
  min-height: 40px !important;
`;

type ContainerProps = {
  isValid?: boolean;
  margin?: string[] | number[];
};

export const Container = styled.div<ContainerProps>`
  display: block;
  width: 100%;
  margin: ${(props) =>
    props.margin && typeof props.margin[0] === "string"
      ? props.margin.join(" ")
      : props.margin?.join("px ")};

  ${Control} {
    ${(props) =>
      props.isValid === false &&
      css`
        border: 1px solid #dc395c !important;

        + label {
          color: #dc395c !important;
        }
      `}
  }
`;

export const Menu = styled(components.Menu)`
  background-color: ${(props) => props.theme.colors.background[0]} !important;
  opacity: 1;
  position: relative;
  z-index: 99999999 !important;
  padding: 0 !important;
  overflow: hidden !important;
  margin-top: 0 !important;
`;

export const SingleValue = styled(components.SingleValue)`
  /* color: ${(props) => props.theme.colors.text} !important; */
`;

export const Placeholder = styled(components.Placeholder)`
  color: ${(props) => props.theme.colors.text} !important;
`;

export const IndicatorSeparator = styled(components.IndicatorSeparator)`
  display: none !important;
`;
