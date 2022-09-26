import React, { useEffect, useState } from "react";
// Context
import { useDayData } from "../Context";
// Components
import { TabProps, TabWindow } from "../Components";
import Summary from "./Summary";
import { BookOpen, Edit3 } from "react-feather";
import Notes from "./Notes";

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
  const { items, selected } = day;
  const listItem = items[selected];

  // // helpers
  // const handleSaveTitle = (value: string) => {
  //   const payload = {
  //     ...items[selected],
  //     value,
  //   };

  //   listDispatch({ type: "UPDATE", payload });
  // };

  // // todo fix
  // const handleUpdateNote = (note: string) => {
  //   const payload = {
  //     ...items[selected],
  //     note,
  //   };

  //   listDispatch({ type: "UPDATE", payload });
  // };

  useEffect(() => {
    if (selected === "") {
      setTab(TabType.Summary);
    }
  }, [selected]);
  // conditional render
  const RenderedContent = () => {
    if (!listItem) {
      return null;
    }
    switch (tab) {
      case TabType.Summary:
        return null;
        // <Summary listItem={listItem} handleSaveTitle={handleSaveTitle} />
      case TabType.Notes:
        return null;
        // <Notes listItem={listItem} handleUpdateNote={handleUpdateNote} />
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
