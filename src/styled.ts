import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ccfdff;
  display: grid;
  grid-template-rows: 60% 40%;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "a b" "a c";
`;
