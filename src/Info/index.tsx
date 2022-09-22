import React, { useState } from "react";
import { Globe, Star } from "react-feather";
import { TabProps, TabWindow } from "../Components";
import { Account, AccountName, Container, Header, InfoGroup } from "./styled";

enum TabType {
  "Credits" = "Credits",
  "GlobalStats" = "GlobalStats",
}

const Info: React.FC = () => {
  const [tab, setTab] = useState<string>(TabType.Credits);
  const tabs: TabProps[] = [
    {
      name: TabType.Credits,
      icon: <Star />,
    },
    { name: TabType.GlobalStats, icon: <Globe /> },
  ];

  const RenderedContent = () => {
    switch (tab) {
      case TabType.Credits:
        return null;
      default:
        return null;
    }
  };
  return (
    <TabWindow tabList={tabs} selectedTab={tab} setTab={setTab}>
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
    </TabWindow>
  );
};

export default Info;
