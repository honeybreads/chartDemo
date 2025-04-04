import { memo, useRef } from "react";
import { GaugeCircle } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicGaugeChart, {
  BasicGaugeCodeblock,
} from "@/components/chart/radar/BasicGaugeChart";
import GradientGaugeChart, {
  GradientGaugeCodeblock,
} from "@/components/chart/radar/GradientGaugeChart";
import AnimatedGaugeChart, {
  AnimatedGaugeCodeblock,
} from "@/components/chart/radar/AnimatedGaugeChart";
import MultiGaugeChart, {
  MultiGaugeCodeblock,
} from "@/components/chart/radar/MultiGaugeChart";
import SolidGaugeChart, {
  SolidGaugeCodeblock,
} from "@/components/chart/radar/SolidGaugeChart";
import TwoAxesGaugeChart, {
  TwoAxesGaugeCodeblock,
} from "@/components/chart/radar/TwoAxesGaugeChart";
import BasicRadarChart, {
  BasicRadarCodeblock,
} from "@/components/chart/radar/BasicRadarChart";
import RadialHistogramRadarChart, {
  RadialHistogramRadarCodeblock,
} from "@/components/chart/radar/RadialHistogramRadarChart";

// Gauge
const Gauge = memo(function Gauge() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic gauge",
      chart: <BasicGaugeChart />,
      style: { width: "100%", height: 340 },
      codeblock: BasicGaugeCodeblock,
    },
    {
      name: "gradient gauge",
      chart: <GradientGaugeChart />,
      style: { width: "100%", height: 340 },
      codeblock: GradientGaugeCodeblock,
    },
    {
      name: "animated gauge",
      chart: <AnimatedGaugeChart />,
      style: { width: "100%", height: 340 },
      codeblock: AnimatedGaugeCodeblock,
    },
    {
      name: "multi gauge",
      chart: <MultiGaugeChart />,
      style: { width: "100%", height: 340 },
      codeblock: MultiGaugeCodeblock,
    },
    {
      name: "solid gauge",
      chart: <SolidGaugeChart />,
      style: { width: "100%", height: 340 },
      codeblock: SolidGaugeCodeblock,
    },
    {
      name: "two axes gauge",
      chart: <TwoAxesGaugeChart />,
      style: { width: "100%", height: 340 },
      codeblock: TwoAxesGaugeCodeblock,
    },
    {
      name: "basic radar",
      chart: <BasicRadarChart />,
      style: { width: "100%", height: 340 },
      codeblock: BasicRadarCodeblock,
    },
    {
      name: "radial histogram radar",
      chart: <RadialHistogramRadarChart />,
      style: { width: "100%", height: 340 },
      codeblock: RadialHistogramRadarCodeblock,
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
