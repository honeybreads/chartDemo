import { memo, useRef } from "react";
import {
  TrendLineChart,
  ErrorLineChart,
  VerticalLineChart,
  NoGapDateLineChart,
  DivergentLineChart,
  ThemeRiverLineChart,
  AddingDataLineChart,
  DurationValueLineChart,
  DrawingSeriesLineChart,
  ProcessControlLineChart,
  EndSeriesAnimatedBulletLineChart,
} from "@/components/chart/line/LineChart";
import { LineChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";

const LineEtc = memo(function LineEtc() {
  const listRef = useRef({});
  const list = [
    {
      name: "vertical",
      chart: <VerticalLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "drawing series",
      chart: <DrawingSeriesLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "end series animated bullet",
      chart: <EndSeriesAnimatedBulletLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "adding data",
      chart: <AddingDataLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "trend",
      chart: <TrendLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "divergent",
      chart: <DivergentLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "error",
      chart: <ErrorLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "duration value",
      chart: <DurationValueLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "no gap date",
      chart: <NoGapDateLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "process control",
      chart: <ProcessControlLineChart />,
      style: { width: "100%", height: 340 },
    },
    {
      name: "theme river",
      chart: <ThemeRiverLineChart />,
      style: { width: "100%", height: 340 },
    },
  ];
  list.map((item) => (listRef[item.name] = null));

  return (
    <BoardLayout
      list={list}
      listRef={listRef}
      title="기타 / 혼합 라인 차트"
      name="line Chart"
      icon={<LineChart />}
    />
  );
});

export default LineEtc;
