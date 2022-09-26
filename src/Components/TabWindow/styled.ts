import styled from "styled-components";

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

export const TabText = styled.span`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  z-index: inherit;
  align-items: center;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 8px;

  svg {
    margin-right: 8px;
  }
`;

export const Tab = styled.button<{
  selected: boolean;
  index: number;
  tabCount: number;
  isDisabled?: boolean;
}>`
  position: relative;
  font-family: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  border: 0;
  padding: 0 0px;
  background: ${({ selected, isDisabled }) =>
    selected ? "#DEBCFA" : isDisabled ? "#AFAFAF" : "#FFB8DD"};

  border-top: 3px solid
    ${({ selected, disabled }) =>
      selected ? "#c9aae4" : disabled ? "#3d3d3d" : "#eea8ca"};
  z-index: ${({ selected, index, tabCount }) => {
    const number = index + 1;
    return selected ? tabCount * 3 : number * -3 + tabCount * 3;
  }};

  ${TabText} {
    transition: 0.075s all ease-in;
    color: ${({ selected }) => (selected ? "white" : "#1e1e1e")};
  }
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};

  > div {
    content: "";
    height: calc(100% + 3px);
    width: 30px;
    position: absolute;
    z-index: ${({ selected, index, tabCount }) => {
      const number = index + 1;
      return selected ? tabCount * 3 : number * -3 + tabCount * 3;
    }};
    background: inherit;
    border-bottom: 3px solid;
    border-color: inherit;

    &:first-of-type {
      clip-path: polygon(0% 0, 0% 100%, 100% 100%);
      right: -29px;
    }
    &:last-of-type {
      clip-path: polygon(100% 0, 0% 100%, 100% 100%);
      left: -29px;
    }
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
