import React, { useState } from "react";
import { Globe, Settings, Star, Zap } from "react-feather";
import { TabProps, TabWindow } from "../Components";
import Credits from "./Credits";
import Quickstart from "./Quickstart";

enum TabType {
  "Quickstart" = "Quickstart",
  "Credits" = "Credits",
  "Stats" = "Stats",
  "Settings" = "Settings",
}

const Info: React.FC = () => {
  const [tab, setTab] = useState<string>(TabType.Quickstart);
  const tabs: TabProps[] = [
    { name: TabType.Quickstart, icon: <Zap size={18} /> },
    { name: TabType.Stats, icon: <Globe size={18} /> },
    {
      name: TabType.Credits,
      icon: <Star size={18} />,
    },
    { name: TabType.Settings, icon: <Settings size={18} /> },
  ];

  const RenderedContent = () => {
    switch (tab) {
      case TabType.Quickstart:
        return <Quickstart />;
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
