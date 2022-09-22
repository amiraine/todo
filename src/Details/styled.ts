import styled from "styled-components";

export const Container = styled.div<{ tabCount: number }>`
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

export const Tab = styled.button<{ selected: boolean; index: number }>`
  position: relative;
  height: 100%;
  font-family: inherit;
  left: ${({ index }) => {
    return `${index * -40}px`;
  }};
  display: flex;
  align-items: center;
  min-width: 200px;
  width: 100%;
  height: 32px;
  border: 0;
  padding: 0 50px;
  background: #70dbff;
  z-index: ${({ selected }) => (selected ? 9 : 1)};
  clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
  &:before {
    ${({ selected }) =>
      selected
        ? `
    background: #DEBCFA;
    z-index: 9;
  `
        : `
    background: #FFB8DD;
    z-index: 1;
  `}
    position: absolute;
    content: "";
    left: 1px;
    width: calc(100% - 3px);
    height: calc(100% - 2px);
    clip-path: polygon(10% 0, 90% 0, 100% 100%, 0 100%);
    /* border: 1px solid limegreen; */
  }
`;

export const TabText = styled.span`
  display: flex;
  text-align: center;
  width: 100%;
  z-index: 10;
  align-items: center;
  color: #1e1e1e;
  svg {
    margin-right: 8px;
    stroke: #1e1e1e;
  }
`;

export const ContentWrapper = styled.section`
  background: #ebfaff;
  height: 100%;
  width: 100%;
`;
