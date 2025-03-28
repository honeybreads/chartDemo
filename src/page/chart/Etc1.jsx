import { memo, useRef } from "react";
// 차트 컴포넌트
import {
  HoneycombChart,
  PictogramChart,
  InfograpicChart,
  CarbonZeroChart,
  BasicWaffleChart,
  RiskHeatMapChart,
  BasicHeatMapChart,
  BasicPyramidChart,
  SentenceCloudChart,
  BasicWordCloudChart,
  TagWordCloudChart,
} from "@/components/chart/etc/EtcChart";
import { Guitar } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Etc1 = memo(function Etc() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic heat map",
      chart: <BasicHeatMapChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "risk heat map",
      chart: <RiskHeatMapChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "carbon zero",
      chart: <CarbonZeroChart />,
      style: { width: "100%", height: 240 },
    },
    {
      name: "basic pyramid",
      chart: <BasicPyramidChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "basic waffle",
      chart: <BasicWaffleChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "pictogram",
      chart: <PictogramChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "infograpic",
      chart: <InfograpicChart />,
      style: { width: "100%", height: 420 },
    },
    {
      name: "basic word cloud",
      chart: <BasicWordCloudChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "tag word cloud",
      chart: <TagWordCloudChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "Sentence cloud",
      chart: <SentenceCloudChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "honeycomb",
      chart: <HoneycombChart />,
      style: { width: "100%", height: "auto" },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="기타 차트1"
      name="Chart"
      icon={<Guitar />}
    />
  );
});

export default Etc1;
