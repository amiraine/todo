import React, { useEffect, useState } from "react";
// Context
import { useDayData } from "../Context";
// Components
import { TabProps, TabWindow } from "../Components";
import Summary from "./Summary";
import { BookOpen, Edit3 } from "react-feather";
import Notes from "./Notes";
import { ListItem } from "../types";

export enum TabType {
  "Summary" = "Summary",
  "Notes" = "Notes",
}

const Details: React.FC = () => {
  const tabs: TabProps[] = [
    {
      name: TabType.Summary,
      icon: <BookOpen size={18} />,
    },
    { name: TabType.Notes, icon: <Edit3 size={18} /> },
  ];
  const [tab, setTab] = useState<string>(TabType.Summary);
  const [day, dayDispatch] = useDayData();
  const { items: dayItems, selected: daySelected } = day;
  const listData = dayItems[daySelected];
  const { items: taskItems, selected: taskSelected } = listData;
  const listItem = taskItems[taskSelected];

  // helpers
  const handleSaveTitle = (value: string) => {
    const payload: ListItem = {
      ...listItem,
      value,
    };
    dayDispatch({ type: "UPDATE_TASK", payload });
  };

  // todo fix
  const handleUpdateNote = (note: string) => {
    const payload: ListItem = {
      ...listItem,
      note,
    };

    dayDispatch({ type: "UPDATE_TASK", payload });
  };

  useEffect(() => {
    if (taskSelected === "") {
      setTab(TabType.Summary);
    }
  }, [taskSelected]);

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
    <TabWindow
      tabList={tabs}
      setTab={setTab}
      selectedTab={tab}
      isDisabled={listItem === undefined}
    >
      <RenderedContent />
    </TabWindow>
  );
};

export default Details;
