import React from "react";
import { Container, Tab, TabWrapper, TabText, ContentWrapper } from "./styled";

export type TabProps = {
  name: string;
  icon: React.ReactNode;
};

interface TabWindowProps {
  tabList: TabProps[];
  selectedTab: string;
  setTab: (tab: string) => void;
}

export const TabWindow: React.FC<TabWindowProps> = (props) => {
  const { children, tabList = [], selectedTab, setTab } = props;
  return (
    <Container>
      <TabWrapper>
        {tabList.map((tab, i) => {
          const { icon, name } = tab;
          return (
            <Tab
              key={name}
              index={i}
              selected={name === selectedTab}
              onClick={() => (setTab ? setTab(name) : console.log(name))}
            >
              <TabText>
                {icon}
                {name}
              </TabText>
            </Tab>
          );
        })}
      </TabWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};
