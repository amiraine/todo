import styled from "styled-components";

export const Container = styled.div<{ gridArea: string }>`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 32px 1fr;
  border: 2px solid white;
  color: white;
  grid-area: ${({ gridArea }) => gridArea};
`;

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid white;
  background: linear-gradient(90deg, #93f1fd, #ffb8dd);
  padding: 0 0 0 8px;
`;

export const TitleGroup = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  button {
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    background-color: white;
    margin-right: 8px;
    > svg {
      stroke: #debcfa;
      margin: 0;
    }
  }
  > svg {
    margin-right: 8px;
  }
`;

export const Content = styled.div`
  padding: 32px;
`;

export const Text = styled.span`
  font-family: "Press Start 2P", sans-serif;
`;
