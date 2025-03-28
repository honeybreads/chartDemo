import { memo, useRef } from "react";
import {
  StepLineChart,
  SmoothedLineChart,
  NoRisersStepLineChart,
  LiveOrderBookLineChart,
  DraggableRangeLineChart,
  SmoothedStackedLineChart,
} from "@/components/chart/line/LineChart";
import { LineChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const Line3 = memo(function Line3() {
  const listRef = useRef({});
  const list = [
    {
      name: "smoothed",
      chart: <SmoothedLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "smoothed stacked",
      chart: <SmoothedStackedLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "draggable range",
      chart: <DraggableRangeLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "live order book",
      chart: <LiveOrderBookLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "step",
      chart: <StepLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "no riser step",
      chart: <NoRisersStepLineChart />,
      style: { width: "100%", height: 340 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="매끄러운 / 각진 라인 차트"
      name="line Chart"
      icon={<LineChart />}
    />
  );
});

export default Line3;
