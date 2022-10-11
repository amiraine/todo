import React from "react";
import { GitHub } from "../../assets/GitHub";
import { LinkedIn } from "../../assets/LinkedIn";
import { palette } from "../../utils";
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
          <GitHub color={palette.darkText} />
          <AccountName>/amiraine</AccountName>
        </Account>
        <Account href="https://linkedin.com/in/ameliah-rc">
          <LinkedIn color={palette.darkText} />
          <AccountName>/ameliah-rc</AccountName>
        </Account>
      </InfoGroup>
    </Container>
  );
};

export default Credits;
