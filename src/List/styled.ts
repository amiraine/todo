import styled from "styled-components";

export const Container = styled.div`
  padding: 0 24px 0 0;
  ul,
  li {
    list-style: none;
  }
`;

export const StyledListItem = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${({ selected }) => (selected ? "pink" : "transparent")};
`;

export const StyledTextInput = styled.input`
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 16px;
  padding: 0;
  &:focus {
    outline: 0;
  }
`;

export const Checkbox = styled.input`
  opacity: 0;
`;
