import { memo, useRef } from "react";
import {
  BasicFillLineChart,
  RangeAreaLineChart,
  StackedAreaLineChart,
  RangeSliderLineChart,
  ZoomableValueLineChart,
  DifferentFillLineChart,
  ChartWithGapsLineChart,
  FullStackedAreaLineChart,
  HorizontalTargetLineChart,
  DifferentNegativeLineChart,
} from "@/components/chart/line/LineChart";
import AreaWithTimeBasedLineChart from "@/components/chart/line/component/AreaWithTimeBasedLineChart";
import { AreaChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Line2 = memo(function Line2() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic fill",
      chart: <BasicFillLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "zoomable value",
      chart: <ZoomableValueLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "diffrent fill",
      chart: <DifferentFillLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "range slider",
      chart: <RangeSliderLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "range area",
      chart: <RangeAreaLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "area with time based",
      chart: <AreaWithTimeBasedLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "chart with gaps",
      chart: <ChartWithGapsLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "diffrent negative",
      chart: <DifferentNegativeLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "full stacked area",
      chart: <FullStackedAreaLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "stacked area line",
      chart: <StackedAreaLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "horizontal target ",
      chart: <HorizontalTargetLineChart />,
      style: { width: "100%", height: 340 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="채움 라인 차트"
      name="line Chart"
      icon={<AreaChart />}
    />
  );
});

export default Line2;
