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
  isDisabled?: boolean;
}

export const TabWindow: React.FC<TabWindowProps> = (props) => {
  const {
    children,
    tabList = [],
    selectedTab,
    setTab,
    isDisabled = false,
  } = props;

  return (
    <Container>
      <TabWrapper>
        {tabList.map((tab, i) => {
          const { icon, name } = tab;
          const isSelected = name === selectedTab;

          return (
            <Tab
              key={name}
              selected={isSelected}
              onClick={() => {
                if (isDisabled) return;
                setTab(name);
              }}
              isDisabled={isDisabled}
              id={tab.name}
            >
              {icon}
              {isSelected && (
                <TabText
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  exit={{ width: "100%" }}
                  transition={{ type: "linear" }}
                >
                  {name}
                </TabText>
              )}
            </Tab>
          );
        })}
      </TabWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};
