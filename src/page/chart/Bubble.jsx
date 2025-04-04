import { memo, useRef } from "react";
import { Shell } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicBubbleChart, {
  BasicBubbleCodeblock,
} from "@/components/chart/bubble/BasicBubbleChart";
import HeatmapBubbleChart, {
  HeatmapBubbleCodeblock,
} from "@/components/chart/bubble/HeatmapBubbleChart";
import BeaswarmBubbleChart, {
  BeaswarmBubbleCodeblock,
} from "@/components/chart/bubble/BeaswarmBubbleChart";
import StripPlotBubbleChart, {
  StripPlotBubbleCodeblock,
} from "@/components/chart/bubble/StripPlotBubbleChart";
import ValueLineBubbleChart, {
  ValueLineBubbleCodeblock,
} from "@/components/chart/bubble/ValueLineBubbleChart";
import DateBasedBubbleChart, {
  DateBasedBubbleCodeblock,
} from "@/components/chart/bubble/DateBasedBubbleChart";
import TimelineBubbleChart, {
  TimelineBubbleCodeblock,
} from "@/components/chart/bubble/TimelineBubbleChart";
import CustomBubbleChart, {
  CustomBubbleCodeblock,
} from "@/components/chart/bubble/CustomBubbleChart";
import ZoomableBubbleChart, {
  ZoomableBubbleCode,
} from "@/components/chart/bubble/ZoomableBubbleChart";

// Bubble
const Bubble = memo(function Bubble() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicBubbleChart />,
      style: { width: "100%", height: 420 },
      codeblock: BasicBubbleCodeblock,
    },
    {
      name: "heatmap",
      chart: <HeatmapBubbleChart />,
      style: { width: "100%", height: 420 },
      codeblock: HeatmapBubbleCodeblock,
    },
    {
      name: "beaswarm with d3",
      chart: <BeaswarmBubbleChart />,
      style: { width: "100%", height: 420 },
      codeblock: BeaswarmBubbleCodeblock,
    },
    {
      name: "strip plot",
      chart: <StripPlotBubbleChart />,
      style: { width: "100%", height: 420 },
      codeblock: StripPlotBubbleCodeblock,
    },
    {
      name: "value line",
      chart: <ValueLineBubbleChart />,
      style: { width: "100%", height: 420 },
      codeblock: ValueLineBubbleCodeblock,
    },
    {
      name: "data based",
      chart: <DateBasedBubbleChart />,
      style: { width: "100%", height: 420 },
      codeblock: DateBasedBubbleCodeblock,
    },
    {
      name: "timeline",
      chart: <TimelineBubbleChart />,
      style: { width: "100%", height: 420 },
      codeblock: TimelineBubbleCodeblock,
    },
    {
      name: "zoomable",
      chart: <ZoomableBubbleChart />,
      style: { width: "100%", height: 420 },
      codeblock: ZoomableBubbleCode,
    },
    {
      name: "custom",
      chart: <CustomBubbleChart />,
      style: { width: "100%", height: 420 },
      codeblock: CustomBubbleCodeblock,
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="버블 차트"
      name="bubble chart"
      icon={<Shell />}
    />
  );
});

export default Bubble;
