import { memo, useRef } from "react";
import { BarChart3 } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicColumnChart, {
  BasicColumnCodeblock,
} from "@/components/chart/column/BasicColumnChart";
import RotateLabelColumnChart, {
  RotateLabelColumnCodeblock,
} from "@/components/chart/column/RotateLabelColumnChart";
import DragChangeValueChart, {
  DragChangeValueCodeblock,
} from "@/components/chart/column/DragChangeValueChart";
import VarianceColumnChart, {
  VarianceColumnCodeblock,
} from "@/components/chart/column/VarianceColumnChart";
import GrainyGradientColumnChart, {
  GrainyGradientColumnCodeblock,
} from "@/components/chart/column/GrainyGradientColumnChart";
import DataSortingColumnChart, {
  DataSortingColumnCodeblock,
} from "@/components/chart/column/DataSortingColumnChart";
import ParetoColumnChart, {
  ParetoColumnCodeblock,
} from "@/components/chart/column/ParetoColumnChart";
import LineMixColumnChart, {
  LineMixColumnCodeblock,
} from "@/components/chart/column/LineMixColumnChart";
import CurvedColumnChart, {
  CurvedColumnCodeblock,
} from "@/components/chart/column/CurvedColumnChart";
import StepCountColumnChart, {
  StepCountColumnCodeblock,
} from "@/components/chart/column/StepCountColumnChart";
import WaterfallColumnChart, {
  WaterfallColumnCodeblock,
} from "@/components/chart/column/WaterfallColumnChart";

// column1
const Column1 = memo(function Column1() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock: BasicColumnCodeblock,
    },
    {
      name: "rotated label",
      chart: <RotateLabelColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock: RotateLabelColumnCodeblock,
    },
    {
      name: "drag change value",
      chart: <DragChangeValueChart />,
      style: { width: "100%", height: 340 },
      codeblock: DragChangeValueCodeblock,
    },
    {
      name: "variance",
      chart: <VarianceColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock: VarianceColumnCodeblock,
    },
    {
      name: "grainy gradient",
      chart: <GrainyGradientColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock: GrainyGradientColumnCodeblock,
    },
    {
      name: "data sorting",
      chart: <DataSortingColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock: DataSortingColumnCodeblock,
    },
    {
      name: "pareto diagrem",
      chart: <ParetoColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock: ParetoColumnCodeblock,
    },
    {
      name: "line mix",
      chart: <LineMixColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock: LineMixColumnCodeblock,
    },
    {
      name: "curved",
      chart: <CurvedColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock: CurvedColumnCodeblock,
    },
    {
      name: "step count",
      chart: <StepCountColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock: StepCountColumnCodeblock,
    },
    {
      name: "waterfall",
      chart: <WaterfallColumnChart />,
      style: { width: "100%", height: 340 },
      codeblock: WaterfallColumnCodeblock,
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
