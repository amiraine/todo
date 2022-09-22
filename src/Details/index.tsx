import React, { useState } from "react";
// Context
import { useListData } from "../Context/ListDataContext";
// Components
import { TabProps, TabWindow } from "../Components";
import Summary from "./Summary";
import { BookOpen, Edit3 } from "react-feather";
import Notes from "./Notes";
import { UpdateKey } from "../List";

export enum TabType {
  "Summary" = "Summary",
  "Stats" = "Stats",
  "Notes" = "Notes",
}

const Details: React.FC = () => {
  const tabs: TabProps[] = [
    {
      name: TabType.Summary,
      icon: <BookOpen />,
    },
    { name: TabType.Notes, icon: <Edit3 /> },
  ];
  const [tab, setTab] = useState<string>(TabType.Summary);
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

  // todo fix
  const handleUpdateNote = (note: string) => {
    const payload = {
      ...items[selected],
      note,
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
      case TabType.Notes:
        return (
          <Notes listItem={listItem} handleUpdateNote={handleUpdateNote} />
        );
      default:
        return null;
    }
  };

  return (
    <TabWindow tabList={tabs} setTab={setTab} selectedTab={tab}>
      <RenderedContent />
    </TabWindow>
  );
};

export default Details;
