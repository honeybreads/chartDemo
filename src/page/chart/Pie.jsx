import { memo, useRef } from "react";
import { PieChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicPieChart,{BasicPieCodeblock} from "@/components/chart/pie/BasicPieChart";
import VariableRadiusPieChart,{VariableRadiusPieCodeblock} from "@/components/chart/pie/VariableRadiusPieChart";
import SemiPieChart,{SemiPieCodeblock} from "@/components/chart/pie/SemiPieChart";
import BrokenPieChart,{BrokenPieCodeblock} from "@/components/chart/pie/BrokenPieChart";
import TwoLevelPieChart,{TwoLevelPieCodeblock} from "@/components/chart/pie/TwoLevelPieChart";
import NestedPieChart,{NestedPieCodeblock} from "@/components/chart/pie/NestedPieChart";
import ExplodingPieChart,{ExplodingPieCodeblock} from "@/components/chart/pie/ExplodingPieChart";
import PieAndBarChart,{PieAndBarCodeblock} from "@/components/chart/pie/PieAndBarChart";

// Pie
const Pie = memo(function Pie() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicPieChart />,
      style: { width: "100%", height: 340 },
      codeblock:BasicPieCodeblock
    },
    {
      name: "variable radius",
      chart: <VariableRadiusPieChart />,
      style: { width: "100%", height: 340 },
      codeblock:VariableRadiusPieCodeblock
    },
    {
      name: "semi",
      chart: <SemiPieChart />,
      style: { width: "100%", height: 340 },
      codeblock:SemiPieCodeblock
    },
    {
      name: "broken",
      chart: <BrokenPieChart />,
      style: { width: "100%", height: 340 },
      codeblock:BrokenPieCodeblock
    },
    {
      name: "two level",
      chart: <TwoLevelPieChart />,
      style: { width: "100%", height: 340 },
      codeblock:TwoLevelPieCodeblock
    },
    {
      name: "nested",
      chart: <NestedPieChart />,
      style: { width: "100%", height: 340 },
      codeblock:NestedPieCodeblock
    },
    {
      name: "exploding",
      chart: <ExplodingPieChart />,
      style: { width: "100%", minHeight: 340 },
      codeblock:ExplodingPieCodeblock
    },
    {
      name: "bar and",
      chart: <PieAndBarChart />,
      style: { width: "100%", minHeight: 340 },
      codeblock:PieAndBarCodeblock
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="파이 차트"
      name="pie Chart"
      icon={<PieChart />}
    />
  );
});

export default Pie;
