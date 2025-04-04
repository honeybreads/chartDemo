import { memo, useRef } from "react";
import { BarChartHorizontal } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicBarChart, {
  BasicBarCodeblock,
} from "@/components/chart/bar/BasicBarChart";
import DataSortingBarChart, {
  DataSortingBarCodeblock,
} from "@/components/chart/bar/DataSortingBarChart";
import DragOrderingBarChart, {
  DragOrderingBarCodeblock,
} from "@/components/chart/bar/DragOrderingBarChart";
import LineAndBarChart, {
  LineAndBarCodeblock,
} from "@/components/chart/bar/LineAndBarChart";
import ClusteredBarChart, {
  ClusteredBarCodeblock,
} from "@/components/chart/bar/ClusteredBarChart";
import GanttDateBarChart, {
  GanttDateBarCodeblock,
} from "@/components/chart/bar/GanttDateBarChart";
import FloatingBarChart, {
  FloatingBarCodeblock,
} from "@/components/chart/bar/FloatingBarChart";
import StackedBarChart, {
  StackedBarCodeblock,
} from "@/components/chart/bar/StackedBarChart";

// Bar1
const Bar1 = memo(function Bar() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: BasicBarCodeblock,
    },
    {
      name: "data sorting",
      chart: <DataSortingBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: DataSortingBarCodeblock,
    },
    {
      name: "drag ordering",
      chart: <DragOrderingBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: DragOrderingBarCodeblock,
    },
    {
      name: "line and",
      chart: <LineAndBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: LineAndBarCodeblock,
    },
    {
      name: "clusterd",
      chart: <ClusteredBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: ClusteredBarCodeblock,
    },
    {
      name: "gantt date",
      chart: <GanttDateBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: GanttDateBarCodeblock,
    },
    {
      name: "floating",
      chart: <FloatingBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: FloatingBarCodeblock,
    },
    {
      name: "stacked",
      chart: <StackedBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: StackedBarCodeblock,
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
