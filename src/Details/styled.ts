import styled from "styled-components";

export const Container = styled.div<{ tabCount: number }>`
  display: grid;
  grid-template-columns: repeat($({(tabCount)} => tabCount), 1fr);
`;
