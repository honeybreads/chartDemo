import { memo, useRef } from "react";
import {
  BasicLineChart,
  LegendHoverLineChart,
  ReversedValueLineChart,
  DifferentStrokeLineChart,
  MouseManipulateLineChart,
  MarkingMultipleLineChart,
  PercentageChangeLineChart,
  EvenlySpacedAxesLineChart,
  MultipleDateAxesLineChart,
  MultipleValueAxesLineChart,
  DateLabelsNearGridLineChart,
  ComparingDiffrentDateLineChart,
} from "@/components/chart/line/LineChart";
import { LineChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Line1 = memo(function Line1() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "reverser value",
      chart: <ReversedValueLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "different stroke",
      chart: <DifferentStrokeLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "date labels near grid",
      chart: <DateLabelsNearGridLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "mouse manipulate",
      chart: <MouseManipulateLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "comparing diffrent date",
      chart: <ComparingDiffrentDateLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "multiple date axes",
      chart: <MultipleDateAxesLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "percentage change",
      chart: <PercentageChangeLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "multiple value axes",
      chart: <MultipleValueAxesLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "evenly spaced axes",
      chart: <EvenlySpacedAxesLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "legend hover",
      chart: <LegendHoverLineChart />,
      style: { width: "100%", height: 500 },
    },
    {
      name: "marking multiple",
      chart: <MarkingMultipleLineChart />,
      style: { width: "100%", height: 340 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="라인 차트"
      name="line Chart"
      icon={<LineChart />}
    />
  );
});

export default Line1;
