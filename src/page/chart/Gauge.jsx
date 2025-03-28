import { memo, useRef } from "react";
// 차트 컴포넌트
import {
  BasicRadarChart,
  BasicGaugeChart,
  MultiGaugeChart,
  SolidGaugeChart,
  TwoAxesGaugeChart,
  GradientGaugeChart,
  AnimatedGaugeChart,
  RadialHistogramRadarChart,
} from "@/components/chart/radar/GaugeChart";
import { GaugeCircle } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Gauge = memo(function Gauge() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic gauge",
      chart: <BasicGaugeChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "gradient gauge",
      chart: <GradientGaugeChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "animated gauge",
      chart: <AnimatedGaugeChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "multi gauge",
      chart: <MultiGaugeChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "solid gauge",
      chart: <SolidGaugeChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "two axes gauge",
      chart: <TwoAxesGaugeChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "basic radar",
      chart: <BasicRadarChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "radial histogram radar",
      chart: <RadialHistogramRadarChart />,
      style: { width: "100%", height: 340 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="레이더 & 게이지 차트"
      name="Chart"
      icon={<GaugeCircle />}
    />
  );
});

export default Gauge;
