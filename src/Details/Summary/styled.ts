import styled from "styled-components";

export const Container = styled.div`
  padding: 24px;
`;
export const InfoLine = styled.div`
  width: 100%;
  padding: 4px 8px;
  box-sizing: border-box;
  border-bottom: 2px solid #1e1e1e75;
  color: #1e1e1e75;
  display: flex;
  justify-content: space-between;
  height: 34px;
`;

export const Input = styled.input`
  border: 0;
  padding: 0;
  outline: 0;
  font-family: inherit;
  font-size: inherit;
  height: 100%;
  width: 100%;
  background: transparent;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const IconButton = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;
