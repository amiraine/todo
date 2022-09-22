import React, { useState } from "react";
import { useListData } from "../Context";
import { Container } from "./styled";

export enum TabType {
  "Summary" = "Summary",
  "History" = "History",
  "Notes" = "Notes",
}

const Details: React.FC = () => {
  const [tab, setTab] = useState<TabType>(TabType.Summary);
  const [listData, listDispatch] = useListData();
  return <Container></Container>;
};

export default Details;
