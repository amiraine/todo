import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 42px;
  display: grid;
  grid-template-columns: 42px 1fr 42px;
  margin-bottom: 12px;
`;

export const ButtonWrapper = styled.div`
  /* border: 1px solid red; */
`;

export const StyledButton = styled.button`
  border: 0;
  background: white;
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    /* background: ; */
  }
`;

export const Title = styled.h3`
  text-align: center;
`;
