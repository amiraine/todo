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
  left: ${({ index }) => {
    return `${index * -45}px`;
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  border: 0;
  padding: 0 16px;
  background: #70dbff;
  z-index: ${({ selected, index, tabCount }) => {
    const number = index + 1;
    return selected ? tabCount * 3 : number * -3 + tabCount * 3;
  }};
  clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);

  ${TabText} {
    transition: 0.075s all ease-in;
    color: ${({ selected }) => (selected ? "white" : "#1e1e1e")};
  }
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "pointer")};

  &:before {
    content: "";
    width: calc(100% - 3px);
    height: calc(100% - 2px);
    position: absolute;
    left: 1px;
    transition: 0.075s background-color ease-in;
    background: ${({ selected, isDisabled }) =>
      selected ? "#DEBCFA" : isDisabled ? "#afafaf" : "#FFB8DD"};
    z-index: ${({ selected, index, tabCount }) => {
      const number = index + 1;
      return selected ? tabCount * 3 : number * -3 + tabCount * 3;
    }};
    clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
  }
`;

export const ContentWrapper = styled.section`
  background: linear-gradient(0deg, #c9e9ff50, #ffffff50);
  max-height: calc(100% - 32px);
  box-shadow: 1px 1px 4px #00000050;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;
