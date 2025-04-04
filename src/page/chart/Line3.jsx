import { memo, useRef } from "react";
import { LineChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import SmoothedLineChart, {
  SmoothedLineCodeblock,
} from "@/components/chart/line/SmoothedLineChart";
import SmoothedStackedLineChart, {
  SmoothedStackedLineCodeblock,
} from "@/components/chart/line/SmoothedStackedLineChart";
import DraggableRangeLineChart, {
  DraggableRangeLineCodeblock,
} from "@/components/chart/line/DraggableRangeLineChart";
import LiveOrderBookLineChart, {
  LiveOrderBookLineCodeblock,
} from "@/components/chart/line/LiveOrderBookLineChart";
import StepLineChart, {
  StepLineCodeblock,
} from "@/components/chart/line/StepLineChart";
import NoRisersStepLineChart,{NoRisersStepLineCodeblock} from "@/components/chart/line/NoRisersStepLineChart";

// Line3
const Line3 = memo(function Line3() {
  const listRef = useRef({});
  const list = [
    {
      name: "smoothed",
      chart: <SmoothedLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: SmoothedLineCodeblock,
    },
    {
      name: "smoothed stacked",
      chart: <SmoothedStackedLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: SmoothedStackedLineCodeblock,
    },
    {
      name: "draggable range",
      chart: <DraggableRangeLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: DraggableRangeLineCodeblock,
    },
    {
      name: "live order book",
      chart: <LiveOrderBookLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: LiveOrderBookLineCodeblock,
    },
    {
      name: "step",
      chart: <StepLineChart />,
      style: { width: "100%", height: 340 },
      codeblock: StepLineCodeblock,
    },
    {
      name: "no riser step",
      chart: <NoRisersStepLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:NoRisersStepLineCodeblock
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
