import { memo, useRef } from "react";
import { LineChart } from "lucide-react";
import BoardLayout from "@/components/BoardLayout";
// 차트 컴포넌트
import VerticalLineChart,{VerticalLineCodeblock} from "@/components/chart/line/VerticalLineChart";
import DrawingSeriesLineChart,{DrawingSeriesLineCodeblock} from "@/components/chart/line/DrawingSeriesLineChart";
import EndSeriesAnimatedBulletLineChart,{EndSeriesAnimatedBulletLineCodeblock} from "@/components/chart/line/EndSeriesAnimatedBulletLineChart";
import AddingDataLineChart,{AddingDataLineCodeblock} from "@/components/chart/line/AddingDataLineChart";
import TrendLineChart,{TrendLineCodeblock} from "@/components/chart/line/TrendLineChart";
import DivergentLineChart,{DivergentLineCodeblock} from "@/components/chart/line/DivergentLineChart";
import ErrorLineChart,{ErrorLineCodeblock} from "@/components/chart/line/ErrorLineChart";
import DurationValueLineChart,{DurationValueLineCodeblock} from "@/components/chart/line/DurationValueLineChart";
import NoGapDateLineChart,{NoGapDateLineCodeblock} from "@/components/chart/line/NoGapDateLineChart";
import ProcessControlLineChart,{ProcessControlLineCodeblock} from "@/components/chart/line/ProcessControlLineChart";
import ThemeRiverLineChart,{ThemeRiverLineCodeblock} from "@/components/chart/line/ThemeRiverLineChart";

// LineEtc
const LineEtc = memo(function LineEtc() {
  const listRef = useRef({});
  const list = [
    {
      name: "vertical",
      chart: <VerticalLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:VerticalLineCodeblock
    },
    {
      name: "drawing series",
      chart: <DrawingSeriesLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:DrawingSeriesLineCodeblock
    },
    {
      name: "end series animated bullet",
      chart: <EndSeriesAnimatedBulletLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:EndSeriesAnimatedBulletLineCodeblock
    },
    {
      name: "adding data",
      chart: <AddingDataLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:AddingDataLineCodeblock
    },
    {
      name: "trend",
      chart: <TrendLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:TrendLineCodeblock
    },
    {
      name: "divergent",
      chart: <DivergentLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:DivergentLineCodeblock
    },
    {
      name: "error",
      chart: <ErrorLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:ErrorLineCodeblock
    },
    {
      name: "duration value",
      chart: <DurationValueLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:DurationValueLineCodeblock
    },
    {
      name: "no gap date",
      chart: <NoGapDateLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:NoGapDateLineCodeblock
    },
    {
      name: "process control",
      chart: <ProcessControlLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:ProcessControlLineCodeblock
    },
    {
      name: "theme river",
      chart: <ThemeRiverLineChart />,
      style: { width: "100%", height: 340 },
      codeblock:ThemeRiverLineCodeblock
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
