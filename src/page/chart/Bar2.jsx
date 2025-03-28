import { memo, useRef } from "react";
import {
  RaceBarChart,
  BulletBarChart,
  PartitionedBarChart,
  MovingBulletBarChart,
  NegativeStackBarChart,
  DivergentStackedBarChart,
} from "@/components/chart/bar/BarChart";
import { BarChartHorizontal } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Bar2 = memo(function Bar() {
  const listRef = useRef({});
  const list = [
    {
      name: "negative stacked",
      chart: <NegativeStackBarChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "divergent stacked",
      chart: <DivergentStackedBarChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "race",
      chart: <RaceBarChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "moving bullet",
      chart: <MovingBulletBarChart />,
      style: { width: "100%", height: 540 },
    },
    {
      name: "partitioned",
      chart: <PartitionedBarChart />,
      style: { width: "100%", height: 720 },
    },
    {
      name: "bullet",
      chart: <BulletBarChart />,
      style: { width: "100%", height: 220 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="바 차트 2"
      name="bar chart"
      icon={<BarChartHorizontal />}
    />
  );
});

export default Bar2;
