import { motion } from "framer-motion";
import styled from "styled-components";
import { palette } from "../../utils";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 32px 1fr;
`;

export const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  width: 100%;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;

  ::-webkit-scrollbar-track {
    border: 0;
    background-color: #e1e1e1;
    overflow: -moz-scrollbars-vertical;
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
    height: 4px;
    background-color: #afafaf;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #afafaf;
    border-radius: 40px;
  }
`;

export const TabText = styled(motion.span)`
  display: flex;
  align-items: center;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
`;

export const Tab = styled.button<{
  selected: boolean;
  isDisabled?: boolean;
}>`
  position: relative;
  display: inline-block;
  font-family: inherit;
  border: 0;
  background: transparent;
  padding: 0.3em 1.5em 0;
  display: flex;
  align-items: center;
  color: ${({ selected }) => (selected ? palette.lightText : palette.darkText)};
  svg {
    display: block;
    max-width: 18px;
    max-height: 18px;
    margin-right: ${({ selected }) => (selected ? "8px" : 0)};
    z-index: 1;
  }

  ${TabText} {
    z-index: 1;
    overflow: hidden;
  }

  &:after {
    content: "";
    position: absolute;
    background: ${({ selected, isDisabled }) =>
      selected ? "#DEBCFA" : isDisabled ? "#AFAFAF" : "#FFB8DD"};
    top: 0;
    right: 0;
    left: 2px;
    bottom: 0;
    border-bottom: none;
    border-radius: 0.5em 0.5em 0 0;
    box-shadow: 0 2px 2px white inset;
    transform: scale(1.1, 1.3) perspective(0.5em) rotateX(5deg);
    transform-origin: bottom;
    z-index: 0;
  }
`;

export const ContentWrapper = styled.section`
  background: linear-gradient(0deg, #c9e9ff50, #ffffff50);
  box-shadow: 1px 1px 4px #00000050;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar-track {
    border: 0;
    background-color: #e1e1e1;
    overflow: -moz-scrollbars-vertical;
    overflow-y: auto;
  }

  ::-webkit-scrollbar {
    width: 4px;
    background-color: #afafaf;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #afafaf;
    border-radius: 40px;
  }
`;
