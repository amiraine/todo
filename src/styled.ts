import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(0deg, #ccfdff, #b1eaff);
  display: grid;
  grid-template-rows: 60% 40%;
  grid-template-columns: 50vw 50vw;
  grid-template-areas: "a b" "a c";

  > * {
    max-width: 50vw;
  }
`;
