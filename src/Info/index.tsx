import React, { useState } from "react";
import { Globe, Star } from "react-feather";
import { TabProps, TabWindow } from "../Components";
import Credits from "./Credits";

enum TabType {
  "Credits" = "Credits",
  "GlobalStats" = "Global stats",
  "Settings" = "Settings",
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
        return <Credits />;
      default:
        return null;
    }
  };
  return (
    <TabWindow tabList={tabs} selectedTab={tab} setTab={setTab}>
      <RenderedContent />
    </TabWindow>
  );
};

export default Info;
