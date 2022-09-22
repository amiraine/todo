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
  width: 100%;
`;

export const TabText = styled.span`
  display: flex;
  text-align: center;
  width: 100%;
  z-index: 10;
  align-items: center;
  user-select: none;

  svg {
    margin-right: 8px;
  }
`;

export const Tab = styled.button<{ selected: boolean; index: number }>`
  position: relative;
  height: 100%;
  font-family: inherit;
  left: ${({ index }) => {
    return `${index * -45}px`;
  }};
  display: flex;
  align-items: center;
  min-width: 150px;
  height: 32px;
  border: 0;
  padding: 0 32px;
  background: #70dbff;
  z-index: ${({ selected }) => (selected ? 9 : 1)};
  clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);

  ${TabText} {
    transition: 0.075s all ease-in;
    color: ${({ selected }) => (selected ? "white" : "#1e1e1e")};
  }

  &:before {
    content: "";
    width: calc(100% - 3px);
    height: calc(100% - 2px);
    position: absolute;
    left: 1px;
    transition: 0.075s background-color ease-in;
    background: ${({ selected }) => (selected ? "#DEBCFA" : "#FFB8DD")};
    z-index: ${({ selected }) => (selected ? 9 : 1)};
    clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
  }
`;

export const ContentWrapper = styled.section`
  background: #ebfaff;
  max-height: 100%;
  max-width: 100%;
  box-shadow: 1px 1px 4px #00000050;
`;
