import { memo, useRef } from "react";
import {
  BasicBarChart,
  LineAndBarChart,
  StackedBarChart,
  FloatingBarChart,
  ClusteredBarChart,
  GanttDateBarChart,
  DataSortingBarChart,
  DragOrderingBarChart,
} from "@/components/chart/bar/BarChart";
import { BarChartHorizontal } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Bar1 = memo(function Bar() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicBarChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "data sorting",
      chart: <DataSortingBarChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "drag ordering",
      chart: <DragOrderingBarChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "line and",
      chart: <LineAndBarChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "clusterd",
      chart: <ClusteredBarChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "gantt date",
      chart: <GanttDateBarChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "floating",
      chart: <FloatingBarChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "stacked",
      chart: <StackedBarChart />,
      style: { width: "100%", height: 420 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="바 차트 1"
      name="bar chart"
      icon={<BarChartHorizontal />}
    />
  );
});

export default Bar1;
