import styled from "styled-components";

export const Container = styled.div<{
  gridArea: string;
  disableOverflow: boolean;
}>`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 2px solid white;
  color: white;
  grid-area: ${({ gridArea }) => gridArea};
  overflow-x: hidden;
  overflow-y: ${({ disableOverflow }) => (disableOverflow ? "hidden" : "auto")};
`;

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid white;
  background: linear-gradient(90deg, #93f1fd, #ffb8dd);
  padding: 0 0 0 8px;
  height: 32px;
  min-height: 32px;
`;

export const TitleGroup = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;

  > svg {
    margin-right: 8px;
  }
`;

export const StyledButton = styled.button`
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  background-color: white;
  margin-right: 8px;
  border-radius: 3px;
  box-shadow: inset 0 0 2px 0 rgba(255, 255, 255, 0.4),
    inset 0 0 2px 2px rgba(0, 0, 0, 0.05), 1px 1px 3px 0 rgba(0, 0, 0, 0.25);
  > svg {
    stroke: #debcfa;
    margin: 0;
  }
`;
export const Content = styled.div`
  padding: 32px;
  max-width: 50vw;
  box-sizing: border-box;
  height: -webkit-fill-available;
`;

export const Text = styled.span`
  font-family: "Press Start 2P", sans-serif;
  user-select: none;
`;
