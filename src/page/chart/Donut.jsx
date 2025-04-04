import { memo, useRef } from "react";
import { DonutIcon } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import BasicDonutChart, {
  BasicDonutCodeblock,
} from "@/components/chart/pie/BasicDonutChart";
import GrainyGradientDonutChart, {
  GrainyGradientDonutCodeblock,
} from "@/components/chart/pie/GrainyGradientDonutChart";
import NestedDonutChart, {
  NestedDonutCodeblock,
} from "@/components/chart/pie/NestedDonutChart";
import RadiusNestedDonutChart, {
  RadiusNestedDonutCodeblock,
} from "@/components/chart/pie/RadiusNestedDonutChart";
import RadialGradientDonutChart, {
  RadialGradientDonutCodeblock,
} from "@/components/chart/pie/RadialGradientDonutChart";
import LinkedDonutChart, {
  LinkedDonutCodeblock,
} from "@/components/chart/pie/LinkedDonutChart";
import DraggingDonutChart, {
  DraggingDonutCodeblock,
} from "@/components/chart/pie/DraggingDonutChart";

// Donut
const Donut = memo(function Donut() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicDonutChart />,
      style: { width: "100%", height: 340 },
      codeblock: BasicDonutCodeblock,
    },
    {
      name: "grainy gradient",
      chart: <GrainyGradientDonutChart />,
      style: { width: "100%", height: 340 },
      codeblock: GrainyGradientDonutCodeblock,
    },
    {
      name: "nested",
      chart: <NestedDonutChart />,
      style: { width: "100%", height: 340 },
      codeblock: NestedDonutCodeblock,
    },
    {
      name: "radius nested",
      chart: <RadiusNestedDonutChart />,
      style: { width: "100%", height: 340 },
      codeblock: RadiusNestedDonutCodeblock,
    },
    {
      name: "radial gradient",
      chart: <RadialGradientDonutChart />,
      style: { width: "100%", minHeight: 340 },
      codeblock: RadialGradientDonutCodeblock,
    },
    {
      name: "linked",
      chart: <LinkedDonutChart />,
      style: { width: "100%", minHeight: 340 },
      codeblock: LinkedDonutCodeblock,
    },
    {
      name: "draggin",
      chart: <DraggingDonutChart />,
      style: { width: "100%", minHeight: 340 },
      codeblock: DraggingDonutCodeblock,
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="파이 - 도넛 차트"
      name="donut Chart"
      icon={<DonutIcon />}
    />
  );
});

export default Donut;
