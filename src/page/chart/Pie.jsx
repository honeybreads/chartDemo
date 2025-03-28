import { memo, useRef } from "react";
import {
  SemiPieChart,
  BasicPieChart,
  BrokenPieChart,
  NestedPieChart,
  PieAndBarChart,
  TwoLevelPieChart,
  ExplodingPieChart,
  VariableRadiusPieChart,
} from "@/components/chart/pie/PieChart";
import { PieChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Pie = memo(function Pie() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicPieChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "variable radius",
      chart: <VariableRadiusPieChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "semi",
      chart: <SemiPieChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "broken",
      chart: <BrokenPieChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "two level",
      chart: <TwoLevelPieChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "nested",
      chart: <NestedPieChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "exploding",
      chart: <ExplodingPieChart />,
      style: { width: "100%", minHeight: 340 },
    },
    {
      name: "bar and",
      chart: <PieAndBarChart />,
      style: { width: "100%", minHeight: 340 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="파이 차트"
      name="pie Chart"
      icon={<PieChart />}
    />
  );
});

export default Pie;
