import React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

import { useListData } from "../../Context";
import { Container } from "./styled";
import { calculateDoneData } from "./utils";

const Stats: React.FC = () => {
  const [listData] = useListData();
  const { items, sort } = listData;
  const listDataArray = sort.map((id) => items[id]);
  const graphData = calculateDoneData(listDataArray);

  return (
    <Container>
      <ResponsiveContainer height={100} width={100}>
        <PieChart>
          <Pie data={graphData} dataKey="value" />
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Stats;
