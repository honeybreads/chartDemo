import { memo, useRef } from "react";
// 차트 컴포넌트
import {
  BasicColumnChart,
  ParetoColumnChart,
  CurvedColumnChart,
  LineMixColumnChart,
  VarianceColumnChart,
  DragChangeValueChart,
  StepCountColumnChart,
  WaterfallColumnChart,
  RotateLabelColumnChart,
  DataSortingColumnChart,
  GrainyGradientColumnChart,
} from "@/components/chart/column/ColumnChart";
import { BarChart3 } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Column1 = memo(function Column1() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "rotated label",
      chart: <RotateLabelColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "drag change value",
      chart: <DragChangeValueChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "variance",
      chart: <VarianceColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "grainy gradient",
      chart: <GrainyGradientColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "data sorting",
      chart: <DataSortingColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "pareto diagrem",
      chart: <ParetoColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "line mix",
      chart: <LineMixColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "curved",
      chart: <CurvedColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "step count",
      chart: <StepCountColumnChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "waterfall",
      chart: <WaterfallColumnChart />,
      style: { width: "100%", height: 340 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="컬럼 차트1"
      name="column chart"
      icon={<BarChart3 />}
    />
  );
});

export default Column1;
