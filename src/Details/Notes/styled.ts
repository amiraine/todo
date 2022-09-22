import styled from "styled-components";
export const Container = styled.div`
  padding: 24px;
  position: relative;
  height: 100%;
`;

export const Input = styled.textarea`
  position: absolute;
  resize: none;
  left: 24px;
  right: 24px;
  top: 24px;
  bottom: 72px;
  padding: 0;
  border: 16px solid white;
  background: url("/assets/test.png");
  background-repeat: repeat;
  font-family: inherit;
  font-size: 16px;
  line-height: 32px;
  padding: 0 12px;
`;
