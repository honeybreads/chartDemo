import { memo, useRef } from "react";
import { Guitar } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

// 차트 컴포넌트
import ExportingChart,{ExportingCodeblock} from "@/components/chart/etc/ExportingChart";
import SankeyDiagramChart,{SankeyDiagramCodeblock} from "@/components/chart/etc/SankeyDiagramChart";
import RangeBulletChart,{RangeBulletCodeblock} from "@/components/chart/etc/RangeBulletChart";
import ProgressChart,{ProgressCodeblock} from "@/components/chart/etc/ProgressChart";
import VennDiagramChart,{VennDiagramCodeblock} from "@/components/chart/etc/VennDiagramChart";
import ChordDiagramChart,{ChordDiagramCodeblock} from "@/components/chart/etc/ChordDiagramChart";
import PatternsVennDiagramChart,{PatternsVennDiagramCodeblock} from "@/components/chart/etc/PatternsVennDiagramChart";
import BasicTreeChart,{BasicTreeCodeblock} from "@/components/chart/etc/BasicTreeChart";
import ForceDirectedTreeChart,{ForceDirectedTreeCodeblock} from "@/components/chart/etc/ForceDirectedTreeChart";
import BasicTreemapChart,{BasicTreemapCodeblock} from "@/components/chart/etc/BasicTreemapChart";

// Etc2
const Etc2 = memo(function Etc() {
  const listRef = useRef({});
  const list = [
    {
      name: "exporting",
      chart: <ExportingChart />,
      style: { width: "100%", height: 340 },
      codeblock:ExportingCodeblock
    },
    {
      name: "sankey diagram",
      chart: <SankeyDiagramChart />,
      style: { width: "100%", height: 340 },
      codeblock:SankeyDiagramCodeblock
    },
    {
      name: "range bullet",
      chart: <RangeBulletChart />,
      style: { width: "100%", height: 240 },
      codeblock:RangeBulletCodeblock
    },
    {
      name: "progress",
      chart: <ProgressChart />,
      style: { width: "100%", height: 150 },
      codeblock:ProgressCodeblock
    },
    {
      name: "venn diagram",
      chart: <VennDiagramChart />,
      style: { width: "100%", height: 340 },
      codeblock:VennDiagramCodeblock
    },
    {
      name: "chord diagram",
      chart: <ChordDiagramChart />,
      style: { width: "100%", height: 340 },
      codeblock:ChordDiagramCodeblock
    },
    {
      name: "patterns venn diagram",
      chart: <PatternsVennDiagramChart />,
      style: { width: "100%", height: 340 },
      codeblock:PatternsVennDiagramCodeblock
    },
    {
      name: "basic tree",
      chart: <BasicTreeChart />,
      style: { width: "100%", height: 340 },
      codeblock:BasicTreeCodeblock
    },
    {
      name: "force directed tree",
      chart: <ForceDirectedTreeChart />,
      style: { width: "100%", height: 340 },
      codeblock:ForceDirectedTreeCodeblock
    },
    {
      name: "basic tree map",
      chart: <BasicTreemapChart />,
      style: { width: "100%", height: 340 },
      codeblock:BasicTreemapCodeblock
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
