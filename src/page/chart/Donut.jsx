import { memo, useRef } from "react";
// 차트 컴포넌트
import {
  BasicDonutChart,
  LinkedDonutChart,
  NestedDonutChart,
  DraggingDonutChart,
  RadiusNestedDonutChart,
  GrainyGradientDonutChart,
  RadialGradientDonutChart,
} from "@/components/chart/pie/DonutChart";
import { DonutIcon } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Donut = memo(function Donut() {
  const listRef = useRef({});
  const list = [
    {
      name: "basic",
      chart: <BasicDonutChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "grainy gradient",
      chart: <GrainyGradientDonutChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "nested",
      chart: <NestedDonutChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "radius nested",
      chart: <RadiusNestedDonutChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "radial gradient",
      chart: <RadialGradientDonutChart />,
      style: { width: "100%", minHeight: 340 },
    },
    {
      name: "linked",
      chart: <LinkedDonutChart />,
      style: { width: "100%", minHeight: 340 },
    },
    {
      name: "draggin donut",
      chart: <DraggingDonutChart />,
      style: { width: "100%", minHeight: 340 },
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
