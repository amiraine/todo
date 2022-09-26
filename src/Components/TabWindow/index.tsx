import React, { useEffect, useState } from "react";
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

const calculateTabLeft = (
  tabs: { tab: string; width: number }[]
): { name: string; left: number }[] => {
  const additiveTabs = tabs.reduce(
    (acc: { name: string; left: number }[], next, i) => {
      if (i === 0) {
        const tab = {
          name: next.tab,
          left: 0,
        };
        acc.push(tab);
      } else {
        const tab = {
          name: next.tab,
          left: tabs[i - 1].width + next.width - 25,
        };
        acc.push(tab);
      }
      return acc;
    },
    []
  );

  return additiveTabs;
};

export const TabWindow: React.FC<TabWindowProps> = (props) => {
  const {
    children,
    tabList = [],
    selectedTab,
    setTab,
    isDisabled = false,
  } = props;
  const [idk, setidk] = useState<any[]>();

  useEffect(() => {
    let idkCopy: any[] = [];
    tabList.forEach((tab) => {
      const el = document.getElementById(tab.name);
      if (el) {
        const test = el.getBoundingClientRect();
        const next = {
          tab: tab.name,
          width: test.width,
        };
        idkCopy.push(next);
      }
    });
    setidk(calculateTabLeft(idkCopy));
  }, [tabList]);

  return (
    <Container>
      <TabWrapper>
        {tabList.map((tab, i) => {
          const { icon, name } = tab;
          const widthOfPrev = idk?.[i - 1]?.left || 0;
          return (
            <Tab
              key={name}
              index={i}
              selected={name === selectedTab}
              onClick={() => {
                if (isDisabled) return;
                setTab(name);
              }}
              tabCount={tabList.length}
              isDisabled={isDisabled}
              id={tab.name}
              widthOfPrev={widthOfPrev}
            >
              <div />
              <TabText>
                {icon}
                {name}
              </TabText>
              <div />
            </Tab>
          );
        })}
      </TabWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};
