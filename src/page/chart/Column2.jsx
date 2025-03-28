import { memo, useRef } from "react";
// 차트 컴포넌트
import {
  StackedColumnChart,
  ClusteredColumnChart,
  MovingBulletColumnChart,
  GroupedStacksColumnChart,
  CombineMultipleColumnChart,
  StackedClusteredColumnChart,
  StackedWaterfallColumnChart,
} from "@/components/chart/column/ColumnChart";
import { BarChart3 } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Column2 = memo(function Column2() {
  const listRef = useRef({});
  const list = [
    {
      name: "moving bullet",
      chart: <MovingBulletColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "clustered",
      chart: <ClusteredColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "stacked",
      chart: <StackedColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "stacked clustered",
      chart: <StackedClusteredColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "grouped stacks",
      chart: <GroupedStacksColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "stacked waterfall",
      chart: <StackedWaterfallColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "combine multiple",
      chart: <CombineMultipleColumnChart />,
      style: { width: "100%", height: 420 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));
  
  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="컬럼 차트2"
      name="column chart"
      icon={<BarChart3 />}
    />
  );
});

export default Column2;
