import { memo, useRef } from "react";
import { LineChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicLineChart, {
  BasicLineCodeblock,
} from "@/components/chart/line/BasicLineChart";
import ReversedValueLineChart, {
  ReversedValueLineCodeblock,
} from "@/components/chart/line/ReversedValueLineChart";
import DifferentStrokeLineChart, {
  DifferentStrokeLineCodeblock,
} from "@/components/chart/line/DifferentStrokeLineChart";
import DateLabelsNearGridLineChart, {
  DateLabelsNearGridLineCodeblock,
} from "@/components/chart/line/DateLabelsNearGridLineChart";
import MouseManipulateLineChart, {
  MouseManipulateLineCodeblock,
} from "@/components/chart/line/MouseManipulateLineChart";
import ComparingDiffrentDateLineChart, {
  ComparingDiffrentDateLineCodeblock,
} from "@/components/chart/line/ComparingDiffrentDateLineChart";
import MultipleDateAxesLineChart, {
  MultipleDateAxesLineCodeblock,
} from "@/components/chart/line/MultipleDateAxesLineChart";
import PercentageChangeLineChart, {
  PercentageChangeLineCodeblock,
} from "@/components/chart/line/PercentageChangeLineChart";
import MultipleValueAxesLineChart, {
  MultipleValueAxesLineCodeblock,
} from "@/components/chart/line/MultipleValueAxesLineChart";
import EvenlySpacedAxesLineChart, {
  EvenlySpacedAxesLineCodeblock,
} from "@/components/chart/line/EvenlySpacedAxesLineChart";
import LegendHoverLineChart, {
  LegendHoverLineCodeblock,
} from "@/components/chart/line/LegendHoverLineChart";
import MarkingMultipleLineChart, {
  MarkingMultipleLineCodeblock,
} from "@/components/chart/line/MarkingMultipleLineChart";

// Line1
const Line1 = memo(function Line1() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: BasicLineCodeblock,
    },
    {
      name: "reverser value",
      chart: <ReversedValueLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: ReversedValueLineCodeblock,
    },
    {
      name: "different stroke",
      chart: <DifferentStrokeLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: DifferentStrokeLineCodeblock,
    },
    {
      name: "date labels near grid",
      chart: <DateLabelsNearGridLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: DateLabelsNearGridLineCodeblock,
    },
    {
      name: "mouse manipulate",
      chart: <MouseManipulateLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: MouseManipulateLineCodeblock,
    },
    {
      name: "comparing diffrent date",
      chart: <ComparingDiffrentDateLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: ComparingDiffrentDateLineCodeblock,
    },
    {
      name: "multiple date axes",
      chart: <MultipleDateAxesLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: MultipleDateAxesLineCodeblock,
    },
    {
      name: "percentage change",
      chart: <PercentageChangeLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: PercentageChangeLineCodeblock,
    },
    {
      name: "multiple value axes",
      chart: <MultipleValueAxesLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: MultipleValueAxesLineCodeblock,
    },
    {
      name: "evenly spaced axes",
      chart: <EvenlySpacedAxesLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: EvenlySpacedAxesLineCodeblock,
    },
    {
      name: "legend hover",
      chart: <LegendHoverLineChart />,
      style: { width: "100%", height: 500 },
      codeblock: LegendHoverLineCodeblock,
    },
    {
      name: "marking multiple",
      chart: <MarkingMultipleLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: MarkingMultipleLineCodeblock,
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
