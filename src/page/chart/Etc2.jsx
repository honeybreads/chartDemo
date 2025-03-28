import { memo, useRef } from "react";
// 차트 컴포넌트
import {
  ExportingChart,
  BasicTreeChart,
  VennDiagramChart,
  RangeBulletChart,
  BasicTreemapChart,
  SankeyDiagramChart,
  ForceDirectedTreeChart,
  PatternsVennDiagramChart,
  ProgressChart,
  ChordDiagramChart,
} from "@/components/chart/etc/EtcChart";
import { Guitar } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Etc2 = memo(function Etc() {
  const listRef = useRef({});
  const list = [
    {
      name: "exporting",
      chart: <ExportingChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "sankey diagram",
      chart: <SankeyDiagramChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "range bullet",
      chart: <RangeBulletChart />,
      style: { width: "100%", height: 240 },
    },
    {
      name: "progress",
      chart: <ProgressChart />,
      style: { width: "100%", height: 150 },
    },
    {
      name: "venn diagram",
      chart: <VennDiagramChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "chord diagram",
      chart: <ChordDiagramChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "patterns venn diagram",
      chart: <PatternsVennDiagramChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "basic tree",
      chart: <BasicTreeChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "force directed tree",
      chart: <ForceDirectedTreeChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "basic tree map",
      chart: <BasicTreemapChart />,
      style: { width: "100%", height: 340 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));
  
  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="기타 차트2"
      name="Chart"
      icon={<Guitar />}
    />
  );
});

export default Etc2;
