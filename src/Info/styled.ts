import styled from "styled-components";

export const Header = styled.h1`
  font-size: 28px;
  text-align: center;
  line-height: 103%;
`;

export const AccountName = styled.h2`
  font-size: 18px;
  margin-left: 12px;
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${Header} {
    &:first-of-type {
      margin-right: 10px;
    }
    &:last-of-type {
      margin-left: 10px;
    }
  }
`;

export const InfoGroup = styled.div``;

export const Account = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > svg {
    border: 2px solid white;
    padding: 8px;
    border-radius: 50%;
    stroke-width: 3px;
  }
`;
