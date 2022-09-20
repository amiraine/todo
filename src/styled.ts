import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ccfdff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Book = styled.div`
  height: 800px;
  max-height: 75vh;
  width: 75vw;
  max-width: 1200;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;

  &:after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    height: calc(100% + 10px);
    width: calc(100% + 10px);
    background: red;
    z-index: 0;
  }
`;

export const Page = styled.div<{ orientation: "left" | "right" }>`
  background: #faf8e8;
  border-radius: 3px;
  ${({ orientation }) =>
    orientation === "left"
      ? `border-bottom-right-radius: 10px; border-top-right-radius: 10px;`
      : "border-bottom-left-radius: 10px; border-top-left-radius: 10px;"};
  border: 1px solid #faf8e8;
  z-index: 3;
`;
