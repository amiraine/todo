import styled from "styled-components";

export const SortAndFilterSettings = styled.div`
  border: 2px solid white;
  background-color: #ffffff80;
  padding: 16px;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const FilterWrapper = styled.div<{ gridArea?: string }>``;
