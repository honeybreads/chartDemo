import { memo, useRef } from "react";
import { AreaChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicFillLineChart, {
  BasicFillLineCodeblock,
} from "@/components/chart/line/BasicFillLineChart";
import ZoomableValueLineChart, {
  ZoomableValueLineCodeblock,
} from "@/components/chart/line/ZoomableValueLineChart";
import DifferentFillLineChart, {
  DifferentFillLineCodeblock,
} from "@/components/chart/line/DifferentFillLineChart";
import RangeSliderLineChart, {
  RangeSliderLineCodeblock,
} from "@/components/chart/line/RangeSliderLineChart";
import RangeAreaLineChart, {
  RangeAreaLineCodeblock,
} from "@/components/chart/line/RangeAreaLineChart";
import AreaWithTimeBasedLineChart, {
  AreaWithTimeBasedLineCodeblock,
} from "@/components/chart/line/AreaWithTimeBasedLineChart";
import ChartWithGapsLineChart, {
  ChartWithGapsLineCodeblock,
} from "@/components/chart/line/ChartWithGapsLineChart";
import DifferentNegativeLineChart, {
  DifferentNegativeLineCodeblock,
} from "@/components/chart/line/DifferentNegativeLineChart";
import FullStackedAreaLineChart, {
  FullStackedAreaLineCodeblock,
} from "@/components/chart/line/FullStackedAreaLineChart";
import StackedAreaLineChart, {
  StackedAreaLineCodeblock,
} from "@/components/chart/line/StackedAreaLineChart";
import HorizontalTargetLineChart, {
  HorizontalTargetLineCodeblock,
} from "@/components/chart/line/HorizontalTargetLineChart";

// Line2
const Line2 = memo(function Line2() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic fill",
      chart: <BasicFillLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: BasicFillLineCodeblock,
    },
    {
      name: "zoomable value",
      chart: <ZoomableValueLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: ZoomableValueLineCodeblock,
    },
    {
      name: "diffrent fill",
      chart: <DifferentFillLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: DifferentFillLineCodeblock,
    },
    {
      name: "range slider",
      chart: <RangeSliderLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: RangeSliderLineCodeblock,
    },
    {
      name: "range area",
      chart: <RangeAreaLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: RangeAreaLineCodeblock,
    },
    {
      name: "area with time based",
      chart: <AreaWithTimeBasedLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: AreaWithTimeBasedLineCodeblock,
    },
    {
      name: "chart with gaps",
      chart: <ChartWithGapsLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: ChartWithGapsLineCodeblock,
    },
    {
      name: "diffrent negative",
      chart: <DifferentNegativeLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: DifferentNegativeLineCodeblock,
    },
    {
      name: "full stacked area",
      chart: <FullStackedAreaLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: FullStackedAreaLineCodeblock,
    },
    {
      name: "stacked area",
      chart: <StackedAreaLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: StackedAreaLineCodeblock,
    },
    {
      name: "horizontal target",
      chart: <HorizontalTargetLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: HorizontalTargetLineCodeblock,
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
