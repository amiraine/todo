import styled from "styled-components";
import { palette } from "../../utils";

export const Header = styled.h1`
  font-size: 1rem;
  text-align: center;
  line-height: 103%;
`;

export const AccountName = styled.h2`
  font-size: 0.9rem;
  margin-left: 12px;
  margin: 0;
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${palette.darkText};

  ${Header} {
    &:first-of-type {
      margin-right: 10px;
    }
    &:last-of-type {
      margin-left: 10px;
    }
  }
`;

export const Account = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: ${palette.darkText};
  > svg {
    height: 32px;
    width: 32px;
  }
  &:hover {
    color: #debcfa;
    cursor: pointer;
    svg {
      color: inherit;
      fill: #debcfa;
      stroke: #debcfa;
      *:first-child {
        color: inherit;
        fill: inherit;
        stroke: inherit;
      }
    }
  }
`;
export const InfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 12px;
  ${AccountName} {
    margin-left: 10px;
  }
`;
export const HeaderGroup = styled.div`
  display: flex;
`;
