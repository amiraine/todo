import styled from "styled-components";

export const BookContainer = styled.div`
  height: 800px;
  max-height: 75vh;
  width: 75vw;
  max-width: 1200px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;

  &:after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    height: calc(100% + 10px);
    width: calc(100% + 10px);
    background: #443f8c;
    border-radius: 5px;
    z-index: 0;
  }
`;

export const Page = styled.div<{ orientation: "left" | "right" }>`
  background: ${({ orientation }) =>
    `linear-gradient(${
      orientation === "left" ? "90deg" : "270deg"
    }, #faf8e8, #faf0cf)`};
  border-radius: 3px;
  ${({ orientation }) =>
    orientation === "left"
      ? `border-bottom-right-radius: 10px; border-top-right-radius: 10px;`
      : "border-bottom-left-radius: 10px; border-top-left-radius: 10px;"};
  border: 1px solid #faf8e8;
  z-index: 3;
`;

export const PageTitle = styled.h1`
  text-align: center;
  font-family: "Indie Flower", sans-serif;
  color: #090526;
`;
