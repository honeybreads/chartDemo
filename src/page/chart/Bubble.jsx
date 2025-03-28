import { memo, useRef } from "react";
// 차트 컴포넌트
import {
  BasicBubbleChart,
  CustomBubbleChart,
  HeatmapBubbleChart,
  BeaswarmBubbleChart,
  TimelineBubbleChart,
  ZoomableBubbleChart,
  StripPlotBubbleChart,
  ValueLineBubbleChart,
  DateBasedBubbleChart,
} from "@/components/chart/bubble/BubbleChart";
import { Shell } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Bubble = memo(function Bubble() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicBubbleChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "heatmap",
      chart: <HeatmapBubbleChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "beaswarm with d3",
      chart: <BeaswarmBubbleChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "strip plot",
      chart: <StripPlotBubbleChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "value line",
      chart: <ValueLineBubbleChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "data based",
      chart: <DateBasedBubbleChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "timeline",
      chart: <TimelineBubbleChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "zoomable",
      chart: <ZoomableBubbleChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "custom",
      chart: <CustomBubbleChart />,
      style: { width: "100%", height: 420 },
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
