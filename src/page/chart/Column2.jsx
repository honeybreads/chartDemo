import { memo, useRef } from "react";
import { BarChart3 } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import MovingBulletColumnChart,{MovingBulletColumnCodeblock} from "@/components/chart/column/MovingBulletColumnChart";
import ClusteredColumnChart,{ClusteredColumnCodeblock} from "@/components/chart/column/ClusteredColumnChart";
import StackedColumnChart,{StackedColumnCodeblock} from "@/components/chart/column/StackedColumnChart";
import StackedClusteredColumnChart,{StackedClusteredColumnCodeblock} from "@/components/chart/column/StackedClusteredColumnChart";
import GroupedStacksColumnChart,{GroupedStacksColumnCodeblock} from "@/components/chart/column/GroupedStacksColumnChart";
import StackedWaterfallColumnChart,{StackedWaterfallColumnCodeblock} from "@/components/chart/column/StackedWaterfallColumnChart";
import CombineMultipleColumnChart,{CombineMultipleColumnCodeblock} from "@/components/chart/column/CombineMultipleColumnChart";

// column2
const Column2 = memo(function Column2() {
  const listRef = useRef({});
  const list = [
    {
      name: "moving bullet",
      chart: <MovingBulletColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock:MovingBulletColumnCodeblock
    },
    {
      name: "clustered",
      chart: <ClusteredColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock:ClusteredColumnCodeblock
    },
    {
      name: "stacked",
      chart: <StackedColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock:StackedColumnCodeblock
    },
    {
      name: "stacked clustered",
      chart: <StackedClusteredColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock:StackedClusteredColumnCodeblock
    },
    {
      name: "grouped stacks",
      chart: <GroupedStacksColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock:GroupedStacksColumnCodeblock
    },
    {
      name: "stacked waterfall",
      chart: <StackedWaterfallColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock:StackedWaterfallColumnCodeblock
    },
    {
      name: "combine multiple",
      chart: <CombineMultipleColumnChart />,
      style: { width: "100%", height: 420 },
      codeblock:CombineMultipleColumnCodeblock
    },
  ];
  list.map((item) => (listRef[item.name] = null));
  
  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="컬럼 차트2"
      name="column chart"
      icon={<BarChart3 />}
    />
  );
});

export default Column2;
