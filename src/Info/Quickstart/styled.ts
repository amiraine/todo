import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #1e1e1e;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 16px;
  max-height: 100%;
`;

export const Header = styled.h1`
  font-size: 16px;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Shortcut = styled.li``;

export const Description = styled.span`
  font-size: 12px;
`;
