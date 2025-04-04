import { memo, useRef } from "react";
import { BarChartHorizontal } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import NegativeStackBarChart, {
  NegativeStackBarCodeblock,
} from "@/components/chart/bar/NegativeStackBarChart";
import DivergentStackedBarChart, {
  DivergentStackedBarCodeblock,
} from "@/components/chart/bar/DivergentStackedBarChart";
import RaceBarChart, {
  RaceBarCodeblock,
} from "@/components/chart/bar/RaceBarChart";
import MovingBulletBarChart, {
  MovingBulletBarCodeblock,
} from "@/components/chart/bar/MovingBulletBarChart";
import PartitionedBarChart, {
  PartitionedBarCodeblock,
} from "@/components/chart/bar/PartitionedBarChart";
import BulletBarChart, {
  BulletBarCodeblock,
} from "@/components/chart/bar/BulletBarChart";

// Bar2
const Bar2 = memo(function Bar() {
  const listRef = useRef({});
  const list = [
    {
      name: "negative stacked",
      chart: <NegativeStackBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: NegativeStackBarCodeblock,
    },
    {
      name: "divergent stacked",
      chart: <DivergentStackedBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: DivergentStackedBarCodeblock,
    },
    {
      name: "race",
      chart: <RaceBarChart />,
      style: { width: "100%", height: 420 },
      codeblock: RaceBarCodeblock,
    },
    {
      name: "moving bullet",
      chart: <MovingBulletBarChart />,
      style: { width: "100%", height: 540 },
      codeblock: MovingBulletBarCodeblock,
    },
    {
      name: "partitioned",
      chart: <PartitionedBarChart />,
      style: { width: "100%", height: 720 },
      codeblock: PartitionedBarCodeblock,
    },
    {
      name: "bullet",
      chart: <BulletBarChart />,
      style: { width: "100%", height: 220 },
      codeblock: BulletBarCodeblock,
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="바 차트 2"
      name="bar chart"
      icon={<BarChartHorizontal />}
    />
  );
});

export default Bar2;
