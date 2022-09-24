import styled from "styled-components";

export const Container = styled.div`
  max-width: 50vw;
  ul,
  li {
    max-width: inherit;
    padding: 0;
    list-style: none;
  }
`;

export const SortAndFilterSettings = styled.div`
  border: 2px solid white;
  background-color: #ffffff80;
  padding: 16px;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const FilterWrapper = styled.div<{ gridArea?: string }>``;

export const ListWrapper = styled.div`
  padding: 32px 0;
`;

export const GroupWrapper = styled.div`
  margin-bottom: 16px;
`;

export const CategoryTitle = styled.span`
  user-select: none;
`;
