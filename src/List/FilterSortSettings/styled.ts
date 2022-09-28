import styled from "styled-components";

export const SortAndFilterSettings = styled.div`
  border: 2px solid white;
  background-color: #ffffff80;
  padding: 16px;
  border-radius: 2px;
  display: grid;
  grid-row-gap: 5px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas: "a b" "c d" "e f";
`;

export const FilterWrapper = styled.div<{ gridArea?: string }>`
  position: static;
  display: block;
  width: 100%;
  grid-area: ${({ gridArea }) => gridArea};
`;
