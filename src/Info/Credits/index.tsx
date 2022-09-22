import React from "react";
import { Account, AccountName, Container, Header, InfoGroup } from "./styled";

const Credits: React.FC = () => {
  return (
    <Container>
      <InfoGroup>
        <Header>☆</Header>
        <Header>
          Created by
          <br />
          Ami Cooper
        </Header>
        <Header>☆</Header>
      </InfoGroup>
      <InfoGroup>
        <Account>
          <AccountName>/amiraine</AccountName>
        </Account>
      </InfoGroup>
    </Container>
  );
};

export default Credits;
