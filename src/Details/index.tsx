import React, { useState } from "react";
import { useListData } from "../Context/ListDataContext";
import { Container, ContentWrapper, Tab, TabText, TabWrapper } from "./styled";
import { Clock, Edit3, HelpCircle } from "react-feather";
import Summary from "./Summary";

export enum TabType {
  "Summary" = "Summary",
  "History" = "History",
  "Notes" = "Notes",
}
const ICON_MAP = {
  [TabType.Summary]: <HelpCircle size={18} />,
  [TabType.History]: <Clock size={18} />,
  [TabType.Notes]: <Edit3 size={18} />,
};
const Details: React.FC = () => {
  const tabs = Object.keys(TabType);
  const [tab, setTab] = useState<TabType>(TabType.Summary);
  const [listData, listDispatch] = useListData();
  const { items, selected } = listData;
  const listItem = items[selected];

  // helpers
  const handleSaveTitle = (value: string) => {
    const payload = {
      ...items[selected],
      value,
    };

    listDispatch({ type: "UPDATE", payload });
  };

  // conditional render
  const RenderedContent = () => {
    if (!listItem) {
      return null;
    }
    switch (tab) {
      case TabType.Summary:
        return (
          <Summary listItem={listItem} handleSaveTitle={handleSaveTitle} />
        );
      case TabType.History:
      case TabType.Notes:
      default:
        return null;
    }
  };

  return (
    <Container tabCount={tabs.length}>
      <TabWrapper>
        {tabs.map((t, i) => {
          return (
            <Tab
              key={t}
              index={i}
              selected={t === tab}
              onClick={() => setTab(TabType[t])}
            >
              <TabText>
                {ICON_MAP[t]}
                {t}
              </TabText>
            </Tab>
          );
        })}
      </TabWrapper>
      <ContentWrapper>
        <RenderedContent />
      </ContentWrapper>
    </Container>
  );
};

export default Details;
