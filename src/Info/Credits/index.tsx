import React from "react";
import { GitHub } from "../../assets/GitHub";
import { LinkedIn } from "../../assets/LinkedIn";
import {
  Account,
  AccountName,
  Container,
  Header,
  HeaderGroup,
  InfoGroup,
} from "./styled";

const Credits: React.FC = () => {
  return (
    <Container>
      <HeaderGroup>
        <Header>☆</Header>
        <Header>
          Created by
          <br />
          Ami Cooper
        </Header>
        <Header>☆</Header>
      </HeaderGroup>
      <InfoGroup>
        <Account href="https://github.com/amiraine">
          <GitHub color="#1e1e1e" />
          <AccountName>/amiraine</AccountName>
        </Account>
        <Account href="https://linkedin.com/ameliah-rc">
          <LinkedIn color="#1e1e1e" />
          <AccountName>/ameliah-rc</AccountName>
        </Account>
      </InfoGroup>
    </Container>
  );
};

export default Credits;
