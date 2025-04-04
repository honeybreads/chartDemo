import { memo, useRef } from "react";
import { Guitar } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicHeatMapChart, {
  BasicHeatMapCodeblock,
} from "@/components/chart/etc/BasicHeatMapChart";
import RiskHeatMapChart, {
  RiskHeatMapCodeblock,
} from "@/components/chart/etc/RiskHeatMapChart";
import CarbonZeroChart, {
  CarbonZeroCodeblock,
} from "@/components/chart/etc/CarbonZeroChart";
import BasicPyramidChart, {
  BasicPyramidCodeblock,
} from "@/components/chart/etc/BasicPyramidChart";
import BasicWaffleChart, {
  BasicWaffleCodeblock,
} from "@/components/chart/etc/BasicWaffleChart";
import PictogramChart, {
  PictogramCodeblock,
} from "@/components/chart/etc/PictogramChart";
import InfograpicChart, {
  InfograpicCodeblock,
} from "@/components/chart/etc/InfograpicChart";
import BasicWordCloudChart, {
  BasicWordCloudCodeblock,
} from "@/components/chart/etc/BasicWordCloudChart";
import TagWordCloudChart, {
  TagWordCloudCodeblock,
} from "@/components/chart/etc/TagWordCloudChart";
import SentenceCloudChart, {
  SentenceCloudCodeblock,
} from "@/components/chart/etc/SentenceCloudChart";
import HoneycombChart, {
  HoneycombCodeblock,
} from "@/components/chart/etc/HoneycombChart";

// Etc1
const Etc1 = memo(function Etc() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic heat map",
      chart: <BasicHeatMapChart />,
      style: { width: "100%", height: 340 },
      codeblock: BasicHeatMapCodeblock,
    },
    {
      name: "risk heat map",
      chart: <RiskHeatMapChart />,
      style: { width: "100%", height: 340 },
      codeblock: RiskHeatMapCodeblock,
    },
    {
      name: "carbon zero",
      chart: <CarbonZeroChart />,
      style: { width: "100%", height: 240 },
      codeblock: CarbonZeroCodeblock,
    },
    {
      name: "basic pyramid",
      chart: <BasicPyramidChart />,
      style: { width: "100%", height: 340 },
      codeblock: BasicPyramidCodeblock,
    },
    {
      name: "basic waffle",
      chart: <BasicWaffleChart />,
      style: { width: "100%", height: 340 },
      codeblock: BasicWaffleCodeblock,
    },
    {
      name: "pictogram",
      chart: <PictogramChart />,
      style: { width: "100%", height: 420 },
      codeblock: PictogramCodeblock,
    },
    {
      name: "infograpic",
      chart: <InfograpicChart />,
      style: { width: "100%", height: 420 },
      codeblock: InfograpicCodeblock,
    },
    {
      name: "basic word cloud",
      chart: <BasicWordCloudChart />,
      style: { width: "100%", height: 340 },
      codeblock: BasicWordCloudCodeblock,
    },
    {
      name: "tag word cloud",
      chart: <TagWordCloudChart />,
      style: { width: "100%", height: 340 },
      codeblock: TagWordCloudCodeblock,
    },
    {
      name: "Sentence cloud",
      chart: <SentenceCloudChart />,
      style: { width: "100%", height: 340 },
      codeblock: SentenceCloudCodeblock,
    },
    {
      name: "honeycomb",
      chart: <HoneycombChart />,
      style: { width: "100%", height: "auto" },
      codeblock: HoneycombCodeblock,
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
